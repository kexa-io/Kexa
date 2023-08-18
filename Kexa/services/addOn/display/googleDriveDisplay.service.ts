import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string {
    let beginLink = "https://docs.google.com/document/d/";
    let endLink = "/edit?usp=drivesdk";
    let beginLinkHTML = `<a href="`;
    let endLinkHTML = `">`;
    let fullLink;
    fullLink = (isSms ? ' ' : beginLinkHTML) + beginLink + objectContent?.id + endLink + (isSms ? ' ' : endLinkHTML);
    switch (rule?.objectName) {
        case "files":
            return "Title : " + objectContent.name + (isSms?"\n":"</br>") + "Link : " + fullLink + (isSms?"\n":"</br>");
        default:
            return 'Drive Scan : Id : ' + objectContent.id;
    }
}

