import { NetworkSecurityGroup } from "@azure/arm-network";

export interface AzureResources {
    'KexaAzure.vm': Array<NetworkSecurityGroup>|null;
    'KexaAzure.mlWorkspaces': Array<any>|null;
    'KexaAzure.mlJobs': Array<any>|null;
    'KexaAzure.mlComputes': Array<any>|null;
    'KexaAzure.mlSchedules': Array<any>|null;
    'KexaAzure.storage': Array<any>|null;
    'KexaAzure.blob': Array<any>|null;
    'KexaAzure.secrets': Array<any>|null;
    'KexaAzure.KeyvaultKeys': Array<any>|null;
    'KexaAzure.vaults': Array<any>|null;
}

export const stringKeys: Array<String> = [
    'KexaAzure.vm',
    'KexaAzure.mlWorkspaces',
    'KexaAzure.mlJobs',
    'KexaAzure.mlComputes',
    'KexaAzure.mlSchedules',
    'KexaAzure.storage',
    'KexaAzure.blob',
    'KexaAzure.secrets',
    'KexaAzure.KeyvaultKeys',
    'KexaAzure.vaults'
];