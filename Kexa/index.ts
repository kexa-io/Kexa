import { AzureFunction, Context } from "@azure/functions"
import { GlobalAlert, mainScan } from "./main";
import { getNewLogger, setContext } from "./services/logger.service";
import { getConfig } from "./helpers/loaderConfig";
import { displayVersionAndLatest } from "./helpers/latestVersion";
import { AsciiArtText } from "./services/display.service";
import { gatheringRules } from "./services/analyse.service";
import { getEnvVar } from "./services/manageVarEnvironnement.service";
import { ResultScan } from "./models/resultScan.models";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }
    context.log("The function is starting to scan");
    setContext(context);
    const configuration = getConfig();
    const generalConfig = (configuration.hasOwnProperty("general")) ? configuration["general"] : null;
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
    await displayVersionAndLatest(logger);
    AsciiArtText("Kexa");
    let idScan = 0;
    let settings = await gatheringRules(await getEnvVar("RULESDIRECTORY")??"https://github.com/kexa-io/public-rules");
    let allScan: ResultScan[][] = [];
    allScan = await mainScan(settings, allScan, idScan.toString());
    await GlobalAlert(settings, allScan);
    context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
