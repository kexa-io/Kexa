import { ObjectNameEnum } from "../enum/objectName.enum";
import { ProviderEnum } from "../enum/provider.enum";
import { ResultScan } from "../models/resultScan.models";
import { Logger } from "tslog";
import { Rules } from "../models/settingFile/rules.models";

let debug_mode = 2;
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
const cfonts = require('cfonts');

export function renderTableAllScan(allScan: ResultScan[][]): string{
    let lastRule = ""
    let result = allScan.map((mainRule) => {
        return mainRule.map((rule) => {
            let result = "";
            const color = colors[rule?.rule?.level??0];
            if(lastRule != rule?.rule?.name){
                lastRule = rule?.rule?.name??""
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:`+ color +`"  colspan="1">
                                                Name : `+ rule?.rule?.name +`
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:`+ color +`"  colspan="2">
                                            &nbspDescription : `+ rule?.rule?.description +`
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        `+ propertyToSend(rule.rule, rule.objectContent) +`
                    </td>
                </tr>`;
            result += (mainRule[mainRule.length-1].objectContent === rule.objectContent)?'</tbody></table></td></tr>':'';
            return result
        }).join(' ')
    }).join(' ')

    return result
}

export function propertyToSend(rule: Rules, objectContent: any): string{
    switch(rule?.cloudProvider){
        case ProviderEnum.AZURE:
            return azurePropertyToSend(rule, objectContent)
        case ProviderEnum.GCP:
            //return gcpPropertyToSend(scan)
        case ProviderEnum.AWS:
            //return awsPropertyToSend(scan)
        default:
            return `Id : ` + objectContent.id
    }
}

export function azurePropertyToSend(rule: Rules, objectContent: any): string{
    switch(rule?.objectName){
        case ObjectNameEnum.AKS:
        case ObjectNameEnum.RG:
        case ObjectNameEnum.VM:
        case ObjectNameEnum.DISK:
        case ObjectNameEnum.NSG:
        case ObjectNameEnum.VIRTUALNETWORK:
        case ObjectNameEnum.NETWORKINTERFACE:
            return `Id : <a href="https://portal.azure.com/#@/resource/`+ objectContent?.id +'">'+ objectContent?.id +`</a>`
        case ObjectNameEnum.NAMESPACE:
            logger.debug(objectContent)
            return `Name : ` + objectContent.metadata.name
        case ObjectNameEnum.PODS:
            return `Name : ` + objectContent.metadata.generateName + `</br>NameSpace : ` + objectContent.metadata.namespace
        case ObjectNameEnum.HELM:
            return `Name : ` + objectContent.metadata.generateName
        default:
            return `Id : ` + objectContent.id
    }
}

export function AsciiArtText(text:string){
    cfonts.say(text, {
        font: 'block',              // define the font face
        align: 'center',            // define text alignment
        colors: ['system'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
        gradient: false,            // define your two gradient colors
        independentGradient: false, // define if you want to recalculate the gradient for each new line
        transitionGradient: false,  // define if this is a transition between colors directly
        env: 'node'                 // define the environment cfonts is being executed in
    });
}

export function talkAboutOtherProject(){
    logger.info("You can go check our other project : https://www.thecloudprices.com/");
}