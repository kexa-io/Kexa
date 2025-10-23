import { LevelEnum } from './../enum/level.enum';
import fs from "fs";
import yaml from "js-yaml";
import type { SettingFile } from "../models/settingFile/settingFile.models";
import type { Rules } from "../models/settingFile/rules.models";
import type { ParentRules, RulesConditions } from "../models/settingFile/conditions.models";
import { ConditionEnum } from "../enum/condition.enum";
import type { ProviderResource } from "../models/providerResource.models";
import { OperatorEnum } from "../enum/operator.enum";
import type { ResultScan, SubResultScan } from "../models/resultScan.models";
import { alertFromRule } from "./alerte.service";
import type { Alert } from "../models/settingFile/alert.models";
import type { ConfigAlert } from "../models/settingFile/configAlert.models";
import type { GlobalConfigAlert } from "../models/settingFile/globalAlert.models";
import { AlertEnum } from '../enum/alert.enum';
import {getConfigOrEnvVar} from './manageVarEnvironnement.service';
import moment, { type Moment, type unitOfTime } from 'moment';
import { BeHaviorEnum } from '../enum/beHavior.enum';
import { writeStringToJsonFile } from '../helpers/files';
import { extractHeaders } from './addOn.service';

////////////////////////////////////////////////////////////////////////////////////////////////////////

import {getContext, getNewLogger} from "./logger.service";
import { splitProperty } from '../helpers/spliter';
import { downloadFile, unzipFile } from '../helpers/dowloadFile';
import { getConfig } from '../helpers/loaderConfig';
import { jsonStringify } from '../helpers/jsonStringify';
import { Memoisation } from './memoisation.service';
const logger = getNewLogger("AnalyseLogger");
import {getSettingsFileFromApi} from "../services/api/loaderApi.service";

const varEnvMin = {
    "email": ["EMAILPORT", "EMAILHOST", "EMAILUSER", "EMAILPWD", "EMAILFROM"],
    "sms": ["SMSACCOUNTSID", "SMSAUTHTOKEN", "SMSFROM"],
}
let config: any;
async function init() {
    try {
        config = await getConfig();
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}

await init();

const defaultRulesDirectory = "./rules";
const secondDefaultRulesDirectory = "./Kexa/rules";

let headers: any;
// Analyze  list
// read the yaml file with rules
// exam each rules and raise alarm or not
export async function gatheringRules(rulesDirectory:string, getAll:boolean=false): Promise<SettingFile[]> {

    headers = await extractHeaders();

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        logger.warn("Interface configuration enabled, if you're not running Kexa script to work with the SaaS, please configure INTERFACE_CONFIGURATION_ENABLED to false in your .env file");
        let rules =  await getSettingsFileFromApi(config);
        extractAddOnNeed(rules);
        logger.debug("rules list:");
        logger.debug(rules.map((value) => value.alert.global.name).join(", "));
        return rules;
    }

    if(rulesDirectory.startsWith("http")){
        logger.debug("gathering distant rules");
        await gatheringDistantRules(rulesDirectory);
        rulesDirectory = defaultRulesDirectory;
    }
    let paths: fs.Dirent[];
    let settingFileList: SettingFile[] = [];
    let setting: any;
    try {
        paths = fs.readdirSync(rulesDirectory, { withFileTypes: true});
        if(paths.length === 0) paths = fs.readdirSync(secondDefaultRulesDirectory, { withFileTypes: true});
        logger.debug("listing rules files.");
        settingFileList = new Array<SettingFile>;
        try {
            const headersContent = fs.readFileSync('./config/headers.json', 'utf-8');
            headers = JSON.parse(headersContent);
        } catch (headersErr) {
            logger.warn("Could not load headers.json, using empty object");
            headers = {};
        }
    } catch (err) {
        logger.error("Error reading rules directory: " + err);
        throw new Error("Rules directory not found or empty");
    }
    let listNeedRules = await getListNeedRules();
    for(const p of paths) {
        logger.debug("getting "+rulesDirectory+"/"+p.name+" rules.");
        setting = await analyzeRule(rulesDirectory+"/"+p.name, listNeedRules, getAll);
        if(setting){
            setting.alert.global.name = p.name.split(".")[0];
            settingFileList.push(setting);
        }
    }
    extractAddOnNeed(settingFileList);
    logger.debug("rules list:");
    logger.debug(settingFileList.map((value) => value.alert.global.name).join(", "));
    return settingFileList;
}

export async function gatheringDistantRules(rulesOrigin:string, rulesDirectory:string=defaultRulesDirectory): Promise<boolean> {
    try{
        await downloadFile(rulesOrigin, rulesDirectory, "application/zip");
        await unzipFile(rulesDirectory);
        return true;
    }catch(err){
        logger.info("Falling back to local rules");
        return false;
    }
}

