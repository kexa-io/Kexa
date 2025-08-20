import type { SaveConfig } from "../config.models";

export interface MongoDBSaveConfig extends SaveConfig {
    type: "mongoDB";
    collectionName: string;
}