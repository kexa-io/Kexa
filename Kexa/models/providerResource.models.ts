import { AzureResources } from "./azure/resource.models";
import { GCPResources } from "./gcp/resource.models";
import { GitResources } from "./git/resource.models";
import { KubernetesResources } from "./kubernetes/kubernetes.models";

export interface ProviderResource {
    azure: AzureResources[];
    gcp: GCPResources[];
    aws: any;
    kubernetes: KubernetesResources[];
    git: GitResources[];
}