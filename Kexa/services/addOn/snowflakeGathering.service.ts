/*
    * Provider : snowflake
    * Thumbnail : https://ometis.co.uk/hs-fs/hubfs/Snowflake%202.png?width=3840&height=2160&name=Snowflake%202.png
    * Documentation : https://github.com/snowflakedb/snowflake-connector-nodejs
    * Creation date : 2025-06-2
    * Note : 
    * Resources :
    *     - account
    *     - catalog-integration
    *     - compute-pool
    *     - database
    *     - database-role
    *     - dynamic-table
    *     - event-table
    *     - external-volume
    *     - function
    *     - image-repository
    *     - managed-account
    *     - network-policy
    *     - notebook
    *     - notification-integration
    *     - pipe
    *     - procedure
    *     - role
    *     - schema
    *     - service
    *     - stage
    *     - stream
    *     - table
    *     - task
    *     - user-defined-function
    *     - view
    *     - warehouse
*/

import { getConfig } from "../../helpers/loaderConfig";
import type { SnowflakeResources } from "../../models/snowflake/snowflake.models";
import { createSnowflakeResourcesDefault } from "../../models/snowflake/snowflake.models";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import type { SnowflakeConfig } from "../../models/snowflake/config.models";
import * as yaml from 'js-yaml';

import {getNewLogger} from "../logger.service";
const logger = getNewLogger("SnowflakeLogger");

import * as snowflake from "snowflake-sdk";
let currentConfig:SnowflakeConfig;

let globalConfiguration: any;
async function init() {
    logger.info("Initializing Snowflake configuration");
    try {
        const configHere = await getConfig();
        globalConfiguration = configHere.global ?? {};
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();

export async function collectData(snowflakeConfig:SnowflakeConfig[]): Promise<SnowflakeResources[]|null>{
    let resources = new Array<SnowflakeResources>();
    for(let config of snowflakeConfig??[]){
        currentConfig = config;
        let prefix = config.prefix??(snowflakeConfig.indexOf(config).toString());

        try {
            // get config to connect to snowflake
            let snowflakeConfigParams = await getConfigOrEnvVar(config, "xxxxxx", prefix);
            const promises = [
                snowflakeListing(snowflakeConfigParams),
            ];

            const [snowflakeList] = await Promise.all(promises);
            let snowflakeResource = {
                "account": snowflakeList["account"],
                "catalog-integration": snowflakeList["catalog-integration"],
                "compute-pool": snowflakeList["compute-pool"],
                "database": snowflakeList["database"],
                "database-role": snowflakeList["database-role"],
                "dynamic-table": snowflakeList["dynamic-table"],
                "event-table": snowflakeList["event-table"],
                "external-volume": snowflakeList["external-volume"],
                "function": snowflakeList["function"],
                "image-repository": snowflakeList["image-repository"],
                "managed-account": snowflakeList["managed-account"],
                "network-policy": snowflakeList["network-policy"],
                "notebook": snowflakeList["notebook"],
                "notification-integration": snowflakeList["notification-integration"],
                "pipe": snowflakeList["pipe"],
                "procedure": snowflakeList["procedure"],
                "role": snowflakeList["role"],
                "schema": snowflakeList["schema"],
                "service": snowflakeList["service"],
                "stage": snowflakeList["stage"],
                "stream": snowflakeList["stream"],
                "table": snowflakeList["table"],
                "task": snowflakeList["task"],
                "user-defined-function": snowflakeList["user-defined-function"],
                "view": snowflakeList["view"],
                "warehouse": snowflakeList["warehouse"]
            } as SnowflakeResources;
            resources.push(snowflakeResource);
        }catch(e:any){
            logger.error(e);
        }
        deleteFile("./config/snowflake.json");
    }
    return resources??null;
}

//snowflake list
export async function snowflakeListing(isSnowflakeConf: boolean): Promise<any> {
    logger.info("starting snowflakeListing");
    // connecting to snowflake
    const slk = new snowflake.configure()
    slk.loadFromDefault();
    //
    const metricsClient = new snowflake.
}