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
    ip: Array<any>|null;

    storage: Array<any>|null;

    blob: Array<any>|null;

    firewall: Array<any>|null;
    route_table: Array<any>|null;

    network_interface: Array<any>|null;

    express_route: Array<any>|null;

    private_endpoint: Array<any>|null;
    all: Array<any>|null;
    insight: Array<any>|null;
    gateway: Array<any>|null;
    service: Array<any>|null;

    backup: Array<any>|null;

    sql: Array<any>|null;
    postgres: Array<any>|null;
    redis: Array<any>|null;
}