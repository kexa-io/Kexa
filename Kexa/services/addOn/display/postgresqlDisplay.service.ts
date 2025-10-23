import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${objectContent?.name}`;
        case "roles":
            return `User: ${objectContent?.rolname} | oid: ${objectContent?.oid}`;
        case "settings":
            return `Name: ${objectContent?.name}`;
        case "stat_activity":
            return `Id: ${objectContent?.datid} | database: ${objectContent?.datname} | name: ${objectContent?.usename}`;
        case "extensions":
            return `oid: ${objectContent?.oid} | name: ${objectContent?.extname}`;
        default:
            return JSON.stringify(objectContent);
    }
}