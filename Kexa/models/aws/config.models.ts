import { Config } from "../settingFile/config.models";

export interface AwsConfig extends Config {
    AWSACCESSKEYID?: string;
    AWSSECRETACCESSKEY?: string;
}