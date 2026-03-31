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

export function formatOutput(allScanResults: ResultScan[][], format: string, rulesetName?: string): string {
    switch (format) {
        case 'table': return formatTable(allScanResults, rulesetName);
        case 'json': return formatJson(allScanResults);
        case 'csv': return formatCsv(allScanResults);
        case 'toml': return formatToml(allScanResults);
        default: return formatTable(allScanResults, rulesetName);
    }
}
