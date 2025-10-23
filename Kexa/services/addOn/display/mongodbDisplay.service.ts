import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "databases":
            return `Database: ${objectContent?.name}`;
        case "users":
            return `User: ${objectContent?._id} | ID: ${objectContent?.userId}`;
        case "serverStatus":
            return `version: ${objectContent?.version} | Host: ${objectContent?.host}`;
        case "currentOp":
            return `description: ${objectContent?.desc}`;
        default:
            return JSON.stringify(objectContent);
    }
}