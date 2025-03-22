import { Provider, ProviderResource } from "../models/providerResource.models";
import { Header } from "../models/settingFile/header.models";
import { writeStringToJsonFile } from "../helpers/files"
import { Capacity } from "../models/settingFile/capacity.models";
import {getContext, getNewLogger} from "./logger.service";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { getConfig } from "../helpers/loaderConfig";
import { jsonStringify } from "../helpers/jsonStringify";
import  {formatProviderNeededData} from "./api/formatterApi.service";

let configuration: any;
async function init() {
    try {
        configuration = await getConfig();
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();

const mainFolder = 'Kexa';
const serviceAddOnPath = './' + mainFolder + '/services/addOn';
const fs = require('fs');
const logger = getNewLogger("LoaderAddOnLogger");
const reservedNameAddOn=[
    "export",
    "save",
    "variable",
    "general",
]

export async function loadAddOns(settings:SettingFile[]): Promise<ProviderResource>{
    let resources: ProviderResource = {};
    let context = getContext();
    logger.info("Loading addOns");
    context?.log("Loading addOns");

    let addOnNeed;
    try {
        addOnNeed = require('../../config/addOnNeed.json');
    } catch (error) {
        logger.info("Failed to load addOnNeed configuration", error);
        throw new Error("addOnNeed configuration could not be loaded");
    }

    const files = fs.readdirSync(serviceAddOnPath);
    let results: any[] = [];

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        for (const file of files.filter((file: string) => !reservedNameAddOn.includes(file))) {
            const result = await loadAddOn(file, addOnNeed, settings);
            results.push(result);
        }
    } else {
        const promises = files.filter((file:string)=> !reservedNameAddOn.includes(file)).map(async (file: string) => {
            return await loadAddOn(file, addOnNeed, settings);
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
        }else{
            if(result?.delta) addOnShortCollect.push(result.key);
        }
    });
    if(addOnShortCollect.length > 0){
        logger.info(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
        context?.log(`AddOn ${addOnShortCollect} load in less than 15ms; No data has been collected for these addOns`);
    }
    return resources;
}

async function loadAddOn(file: string, addOnNeed: any, settings:SettingFile[]): Promise<{ key: string; data: Provider|null; delta: number } | null> {
    let context = getContext();

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
            const addOnConfig = (configuration.hasOwnProperty(nameAddOn)) ? configuration[nameAddOn] : null;
          

            if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
                addOnConfig.forEach((config: any) => {
                    if (Array.isArray(config.notificationGroups)) {
                        for (let i = 0; i < config.notificationGroups.length; i++) {
                            config.rules.push(config.notificationGroups[i].name);
                        }
                    }
                });
            }
    
            addOnConfig?.forEach((config: any) => {
                config.ObjectNameNeed = []
                config.rules.forEach((rulesName: string) => {
                    let addOnNeedRules = addOnNeed["objectNameNeed"][rulesName];
                    if(addOnNeedRules){
                        addOnNeedRules = addOnNeedRules[nameAddOn];
                        if(addOnNeedRules){
                            config.ObjectNameNeed = [...config.ObjectNameNeed, ...addOnNeedRules];
                        }
                    }
                });
            });
            const data = await collectData(addOnConfig);
            let delta = Date.now() - start;
            context?.log(`AddOn ${nameAddOn} collect in ${delta}ms`);
            logger.info(`AddOn ${nameAddOn} collect in ${delta}ms`);
            return { key: nameAddOn, data:(checkIfDataIsProvider(data) ? data : null), delta};
        }
    }catch(e){
        logger.warn(e);
    }
    return null;
}

export function loadAddOnsCustomUtility(usage: string, funcName:string, onlyFiles: string[]|null = null) : { [key: string]: Function; }{
    let dictFunc: { [key: string]: Function; } = {};
    const files = fs.readdirSync(serviceAddOnPath + "/" + usage);
    files.map((file: string) => {
        if(onlyFiles && !onlyFiles.some((onlyFile:string) => {return file.includes(onlyFile)})) return;
        let result = loadAddOnCustomUtility(file, usage, funcName);
        if(result?.data){
            dictFunc[result.key] = result.data;
        }
    });
    return dictFunc;
}

function loadAddOnCustomUtility(file: string, usage: string, funcName:string): { key: string; data: Function; } | null {
    try{
        let formatUsage = usage.slice(0,1).toUpperCase() + usage.slice(1);
        if (file.includes(formatUsage+ '.service')){
            let nameAddOn = file.split(formatUsage + '.service')[0];
            const moduleExports = require(`./addOn/${usage}/${nameAddOn}${formatUsage}.service`);
            const funcCall = moduleExports[funcName];
            return { key: nameAddOn, data:funcCall};
        }
    }catch(e){
        logger.warn("Error loading addOn " + file + " : " + e);
    }
    return null;
}

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
    writeStringToJsonFile(jsonStringify(finalData,4), "./config/headers.json");
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