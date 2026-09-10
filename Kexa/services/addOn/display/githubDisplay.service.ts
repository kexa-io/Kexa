import type { Rules } from "../../../models/settingFile/rules.models";
import type { SubResultScan } from "../../../models/resultScan.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

function safeHref(url: any, fallback: string = "https://github.com/"): string {
    const s = String(url ?? "");
    return /^https?:\/\//i.test(s) ? s : fallback;
}

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false, conditions?: SubResultScan[]): string {
    let link = "https://github.com/";
    let webLink = `Link : <a href="`;
    let fullLink;
    const v = (val: any) => isSms ? val : escapeHtml(val);
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rule?.objectName) {
        case "repositories":
            return fullLink + (isSms ? objectContent?.full_name : encodeURIComponent(objectContent?.full_name ?? "")) + (isSms ? ' ' : '">') + 'Repo : ' + v(objectContent?.name) + (isSms ? `.` : `</a>`)
        case "branches":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.repoUrl : safeHref(objectContent?.repoUrl)) + (isSms ? ' ' : '">') + 'Repo : ' + v(objectContent?.repo) + ' Branch name : ' + v(objectContent?.name) + (isSms ? `.` : `</a>`)
        case "issues":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Issue id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
        case "organizations":
            return (isSms ? '' : webLink) + "https://github.com/" + (isSms ? objectContent?.login : encodeURIComponent(objectContent?.login ?? "")) + (isSms ? ' ' : '">') + 'Organization : ' + v(objectContent?.login) + (isSms ? `.` : `</a>`)
        case "members":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Name : ' + v(objectContent?.login) + (isSms ? `.` : `</a>`)
        case "outsideCollaborators":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Name : ' + v(objectContent?.login) + (isSms ? `.` : `</a>`)
        case "teams":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Team : ' + v(objectContent?.name) + (isSms ? `.` : `</a>`)
        case "teamProjects":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Project : ' + v(objectContent?.name) + ' Team : ' + v(objectContent?.team) + (isSms ? `.` : `</a>`)
        case "teamMembers":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Member : ' + v(objectContent?.login) + ' Team : ' + v(objectContent?.team) + (isSms ? `.` : `</a>`)
        case "teamRepositories":
            return (isSms ? '' : webLink) + (isSms ? objectContent?.html_url : safeHref(objectContent?.html_url)) + (isSms ? ' ' : '">') + 'Repo : ' + v(objectContent?.name) + ' Team : ' + v(objectContent?.team) + (isSms ? `.` : `</a>`)
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
                packageDetails = ` - Malicious: ${v(maliciousDeps.join(', '))}`;
            }

            return (isSms ? '' : webLink) + (isSms ? repoUrl : safeHref(repoUrl)) + (isSms ? ' ' : '">') +
                   `Repo: ${v(repoName)} - Package: ${v(packageName)}@${v(packageVersion)}${packageDetails}` +
                   (isSms ? `.` : `</a>`);
        case "pullRequestPackageChanges":
            const prUrl = objectContent?.prUrl || "#";
            const prNumber = objectContent?.prNumber || "unknown";
            const prTitle = objectContent?.prTitle || "Unknown PR";
            const prAuthor = objectContent?.author || "unknown";
            const isInfected = objectContent?.sha1huludIndicators?.isInfected || false;
            const detectionReasons = objectContent?.sha1huludIndicators?.detectionReasons || [];
            const suspiciousFiles = objectContent?.maliciousPatterns?.suspiciousFilesAdded || [];

            // These fields (PR title/author, detection reasons, file names) can
            // be attacker-controlled by design -- this case exists specifically
            // to surface malicious/typosquat package and PR content, so it must
            // never be trusted to render as-is.
            let prDetails = `PR #${v(prNumber)}: ${v(prTitle)} by ${v(prAuthor)}`;
            if (isInfected) {
                prDetails += ` - SHA1HULUD DETECTED: ${v(detectionReasons.join(', '))}`;
                if (suspiciousFiles.length > 0) {
                    prDetails += ` - Files: ${v(suspiciousFiles.join(', '))}`;
                }
            }

            return (isSms ? '' : webLink) + (isSms ? prUrl : safeHref(prUrl, "#")) + (isSms ? ' ' : '">') + prDetails + (isSms ? `.` : `</a>`);
        default:
            return 'GIT Scan : Id : ' + v(objectContent?.id);
    }
}
