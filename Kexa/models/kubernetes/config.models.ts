import { Config } from "../settingFile/config.models";

export interface KubernetesConfig extends Config {
    KUBERNETESJSON?: string;
    KUBECONFIG?: string;
}