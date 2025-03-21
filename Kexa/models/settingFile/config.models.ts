import { AwsConfig } from "../aws/config.models";
import { AzureConfig } from "../azure/config.models";
import { SaveConfig } from "../export/config.models";
import { GcpConfig } from "../gcp/config.models";
import { GitConfig } from "../git/config.models";
import { HttpConfig } from "../http/config.models";
import { KubernetesConfig } from "../kubernetes/config.models";

export interface GlobalConfig{
    azure?: AzureConfig[];
    gcp?: GcpConfig[];
    aws?: AwsConfig[];
    kubernetes?: KubernetesConfig[];
    git?: GitConfig[];
    http?: HttpConfig[];
    save?: SaveConfig[];
    EMAILPORT?: string;
    EMAILHOST?: string;
    EMAILUSER?: string;
    EMAILPWD?: string;
    EMAILFROM?: string;
    SMSFROM?: string;
    SMSACCOUNTSID?: string;
    SMSAUTHTOKEN?: string;
}

export interface Config {
    rules : Array<string>;
    name?: string;
    description?: string;
    prefix?: string;
    ObjectNameNeed?: Array<string>;
}
