import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { MongoDBSaveConfig } from "../../../models/export/mongoDB/config.models";

const mongoose = require("mongoose")
const logger = getNewLogger("mongoDBLogger");
const context = getContext();

export async function save(save: MongoDBSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.urlName) throw new Error("urlName is required");
    if(!save.collectionName) throw new Error("collectionName is required");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    logger.info(`Saving to MongoDB`);
    context?.log(`Saving to MongoDB`);
    let {resultModel, connectionMongoDB} = await setConnection(url, save.collectionName);
    await Promise.all(result.flat().map(async (resultScan) => {
        await saveResult(save, resultModel, resultScan);
    }));
    await closeConnection(connectionMongoDB);
}

const resultScanMongoose = new mongoose.Schema({
    objectContent: {
        type: Object,
        required: false,
    },
    rule: {
        type: Object,
        required: true,
    },
    error: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    loud: {
        type: Object,
        required: false,
    },
    origin: {
        type: String,
        required: false,
    },
    tags: {
        type: Object,
        required: false,
    },
    timestamp: {
        type: Number,
        required: true,
    },
});

async function setConnection(url: string, tableName: string) {
    let connectionMongoDB = await mongoose.createConnection(url);
    const resultModel =  connectionMongoDB.model(tableName, resultScanMongoose, tableName);
    return {resultModel, connectionMongoDB};
}

async function saveResult(save: MongoDBSaveConfig, resultModel: any, result: ResultScan) {
    const resultToSave = new resultModel(result);
    if(save.tags) resultToSave.tags = save.tags;
    if(save.origin) resultToSave.origin = save.origin;
    resultToSave.timestamp = new Date().getTime();
    await resultToSave.save();
}

async function closeConnection(connectionMongoDB: any) {
    await connectionMongoDB.close();
}