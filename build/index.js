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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv_1.default.config(); // reading environnement vars
const rulesDirectory = "./src/rules"; //the directory where to find the rules
let debug_mode = 2;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });
async function main() {
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
    let azureResource = await (0, azureGathering_service_1.collectAzureData)();
    let resources = {
        "azure": azureResource ?? null,
        "gcp": null,
        "aws": null,
        "ovh": null
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBbUQ7QUFDbkQsb0RBQXlCO0FBQ3pCLDhFQUFxRTtBQUNyRSxpQ0FBK0I7QUFFL0IsZ0VBQXdFO0FBQ3hFLDhEQUF3RDtBQUN4RCx1SUFBdUk7QUFDdkksZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUE2Qyw2QkFBNkI7QUFDdkYsTUFBTSxjQUFjLEdBQVUsYUFBYSxDQUFDLENBQWtCLHVDQUF1QztBQUNyRyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFHMUYsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsSUFBSSxhQUFhLEdBQUcsTUFBTSxJQUFBLHlDQUFnQixHQUFFLENBQUM7SUFFN0MsSUFBSSxTQUFTLEdBQUc7UUFDZCxPQUFPLEVBQUUsYUFBYSxJQUFFLElBQUk7UUFDNUIsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ1EsQ0FBQztJQUV0QixnQkFBZ0I7SUFDaEIsSUFBSSxRQUFRLEdBQUcsSUFBQSxnQ0FBYyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBQSw0QkFBVSxFQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQztZQUM5QixJQUFBLDRCQUFXLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILHFJQUFxSTtJQUNySSxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztBQUNySCxDQUFDO0FBR0QsdUlBQXVJO0FBQ3ZJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsSUFBSSxFQUFFLENBQUMifQ==