export function extractAddOnNeed(settingFileList: any[]){
    let providerList = new Array<string>();
    let objectNameList:any = {};
    settingFileList.forEach((ruleFile) => {
        objectNameList[ruleFile.alert.global.name] = {};
        ruleFile.rules.forEach((rule: any) => {
            if (rule.applied === false) return;
            if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
                if (!providerList.includes(rule.cloudProvider.name))
                    providerList.push(rule.cloudProvider.name);
            }
            else if (!providerList.includes(rule.cloudProvider)) {
                    providerList.push(rule.cloudProvider);
            }
            if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
                if(!objectNameList[ruleFile.alert.global.name][rule.cloudProvider.name])
                    objectNameList[ruleFile.alert.global.name][rule.cloudProvider.name] = new Array<string>();    
            }
            else if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider])
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider] = new Array<string>();
            if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
                if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider.name].includes(rule.objectName.name))
                    objectNameList[ruleFile.alert.global.name][rule.cloudProvider.name].push(rule.objectName.name);
            }
            else if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider].includes(rule.objectName))
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider].push(rule.objectName);
        });
    });
    writeStringToJsonFile(jsonStringify({ "addOn" : providerList, "objectNameNeed": objectNameList }), "./config/addOnNeed.json");
}

async function getListNeedRules(): Promise<string[]> {
    const config = await getConfig();
    let listNeedRules = new Array<string>();
    for(let cloudProvider of Object.keys(config)){
        if(["host", "host", "workerId", "requestId", "grpcMaxMessageLength"].includes(cloudProvider)) continue;
        let configAssign = config[cloudProvider];
        try{
            for(let config of configAssign){
                if (Array.isArray(config.rules)) {
                    for (let rule of config.rules) {
                        if (!listNeedRules.includes(rule)) listNeedRules.push(rule);
                    }
                }
            }
        }catch(err){
            logger.debug("error in getListNeedRules:"+err);
        }
    }
    return listNeedRules;
}

export async function analyzeRule(ruleFilePath:string, listNeedRules:string[], getAll:boolean=false): Promise<SettingFile | null> {
    logger.debug("analyze:"+ruleFilePath);
    try {
        let lastBlockSplited = ruleFilePath.split('/')[ruleFilePath.split('/').length -1].split(".");
        if(lastBlockSplited.length == 1){
            // todo : analyze all files in the directory recursively
            logger.debug("It's a directory");
            return null;
        }
        const name = lastBlockSplited[0];
        if(!listNeedRules.includes(name) && !getAll){
            logger.debug("rule not needed:"+name);
            return null;
        }
        let contentRuleFile = fs.readFileSync(ruleFilePath, 'utf8');
        const configHere = await getConfig();
        contentRuleFile = replaceElement(contentRuleFile, configHere?.variable?.[name]);
        const doc = (yaml.load(contentRuleFile) as SettingFile[])[0];
        let result = await checkDoc(doc);
        logCheckDoc(result);
        result.forEach((value) => {
            if(value.startsWith("error")) throw new Error(value);
        });
        logger.info("rule:"+name+" is valid");
        return doc;
    } catch (e) {
        logger.error("error - "+ ruleFilePath + " was not load properly : "+e);
        return null;
    }
}

export function replaceElement(contentRuleFile:string, variable: any){
    if(!variable) return contentRuleFile;
    if(typeof variable !== "object") return contentRuleFile
    for(let key of Object.keys(variable)){
        if(typeof variable[key] === "object"){
            contentRuleFile = replaceBlockVariable(contentRuleFile, variable[key], key);
        }else{
            contentRuleFile = replaceVariable(contentRuleFile, variable[key], key);
        }
    }
    return contentRuleFile;
}

export function replaceVariable(contentRuleFile:string, variable: string|number|boolean, key: string){
    if(!variable) return contentRuleFile;
    let regex = new RegExp('\\b' + key + ': &' + key + '\\b', 'g')
    if(regex.test(contentRuleFile)){
        contentRuleFile = contentRuleFile.slice(0, regex.lastIndex).trimEnd() + " " + variable.toString() + contentRuleFile.slice(regex.lastIndex)
    }
    return contentRuleFile;
}

export function replaceBlockVariable(contentRuleFile:string, variable: any, key:string){
    if(!variable) return contentRuleFile;
    let indentation = contentRuleFile.split('\n').filter((line:string) => {return line.trim() !== '' && /^(\s+)/.test(line)})[0].match(/^(\s+)/)?.[0]??"  ";
    variable = yaml.dump(variable, { indent: indentation.length });
    let regex = new RegExp('\\b' + key + ': &' + key + '\\b', 'g')
    if(regex.test(contentRuleFile)){
        const lastIndex = regex.lastIndex;
        contentRuleFile = contentRuleFile.slice(0, lastIndex).trimEnd() +"\n"+ variable.toString().split('\n').map((line: string) => indentation + indentation + line).join('\n') + contentRuleFile.slice(lastIndex)
    }
    return contentRuleFile;
}

