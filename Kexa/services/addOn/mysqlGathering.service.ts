/*
    * Provider : mysql
    * Thumbnail : https://www.mysql.com/common/logos/logo-mysql-170x115.png
    * Documentation : https://www.npmjs.com/package/mysql2-promise
    * Creation date : 2025-08-05
    * Note :
    * Resources :
    *       - databases
    *       - users
    *       - grants
    *       - variables
    *       - status
    *       - engines
    *       - processlist
*/

import mysql from 'mysql2/promise';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import type { MySqlResources } from "../../models/mysql/resource.models";
import type { MySqlConfig } from "../../models/mysql/config.models";

env.config();
const logger = getNewLogger("MySqlLogger");

let currentConfig: MySqlConfig;

async function createMySqlConnection(config: MySqlConfig): Promise<mysql.Connection> {
    const host = await getConfigOrEnvVar(config, "MYSQL_HOST", config.prefix);
    const user = await getConfigOrEnvVar(config, "MYSQL_USER", config.prefix);
    const password = await getConfigOrEnvVar(config, "MYSQL_PASSWORD", config.prefix);
    const port = Number(await getConfigOrEnvVar(config, "MYSQL_PORT", config.prefix)) || 3306;

    if (!host || !user || !password) {
        throw new Error("MySQL login details (host, user, password) are required. Please check your configuration.");
    }

    logger.debug("Attempting to connect to MySQL");
    const connection = await mysql.createConnection({
        host,
        user,
        password,
        port,
    });
    logger.debug("Connected to MySQL successfully");
    return connection;
}

export async function collectData(mysqlConfigs: MySqlConfig[]): Promise<MySqlResources[] | null> {
    const context = getContext();
    const allResources = new Array<MySqlResources>();

    for (const config of mysqlConfigs ?? []) {
        currentConfig = config;
        let connection: mysql.Connection | null = null;

        try {
            context?.log("Start collection for MySQL configuration with prefix :" + config.prefix);
            logger.info("Start collection for MySQL configuration with prefix :" + config.prefix);

            connection = await createMySqlConnection(config);

            const dbList = await collectDatabases(connection);
            const databaseNames = dbList.map(db => db.Database);

            const detailedDatabases = [];
            for (const dbName of databaseNames) {
                logger.info(`Collecting resources for database: ${dbName}`);
                const [tables, views, routines, triggers] = await Promise.all([
                    collectTablesAndDetailsForDB(connection, dbName),
                    collectViewsForDB(connection, dbName),
                    collectRoutinesForDB(connection, dbName),
                    collectTriggersForDB(connection, dbName)
                ]);
                detailedDatabases.push({
                    name: dbName,
                    tables,
                    views,
                    routines,
                    triggers
                });
            }

            const [users, grants, variables, status, engines, processlist] = await Promise.all([
                collectUsers(connection),
                collectGrants(connection),
                collectVariables(connection),
                collectStatus(connection),
                collectEngines(connection),
                collectProcessList(connection)
            ]);

            allResources.push({
                databases: detailedDatabases,
                users,
                grants,
                variables,
                status,
                engines,
                processlist,
            });

        } catch (e: any) {
            logger.error("Error during MySQL data collection: " + e.message);
            context?.log("Error during MySQL data collection: " + e.message);
        } finally {
            if (connection) {
                logger.info("Closing MySQL connection.");
                await connection.end();
            }
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function executeQuery(connection: mysql.Connection, query: string): Promise<any[]> {
    try {
        const [rows] = await connection.execute(query);
        return rows as any[];
    } catch (error: any) {
        logger.error(`Error during query execution "${query}": ${error.message}`);
        return [];
    }
}

async function collectDatabases(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("databases")) return [];
    logger.info("Collecting database list...");
    return await executeQuery(connection, "SHOW DATABASES;");
}

async function collectTablesAndDetailsForDB(connection: mysql.Connection, dbName: string): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("tables")) return [];
    logger.debug(`Collecting table details for database: ${dbName}`);
    const allTablesDetails: any[] = [];

    await connection.changeUser({ database: dbName });
    const tables = await executeQuery(connection, "SHOW FULL TABLES;");
    const tableNames = tables.map(t => t[`Tables_in_${dbName}`]);

    for (const tableName of tableNames) {
        const [createResult, columns, indexes, sizeInfo] = await Promise.all([
            executeQuery(connection, `SHOW CREATE TABLE \`${tableName}\`;`),
            executeQuery(connection, `SHOW FULL COLUMNS FROM \`${tableName}\`;`),
            executeQuery(connection, `SHOW INDEX FROM \`${tableName}\`;`),
            executeQuery(connection, `SELECT * FROM information_schema.tables WHERE table_schema = '${dbName}' AND table_name = '${tableName}';`)
        ]);

        allTablesDetails.push({
            tableName: tableName,
            columns: columns,
            indexes: indexes,
            sizeInfo: sizeInfo[0] || {},
            createStatement: createResult[0] ? createResult[0]['Create Table'] : ''
        });
    }
    return allTablesDetails;
}

async function collectViewsForDB(connection: mysql.Connection, dbName: string): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("views")) return [];
    logger.debug(`Collecting views for database: ${dbName}`);
    return await executeQuery(connection, `SELECT * FROM information_schema.views WHERE table_schema = '${dbName}';`);
}

async function collectRoutinesForDB(connection: mysql.Connection, dbName: string): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("routines")) return [];
    logger.debug(`Collecting routines for database: ${dbName}`);
    return await executeQuery(connection, `SHOW PROCEDURE STATUS WHERE db = '${dbName}';`);
}

async function collectTriggersForDB(connection: mysql.Connection, dbName: string): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("triggers")) return [];
    logger.debug(`Collecting triggers for database: ${dbName}`);
    return await executeQuery(connection, `select * from information_schema.triggers where information_schema.triggers.trigger_schema like '%${dbName}%';`);
}

async function collectUsers(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("users")) return [];
    logger.info("Collecting users...");
    return await executeQuery(connection, "SELECT User, Host FROM mysql.user;");
}

async function collectGrants(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("grants")) return [];
    logger.info("Collecting grants for users...");
    const users = await collectUsers(connection);
    const allGrants: any[] = [];
    for (const user of users) {
        const grants = await executeQuery(connection, `SHOW GRANTS FOR \`${user.User}\`@\`${user.Host}\`;`);
        grants.forEach(grant => {
            grant.user = user.User;
            grant.host = user.Host;
        });
        allGrants.push(...grants);
    }
    return allGrants;
}

async function collectVariables(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("variables")) return [];
    logger.info("Collecting server variables...");
    return await executeQuery(connection, "SHOW GLOBAL VARIABLES;");
}

async function collectStatus(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("status")) return [];
    logger.info("Collecting server global status...");
    return await executeQuery(connection, "SHOW GLOBAL STATUS;");
}

async function collectEngines(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("engines")) return [];
    logger.info("Collecting storage engines...");
    return await executeQuery(connection, "SHOW ENGINES;");
}

async function collectProcessList(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("processlist")) return [];
    logger.info("Collecting process list...");
    return await executeQuery(connection, "SHOW FULL PROCESSLIST;");
}
