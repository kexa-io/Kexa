import { Config } from "../settingFile/config.models";

export interface AzureConfig extends Config {
    AZURECLIENTID?: string;
    AZURECLIENTSECRET?: string;
    AZURETENANTID?: string;
    AZURESUBSCRIPTIONID?: string;
    SUBSCRIPTIONID?: string;
}