export function logCheckDoc(result:string[]): void {
    logger.debug("log check doc");
    result.forEach((value) => {
        if(value.startsWith("error")) logger.error(value);
        else if(value.startsWith("warn")) logger.warn(value);
        else if(value.startsWith("info")) logger.info(value);
        else logger.debug(value);
    });
}

export async function checkDoc(doc:SettingFile): Promise<string[]> {
    logger.debug("check doc");
    let result:string[] = [];
    if(!doc.hasOwnProperty("version")) result.push("info - version not found in doc");
    else if(RegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/).exec(doc.version) === null) result.push("debug - version not valid in doc : "+ doc.version);
    if(!doc.hasOwnProperty("date")) result.push("info - date not found in doc");
    else if(RegExp(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/).exec(doc.date) === null) result.push("debug - date not valid format in doc, must be (DD-MM-YYYY) : "+ doc.date);
    (await checkDocAlert(doc.alert)).forEach((value) => result.push(value));
    checkDocRules(doc.rules).forEach((value) => result.push(value));
    return result;
}

export async function checkDocAlert(alert:Alert): Promise<string[]> {
    logger.debug("check Alert in doc");
    let result:string[] = [];
    for(let level of Object.keys(LevelEnum)){
        if (!isNaN(Number(level))) {
            continue;
        }
        if(!alert.hasOwnProperty(level.toLowerCase())){
            result.push("error - "+level.toLowerCase()+" not found in alert");
            continue;
        }
        if(level.toLowerCase() != "global"){
            (await checkDocAlertConfig(alert[level.toLowerCase() as keyof typeof alert], level.toLowerCase())).forEach((value) => result.push(value));
        }else{
            (await checkDocAlertGlobal(alert.global)).forEach((value) => result.push(value));
        }
    }
    return result;
}

export async function checkDocAlertConfig(alertConfig:ConfigAlert, level:string): Promise<string[]> {
    logger.debug("check Alert config in doc");
    let result:string[] = [];
    if(!alertConfig.hasOwnProperty("enabled")) result.push("error - enabled not found in alert config for "+level);
    else if(typeof alertConfig.enabled !== "boolean") result.push("error - enabled not boolean in alert config for "+level + " : "+alertConfig.enabled);
    if(!alertConfig.hasOwnProperty("type")) result.push("error - type not found in alert config for "+level);
    else {
        if (alertConfig.type.length === 0) result.push("error - type empty in alert config for "+level);
        for(let type of alertConfig.type){
            if(!Object.values(AlertEnum).includes(type)){
                result.push("warn - type not valid in alert config for "+level+" : "+type);
                continue;
            }
            try{
                for(let env of varEnvMin[type.toLowerCase() as keyof typeof varEnvMin]){
                    if(!(await getConfigOrEnvVar(config, env))) result.push("error - "+env+" not found in env for "+level);
                }
            }catch(err){}
        };
    }
    if(alertConfig.hasOwnProperty("type") && alertConfig.type.some((type: string) => type !== AlertEnum.LOG)){
        if(!alertConfig.hasOwnProperty("to")) result.push("error - to not found in alert config for "+level);
        else {
            if (alertConfig.to.length === 0) result.push("warn - to empty in alert config for "+level);
            alertConfig.to.forEach((to) => {
                if(typeof to !== "string") result.push("error - to not string in alert config for "+level + " : "+to);
            });
        }
    }
    return result;
}

export async function checkDocAlertGlobal(alertGlobal:GlobalConfigAlert): Promise<string[]> {
    logger.debug("check Alert global in doc");
    let result:string[] = [];
    (await checkDocAlertConfig(alertGlobal, "global")).forEach((value) => result.push(value));
    if(!alertGlobal.hasOwnProperty("conditions")) result.push("error - conditions not found in alert global config");
    else {
        if (alertGlobal.conditions.length === 0) result.push("error - conditions empty in alert global config");
        alertGlobal.conditions.forEach((condition) => {
            if(!condition.hasOwnProperty("level")) result.push("error - level not found in alert global config");
            else if(!Object.values(LevelEnum).includes(condition.level)) result.push("warn - level not valid in alert global config for "+condition.level);
            if(!condition.hasOwnProperty("min")) result.push("error - min not found in alert global config");
            else if(typeof condition.min !== "number" && condition.min >= 0) result.push("warn - min is not positive number in alert global config : "+condition.min);
        });
    }
    //if (!alertGlobal.hasOwnProperty("name")) result.push("error - name empty in alert global config");
    //else if (typeof alertGlobal.name !== "string") result.push("warn - name not string in alert global config : "+alertGlobal.name);
    return result;
}

