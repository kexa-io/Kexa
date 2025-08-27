import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${objectContent?.name}`;
        case "users":
            return `User: ${objectContent?.User} | database: ${objectContent?.Host}`;
        case "grants":
            return `User: ${objectContent?.user} | Host: ${objectContent?.host}`;
        case "variables":
            return `Variable: ${objectContent?.Variable_name}`;
        case "status":
            return `Status: ${objectContent?.Variable_name}`;
        case "engines":
            return `Engine: ${objectContent?.Engine} | Support: ${objectContent?.Support} | Comment: ${objectContent?.Comment}`;
        case "processlist":
            return `Process: ${objectContent?.Id} | User: ${objectContent?.User} | Host: ${objectContent?.Host} | DB: ${objectContent?.db} | Command: ${objectContent?.Command} | Info: ${objectContent?.Info}`;
        default:
            return JSON.stringify(objectContent);
    }
}