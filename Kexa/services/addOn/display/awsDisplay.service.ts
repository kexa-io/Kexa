import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false){
    let link = "https://" + objectContent?.Region + ".console.aws.amazon.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "KexaAwsCustoms.tagsValueListing":
            return  'Tag name : ' + objectContent.Value + ' in Region : ' + objectContent.Region;
        case "ec2SG":
            return fullLink + `ec2/home?region=` + objectContent?.Region + `#SecurityGroup:groupId=`+ objectContent?.GroupId + (isSms ? ' ' : '">') + objectContent?.GroupId + (isSms ? `.` : `</a>`)
        case "resourceGroups":
            return 'GroupArn :' + objectContent?.GroupArn;
        case rule?.objectName:
            if (rule?.objectName.startsWith("S3Client.")) {
                return ' Object name : ' + objectContent.Name;
            }
            break;
        case rule?.objectName:
            if (rule?.objectName.startsWith("IAMClient.AccessKey")) {
                return ' Key ID : ' + objectContent.AccessKeyId;
            }
            break;
        default:
             return ' Object Id(s) : ' + awsFindIdToDisplay(objectContent);
    }
}

function cutAWSAvailabilityToRegion(inputString: string): string {
    const regionNumber = inputString.search(/\d+(?![\d])/);
    if (regionNumber !== -1) {
        console.log("Region AWS : " + inputString.substring(0, regionNumber + 1));
        return inputString.substring(0, regionNumber + 1);
    }
    return inputString;
}

function awsFindIdToDisplay(object: any): string[] | null {
    const result: any[] = [];
    for (const key in object) {
      if (object.hasOwnProperty(key) && typeof object[key] !== 'function' && key.endsWith('Id')) {
        result.push(key + "=" + object[key]);
      }
      else if (object.hasOwnProperty(key) && typeof object[key] !== 'function' && key.endsWith('Name')) {
        result.push(key + "=" + object[key]);
      }
    }
    return result ?? null;
}