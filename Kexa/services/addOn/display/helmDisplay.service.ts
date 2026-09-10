import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    if (isSms) {
        switch (rule?.objectName) {
            case "chart":
                return `Namespace name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid
            default:
                return 'resource : Id : ' + objectContent?.metadata?.name + ' in NameSpace : ' + objectContent?.metadata?.namespace;
        }
    }
    switch (rule?.objectName) {
        case "chart":
            return `Namespace name : ` + escapeHtml(objectContent?.metadata?.name) + ` with uid : ` + escapeHtml(objectContent?.metadata?.uid)
        default:
            return 'resource : Id : ' + escapeHtml(objectContent?.metadata?.name) + ' in NameSpace : ' + escapeHtml(objectContent?.metadata?.namespace);
    }
}