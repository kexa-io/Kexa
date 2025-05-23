import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { KexaSaveConfig } from "../../../models/export/kexa/config.model";
import { propertyToSend } from "../../display.service";

const axios = require('axios');
const logger = getNewLogger("KexaSaveLogger");
const context = getContext();

export async function save(save: KexaSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.name) throw new Error("name is required");
    let name = null;
    let token = null;
    if (process.env.INTERFACE_CONFIGURATION_ENABLED == "true") {
        name = save.name;
        token = save.token;
    } else {
        name = (await getEnvVar(save.name))??save.name;
        token = (await getEnvVar(save.token))??save.token;
    }
    logger.info(`Saving to Kexa SaaS`);
    context?.log(`Saving to Kexa SaaS`);
    result.forEach(async (resultScan) => {
        resultScan.forEach(async (subResultScan) => {
            subResultScan.identifier = propertyToSend(subResultScan.rule, subResultScan.objectContent, true);
        });
    });
    await axios.post((process.env.KEXA_API_URL??`http://localhost:4012/api`) + `/job/save`, {result: result, save}, {
        headers: {
            User: name,
            Authorization: token
        }
    });
    logger.info("All data saved in Kexa SaaS");
    context?.log("All data saved in Kexa SaaS");
}