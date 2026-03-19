import type { ResultScan } from "../../../models/resultScan.models";
import { getContext, getNewLogger } from "../../logger.service";
import type { AmazonS3SaveConfig } from "../../../models/export/amazonS3/config.models";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { jsonStringify } from '../../../helpers/jsonStringify';

const logger = getNewLogger("AmazonS3SaveLogger");
const context = getContext();

export async function save(save: AmazonS3SaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.bucketName) throw new Error("S3 save: bucketName is required");
    await saveJsonToAmazonS3(save, result);
}

async function saveJsonToAmazonS3(save: AmazonS3SaveConfig, result: ResultScan[][]): Promise<void> {
    const client = new S3Client({
        ...(save.region && { region: save.region }),
    });
    const key = (save?.origin ?? "kexa/") + new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '') + ".json";
    await client.send(new PutObjectCommand({
        Bucket: save.bucketName,
        Key: key,
        Body: jsonStringify({data: result}),
        ContentType: "application/json",
    }));
    logger.info(`Saved scan results to s3://${save.bucketName}/${key}`);
}