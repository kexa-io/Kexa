/*
    * Provider : fuzz
    * Note : this is not a real addon, it is made for fuzz testing
    * Resources :
    *     - fuzzData
*/


import { fuzzResources } from "../../models/fuzzing/resource.models";
import { fuzzConfig } from "../../models/fuzzing/config.models";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("FuzzLogger");
let currentConfig: fuzzConfig;

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////


interface fuzzData1 {
    data: any;
    name: string | number;
    randomizeList: any[];
    id?: string;
}

export async function collectData(fuzzConfig:fuzzConfig[], fuzzData: Buffer): Promise<fuzzResources[] | null> {
    let context = getContext();
    let resources = new Array<fuzzResources>();


    console.log("FUZZ GATEHRING HERE");
    console.log(fuzzConfig);
    for (let config of fuzzConfig??[]) {
        currentConfig = config;

        let fuzzResources = {
            "fuzzData1": "default",
            "fuzzData2": "default"
        } as fuzzResources;

        try {
            context?.log("- listing Fuzz resources -");
            logger.info("- listing Fuzz resources -");
            const promises = [
                listFunc1(fuzzData),
                listFunc2(fuzzData),
            ];
            const [fuzzData1, fuzzData2] = await Promise.all(promises);
            
            context?.log("- listing fuzz resources done -");
            logger.info("- listing fuzz resources done -");

            fuzzResources = {
                fuzzData1: fuzzData1,
                fuzzData2: fuzzData2
            };
        }
        catch (e) {
            logger.error("error in fuzz collect");
            logger.error(e);
        }
        resources.push(fuzzResources);
    }
    return resources ?? null;
}

function generateRandomInt(seed: Buffer, min: number, max: number): number {
    const seedSum = seed.reduce((acc, byte) => acc + byte, 0);
    const rand = (seedSum % (max - min + 1)) + min;
    return rand;
}

function generateRandomContent(seed: Buffer, depth: number): any {
    const choice = generateRandomInt(seed, 0, 2);
    switch (choice) {
        case 0:
            return seed.toString('hex');
        case 1:
            const value = seed.length >= 4 ? seed.readUInt32LE(0) % 1000 : seed.readUInt8(0) % 1000;
            return value;
        case 2:
            return depth > 0 ? generateRandomList(seed, depth - 1) : [];
    }
}

function generateRandomList(seed: Buffer, maxDepth: number): any[] {
    if (maxDepth === 0) return [];

    const listSize = generateRandomInt(seed, 1, 5);
    let randomList = [];
    
    for (let i = 0; i < listSize; i++) {
        const itemSeed = Buffer.alloc(seed.length);
        for (let j = 0; j < seed.length; j++) {
            itemSeed[j] = seed[j] ^ i;
        }
        randomList.push(generateRandomContent(itemSeed, maxDepth));
    }

    return randomList;
}


async function listFunc1(fuzzData: Buffer): Promise<any> {
    let fuzzDataRet: fuzzData1 = {
        data: fuzzData.toString(),
        name: fuzzData.toString(),
        randomizeList: generateRandomList(fuzzData, 5),
        id: "fuzzData1"
    };
    return fuzzDataRet;
}

async function listFunc2(fuzzData: Buffer): Promise<any> {
    const data = fuzzData.length >= 4 ? fuzzData.readUInt32LE(0) : 0;

    let fuzzDataRet: fuzzData1 = {
        data: data,
        name: data,
        randomizeList: generateRandomList(fuzzData, 5),
        id: "fuzzData2"
    };
    return fuzzDataRet;
}