import { ResultScan } from "../models/resultScan.models";
import { Logger } from "tslog";
import { Rules } from "../models/settingFile/rules.models";
import { loadAddOnsDisplay } from "./addOn.service";

let debug_mode = Number(process.env.debug_mode)??0;
let AWSRegion = process.env.AWS_REGION ? process.env.AWS_REGION : "us-west-1";
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "DiplayLogger" });
const cfonts = require('cfonts');

const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsDisplay();

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
                        `+ propertyToSend(rule.rule, rule.objectContent, false) +`
                    </td>
                </tr>`;
            result += (mainRule[mainRule.length-1].objectContent === rule.objectContent)?'</tbody></table></td></tr>':'';
            return result
        }).join(' ')
    }).join(' ')

    return result
}

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
    try{
        return addOnPropertyToSend[rule?.cloudProvider](rule, objectContent, isSms);
    }catch(e){
        logger.warn("Error while loading addOn display for rule : " + rule?.name);
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