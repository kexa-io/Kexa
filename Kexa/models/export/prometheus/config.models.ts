import { SaveConfig } from "../config.models";

export interface PrometheusSaveConfig extends SaveConfig {
    type: "prometheus";
}