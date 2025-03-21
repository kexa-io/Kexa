import { Rules } from "../../../models/settingFile/rules.models";

function getGCPRegionFromUrl(url: string): string | null {
    try {
        const segments = url.split('/');
        if (segments.length > 0)
            return segments[segments.length - 1];
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

    if (isSms)
        link = `Resource : ` + objectContent?.name +  ` : https://console.cloud.google.com/`;
    else
        link = `Resource : ` + objectContent?.name + ` : <a href="https://console.cloud.google.com/`;
    switch (rule?.objectName) {
        case "bucket":
            toRet = link + `storage/browser/` + objectContent?.id + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`)
            break;
        case "compute":
            toRet = link + `compute/instancesDetail/zones/` + zone + `/instances/` + objectContent?.name + `?authuser=1&project=` + project + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`)
            break;
        case "secret":
            let parts = objectContent?.name.split('/');
            let secretName = parts[parts.length - 1];
            let projId = parts[1];
            toRet = link + `security/secret-manager/secret/` + secretName + `/versions?authuser=2&project=` + projId + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`)
            break;
        case "tasks_queue":
            toRet = link + `"> Id : ` +  objectContent?.id + (isSms ? `.` : `</a>`)
            break;
        default:
            toRet = link + `"> Id : ` +  objectContent?.id + (isSms ? `.` : `</a>`)
            break;
    }
    return toRet;
}