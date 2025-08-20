import type { Config } from "../settingFile/config.models";

export interface OracleConfig extends Config {
    ORACLEUSER?: string;
    ORACLEPASSWORD?: string;
    ORACLEHOST?: string;
    ORACLEPORT?: number;
    ORACLESERVICENAME?: string;
}