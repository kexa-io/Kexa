import { ResultScan } from "../models/resultScan.models";
import { Rules } from "../models/settingFile/rules.models";
import { loadAddOnsCustomUtility } from "./addOn.service";

const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
import {getContext, getNewLogger} from "./logger.service";
const logger = getNewLogger("DiplayLogger");
const cfonts = require('cfonts');

const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");

export function renderTableAllScan(allScan: ResultScan[][]): string{
    let lastRule = ""
    let result = allScan.map((listResultScan) => {
        return listResultScan.map((resultScan) => {
            let result = "";
            const color = colors[resultScan?.rule?.level??0];
            if(lastRule != resultScan?.rule?.name){
                lastRule = resultScan?.rule?.name??""
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table style="width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:`+ color +`"  colspan="1">
                                                Name : `+ resultScan?.rule?.name +`
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:`+ color +`"  colspan="2">
                                            &nbspDescription : `+ resultScan?.rule?.description +`
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        `+ propertyToSend(resultScan.rule, resultScan.objectContent, false) +`
                    </td>
                </tr>`;
            result += (listResultScan[listResultScan.length-1].objectContent === resultScan.objectContent)?'</tbody></table></td></tr>':'';
            return result
        }).join(' ')
    }).join(' ')

    return result
}

export function renderTableAllScanLoud(allScan: ResultScan[][]): string{
    let lastRule = ""
    let result = allScan.map((listResultScan) => {
        return listResultScan.map((resultScan) => {
            let result = "";
            if(lastRule != resultScan?.rule?.name){
                lastRule = resultScan?.rule?.name??""
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table style="width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="1">
                                                Name : `+ resultScan?.rule?.name +`
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="2">
                                            &nbspDescription : `+ resultScan?.loud?.message +`
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="3">
                                                All the following object are compliant with the rule
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        `+ propertyToSend(resultScan.rule, resultScan.objectContent, false) +`
                    </td>
                </tr>`;
            result += (listResultScan[listResultScan.length-1].objectContent === resultScan.objectContent)?'</tbody></table></td></tr>':'';
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