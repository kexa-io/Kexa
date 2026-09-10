import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${escapeHtml(objectContent?.name)}`;
        case "users":
            return `User: ${escapeHtml(objectContent?.User)} | database: ${escapeHtml(objectContent?.Host)}`;
        case "grants":
            return `User: ${escapeHtml(objectContent?.user)} | Host: ${escapeHtml(objectContent?.host)}`;
        case "variables":
            return `Variable: ${escapeHtml(objectContent?.Variable_name)}`;
        case "status":
            return `Status: ${escapeHtml(objectContent?.Variable_name)}`;
        case "engines":
            return `Engine: ${escapeHtml(objectContent?.Engine)} | Support: ${escapeHtml(objectContent?.Support)} | Comment: ${escapeHtml(objectContent?.Comment)}`;
        case "processlist":
            return `Process: ${escapeHtml(objectContent?.Id)} | User: ${escapeHtml(objectContent?.User)} | Host: ${escapeHtml(objectContent?.Host)} | DB: ${escapeHtml(objectContent?.db)} | Command: ${escapeHtml(objectContent?.Command)} | Info: ${escapeHtml(objectContent?.Info)}`;
        default:
            return JSON.stringify(objectContent);
    }
}