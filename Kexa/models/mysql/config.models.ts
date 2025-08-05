import { Config } from "../settingFile/config.models";

export interface MySqlConfig extends Config {
    MYSQLHOST?: string;
    MYSQLUSER?: string;
    MYSQLPASSWORD?: string;
    MYSQLDATABASE?: string;
    MYSQLPORT?: number;
}