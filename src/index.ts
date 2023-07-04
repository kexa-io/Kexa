//const { setLogLevel } = require("@azure/logger");
import env from "dotenv";
import { collectAzureData } from "./services/azureGathering.service";
import { Logger } from "tslog";
import { ProviderResource } from "./models/providerResource.models";
import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal } from "./services/alerte.service";
import { collectGithubData } from "./services/githubGathering.service";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env.config();                                             // reading environnement vars
const rulesDirectory:string = "./src/rules";                  //the directory where to find the rules
let debug_mode = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });


async function main() {
  logger.info("___________________________________________________________________________________________________"); 
  logger.info("___________________________________-= running checkinfra scan =-___________________________________");
  logger.info("___________________________________________________________________________________________________"); 

  let resources = {
    "azure": await collectAzureData()??null,
    "gcp": null,
    "aws": null,
    "ovh": null,
    "git": await collectGithubData()
  } as ProviderResource;

  // Analyse rules
  let settings = gatheringRules(rulesDirectory);
  settings.forEach(setting => {
    let result = checkRules(setting.rules, resources, setting.alert);
    if(setting.alert.global.enabled){
      alertGlobal(result, setting.alert.global);
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