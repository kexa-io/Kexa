import {getConfigFromApi} from "../services/api/configLoaderApi.service";

const fs = require('fs');

export async function getConfig(): Promise<any> {

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        await getConfigFromApi();
    }
    if (process.env.SPECIALCONFIG) {
        return JSON.parse(fs.readFileSync(process.env.SPECIALCONFIG));
    } else {
        return require('node-config-ts').config;
    }
}