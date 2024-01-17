import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { MongoDBSaveConfig } from "../../../models/export/mongoDB/config.models";
import { closeConnection, saveData, setConnection } from "../../saving/mongoDB.service";

const mongoose = require("mongoose")
const logger = getNewLogger("mongoDBSavingLogger");
const context = getContext();

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

export async function save(save: MongoDBSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.urlName) throw new Error("urlName is required");
    if(!save.collectionName) throw new Error("collectionName is required");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    logger.info(`Saving to MongoDB`);
    context?.log(`Saving to MongoDB`);
    let { dataModel, connectionMongoDB } = await setConnection(url, save.collectionName, resultScanMongoose);
    await Promise.all(result.flat().map(async (resultScan) => {
        await saveData(save, dataModel, resultScan);
    }));
    await closeConnection(connectionMongoDB);
}