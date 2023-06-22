"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertFromRule = exports.checkEndsWith = exports.checkStartsWith = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.checkCondition = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.analyseRule = exports.gatheringRules = void 0;
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const condition_enum_1 = require("../enum/condition.enum");
const operator_enum_1 = require("../enum/operator.enum");
const level_enum_1 = require("../enum/level.enum");
////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = 2;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
function gatheringRules(rulesDirectory) {
    // list directory
    const paths = fs_1.default.readdirSync(rulesDirectory, { withFileTypes: true });
    logger.debug("listing rules files.");
    let rulesList = new Array;
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let rules = analyseRule(rulesDirectory + "/" + p.name);
        if (rules)
            rulesList.push(...rules);
    }
    logger.debug("rules list:" + rulesList);
    return rulesList;
}
exports.gatheringRules = gatheringRules;
function analyseRule(ruleFilePath) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        //TODO : be more precise on the type of doc
        let rules = doc.rules;
        return rules;
    }
    catch (e) {
        logger.error("error" + e);
        return null;
    }
}
exports.analyseRule = analyseRule;
function checkRules(rules, resources) {
    logger.debug("check rules");
    let result = [];
    rules.forEach(rule => {
        if (!rule.applied)
            return;
        logger.info("check rule:" + rule.name);
        let objectResources = resources[rule.cloudProvider][rule.objectName];
        let subResult = [];
        objectResources.forEach((objectResource) => {
            let microResult = checkRule(rule.conditions, objectResource).every((value) => value);
            if (!microResult) {
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
exports.checkRules = checkRules;
function checkRule(conditions, resources) {
    logger.debug("check subrule");
    let result = [];
    conditions.forEach(condition => {
        if (condition.hasOwnProperty("rules")) {
            result.push(checkParentRule(condition, resources));
        }
        else {
            condition = condition;
            logger.debug("check condition:" + condition.property);
            result.push(checkCondition(condition, resources));
        }
    });
    return result;
}
exports.checkRule = checkRule;
function checkParentRule(parentRule, resources) {
    logger.debug("check parent rule");
    let result = checkRule(parentRule.rules, resources);
    switch (parentRule.operator) {
        case operator_enum_1.OperatorEnum.AND:
            return result.every((value) => value);
        case operator_enum_1.OperatorEnum.OR:
            return result.some((value) => value);
        case operator_enum_1.OperatorEnum.XOR:
            return result.filter((value) => value).length === 1;
        case operator_enum_1.OperatorEnum.NAND:
            return !result.every((value) => value);
        case operator_enum_1.OperatorEnum.NOR:
            return !result.some((value) => value);
        case operator_enum_1.OperatorEnum.XNOR:
            return result.filter((value) => value).length !== 1;
        default:
            return false;
    }
}
exports.checkParentRule = checkParentRule;
function checkCondition(condition, resources) {
    try {
        let value = getSubProperty(resources, condition.property);
        switch (condition.condition) {
            case condition_enum_1.ConditionEnum.EQUAL:
                return checkEqual(condition, value);
            case condition_enum_1.ConditionEnum.DIFFERENT:
                return !checkEqual(condition, value);
            case condition_enum_1.ConditionEnum.SUP:
                return checkGreaterThan(condition, value);
            case condition_enum_1.ConditionEnum.SUP_OR_EQUAL:
                return checkGreaterThan(condition, value) || checkEqual(condition, value);
            case condition_enum_1.ConditionEnum.INF:
                return checkLessThan(condition, value);
            case condition_enum_1.ConditionEnum.INF_OR_EQUAL:
                return checkLessThan(condition, value) || checkEqual(condition, value);
            case condition_enum_1.ConditionEnum.INCLUDE:
                return checkInclude(condition, value);
            case condition_enum_1.ConditionEnum.NOT_INCLUDE:
                return !checkInclude(condition, value);
            case condition_enum_1.ConditionEnum.STARTS_WITH:
                return checkStartsWith(condition, value);
            case condition_enum_1.ConditionEnum.NOT_STARTS_WITH:
                return !checkStartsWith(condition, value);
            case condition_enum_1.ConditionEnum.ENDS_WITH:
                return checkEndsWith(condition, value);
            case condition_enum_1.ConditionEnum.NOT_ENDS_WITH:
                return !checkEndsWith(condition, value);
            default:
                return false;
        }
    }
    catch (err) {
        logger.error("error in checkCondition:" + err);
        return false;
    }
}
exports.checkCondition = checkCondition;
function getSubProperty(object, property) {
    let properties = property.split(".");
    let result = object;
    properties.forEach(prop => {
        result = result[prop];
    });
    return result;
}
exports.getSubProperty = getSubProperty;
function checkEqual(condition, value) {
    logger.debug("check equal");
    if (value === condition.value)
        return true;
    return false;
}
exports.checkEqual = checkEqual;
function checkGreaterThan(condition, value) {
    logger.debug("check greater than");
    if (value > condition.value)
        return true;
    return false;
}
exports.checkGreaterThan = checkGreaterThan;
function checkLessThan(condition, value) {
    logger.debug("check less than");
    if (value < condition.value)
        return true;
    return false;
}
exports.checkLessThan = checkLessThan;
function checkInclude(condition, value) {
    logger.debug("check include");
    if (value.includes(condition.value))
        return true;
    return false;
}
exports.checkInclude = checkInclude;
function checkStartsWith(condition, value) {
    logger.debug("check starts with");
    if (value.startsWith(condition.value))
        return true;
    return false;
}
exports.checkStartsWith = checkStartsWith;
function checkEndsWith(condition, value) {
    logger.debug("check ends with");
    if (value.endsWith(condition.value))
        return true;
    return false;
}
exports.checkEndsWith = checkEndsWith;
function alertFromRule(rule, resource) {
    switch (rule.level) {
        case level_enum_1.LevelEnum.INFO:
            logger.info("information:" + rule.name);
            break;
        case level_enum_1.LevelEnum.WARNING:
            logger.warn("warning:" + rule.name);
            logger.warn("resource:");
            logger.warn(resource);
            break;
        case level_enum_1.LevelEnum.ERROR:
            logger.error("error:" + rule.name);
            logger.error("resource:");
            logger.error(resource);
            break;
        case level_enum_1.LevelEnum.FATAL:
            logger.fatal("critical:" + rule.name);
            logger.fatal("resource:");
            logger.fatal(resource);
            break;
        default:
            logger.error("error:" + rule.name);
            logger.error("resource:");
            logger.error(resource);
            break;
    }
}
exports.alertFromRule = alertFromRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0IsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUkzQiwyREFBdUQ7QUFFdkQseURBQXFEO0FBQ3JELG1EQUErQztBQUUvQyx3R0FBd0c7QUFDeEcsSUFBSSxVQUFVLEdBQWtCLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBRTVGLGVBQWU7QUFDZixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLFNBQWdCLGNBQWMsQ0FBQyxjQUFxQjtJQUNoRCxpQkFBaUI7SUFDakIsTUFBTSxLQUFLLEdBQUcsWUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNyRSxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFZLENBQUM7SUFDakMsS0FBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUU7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsY0FBYyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxjQUFjLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLEtBQUs7WUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDdkM7SUFDRCxNQUFNLENBQUMs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