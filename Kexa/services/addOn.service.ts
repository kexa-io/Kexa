///////////////////////////////////////////////////////////////////////////////////////////////////
// import section
import type { Provider, ProviderResource } from "../models/providerResource.models";
import type { Header } from "../models/settingFile/header.models";
import { writeStringToJsonFile } from "../helpers/files"
import type { Capacity } from "../models/settingFile/capacity.models";
import {getContext, getNewLogger} from "./logger.service";
import type { SettingFile } from "../models/settingFile/settingFile.models";
import { getConfig } from "../helpers/loaderConfig";
import { jsonStringify } from "../helpers/jsonStringify";
import  {formatProviderNeededData} from "./api/formatterApi.service";
import { getAddOnModule, hasAddOnModule, getAllAddOnFiles } from "./addOnRegistry";
import { setHeaders, getHeaders } from "./headers.service";
///////////////////////////////////////////////////////////////////////////////////////////////////
// test import static for cli 
//import "./addOn/display/awsDisplay.service.ts" with { type: "file" };


///////////////////////////////////////////////////////////////////////////////////////////////////
// variable section
let configuration: any;
const mainFolder = 'Kexa';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
import fs from 'fs'
const logger = getNewLogger("LoaderAddOnLogger");
const reservedNameAddOn=[
    "export",
    "save",
    "variable",
    "general",
]
///////////////////////////////////////////////////////////////////////////////////////////////////
async function init() {
    try {
        configuration = await getConfig();
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();
///////////////////////////////////////////////////////////////////////////////////////////////////
export async function loadAddOns(): Promise<ProviderResource>{
    let resources: ProviderResource = {};
    let context = getContext();
    logger.info("Loading addOns");
    context?.log("Loading addOns");

    let addOnNeed = JSON.parse('{}');
    try {
        if(fs.existsSync('./config/addOnNeed.json')==true){
            var jsondata =fs.readFileSync('./config/addOnNeed.json', 'utf-8');
            addOnNeed = JSON.parse(jsondata);
        }else{
            //file not exist
            logger.error("File addOnNeed.json not exist");
        }
    } catch (error) {
        logger.info("Failed to load addOnNeed configuration", error);
        throw new Error("addOnNeed configuration could not be loaded");
    }

    if (!addOnNeed.addOn) addOnNeed.addOn = [];
    if (!addOnNeed.objectNameNeed) addOnNeed.objectNameNeed = {};
    // Use registry instead of filesystem for compiled binary compatibility
    const files = getAllAddOnFiles('gathering');
    let results: any[] = [];

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        for (const file of files.filter((file: string) => !reservedNameAddOn.includes(file))) {
            const result = await loadAddOn(file, addOnNeed);
            results.push(result);
        }
    } else {
        const promises = files.filter((file:string)=> !reservedNameAddOn.includes(file)).map(async (file: string) => {
            return await loadAddOn(file, addOnNeed);
        });
        results = await Promise.all(promises);
    }

    let addOnShortCollect: string[] = [];
    results.forEach((result: { key: string; data: Provider[]; delta: number }) => {
        if (result?.data) {
            resources[result.key] = result.data;
        }
        if((result?.delta)??0 > 15){
            logger.info(`AddOn ${result.key} collect in ${result.delta}ms`);
            context?.log(`AddOn ${result.key} collect in ${result.delta}ms`);
        }else if(result?.delta) addOnShortCollect.push(result.key);
    });
    if(addOnShortCollect.length > 0){
        logger.info(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
        context?.log(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
    }
    return resources;
}

async function loadAddOn(file: string, addOnNeed: any): Promise<{ key: string; data: Provider|null; delta: number } | null> {

    try {
        if (file.endsWith('Gathering.service.ts')) {
            let nameAddOn = file.split('Gathering.service.ts')[0];
            if (!addOnNeed["addOn"].includes(nameAddOn)) return null;
            let header = hasValidHeader(serviceAddOnPath + "/" + file);
            if (typeof header === "string") {
                logger.warn(header);
                return null;
            }

            try {
                const module = await getAddOnModule('gathering', file);
                if (!module) {
                    logger.error(`Module ${file} not found in registry`);
                    return null;
                }
                const { collectData } = module;
                if (typeof collectData !== 'function') {
                    logger.error(`collectData is not a function in ${file}`);
                    return null;
                }

                let start = Date.now();
                const addOnConfig = (configuration.hasOwnProperty(nameAddOn)) ? configuration[nameAddOn] : null;
                if (!addOnConfig) {
                    logger.info(`No configuration found for ${nameAddOn}, skipping data collection`);
                    return null;
                }

                if (process.env.INTERFACE_CONFIGURATION_ENABLED === 'true') {
                    addOnConfig.forEach((config: any) => {
                        if (Array.isArray(config.notificationGroups)) {
                            for (const notificationGroup of config.notificationGroups) {
                                config.rules.push(notificationGroup.name);
                            }
                        }
                    });
                }

                addOnConfig.forEach((config: any) => {
                    config.ObjectNameNeed = []
                    config.rules.forEach((rulesName: string) => {
                        let addOnNeedRules = addOnNeed["objectNameNeed"][rulesName];
                        if (addOnNeedRules) {
                            addOnNeedRules = addOnNeedRules[nameAddOn];
                            if (addOnNeedRules) {
                                config.ObjectNameNeed = [...config.ObjectNameNeed, ...addOnNeedRules];
                            }
                        }
                    });
                });

                try {
                    logger.info(`Starting data collection for ${nameAddOn}`);
                    const data = await collectData(addOnConfig);
                    let delta = Date.now() - start;
                    return { key: nameAddOn, data: (checkIfDataIsProvider(data) ? data : null), delta };
                } catch (error) {
                    logger.error(`Error during data collection for ${nameAddOn}:`, error);
                    return null;
                }
            } catch (error) {
                logger.error(`Error importing ${file}:`, error);
                return null;
            }
        }
    }catch(e){
        logger.warn(e);
    }
    return null;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
export async function loadAddOnsCustomUtility(usage: string, funcName:string, onlyFiles: string[]|null = null) : Promise<{ [key: string]: Function; }>{
    let dictFunc: { [key: string]: Function; } = {};
    // Use registry instead of filesystem for compiled binary compatibility
    const files = getAllAddOnFiles(usage);
    const promises = files.map(async (file: string) => {
        if(onlyFiles && !onlyFiles.some((onlyFile:string) => {return file.includes(onlyFile)})) return null;
        let result = await loadAddOnCustomUtility(file, usage, funcName);
        if(result?.data){
            dictFunc[result.key] = result.data;
        }
        return result;
    });
    await Promise.all(promises);
    return dictFunc;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
async function loadAddOnCustomUtility(file: string, usage: string, funcName:string): Promise<{ key: string; data: Function; } | null> {
    try{
        let formatUsage = usage.slice(0,1).toUpperCase() + usage.slice(1);
        if (file.includes(formatUsage+ '.service')){
            let nameAddOn = file.split(formatUsage + '.service')[0];
            const moduleExports = await getAddOnModule(usage, file);
            if (!moduleExports) {
                logger.warn(`Module ${file} not found in ${usage} registry`);
                return null;
            }
            const funcCall = moduleExports[funcName];
            return { key: nameAddOn, data:funcCall};
        }
    }catch(e){
        logger.warn("Error loading addOn " + file + " : " + e);
    }
    return null;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
export function checkIfDataIsProvider(data: any): data is Provider {
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
///////////////////////////////////////////////////////////////////////////////////////////////////
export function hasValidHeader(filePath: string): string | Header {
    const fileName = filePath.split('/').pop();
    const providerName = fileName?.split('Gathering.service.ts')[0];

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
            const trimmedLine = line.trim().replace(/[^\S\r\n]+/g, "").replace(/['";]/g, '');

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
                    let resourceName = trimmedLine.split('-')[1].trim().replace(" ", "").replace("\t", "");
                    resourceName = resourceName.replace(/['";]/g, '');
                    countResources.push(resourceName);
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
        const bundledHeaders = getHeaders();
        if (providerName && bundledHeaders[providerName]) {
            const headerData = bundledHeaders[providerName];
            return {
                provider: providerName,
                thumbnail: headerData.thumbnail,
                resources: headerData.resources,
                customName: headerData.customName,
                documentation: headerData.documentation
            };
        }
        return 'Error reading file:' + error;
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
export async function extractHeaders(): Promise<Capacity>{
    const files = getAllAddOnFiles('gathering');
    const promises = files.map(async (file: string) => {
        return await extractHeader(file);
    });
    const results = await Promise.all(promises);
    let finalData:any = {};
    results.forEach((result: Header | null) => {
        if(result?.provider && result?.resources){
            finalData[result.provider] = {
                "resources": result.resources,
                "thumbnail": result.thumbnail || "",
                "customName": result.customName,
                "documentation": result.documentation || "",
                "freeRules": [],
            };
        }
    });
    if (Object.keys(finalData).length > 0) {
        setHeaders(finalData);
        try {
            writeStringToJsonFile(jsonStringify(finalData,4), "./config/headers.json");
        } catch (error: any) {
            logger.debug("Could not write headers.json (will use bundled headers): " + error.message);
        }
        try {
            const headersServiceContent = `import type { Capacity } from "../models/settingFile/capacity.models";

let headersData: Capacity = ${jsonStringify(finalData, 4)};

export function getHeaders(): Capacity {
    return headersData;
}

export function setHeaders(data: Capacity): void {
    headersData = data;
}
`;
            fs.writeFileSync("./" + mainFolder + "/services/headers.service.ts", headersServiceContent, 'utf8');
        } catch (error) {
            logger.debug("Could not write headers.service.ts file (normal for compiled binary)");
        }
    }
    return finalData;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
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