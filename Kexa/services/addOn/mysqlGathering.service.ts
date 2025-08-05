/*
    * Provider : mysql
    * Thumbnail : https://www.mysql.com/common/logos/logo-mysql-170x115.png
    * Documentation : https://www.npmjs.com/package/mysql2-promise
    * Creation date : 2025-08-05
    * Note :
    * Resources :
    *       - databases
    *       - tables
    *       - users
    *       - grants
    *       - variables
    *       - status
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
    const database = await getConfigOrEnvVar(config, "MYSQL_DATABASE", config.prefix);
    const port = Number(await getConfigOrEnvVar(config, "MYSQL_PORT", config.prefix)) || 3306;

    if (!host || !user || !password) {
        throw new Error("MySQL login details (host, user, password) are required. Please check your configuration.");
    }

    logger.info("Création de la connexion à MySQL...");
    const connection = await mysql.createConnection({
        host,
        user,
        password,
        database,
        port
    });
    logger.info("Connexion à MySQL établie avec succès.");
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

            const users = await collectUsers(connection);
            const databases = await collectDatabases(connection);

            const [tables, grants, variables, status] = await Promise.all([
                collectTables(connection, databases.map(db => db.Database)),
                collectGrants(connection, users),
                collectVariables(connection),
                collectStatus(connection)
            ]);

            allResources.push({
                databases,
                tables,
                users,
                grants,
                variables,
                status,
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
    logger.info("Database collection...");
    return await executeQuery(connection, "SHOW DATABASES;");
}

async function collectTables(connection: mysql.Connection, databaseNames: string[]): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("tables")) return [];
    logger.info("Table collection...");
    const allTables: any[] = [];
    for (const dbName of databaseNames) {
        // if (['information_schema', 'mysql', 'performance_schema', 'sys'].includes(dbName)) continue;

        logger.info(`Collecting tables for database: ${dbName}`);
        await connection.changeUser({ database: dbName });
        const tables = await executeQuery(connection, "SHOW TABLES;");
        tables.forEach(table => {
            table.database = dbName;
        });
        allTables.push(...tables);
    }
    return allTables;
}

async function collectUsers(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("users")) return [];
    logger.info("User collection...");
    return await executeQuery(connection, "SELECT User, Host FROM mysql.user;");
}

async function collectGrants(connection: mysql.Connection, users: any[]): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("grants")) return [];
    logger.info("Grant collection...");
    const allGrants: any[] = [];
    for (const user of users) {
        const grants = await executeQuery(connection, `SHOW GRANTS FOR '${user.User}'@'${user.Host}';`);
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
    return await executeQuery(connection, "SHOW VARIABLES;");
}

async function collectStatus(connection: mysql.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("status")) return [];
    logger.info("Collecting server global status...");
    return await executeQuery(connection, "SHOW GLOBAL STATUS;");
}
