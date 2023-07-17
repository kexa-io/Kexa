import env from "dotenv";
import { collectAzureData } from "./services/azureGathering.service";
import { Logger } from "tslog";
import { ProviderResource } from "./models/providerResource.models";
import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal } from "./services/alerte.service";
import { collectGithubData } from "./services/githubGathering.service";
import { AsciiArtText, talkAboutOtherProject} from "./services/display.service";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env.config();                                             // reading environnement vars
const rulesDirectory:string = "./Kexa/rules";                  //the directory where to find the rules
let debug_mode = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });


export async function main() {
    AsciiArtText("Kexa");
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________"); 
    
    let settings = gatheringRules(rulesDirectory);
    
    const [azureData, githubData] = await Promise.all([
        collectAzureData(),
        collectGithubData()
    ]);
    
    let resources = {
        "azure": azureData??null,
        "gcp": null,
        "aws": null,
        "ovh": null,
        "git": githubData
    } as ProviderResource;

    
    
    // Analyse rules
    settings.forEach(setting => {
        let result = checkRules(setting.rules, resources, setting.alert);
        if(setting.alert.global.enabled){
            alertGlobal(result, setting.alert.global);
        }
    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    talkAboutOtherProject();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();