import { Config } from "../settingFile/config.models";

export interface PostgresqlConfig extends Config {
    PGHOST?: string;
    PGUSER?: string;
    PGPASSWORD?: string;
    PGDATABASE?: string;
    PGPORT?: number;
}