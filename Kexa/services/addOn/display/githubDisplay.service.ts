import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    let link = "https://github.com/";
    let webLink = `Link : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "repositories":
            return fullLink + objectContent?.full_name + (isSms ? ' ' : '">') + 'Repo : ' + objectContent?.name + (isSms ? `.` : `</a>`)
        case "branches":
            return (isSms ? '' : webLink) + objectContent?.repoUrl + (isSms ? ' ' : '">') + 'Repo : ' + objectContent?.repo + ' Branch name : ' + objectContent?.name + (isSms ? `.` : `</a>`)
        case "issues":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Issue id : ' + objectContent?.id + (isSms ? `.` : `</a>`)
        case "organizations":
            return (isSms ? '' : webLink) + "https://github.com/" + objectContent?.login + (isSms ? ' ' : '">') + 'Organization : ' + objectContent?.login + (isSms ? `.` : `</a>`)
        case "members":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Name : ' + objectContent?.login + (isSms ? `.` : `</a>`)
        case "outsideCollaborators":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Name : ' + objectContent?.login + (isSms ? `.` : `</a>`)
        case "teams":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Team : ' + objectContent?.name + (isSms ? `.` : `</a>`)
        case "teamProjects":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Project : ' + objectContent?.name + ' Team : ' + objectContent?.team + (isSms ? `.` : `</a>`)
        case "teamMembers":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Member : ' + objectContent?.login + ' Team : ' + objectContent?.team + (isSms ? `.` : `</a>`)
        case "teamRepositories":
            return (isSms ? '' : webLink) + objectContent?.html_url + (isSms ? ' ' : '">') + 'Repo : ' + objectContent?.name + ' Team : ' + objectContent?.team + (isSms ? `.` : `</a>`)
        default:
            return 'GIT Scan : Id : ' + objectContent?.id;
    }
}