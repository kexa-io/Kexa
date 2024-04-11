import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { ProviderResource } from "../../../models/providerResource.models";
import { getConfig } from "../../../helpers/loaderConfig";
import { KexaSaveConfig } from "../../../models/export/kexa/config.model";

const axios = require('axios');
const logger = getNewLogger("KexaExportationLogger");
const context = getContext();
//const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");

export async function save(save: KexaSaveConfig, resources: ProviderResource): Promise<void>{
    if(!save.name) throw new Error("name is required");
    let name = (await getEnvVar(save.name))??save.name;
    let token = (await getEnvVar(save.token))??save.token;
    logger.info(`Exportation to Kexa SaaS`);
    context?.log(`Exportation to Kexa SaaS`);
    const config = getConfig();
    let configSend:any = {};
    Object.keys(resources).forEach((providerName) => {
        configSend[providerName] = config[providerName]??[];
    });
    await axios.post(`https://api.kexa.io/api/job/exportation`, {resources: resources, configSend, save}, {
        headers: {
            User: name,
            Authorization: token
        }
    });
}