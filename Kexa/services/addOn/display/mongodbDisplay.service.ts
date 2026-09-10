import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${escapeHtml(objectContent?.name)}`;
        case "users":
            return `User: ${escapeHtml(objectContent?._id)} | ID: ${escapeHtml(objectContent?.userId)}`;
        case "serverStatus":
            return `version: ${escapeHtml(objectContent?.version)} | Host: ${escapeHtml(objectContent?.host)}`;
        case "currentOp":
            return `description: ${escapeHtml(objectContent?.desc)}`;
        case "cmdLineOpts":
            return `MongoDB config`;
        case "parameters":
            return `MongoDB parameters`;
        default:
            return JSON.stringify(objectContent);
    }
}