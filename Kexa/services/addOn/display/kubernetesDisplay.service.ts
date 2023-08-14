import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean): string {
    switch (rule?.objectName) {
        case "namespaces":
            return `Namespace name : ` + objectContent?.metadata[0]?.name + ` with uid : ` + objectContent?.metadata[0]?.uid
        case "pods":
            if (isSms)
                return `Name : ` + objectContent.metadata.generateName + ` and NameSpace : ` + objectContent.metadata.namespace
            else
                return `Name : ` + objectContent.metadata.generateName + `</br>NameSpace : ` + objectContent.metadata.namespace
        case "helm":
            return `Helm name : ` + objectContent?.metadata[0]?.name + ` with uid : ` + objectContent?.metadata[0]?.uid
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}