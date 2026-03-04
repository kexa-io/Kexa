// Kexa MCP Server — Expose Kexa compliance scanning to Claude Code / Claude Desktop
// Transport: stdio | Protocol: MCP (Model Context Protocol)

// CRITICAL: Redirect stdout to stderr BEFORE any Kexa import.
// MCP uses stdout for JSON-RPC protocol. Kexa loggers write to stdout → corruption.
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
console.log = console.info = console.warn = console.debug =
  (...args: any[]) => process.stderr.write(args.map(String).join(' ') + '\n');

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Kexa imports
import { gatheringRules, checkRules, checkRule } from "./services/analyse.service";
import { loadAddOns } from "./services/addOn.service";
import { getConfig } from "./helpers/loaderConfig";
import { getHeaders } from "./services/headers.service";
import type { Alert } from "./models/settingFile/alert.models";
import type { SettingFile } from "./models/settingFile/settingFile.models";
import type { ProviderResource } from "./models/providerResource.models";
import type { ResultScan } from "./models/resultScan.models";

// ─── Lazy state ──────────────────────────────────────────────────────────────
let config: any = null;
let headers: any = null;

async function ensureInit() {
  if (!config) config = await getConfig();
  if (!headers) headers = getHeaders();
}

// ─── Alert silencer — disables email/SMS/webhook dispatch ────────────────────
function silenceAlert(alert: Alert): Alert {
  return {
    info:    { ...alert.info,    enabled: false },
    warning: { ...alert.warning, enabled: false },
    error:   { ...alert.error,   enabled: false },
    fatal:   { ...alert.fatal,   enabled: false },
    global:  { ...alert.global,  enabled: false },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function truncateJSON(obj: any, maxBytes: number = 100_000): string {
  const full = JSON.stringify(obj, null, 2);
  if (Buffer.byteLength(full) <= maxBytes) return full;
  return full.slice(0, maxBytes) + "\n... [truncated at 100KB]";
}

const defaultRulesDir = process.env.RULESDIRECTORY || "./rules";

// ─── MCP Server ──────────────────────────────────────────────────────────────
const server = new McpServer({
  name: "kexa",
  version: "1.0.0",
});

// ═══════════════════════════════════════════════════════════════════════════════
// Tool 1: kexa_list_providers
// ═══════════════════════════════════════════════════════════════════════════════
server.tool(
  "kexa_list_providers",
  "List all Kexa providers with their resource types and configuration status. Use to discover what cloud/infra providers Kexa supports and which ones are configured.",
  {
    provider: z.string().optional().describe("Filter by provider name (e.g. 'aws', 'azure', 'ssh')"),
  },
  async ({ provider }) => {
    await ensureInit();

    const allProviders = Object.entries(headers).map(([name, cap]: [string, any]) => {
      const configured = config.hasOwnProperty(name);
      const configCount = configured ? (config[name]?.length ?? 0) : 0;
      return {
        name,
        configured,
        configCount,
        resources: cap.resources || [],
        customName: cap.customName || name,
      };
    });

    const filtered = provider
      ? allProviders.filter(p => p.name.toLowerCase() === provider.toLowerCase())
      : allProviders;

    const configured = filtered.filter(p => p.configured);
    const available = filtered.filter(p => !p.configured);

    const text = [
      `## Configured providers (${configured.length})`,
      ...configured.map(p => `- **${p.name}** (${p.configCount} config${p.configCount > 1 ? 's' : ''}) — ${p.resources.length} resource types`),
      '',
      `## Available providers (${available.length})`,
      ...available.map(p => `- ${p.name} — ${p.resources.length} resource types`),
    ].join('\n');

    return {
      content: [{ type: "text", text }],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// Tool 2: kexa_list_rules
// ═══════════════════════════════════════════════════════════════════════════════
server.tool(
  "kexa_list_rules",
  "Parse and list all compliance rules from YAML files. Shows rule names, descriptions, severity levels, providers, and resource types. Also writes addOnNeed.json (required before gather/scan).",
  {
    rulesDirectory: z.string().optional().describe("Path to rules directory (default: RULESDIRECTORY env or ./rules)"),
    provider: z.string().optional().describe("Filter rules by cloud provider"),
  },
  async ({ rulesDirectory, provider }) => {
    await ensureInit();
    const dir = rulesDirectory || defaultRulesDir;
    const settings = await gatheringRules(dir, true);

    let allRules: any[] = [];
    for (const setting of settings) {
      const ruleSetName = setting.alert.global.name;
      for (const rule of setting.rules) {
        if (provider && rule.cloudProvider?.toString().toLowerCase() !== provider.toLowerCase()) continue;
        allRules.push({
          ruleSet: ruleSetName,
          name: rule.name || "(unnamed)",
          description: rule.description || "",
          level: rule.level,
          provider: rule.cloudProvider,
          objectName: rule.objectName,
          applied: rule.applied,
        });
      }
    }

    const byLevel = { info: 0, warning: 0, error: 0, fatal: 0 } as Record<string, number>;
    allRules.forEach(r => {
      const lvl = ["info", "warning", "error", "fatal"][r.level] || "info";
      byLevel[lvl]++;
    });

    const text = [
      `## Rules summary`,
      `- **${settings.length}** rule set(s) from \`${dir}\``,
      `- **${allRules.length}** total rules${provider ? ` (filtered: ${provider})` : ''}`,
      `- By level: ${Object.entries(byLevel).map(([k, v]) => `${k}=${v}`).join(', ')}`,
      '',
      `## Rules`,
      ...allRules.map(r =>
        `- [${["INFO", "WARN", "ERROR", "FATAL"][r.level] || "?"}] **${r.name}** (${r.provider}/${r.objectName})${r.applied === false ? ' [DISABLED]' : ''}${r.description ? ` — ${r.description}` : ''}`
      ),
    ].join('\n');

    return {
      content: [{ type: "text", text }],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// Tool 3: kexa_gather
// ═══════════════════════════════════════════════════════════════════════════════
server.tool(
  "kexa_gather",
  "Gather live resources from configured cloud/infra providers. Requires rules to be loaded first (calls gatheringRules if addOnNeed.json is missing). Returns resource counts per provider and object type.",
  {
    provider: z.string().optional().describe("Filter output by provider name"),
    verbose: z.boolean().optional().describe("If true, return full resource JSON (capped at 100KB). Default: summary only."),
    rulesDirectory: z.string().optional().describe("Path to rules directory"),
  },
  async ({ provider, verbose, rulesDirectory }) => {
    await ensureInit();

    // Ensure addOnNeed.json exists
    const fs = await import("fs");
    if (!fs.existsSync("./config/addOnNeed.json")) {
      const dir = rulesDirectory || defaultRulesDir;
      await gatheringRules(dir);
    }

    const resources = await loadAddOns();

    const summary: any[] = [];
    for (const [provName, configs] of Object.entries(resources)) {
      if (provider && provName.toLowerCase() !== provider.toLowerCase()) continue;
      for (let i = 0; i < (configs as any[]).length; i++) {
        const configResources = (configs as any[])[i];
        for (const [objName, items] of Object.entries(configResources || {})) {
          const arr = items as any[];
          summary.push({
            provider: provName,
            configIndex: i,
            objectName: objName,
            count: arr.length,
            sampleKeys: arr.length > 0 ? Object.keys(arr[0]).slice(0, 10) : [],
          });
        }
      }
    }

    const totalResources = summary.reduce((s, r) => s + r.count, 0);
    const providers = [...new Set(summary.map(s => s.provider))];

    let text = [
      `## Gathered resources`,
      `- **${totalResources}** resources from **${providers.length}** provider(s)`,
      '',
      ...summary.map(s => `- **${s.provider}**/${s.objectName}: ${s.count} resource(s)${s.sampleKeys.length > 0 ? ` [keys: ${s.sampleKeys.join(', ')}]` : ''}`),
    ].join('\n');

    if (verbose) {
      const filtered = provider
        ? Object.fromEntries(Object.entries(resources).filter(([k]) => k.toLowerCase() === provider.toLowerCase()))
        : resources;
      text += '\n\n## Raw resources\n```json\n' + truncateJSON(filtered) + '\n```';
    }

    return {
      content: [{ type: "text", text }],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// Tool 4: kexa_scan (main tool)
// ═══════════════════════════════════════════════════════════════════════════════
server.tool(
  "kexa_scan",
  "Run a full compliance scan: load rules, gather resources, evaluate all rules against resources. Returns violations grouped by severity. This is the main Kexa tool — use it to audit your infrastructure.",
  {
    rulesDirectory: z.string().optional().describe("Path to rules directory (default: RULESDIRECTORY env or ./rules)"),
    provider: z.string().optional().describe("Filter scan to a specific provider"),
    verbose: z.boolean().optional().describe("If true, include resource content and conditions for each violation"),
  },
  async ({ rulesDirectory, provider, verbose }) => {
    await ensureInit();
    const dir = rulesDirectory || defaultRulesDir;

    // Step 1: Load rules
    const settings = await gatheringRules(dir);

    // Step 2: Gather resources
    const resources = await loadAddOns();

    // Step 3: Evaluate rules with silenced alerts
    let totalRules = 0;
    let passed = 0;
    let failed = 0;
    const byLevel = { info: 0, warning: 0, error: 0, fatal: 0 } as Record<string, number>;
    const violations: any[] = [];

    for (const setting of settings) {
      const filteredRules = provider
        ? setting.rules.filter(r => r.cloudProvider?.toString().toLowerCase() === provider.toLowerCase())
        : setting.rules;

      if (filteredRules.length === 0) continue;

      const settingToScan = { ...setting, rules: filteredRules };
      const silenced = silenceAlert(setting.alert);
      const results: ResultScan[][] = checkRules(settingToScan.rules, resources, silenced);

      for (const ruleResults of results) {
        totalRules++;
        const hasError = ruleResults.some(r => r.error && r.error.length > 0);
        if (hasError) {
          failed++;
          const rule = ruleResults[0]?.rule;
          const levelName = ["info", "warning", "error", "fatal"][rule?.level ?? 0] || "info";
          byLevel[levelName]++;

          for (const result of ruleResults) {
            if (result.error && result.error.length > 0) {
              const violation: any = {
                ruleSet: setting.alert.global.name,
                rule: result.rule?.name || "(unnamed)",
                level: levelName,
                provider: result.rule?.cloudProvider,
                objectName: result.rule?.objectName,
                errors: result.error.map(e => ({
                  condition: e.condition,
                  value: e.value,
                  message: e.message,
                })),
              };
              if (verbose) {
                violation.objectContent = result.objectContent;
              }
              violations.push(violation);
            }
          }
        } else {
          passed++;
        }
      }
    }

    const text = [
      `## Scan results`,
      `- Rules directory: \`${dir}\`${provider ? ` (provider filter: ${provider})` : ''}`,
      `- **${totalRules}** rules evaluated: **${passed}** passed, **${failed}** failed`,
      `- By level: ${Object.entries(byLevel).map(([k, v]) => `${k}=${v}`).join(', ')}`,
      '',
      ...(violations.length > 0
        ? [
            `## Violations (${violations.length})`,
            ...violations.map((v, i) =>
              [
                `### ${i + 1}. [${v.level.toUpperCase()}] ${v.rule}`,
                `- Provider: ${v.provider}, Object: ${v.objectName}, RuleSet: ${v.ruleSet}`,
                ...v.errors.map((e: any) =>
                  `- ${e.message || `condition failed: ${JSON.stringify(e.condition)}`}${e.value !== undefined ? ` (got: ${JSON.stringify(e.value)})` : ''}`
                ),
                ...(verbose && v.objectContent ? [`- Resource: \`${JSON.stringify(v.objectContent).slice(0, 500)}\``] : []),
              ].join('\n')
            ),
          ]
        : ['No violations found.']),
    ].join('\n');

    return {
      content: [{ type: "text", text }],
    };
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// Tool 5: kexa_check_resource (the most interesting for AI)
// ═══════════════════════════════════════════════════════════════════════════════
server.tool(
  "kexa_check_resource",
  "Check any JSON resource against any Kexa conditions — zero infrastructure required. Use this to validate a single resource object against compliance conditions. Perfect for testing rules, ad-hoc checks, or building custom compliance logic.",
  {
    resource: z.string().describe("JSON string of the resource to check (e.g. '{\"permitrootlogin\":\"yes\"}')"),
    conditions: z.string().describe("JSON string of Kexa conditions array (e.g. '[{\"property\":\"permitrootlogin\",\"condition\":\"EQUAL\",\"value\":\"no\"}]')"),
  },
  async ({ resource, conditions }) => {
    let parsedResource: any;
    let parsedConditions: any[];
    try {
      parsedResource = JSON.parse(resource);
    } catch {
      return { content: [{ type: "text", text: "Error: invalid JSON in `resource` parameter" }], isError: true };
    }
    try {
      parsedConditions = JSON.parse(conditions);
      if (!Array.isArray(parsedConditions)) throw new Error("must be array");
    } catch {
      return { content: [{ type: "text", text: "Error: `conditions` must be a valid JSON array" }], isError: true };
    }

    const results = checkRule(parsedConditions, parsedResource);
    const allPassed = results.every(r => r.result);
    const failures = results.filter(r => !r.result);

    const text = [
      `## Check result: ${allPassed ? 'PASSED' : 'FAILED'}`,
      `- ${results.length} condition(s) evaluated, ${failures.length} failed`,
      '',
      ...results.map((r, i) =>
        `${r.result ? '  PASS' : '  FAIL'} condition ${i + 1}: ${r.message || JSON.stringify(r.condition)} → got: ${JSON.stringify(r.value)}`
      ),
    ].join('\n');

    return {
      content: [{ type: "text", text }],
    };
  }
);

// ─── Start ───────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write("Kexa MCP server started on stdio\n");
