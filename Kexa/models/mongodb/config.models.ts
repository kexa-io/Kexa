import type { Config } from "../settingFile/config.models";

export interface MongoDbConfig extends Config {
    MONGODB_URI?: string;
}