export function checkDocRules(rules:Rules[]): string[] {
    logger.debug("check rules in doc");
    let result:string[] = [];
    if(rules.length === 0) result.push("error - rules empty in doc");
    rules.forEach((rule) => {
        if(!rule.hasOwnProperty("name")) result.push("info - name not found in rule");
        else if(typeof rule.name !== "string") result.push("warn - name not string in rule : "+rule.name);
        if(!rule.hasOwnProperty("description")) result.push("info - description not found in rule");
        else if(typeof rule.description !== "string") result.push("warn - description not string in rule: "+rule.description);
        if(!rule.hasOwnProperty("urlDescription")) result.push("debug - urlDescription not found in rule: "+rule.name);
        else if(typeof rule.urlDescription !== "string") result.push("warn - urlDescription not string in rule : "+rule.urlDescription);
        if(!rule.hasOwnProperty("applied")) result.push("error - applied not found in rule");
        else if(typeof rule.applied !== "boolean") result.push("error - applied not boolean in rule : "+rule.applied);
        if(!rule.hasOwnProperty("level")) result.push("error - level not found in rule");
        else if(!Object.values(LevelEnum).includes(rule.level)) result.push("warn - level not valid in rule -> default info : "+rule.level);
        if(!rule.hasOwnProperty("cloudProvider")) result.push("error - cloudProvider not found in rule");
        else if(!Object.keys(headers).includes(rule.cloudProvider)) result.push("error - cloudProvider not valid in rule : "+rule.cloudProvider + "\nYou have to add this addOn to validate the rules");
        if(!rule.hasOwnProperty("objectName")) result.push("error - objectName not found in rule");
        else if(!Object.keys(headers).includes(rule.cloudProvider) || !headers[rule.cloudProvider]["resources"]?.includes(rule.objectName)) result.push("error - objectName not valid in rule : "+rule.objectName+ "\nYou have to verify your addOn gathering data about it");
        if(!rule.hasOwnProperty("conditions")) result.push("error - conditions not found in rule");
        else {
            if (rule.conditions.length === 0) result.push("error - conditions empty in rule");
            rule.conditions.forEach((condition) => {
                checkRuleCondition(condition).forEach((value) => result.push(value));
            });
        }
    });
    return result;
}

export function checkRuleCondition(condition:RulesConditions|ParentRules): string[] {
    logger.debug("check rule condition");
    let result:string[] = [];
    if(condition.hasOwnProperty("criteria")){
        checkParentRuleCondition(condition as ParentRules).forEach((value) => result.push(value));
    }else{
        checkSubRuleCondition(condition as RulesConditions).forEach((value) => result.push(value));
    }
    return result;
}

export function checkParentRuleCondition(parentRule:ParentRules): string[] {
    logger.debug("check parent rule condition");
    let result:string[] = [];
    if(!parentRule.hasOwnProperty("name")) result.push("debug - name not found in parent rule condition");
    else if(typeof parentRule.name !== "string") result.push("warn - name not string in parent rule condition : "+parentRule.name);
    if(!parentRule.hasOwnProperty("description")) result.push("debug - description not found in parent rule condition");
    else if(typeof parentRule.description !== "string") result.push("warn - description not string in parent rule condition : "+parentRule.description);
    if(!parentRule.hasOwnProperty("operator")) result.push("error - operator not found in parent rule condition");
    else if(!Object.values(OperatorEnum).includes(parentRule.operator)) result.push("error - operator not valid in parent rule condition : " + parentRule.operator);
    else if(parentRule.operator === OperatorEnum.NOT && parentRule.criteria.length > 1) result.push("warn - operator not will be considered in criteria only the first one");
    if(!parentRule.hasOwnProperty("criteria")) result.push("error - criteria not found in parent rule condition");
    else {
        if (parentRule.criteria.length === 0) result.push("error - criteria empty in parent rule condition");
        parentRule.criteria.forEach((rule) => {
            checkRuleCondition(rule).forEach((value) => result.push(value));
        });
    }
    return result;
}

export function checkSubRuleCondition(subRule:RulesConditions): string[] {
    logger.debug("check sub rule condition");
    let result:string[] = [];
    if(!subRule.hasOwnProperty("property")) result.push("error - property not found in sub rule condition");
    else if(typeof subRule.property !== "string") result.push("error - property not string in sub rule condition : "+subRule.property);
    if(!subRule.hasOwnProperty("condition")) result.push("error - condition not found in sub rule condition");
    else if(!Object.values(ConditionEnum).includes(subRule.condition)) result.push("error - condition not valid in sub rule condition : " + subRule.condition);
    else if (subRule.condition.includes("DATE") && !subRule.hasOwnProperty("date")) result.push("error - date not found in sub rule condition");
    if(!subRule.hasOwnProperty("value")) result.push("error - value not found in sub rule condition");
    // else if(typeof subRule.value !== "string" && typeof subRule.value !== "number" && !Array.isArray(subRule.value)) result.push("error - value not valid in sub rule condition : " + subRule.value);
    else if(Array.isArray(subRule.value) && subRule.value.length === 0) result.push("error - value empty in sub rule condition");
    else if(Array.isArray(subRule.value)){
        if(subRule.condition === ConditionEnum.IN || subRule.condition === ConditionEnum.NOT_IN) {
        } else {
            subRule.value.forEach((value) => {
                checkRuleCondition(value).forEach((value) => result.push(value));
            });
        }
    }

    return result;
}

