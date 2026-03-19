import {getConfigFromApi} from "../services/api/loaderApi.service";

import * as fs from 'fs';

export async function getConfig(saveOnly: boolean = false): Promise<any> {

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        return await getConfigFromApi(saveOnly);
    }
    if (process.env.SPECIALCONFIG) {
        const configPath = process.env.SPECIALCONFIG;
        if (!fs.existsSync(configPath)) {
            throw new Error(`SPECIALCONFIG file not found: ${configPath}`);
        }
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } else {
        return require('node-config-ts').config;
    }
}