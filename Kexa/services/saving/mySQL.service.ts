import { createPool, PoolOptions, PoolConnection } from 'mysql2/promise';
import { ProviderResource } from '../../models/providerResource.models';

function getConnection(host:string, user:string, password:string, database: string): Promise<PoolConnection> {
    const dbConfig: PoolOptions = {
        host,
        user,
        password,
        database,
    };
    const dbPool = createPool(dbConfig);
    return dbPool.getConnection();
}

async function createTable(tableName: string, connection:PoolConnection): Promise<void> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                datetime TIMESTAMP,
                origine VARCHAR(255),
                tags BLOB,
                objectType VARCHAR(255),
                object BLOB
            )
        `);
    } finally {
        connection.release();
    }
}

async function createTablesFromObject(dataObject: ProviderResource, connection:PoolConnection): Promise<void> {
    const tableNames = Object.keys(dataObject);
    for (const tableName of tableNames) {
        await createTable(tableName, connection);
    }
}

async function createProviderTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Providers (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createProviderItemTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ProviderItems (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                providerId INT,
                FOREIGN KEY (providerId) REFERENCES Providers(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createOriginTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Origins (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                description TEXT
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createTagTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Tags (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                value TEXT
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createResourceTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Resources (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                mainProperty TEXT,
                content BLOB,
                timestamp TIMESTAMP,
                originId INT,
                providerItemId INT,
                FOREIGN KEY (originId) REFERENCES Origins(ID),
                FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createTagItemTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS TagItems (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                tagId INT,
                resourceId INT,
                FOREIGN KEY (tagId) REFERENCES Tags(ID),
                FOREIGN KEY (resourceId) REFERENCES Resources(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createRulesTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Rules (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                description TEXT,
                applied BOOLEAN,
                loud BOOLEAN,
                level INT,
                providerId INT,
                providerItemId INT,
                FOREIGN KEY (providerId) REFERENCES Providers(ID),
                FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createScanTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Scans (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                timestamp TIMESTAMP,
                error boolean,
                resourceId INT,
                ruleId INT,
                detail BLOB,
                originId INT,
                FOREIGN KEY (originId) REFERENCES Origins(ID),
                FOREIGN KEY (resourceId) REFERENCES Resources(ID),
                FOREIGN KEY (ruleId) REFERENCES Rules(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}

async function createTagScanTable(connection:PoolConnection): Promise<boolean> {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS TagItems (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                tagId INT,
                scanId INT,
                FOREIGN KEY (tagId) REFERENCES Tags(ID),
                FOREIGN KEY (scanId) REFERENCES Scans(ID)
            )
        `);
        return true;
    } catch (error) {
        return false;
    }
}