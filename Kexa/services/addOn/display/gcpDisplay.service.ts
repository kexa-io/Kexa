import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

function getGCPRegionFromUrl(url: string): string | null {
    try {
        const segments = url.split('/');
        if (segments.length > 0)
            return segments[segments.length - 1] ?? null;
    } catch (e) {
        return null;
    }
    return null;
}

function getGCPProjectFromUrl(url: string): string | null {
    try {
        const match = url.match(/\/projects\/([^\/]+)/);
        if (match && match[1])
            return match[1];
    } catch (e) {
        return null;
    }
    return null;
}

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    const zone = getGCPRegionFromUrl(objectContent?.zone);
    const project = getGCPProjectFromUrl(objectContent?.zone);
    let toRet : string;
    let link : string;

    if (isSms) {
        link = `Resource : ` + objectContent?.name +  ` : https://console.cloud.google.com/`;
        switch (rule?.objectName) {
            case "bucket":
                toRet = link + `storage/browser/` + objectContent?.id + ' ' + objectContent?.name + `.`;
                break;
            case "compute":
                toRet = link + `compute/instancesDetail/zones/` + zone + `/instances/` + objectContent?.name + `?authuser=1&project=` + project + ' ' + objectContent?.name + `.`;
                break;
            case "secret": {
                let parts = objectContent?.name.split('/');
                let secretName = parts[parts.length - 1];
                let projId = parts[1];
                toRet = link + `security/secret-manager/secret/` + secretName + `/versions?authuser=2&project=` + projId + ' ' + objectContent?.name + `.`;
                break;
            }
            default:
                toRet = link + `"> Id : ` +  objectContent?.id + `.`;
                break;
        }
        return toRet;
    }

    link = `Resource : ` + escapeHtml(objectContent?.name) + ` : <a href="https://console.cloud.google.com/`;
    switch (rule?.objectName) {
        case "bucket":
            toRet = link + `storage/browser/` + encodeURIComponent(objectContent?.id ?? "") + '">' + ' ' + escapeHtml(objectContent?.name) + `</a>`;
            break;
        case "compute":
            toRet = link + `compute/instancesDetail/zones/` + encodeURIComponent(zone ?? "") + `/instances/` + encodeURIComponent(objectContent?.name ?? "") + `?authuser=1&project=` + encodeURIComponent(project ?? "") + '">' + ' ' + escapeHtml(objectContent?.name) + `</a>`;
            break;
        case "secret": {
            let parts = objectContent?.name.split('/');
            let secretName = parts[parts.length - 1];
            let projId = parts[1];
            toRet = link + `security/secret-manager/secret/` + encodeURIComponent(secretName ?? "") + `/versions?authuser=2&project=` + encodeURIComponent(projId ?? "") + '">' + ' ' + escapeHtml(objectContent?.name) + `</a>`;
            break;
        }
        case "tasks_queue":
            toRet = link + `"> Id : ` +  escapeHtml(objectContent?.id) + `</a>`;
            break;
        default:
            toRet = link + `"> Id : ` +  escapeHtml(objectContent?.id) + `</a>`;
            break;
    }
    return toRet;
}