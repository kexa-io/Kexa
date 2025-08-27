import { getNewLogger } from "../services/logger.service";
import type { fuzzConfig } from "../models/fuzzing/config.models";
import { setup as setupLogger } from 'adze';
import { checkRules } from "../services/analyse.service";
import type { ProviderResource, Provider } from "../models/providerResource.models";
import { checkIfDataIsProvider } from "../services/addOn.service";
import type { Alert } from "../models/settingFile/alert.models";
import { AlertEnum } from "../enum/alert.enum";
import type { Rules } from "../models/settingFile/rules.models";
import type { GlobalConfigAlert } from "../models/settingFile/globalAlert.models";
import type { ConfigAlert } from "../models/settingFile/configAlert.models";
import type { SettingFile } from "../models/settingFile/settingFile.models";


function getGlobalConfigAlert(): GlobalConfigAlert {
	const globalConfigAlert: GlobalConfigAlert = {
		enabled: true,
		type: [AlertEnum.LOG],
		to: [],
		conditions: [],
		name: "global"
	};
	return globalConfigAlert;
}

function getConfigAlert(): ConfigAlert {
	const configAlert: ConfigAlert = {
		enabled: true,
		type: [AlertEnum.LOG],
		to: []
	};
	return configAlert;
}

function getAlert(): Alert {
	const alert: Alert = {
		fatal: getConfigAlert(),
		error: getConfigAlert(),
		warning: getConfigAlert(),
		info: getConfigAlert(),
		global: getGlobalConfigAlert()
	};
	return alert;
}

import { ConditionEnum } from "../enum/condition.enum";

function getRuleFromFuzzData3(fuzzData: Buffer): Rules {
	const rules: Rules = {
		name: fuzzData.toString(),
		description: fuzzData.toString(),
		urlDescription: "https://github.com/CodeIntelligenceTesting/jazzer.js",
        notification: "Fuzz data is a way to test the application by providing random data and lot of runs",
		applied: true,
		level: 0,
		cloudProvider: "fuzz",
		objectName: "fuzzData2",
		conditions: [
            {
                property: "name",
                condition: getRandomizedConditionEnum(),
                value: fuzzData.toString(),
                date: "YYYY-MM-DD"
            },
        ],
		loud: true,
		loudMessage: "Fuzz data is a buffer that is used to test the application with random data"
	};
	return rules;
}

function getRandomizedConditionEnum(): ConditionEnum {
    const conditionEnum = Math.floor(Math.random() * Object.keys(ConditionEnum).length / 2);
    const conditionEnumValue = Object.values(ConditionEnum)[conditionEnum];
    return conditionEnumValue ?? ConditionEnum.EQUAL;
}

function getRuleFromFuzzData2(fuzzData: Buffer): Rules {
    function extractString(offset: number, length: number): string {
        return fuzzData.slice(offset, offset + length).toString('utf-8');
    }

    function extractBoolean(offset: number): boolean {
        return fuzzData?.[offset] % 2 === 0;
    }

    function extractNumber(offset: number, max: number): number {
        return fuzzData?.[offset] % max;
    }

    const rules: Rules = {
        name: fuzzData.toString(),
        description: fuzzData.toString(),
        urlDescription: "https://github.com/CodeIntelligenceTesting/jazzer.js",
        notification: "Fuzz data is a way to test the application by providing random data and lot of runs",
        applied: extractBoolean(90),
        level: extractNumber(91, 5),
        cloudProvider: "fuzz",
        objectName: "fuzzData1",
        conditions: [
            {
                property: extractString(112, 10) || "none",
                condition: getRandomizedConditionEnum(),
                value: extractString(124, 10) || "none",
                date: extractString(134, 10) || "YYYY-MM-DD"
            }
        ],
        loud: extractBoolean(112),
        loudMessage: "Fuzz data is a buffer that is used to test the application with random data"
    };

    return rules;
}

export async function fuzz(fuzzData: Buffer) {
    const configuration = getFuzzConfig(fuzzData);

    const logger = getNewLogger("MainLogger");
    if (process.env.DEV === "true") {
        setupLogger({
            activeLevel: 'debug'
        });
    }

	const settings: SettingFile[] = [{
		version: "1.0",
		date: "2021-10-01",
		alert: getAlert(),
		rules: [getRuleFromFuzzData3(fuzzData), getRuleFromFuzzData3(fuzzData), getRuleFromFuzzData3(fuzzData)]
	}];

    let fuzzingConfig: fuzzConfig[] = [];
    const res = await loadAddOn("fuzzGathering.service.ts", configuration, settings, fuzzData);
    if (res == null)
        return;
    let providResoruce: ProviderResource = {};

    if (res.data) {
        if (Array.isArray(res.data)) {
            res.data.forEach((data: any) => {
                providResoruce[res.key] = [];
                providResoruce[res.key][0] = {};
                Object.keys(data).forEach((fieldName: any) => {
                    if (providResoruce[res.key]) {
                        providResoruce[res.key][0][fieldName] = data[fieldName];
                    }
                });
            });
        }
    }
    checkRules([getRuleFromFuzzData3(fuzzData), getRuleFromFuzzData3(fuzzData), getRuleFromFuzzData3(fuzzData)], providResoruce, getAlert(), getFuzzConfigYaml(fuzzData));
}

function getFuzzConfig(fuzzData: Buffer) : fuzzConfig {
    return {
        rules: ["global"],
        name: "fuzz",
        description: fuzzData.toString(),
        prefix: fuzzData.toString(),
        ObjectNameNeed: ["fuzzData1", "fuzzData2"]
    };
}

function getFuzzConfigYaml(fuzzData: Buffer) : Object {

    // return as a json object
    return {
            "fuzz": [
                {
                    "description": "organization 4urcloud",
                    "prefix": "O365PROJECT_",
                    "rules": [
                        "global"
                    ]
                }
            ]
    };
}

function generateRandomInt(seed: Buffer, min: number, max: number): number {
    const seedSum = seed.reduce((acc, byte) => acc + byte, 0);
    const rand = (seedSum % (max - min + 1)) + min;
    return rand;
}

function generateRandomConfigList(seed: Buffer): fuzzConfig[] {
    const listSize = generateRandomInt(seed, 1, 10);
    let randomList = [];

    for (let i = 0; i < listSize; i++) {
        const itemSeed = Buffer.alloc(seed.length);
        for (let j = 0; j < seed.length; j++) {
            itemSeed[j] = seed[j] ^ i;
        }
        randomList.push(getFuzzConfig(itemSeed));
    }

    return randomList;

}

async function loadAddOn(file: string, addOnNeed: any, settings:SettingFile[], fuzzData: Buffer): Promise<{ key: string; data: Provider|null; delta: number } | null> {
    try {
        if (file.endsWith('Gathering.service.ts')){
            let nameAddOn = file.split('Gathering.service.ts')[0];
            const { collectData } = await import(`../services/addOn/${file.replace(".ts", ".js") }`);
            let start = Date.now();
            const addOnConfig = generateRandomConfigList(fuzzData);
            const data = await collectData(addOnConfig, fuzzData);
            let delta = Date.now() - start;
            return { key: nameAddOn, data:(checkIfDataIsProvider(data) ? data : null), delta};
        }
    } catch(e) {
        console.error(e);
    }
    return null;
}