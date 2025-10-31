#!/usr/bin/env bun
import env from "dotenv";
import Log, { setup, setup as setupLogger } from 'adze';
import { exit } from "process";

import { setTimeout as setTimer, clearTimeout as clearTimer } from 'node:timers';

import { VERSION } from "./version";
import { getConfig } from "./helpers/loaderConfig";
import { deleteFile, createFileSync } from "./helpers/files";
import { jsonStringify } from "./helpers/jsonStringify";

import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal, alertFromGlobal } from "./services/alerte.service";
import { AsciiArtText, renderTableAllScan, renderTableAllScanLoud, initAddOnPropertyToSend } from "./services/display.service";
import { getEnvVar } from "./services/manageVarEnvironnement.service";
import { loadAddOns } from "./services/addOn.service";
import { getContext, getNewLogger } from "./services/logger.service";
import { saveResult } from "./services/save.service";
import { exportationData } from "./services/exportation.service";
import { Memoisation } from "./services/memoisation.service";
import { initOnly } from "./services/addOn/save/kexaSave.service";

import type { SettingFile } from "./models/settingFile/settingFile.models";
import type { ResultScan, SubResultScan } from "./models/resultScan.models";

import { Emails } from "./emails/emails";
import { ConditionEnum } from "./enum/condition.enum";

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const DEFAULT_RULES_DIRECTORY = "https://github.com/kexa-io/public-rules";
const DEFAULT_TIMEOUT_MINUTES = 15;
const DEFAULT_MAX_RETRY = 3;
const FOLDER_OUTPUT = process.env.OUTPUT ?? "./output";
const ARGS = yargs(hideBin(process.argv))
    .option('output', {
        alias: 'o',
        type: 'boolean',
        description: 'Export resources to JSON to ./output/resources/'
    })
    .option('alerts', {
        alias: 'a',
        type: 'boolean',
        description: 'Export alerts to JSON to ./output/alerts/'
    })
    .option('silent', {
        alias: 's',
        type: 'boolean',
        description: 'Silent mode: suppress all logs, only show JSON output'
    })
    .example('$0', 'Run Kexa scan')
    .example('$0 -o', 'Run scan and export resources')
    .example('$0 -a', 'Run scan and export alerts')
    .example('$0 -o -a', 'Run scan and export both resources and alerts')
    .example('$0 -o -s', 'Export resources with no logs (clean JSON output)')
    .help()
    .argv;


async function initializeApplication(): Promise<{ logger: Log<string, unknown>, settings: SettingFile[] }> {
    const context = getContext();
    context?.log("Initializing application...");

    if (ARGS.silent || ARGS.s) {
        const store = setupLogger({
            activeLevel: 'alert', // Set to highest level to suppress most logs
            silent: true
        } as any);

        // Add listener to capture error logs and output as JSON to stderr
        store?.addListener('error', (log: any) => {
            const errorData = {
                level: log._data?.levelName || 'error',
                message: log._data?.args?.[0] || '',
                timestamp: log._data?.timestamp || new Date().toISOString(),
                namespace: log._data?.namespace || []
            };
            process.stderr.write(JSON.stringify(errorData) + '\n');
        });

        console.error = (...args: any[]) => {
            process.stderr.write(JSON.stringify({ error: args.join(' '), timestamp: new Date().toISOString() }) + '\n');
        };
    } else if (process.env.DEV === "true") {
        setupLogger({
            activeLevel: 'debug'
        });
    }

    const logger = getNewLogger("MainLogger");
    if (!ARGS.silent && !ARGS.s) {
        AsciiArtText("Kexa");
    }
    logger.info("Kexa " + VERSION);
    logger.info("Application starting...");

    await initAddOnPropertyToSend();
    await Memoisation.initAddOnPropertyToSend();

    const rulesDirectory = await getEnvVar("RULESDIRECTORY") ?? DEFAULT_RULES_DIRECTORY;
    const settings = await gatheringRules(rulesDirectory);

    logger.info(`Found ${settings.length} settings files.`);
    return { logger, settings };
}

