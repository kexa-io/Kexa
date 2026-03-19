import { Storage } from '@google-cloud/storage';
import type { ResultScan } from "../../../models/resultScan.models";
import { getNewLogger } from "../../logger.service";
import type { GcpCloudStorageSaveConfig } from "../../../models/export/gcp/config.models";
import { jsonStringify } from '../../../helpers/jsonStringify';

const logger = getNewLogger("GcpCloudStorageSaveLogger");

export async function save(save: GcpCloudStorageSaveConfig, result: ResultScan[][]): Promise<void> {
    if (!save.bucketName) throw new Error("GCP Cloud Storage save: bucketName is required");

    const storage = new Storage({
        ...(save.projectId && { projectId: save.projectId }),
    });

    const key = (save.origin ?? "kexa/") + new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '') + ".json";

    await storage.bucket(save.bucketName).file(key).save(jsonStringify({ data: result }), {
        contentType: "application/json",
    });

    logger.info(`Saved scan results to gs://${save.bucketName}/${key}`);
}