function checkMatchConfigAndResource(rule:Rules, resources:ProviderResource, index: number): BeHaviorEnum {
    if(!resources[rule.cloudProvider]){
        logger.warn("This cloud provider is not supported:"+rule.cloudProvider + "\nDon't forget to add this addOn");
        return BeHaviorEnum.RETURN;
    }
    if(!Array.isArray(resources[rule.cloudProvider]) || resources[rule.cloudProvider]?.length === 0){
        logger.warn("Did not retriev any resources for cloud provider "+rule.cloudProvider + " with configuration index " + index + "\nVerify credentials and configuration");
        return BeHaviorEnum.RETURN;
    }
    if(!resources[rule.cloudProvider]?.[index]?.hasOwnProperty(rule.objectName)){
        logger.warn("object name : "+rule.objectName + " not found in your provider " + rule.cloudProvider + " with configuration index " + index + "\nMake sure you have the right addOn or the right spelling in your rules");
        return BeHaviorEnum.CONTINUE;
    }
    if(resources[rule.cloudProvider]?.[index]?.[rule.objectName] === null){
        logger.warn("No " + rule.objectName + " found in your provider " + rule.cloudProvider + " with configuration index " + index);
        return BeHaviorEnum.CONTINUE;
    }
    return BeHaviorEnum.NONE;
}

export function checkRules(rules:any[], resources:ProviderResource, alert: Alert, configFuzz?: any): ResultScan[][] {
    const context = getContext();
    logger.debug("check rules");
    let result: ResultScan[][] = [];
    const configuration = configFuzz ?? config;



    rules.forEach(rule => {
        if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
            let condObj;
            try {
                condObj = typeof rule.conditions === 'string' ? 
                JSON.parse(rule.conditions) : rule.conditions;
            } catch (e) {
                return;
            }
            rule.conditions = condObj;
            rule.cloudProvider = rule.cloudProvider.name as string;
        }
        if(!rule.applied) return;
        context?.log("check rule:"+rule.name);
        logger.info("check rule:"+rule.name);

        if(!configuration.hasOwnProperty(rule.cloudProvider)){
            logger.debug("cloud provider not found in config:"+rule.cloudProvider);
            return;
        }

        let configAssign = configuration[rule.cloudProvider];

        if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
            configAssign.forEach((config: any) => {
                if (Array.isArray(config.notificationGroups)) {
                    for (const notificationGroup of config.notificationGroups) {
                        if (!config.rules.includes(notificationGroup.name))
                            config.rules.push(notificationGroup.name);
                    }
                }
            });
        }

        let objectResources:any = []
        for(let i = 0; i < configAssign.length; i++){
            if(configAssign[i].rules.includes(alert.global.name)){
                if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
                    rule.objectName = rule.objectName.name;
                }
                context?.log("check rule with config with index/prefix :"+ (configAssign[i].prefix??i));
                logger.info("check rule with config "+ rule.cloudProvider +" with index/prefix :"+ (configAssign[i].prefix??i));
                switch(checkMatchConfigAndResource(rule, resources, i)){
                    case BeHaviorEnum.RETURN:
                        return;
                    case BeHaviorEnum.CONTINUE:
                        continue;
                }
                objectResources = [...objectResources, ...resources[rule.cloudProvider]?.[i]?.[rule.objectName]]
            }
        }
        let subResult: ResultScan[] = [];
        if(rule.conditions[0].hasOwnProperty("property") && (rule.conditions[0] as RulesConditions).property === "."){
            let subResultScan: SubResultScan[] = checkRule(rule.conditions, objectResources);
            subResult.push({
                objectContent: {
                    "id": "global property",
                },
                rule: rule,
                error: actionAfterCheckRule(rule, objectResources, alert, subResultScan),
            });
        }else{
            logger.info("gatherered "+ objectResources.length + " resource(s) to be check with this rule.");
            objectResources.forEach((objectResource: any) => {
                let subResultScan: SubResultScan[] = checkRule(rule.conditions, objectResource);
                subResult.push({
                    objectContent: objectResource,
                    rule: rule,
                    error: actionAfterCheckRule(rule, objectResource, alert, subResultScan),
                });
            });
        }
        if(rule.loud && subResult[subResult.length - 1].error.length <= 0){
            subResult[subResult.length - 1].loud = {
                value: subResult[subResult.length - 1].objectContent,
                condition: rule.conditions,
                result: true,
                message : rule.loudMessage??rule.name
            };
        }
        result.push(subResult);
    });
    return result;
}

