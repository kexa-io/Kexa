import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
    if (isSms)
        if (rule.objectName == 'KexaAzure.users')
            return 'Id : '+ objectContent?.id + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/' + objectContent?.id + '';
        else if (rule.objectName == 'KexaAzure.conditionnalAccess')
            return 'Id : '+ objectContent?.id + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview' + '';
        else
            return 'Id : '+ objectContent?.id + ' | Link: https://portal.azure.com/#@/resource/' + objectContent?.id + '';
    else
        if (rule.objectName == 'KexaAzure.user')
            return `<div style="width: 200px;">Id : <a href="https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/` + objectContent?.id + '">' + objectContent?.id + `</a></div>`
        else if (rule.objectName == 'KexaAzure.conditionnalAccess')
            return `<div style="width: 200px;">Id : <a href="https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview` + objectContent?.id + '">' + objectContent?.id + `</a></div>`
        else
            return `<div style="width: 200px;">Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a></div>`
}