/*
    * Provider : postgresql
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/800px-Postgresql_elephant.svg.png
    * Documentation : https://www.npmjs.com/package/pg
    * Creation date : 2025-08-07
    * Resources :
    *       - databases
    *       - roles
    *       - settings
    *       - stat_activity
    *       - extensions
*/

import { Client } from 'pg';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import type { PostgresqlResources } from "../../models/postgresql/resource.models";
import type { PostgresqlConfig } from "../../models/postgresql/config.models";

env.config();
const logger = getNewLogger("PostgresLogger");

let currentConfig: PostgresqlConfig;

async function createPostgresConnection(config: PostgresqlConfig): Promise<Client> {
    const host = await getConfigOrEnvVar(config, "PG_HOST", config.prefix);
    const user = await getConfigOrEnvVar(config, "PG_USER", config.prefix);
    const password = await getConfigOrEnvVar(config, "PG_PASSWORD", config.prefix);
    const port = Number(await getConfigOrEnvVar(config, "PG_PORT", config.prefix)) || 5432;


    if (!host || !user || !password) {
        throw new Error("PostgreSQL connection information (host, user, password) is required. Please check your configuration.");
    }

    logger.debug("Attempting connection to PostgreSQL");
    const client = new Client({
        host,
        user,
        password,
        port,
    });
    await client.connect();
    logger.debug("Connected to PostgreSQL successfully");
    return client;
}

export async function collectData(PostgresqlConfigs: PostgresqlConfig[]): Promise<PostgresqlResources[] | null> {
    const context = getContext();
    const allResources = new Array<PostgresqlResources>();

    for (const config of PostgresqlConfigs ?? []) {
        currentConfig = config;
        let client: Client | null = null;

        try {
            context?.log("Starting collection for PostgreSQL configuration with prefix: " + config.prefix);
            logger.debug("Starting collection for PostgreSQL configuration with prefix: " + config.prefix);

            client = await createPostgresConnection(config);

            const dbList = await collectDatabases(client);
            const databaseNames = dbList.map(db => db.datname);

            const detailedDatabases = [];
            for (const dbName of databaseNames) {
                logger.debug(`Collecting resources for database: ${dbName}`);
                const [tables, views, functions, triggers] = await Promise.all([
                    collectTablesAndDetailsForDB(client, dbName),
                    collectViewsForDB(client, dbName),
                    collectFunctionsForDB(client, dbName),
                    collectTriggersForDB(client, dbName)
                ]);
                detailedDatabases.push({
                    name: dbName,
                    tables,
                    views,
                    functions,
                    triggers
                });
            }

            const [roles, settings, statActivity, extensions] = await Promise.all([
                collectRoles(client),
                collectSettings(client),
                collectStatActivity(client),
                collectExtensions(client)
            ]);

            allResources.push({
                databases: detailedDatabases,
                roles,
                settings,
                stat_activity: statActivity,
                extensions,
            });

        } catch (e: any) {
            logger.error("Error during PostgreSQL data collection: " + e.message);
            context?.log("Error during PostgreSQL data collection: " + e.message);
        } finally {
            if (client) {
                logger.debug("Close PostgreSQL connection.");
                await client.end();
            }
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function executeQuery(client: Client, query: string, params: any[] = []): Promise<any[]> {
    try {
        const res = await client.query(query, params);
        return res.rows;
    } catch (error: any) {
        logger.error(`Error during query execution "${query}": ${error.message}`);
        return [];
    }
}

async function collectDatabases(client: Client): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("databases")) return [];
    logger.debug("Collect list of databases...");
    return await executeQuery(client, "SELECT datname FROM pg_database WHERE datistemplate = false;");
}

async function collectTablesAndDetailsForDB(client: Client, dbName: string): Promise<any[]> {
    logger.debug(`Collect details of tables for database: ${dbName}`);
    const query = `
        SELECT table_name, table_schema
        FROM information_schema.tables;
    `;
    const tables = await executeQuery(client, query);
    const allTablesDetails = [];

    for (const table of tables) {
        const { table_name, table_schema } = table;
        const qualifiedTableName = `"${table_schema}"."${table_name}"`;

        const [columns, indexes, sizeInfo] = await Promise.all([
            executeQuery(client, `SELECT * FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2;`, [table_schema, table_name]),
            executeQuery(client, `SELECT * FROM pg_indexes WHERE schemaname = $1 AND tablename = $2;`, [table_schema, table_name]),
            executeQuery(client, `SELECT pg_size_pretty(pg_total_relation_size($1)) as total_size;`, [qualifiedTableName])
        ]);

        allTablesDetails.push({
            tableName: table_name,
            tableSchema: table_schema,
            columns: columns,
            indexes: indexes,
            sizeInfo: sizeInfo[0] || {}
        });
    }
    return allTablesDetails;
}


async function collectViewsForDB(client: Client, dbName: string): Promise<any[]> {
    logger.debug(`Collecting views for the database : ${dbName}`);
    return await executeQuery(client, `SELECT * FROM information_schema.views WHERE table_schema = $1;`, [dbName]);
}

async function collectFunctionsForDB(client: Client, dbName: string): Promise<any[]> {
    logger.debug(`Collecting functions for the database: ${dbName}`);
    const query = `
        SELECT n.nspname as schema,
               p.proname as name,
               pg_get_function_result(p.oid) as result_type,
               pg_get_function_arguments(p.oid) as arguments
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = $1;
    `;
    return await executeQuery(client, query, [dbName]);
}

async function collectTriggersForDB(client: Client, dbName: string): Promise<any[]> {
    logger.debug(`Collecting triggers for the database: ${dbName}`);
    return await executeQuery(client, `SELECT * FROM information_schema.triggers WHERE event_object_schema = $1;`, [dbName]);
}

async function collectRoles(client: Client): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("roles")) return [];
    logger.debug("Collecting roles...");
    return await executeQuery(client, "SELECT * FROM pg_roles;");
}

async function collectSettings(client: Client): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("settings")) return [];
    logger.debug("Collecting server settings...");
    return await executeQuery(client, "SELECT * FROM pg_settings;");
}

async function collectStatActivity(client: Client): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("stat_activity")) return [];
    logger.debug("Collecting server activity...");
    return await executeQuery(client, "SELECT * FROM pg_stat_activity;");
}

async function collectExtensions(client: Client): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("extensions")) return [];
    logger.debug("Collecting extensions...");
    return await executeQuery(client, "SELECT * FROM pg_extension;");
}
