import type { ResultScan } from "../../../models/resultScan.models";
import { getContext, getNewLogger } from "../../logger.service";
import type { AmazonS3SaveConfig } from "../../../models/export/amazonS3/config.models";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { jsonStringify } from '../../../helpers/jsonStringify';

const logger = getNewLogger("AzureBlobStorageLogger");
const context = getContext();

export async function save(save: AmazonS3SaveConfig, result: ResultScan[][]): Promise<void>{
    throw new Error("Implementation not yet complete");
    if(!save.bucketName) throw new Error("bucketName is missing");

    await saveJsonToAmazonS3(save, result);
}

async function saveJsonToAmazonS3(save: AmazonS3SaveConfig, result: ResultScan[][]): Promise<void> {
    const client = new S3Client();
    await client.send(new PutObjectCommand({
        Bucket: save.bucketName??"Kexa",
        Key: (save?.origin ?? "") + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json",
        Body: jsonStringify({data: result}),
    }));
    logger.info("Saved to Amazon S3");
}