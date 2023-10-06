import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    let link = "https://github.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "repositories":
            return fullLink + objectContent?.full_name + (isSms ? ' ' : '">') + objectContent?.name + (isSms ? `.` : `</a>`)
        case "branches":
            return (isSms ? '' : webLink) + objectContent?.repoUrl + (isSms ? ' ' : '">') + 'Repo : ' + objectContent?.repo + ' Branch name : ' + objectContent?.name + (isSms ? `.` : `</a>`)
        case "issues":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Issue id : ' + objectContent?.id + (isSms ? `.` : `</a>`)
        default:
            return 'GIT Scan : Id : ' + objectContent.id;
    }
}