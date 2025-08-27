import type { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getNewLogger } from "../../logger.service";
import type { KexaSaveConfig } from "../../../models/export/kexa/config.model";
import { propertyToSend } from "../../display.service";
import { extractHeaders } from "../../addOn.service";

const axios = require('axios');
const logger = getNewLogger("KexaSaveLogger");
const DEFAULT_KEXA_API_URL = "http://localhost:4012/api";

interface ResourceComparison {
    shouldSendResources: boolean;
    missingProviderItems: { [key: string]: string[] };
    localCount: number;
    apiCount: number;
}

async function compareResourcesWithApi(name: string, token: string, baseApiUrl: string): Promise<ResourceComparison> {
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
    const requestHeaders = {
        User: name,
        Authorization: token
    };

    try {
        const countFromApi = await axios.get(`${baseApiUrl}/kexa/providerItems/count`, {
            headers: requestHeaders
        });
        const totalCount = countFromApi.data.message.totalCount;
        if (totalResourcesCount === totalCount) {
            return {
                shouldSendResources: false,
                missingProviderItems: {},
                localCount: totalResourcesCount,
                apiCount: totalCount
            };
        }

        const providerItemsFromApi = await axios.get(`${baseApiUrl}/kexa/providerItems`, {
            headers: requestHeaders
        });

        let itemsFromApi;

        if (!Array.isArray(providerItemsFromApi.data.message)) {
            itemsFromApi = [];
        } else {
            itemsFromApi = providerItemsFromApi.data.message;
        }
        const existingItems = new Set();
        itemsFromApi.forEach((item: any) => {
            existingItems.add(`${item.providerName}:${item.name}`);
        });

        const missingProviderItems: { [key: string]: string[] } = {};
        for (const providerName of Object.keys(resources)) {
            for (const resourceName of resources?.[providerName] ?? []) {
                const key = `${providerName}:${resourceName}`;
                if (!existingItems.has(key)) {
                    if (!missingProviderItems[providerName]) {
                        missingProviderItems[providerName] = [];
                    }
                    missingProviderItems[providerName].push(resourceName);
                }
            }
        }
        return {
            shouldSendResources: Object.keys(missingProviderItems).length > 0,
            missingProviderItems,
            localCount: totalResourcesCount,
            apiCount: totalCount
        };
    } catch (error: any) {
        throw new Error(`Failed to compare resources with API: ${error.message}`);
    }
}

export async function initOnly(save: KexaSaveConfig): Promise<void> {
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

    logger.info(`Initializing provider items in Kexa Premium`);
    const baseApiUrl = process.env.KEXA_API_URL ?? DEFAULT_KEXA_API_URL;
    const comparison = await compareResourcesWithApi(name, token, baseApiUrl);

    if (comparison.shouldSendResources && Object.keys(comparison.missingProviderItems).length > 0) {
        const requestHeaders = {
            User: name,
            Authorization: token
        };
        try {
            await axios.post(`${baseApiUrl}/job/save`, {
                providerItemInit: comparison.missingProviderItems,
                isInit: true,
            },
            {
                headers: requestHeaders
            });
            logger.info(`Provider items initialized - sent ${comparison.localCount - comparison.apiCount} missing resources`);
        } catch (error: any) {
            console.log(error);
            throw new Error(`Failed to initialize provider items: ${error.message}`);
        }
    } else {
        logger.info(`Provider items initialization skipped - no missing resources found`);
    }
}

export async function save(save: KexaSaveConfig, result: ResultScan[][]): Promise<void> {
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

    logger.info(`Saving to Kexa API`);
    result.forEach(async (resultScan) => {
        resultScan.forEach(async (subResultScan) => {
            subResultScan.identifier = propertyToSend(subResultScan.rule, subResultScan.objectContent, true);
        });
    });

    const baseApiUrl = process.env.KEXA_API_URL ?? DEFAULT_KEXA_API_URL;
    const comparison = await compareResourcesWithApi(name, token, baseApiUrl);
    logger.info(`There are ${comparison.localCount - comparison.apiCount} missing provider items to synchronize`);

    const requestHeaders = {
        User: name,
        Authorization: token
    };

    try {
        await axios.post(`${baseApiUrl}/job/save`, {
            result: result,
            save,
            providerItemInit: comparison.shouldSendResources ? comparison.missingProviderItems : null,
        },
        {
            headers: requestHeaders
        });
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
    logger.info("All data saved in Kexa API");
}