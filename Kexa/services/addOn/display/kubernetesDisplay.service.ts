import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    const v = (val: any) => isSms ? val : escapeHtml(val);
    switch (rule?.objectName) {
        case "namespaces":
            return `Namespace name : ` + v(objectContent?.metadata?.name) + ` with uid : ` + v(objectContent?.metadata?.uid)
        case "pods":
            if (isSms)
                return `Name : ` + objectContent?.metadata?.name + ` and NameSpace : ` + objectContent?.metadata?.namespace
            else
                return `Name : ` + v(objectContent?.metadata?.name) + `</br>NameSpace : ` + v(objectContent?.metadata?.namespace)
        case "podLogs":
            if (isSms)
                return `Name : ` + objectContent?.metadata?.name + ` and NameSpace : ` + objectContent?.metadata?.namespace + ` Scanned since ` + objectContent?.interval
            else
                return `Name : ` + v(objectContent?.metadata?.name) + `</br>NameSpace : ` + v(objectContent?.metadata?.namespace) + `</br>Scanned since ` + v(objectContent?.interval)
        case "helm":
            return `Helm name : ` + v(objectContent?.metadata?.name) + ` with uid : ` + v(objectContent?.metadata?.uid)
        case "persistentVolume":
            return `PV name : ` + v(objectContent.V1PersisentVolume?.metadata?.name) + ` with uid : ` + v(objectContent.V1PersisentVolume?.metadata?.uid)
        case "podsConsumption":
            return 'pod : ' + v(objectContent?.podName) + ' in NameSpace : ' + v(objectContent?.metadata?.namespace);
        default:
            return 'Name :' + v(objectContent?.metadata?.name) + ' in NameSpace : ' + v(objectContent?.metadata?.namespace);
    }
}