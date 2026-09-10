import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false){
    let link = "https://" + encodeURIComponent(objectContent?.Region ?? "") + ".console.aws.amazon.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "KexaAwsCustoms.tagsValueListing":
            return isSms
                ? 'Tag name : ' + objectContent?.Value + ' in Region : ' + objectContent?.Region
                : 'Tag name : ' + escapeHtml(objectContent?.Value) + ' in Region : ' + escapeHtml(objectContent?.Region);
        case "ec2SG":
            return isSms
                ? fullLink + `ec2/home?region=` + objectContent?.Region + `#SecurityGroup:groupId=`+ objectContent?.GroupId + ' ' + objectContent?.GroupId + `.`
                : fullLink + `ec2/home?region=` + encodeURIComponent(objectContent?.Region ?? "") + `#SecurityGroup:groupId=`+ encodeURIComponent(objectContent?.GroupId ?? "") + '">' + escapeHtml(objectContent?.GroupId) + `</a>`;
        case "resourceGroups":
            return isSms ? 'GroupArn :' + objectContent?.GroupArn : 'GroupArn :' + escapeHtml(objectContent?.GroupArn);
        case rule?.objectName:
            if (rule.objectName.startsWith("S3Client.")) {
                return isSms ? ' Object name : ' + objectContent?.Name : ' Object name : ' + escapeHtml(objectContent?.Name);
            } else if (rule?.objectName.includes("IAMClient.AccessKey")) {
                return isSms ? ' Key ID : ' + objectContent?.AccessKeyId : ' Key ID : ' + escapeHtml(objectContent?.AccessKeyId);
            }
        default:
            return isSms
                ? ' Object Id(s) : ' + awsFindIdToDisplay(objectContent) + ' in Region : ' + objectContent?.region + ' obj type : ' + rule?.objectName
                : ' Object Id(s) : ' + escapeHtml(awsFindIdToDisplay(objectContent)) + ' in Region : ' + escapeHtml(objectContent?.region) + ' obj type : ' + escapeHtml(rule?.objectName);
    }
}

function cutAWSAvailabilityToRegion(inputString: string): string {
    const regionNumber = inputString.search(/\d+(?![\d])/);
    if (regionNumber !== -1) {
        return inputString.substring(0, regionNumber + 1);
    }
    return inputString;
}

function awsFindIdToDisplay(object: any): string[] | null {
    const result: any[] = [];
    for (const key in object) {
        if (object.hasOwnProperty(key) && typeof object[key] !== 'function' && key.endsWith('Id')) {
            result.push(key + "=" + object[key]);
        } else if (object.hasOwnProperty(key) && typeof object[key] !== 'function' && key.endsWith('Name')) {
            result.push(key + "=" + object[key]);
        }
    }
    return result ?? null;
}