import type { SaveConfig } from "../config.models";

export interface PostgreSQLSaveConfig extends SaveConfig {
    type: "postgreSQL";
    logs: string | undefined;
}