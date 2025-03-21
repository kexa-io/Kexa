import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
//import { loadAddOnsCustomUtility } from "../../addOn.service";
import { KexaSaveConfig } from "../../../models/export/kexa/config.model";
import { propertyToSend } from "../../display.service";

const axios = require('axios');
const logger = getNewLogger("KexaSaveLogger");
const context = getContext();
//const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");

export async function save(save: KexaSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.name) throw new Error("name is required");
    let name = (await getEnvVar(save.name))??save.name;
    let token = (await getEnvVar(save.token))??save.token;
    logger.info(`Saving to Kexa SaaS`);
    context?.log(`Saving to Kexa SaaS`);
    result.forEach(async (resultScan) => {
        resultScan.forEach(async (subResultScan) => {
            subResultScan.identifier = propertyToSend(subResultScan.rule, subResultScan.objectContent, true);
        });
    });
    await axios.post((process.env.DOMAINEKEXA??`https://api.kexa.io`) + `/api/job/save`, {result: result, save}, {
        headers: {
            User: name,
            Authorization: token
        }
    });
}