export async function performScan(settings: SettingFile[], scanId: string): Promise<ResultScan[][]> {
    const logger = getNewLogger(`ScanLogger_${scanId}`);
    const start = new Date();
    

    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running Kexa " + VERSION + " scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    if(scanId && parseInt(scanId) > 0) {
        logger.debug(`Starting scan n°${scanId}, clearing states...`);
    }

    if (settings.length === 0) {
        logger.error("No correct rules found, please check the rules directory or the rules files.");
        return [];
    }

    const allScanResults: ResultScan[][] = [];
    const resources = await loadAddOns();
    if (ARGS.output || ARGS.o) {
        const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '');
        const filePath = `${FOLDER_OUTPUT}/resources/${timestamp}-resources.json`;
        const resourcesJson = JSON.stringify(resources, null, 2);
        createFileSync(resourcesJson, filePath, true);
        console.log(resourcesJson);
        logger.info(`Exported resources to ${filePath}`);
    }
    await exportationData(resources);

    const scanPromises = settings.map(setting => {
        const results = checkRules(setting.rules, resources, setting.alert);
        const clonedResults = JSON.parse(jsonStringify(results));

        const resultsToCache = results.map(scan =>
            scan.filter(rule => Memoisation.needToBeCache(rule.rule, rule.objectContent, scanId, start))
        );
        resultsToCache.forEach(scan => {
            if (scan.length > 0) allScanResults.push(scan);
        });

        return saveResult(clonedResults);
    });

    await Promise.all(scanPromises);

    const delta = Date.now() - start.getTime();
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
    logger.info("_".repeat(99-15-delta.toString().length)+"Scan done in "+delta+"ms");
    logger.debug(await getEnvVar("test"));
    return allScanResults;
}

export async function processGlobalAlerts(settings: SettingFile[], allScanResults: ResultScan[][]): Promise<boolean> {
    let hasCriticalError = false;

    for (const setting of settings) {
        if (!setting.alert.global.enabled) continue;

        const resultsWithErrors = allScanResults.map(scan => scan.filter(value => value.error.length > 0));
        const loudResults = allScanResults.map(scan => scan.filter(value => value.loud));

        const errorCounts = [0, 0, 0, 0];
        allScanResults.flat().forEach(scan => {
            if (scan.error.length > 0) {
                const level = scan.rule?.level ?? 3;
                errorCounts[level]++;
                if (level >= 2) {
                    hasCriticalError = true;
                }
            }
        });

        const tableRender = renderTableAllScan(resultsWithErrors);
        const loudTableRender = renderTableAllScanLoud(loudResults);

        const emailContent = Emails.Recap(errorCounts, tableRender, loudTableRender, setting.alert.global);
        const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '');
        const filePath = `${FOLDER_OUTPUT}/scans/${setting.alert.global.name}/${timestamp}.html`;
        createFileSync(emailContent, filePath);

        await alertGlobal(allScanResults, setting.alert.global);
    }

    if (ARGS.alerts || ARGS.a) {
        const logger = getNewLogger("AlertExportCheck");
        logger.info(`Alert export flag detected. Exporting ${allScanResults.flat().length} scan results.`);
        exportAlertsToJson(allScanResults);
    }

    return hasCriticalError;
}

function exportAlertsToJson(allScanResults: ResultScan[][]): void {
    const logger = getNewLogger("AlertsExportLogger");
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '');

    const resultsWithErrors = allScanResults.flat().filter(value => value.error.length > 0);

    const rulesMap = new Map<string, any>();

    resultsWithErrors.forEach(resultScan => {
        const ruleName = resultScan.rule?.name ?? 'unknown';

        if (!rulesMap.has(ruleName)) {
            rulesMap.set(ruleName, {
                name: resultScan.rule?.name,
                description: resultScan.rule?.description,
                level: resultScan.rule?.level,
                cloudProvider: resultScan.rule?.cloudProvider,
                objectName: resultScan.rule?.objectName,
                resources: []
            });
        }

        rulesMap.get(ruleName).resources.push(resultScan.objectContent);
    });

    const alertsJson = {
        timestamp: new Date().toISOString(),
        rules: Array.from(rulesMap.values())
    };

    const filePath = `${FOLDER_OUTPUT}/alerts/${timestamp}-alerts.json`;
    const alertsJsonString = JSON.stringify(alertsJson, null, 2);
    createFileSync(alertsJsonString, filePath, true);
    console.log(alertsJsonString);
    logger.info(`Exported alerts to ${filePath}`);
}

async function handleScanIteration(settings: SettingFile[], scanId: number, logger: Log<string, unknown>): Promise<{ hasCriticalError: boolean, settings: SettingFile[] }> {
    logger.info(`Starting scan iteration ${scanId}`);
    let currentSettings = settings;

    try {
        logger.debug(`Reloading settings for scan iteration ${scanId}`);
        const rulesDirectory = await getEnvVar("RULESDIRECTORY") ?? DEFAULT_RULES_DIRECTORY;
        currentSettings = await gatheringRules(rulesDirectory);
        logger.debug(`Settings reloaded, found ${currentSettings.length} setting files.`);
    } catch (e) {
        logger.error("Failed to reload settings:", e);
        if (scanId === 0) throw e;
        logger.warn("Using previous settings for this iteration.");
    }

    const allScanResults = await performScan(currentSettings, scanId.toString());
    logger.debug(`Processing global alerts for scan ${scanId}, found ${allScanResults.length} scan results.`);
    const hasCriticalError = await processGlobalAlerts(currentSettings, allScanResults);

    return { hasCriticalError, settings: currentSettings };
}

