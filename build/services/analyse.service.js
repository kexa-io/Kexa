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
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        //let fileContent = fs.readFileSync(rulesDirectory+"/"+p.name, 'utf8');
        await analyseRule(rulesDirectory + "/" + p.name);
    }
}
exports.mainAnalyse = mainAnalyse;
async function analyseRule(ruleFilePath) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = js_yaml_1.default.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        //TODO : be more precise on the type of doc
        console.log("doc", doc);
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
    }
    catch (e) {
        logger.error("error" + e);
    }
}
exports.analyseRule = analyseRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpQ0FBK0I7QUFDL0IsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUczQix3R0FBd0c7QUFDeEcsSUFBSSxVQUFVLEdBQWtCLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBRTVGLGVBQWU7QUFDZixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ2xDLEtBQUssVUFBVSxXQUFXLENBQUMsY0FBcUI7SUFDbkQsaUJBQWlCO0lBQ2pCLE1BQU0sS0FBSyxHQUFHLFlBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JDLEtBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLGNBQWMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RCx1RUFBdUU7UUFDdkUsTUFBTSxXQUFXLENBQUMsY0FBYyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEQ7QUFDTCxDQUFDO0FBVEQsa0NBU0M7QUFFTSxLQUFLLFVBQVUsV0FBVyxDQUFDLFlBQW1CO0lBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBSSxpQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRiwyQ0FBMkM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEIsS0FBSyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxDQUFDLFVBQVU7Z0JBQUUsS0FBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMxQztTQUNKO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0FBQ0wsQ0FBQztBQXhCRCxrQ0F3QkMifQ==