import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
    if (isSms)
        return 'Id : '+ objectContent?.id + ' | Link: https://portal.azure.com/#@/resource/' + objectContent?.id + '';
    else
        return `<div style="width: 200px;">Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a></div>`
}