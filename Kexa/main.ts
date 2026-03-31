#!/usr/bin/env bun
import env from "dotenv";
import Log, { setup, setup as setupLogger } from 'adze';
import { exit } from "process";

import { setTimeout as setTimer, clearTimeout as clearTimer } from 'node:timers';

import { VERSION } from "./version";
import { getConfig } from "./helpers/loaderConfig";
import { deleteFile, createFileSync } from "./helpers/files";
import { jsonStringify } from "./helpers/jsonStringify";
import { formatOutput } from "./helpers/formatters";

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
    .option('gather', {
        alias: 'g',
        type: 'boolean',
        description: 'Export gathered resources to JSON to ./output/resources/'
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
    .option('to', {
        type: 'string',
        choices: ['file', 'stdout', 'both'],
        default: 'both',
        description: 'Control output destination: file, stdout, or both'
    })
    .option('format', {
        alias: 'f',
        type: 'string',
        choices: ['table', 'json', 'csv', 'toml'],
        default: 'table',
        description: 'Output format for alerts: table (colorized), json, csv, or toml'
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        default: false,
        description: 'Verbose mode: show detailed scan logs (default: quiet, summary only)'
    })
    .example('$0', 'Run Kexa scan')
    .example('$0 -a', 'Run scan and export alerts as table')
    .example('$0 -a -f json', 'Run scan and export alerts as JSON')
    .example('$0 -a -f csv', 'Run scan and export alerts as CSV')
    .example('$0 -v', 'Run scan with verbose logging')
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
    } else if (!(ARGS.verbose || ARGS.v)) {
        setupLogger({
            activeLevel: 'error'
        });
    }

    const logger = getNewLogger("MainLogger");
    const isVerbose = ARGS.verbose || ARGS.v;
    if (!ARGS.silent && !ARGS.s && isVerbose) {
        AsciiArtText("Kexa");
    }
    if (isVerbose) {
        logger.info("Kexa " + VERSION);
        logger.info("Application starting...");
    } else if (!ARGS.silent && !ARGS.s) {
        process.stdout.write(`\x1b[1;37mKexa ${VERSION}\x1b[0m\n`);
    }

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
    

    const isVerbose = ARGS.verbose || ARGS.v;
    let spinner: ReturnType<typeof setInterval> | null = null;
    if (isVerbose) {
        logger.info("___________________________________________________________________________________________________");
        logger.info("___________________________________-= running Kexa " + VERSION + " scan =-_________________________________________");
        logger.info("___________________________________________________________________________________________________");
    } else {
        const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        let i = 0;
        process.stdout.write(`${frames[0]} Scanning...`);
        spinner = setInterval(() => {
            i = (i + 1) % frames.length;
            process.stdout.write(`\r${frames[i]} Scanning...`);
        }, 80);
    }
    if(scanId && parseInt(scanId) > 0) {
        logger.debug(`Starting scan n°${scanId}, clearing states...`);
    }

    if (settings.length === 0) {
        logger.error("No correct rules found, please check the rules directory or the rules files.");
        return [];
    }

    const allScanResults: ResultScan[][] = [];
    const resources = await loadAddOns();
    if (ARGS.gather || ARGS.g) {
        const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '');
        const filePath = `${FOLDER_OUTPUT}/resources/${timestamp}-resources.json`;
        const resourcesJson = JSON.stringify(resources, null, 2);
        const to = ARGS.to || 'both';

        if (to === 'file' || to === 'both') {
            createFileSync(resourcesJson, filePath, true);
            logger.info(`Exported resources to ${filePath}`);
        }

        if (to === 'stdout' || to === 'both') {
            console.log(resourcesJson);
        }
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
    if (spinner) {
        clearInterval(spinner);
        process.stdout.write(`\r\x1b[K`); // clear spinner line
    }
    if (isVerbose) {
        logger.info("___________________________________________________________________________________________________");
        logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
        logger.info("_".repeat(99-15-delta.toString().length)+"Scan done in "+delta+"ms");
    } else {
        process.stdout.write(`✓ Scan done in ${delta}ms\n`);
    }
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

        if (!ARGS.verbose && !ARGS.v) {
            // Quiet mode: skip detailed rule-by-rule log output, use formatted output instead
        } else {
            await alertGlobal(allScanResults, setting.alert.global);
        }

        if (ARGS.alerts || ARGS.a) {
            const logger = getNewLogger("AlertExportCheck");
            logger.info(`Alert export flag detected. Exporting ${allScanResults.flat().length} scan results.`);
            exportAlerts(allScanResults, setting.alert.global.name);
        }
    }

    return hasCriticalError;
}

function exportAlerts(allScanResults: ResultScan[][], rulesetName?: string): void {
    const logger = getNewLogger("AlertsExportLogger");
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '');
    const format = (ARGS.format as string) || 'table';
    const to = ARGS.to || 'both';

    const formatted = formatOutput(allScanResults, format, rulesetName);

    const extMap: Record<string, string> = { table: 'txt', json: 'json', csv: 'csv', toml: 'toml' };
    const ext = extMap[format] || 'txt';
    const filePath = `${FOLDER_OUTPUT}/alerts/${timestamp}-alerts.${ext}`;

    if (to === 'file' || to === 'both') {
        createFileSync(formatted, filePath, true);
        logger.info(`Exported alerts to ${filePath}`);
    }

    if (to === 'stdout' || to === 'both') {
        console.log(formatted);
    }
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
                try {
                    settings.forEach(setting => {
                        alertFromGlobal(setting.alert.global, [], [[timeoutResult]]);
                    });
                } catch (alertError) {
                    logger.error("Failed to send timeout alert:", alertError);
                }
                exit(-1);
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
            exit(-1);
        }

        await runScanLoop(generalConfig, settings, logger);

        deleteFile("./config/addOnNeed.json");
        deleteFile("./config/headers.json");
        exit(0);

    } catch (error) {
        const fatalLogger = getNewLogger("FatalError");
        fatalLogger.error("A fatal error occurred:", error);
        exit(-1);
    }
}

(async () => {
    if (process.env.INIT_PREMIUM_MODE === 'true') {
        const configuration = await getConfig(true);
        if (!configuration.save || !Array.isArray(configuration.save)) {
            const initLogger = getNewLogger("InitPremiumMode");
            initLogger.error("Configuration does not contain a valid 'save' array.");
            exit(-1);
        }
        const kexaSaveConfig = configuration.save.find((item: any) => item.type === "kexa");
        if (!kexaSaveConfig) {
            const initLogger = getNewLogger("InitPremiumMode");
            initLogger.error("Kexa save configuration not found.");
        }
        await initOnly(kexaSaveConfig);
    } else {
        await start();
    }
})();