import { Logger } from "tslog";
import { Provider, ProviderResource } from "../models/providerResource.models";

const mainFolder = 'Kexa';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs'); 
let logger = new Logger({ minLevel: Number(process.env.DEBUG_MODE)??4, type: "pretty", name: "LoaderAddOnLogger" });

export async function loadAddOns(resources: ProviderResource){
    logger.info("Loading addOns");
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file: string) => {
        return await loadAddOn(file);
    });
    const results = await Promise.all(promises);
    results.forEach((result: { key: string; data: Provider[]; }) => {
        if (result?.data) {
            resources[result.key] = result.data;
        }
    });
    return resources;
}

async function loadAddOn(file: string): Promise<{ key: string; data: Provider|null; } | null> {
    try{
        if (file.endsWith('Gathering.service.ts')){
            let nameAddOn = file.split('Gathering.service.ts')[0];
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (Array.isArray(header) !== true) {
                logger.warn(header);
                return null;
            }
            const { collectData } = await import(`./addOn/${file.replace(".ts", ".js") }`);
            let start = Date.now();
            const data = await collectData();
            let delta = Date.now() - start;
            logger.info(`AddOn ${nameAddOn} collect in ${delta}ms`);
            return { key: nameAddOn, data:(checkIfDataIsProvider(data) ? data : null)};
        }
    }catch(e){
        logger.warn(e);
    }
    return null;
}

export function loadAddOnsDisplay() : { [key: string]: Function; }{
    logger.info("Loading addOns Display");
    let dictFunc: { [key: string]: Function; } = {};
    const files = fs.readdirSync(serviceAddOnPath + "/display");
    files.map((file: string) => {
        let result = loadAddOnDisplay(file);
        if(result?.data){
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}

function loadAddOnDisplay(file: string): { key: string; data: Function; } | null {
    try{
        if (file.endsWith('Gathering.service.js')){
            let nameAddOn = file.split('Gathering.service.js')[0];
            const moduleExports = require(`./addOn/display/${nameAddOn}Display.service.js`);
            const displayFn = moduleExports.propertyToSend;
            return { key: nameAddOn, data:displayFn};
        }
    }catch(e){
        logger.warn(e);
    }
    return null;
}

function checkIfDataIsProvider(data: any): data is Provider {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    return true;
}

export function hasValidHeader(filePath: string): string | string[] {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');

        let hasProvider = false;
        let hasResources = false;
        let nextLineIsResources = false;
        let countResources = [];

        for (const line of lines) {
            const trimmedLine = line.trim().replace(" ", "").replace("\t", "");

            if (trimmedLine.startsWith('*Provider')) {
                hasProvider = true;
                continue;
            }

            if (trimmedLine.startsWith('*Resources')) {
                hasResources = true;
                nextLineIsResources = true;
                continue;
            }

            if (nextLineIsResources) {
                if (/\s*\*\s*-\s*\s*[a-zA-Z0-9]+\s*/.test(trimmedLine)) {
                    countResources.push(trimmedLine.split('-')[1]);
                    continue;
                }
                nextLineIsResources = false;
                continue;
            }

            if(hasProvider && hasResources && countResources.length > 0) {
                return countResources;
            }
        }

        return `Invalid header in ${filePath} file. Please check the header. Have you added the Resources and Provider?`;
    } catch (error) {
        return 'Error reading file:' + error;
    }
}