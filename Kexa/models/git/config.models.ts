import { Config } from "../settingFile/config.models";

export interface GitConfig extends Config {
    GITHUBTOKEN?: string;
}