//import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
//import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";

import { CkiNetworkSecurityGroup } from "./ckiNetwordSecurityGroup.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// class azure CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
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