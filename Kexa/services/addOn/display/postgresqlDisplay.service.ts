import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${escapeHtml(objectContent?.name)}`;
        case "roles":
            return `User: ${escapeHtml(objectContent?.rolname)} | oid: ${escapeHtml(objectContent?.oid)}`;
        case "settings":
            return `Name: ${escapeHtml(objectContent?.name)}`;
        case "stat_activity":
            return `Id: ${escapeHtml(objectContent?.datid)} | database: ${escapeHtml(objectContent?.datname)} | name: ${escapeHtml(objectContent?.usename)}`;
        case "extensions":
            return `oid: ${escapeHtml(objectContent?.oid)} | name: ${escapeHtml(objectContent?.extname)}`;
        default:
            return JSON.stringify(objectContent);
    }
}