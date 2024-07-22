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
import { exportationData } from "./services/exportation.service";
import { getConfig } from "./helpers/loaderConfig";
import { jsonStringify } from "./helpers/jsonStringify";
import { Memoisation } from "./services/memoisation.service";
import { SettingFile } from "./models/settingFile/settingFile.models";
import { ResultScan } from "./models/resultScan.models";

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const folderOutput = process.env.OUTPUT??"./output";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env.config();

export async function mainScan(settings: SettingFile[], allScan: ResultScan[][], idScan?: string): Promise<ResultScan[][]> {
    let context = getContext();
    const logger = getNewLogger("ScanLogger"+(idScan?idScan:""));
    const start:Date = new Date;
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    let allPromises = [];
    if(settings.length != 0){
        let resources = await loadAddOns(settings);
        allPromises.push(exportationData(resources));
        if(args.o) createFileSync(JSON.stringify(resources), folderOutput + "/resources/"+ new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') +".json", true);
        settings.forEach(setting => {
            let result = checkRules(setting.rules, resources, setting.alert);
            const realResult = JSON.parse(jsonStringify(result));
            result = result.map(scan => scan.filter((rule) => Memoisation.needToBeCache(rule.rule, rule.objectContent, (idScan??""), start)));
            result.forEach(scan => {if(scan.length>0) allScan.push(scan)});
            allPromises.push(saveResult(realResult));
        });
        await Promise.all(allPromises);
    }else {
        logger.error("No correct rules found, please check the rules directory or the rules files.");
    }

    deleteFile("./config/headers.json");
    deleteFile("./config/addOnNeed.json");
    const delta = Date.now() - start.getTime();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________"); 
    logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
    logger.info("_".repeat(99-15-delta.toString().length)+"Scan done in "+delta+"ms");
    talkAboutOtherProject();
    logger.debug(await getEnvVar("test"));
    context?.log(await getEnvVar("test"));
    return allScan;
}

export async function GlobalAlert(settings: SettingFile[], allScan: ResultScan[][]) : Promise<boolean> {
    let retError = false;

    settings.forEach(setting => {
        if(setting.alert.global.enabled){
            let render_table = renderTableAllScan(allScan.map(scan => scan.filter(value => value.error.length>0)));
            let render_table_loud = renderTableAllScanLoud(allScan.map(scan => scan.filter(value => value.loud)));
            let compteError = [0,0,0,0];
            allScan.forEach((rule) => {
                rule.forEach((scan) => {
                    if(scan.error.length > 0) {
                        compteError[scan.rule?.level??3]++;
                        if (scan.rule?.level >= 2) {
                            retError = true;
                        }
                    }
                });
            });
            let mail = Emails.Recap(compteError, render_table, render_table_loud, setting.alert.global);
            createFileSync(mail, folderOutput + "/scans/"+ setting.alert.global.name + "/" + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') +".html");
            alertGlobal(allScan, setting.alert.global);
        }
    });
    return retError;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function main() {
    const configuration = getConfig();
    const generalConfig = (configuration.hasOwnProperty("general")) ? configuration["general"] : null;
    let context = getContext();
    context?.log("entering main");
    const logger = getNewLogger("MainLogger");
    context?.log("logger created");
    if (process.env.DEV) {
        if (process.env.DEV == "true") {
            logger.settings.minLevel = 2;
        }
    }

    context?.log("logger configured");
    await displayVersionAndLatest(logger);
    AsciiArtText("Kexa");
    let idScan = 0;
    let settings = await gatheringRules(await getEnvVar("RULESDIRECTORY")??"https://github.com/4urcloud/Kexa_Rules");
    let allScan: ResultScan[][] = [];
    let retError = false;
    while(1){
        let startTimeStamp = Date.now();
        await mainScan(settings, allScan, idScan.toString());
        if(Memoisation.canSendGlobalAlert()){
            logger.error("Global alert");
            retError = await GlobalAlert(settings, allScan);
            if(retError) {
                logger.error("High level error found in scan, exiting Kexa");
                break;
            }
            allScan = [];
        }
        if (generalConfig?.checkInterval && (~~generalConfig.checkInterval > 0 || ~~generalConfig.checkInterval == -1)) {
            await new Promise(r => setTimeout(r, Math.max((~~generalConfig.checkInterval - (Date.now()-startTimeStamp)/1000)*1000, 0)));
        } else {
            logger.info("No checkInterval found, exiting Kexa");
            if (retError)
                process.exit(1);
            break;
        }
        idScan++;
    };
    if (retError)
        process.exit(1);
}

main();