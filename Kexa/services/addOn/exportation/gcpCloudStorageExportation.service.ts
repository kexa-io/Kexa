import { Storage } from '@google-cloud/storage';
import type { GcpCloudStorageSaveConfig } from "../../../models/export/gcp/config.models";
import type { ProviderResource } from "../../../models/providerResource.models";
import { getNewLogger } from "../../logger.service";
import { jsonStringify } from '../../../helpers/jsonStringify';

const logger = getNewLogger("GcpCloudStorageExportationLogger");

export async function exportation(save: GcpCloudStorageSaveConfig, resources: ProviderResource): Promise<void> {
    if (!save.bucketName) throw new Error("GCP Cloud Storage export: bucketName is required");

    const storage = new Storage({
        ...(save.projectId && { projectId: save.projectId }),
    });

    const bucket = storage.bucket(save.bucketName);
    const prefix = (save.origin ?? "kexa/export/") + new Date().toISOString().slice(0, 16).replace(/[-T:]/g, '');

    await bucket.file(`${prefix}/resources.json`).save(jsonStringify(resources), {
        contentType: "application/json",
    });

    logger.info(`Exported resources to gs://${save.bucketName}/${prefix}/resources.json`);
}
