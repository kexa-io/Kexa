import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface, NetworkSecurityGroup } from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// class azure CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface  CkiNetworkSecurityGroupAdd {
    analysed: boolean;
    scanningDate : Date;
    securityLevel:number;
}
export interface  CkiNetworkSecurityGroup extends NetworkSecurityGroup,CkiNetworkSecurityGroupAdd {
}
export class CkiNetworkSecurityGroupClass implements CkiNetworkSecurityGroup {
    analysed: boolean;
    scanningDate : Date ;
    securityLevel:number;
    constructor() {
        this.analysed = false;
        this.scanningDate = new Date();
        this.securityLevel = 0;
    }
}