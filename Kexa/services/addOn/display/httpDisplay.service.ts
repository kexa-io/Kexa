import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "request":
            return `Url : ` + objectContent?.url + ` with status : ` + objectContent?.status
        default:
            return 'HTTP Scan : Id : ' + objectContent.id;
    }
}