import type { ProviderResource } from '../../../models/providerResource.models';
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import type { MongoDBSaveConfig } from "../../../models/export/mongoDB/config.models";
import { closeConnection, saveData, setConnection } from "../../saving/mongoDB.service";
import mongoose from 'mongoose';

const logger = getNewLogger("mongoDBExportLogger");
const context = getContext();

const providerResourcesGatherMongoose = new mongoose.Schema({
    timestamp: Number,
    origin: String,
    tags: [String],
}, { strict: false });

export async function exportation(save: MongoDBSaveConfig, resources: ProviderResource): Promise<void>{
    if(!save.urlName) throw new Error("urlName is required");
    if(!save.collectionName) throw new Error("collectionName is required");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    logger.info(`Export to MongoDB`);
    context?.log(`Export to MongoDB`);
    let { dataModel, connectionMongoDB } = await setConnection(url, save.collectionName, providerResourcesGatherMongoose);
    await saveData(save, dataModel, resources);
    await closeConnection(connectionMongoDB);
}