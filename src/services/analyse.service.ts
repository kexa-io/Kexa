import { Logger } from "tslog";
import fs from "fs";
import yaml from "js-yaml";
import { SettingFile } from "../models/settingFile/settingFile.model";
import { Rules } from "../models/settingFile/rules.model";
import { ParentRules, RulesConditions } from "../models/settingFile/conditions.model";
import { ConditionEnum } from "../enum/condition.enum";
import { ProviderResource } from "../models/providerResource.models";
import { OperatorEnum } from "../enum/operator.enum";
import { LevelEnum } from "../enum/level.enum";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
export function gatheringRules(rulesDirectory:string): Rules[] {
    // list directory
    const paths = fs.readdirSync(rulesDirectory, { withFileTypes: true});
    logger.debug("listing rules files.");
    let rulesList = new Array<Rules>;
    for(const p of paths) {
        logger.debug("getting "+rulesDirectory+"/"+p.name+" rules.");

        let rules = analyseRule(rulesDirectory+"/"+p.name);
        if( rules) rulesList.push(...rules);
    }
    logger.debug("rules list:"+rulesList);
    return rulesList;
}

export function analyseRule(ruleFilePath:string): Rules[]|null {
    logger.debug("analyse:"+ruleFilePath);
    try {
        const doc = (yaml.load(fs.readFileSync(ruleFilePath, 'utf8')) as SettingFile[])[0];

        //TODO : be more precise on the type of doc
        let rules = doc.rules;
        return rules;
    } catch (e) {
        logger.error("error"+e);
        return null;
    }    
}

export function checkRules(rules:Rules[], resources:ProviderResource): boolean[][] {
    logger.debug("check rules");
    let result: boolean[][] = [];
    rules.forEach(rule => {
        if(!rule.applied) return;
        logger.info("check rule:"+rule.name);
        let objectResources = resources[rule.cloudProvider][rule.objectName];
        let subResult: boolean[] = [];
        objectResources.forEach((objectResource: any) => {
            let microResult = checkRule(rule.conditions, objectResource).every((value) => value);
            if(!microResult){
                alertFromRule(rule, objectResource);
            }
            subResult.push(microResult);
        });
        result.push(subResult);
    });
    logger.debug("result:");
    logger.debug(result);
    return result;
}

export function checkRule(conditions: RulesConditions[]|ParentRules[], resources:any): boolean[] {
    logger.debug("check subrule");
    let result: boolean[] = [];
    conditions.forEach(condition => {
        if(condition.hasOwnProperty("rules")) {
            result.push(checkParentRule(condition as ParentRules, resources));
        } else {
            condition = condition as RulesConditions;
            logger.debug("check condition:"+condition.property);
            result.push(checkCondition(condition, resources));
        }
    });
    return result;
}

export function checkParentRule(parentRule:ParentRules, resources:any): boolean {
    logger.debug("check parent rule");
    let result: boolean[] = checkRule(parentRule.rules, resources);
    switch(parentRule.operator){
        case OperatorEnum.AND:
            return result.every((value) => value);
        case OperatorEnum.OR:
            return result.some((value) => value);
        case OperatorEnum.XOR:
            return result.filter((value) => value).length === 1;
        case OperatorEnum.NAND:
            return !result.every((value) => value);
        case OperatorEnum.NOR:
            return !result.some((value) => value);
        case OperatorEnum.XNOR:
            return result.filter((value) => value).length !== 1;
        default:
            return false;
    }
}

export function checkCondition(condition:RulesConditions, resources:any): boolean {
    try{
        let value = getSubProperty(resources, condition.property);
        switch(condition.condition){
            case ConditionEnum.EQUAL:
                return checkEqual(condition, value);
            case ConditionEnum.DIFFERENT:
                return !checkEqual(condition, value);
            case ConditionEnum.SUP:
                return checkGreaterThan(condition, value);
            case ConditionEnum.SUP_OR_EQUAL:
                return checkGreaterThan(condition, value) || checkEqual(condition, value);
            case ConditionEnum.INF:
                return checkLessThan(condition, value);
            case ConditionEnum.INF_OR_EQUAL:
                return checkLessThan(condition, value) || checkEqual(condition, value);
            case ConditionEnum.INCLUDE:
                return checkInclude(condition, value);
            case ConditionEnum.NOT_INCLUDE:
                return !checkInclude(condition, value);
            case ConditionEnum.STARTS_WITH:
                return checkStartsWith(condition, value);
            case ConditionEnum.NOT_STARTS_WITH:
                return !checkStartsWith(condition, value);
            case ConditionEnum.ENDS_WITH:
                return checkEndsWith(condition, value);
            case ConditionEnum.NOT_ENDS_WITH:
                return !checkEndsWith(condition, value);
            default:
                return false;
        }
    }catch(err) {
        logger.error("error in checkCondition:"+err);
        return false;
    }
}

export function getSubProperty(object:any, property:string): any {
    let properties = property.split(".");
    let result = object;
    properties.forEach(prop => {
        result = result[prop];
    });
    return result;
}

export function checkEqual(condition:RulesConditions, value:any): boolean {
    logger.debug("check equal");
    if(value === condition.value) return true;
    return false;
}

export function checkGreaterThan(condition:RulesConditions, value:any): boolean {
    logger.debug("check greater than");
    if(value > condition.value) return true;
    return false;
}

export function checkLessThan(condition:RulesConditions, value:any): boolean {
    logger.debug("check less than");
    if(value < condition.value) return true;
    return false;
}

export function checkInclude(condition:RulesConditions, value:any): boolean {
    logger.debug("check include");
    if(value.includes(condition.value)) return true;
    return false;
}

export function checkStartsWith(condition:RulesConditions, value:any): boolean {
    logger.debug("check starts with");
    if(value.startsWith(condition.value)) return true;
    return false;
}

export function checkEndsWith(condition:RulesConditions, value:any): boolean {
    logger.debug("check ends with");
    if(value.endsWith(condition.value)) return true;
    return false;
}

export function alertFromRule(rule:Rules, resource:any) {
    switch(rule.level){
        case LevelEnum.INFO:
            logger.info("information:"+rule.name);
            break;
        case LevelEnum.WARNING:
            logger.warn("warning:"+rule.name);
            logger.warn("resource:");
            logger.warn(resource);
            break;
        case LevelEnum.ERROR:
            logger.error("error:"+rule.name);
            logger.error("resource:");
            logger.error(resource);
            break;
        case LevelEnum.FATAL:
            logger.fatal("critical:"+rule.name);
            logger.fatal("resource:");
            logger.fatal(resource);
            break;
        default:
            logger.error("error:"+rule.name);
            logger.error("resource:");
            logger.error(resource);
            break;
    }
}