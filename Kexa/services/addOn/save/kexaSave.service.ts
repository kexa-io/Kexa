import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { KexaSaveConfig } from "../../../models/export/kexa/config.model";
import { propertyToSend } from "../../display.service";
import { extractHeaders } from "../../addOn.service";

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

    const headers = await extractHeaders();
    let resources: { [key: string]: string[] } = {};
    if (headers) {
        for (const key of Object.keys(headers)) {
            const addon = headers[key];
            if (addon && addon.resources && key != "fuzz") {
                resources[key] = addon.resources;
            }
        }
    }
    const totalResourcesCount = Object.values(resources).reduce((sum, resourceArray) => {
        const uniqueResources = new Set(resourceArray);
        return sum + uniqueResources.size;
    }, 0);
   
    const baseApiUrl = process.env.KEXA_API_URL ?? `http://localhost:4012/api`;
    const requestHeaders = {
        User: name,
        Authorization: token
    };

    try {
        const countFromApi = await axios.get(`${baseApiUrl}/kexa/providerItems/count`, {
            headers: requestHeaders
        });
        const totalCount = countFromApi.data.message.totalCount;
        const resourcesToSend = totalResourcesCount > totalCount ? resources : null;
        await axios.post(`${baseApiUrl}/job/save`, {
            result: result,
            save,
            providerItemInit: resourcesToSend,
        }, {
            headers: requestHeaders
        });
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
    
    logger.info("All data saved in Kexa SaaS");
    context?.log("All data saved in Kexa SaaS");
}