
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import axios from 'axios';
import { Jira } from "../../emails/jira";
import {getContext, getNewLogger} from "../logger.service";
import { getConfig } from "../../helpers/loaderConfig";
import { jsonStringify } from "../../helpers/jsonStringify";


const logger = getNewLogger("JiraAlertingLogger");

let config: any;
async function init() {
    try {
        config = await getConfig();
        console.log(config);
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();

export async function updateIssueDate(auth: string, issueId: string): Promise<void> {
    const url = 'https://' + await getConfigOrEnvVar(config, 'JIRA_DOMAIN') +`/rest/api/2/issue/${issueId}/comment`;
    const bodyComment = {
        "body": "This is a comment regarding the quality of the response."
    }

    axios.post(url, bodyComment, {
        headers: {
            'Authorization': auth,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
           // console.log(`Response: ${response.status} ${response.statusText}`);
        })
        .catch(err => {
            logger.error('Error updating Jira issue:', err.message);
        });
}

export async function searchExistingIssue(auth: string, summary: string, description: string, content: any, issueType: string): Promise<any> {
    const issues = await getJiraTickets(auth, summary);
    let found = false;
    let matchedIssue = null;
    const doneStatusCode = await getConfigOrEnvVar(config, 'JIRA_DONE_STATUS_CODE') ?? "10002";
    const ignoreStatusCode = await getConfigOrEnvVar(config, 'JIRA_IGNORE_STATUS_CODE') ?? "XXXXX";

    outerLoop: for (const issue of issues) {
        if (issue.fields.issuetype.id != issueType) {
            continue;
        }
        if (issue.fields.status.id == doneStatusCode) {
            continue;
        }
        if (issue.fields.status.id == ignoreStatusCode) {
            continue;
        }
        const tmp1 = summary.toString();
        const summaryCompare = tmp1.includes(':') ? tmp1.split(':').slice(1).join(':').trim() : tmp1;
        const tmp2 = issue.fields.summary.toString();
        const summaryAPI = tmp2.includes(':') ? tmp2.split(':').slice(1).join(':').trim() : tmp2;
        if (summaryAPI != summaryCompare) {
            continue;
        }

        const issueContent = issue.fields.description.content;
        const contentCompareArray = content.fields.description.content;
        let i = 0, j = 0;
    
        let allValid = false;
        while (i < issueContent.length && j < contentCompareArray.length) {
            let contentAPIParse = issueContent[i];
            let contentCompareParse = contentCompareArray[j];
    
            const contentCompare = JSON.stringify(contentCompareParse?.content);
            const contentAPI = JSON.stringify(contentAPIParse?.content);

            if (contentAPI != contentCompare) {
                allValid = false;
                break;
            } else {
                allValid = true;
                i++;
                j++;
                if (i >= issueContent.length || j >= contentCompareArray.length) {
                    break;
                }
                contentAPIParse = issueContent[i];
                contentCompareParse = contentCompareArray[j];
            }
        }
        if (allValid) {
            found = true;
            matchedIssue = issue;
            break outerLoop;
        }
    }
    if (found) {
        return true;
    } else {
        return false;
    }
}


async function getJiraTickets(auth: string, summary: string): Promise<any> {
    const jqlQuery = `project=${process.env.JIRA_PROJECT_KEY ?? "XXXXX"} AND summary~"${summary}"`;
    const jqlQueryExcludeStatusID = jqlQuery + ` AND status != ${process.env.JIRA_DONE_STATUS_CODE}`;
    const jiraDomain = await getConfigOrEnvVar(config, 'JIRA_DOMAIN');
    const jiraUrlBase = `https://${jiraDomain}/rest/api/3/search?jql=${encodeURIComponent(jqlQueryExcludeStatusID)}`;
    
    const maxResults = 50;
    let startAt = 0;
    let allIssues: any[] = [];
    let total = 0;

    try {
        do {
            const jiraUrl = `${jiraUrlBase}&startAt=${startAt}&maxResults=${maxResults}`;
            let response = await axios.get(jiraUrl, {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const issues = response.data.issues;
            total = response.data.total;
            allIssues = allIssues.concat(issues);
            startAt += maxResults;

        } while (startAt < total);

        return allIssues;
    } catch (error: any) {
        logger.error('Error getting Jira tickets:', error.message);
        return [];
    }
}

function getJiraPriorityLevel(alertLevel: number): string {
    if (alertLevel == 0) {
        return process.env.JIRA_INFO_PRIORITY_LEVEL ?? "5";
    } else if (alertLevel == 1) {
        return process.env.JIRA_WARN_PRIORITY_LEVEL ?? "4";
    } else if (alertLevel == 2) {
        return process.env.JIRA_ERR_PRIORITY_LEVEL ?? "3";
    } else if (alertLevel == 3) {
        return process.env.JIRA_FATAL_PRIORITY_LEVEL ?? "2";
    }
    return "3";
}

export async function createJiraIssue(jiraUrl: string, finalContent: string, auth: string) {
    try {
        let response = await axios.post(jiraUrl, finalContent, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        logger.info('Jira issue sent successfully with card name "' + response.data.key + '"');
    } catch (error: any) {
        logger.error('Error creating Jira issue:', error.message);
    }
}