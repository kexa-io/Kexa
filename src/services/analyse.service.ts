import { Logger } from "tslog";
import fs from "fs";
import yaml from "js-yaml";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { Rules } from "../models/settingFile/rules.models";
import { ParentRules, RulesConditions } from "../models/settingFile/conditions.models";
import { ConditionEnum } from "../enum/condition.enum";
import { ProviderResource } from "../models/providerResource.models";
import { OperatorEnum } from "../enum/operator.enum";
import { LevelEnum } from "../enum/level.enum";
import { ResultScan, SubResultScan } from "../models/resultScan.models";
import { alertFromRule } from "./alerte.service";
import { Alert } from "../models/settingFile/alert.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
export function gatheringRules(rulesDirectory:string): SettingFile[] {
    // list directory
    const paths = fs.readdirSync(rulesDirectory, { withFileTypes: true});
    logger.debug("listing rules files.");
    let settingFileList = new Array<SettingFile>;
    for(const p of paths) {
        logger.debug("getting "+rulesDirectory+"/"+p.name+" rules.");
        let setting = analyseRule(rulesDirectory+"/"+p.name);
        if( setting) settingFileList.push(setting);
    }
    logger.debug("rules list:"+settingFileList);
    return settingFileList;
}

export function analyseRule(ruleFilePath:string): SettingFile|null {
    logger.debug("analyse:"+ruleFilePath);
    try {
        const doc = (yaml.load(fs.readFileSync(ruleFilePath, 'utf8')) as SettingFile[])[0];
        // TODO : check if the file is valid
        return doc;
    } catch (e) {
        logger.error("error"+e);
        return null;
    }    
}

export function checkRules(rules:Rules[], resources:ProviderResource, alert: Alert): ResultScan[][] {
    logger.debug("check rules");
    let result: ResultScan[][] = [];
    rules.forEach(rule => {
        if(!rule.applied) return;
        logger.info("check rule:"+rule.name);
        let objectResources = resources[rule.cloudProvider][rule.objectName];
        let subResult: ResultScan[] = [];
        objectResources.forEach((objectResource: any) => {
            let subResultScan: SubResultScan[] = checkRule(rule.conditions, objectResource);
            let error = subResultScan.filter((value) => !value.result);
            if(error.length > 0){
                alertFromRule(rule, subResultScan, objectResource, alert);
            }
            subResult.push({
                objectContent: objectResource,
                rule: rule,
                error: error,
            });
        });
        result.push(subResult);
    });
    return result;
}

export function checkRule(conditions: RulesConditions[]|ParentRules[], resources:any): SubResultScan[] {
    logger.debug("check subrule");
    let result: SubResultScan[] = [];
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

export function checkParentRule(parentRule:ParentRules, resources:any): SubResultScan {
    logger.debug("check parent rule");
    let result: SubResultScan[] = checkRule(parentRule.rules, resources);
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
        message : subResultScans.map((value) => value.message).join(" || ")
    };
}


export function checkCondition(condition:RulesConditions, resource:any): SubResultScan {
    try{
        let value = getSubProperty(resource, condition.property);
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
            default:
                return {
                    value,
                    condition: [condition],
                    result: false,
                    message : "condition not found in " + Object.keys(ConditionEnum).join(", ")
                };
        }
    }catch(err) {
        logger.error("error in checkCondition:"+err);
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