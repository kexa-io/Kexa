import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    switch (rule?.objectName) {
        case "namespaces":
            return `Namespace name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid
        case "pods":
            if (isSms)
                return `Name : ` + objectContent?.metadata?.name + ` and NameSpace : ` + objectContent?.metadata?.namespace
            else
                return `Name : ` + objectContent?.metadata?.name + `</br>NameSpace : ` + objectContent?.metadata?.namespace
        case "podLogs":
            if (isSms)
                return `Name : ` + objectContent?.metadata?.name + ` and NameSpace : ` + objectContent?.metadata?.namespace + ` Scanned since ` + objectContent?.interval
            else
                return `Name : ` + objectContent?.metadata?.name + `</br>NameSpace : ` + objectContent?.metadata?.namespace + `</br>Scanned since ` + objectContent?.interval
        case "helm":
            return `Helm name : ` + objectContent?.metadata?.name + ` with uid : ` + objectContent?.metadata?.uid
        case "persistentVolume":
            return `PV name : ` + objectContent.V1PersisentVolume?.metadata?.name + ` with uid : ` + objectContent.V1PersisentVolume?.metadata?.uid
        case "podsConsumption":
            return 'pod : ' + objectContent?.podName + ' in NameSpace : ' + objectContent?.metadata?.namespace;
        default:
            return 'Name :' + objectContent?.metadata?.name + ' in NameSpace : ' + objectContent?.metadata?.namespace;
    }
}