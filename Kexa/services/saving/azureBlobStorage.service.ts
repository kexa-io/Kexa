import { AnonymousCredential, BlobServiceClient, BlockBlobParallelUploadOptions, StorageSharedKeyCredential } from "@azure/storage-blob";
import { AzureBlobStorageSaveConfig } from "../../models/export/azureBlobStorage/config.models";
import { getEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import { DefaultAzureCredential } from "@azure/identity";
import { jsonStringify } from '../../helpers/jsonStringify';

const logger = getNewLogger("AzureBlobStorageLogger");
const context = getContext();

export async function saveJsonToAzureBlobStorage(connectionString: string, save: AzureBlobStorageSaveConfig, json: object): Promise<void> {
    let blobServiceClient: BlobServiceClient;
    if (save?.accountName && save?.accountKey) {
        blobServiceClient = getBlobServiceClientWithAccountAndKey(save?.accountName ?? "", ((await getEnvVar(save?.accountKey??""))??save?.accountKey)??"");
        logger.debug("Using accountName and accountKey to authenticate to Azure Blob Storage");
    } else if (connectionString) {
        blobServiceClient = getBlobServiceClientFromConnectionString(connectionString);
        logger.debug("Using connection string to authenticate to Azure Blob Storage");
    } else {
        if(!save?.accountName){
            throw new Error("accountName is missing; It is required to authenticate to Azure Blob Storage. Maybe you forgot to set it in the config file or in the environment variable");
        } 
        blobServiceClient = getBlobServiceClientFromDefaultAzureCredential(save?.accountName ?? "");
        logger.debug("Using DefaultAzureCredential to authenticate to Azure Blob Storage");
    }
    const containerClient = blobServiceClient.getContainerClient(save?.containerName ?? "");
    await containerClient.createIfNotExists();
    const jsonString = jsonStringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient((((await getEnvVar("ORIGIN"))??save?.origin)??"") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json");
    const uploadOptions: BlockBlobParallelUploadOptions = {};
    if(save?.tags) uploadOptions.tags = save?.tags;
    await blockBlobClient.upload(jsonString, jsonString.length, uploadOptions);
    logger.info("Saved to Azure Blob Storage");
    context?.log("Saved to Azure Blob Storage");
}

function getBlobServiceClientFromConnectionString(urlConnection:string): BlobServiceClient {
    const client: BlobServiceClient = BlobServiceClient.fromConnectionString(
        urlConnection
    );
    return client;
}

function getBlobServiceClientFromDefaultAzureCredential(accountName:string): BlobServiceClient {
    // Connect without secrets to Azure
    // Learn more: https://www.npmjs.com/package/@azure/identity#DefaultAzureCredential
    const client: BlobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        new DefaultAzureCredential()
    );
    return client;
}

function getBlobServiceClientWithAnonymousCredential(accountName:string): BlobServiceClient {
    const blobServiceUri = `https://${accountName}.blob.core.windows.net`;
    const blobServiceClient = new BlobServiceClient(
        blobServiceUri,
        new AnonymousCredential()
    );
    return blobServiceClient;
}

function getBlobServiceClientWithAccountAndKey(accountName:string, accountKey:string): BlobServiceClient {
    const sharedKeyCredential = new StorageSharedKeyCredential(
        accountName,
        accountKey
    );
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        sharedKeyCredential
    );
    return blobServiceClient;
}