import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "chart":
            return `Namespace name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid
        default:
            return 'resource : Id : ' + objectContent?.metadata?.name + ' in NameSpace : ' + objectContent?.metadata?.namespace;
    }
}