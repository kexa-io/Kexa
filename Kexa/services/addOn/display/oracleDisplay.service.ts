import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "users":
            return `User: ${objectContent?.USERNAME} | id: ${objectContent?.ID}`;
        case "tables":
            return `Table: ${objectContent?.TABLE_NAME} | Tablespace: ${objectContent?.TABLESPACE_NAME}`;
        case "privileges":
            return `User: ${objectContent?.USERNAME}`;
        case "parameters":
            return `Parameter: ${objectContent?.NAME}`;
        case "views":
            return `View: ${objectContent?.VIEW_NAME}`;
        case "triggers":
            return `Trigger: ${objectContent?.TRIGGER_NAME} | Event: ${objectContent?.TRIGGERING_EVENT}`;
        default:
            return JSON.stringify(objectContent);
    }
}