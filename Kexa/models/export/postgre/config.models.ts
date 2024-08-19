import { SaveConfig } from "../config.models";

export interface PostgreSQLSaveConfig extends SaveConfig {
    type: "postgreSQL";
}