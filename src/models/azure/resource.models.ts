import { Disk, VirtualMachine } from "@azure/arm-compute";
import { NetworkSecurityGroup, VirtualNetwork } from "@azure/arm-network";
import { ResourceGroup } from "@azure/arm-resources";

export interface AzureResources {
    vm: Array<NetworkSecurityGroup>|null;
    rg: Array<VirtualMachine>|null;
    disk: Array<Disk>|null;
    nsg: Array<ResourceGroup>|null;
    virtualNetwork: Array<VirtualNetwork>|null;
    networkInterfaces: Array<NetworkSecurityGroup>|null;
    namespaces: Array<any>|null;
    pods: Array<any>|null;
    aks: Array<any>|null;
}