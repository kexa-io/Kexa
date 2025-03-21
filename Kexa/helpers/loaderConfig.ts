import {getConfigFromApi} from "../services/api/loaderApi.service";

const fs = require('fs');

export async function getConfig(): Promise<any> {

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
         return await getConfigFromApi();
    }
    if (process.env.SPECIALCONFIG) {
        return JSON.parse(fs.readFileSync(process.env.SPECIALCONFIG));
    } else {
        return require('node-config-ts').config;
    }
}