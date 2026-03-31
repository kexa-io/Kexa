import type { ResultScan } from "../models/resultScan.models";
import { groupBy } from "./groupBy";

const levelLabels = ["INFO", "WARNING", "ERROR", "FATAL"];
const levelColors = ["\x1b[32m", "\x1b[33m", "\x1b[31m", "\x1b[31;1m"]; // green, yellow, red, red bold
const RESET = "\x1b[0m";
const BOLD = "\x1b[1;37m"; // white bold
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31;1m";

interface AlertRule {
    name: string;
    description: string;
    level: number;
    cloudProvider: string;
    objectName: string;
    resourceCount: number;
}

function extractAlertRules(allScanResults: ResultScan[][]): AlertRule[] {
    const flat = allScanResults.flat().filter(v => v.error.length > 0);
    const grouped = groupBy(flat, (scan) => scan.rule?.name ?? "unknown");

    return Object.entries(grouped).map(([key, scans]) => ({
        name: key,
        description: scans[0].rule?.description ?? "",
        level: scans[0].rule?.level ?? 0,
        cloudProvider: scans[0].rule?.cloudProvider ?? "",
        objectName: scans[0].rule?.objectName ?? "",
        resourceCount: scans.length,
    }));
}

function countByLevel(rules: AlertRule[]): number[] {
    const counts = [0, 0, 0, 0];
    rules.forEach(r => { if (r.level >= 0 && r.level <= 3) counts[r.level]++; });
    return counts;
}

export function formatTable(allScanResults: ResultScan[][], rulesetName?: string): string {
    const rules = extractAlertRules(allScanResults);
    const counts = countByLevel(rules);
    const lines: string[] = [];

    lines.push("");
    if (rulesetName) {
        lines.push(`${BOLD}Ruleset: ${rulesetName}${RESET}`);
    }

    // Summary line — always use level color
    const summaryParts = counts.map((c, i) =>
        `${levelColors[i]}${c} ${levelLabels[i]}${RESET}`
    );
    lines.push(`  ${summaryParts.join("  ")}`);
    lines.push("");

    if (rules.length === 0) {
        lines.push(`  ${GREEN}✓ No violations found.${RESET}`);
        return lines.join("\n");
    }

    // Table header
    const header = `  ${"LEVEL".padEnd(10)}${"RULE".padEnd(45)}${"PROVIDER".padEnd(12)}${"COUNT".padEnd(6)}DESCRIPTION`;
    lines.push(`\x1b[1;37m${header}${RESET}`);
    lines.push(`  ${DIM}${"─".repeat(100)}${RESET}`);

    // Sort: fatal first, then error, warning, info
    rules.sort((a, b) => b.level - a.level);

    rules.forEach(rule => {
        const color = levelColors[rule.level] ?? "";
        const lvl = `${color}${levelLabels[rule.level] ?? "?"}${RESET}`;
        const name = rule.name.length > 43 ? rule.name.slice(0, 40) + "..." : rule.name;
        const provider = rule.cloudProvider.padEnd(12);
        const count = String(rule.resourceCount).padEnd(6);
        const desc = rule.description.length > 50 ? rule.description.slice(0, 47) + "..." : rule.description;
        lines.push(`  ${lvl.padEnd(10 + color.length + RESET.length)}${name.padEnd(45)}${provider}${count}${desc}`);
    });

    lines.push("");
    return lines.join("\n");
}

export function formatJson(allScanResults: ResultScan[][]): string {
    const flat = allScanResults.flat().filter(v => v.error.length > 0);
    const grouped = groupBy(flat, (scan) => scan.rule?.name ?? "unknown");

    const alertsJson = {
        timestamp: new Date().toISOString(),
        rules: Object.entries(grouped).map(([key, scans]) => ({
            name: key,
            description: scans[0].rule?.description,
            level: scans[0].rule?.level,
            levelLabel: levelLabels[scans[0].rule?.level ?? 0],
            cloudProvider: scans[0].rule?.cloudProvider,
            objectName: scans[0].rule?.objectName,
            resourceCount: scans.length,
        }))
    };

    return JSON.stringify(alertsJson, null, 2);
}

