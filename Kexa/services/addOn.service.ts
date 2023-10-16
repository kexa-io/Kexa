import { Provider, ProviderResource } from "../models/providerResource.models";
import { Header } from "../models/settingFile/header.models";
import { writeStringToJsonFile } from "../helpers/files"
const configuration = require('config');

const mainFolder = 'Kexa';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs');

import {getContext, getNewLogger} from "./logger.service";
import { Capacity } from "../models/settingFile/capacity.models";
const logger = getNewLogger("LoaderAddOnLogger");

export async function loadAddOns(resources: ProviderResource): Promise<ProviderResource>{
    let context = getContext();
    logger.info("Loading addOns");
    context?.log("Loading addOns");
    const addOnNeed = require('../../config/addOnNeed.json');
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file: string) => {
        return await loadAddOn(file, addOnNeed);
    });
    const results = await Promise.all(promises);
    results.forEach((result: { key: string; data: Provider[]; }) => {
        if (result?.data) {
            resources[result.key] = result.data;
        }
    });
    return resources;
}

async function loadAddOn(file: string, addOnNeed: any): Promise<{ key: string; data: Provider|null; } | null> {
    try{
        if (file.endsWith('Gathering.service.ts')){
            let nameAddOn = file.split('Gathering.service.ts')[0];
            if(!addOnNeed["addOn"].includes(nameAddOn)) return null;
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                logger.warn(header);
                return null;
            }
            const { collectData } = await import(`./addOn/${file.replace(".ts", ".js") }`);
            let start = Date.now();
            const addOnConfig = (configuration.has(nameAddOn))?configuration.get(nameAddOn):null;
            const data = await collectData(addOnConfig);
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
    let dictFunc: { [key: string]: Function; } = {};
    const files = fs.readdirSync(serviceAddOnPath + "/display");
    files.map((file: string) => {
        let result = loadAddOnDisplay(file.replace(".ts", ".js"));
        if(result?.data){
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}

function loadAddOnDisplay(file: string): { key: string; data: Function; } | null {
    try{
        if (file.endsWith('Display.service.js')){
            let nameAddOn = file.split('Display.service.js')[0];
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
    if (data === null || !Array.isArray(data)) {
        return false;
    }
    for (const index in data) {
        if (data[index] === null) {
            return false;
        }
    }
    return true;
}

export function hasValidHeader(filePath: string): string | Header {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let header:Header = {
            provider: '',
            thumbnail: '',
            resources: []
        };

        let hasProvider = false;
        let hasResources = false;
        let hasThumbnail = false;
        let hasDocumentation = false;
        let nextLineIsResources = false;
        let countResources = [];

        for (const line of lines) {
            const trimmedLine = line.trim().replace(" ", "").replace("\t", "");

            if (trimmedLine.startsWith('*Provider')) {
                hasProvider = true;
                header.provider = trimmedLine.split(':')[1];
                continue;
            }

            if (trimmedLine.startsWith('*Thumbnail')) {
                hasThumbnail = true;
                header.thumbnail = trimmedLine.split(':').slice(1).join(':').trim();
                continue;
            }

            if (trimmedLine.startsWith('*Documentation')) {
                header.documentation = trimmedLine.split(':').slice(1).join(':').trim();
                continue;
            }

            if (trimmedLine.startsWith('*Name')) {
                header.customName = trimmedLine.split(':')[1];
                continue;
            }

            if (trimmedLine.startsWith('*Resources')) {
                hasResources = true;
                nextLineIsResources = true;
                continue;
            }

            if (nextLineIsResources) {
                if (/\s*\*\s*-\s*\s*[a-zA-Z0-9]+\s*/.test(trimmedLine)) {
                    countResources.push(trimmedLine.split('-')[1].trim().replace(" ", "").replace("\t", ""));
                    continue;
                }
                nextLineIsResources = false;
                continue;
            }

            if(hasThumbnail && hasProvider && hasResources && countResources.length > 0) {
                header.resources = countResources;
                return header;
            }
        }

        return `Invalid header in ${filePath} file. Please check the header. Have you added the Resources and Provider?`;
    } catch (error) {
        return 'Error reading file:' + error;
    }
}

export async function extractHeaders(): Promise<Capacity>{
    const files = fs.readdirSync(serviceAddOnPath);
    const promises = files.map(async (file: string) => {
        return await extractHeader(file);
    });
    const results = await Promise.all(promises);
    let finalData:any = {};
    results.forEach((result: Header | null) => {
        if(result?.provider && result?.resources && result?.thumbnail){
            finalData[result.provider] = {
                "resources": result.resources,
                "thumbnail": result.thumbnail,
                "customName": result.customName,
                "documentation": result.documentation,
                "freeRules": [],
            };
        }
    });
    writeStringToJsonFile(JSON.stringify(finalData), "./config/headers.json");
    return finalData;
}

async function extractHeader(file: string): Promise<Header|null> {
    try{
        if (file.endsWith('Gathering.service.ts')){
            let nameAddOn = file.split('Gathering.service.ts')[0];
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                return null;
            }
            header.provider = nameAddOn;
            return header;
        }
    }catch(e){
        logger.warn(e);
    }
    return null;
}