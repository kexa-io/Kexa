"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const { setLogLevel } = require("@azure/logger");
const dotenv_1 = __importDefault(require("dotenv"));
const azureGathering_service_1 = require("./services/azureGathering.service");
const tslog_1 = require("tslog");
const analyse_service_1 = require("./services/analyse.service");
const alerte_service_1 = require("./services/alerte.service");
const githubGathering_service_1 = require("./services/githubGathering.service");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv_1.default.config(); // reading environnement vars
const rulesDirectory = "./src/rules"; //the directory where to find the rules
let debug_mode = 2;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });
async function main() {
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
    let resources = {
        "azure": await (0, azureGathering_service_1.collectAzureData)() ?? null,
        "gcp": null,
        "aws": null,
        "ovh": null,
        "git": await (0, githubGathering_service_1.collectGithubData)() ?? null
    };
    // Analyse rules
    let settings = (0, analyse_service_1.gatheringRules)(rulesDirectory);
    settings.forEach(setting => {
        let result = (0, analyse_service_1.checkRules)(setting.rules, resources, setting.alert);
        if (setting.alert.global.enabled) {
            (0, alerte_service_1.alertGlobal)(result, setting.alert.global);
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBbUQ7QUFDbkQsb0RBQXlCO0FBQ3pCLDhFQUFxRTtBQUNyRSxpQ0FBK0I7QUFFL0IsZ0VBQXdFO0FBQ3hFLDhEQUF3RDtBQUN4RCxnRkFBdUU7QUFDdkUsdUlBQXVJO0FBQ3ZJLGdCQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBNkMsNkJBQTZCO0FBQ3ZGLE1BQU0sY0FBYyxHQUFVLGFBQWEsQ0FBQyxDQUFrQix1Q0FBdUM7QUFDckcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBRzFGLEtBQUssVUFBVSxJQUFJO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBRW5ILElBQUksU0FBUyxHQUFHO1FBQ2QsT0FBTyxFQUFFLE1BQU0sSUFBQSx5Q0FBZ0IsR0FBRSxJQUFFLElBQUk7UUFDdkMsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLE1BQU0sSUFBQSwyQ0FBaUIsR0FBRSxJQUFFLElBQUk7S0FDbkIsQ0FBQztJQUV0QixnQkFBZ0I7SUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBQSxnQ0FBYyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBQSw0QkFBVSxFQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQztZQUM5QixJQUFBLDRCQUFXLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUdILHFJQUFxSTtJQUNySSxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztBQUNySCxDQUFDO0FBR0QsdUlBQXVJO0FBQ3ZJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsSUFBSSxFQUFFLENBQUMifQ==