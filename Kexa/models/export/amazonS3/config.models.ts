import { SaveConfig } from "../config.models";

export interface AmazonS3SaveConfig extends SaveConfig {
    type: "amazonS3";
    bucketName?: string;
}