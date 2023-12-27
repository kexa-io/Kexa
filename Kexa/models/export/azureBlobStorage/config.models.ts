import { SaveConfig } from "../config.models";

export interface AzureBlobStorageSaveConfig extends SaveConfig {
    type: "azureBlobStorage";
    containerName: string;
    blobName?: string;
    tags?: {[key: string]: string};
    accountName?: string;
    accountKey?: string;
}