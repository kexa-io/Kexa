import { SaveConfig } from "../config.models";

export interface KexaSaveConfig extends SaveConfig {
    type: "kexa";
    name: string;
    token: string;
}