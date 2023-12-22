import env from "dotenv";
import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal } from "./services/alerte.service";
import { AsciiArtText, renderTableAllScan, renderTableAllScanLoud, talkAboutOtherProject} from "./services/display.service";
import { getEnvVar } from "./services/manageVarEnvironnement.service";
import { loadAddOns } from "./services/addOn.service";
import { deleteFile, createFileSync } from "./helpers/files";
import {getContext, getNewLogger} from "./services/logger.service";
import { Emails } from "./emails/emails";
import { displayVersionAndLatest } from "./helpers/latestVersion";
import { saveResult } from "./services/save.service";

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const folderOutput = process.env.OUTPUT??"./output";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env.config();// reading environnement vars
// file system

let config = require('node-config-ts');

export async function main() {
    env.config();

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

    AsciiArtText("Kexa");
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________"); 
    await displayVersionAndLatest(logger);
    let settings = await gatheringRules(await getEnvVar("RULESDIRECTORY")??"./Kexa/rules");
    context?.log("settings", settings);
    if(settings.length != 0){
        let resources = await loadAddOns(settings);
        context?.log("resources", resources);
        if(args.o) createFileSync(JSON.stringify(resources), folderOutput + "/resources/"+ new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') +".json", true);
        context?.log("good");
        settings.forEach(setting => {
            context?.log("setting", setting);
            let result = checkRules(setting.rules, resources, setting.alert);
            if(setting.alert.global.enabled){
                let render_table = renderTableAllScan(result.map(scan => scan.filter(value => value.error.length>0)));
                let render_table_loud = renderTableAllScanLoud(result.map(scan => scan.filter(value => value.loud)));
                let compteError = [0,0,0,0];
                result.forEach((rule) => {
                    rule.forEach((scan) => {
                        if(scan.error.length > 0) compteError[scan.rule?.level??3]++;
                    });
                });
                let mail = Emails.Recap(compteError, render_table, render_table_loud, setting.alert.global);
                createFileSync(mail, folderOutput + "/scans/"+ setting.alert.global.name + "/" + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') +".html");
                alertGlobal(result, setting.alert.global);
            }
            saveResult(result);
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