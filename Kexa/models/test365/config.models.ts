import { Config } from "../settingFile/config.models";

export interface test365Config extends Config {
    AZURECLIENTID?: string;
    AZURECLIENTSECRET?: string;
    AZURETENANTID?: string;

    AZURESUBSCRIPTIONID?: string;
    SUBSCRIPTIONID?: string;
}