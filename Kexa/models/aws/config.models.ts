import type { Config } from "../settingFile/config.models";

export interface AwsConfig extends Config {
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
}