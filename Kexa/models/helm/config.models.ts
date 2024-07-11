import { Config } from "../settingFile/config.models";

export interface HelmConfig extends Config {
    KUBERNETESJSON?: string;
    KUBECONFIG?: string;
}