function actionAfterCheckRule(rule: Rules, objectResource: any, alert: Alert, subResultScan: SubResultScan[]): SubResultScan[] {
    let error = subResultScan.filter((value) => !value.result);
    if(error.length > 0){
        if (rule.cloudProvider === "fuzz")
            alertFromRule(rule, subResultScan, objectResource, alert);
        else if (Memoisation.needToBeCache(rule, objectResource, rule.cloudProvider)){
            alertFromRule(rule, subResultScan, objectResource, alert);
        }
    }
    return error;
}

export function checkRule(conditions: RulesConditions[]|ParentRules[], resources:any): SubResultScan[] {
    logger.debug("check subrule");
    let result: SubResultScan[] = [];
    conditions.forEach(condition => {
        if(condition.hasOwnProperty("criteria")) {
            result.push(checkParentRule(condition as ParentRules, resources));
        } else {
            condition = condition as RulesConditions;
            logger.debug("check condition:"+condition.property);
            result.push(checkCondition(condition, resources));
        }
    });
    return result;
}

export function checkParentRule(parentRule:ParentRules, resources:any): SubResultScan {
    logger.debug("check parent rule");
    let result: SubResultScan[] = checkRule(parentRule.criteria, resources);
    switch(parentRule.operator){
        case OperatorEnum.AND:
            return parentResultScan(result, result.every((value) => value.result));
        case OperatorEnum.OR:
            return parentResultScan(result, result.some((value) => value.result));
        case OperatorEnum.XOR:
            return parentResultScan(result, result.filter((value) => value.result).length === 1);
        case OperatorEnum.NAND:
            return parentResultScan(result, !result.every((value) => value.result));
        case OperatorEnum.NOR:
            return parentResultScan(result, !result.some((value) => value.result));
        case OperatorEnum.XNOR:
            return parentResultScan(result, result.filter((value) => value.result).length !== 1);
        case OperatorEnum.NOT:
            return parentResultScan(result, !result[0].result);
        default:
            return {
                value: resources,
                condition: [],
                result: false,
                message : "operator not found in " + Object.keys(OperatorEnum).join(", ")
            };
    }
}

export function parentResultScan(subResultScans: SubResultScan[], result: boolean): SubResultScan {
    return {
        value: null,
        condition: subResultScans.map((value) => value.condition).flat(),
        result,
        message : subResultScans.map((value) => value.message).filter(item => item != "").join(" || ")
    };
}


export function checkCondition(condition:RulesConditions, resource:any): SubResultScan {
    try{
        let value = getSubProperty(resource, condition.property);
        condition.value ??= '';
        if (value === undefined)
            value = '';
        switch(condition.condition){
            case ConditionEnum.EQUAL:
                return resultScan(condition, value, [checkEqual]);
            case ConditionEnum.DIFFERENT:
                return resultScan(condition, value, [checkEqual], true);
            case ConditionEnum.SUP:
                return resultScan(condition, value, [checkGreaterThan]);
            case ConditionEnum.SUP_OR_EQUAL:
                return resultScan(condition, value, [checkGreaterThan, checkEqual]);
            case ConditionEnum.INF:
                return resultScan(condition, value, [checkLessThan]);
            case ConditionEnum.INF_OR_EQUAL:
                return resultScan(condition, value, [checkLessThan, checkEqual]);
            case ConditionEnum.INCLUDE:
                return resultScan(condition, value, [checkInclude]);
            case ConditionEnum.NOT_INCLUDE:
                return resultScan(condition, value, [checkInclude], true);
            case ConditionEnum.STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith]);
            case ConditionEnum.NOT_STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith], true);
            case ConditionEnum.ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith]);
            case ConditionEnum.NOT_ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith], true);
            case ConditionEnum.INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS]);
            case ConditionEnum.NOT_INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS], true);
            case ConditionEnum.REGEX:
                return resultScan(condition, value, [checkRegex]);
            case ConditionEnum.ALL:
                return resultScan(condition, value, [checkAll]);
            case ConditionEnum.NOT_ANY:
                return resultScan(condition, value, [checkAll], true);
            case ConditionEnum.SOME:
                return resultScan(condition, value, [checkSome]);
            case ConditionEnum.ONE:
                return resultScan(condition, value, [checkOne]);
            case ConditionEnum.COUNT:
                return resultScan(condition, value.length, [checkEqual]);
            case ConditionEnum.COUNT_SUP:
                return resultScan(condition, value.length, [checkGreaterThan]);
            case ConditionEnum.COUNT_SUP_OR_EQUAL:
                return resultScan(condition, value.length, [checkGreaterThan, checkEqual]);
            case ConditionEnum.COUNT_INF:
                return resultScan(condition, value.length, [checkLessThan]);
            case ConditionEnum.COUNT_INF_OR_EQUAL:
                return resultScan(condition, value.length, [checkLessThan, checkEqual]);
            case ConditionEnum.DATE_EQUAL:
                return resultScan(condition, value, [checkEqualDate]);
            case ConditionEnum.DATE_SUP:
                return resultScan(condition, value, [checkGreaterThanDate]);
            case ConditionEnum.DATE_SUP_OR_EQUAL:
                return resultScan(condition, value, [checkGreaterThanDateOrEqual]);
            case ConditionEnum.DATE_INF:
                return resultScan(condition, value, [checkLessThanDate]);
            case ConditionEnum.DATE_INF_OR_EQUAL:
                return resultScan(condition, value, [checkLessThanDateOrEqual]);
            case ConditionEnum.INTERVAL:
                return resultScan(condition, value, [checkInterval]);
            case ConditionEnum.DATE_INTERVAL:
                return resultScan(condition, value, [checkIntervalDate]);
            case ConditionEnum.IN:
                return resultScan(condition, value, [checkIn]);
            case ConditionEnum.NOT_IN:
                return resultScan(condition, value, [checkNotIn]);
            default:
                return {
                    value,
                    condition: [condition],
                    result: false,
                    message : "condition not found in " + Object.keys(ConditionEnum).join(", ")
                };
        }
    }catch(err) {
        logger.debug("error in checkCondition:"+err);
        return {
            value: resource,
            condition: [condition],
            result: false,
            message : "property not found in resource"
        };
    }
}

