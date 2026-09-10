import type { Rules } from "../../../models/settingFile/rules.models";
import { escapeHtml } from "../../../helpers/escapeHtml";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    let beginLink = "https://docs.google.com/document/d/";
    let endLink = "/edit?usp=drivesdk";
    let beginLinkHTML = `<a href="`;
    let endLinkHTML = `">`;
    let fullLink;
    if (isSms) {
        fullLink = ' ' + beginLink + objectContent?.id + endLink + ' ';
        switch (rule?.objectName) {
            case "files":
                return "Title : " + objectContent?.name + "\n" + "Link : " + fullLink + "\n";
            default:
                return 'Drive Scan : Id : ' + objectContent?.id;
        }
    }
    fullLink = beginLinkHTML + beginLink + encodeURIComponent(objectContent?.id ?? "") + endLink + endLinkHTML;
    switch (rule?.objectName) {
        case "files":
            return "Title : " + escapeHtml(objectContent?.name) + "</br>" + "Link : " + fullLink + "</br>";
        default:
            return 'Drive Scan : Id : ' + escapeHtml(objectContent?.id);
    }
}

