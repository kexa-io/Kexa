import { AWSResources } from "./aws/ressource.models";
import { AzureResources } from "./azure/resource.models";
import { GitResources } from "./git/resource.models";
import { HttpResources } from "./http/resource.model";
import { KubernetesResources } from "./kubernetes/kubernetes.models";

export interface ProviderResource {
    azure: AzureResources[];
    gcp: any;
    aws: AWSResources[];
    kubernetes: KubernetesResources[];
    git: GitResources[];
    http: HttpResources[];
}