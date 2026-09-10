import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "request":
            return isSms ? (`Url : ` + objectContent?.url + ` with status : ` + objectContent?.code) : (`Url : ` + escapeHtml(objectContent?.url) + ` with status : ` + escapeHtml(objectContent?.code))
        default:
            return isSms ? ('HTTP Scan : Id : ' + objectContent?.id) : ('HTTP Scan : Id : ' + escapeHtml(objectContent?.id));
    }
}