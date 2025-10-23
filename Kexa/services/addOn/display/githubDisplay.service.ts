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
        case "packages":
            const repoName = objectContent?.repo || "unknown-repo";
            const repoUrl = objectContent?.repoUrl || `https://github.com/${repoName}`;
            const packageName = objectContent?.name || "unknown-package";
            const packageVersion = objectContent?.version || "unknown-version";
            
            let packageDetails = '';
            if (objectContent?.dependencies && objectContent.dependencies.length > 0) {
                const maliciousDeps = objectContent.dependencies.filter((dep: any) => 
                    dep.name === "js-yaml" && dep.version === "^4.1.0"
                );
                if (maliciousDeps.length > 0) {
                    packageDetails = ` - Malicious package detected: ${maliciousDeps.map((dep: any) => `${dep.name}@${dep.version}`).join(', ')}`;
                }
            }
            
            return (isSms ? '' : webLink) + repoUrl + (isSms ? ' ' : '">') + 
                   `Repo: ${repoName} - Package: ${packageName}@${packageVersion}${packageDetails}` + 
                   (isSms ? `.` : `</a>`);
        default:
            return 'GIT Scan : Id : ' + objectContent?.id;
    }
}