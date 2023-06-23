"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEndsWith = exports.checkStartsWith = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.resultScan = exports.checkCondition = exports.parentResultScan = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.analyseRule = exports.gatheringRules = void 0;
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const condition_enum_1 = require("../enum/condition.enum");
const operator_enum_1 = require("../enum/operator.enum");
const alerte_service_1 = require("./alerte.service");
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
    let settingFileList = new Array;
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let setting = analyseRule(rulesDirectory + "/" + p.name);
        if (setting)
            settingFileList.push(setting);
    }
    logger.debug("rules list:" + settingFileList);
    return settingFileList;
}
exports.gatheringRules = gatheringRules;
function analyseRule(ruleFilePath) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        // TODO : check if the file is valid
        return doc;
    }
    catch (e) {
        logger.error("error" + e);
        return null;
    }
}
exports.analyseRule = analyseRule;
function checkRules(rules, resources, alert) {
    logger.debug("check rules");
    let result = [];
    rules.forEach(rule => {
        if (!rule.applied)
            return;
        logger.info("check rule:" + rule.name);
        let objectResources = resources[rule.cloudProvider][rule.objectName];
        let subResult = [];
        objectResources.forEach((objectResource) => {
            let subResultScan = checkRule(rule.conditions, objectResource);
            let error = subResultScan.filter((value) => !value.result);
            if (error.length > 0) {
                (0, alerte_service_1.alertFromRule)(rule, subResultScan, objectResource, alert);
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
            return parentResultScan(result, result.every((value) => value.result));
        case operator_enum_1.OperatorEnum.OR:
            return parentResultScan(result, result.some((value) => value.result));
        case operator_enum_1.OperatorEnum.XOR:
            return parentResultScan(result, result.filter((value) => value.result).length === 1);
        case operator_enum_1.OperatorEnum.NAND:
            return parentResultScan(result, !result.every((value) => value.result));
        case operator_enum_1.OperatorEnum.NOR:
            return parentResultScan(result, !result.some((value) => value.result));
        case operator_enum_1.OperatorEnum.XNOR:
            return parentResultScan(result, result.filter((value) => value.result).length !== 1);
        default:
            return {
                value: resources,
                condition: [],
                result: false,
                message: "operator not found in " + Object.keys(operator_enum_1.OperatorEnum).join(", ")
            };
    }
}
exports.checkParentRule = checkParentRule;
function parentResultScan(subResultScans, result) {
    return {
        value: null,
        condition: subResultScans.map((value) => value.condition).flat(),
        result,
        message: subResultScans.map((value) => value.message).join(" || ")
    };
}
exports.parentResultScan = parentResultScan;
function checkCondition(condition, resource) {
    try {
        let value = getSubProperty(resource, condition.property);
        switch (condition.condition) {
            case condition_enum_1.ConditionEnum.EQUAL:
                return resultScan(condition, value, [checkEqual]);
            case condition_enum_1.ConditionEnum.DIFFERENT:
                return resultScan(condition, value, [checkEqual], true);
            case condition_enum_1.ConditionEnum.SUP:
                return resultScan(condition, value, [checkGreaterThan]);
            case condition_enum_1.ConditionEnum.SUP_OR_EQUAL:
                return resultScan(condition, value, [checkGreaterThan, checkEqual]);
            case condition_enum_1.ConditionEnum.INF:
                return resultScan(condition, value, [checkLessThan]);
            case condition_enum_1.ConditionEnum.INF_OR_EQUAL:
                return resultScan(condition, value, [checkLessThan, checkEqual]);
            case condition_enum_1.ConditionEnum.INCLUDE:
                return resultScan(condition, value, [checkInclude]);
            case condition_enum_1.ConditionEnum.NOT_INCLUDE:
                return resultScan(condition, value, [checkInclude], true);
            case condition_enum_1.ConditionEnum.STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith]);
            case condition_enum_1.ConditionEnum.NOT_STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith], true);
            case condition_enum_1.ConditionEnum.ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith]);
            case condition_enum_1.ConditionEnum.NOT_ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith], true);
            default:
                return {
                    value,
                    condition: [condition],
                    result: false,
                    message: "condition not found in " + Object.keys(condition_enum_1.ConditionEnum).join(", ")
                };
        }
    }
    catch (err) {
        logger.error("error in checkCondition:" + err);
        return {
            value: resource,
            condition: [condition],
            result: false,
            message: "property not found in resource"
        };
    }
}
exports.checkCondition = checkCondition;
function resultScan(condition, value, fs, reverse = false) {
    return {
        value,
        condition: [condition],
        result: (fs.map(f => f(condition, value)).some((value) => value) !== reverse)
    };
}
exports.resultScan = resultScan;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0IsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUkzQiwyREFBdUQ7QUFFdkQseURBQXFEO0FBR3JELHFEQUFpRDtBQUdqRCx3R0FBd0c7QUFDeEcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFFNUYsZUFBZTtBQUNmLGdDQUFnQztBQUNoQyx5Q0FBeUM7QUFDekMsU0FBZ0IsY0FBYyxDQUFDLGNBQXFCO0lBQ2hELGlCQUFpQjtJQUNqQixNQUFNLEtBQUssR0FBRyxZQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNyQyxJQUFJLGVBQWUsR0FBRyxJQUFJLEtBQWtCLENBQUM7SUFDN0MsS0FBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUU7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsY0FBYyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxjQUFjLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLE9BQU87WUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsTUFBTSxDQUFDLEtBQUss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