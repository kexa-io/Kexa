import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface, NetworkSecurityGroup, SecurityRule } from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import * as azureClass from "./azureClass";
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
//networksecuritygroup list
export async function networkSecurityGroup_listing(client:NetworkManagementClient) {
    try {
        const result_list = new Array<NetworkSecurityGroup>;
        for await (const item of client.networkSecurityGroups.listAll()) {
            result_list.push(item);
        }

        return result_list;        
    } catch (err) {
        console.error(err);
        return null;
    }
}
//virtualnetwork list
export async function virtualNetworks_listing(client:NetworkManagementClient) {
    try {
        const result_list = new Array<VirtualNetwork>;
        for await (const item of client.virtualNetworks.listAll()) {
            result_list.push(item);
        }

        return result_list;
    } catch (err) {
        console.error(err);
        return null;
    }
}
//network list
export async function networkInterfaces_listing(client:NetworkManagementClient) {
    try {
        const result_list = new Array<NetworkInterface>;
        for await (const item of client.networkInterfaces.listAll()) {
            result_list.push(item);
        }
        return result_list;
    } catch (err) {
        console.error(err);
        return null;
    }
}
//disks.list
export async function disks_listing(client:ComputeManagementClient) {
    try {
        const result_list = new Array<Disk>;
        for await (const item of client.disks.list()) {
            result_list.push(item);
        }
        return result_list;
    } catch (err) {
        console.error(err);
        return null;
    }    
}
//virtualMachines.listAll
export async function virtualMachines_listing(client:ComputeManagementClient) {
    try {
        const result_list = new Array<VirtualMachine>;
        for await (let item of client.virtualMachines.listAll()){
            result_list.push(item);
        }
        return result_list;
    }catch (err) {
        console.error(err);
        return null;
    } 
}
  
export async function resourceGroup_listing(client:ResourceManagementClient) {
    try {
        const result_list = new Array<ResourceGroup>;
        for await (let item of client.resourceGroups.list()){
            result_list.push(item);
        }
        return result_list;
    }catch (err) {
        console.error(err);
        return null;
    }     
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//Analyse  list
export async function networkSecurityGroup_analyse(nsglist: Array<NetworkSecurityGroup>) {
    try {
        const result_list = new Array<azureClass.CkiNetworkSecurityGroup>;
        for await (let item of nsglist){
            let nsgAnalysed = new azureClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel=0;
            //check default rules
            if(item.securityRules) {
                for(let secrules of item.securityRules) {
                    //check for blocking rules in and out
                    
                }
            }
        }
        return result_list;
    }catch (err) {
        console.error(err);
        return null;
    }  
}