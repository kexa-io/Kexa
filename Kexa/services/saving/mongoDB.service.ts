import { getEnvVar } from "../manageVarEnvironnement.service";
import type { MongoDBSaveConfig } from "../../models/export/mongoDB/config.models";

import { createConnection } from 'mongoose';

export async function setConnection(url: string, tableName: string, mongooseSchema: any) {
    let connectionMongoDB = await createConnection(url);
    const dataModel =  connectionMongoDB.model(tableName, mongooseSchema, tableName);
    return { dataModel, connectionMongoDB };
}

export async function saveData(save: MongoDBSaveConfig, modelMongoose: any, data: any) {
    const dataToSave = new modelMongoose(data);
    if(save.tags) dataToSave.tags = save.tags;
    let origin = (await getEnvVar("ORIGIN"))??save?.origin;
    if(origin) dataToSave.origin = origin;
    dataToSave.timestamp = new Date().getTime();
    await dataToSave.save();
}

export async function closeConnection(connectionMongoDB: any) {
    await connectionMongoDB.close();
}