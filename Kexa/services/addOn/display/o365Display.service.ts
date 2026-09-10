import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
        let toRet : string;
        let link : string;
        const v = (val: any) => isSms ? val : escapeHtml(val);
        if (isSms)
                link = `Resource : ` + rule?.objectName +  ` : `;
        else
                link = `Resource : ` + escapeHtml(rule?.objectName) + ` : <a href="`;
        switch (rule?.objectName) {
                case "user":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' User : ' + v(objectContent?.mail) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                case "sku":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Account : ' + v(objectContent?.accountName) + ' Sku Id : ' + v(objectContent?.skuId) + ' SkuPartNb : ' + v(objectContent?.skuPartNumber) + (isSms ? `.` : `</a>`)
                        break;
                case "domain":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' DomainId : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                case "secure_score":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Id : ' + v(objectContent?.id) + ' TenantId : ' + v(objectContent?.azureTenantId) + (isSms ? `.` : `</a>`)
                        break;
                case "auth_methods":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' User : ' + v(objectContent?.userName) + ' Id : ' + v(objectContent?.userId) + (isSms ? `.` : `</a>`)
                        break;
                case "directory_role":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + v(objectContent?.displayName) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                case "sp":
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + v(objectContent?.displayName) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
                default:
                        toRet = link + `https://portal.azure.com` + (isSms ? ' ' : '">') + ' Name : ' + v(objectContent?.displayName) + ' Id : ' + v(objectContent?.id) + (isSms ? `.` : `</a>`)
                        break;
        }
        return toRet;
}