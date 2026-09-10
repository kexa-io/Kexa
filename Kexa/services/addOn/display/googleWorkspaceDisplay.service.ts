import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

function safeHref(url: any): string {
    const s = String(url ?? "");
    return /^https?:\/\//i.test(s) ? s : "https://workspace.google.com/";
}

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
        let toRet : string;
        let link : string;
        const v = (val: any) => isSms ? val : escapeHtml(val);
        if (isSms)
                link = `Resource : ` + rule?.objectName +  ` : `;
        else
                link = `Resource : ` + escapeHtml(rule?.objectName) + ` : <a href="`;
        switch (rule?.objectName) {
                case "drive":
                        toRet = link + `https://drive.google.com/drive/u/1/folders/` + (isSms ? objectContent?.id : encodeURIComponent(objectContent?.id ?? "")) + (isSms ? ' ' : '">') + ' ' + v(objectContent?.name) + (isSms ? `.` : `</a>`)
                        break;
                case "calendar":
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Calendar : ' + v(objectContent?.id) + ' Etag : ' + v(objectContent?.etag) + (isSms ? `.` : `</a>`)
                        break;
                case "file":
                        toRet = link + (isSms ? objectContent?.webViewLink : safeHref(objectContent?.webViewLink)) + (isSms ? ' ' : '">') + ' File : ' + v(objectContent?.name) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                case "role":
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Role : ' + v(objectContent?.roleName) + ' Id : ' + v(objectContent?.roleId) + (isSms ? `.` : `</a>`)
                        break;
                case "domain":
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Domain : ' + v(objectContent?.domainName) + ' Etag : ' + v(objectContent?.domainInfos?.etag) + (isSms ? `.` : `</a>`)
                        break;
                case "user":
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' User Email : ' + v(objectContent?.primaryEmail) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                case "":
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Role : ' + v(objectContent?.roleName) + ' Id : ' + v(objectContent?.roleId) + (isSms ? `.` : `</a>`)
                        break;
                default:
                        toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Id: ' +  v(objectContent?.id) + ' Etag : ' + v(objectContent?.etag) + (isSms ? `.` : `</a>`)
                        break;
        }
        return toRet;
}