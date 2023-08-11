import { ObjectNameEnum } from "../enum/objectName.enum";
import { ProviderEnum } from "../enum/provider.enum";
import { ResultScan } from "../models/resultScan.models";
import { Logger } from "tslog";
import { Rules } from "../models/settingFile/rules.models";

let debug_mode = Number(process.env.debug_mode)??0;
let AWSRegion = process.env.AWS_REGION ? process.env.AWS_REGION : "us-west-1";
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "DiplayLogger" });
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
                        `+ propertyToSend(rule.rule, rule.objectContent, false) +`
                    </td>
                </tr>`;
            result += (mainRule[mainRule.length-1].objectContent === rule.objectContent)?'</tbody></table></td></tr>':'';
            return result
        }).join(' ')
    }).join(' ')

    return result
}

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean): string{
    switch(rule?.cloudProvider){
        case ProviderEnum.AZURE:
            return azurePropertyToSend(rule, objectContent, isSms)
        case ProviderEnum.GCP:
            //return gcpPropertyToSend(scan, false)
        case ProviderEnum.AWS:
            return awsPropertyToSend(rule, objectContent, isSms)
        case ProviderEnum.GIT:
            return gitPropertyToSend(rule, objectContent, isSms)
        case ProviderEnum.KUBERNETES:
            return kubPropertyToSend(rule, objectContent, isSms)
        case ProviderEnum.HTTP:
            return httpPropertyToSend(rule, objectContent, isSms)
        default:
            return `Id : ` + objectContent.id
    }
}

export function azurePropertyToSend(rule: Rules, objectContent: any, isSms: boolean): string{
    switch(rule?.objectName){
        case ObjectNameEnum.AKS:
        case ObjectNameEnum.RG:
        case ObjectNameEnum.VM:
        case ObjectNameEnum.DISK:
        case ObjectNameEnum.NSG:
        case ObjectNameEnum.VIRTUALNETWORK:
        case ObjectNameEnum.NETWORKINTERFACE:
            if (isSms)
                return `Id : `+ objectContent?.id + `https://portal.azure.com/#@/resource/` + objectContent?.id
            else
                return `Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a>`
        case ObjectNameEnum.NAMESPACE:
            logger.debug(objectContent)
            return `Name : ` + objectContent.metadata.name
        case ObjectNameEnum.PODS:
            if (isSms)
                return `Name : ` + objectContent.metadata.generateName + ` and NameSpace : ` + objectContent.metadata.namespace
            else
                return `Name : ` + objectContent.metadata.generateName + `</br>NameSpace : ` + objectContent.metadata.namespace
        case ObjectNameEnum.HELM:
            return `Name : ` + objectContent.metadata.generateName
        default:
            return `Id : ` + objectContent.id
    }
}
function cutAWSAvailabilityToRegion(inputString: string): string {
    const regionNumber = inputString.search(/\d+(?![\d])/);
    if (regionNumber !== -1) {
        console.log("Region AWS : " + inputString.substring(0, regionNumber + 1));
        return inputString.substring(0, regionNumber + 1);
    }
    return inputString;
}

export function awsPropertyToSend(rules: Rules, objectContent: any, isSms: boolean): string {
    let link = "https://" + AWSRegion + ".console.aws.amazon.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rules?.objectName) {
        case ObjectNameEnum.EC2VOLUME:
            return fullLink + `ec2/home?region=` + cutAWSAvailabilityToRegion(objectContent?.AvailabilityZone) + `#VolumeDetails:volumeId=`+ objectContent?.VolumeId + (isSms ? ' ' : '">') + objectContent?.VolumeId + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.EC2SG:
            return fullLink + `ec2/home?region=` + AWSRegion + `#SecurityGroup:groupId=`+ objectContent?.GroupId + (isSms ? ' ' : '">') + objectContent?.GroupId + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.EC2INSTANCE:
            return fullLink + `ec2/home?region=` + AWSRegion + `#InstanceDetails:instanceId=`+ objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.RDS:
            return fullLink + `rds/home?region=` + AWSRegion + `#InstanceDetails:instanceId=`+ objectContent?.Instances[0]?.InstanceId + (isSms ? ' ' : '">') + objectContent?.Instances[0]?.InstanceId + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.TAGSVALUE:
            return fullLink + `resource-groups/tag-editor/find-resources?region=` + AWSRegion + (isSms ? ' ' : '">') + objectContent?.name + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.ECRREPOSITORY:
            return fullLink + objectContent?.repositoryUri + (isSms ? ' ' : '">') + objectContent?.repositoryName + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.ECSCLUSTER:
            return 'ClutserArn :' + objectContent?.clusterArn;
        case ObjectNameEnum.RESOURCEGROUPS:
            return 'GroupArn :' + objectContent?.GroupArn;
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}

export function kubPropertyToSend(rules: Rules, objectContent: any, isSms: boolean): string {
    switch (rules?.objectName) {
        case ObjectNameEnum.NAMESPACE:
            return `Namespace name : ` + objectContent?.metadata[0]?.name + ` with uid : ` + objectContent?.metadata[0]?.uid
        case ObjectNameEnum.PODS:
            return `Pod name : ` + objectContent?.metadata[0]?.name + ` with uid : ` + objectContent?.metadata[0]?.uid
        case ObjectNameEnum.HELM:
            return `Helm name : ` + objectContent?.metadata[0]?.name + ` with uid : ` + objectContent?.metadata[0]?.uid
        default:
            return 'AWS Scan : Id : ' + objectContent.id;
    }
}

export function gitPropertyToSend(rules: Rules, objectContent: any, isSms: boolean): string {
    let link = "https://github.com/";
    let webLink = `Id : <a href="`;
    let fullLink;
    if (isSms)
        fullLink = link;
    else
        fullLink = webLink.concat(link.toString());
    switch (rules?.objectName) {
        case ObjectNameEnum.REPOSITORIES:
            return fullLink + objectContent?.full_name + (isSms ? ' ' : '">') + objectContent?.id + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.BRANCHES:
            return (isSms ? webLink : '') + objectContent?.repoUrl + (isSms ? ' ' : '">') + 'Branche name : ' + objectContent?.name + (isSms ? `.` : `</a>`)
        case ObjectNameEnum.ISSUES:
            return (isSms ? webLink : '') + objectContent?.html_url + (isSms ? ' ' : '">') + 'Issue id : ' + objectContent?.id + (isSms ? `.` : `</a>`)
        default:
            return 'GIT Scan : Id : ' + objectContent.id;
    }
}

export function httpPropertyToSend(rules: Rules, objectContent: any, isSms: boolean): string {
    switch (rules?.objectName) {
        case ObjectNameEnum.REQUEST:
            return `Url : ` + objectContent?.url + ` with status : ` + objectContent?.status
        default:
            return 'HTTP Scan : Id : ' + objectContent.id;
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