export function formatCsv(allScanResults: ResultScan[][]): string {
    const rules = extractAlertRules(allScanResults);
    const lines: string[] = [];

    lines.push("level,rule,provider,resource_type,count,description");

    rules.sort((a, b) => b.level - a.level);
    rules.forEach(rule => {
        const desc = rule.description.replace(/"/g, '""');
        lines.push(`${levelLabels[rule.level]},${rule.name},${rule.cloudProvider},${rule.objectName},${rule.resourceCount},"${desc}"`);
    });

    return lines.join("\n");
}

export function formatToml(allScanResults: ResultScan[][]): string {
    const rules = extractAlertRules(allScanResults);
    const lines: string[] = [];

    lines.push(`timestamp = "${new Date().toISOString()}"`);
    lines.push("");

    rules.sort((a, b) => b.level - a.level);
    rules.forEach(rule => {
        lines.push(`[[rules]]`);
        lines.push(`name = "${rule.name}"`);
        lines.push(`level = "${levelLabels[rule.level]}"`);
        lines.push(`provider = "${rule.cloudProvider}"`);
        lines.push(`resource_type = "${rule.objectName}"`);
        lines.push(`count = ${rule.resourceCount}`);
        lines.push(`description = "${rule.description.replace(/"/g, '\\"')}"`);
        lines.push("");
    });

    return lines.join("\n");
}

export function formatHtml(allScanResults: ResultScan[][], rulesetName?: string, version?: string): string {
    const rules = extractAlertRules(allScanResults);
    const counts = countByLevel(rules);
    const badgeClass = ["badge-info", "badge-warning", "badge-error", "badge-fatal"];

    rules.sort((a, b) => b.level - a.level);

    const rows = rules.map(rule => {
        const badge = badgeClass[rule.level] ?? "badge-info";
        const desc = rule.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `      <tr>
        <td><span class="badge ${badge}">${levelLabels[rule.level]}</span></td>
        <td>${rule.name}</td>
        <td class="provider">${rule.cloudProvider}</td>
        <td>${rule.resourceCount}</td>
        <td>${desc}</td>
      </tr>`;
    }).join("\n");

    const templatePath = require('path').join(__dirname, '..', 'templates', 'report.html');
    let template: string;
    try {
        template = require('fs').readFileSync(templatePath, 'utf8');
    } catch {
        // Fallback for compiled binary — inline minimal template
        template = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Kexa Report</title>
<style>body{font-family:sans-serif;background:#0d1117;color:#e6edf3;padding:24px}
table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border-bottom:1px solid #30363d;text-align:left}
th{background:#1c2128;color:#8b949e;text-transform:uppercase;font-size:12px}
.badge{padding:2px 8px;border-radius:10px;font-size:12px;font-weight:600}
.badge-info{background:rgba(63,185,80,.15);color:#3fb950}.badge-warning{background:rgba(210,153,34,.15);color:#d29922}
.badge-error{background:rgba(248,81,73,.15);color:#f85149}.badge-fatal{background:rgba(218,54,51,.25);color:#da3633}
.provider{color:#58a6ff}.summary{display:flex;gap:16px;margin:24px 0}
.card{flex:1;background:#161b22;border:1px solid #30363d;border-radius:8px;padding:20px;text-align:center}
.card .count{font-size:36px;font-weight:700}.card .label{color:#8b949e;font-size:13px}
.card.info .count{color:#3fb950}.card.warning .count{color:#d29922}.card.error .count{color:#f85149}.card.fatal .count{color:#da3633}
</style></head><body><h1>Kexa Report — {{RULESET_NAME}}</h1><p>{{TIMESTAMP}}</p>
<div class="summary"><div class="card info"><div class="count">{{COUNT_INFO}}</div><div class="label">Info</div></div>
<div class="card warning"><div class="count">{{COUNT_WARNING}}</div><div class="label">Warning</div></div>
<div class="card error"><div class="count">{{COUNT_ERROR}}</div><div class="label">Error</div></div>
<div class="card fatal"><div class="count">{{COUNT_FATAL}}</div><div class="label">Fatal</div></div></div>
<table><thead><tr><th>Level</th><th>Rule</th><th>Provider</th><th>Resources</th><th>Description</th></tr></thead>
<tbody>{{TABLE_ROWS}}</tbody></table><footer>Kexa {{VERSION}}</footer></body></html>`;
    }

    const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    return template
        .replace(/\{\{RULESET_NAME\}\}/g, rulesetName ?? 'default')
        .replace(/\{\{TIMESTAMP\}\}/g, now)
        .replace(/\{\{VERSION\}\}/g, version ?? '')
        .replace('{{COUNT_INFO}}', String(counts[0]))
        .replace('{{COUNT_WARNING}}', String(counts[1]))
        .replace('{{COUNT_ERROR}}', String(counts[2]))
        .replace('{{COUNT_FATAL}}', String(counts[3]))
        .replace('{{TABLE_ROWS}}', rows);
}

export function formatOutput(allScanResults: ResultScan[][], format: string, rulesetName?: string): string {
    switch (format) {
        case 'table': return formatTable(allScanResults, rulesetName);
        case 'json': return formatJson(allScanResults);
        case 'csv': return formatCsv(allScanResults);
        case 'toml': return formatToml(allScanResults);
        case 'html': return formatHtml(allScanResults, rulesetName);
        default: return formatTable(allScanResults, rulesetName);
    }
}
