"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCount = exports.checkOne = exports.checkSome = exports.checkAll = exports.checkEndsWith = exports.checkStartsWith = exports.checkRegex = exports.checkIncludeNS = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.resultScan = exports.checkCondition = exports.parentResultScan = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.checkSubRuleCondition = exports.checkParentRuleCondition = exports.checkRuleCondition = exports.checkDocRules = exports.checkDocAlertGlobal = exports.checkDocAlertConfig = exports.checkDocAlert = exports.checkDoc = exports.logCheckDoc = exports.analyseRule = exports.gatheringRules = void 0;
const level_enum_1 = require("./../enum/level.enum");
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const condition_enum_1 = require("../enum/condition.enum");
const operator_enum_1 = require("../enum/operator.enum");
const alerte_service_1 = require("./alerte.service");
const provider_enum_1 = require("../enum/provider.enum");
const alert_enum_1 = require("../enum/alert.enum");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE) ?? 3;
const jsome = require('jsome');
jsome.level.show = true;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "AnalyseLogger" });
const varEnvMin = {
    "email": ["EMAILPORT", "EMAILHOST", "EMAILUSER", "EMAILPWD", "EMAILFROM"],
    "sms": ["SMSACCOUNTSID", "SMSAUTHTOKEN", "SMSFROM"],
};
const config = require('config');
const levelAlert = ["info", "warning", "error", "critical"];
//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
async function gatheringRules(rulesDirectory) {
    // list directory
    const paths = fs_1.default.readdirSync(rulesDirectory, { withFileTypes: true });
    logger.debug("listing rules files.");
    let settingFileList = new Array;
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let setting = await analyseRule(rulesDirectory + "/" + p.name);
        if (setting)
            settingFileList.push(setting);
    }
    logger.debug("rules list:");
    logger.debug(settingFileList.map((value) => value.alert.global.name).join(", "));
    return settingFileList;
}
exports.gatheringRules = gatheringRules;
async function analyseRule(ruleFilePath) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        let result = await checkDoc(doc);
        logCheckDoc(result);
        result.forEach((value) => {
            if (value.startsWith("error"))
                throw new Error(value);
        });
        return doc;
    }
    catch (e) {
        logger.error("error - " + ruleFilePath + " was not load properly : " + e);
        return null;
    }
}
exports.analyseRule = analyseRule;
function logCheckDoc(result) {
    logger.debug("log check doc");
    result.forEach((value) => {
        if (value.startsWith("error"))
            logger.error(value);
        else if (value.startsWith("warn"))
            logger.warn(value);
        else
            logger.info(value);
    });
}
exports.logCheckDoc = logCheckDoc;
async function checkDoc(doc) {
    logger.debug("check doc");
    let result = [];
    if (!doc.hasOwnProperty("version"))
        result.push("info - version not found in doc");
    else if (doc.version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/) === null)
        result.push("info - version not valid in doc : " + doc.version);
    if (!doc.hasOwnProperty("date"))
        result.push("info - date not found in doc");
    else if (doc.date.match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/) === null)
        result.push("info - date not valid in doc : " + doc.date);
    (await checkDocAlert(doc.alert)).forEach((value) => result.push(value));
    checkDocRules(doc.rules).forEach((value) => result.push(value));
    return result;
}
exports.checkDoc = checkDoc;
async function checkDocAlert(alert) {
    logger.debug("check Alert in doc");
    let result = [];
    for (let level of Object.keys(level_enum_1.LevelEnum)) {
        if (!isNaN(Number(level))) {
            continue;
        }
        if (!alert.hasOwnProperty(level.toLowerCase())) {
            result.push("error - " + level.toLowerCase() + " not found in alert");
            continue;
        }
        if (level.toLowerCase() != "global") {
            (await checkDocAlertConfig(alert[level.toLowerCase()], level.toLowerCase())).forEach((value) => result.push(value));
        }
        else {
            (await checkDocAlertGlobal(alert.global)).forEach((value) => result.push(value));
        }
    }
    return result;
}
exports.checkDocAlert = checkDocAlert;
async function checkDocAlertConfig(alertConfig, level) {
    logger.debug("check Alert config in doc");
    let result = [];
    if (!alertConfig.hasOwnProperty("enabled"))
        result.push("error - enabled not found in alert config for " + level);
    else if (typeof alertConfig.enabled !== "boolean")
        result.push("error - enabled not boolean in alert config for " + level + " : " + alertConfig.enabled);
    if (!alertConfig.hasOwnProperty("type"))
        result.push("error - type not found in alert config for " + level);
    else {
        if (alertConfig.type.length === 0)
            result.push("error - type empty in alert config for " + level);
        for (let type of alertConfig.type) {
            if (!Object.values(alert_enum_1.AlertEnum).includes(type)) {
                result.push("warn - type not valid in alert config for " + level + " : " + type);
                continue;
            }
            try {
                for (let env of varEnvMin[type.toLowerCase()]) {
                    if (!(await (0, manageVarEnvironnement_service_1.getEnvVar)(env)))
                        result.push("error - " + env + " not found in env for " + level);
                }
            }
            catch (err) { }
        }
        ;
    }
    if (alertConfig.hasOwnProperty("type") && alertConfig.type.some((type) => type !== alert_enum_1.AlertEnum.LOG)) {
        if (!alertConfig.hasOwnProperty("to"))
            result.push("error - to not found in alert config for " + level);
        else {
            if (alertConfig.to.length === 0)
                result.push("warn - to empty in alert config for " + level);
            alertConfig.to.forEach((to) => {
                if (typeof to !== "string")
                    result.push("error - to not string in alert config for " + level + " : " + to);
            });
        }
    }
    return result;
}
exports.checkDocAlertConfig = checkDocAlertConfig;
async function checkDocAlertGlobal(alertGlobal) {
    logger.debug("check Alert global in doc");
    let result = [];
    (await checkDocAlertConfig(alertGlobal, "global")).forEach((value) => result.push(value));
    if (!alertGlobal.hasOwnProperty("conditions"))
        result.push("error - conditions not found in alert global config");
    else {
        if (alertGlobal.conditions.length === 0)
            result.push("error - conditions empty in alert global config");
        alertGlobal.conditions.forEach((condition) => {
            if (!condition.hasOwnProperty("level"))
                result.push("error - level not found in alert global config");
            else if (!Object.values(level_enum_1.LevelEnum).includes(condition.level))
                result.push("warn - level not valid in alert global config for " + condition.level);
            if (!condition.hasOwnProperty("min"))
                result.push("error - min not found in alert global config");
            else if (typeof condition.min !== "number" && condition.min >= 0)
                result.push("warn - min is not positive number in alert global config : " + condition.min);
        });
    }
    if (!alertGlobal.hasOwnProperty("name"))
        result.push("error - name empty in alert global config");
    else if (typeof alertGlobal.name !== "string")
        result.push("warn - name not string in alert global config : " + alertGlobal.name);
    return result;
}
exports.checkDocAlertGlobal = checkDocAlertGlobal;
function checkDocRules(rules) {
    logger.debug("check rules in doc");
    let result = [];
    if (rules.length === 0)
        result.push("error - rules empty in doc");
    rules.forEach((rule) => {
        if (!rule.hasOwnProperty("name"))
            result.push("info - name not found in rule");
        else if (typeof rule.name !== "string")
            result.push("warn - name not string in rule : " + rule.name);
        if (!rule.hasOwnProperty("description"))
            result.push("info - description not found in rule");
        else if (typeof rule.description !== "string")
            result.push("warn - description not string in rule : " + rule.description);
        if (!rule.hasOwnProperty("urlDescription"))
            result.push("info - urlDescription not found in rule");
        else if (typeof rule.urlDescription !== "string")
            result.push("warn - urlDescription not string in rule : " + rule.urlDescription);
        if (!rule.hasOwnProperty("applied"))
            result.push("error - applied not found in rule");
        else if (typeof rule.applied !== "boolean")
            result.push("error - applied not boolean in rule : " + rule.applied);
        if (!rule.hasOwnProperty("level"))
            result.push("error - level not found in rule");
        else if (!Object.values(level_enum_1.LevelEnum).includes(rule.level))
            result.push("warn - level not valid in rule -> default info : " + rule.level);
        if (!rule.hasOwnProperty("cloudProvider"))
            result.push("error - cloudProvider not found in rule");
        else if (!Object.values(provider_enum_1.ProviderEnum).includes(rule.cloudProvider))
            result.push("error - cloudProvider not valid in rule : " + rule.cloudProvider);
        if (!rule.hasOwnProperty("objectName"))
            result.push("error - objectName not found in rule");
        else if (!Object.values(provider_enum_1.ProviderEnum).includes(rule.cloudProvider))
            result.push("error - objectName not valid in rule : " + rule.objectName);
        if (!rule.hasOwnProperty("conditions"))
            result.push("error - conditions not found in rule");
        else {
            if (rule.conditions.length === 0)
                result.push("error - conditions empty in rule");
            rule.conditions.forEach((condition) => {
                checkRuleCondition(condition).forEach((value) => result.push(value));
            });
        }
    });
    return result;
}
exports.checkDocRules = checkDocRules;
function checkRuleCondition(condition) {
    logger.debug("check rule condition");
    let result = [];
    if (condition.hasOwnProperty("rules")) {
        checkParentRuleCondition(condition).forEach((value) => result.push(value));
    }
    else {
        checkSubRuleCondition(condition).forEach((value) => result.push(value));
    }
    return result;
}
exports.checkRuleCondition = checkRuleCondition;
function checkParentRuleCondition(parentRule) {
    logger.debug("check parent rule condition");
    let result = [];
    if (!parentRule.hasOwnProperty("name"))
        result.push("info - name not found in parent rule condition");
    else if (typeof parentRule.name !== "string")
        result.push("warn - name not string in parent rule condition : " + parentRule.name);
    if (!parentRule.hasOwnProperty("description"))
        result.push("info - description not found in parent rule condition");
    else if (typeof parentRule.description !== "string")
        result.push("warn - description not string in parent rule condition : " + parentRule.description);
    if (!parentRule.hasOwnProperty("operator"))
        result.push("error - operator not found in parent rule condition");
    else if (!Object.values(operator_enum_1.OperatorEnum).includes(parentRule.operator))
        result.push("error - operator not valid in parent rule condition : " + parentRule.operator);
    else if (parentRule.operator === operator_enum_1.OperatorEnum.NOT && parentRule.rules.length > 1)
        result.push("warn - operator not will be considered in rules only the first one");
    if (!parentRule.hasOwnProperty("rules"))
        result.push("error - rules not found in parent rule condition");
    else {
        if (parentRule.rules.length === 0)
            result.push("error - rules empty in parent rule condition");
        parentRule.rules.forEach((rule) => {
            checkRuleCondition(rule).forEach((value) => result.push(value));
        });
    }
    return result;
}
exports.checkParentRuleCondition = checkParentRuleCondition;
function checkSubRuleCondition(subRule) {
    logger.debug("check sub rule condition");
    let result = [];
    if (!subRule.hasOwnProperty("property"))
        result.push("error - property not found in sub rule condition");
    else if (typeof subRule.property !== "string")
        result.push("error - property not string in sub rule condition : " + subRule.property);
    if (!subRule.hasOwnProperty("condition"))
        result.push("error - condition not found in sub rule condition");
    else if (!Object.values(condition_enum_1.ConditionEnum).includes(subRule.condition))
        result.push("error - condition not valid in sub rule condition : " + subRule.condition);
    //if(!subRule.hasOwnProperty("value")) result.push("error - value not found in sub rule condition");
    //else if(typeof subRule.value !== "string" && typeof subRule.value !== "number" && !Array.isArray(subRule.value)) result.push("error - value not valid in sub rule condition : " + subRule.value);
    //else if(Array.isArray(subRule.value) && subRule.value.length === 0) result.push("error - value empty in sub rule condition");
    //else if(Array.isArray(subRule.value)){
    //    subRule.value.forEach((value) => {
    //        checkRuleCondition(value).forEach((value) => result.push(value));
    //    });
    //}
    return result;
}
exports.checkSubRuleCondition = checkSubRuleCondition;
function checkRules(rules, resources, alert) {
    logger.debug("check rules");
    let result = [];
    rules.forEach(rule => {
        if (!rule.applied)
            return;
        logger.info("check rule:" + rule.name);
        const configAssign = config.get(rule.cloudProvider);
        let objectResources = [];
        for (let i = 0; i < configAssign.length; i++) {
            if (configAssign[i].rules.includes(alert.global.name)) {
                logger.info("check rule with object with index :" + i);
                objectResources = [...objectResources, ...resources[rule.cloudProvider][i][rule.objectName]];
            }
        }
        let subResult = [];
        if (rule.conditions[0].hasOwnProperty("property") && rule.conditions[0].property === ".") {
            subResult.push({
                objectContent: {
                    "id": "global property",
                },
                rule: rule,
                error: actionAfterCheckRule(rule, objectResources, alert),
            });
        }
        else {
            objectResources.forEach((objectResource) => {
                subResult.push({
                    objectContent: objectResource,
                    rule: rule,
                    error: actionAfterCheckRule(rule, objectResource, alert),
                });
            });
        }
        result.push(subResult);
    });
    return result;
}
exports.checkRules = checkRules;
function actionAfterCheckRule(rule, objectResource, alert) {
    let subResultScan = checkRule(rule.conditions, objectResource);
    let error = subResultScan.filter((value) => !value.result);
    if (error.length > 0) {
        (0, alerte_service_1.alertFromRule)(rule, subResultScan, objectResource, alert);
    }
    return error;
}
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
        case operator_enum_1.OperatorEnum.NOT:
            return parentResultScan(result, !result[0].result);
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
            case condition_enum_1.ConditionEnum.INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS]);
            case condition_enum_1.ConditionEnum.NOT_INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS], true);
            case condition_enum_1.ConditionEnum.REGEX:
                return resultScan(condition, value, [checkRegex]);
            case condition_enum_1.ConditionEnum.ALL:
                return resultScan(condition, value, [checkAll]);
            case condition_enum_1.ConditionEnum.NOT_ANY:
                return resultScan(condition, value, [checkAll], true);
            case condition_enum_1.ConditionEnum.SOME:
                return resultScan(condition, value, [checkSome]);
            case condition_enum_1.ConditionEnum.ONE:
                return resultScan(condition, value, [checkOne]);
            case condition_enum_1.ConditionEnum.COUNT:
                return resultScan(condition, value.length, [checkEqual]);
            case condition_enum_1.ConditionEnum.COUNT_SUP:
                return resultScan(condition, value.length, [checkGreaterThan]);
            case condition_enum_1.ConditionEnum.COUNT_SUP_OR_EQUAL:
                return resultScan(condition, value.length, [checkGreaterThan, checkEqual]);
            case condition_enum_1.ConditionEnum.COUNT_INF:
                return resultScan(condition, value.length, [checkLessThan]);
            case condition_enum_1.ConditionEnum.COUNT_INF_OR_EQUAL:
                return resultScan(condition, value.length, [checkLessThan, checkEqual]);
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
    if (property === ".")
        return object;
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
function checkIncludeNS(condition, value) {
    logger.debug("check include not sensitive");
    try {
        if (value.toLowerCase().includes(String(condition.value).toLowerCase()))
            return true;
        return false;
    }
    catch (err) {
        logger.error("error in checkIncludeNS:" + err);
        return false;
    }
}
exports.checkIncludeNS = checkIncludeNS;
function checkRegex(condition, value) {
    logger.debug("check regex");
    if (value.match(condition.value))
        return true;
    return false;
}
exports.checkRegex = checkRegex;
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
function checkAll(condition, value) {
    logger.debug("check any");
    let result = [];
    value.forEach((v) => {
        result.push(checkRule(condition.value, v));
    });
    let finalResult = [];
    for (let row of result)
        for (let e of row)
            finalResult.push(e.result);
    return finalResult.every((v) => v);
}
exports.checkAll = checkAll;
function checkSome(condition, value) {
    logger.debug("check some");
    let result = [];
    value.forEach((v) => {
        result.push(checkRule(condition.value, v));
    });
    let finalResult = [];
    for (let row of result)
        for (let e of row)
            finalResult.push(e.result);
    return finalResult.some((v) => v);
}
exports.checkSome = checkSome;
function checkOne(condition, value) {
    logger.debug("check one");
    if (value.filter((v) => v === condition.value).length === 1)
        return true;
    return false;
}
exports.checkOne = checkOne;
function checkCount(condition, value) {
    logger.debug("check count");
    if (value.length === condition.value)
        return true;
    return false;
}
exports.checkCount = checkCount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vS2V4YS9zZXJ2aWNlcy9hbmFseXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscURBQWlEO0FBQ2pELGlDQUErQjtBQUMvQiw0Q0FBb0I7QUFDcEIsc0RBQTJCO0FBSTNCLDJEQUF1RDtBQUV2RCx5REFBcUQ7QUFFckQscURBQWlEO0FBSWpELHlEQUFxRDtBQUNyRCxtREFBK0M7QUFDL0MscUZBQTZEO0FBRTdELHdHQUF3RztBQUN4RyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBRSxDQUFDLENBQUM7QUFDbkQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUMzRixNQUFNLFNBQVMsR0FBRztJQUNkLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7SUFDekUsS0FBSyxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUM7Q0FDdEQsQ0FBQTtBQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTVELGVBQWU7QUFDZixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ2xDLEtBQUssVUFBVSxjQUFjLENBQUMsY0FBcUI7SUFD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