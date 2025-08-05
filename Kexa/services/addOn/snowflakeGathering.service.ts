/*
    * Provider : snowflake
    * Thumbnail : https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-snowflake/chapter_banners/User%20Groups%20Filler%20Icon_8kXP903.png
    * Documentation : https://docs.snowflake.com/en/developer-guide/node-js/nodejs-driver
    * Creation date : 2025-08-04
    * Resources :
    * - warehouses
    * - databases
    * - schemas
    * - tables
    * - queryHistory
*/

import snowflake from 'snowflake-sdk';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getNewLogger } from "../logger.service";
import { SnowflakeConfig } from "../../models/snowflake/config.models";
import { SnowflakeResources } from "../../models/snowflake/resource.models";

env.config();

const logger = getNewLogger("SnowflakeLogger");

export async function collectData(snowflakeConfigs: SnowflakeConfig[]): Promise<SnowflakeResources[] | null> {
    const allResources = new Array<SnowflakeResources>();

    for (const config of snowflakeConfigs ?? []) {
        currentConfig = config;
        const account = await getConfigOrEnvVar(config, "SNOWFLAKE_ACCOUNT", config.prefix);
        logger.info(`Starting data collection for Snowflake account: ${account}`);
        let resources: SnowflakeResources = {
            warehouses: [],
            queryHistory: [],
            databases: [],
            schemas: [],
            tables: []
        };

        try {
            // Establish the connection
            const connection = await createSnowflakeConnection(config);
            logger.info(`Successfully connected to Snowflake account: ${account}`);

            const primaryData = await collectPrimaryData(connection, config);
            resources.warehouses = primaryData.warehouses;
            resources.queryHistory = primaryData.queryHistory;
            resources.databases = primaryData.databases;

            if ((resources.databases ?? []).length > 0) {
                const secondaryData = await collectSecondaryData(connection, config, resources.databases ?? []);
                resources.schemas = secondaryData.schemas;
                resources.tables = secondaryData.tables;
            }

            allResources.push(resources);
            logger.info(`Finished data snowflake collection for account: ${account}`);

            await new Promise<void>((resolve, reject) => {
                connection.destroy((err) => {
                    if (err) {
                        logger.error(`Failed to close connection: ${err.message}`);
                        reject(new Error(`Failed to close connection: ${err.message}`));
                    } else {
                        logger.info(`Connection closed for snowflake account: ${account}`);
                        resolve();
                    }
                });
            });

        } catch (e: any) {
            throw e;
            logger.error(`An error occurred while processing snowflake account: ${account}: ${e.message}`);
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function collectPrimaryData(connection: snowflake.Connection, config: SnowflakeConfig): Promise<Pick<SnowflakeResources, 'warehouses' | 'queryHistory' | 'databases'>> {
    const promises: Promise<any>[] = [];
    const results: Pick<SnowflakeResources, 'warehouses' | 'queryHistory' | 'databases'> = { warehouses: [], queryHistory: [], databases: [] };

    promises.push(collectWarehouseData(connection, config).then(data => results.warehouses = data));
    promises.push(queryHistoryData(connection, config).then(data => results.queryHistory = data));
    promises.push(collectDatabaseData(connection, config).then(data => results.databases = data));
    await Promise.all(promises);
    return results;
}

async function collectWarehouseData(connection: snowflake.Connection, config: SnowflakeConfig): Promise<any[]> {
    //if (!config.objectNameNeed?.includes("warehouses")) return [];
    logger.debug("Collecting warehouses...");
    return await executeQuery(connection, "SHOW WAREHOUSES;");
}

async function collectDatabaseData(connection: snowflake.Connection, config: SnowflakeConfig): Promise<any[]> {
    //if (!config.objectNameNeed?.includes("databases")) return [];
    logger.debug("Collecting databases...");
    return await executeQuery(connection, "SHOW DATABASES;");
}

async function queryHistoryData(connection: snowflake.Connection, config: SnowflakeConfig): Promise<any[]> {
    //if (!config.objectNameNeed?.includes("queryHistory")) return [];
    logger.debug("Collecting query history (last 7 days)...");
    return await executeQuery(connection, `
        SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
        WHERE START_TIME >= DATEADD(day, -7, CURRENT_TIMESTAMP())
        ORDER BY START_TIME DESC;
    `);
}

async function collectSecondaryData(connection: snowflake.Connection, config: SnowflakeConfig, databases: any[]): Promise<Pick<SnowflakeResources, 'schemas' | 'tables'>> {
    const promises = databases.map(db => processDatabase(connection, config, db.name));
    const resultsFromAllDbs = await Promise.all(promises);

    const allSchemas = resultsFromAllDbs.flatMap(res => res.schemas);
    const allTables = resultsFromAllDbs.flatMap(res => res.tables);

    return { schemas: allSchemas, tables: allTables };
}

async function processDatabase(connection: snowflake.Connection, config: SnowflakeConfig, dbName: string): Promise<{ schemas: any[], tables: any[] }> {
    const collectedSchemas: any[] = [];
    const collectedTables: any[] = [];

    logger.debug(`Collecting schemas for database: ${dbName}`);
    const schemasInDb = await executeQuery(connection, `SHOW SCHEMAS IN DATABASE "${dbName}";`);
    schemasInDb.forEach(s => s.database_name = dbName);

    if (config.objectNameNeed?.includes("schemas") || true) {
        collectedSchemas.push(...schemasInDb);
    }

    if (config.objectNameNeed?.includes("tables") || true) {
        const tablePromises = schemasInDb.map(schema => 
            collectTablesForSchema(connection, dbName, schema.name)
        );
        const tablesFromAllSchemas = await Promise.all(tablePromises);
        collectedTables.push(...tablesFromAllSchemas.flat());
    }

    return { schemas: collectedSchemas, tables: collectedTables };
}

async function collectTablesForSchema(connection: snowflake.Connection, dbName: string, schemaName: string): Promise<any[]> {
    logger.debug(`Collecting tables for schema: ${dbName}.${schemaName}`);
    const tables = await executeQuery(connection, `SHOW TABLES IN SCHEMA "${dbName}"."${schemaName}";`);

    tables.forEach(t => {
        t.database_name = dbName;
        t.schema_name = schemaName;
    });
    return tables;
}

async function createSnowflakeConnection(config: SnowflakeConfig): Promise<snowflake.Connection> {
    const account = await getConfigOrEnvVar(config, "SNOWFLAKE_ACCOUNT", config.prefix);
    const username = await getConfigOrEnvVar(config, "SNOWFLAKE_USERNAME", config.prefix);
    const password = await getConfigOrEnvVar(config, "SNOWFLAKE_PASSWORD", config.prefix);
    logger.debug(`Creating connection to Snowflake account: ${account}`);
    const connectionPool = snowflake.createPool({
        account: account,
        username: username,
        password: password,
    },
    {
        max: 10,
        min: 1,
        idleTimeoutMillis: 10000,
    });
    logger.debug(`Connection pool created for Snowflake account: ${account}`);
    return connectionPool;
}

async function executeQuery(connection: snowflake.Connection, query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        connection.execute({
            sqlText: query,
            complete: (err, stmt, rows) => {
                if (err) {
                    logger.error(`Error executing query: ${err.message}`);
                    reject(err);
                } else {
                    resolve(rows ?? []);
                }
            }
        });
    });
}