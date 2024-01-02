import { AnonymousCredential, BlobServiceClient, BlockBlobParallelUploadOptions, StoragePipelineOptions, StorageSharedKeyCredential } from "@azure/storage-blob";
import { AzureBlobStorageSaveConfig } from "../../../models/export/azureBlobStorage/config.models";
import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { DefaultAzureCredential } from "@azure/identity";

const logger = getNewLogger("AzureBlobStorageLogger");
const context = getContext();

export async function save(save: AzureBlobStorageSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.containerName) throw new Error("containerName is missing");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    await saveJsonToAzureBlobStorage(url, save, {data: result});
}

async function saveJsonToAzureBlobStorage(connectionString: string, save: AzureBlobStorageSaveConfig, json: object): Promise<void> {
    let blobServiceClient: BlobServiceClient;
    if (save?.accountName && save?.accountKey) {
        blobServiceClient = getBlobServiceClientWithAccountAndKey(save?.accountName ?? "", ((await getEnvVar(save?.accountKey??""))??save?.accountKey)??"");
    } else if (connectionString) {
        blobServiceClient = getBlobServiceClientFromConnectionString(connectionString);
    } else {
        if(!save?.accountName){
            throw new Error("accountName is missing; It is required to authenticate to Azure Blob Storage. Maybe you forgot to set it in the config file or in the environment variable");
        } 
        blobServiceClient = getBlobServiceClientFromDefaultAzureCredential(save?.accountName ?? "");
    }
    const containerClient = blobServiceClient.getContainerClient(save?.containerName ?? "");
    await containerClient.createIfNotExists();
    const jsonString = JSON.stringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient((save?.origin ?? "") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json");
    const uploadOptions: BlockBlobParallelUploadOptions = {
        tags: save.tags
    };
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