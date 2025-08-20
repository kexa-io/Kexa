import type { NetworkSecurityGroup } from "@azure/arm-network";
import type { CkiNetworkSecurityGroupAdd } from "./ckiNetworkSecurityGroupAdd.model";

export interface  CkiNetworkSecurityGroup extends NetworkSecurityGroup, CkiNetworkSecurityGroupAdd {
}