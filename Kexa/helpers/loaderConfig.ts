import {getConfigFromApi} from "../services/api/loaderApi.service";

import * as fs from 'fs';

export async function getConfig(saveOnly: boolean = false): Promise<any> {

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        return await getConfigFromApi(saveOnly);
    }
    if (process.env.SPECIALCONFIG) {
        return JSON.parse(fs.readFileSync(process.env.SPECIALCONFIG));
    } else {
        return require('node-config-ts').config;
    }
}