export function resultScan(condition: RulesConditions, value: any, fs: Function[], reverse: boolean = false): SubResultScan{
    return {
        value,
        condition: [condition],
        result: (fs.map(f => f(condition, value)).some((value) => value) !== reverse)
    }
}

export function getSubProperty(object:any, property:string): any {
    if (property === ".")  return object;
    let properties = splitProperty(property, ".", "/");
    let result = object;
    properties.forEach(prop => {
        result = result[prop];
    });
    return result;
}

export function checkEqual(condition:RulesConditions, value:any): boolean {
    logger.debug("check equal:" + value + " = " + condition.value + " ?");
    if(value === condition.value) return true;
    return false;
}

export function checkGreaterThan(condition:RulesConditions, value:any): boolean {
    logger.debug("check greater than:" + value + " > " + condition.value + " ?");
    if(typeof value === "number" && value > (condition.value as number)) return true;
    if(~~value > ~~condition.value) return true;
    return false;
}

export function checkLessThan(condition:RulesConditions, value:any): boolean {
    logger.debug("check less than:" + value + " < " + condition.value + " ?");
    if(typeof value === "number" && value < (condition.value as number)) return true;
    if(~~value < ~~condition.value) return true;
    return false;
}

export function checkInclude(condition:RulesConditions, value:any): boolean {
    logger.debug("check include:" + condition.value + " in " + value + " ?");
    if(value.includes(condition.value)) return true;
    return false;
}

export function checkIncludeNS(condition:RulesConditions, value:any): boolean {
    try{
        logger.debug("check include not sensitive:" + String(condition.value).toLowerCase() + " in " + value.toLowerCase() + " ?");
        if(value.toLowerCase().includes(String(condition.value).toLowerCase())) return true;
        return false;
    }catch(err) {
        logger.error("error in checkIncludeNS:"+err);
        return false;
    }
}

export function checkIn(condition:RulesConditions, value:any): boolean {
    logger.debug("check in:" + value + " in array " + JSON.stringify(condition.value) + " ?");
    if(Array.isArray(condition.value)) {
        return condition.value.includes(value);
    }
    return false;
}

export function checkNotIn(condition:RulesConditions, value:any): boolean {
    logger.debug("check not in:" + value + " not in array " + JSON.stringify(condition.value) + " ?");
    if(Array.isArray(condition.value)) {
        return !condition.value.includes(value);
    }
    return true;
}

export function checkRegex(condition:RulesConditions, value:any): boolean {
    if (typeof value == "number") {
        logger.debug("check regex:" + condition.value + "for" + value.toString() + " ?");
        if (RegExp(condition.value.toString()).exec(value.toString()))
            return true;
        else
            return false;
    }
    if (value.match(condition.value))
        return true;
    return false;
}

export function checkStartsWith(condition:RulesConditions, value:any): boolean {
    logger.debug("check starts with:" + condition.value + " for " + value + " ?");
    if(value.startsWith(condition.value)) return true;
    return false;
}

export function checkEndsWith(condition:RulesConditions, value:any): boolean {
    logger.debug("check ends with:" + condition.value + " for " + value + " ?");
    if(value.endsWith(condition.value)) return true;
    return false;
}

