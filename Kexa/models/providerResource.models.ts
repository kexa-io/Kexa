import { AzureResources } from "./azure/resource.models";
import { GcpResources } from "./gcp/resource.models";
import { GitResources } from "./git/resource.models";
import { KubernetesResources } from "./kubernetes/kubernetes.models";

export interface ProviderResource {
    azure: AzureResources[];
    gcp: GcpResources[];
    aws: any;
    kubernetes: KubernetesResources[];
    git: GitResources[];
}