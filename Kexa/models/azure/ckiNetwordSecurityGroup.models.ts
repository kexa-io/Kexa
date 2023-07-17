import { 
    //NetworkManagementClient,
    //VirtualNetwork,
    //Subnet,
    //NetworkInterface,
    NetworkSecurityGroup
} from "@azure/arm-network";
import { CkiNetworkSecurityGroupAdd } from "./ckiNetworkSecurityGroupAdd.model";

export interface  CkiNetworkSecurityGroup extends NetworkSecurityGroup, CkiNetworkSecurityGroupAdd {
}