"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseRule = exports.mainAnalyse = void 0;
const tslog_1 = require("tslog");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = 2;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
async function mainAnalyse(rulesDirectory) {
    // list directory
    const paths = fs_1.default.readdirSync(rulesDirectory, { withFileTypes: true });
    logger.debug("listing rules files.");
    let rulesList = new Array;
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let rules = await analyseRule(rulesDirectory + "/" + p.name);
        console.log("rules", rules);
        if (rules)
            rulesList.push(...rules);
    }
    logger.debug("rules list:" + rulesList);
    return rulesList;
}
exports.mainAnalyse = mainAnalyse;
async function analyseRule(ruleFilePath) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        //TODO : be more precise on the type of doc
        console.log("doc", doc);
        let rules = doc.rules;
        for (let rule of doc.rules) {
            console.log(rule);
            logger.debug("name:" + rule.name);
            logger.debug("description:" + rule.description);
            logger.debug("applied:" + rule.applied);
            logger.debug("conditions:" + rule.conditions);
            if (rule.conditions)
                for (let condition of rule.conditions) {
                    logger.debug("cloudProvider:" + condition.cloudProvider);
                    logger.debug("objectName:" + condition.objectName);
                    logger.debug("function:" + condition.function);
                    logger.debug("condition:" + condition.condition);
                    logger.debug("value:" + condition.value);
                }
        }
        return rules;
    }
    catch (e) {
        logger.error("error" + e);
        return null;
    }
}
exports.analyseRule = analyseRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0IsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUkzQix3R0FBd0c7QUFDeEcsSUFBSSxVQUFVLEdBQWtCLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBRTVGLGVBQWU7QUFDZixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ2xDLEtBQUssVUFBVSxXQUFXLENBQUMsY0FBcUI7SUFDbkQsaUJBQWlCO0lBQ2pCLE1BQU0sS0FBSyxHQUFHLFlBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JDLElBQUksU0FBUyxHQUFHLElBQUksS0FBWSxDQUFDO0lBQ2pDLEtBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLGNBQWMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3RCxJQUFJLEtBQUssR0FBRyxNQUFNLFdBQVcsQ0FBQyxjQUFjLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLEtBQUs7WUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDdkM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBZEQsa0NBY0M7QUFFTSxLQUFLLFVBQVUsV0FBVyxDQUFDLFlBQW1CO0lBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBSSxpQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRiwyQ0FBMkM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN0QixLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFBRSxLQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUEzQkQsa0NBMkJDIn0=