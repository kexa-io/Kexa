/*
    * Provider : mongodb
    * Thumbnail : https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png
    * Documentation : https://www.npmjs.com/package/mongodb
    * Creation date : 2025-08-08
    * Note :
    * Resources :
    *       - databases
    *       - users
    *       - serverStatus
    *       - currentOp
*/

import { MongoClient, Db } from 'mongodb';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import type { MongoDbResources } from "../../models/mongodb/resource.models";
import type { MongoDbConfig } from "../../models/mongodb/config.models";

env.config();
const logger = getNewLogger("MongoDbLogger");

let currentConfig: MongoDbConfig;

async function createMongoDbConnection(config: MongoDbConfig): Promise<MongoClient> {
    const uri = await getConfigOrEnvVar(config, "MONGODB_URI", config.prefix);

    if (!uri) {
        throw new Error("The MongoDB connection URI is required. Please check your configuration.");
    }

    logger.debug("Attempting to connect to MongoDB");
    const client = new MongoClient(uri);
    await client.connect();
    logger.debug("Successfully connected to MongoDB");
    return client;
}

export async function collectData(mongoDbConfigs: MongoDbConfig[]): Promise<MongoDbResources[] | null> {
    const context = getContext();
    const allResources = new Array<MongoDbResources>();

    for (const config of mongoDbConfigs ?? []) {
        currentConfig = config;
        let client: MongoClient | null = null;

        try {
            context?.log("Starting collection for MongoDB configuration with prefix: " + config.prefix);
            logger.debug("Starting collection for MongoDB configuration with prefix: " + config.prefix);

            client = await createMongoDbConnection(config);

            const [databases, users, serverStatus, currentOp] = await Promise.all([
                collectDatabases(client),
                collectUsers(client),
                collectServerStatus(client),
                collectCurrentOp(client)
            ]);

            allResources.push({
                databases,
                users,
                serverStatus,
                currentOp,
            });

        } catch (e: any) {
            logger.error("Error occurred while collecting MongoDB data: " + e.message);
            context?.log("Error occurred while collecting MongoDB data: " + e.message);
        } finally {
            if (client) {
                logger.debug("Closing MongoDB connection.");
                await client.close();
            }
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function collectDatabases(client: MongoClient): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("databases")) return [];
    logger.debug("Collecting list of databases...");
    const dbList = await client.db().admin().listDatabases();
    const detailedDatabases = [];

    for (const dbInfo of dbList.databases) {
        const dbName = dbInfo.name;
        logger.debug(`Collecting resources for database: ${dbName}`);
        const dbInstance = client.db(dbName);

        const [collections, views, indexes, stats] = await Promise.all([
            collectCollectionsForDB(dbInstance),
            collectViewsForDB(dbInstance),
            collectIndexesForDB(dbInstance),
            dbInstance.stats()
        ]);

        detailedDatabases.push({
            name: dbName,
            sizeOnDisk: dbInfo.sizeOnDisk,
            empty: dbInfo.empty,
            collections,
            views,
            indexes,
            stats
        });
    }
    return detailedDatabases;
}

async function collectCollectionsForDB(db: Db): Promise<any[]> {
    logger.debug(`Collecting collections for database: ${db.databaseName}`);
    const collections = await db.listCollections({ type: "collection" }).toArray();
    const collectionsDetails = [];

    for (const collectionInfo of collections) {
        const collection = db.collection(collectionInfo.name);

        const sampleDocs = await collection.aggregate([{ $sample: { size: 100 } }]).toArray();
        const schema: { [key: string]: Set<string> } = {};

        for (const doc of sampleDocs) {
            for (const key in doc) {
                if (Object.prototype.hasOwnProperty.call(doc, key)) {
                    if (!schema[key]) {
                        schema[key] = new Set<string>();
                    }
                    const value = doc[key];
                    let type: string;

                    if (value === null) {
                        type = 'null';
                    } else if (value._bsontype === 'ObjectId') {
                        type = 'ObjectId';
                    } else if (value instanceof Date) {
                        type = 'Date';
                    } else if (Array.isArray(value)) {
                        type = 'array';
                    } else {
                        type = typeof value;
                    }
                    schema[key].add(type);
                }
            }
        }

        const finalSchema: { [key: string]: string[] } = {};
        for (const key in schema) {
            finalSchema[key] = Array.from(schema[key] ?? new Set<string>());
        }

        collectionsDetails.push({
            ...collectionInfo,
            schema: finalSchema
        });
    }
    return collectionsDetails;
}

async function collectViewsForDB(db: Db): Promise<any[]> {
    logger.debug(`Collecting views for the database : ${db.databaseName}`);
    return await db.listCollections({ type: "view" }).toArray();
}

async function collectIndexesForDB(db: Db): Promise<any[]> {
    logger.debug(`Collecting indexes for the database : ${db.databaseName}`);
    const collections = await db.listCollections().toArray();
    const allIndexes: any[] = [];
    for (const coll of collections) {
        const indexes = await db.collection(coll.name).indexes();
        allIndexes.push({
            collection: coll.name,
            indexes: indexes
        });
    }
    return allIndexes;
}

async function collectUsers(client: MongoClient): Promise<any[]> {
    if (!currentConfig?.ObjectNameNeed?.includes("users")) return [];
    logger.debug("Collecting users...");
    try {
        const users = await client.db('admin').collection("system.users").find().toArray();
        return users || [];
    } catch (error: any) {
        logger.error(`Error occurred while collecting users: ${error.message}`);
        return [];
    }
}

async function collectServerStatus(client: MongoClient): Promise<any> {
    if (!currentConfig?.ObjectNameNeed?.includes("serverStatus")) return null;
    logger.debug("Collecting server status...");
    try {
        return [await client.db().admin().serverStatus()];
    } catch (error: any) {
        logger.error(`Error occurred while collecting server status: ${error.message}`);
        return null;
    }
}

async function collectCurrentOp(client: MongoClient): Promise<any> {
    if (!currentConfig?.ObjectNameNeed?.includes("currentOp")) return null;
    logger.debug("Collecting current operations (currentOp)...");
    try {
        return ((await client.db().admin().command({ currentOp: 1 })).inprog) || [];
    } catch (error: any) {
        logger.error(`Error occurred while collecting currentOp: ${error.message}`);
        return null;
    }
}