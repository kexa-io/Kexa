import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean = false): string {
    if (isSms) {
        if (rule?.objectName === 'KexaAzure.users') {
            return 'Id: ' + objectContent?.id + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/' + objectContent?.id;
        } else if (rule?.objectName === 'KexaAzure.conditionnalAccess') {
            return 'Id: ' + objectContent?.id + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview';
        } else if (rule?.objectName === 'KexaAzure.servicePrincipals') {
            return 'Id: ' + objectContent?.displayName + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/' + objectContent?.id + '/appId/1e70cd27-4707-4589-8ec5-9bd20c472a46/' + objectContent?.appId;
        } else if (rule?.objectName === 'KexaAzure.applications') {
            return 'Id: ' + objectContent?.displayName + ' | Link: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/' + objectContent?.appId;
        } else {
            return 'Id: ' + objectContent?.id + ' | Link: https://portal.azure.com/#@/resource/' + objectContent?.id;
        }
    } else {
        if (rule?.objectName === 'KexaAzure.users') {
            return `Id: <a href="https://portal.azure.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/overview/userId/${objectContent?.id}">${objectContent?.id}</a>`;
        } else if (rule?.objectName === 'KexaAzure.conditionnalAccess') {
            return `Id: <a href="https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Overview">${objectContent?.id}</a>`;
        } else if (rule?.objectName === 'KexaAzure.servicePrincipals') {
            return `Id: <a href="https://portal.azure.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Overview/objectId/${objectContent?.id}/appId/1e70cd27-4707-4589-8ec5-9bd20c472a46/${objectContent?.appId}">${objectContent?.displayName}</a>`;
        } else if (rule?.objectName === 'KexaAzure.applications') {
            return `Id: <a href="https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/${objectContent?.appId}">${objectContent?.displayName}</a>`; 
        } else {
            return `Id: <a href="https://portal.azure.com/#@/resource/${objectContent?.id}">${objectContent?.id}</a>`;
        }
    }
}