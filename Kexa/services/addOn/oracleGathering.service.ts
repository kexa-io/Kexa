/*
    * Provider : oracle
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Oracle_Logo.svg/1024px-Oracle_Logo.svg.png
    * Documentation : https://www.npmjs.com/package/oracledb
    * Creation date : 2025-08-11
    * Note :
    * Resources :
    *       - users
    *       - tables
    *       - privileges
    *       - sessions
    *       - parameters
    *       - views
    *       - triggers
*/

import oracledb from 'oracledb';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import type { OracleResources } from "../../models/oracle/resource.models";
import type { OracleConfig } from "../../models/oracle/config.models";

env.config();
const logger = getNewLogger("OracleLogger");

let currentConfig: OracleConfig;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function createOracleConnection(config: OracleConfig): Promise<oracledb.Connection> {
    const user = await getConfigOrEnvVar(config, "ORACLEUSER", config.prefix);
    const password = await getConfigOrEnvVar(config, "ORACLEPASSWORD", config.prefix);
    const host = await getConfigOrEnvVar(config, "ORACLEHOST", config.prefix);
    const port = Number(await getConfigOrEnvVar(config, "ORACLEPORT", config.prefix)) || 1521;
    const serviceName = await getConfigOrEnvVar(config, "ORACLESERVICENAME", config.prefix);

    if (!user || !password || !host || !serviceName) {
        throw new Error("Oracle connection information (user, password, host, serviceName) is required.");
    }

    const connectString = `${host}:${port}/${serviceName}`;
    logger.debug(`Attempting to connect to Oracle with connection string: ${connectString}`);

    const privilege = user.toUpperCase() === 'SYS' ? oracledb.SYSDBA : undefined;

    const connection = await oracledb.getConnection({
        user,
        password,
        connectString,
        privilege
    });

    logger.debug("Connected to Oracle successfully");
    return connection;
}

export async function collectData(oracleConfigs: OracleConfig[]): Promise<OracleResources[] | null> {
    const context = getContext();
    const allResources = new Array<OracleResources>();

    for (const config of oracleConfigs ?? []) {
        currentConfig = config;
        let connection: oracledb.Connection | null = null;

        try {
            context?.log(`Start collecting for Oracle configuration with prefix: ${config.prefix}`);
            logger.info(`Start collecting for Oracle configuration with prefix: ${config.prefix}`);

            connection = await createOracleConnection(config);

            const [users, tables, privileges, sessions, parameters, views, triggers] = await Promise.all([
                collectUsers(connection),
                collectTables(connection),
                collectPrivileges(connection),
                collectSessions(connection),
                collectParameters(connection),
                collectViews(connection),
                collectTriggers(connection)
            ]);

            allResources.push({
                users,
                tables,
                privileges,
                sessions,
                parameters,
                views,
                triggers
            });

        } catch (e: any) {
            logger.error("Error during Oracle data collection: " + e.message);
            context?.log("Error during Oracle data collection: " + e.message);
        } finally {
            if (connection) {
                logger.debug("Close Oracle connection.");
                await connection.close();
            }
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function executeQuery(connection: oracledb.Connection, query: string): Promise<any[]> {
    try {
        const result = await connection.execute(query);
        return result.rows as any[] || [];
    } catch (error: any) {
        logger.error(`Error during query execution "${query}": ${error.message}`);
        return [];
    }
}

async function collectUsers(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("users")) return [];
    logger.debug("Collecting users...");
    return await executeQuery(connection, "SELECT * FROM ALL_USERS ORDER BY USERNAME");
}

async function collectTables(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("tables")) return [];
    logger.debug("Collecting tables...");
    return await executeQuery(connection, `
        SELECT * FROM ALL_TABLES
    `);
}

async function collectPrivileges(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("privileges")) return [];
    logger.debug("Collecting system privileges...");
    return await executeQuery(connection, "SELECT * FROM USER_SYS_PRIVS");
}

async function collectSessions(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("sessions")) return [];
    logger.debug("Collecting active sessions...");
    return await executeQuery(connection, "SELECT * FROM v$session b, v$process a WHERE b.paddr = a.addr AND type='USER'");
}

async function collectParameters(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("parameters")) return [];
    logger.debug("Collecting system parameters...");
    return await executeQuery(connection, "SELECT * FROM V$SYSTEM_PARAMETER");
}

async function collectViews(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("views")) return [];
    logger.debug("Collecting views...");
    return await executeQuery(connection, "SELECT * FROM ALL_VIEWS");
}

async function collectTriggers(connection: oracledb.Connection): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("triggers")) return [];
    logger.debug("Collecting triggers...");
    return await executeQuery(connection, "SELECT * FROM ALL_TRIGGERS");
}