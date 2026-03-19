import type { SaveConfig } from "../config.models";

export interface GcpCloudStorageSaveConfig extends SaveConfig {
    type: "gcpCloudStorage";
    bucketName?: string;
    projectId?: string;
}