function createTimeoutResult(timeoutMillis: number, config: any | null): ResultScan {
    const timeoutError: SubResultScan = {
        value: "Enabled",
        condition: [{
            property: 'KexaExecutionTime',
            condition: ConditionEnum.INF,
            value: timeoutMillis
        }],
        result: false
    };

    const objectContentCustom = `${timeoutMillis / 1000} seconds custom timeout`;
    const objectContentDefault = `${DEFAULT_TIMEOUT_MINUTES} minutes default timeout`;

    return {
        error: [timeoutError],
        rule: {
            level: 3,
            name: "Timeout",
            applied: true,
            cloudProvider: "Kexa",
            description: "Scan duration exceeded the configured timeout.",
            objectName: "Timer",
            conditions: []
        },
        objectContent: {
            id: (config?.timeout != null ? objectContentCustom : objectContentDefault)
        }
    };
}


async function runScanLoop(config: any | null, initialSettings: SettingFile[], logger: Log<string, unknown>) {
    let scanId = 0;
    let settings = initialSettings;
    let retryLeft = config?.maxRetry ?? DEFAULT_MAX_RETRY;
    const checkIntervalSeconds = config?.checkInterval ?? 0;

    while (true) {
        const startTimeStamp = Date.now();
        let timeoutId: NodeJS.Timeout | null = null;

        const scanPromise = handleScanIteration(settings, scanId, logger);

        const timeoutMillis = (config?.timeout ?? DEFAULT_TIMEOUT_MINUTES) * 60 * 1000;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimer(() => {
                logger.error(`Timeout of ${timeoutMillis / 1000}s reached.`);
                reject(new Error("Timeout"));
            }, timeoutMillis);
        });

        try {
            const { hasCriticalError, settings: newSettings } = await Promise.race([scanPromise, timeoutPromise]) as { hasCriticalError: boolean, settings: SettingFile[] };
            settings = newSettings;
            if (timeoutId) clearTimer(timeoutId);
            retryLeft = config?.maxRetry ?? DEFAULT_MAX_RETRY;

            if (hasCriticalError && !checkIntervalSeconds) {
                logger.error("Critical error found. Exiting.");
                exit(1);
            }

        } catch (error) {
            if (timeoutId) clearTimer(timeoutId);
            if (retryLeft > 0) {
                retryLeft--;
                logger.warn(`Scan failed. Retrying... (${retryLeft} attempts left)`);
                continue;
            } else {
                logger.error("Scan failed after multiple retries. Reporting timeout and exiting.");
                const timeoutResult = createTimeoutResult(timeoutMillis, config);
                settings.forEach(setting => {
                    alertFromGlobal(setting.alert.global, [], [[timeoutResult]]);
                });
                exit(1);
            }
        }

        if (checkIntervalSeconds > 0) {
            const elapsedTimeSeconds = (Date.now() - startTimeStamp) / 1000;
            const waitTime = Math.max((checkIntervalSeconds - elapsedTimeSeconds) * 1000, 0);
            logger.info(`Waiting ${waitTime / 1000} seconds for the next scan.`);
            await new Promise(r => setTimeout(r, waitTime));
        } else {
            logger.info("Single run complete. Exiting.");
            break;
        }
        scanId++;
    }
}

async function start() {
    try {
        env.config();
        const configuration = await getConfig();
        const generalConfig = configuration.general ?? null;

        const { logger, settings } = await initializeApplication();

        if (settings.length === 0) {
            logger.error("No settings files found, cannot proceed. Exiting.");
            exit(1);
        }

        await runScanLoop(generalConfig, settings, logger);

        deleteFile("./config/addOnNeed.json");
        deleteFile("./config/headers.json");
        exit(0);

    } catch (error) {
        console.error("A fatal error occurred:", error);
        exit(1);
    }
}

(async () => {
    if (process.env.INIT_PREMIUM_MODE === 'true') {
        const configuration = await getConfig(true);
        if (!configuration.save || !Array.isArray(configuration.save)) {
            console.error("Configuration does not contain a valid 'save' array.");
            exit(-1);
        }
        const kexaSaveConfig = configuration.save.find((item: any) => item.type === "kexa");
        if (!kexaSaveConfig) {
            console.error("Kexa save configuration not found.");
        }
        await initOnly(kexaSaveConfig);
    } else {
        await start();
    }
})();