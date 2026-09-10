import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "users":
            return `User: ${escapeHtml(objectContent?.USERNAME)} | id: ${escapeHtml(objectContent?.ID)}`;
        case "tables":
            return `Table: ${escapeHtml(objectContent?.TABLE_NAME)} | Tablespace: ${escapeHtml(objectContent?.TABLESPACE_NAME)}`;
        case "privileges":
            return `User: ${escapeHtml(objectContent?.USERNAME)}`;
        case "parameters":
            return `Parameter: ${escapeHtml(objectContent?.NAME)}`;
        case "views":
            return `View: ${escapeHtml(objectContent?.VIEW_NAME)}`;
        case "triggers":
            return `Trigger: ${escapeHtml(objectContent?.TRIGGER_NAME)} | Event: ${escapeHtml(objectContent?.TRIGGERING_EVENT)}`;
        default:
            return JSON.stringify(objectContent);
    }
}