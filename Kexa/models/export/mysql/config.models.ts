import type { SaveConfig } from "../config.models";

export interface MySQLSaveConfig extends SaveConfig {
    type: "mySQL";
    logs: string | undefined;
}