import env from "dotenv";
import { Logger } from "tslog";
import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal } from "./services/alerte.service";
import { AsciiArtText, talkAboutOtherProject} from "./services/display.service";
import { getEnvVar } from "./services/manageVarEnvironnement.service";
import { loadAddOns } from "./services/addOn.service";
import { deleteFile, writeStringToJsonFile } from "./helpers/files";
import {getContext, getNewLogger} from "./services/logger.service";
import { Context } from "@azure/functions";

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env.config();                                                                    // reading environnement vars                                                       // file system

export async function main() {
    let context = getContext();
    context?.log("entering main");
    const logger = getNewLogger("MainLogger");
    context?.log("logger created");
    if (process.env.DEV) {
        if (process.env.DEV == "true") {
            logger.settings.minLevel = 2;
            console.log("DEBUG");
        }
    }

    context?.log("logger configured");

    //logger.debug(args);
    AsciiArtText("Kexa");
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________"); 
    let settings = await gatheringRules(await getEnvVar("RULESDIRECTORY")??"./Kexa/rules");
    context?.log("settings", settings);
    if(settings.length != 0){
        let resources = {};
        resources = await loadAddOns(resources);
        context?.log("resources", resources);
        if(args.o) writeStringToJsonFile(JSON.stringify(resources), "./config/resultScan"+ new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') +".json");
        context?.log("good");
        settings.forEach(setting => {
            context?.log("setting", setting);
            let result = checkRules(setting.rules, resources, setting.alert);
            if(setting.alert.global.enabled){
                alertGlobal(result, setting.alert.global);
            }
        });
    }else {
        logger.error("No correct rules found, please check the rules directory or the rules files.");
    }

    deleteFile("./config/headers.json");
    deleteFile("./config/addOnNeed.json");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    talkAboutOtherProject();
    logger.debug(await getEnvVar("test"));
    context?.log(await getEnvVar("test"));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main();