export function checkAll(condition:RulesConditions, value:any): boolean {
    logger.debug("check any");
    let result:SubResultScan[][] = [];
    value.forEach((v:any) => {
        result.push(checkRule(condition.value as RulesConditions[]|ParentRules[], v));
    });
    let finalResult:boolean[] = [];
    for (let row of result) for (let e of row) finalResult.push(e.result);
    return finalResult.every((v:boolean) => v);
}

export function checkSome(condition:RulesConditions, value:any): boolean {
    logger.debug("check some");
    let result:SubResultScan[][] = [];
    value.forEach((v:any) => {
        result.push(checkRule(condition.value as RulesConditions[]|ParentRules[], v));
    });
    let finalResult:boolean[] = [];
    for (let row of result) for (let e of row) finalResult.push(e.result);
    return finalResult.some((v:boolean) => v);
}

export function checkOne(condition:RulesConditions, value:any): boolean {
    logger.debug("check one");
    let result:SubResultScan[][] = [];
    value.forEach((v:any) => {
        result.push(checkRule(condition.value as RulesConditions[]|ParentRules[], v));
    });
    let finalResult:boolean[] = [];
    for (let row of result) for (let e of row) finalResult.push(e.result);
    if(finalResult.filter((v:any) => v).length === 1) return true;
    return false;
}

export function checkCount(condition:RulesConditions, value:any): boolean {
    logger.debug("check count: " + value.length + " = " + condition.value + " ?");
    if(value.length === condition.value) return true;
    return false;
}

export function checkEqualDate(condition:RulesConditions, value:any): boolean {
    let value_date = moment(value, condition.date);
    let condition_date = moment(condition.value as string, condition.date);
    logger.debug("check equal date:" + value_date.toISOString() + " = " + condition_date.toISOString() + " ?");
    if(condition_date.isSame(value_date)) return true;
    return false;
}

export function checkIntervalDate(condition:RulesConditions, value:any): boolean {
    let condition_value = (condition.value as string).split(" ");
    let value_date = moment(value, condition.date).toDate();
    let condition_date_one = moment(condition_value[0], condition.date).toDate();
    let condition_date_two = moment(condition_value[1], condition.date).toDate();
    logger.debug("check interval date:" + condition_date_one + ">=" + value_date + ">=" + condition_date_two + " ?");
    if(value_date >= condition_date_one && value_date <= condition_date_two) return true;
    return false;
}

export function checkInterval(condition:RulesConditions, value:any): boolean {
    let condition_value = (condition.value as string).split(" ");
    logger.debug("check interval" + condition_value[0] + " =< " + value + " =< " + condition_value[1] + " ?");
    if(value >= condition_value[0] && value <= condition_value[1]) return true;
    return false;
}

const unitTime: unitOfTime.DurationAs[] = ["seconds", "minutes", "hours", "days", "weeks", "months", "years"]
export function generateDate(differential: string, add:boolean=true): Moment {
    let differentialList = differential.split(" ");
    let date = moment();
    for(let i = 0; i < differentialList.length; i++){
        const unit = unitTime[i];
        if(add){
            date.add(Number(differentialList[i]), unit);
        }else{
            date.subtract(Number(differentialList[i]), unitTime[i]);
        }
    }
    return date;
}

export function checkGreaterThanDateOrEqual(condition:RulesConditions, value:any): boolean {
    logger.debug("check greater than date or equal: " + value + " >= " + condition.value + " ?");
    return checkGreaterThanDate(condition, value) || checkEqualThanDate(condition, value, false);
}

export function checkLessThanDateOrEqual(condition:RulesConditions, value:any): boolean {
    logger.debug("check less than date or equal: " + value + " <= " + condition.value + " ?");
    return checkLessThanDate(condition, value) || checkEqualThanDate(condition, value, false);
}

export function checkGreaterThanDate(condition:RulesConditions, value:any): boolean {
    let dynamic_date = generateDate(condition.value as string, false);
    let value_date = moment(value, condition.date).toDate();
    logger.debug("check greater than date :" + value_date.toISOString() + " < " + dynamic_date.toISOString() + " ?");
    if(value_date < dynamic_date.toDate()) return true;
    return false;
}

export function checkLessThanDate(condition:RulesConditions, value:any): boolean {
    let dynamic_date = generateDate(condition.value as string, false);
    let value_date = moment(value, condition.date).toDate();
    logger.debug("check less than date:" + value_date.toISOString() + " > " + dynamic_date.toISOString() + " ?");
    if ( value_date.toString() === "Invalid Date" ) logger.warn("Invalid format date, please check your date format in your rule")
    if(value_date > dynamic_date.toDate()) return true;
    return false;
}

export function checkEqualThanDate(condition:RulesConditions, value:any, add:boolean=true): boolean {
    let dynamic_date = generateDate(condition.value as string, add);
    let value_date = moment(value, condition.date);
    logger.debug("check equal than date:" + value_date.toISOString() + " > " + dynamic_date.toISOString() + " ?");
    if(dynamic_date.isSame(value_date, 'day')) return true;
    return false;
}
