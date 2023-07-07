import { ObjectNameEnum } from "../enum/objectName.enum";
import { ProviderEnum } from "../enum/provider.enum";
import { ResultScan } from "../models/resultScan.models";
import { Logger } from "tslog";

let debug_mode = 2;
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

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
                        `+ propertyToSend(rule) +`
                    </td>
                </tr>`;
            result += (mainRule[mainRule.length-1].objectContent === rule.objectContent)?'</tbody></table></td></tr>':'';
            return result
        }).join(' ')
    }).join(' ')

    return result
}

export function propertyToSend(scan: ResultScan): string{
    switch(scan.rule?.cloudProvider){
        case ProviderEnum.AZURE:
            return azurePropertyToSend(scan)
        case ProviderEnum.GCP:
            //return gcpPropertyToSend(scan)
        case ProviderEnum.AWS:
            //return awsPropertyToSend(scan)
        default:
            return `Id : ` + scan?.objectContent.id
    }
}

export function azurePropertyToSend(scan: ResultScan): string{
    switch(scan.rule?.objectName){
        case ObjectNameEnum.AKS:
        case ObjectNameEnum.RG:
        case ObjectNameEnum.VM:
        case ObjectNameEnum.DISK:
        case ObjectNameEnum.NSG:
        case ObjectNameEnum.VIRTUALNETWORK:
        case ObjectNameEnum.NETWORKINTERFACE:
            return `Id : <a href="https://portal.azure.com/#@/resource/`+ scan?.objectContent?.id +'">'+ scan?.objectContent?.id +`</a>`
        case ObjectNameEnum.NAMESPACE:
            logger.debug(scan.objectContent)
            return `Name : ` + scan.objectContent.metadata.name
        case ObjectNameEnum.PODS:
            return `Name : ` + scan.objectContent.metadata.generateName + `</br>NameSpace : ` + scan.objectContent.metadata.namespace
        case ObjectNameEnum.HELM:
            return `Name : ` + scan.objectContent.metadata.generateName
        default:
            return `Id : ` + scan?.objectContent.id
    }
}