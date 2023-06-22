import { AzureResources } from "./azure/resource.models";

export interface ProviderResource {
    azure: AzureResources;
    gcp: any;
    aws: any;
    ovh: any;
}