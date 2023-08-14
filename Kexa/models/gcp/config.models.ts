import { Config } from "../settingFile/config.models";

export interface GcpConfig extends Config {
    PROJECTID?: string;
    GOOGLEJSON?: string;
}