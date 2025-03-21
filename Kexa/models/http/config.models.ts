import { Config } from "../settingFile/config.models";

export interface HttpConfig extends Config {
    header?: { [key: string]: string };
    body?: any;
    url: string[]|string;
}