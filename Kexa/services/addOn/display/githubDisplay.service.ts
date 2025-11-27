import type { Rules } from "../../../models/settingFile/rules.models";
import type { SubResultScan } from "../../../models/resultScan.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false, conditions?: SubResultScan[]): string {
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
            const maliciousDeps: string[] = [];

            // Extract malicious dependencies from conditions if available
            if (conditions && conditions.length > 0) {
                conditions.forEach((condResult: SubResultScan) => {
                    // Check if this condition is about dependencies or devDependencies
                    condResult.condition.forEach((cond: any) => {
                        if ((cond.property === "dependencies" || cond.property === "devDependencies") && condResult.value && cond.value) {
                            const isDev = cond.property === "devDependencies";
                            const depsArray = Array.isArray(condResult.value) ? condResult.value : [];

                            // cond.value contains the NAND rules - check which dependencies match them
                            cond.value.forEach((ruleItem: any) => {
                                if (ruleItem.operator === "NAND" && ruleItem.criteria) {
                                    // Extract name and version criteria from NAND
                                    let targetName = "";
                                    let targetVersions: string[] = [];

                                    ruleItem.criteria.forEach((criterion: any) => {
                                        if (criterion.property === "name" && criterion.condition === "EQUAL") {
                                            targetName = criterion.value;
                                        }
                                        if (criterion.property === "version" && criterion.condition === "IN") {
                                            targetVersions = Array.isArray(criterion.value) ? criterion.value : [criterion.value];
                                        }
                                    });

                                    // Find dependencies matching BOTH name and version (NAND fails when both match)
                                    depsArray.forEach((dep: any) => {
                                        if (dep && dep.name === targetName && targetVersions.includes(dep.version)) {
                                            const depStr = `${dep.name}@${dep.version}${isDev ? ' (dev)' : ''}`;
                                            if (!maliciousDeps.includes(depStr)) {
                                                maliciousDeps.push(depStr);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }

            if (maliciousDeps.length > 0) {
                packageDetails = ` - Malicious: ${maliciousDeps.join(', ')}`;
            }

            return (isSms ? '' : webLink) + repoUrl + (isSms ? ' ' : '">') +
                   `Repo: ${repoName} - Package: ${packageName}@${packageVersion}${packageDetails}` +
                   (isSms ? `.` : `</a>`);
        case "pullRequestPackageChanges":
            const prUrl = objectContent?.prUrl || "#";
            const prNumber = objectContent?.prNumber || "unknown";
            const prTitle = objectContent?.prTitle || "Unknown PR";
            const prAuthor = objectContent?.author || "unknown";
            const isInfected = objectContent?.sha1huludIndicators?.isInfected || false;
            const detectionReasons = objectContent?.sha1huludIndicators?.detectionReasons || [];
            const suspiciousFiles = objectContent?.maliciousPatterns?.suspiciousFilesAdded || [];

            let prDetails = `PR #${prNumber}: ${prTitle} by ${prAuthor}`;
            if (isInfected) {
                prDetails += ` - SHA1HULUD DETECTED: ${detectionReasons.join(', ')}`;
                if (suspiciousFiles.length > 0) {
                    prDetails += ` - Files: ${suspiciousFiles.join(', ')}`;
                }
            }

            return (isSms ? '' : webLink) + prUrl + (isSms ? ' ' : '">') + prDetails + (isSms ? `.` : `</a>`);
        default:
            return 'GIT Scan : Id : ' + objectContent?.id;
    }
}
