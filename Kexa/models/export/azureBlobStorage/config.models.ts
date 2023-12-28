import { SaveConfig } from "../config.models";

export interface AzureBlobStorageSaveConfig extends SaveConfig {
    type: "azureBlobStorage";
    containerName: string;
    blobName?: string;
    accountName?: string;
    accountKey?: string;
}