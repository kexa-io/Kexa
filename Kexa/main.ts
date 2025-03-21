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
import { ResultScan, SubResultScan } from "./models/resultScan.models";
import { exit } from "process";

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv
const folderOutput = process.env.OUTPUT??"./output";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
env?.config();

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

const {
    setTimeout: setTimer,
    clearTimeout: clearTimer
  } = require('node:timers');


  import {alertFromGlobal} from "./services/alerte.service";
import { Condition } from "@aws-sdk/client-forecast";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function main(retryLeft = -1) {
    const configuration = await getConfig();

    const generalConfig = (configuration.hasOwnProperty("general")) ? configuration["general"] : null;
    let context = getContext();
    context?.log("entering main");
    const logger = getNewLogger("MainLogger");
    context?.log("logger created");


    

    if (process.env.DEV) {
        if (process.env.DEV == "true") {
            logger.setting.level = 2;
        }
    }

    context?.log("logger configured");
    try {
        await displayVersionAndLatest(logger);
    } catch (e) {
        logger.error("Error getting latest version of Kexa (github.com)");
    }
    AsciiArtText("Kexa");
    let idScan = 0;
    let settings = await gatheringRules(await getEnvVar("RULESDIRECTORY")??"https://github.com/kexa-io/public-rules");
    let allScan: ResultScan[][] = [];
    let retError = false;
    let timer;
    

    /* 3 default max retry when timeout happen in continuous run */
    const defaultMaxRetry = generalConfig?.checkInterval != null ? 3 : 0;
    if (retryLeft == -1)
        retryLeft = (generalConfig?.maxRetry != null && generalConfig?.checkInterval != null) ? generalConfig?.maxRetry : defaultMaxRetry;

    while (1) { //(1){
        /* 5 minutes default timeout */
        const defaultTimeout = 15;
        const minuteTimeout = 60 * 1000;
       const timeout = minuteTimeout * (generalConfig?.timeout != null ? generalConfig?.timeout : defaultTimeout);
        timer = setTimer(() => {
            if (retryLeft == 0) {
                allScan = [];
                const timeoutError = {
                    value: "Enabled",
                    condition: [
                        { 
                            property: 'KexaExecutionTime',
                            condition: 'InferiorThan',
                            value: timeout
                        }
                    ],
                    result: false
                }
                const objectContentCustom = (timeout / 1000).toString() + " seconds custom timeout";
                const objectContentDefault = "5 minutes default timeout";
                const timeoutScan: ResultScan = { 
                    error: [timeoutError as SubResultScan],
                    rule: {
                        level: 3,
                        name: "Timeout",
                        applied: true,
                        cloudProvider: "Kexa",
                        description: "Timeout",
                        objectName: "Timer",
                        conditions: []
                    },
                    objectContent: {
                        id: (generalConfig?.timeout != null ? objectContentCustom : objectContentDefault)
                    }
                }
                allScan.push([timeoutScan as ResultScan]);
                settings.forEach(setting => {
                    alertFromGlobal(setting.alert.global, [], allScan)
                });
                
                process.exit(1);
        
            } else {
                retryLeft--;
                logger.error("Timeout reached, retrying scan");
                return (2);
            }
          }, timeout);
        if (timer == 2)
            continue;
        let startTimeStamp = Date.now();
        await mainScan(settings, allScan, idScan.toString());
        if(Memoisation.canSendGlobalAlert()){
            logger.error("Global alert");
            retError = await GlobalAlert(settings, allScan);
            if(retError) {
                logger.error("High level error found in scan, exiting Kexa");
                clearTimer(timer);
                break;
            }
            allScan = [];
        }
        if (generalConfig?.checkInterval && (~~generalConfig.checkInterval > 0 || ~~generalConfig.checkInterval == -1)) {
            logger.info("Waiting for next scan in " + generalConfig.checkInterval + " seconds");
            clearTimer(timer);
            await new Promise(r => setTimeout(r, Math.max((~~generalConfig.checkInterval - (Date.now()-startTimeStamp)/1000)*1000, 0)));
        } else {
            logger.info("No checkInterval found, exiting Kexa");
            clearTimer(timer);
            break;
        }
        idScan++;
    };
   clearTimer(timer);
}

main();