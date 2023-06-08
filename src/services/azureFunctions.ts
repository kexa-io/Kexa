import { 
    NetworkManagementClient,
    VirtualNetwork,
    //Subnet,
    NetworkInterface,
    NetworkSecurityGroup,
    //SecurityRule
} from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import * as ckiNetworkSecurityClass from "../class/azure/ckiNetworkSecurityGroup.class";
import { Logger } from "tslog";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
//network security group list
export async function networkSecurityGroupListing(client:NetworkManagementClient) {
    logger.info("starting networkSecurityGroupListing");
    try {
        const resultList = new Array<NetworkSecurityGroup>;
        for await (const item of client.networkSecurityGroups.listAll()) {
            resultList.push(item);
        }
        logger.info("ended networkSecurityGroupListing");
        return resultList;        
    } catch (err) {
        logger.error("error in networkSecurityGroupListing:"+err);
        return null;
    }
}

//virtual network list
export async function virtualNetworksListing(client:NetworkManagementClient) {
    logger.info("starting virtualNetworksListing");
    try {
        const resultList = new Array<VirtualNetwork>;
        for await (const item of client.virtualNetworks.listAll()) {
            resultList.push(item);
        }

        return resultList;
    } catch (err) {
        logger.error("error in virtualNetworksListing:"+err);
        return null;
    }
}

//network list
export async function networkInterfacesListing(client:NetworkManagementClient) {
    logger.info("starting networkInterfacesListing");
    try {
        const resultList = new Array<NetworkInterface>;
        for await (const item of client.networkInterfaces.listAll()) {
            resultList.push(item);
        }
        return resultList;
    } catch (err) {
        logger.error("error in networkInterfacesListing:"+err);
        return null;
    }
}

//disks.list
export async function disksListing(client:ComputeManagementClient) {
    logger.info("starting disksListing");
    try {
        const resultList = new Array<Disk>;
        for await (const item of client.disks.list()) {
            resultList.push(item);
        }
        return resultList;
    } catch (err) {
        logger.error("error in disksListing:"+err);
        return null;
    }    
}

//virtualMachines.listAll
export async function virtualMachinesListing(client:ComputeManagementClient) {
    logger.info("starting virtualMachinesListing");
    try {
        const resultList = new Array<VirtualMachine>;
        for await (let item of client.virtualMachines.listAll()){
            resultList.push(item);
        }
        return resultList;
    }catch (err) {
        logger.error("error in virtualMachinesListing:"+err);
        return null;
    } 
}

//resourceGroups.list
export async function resourceGroupListing(client:ResourceManagementClient) {
    logger.info("starting resourceGroupListing");
    try {
        const resultList = new Array<ResourceGroup>;
        for await (let item of client.resourceGroups.list()){
            resultList.push(item);
        }
        return resultList;
    }catch (err) {
        logger.error("error in resourceGroupListing:"+err);
        return null;
    }     
}

///////////////////////////////////////////////////////////////////////////////////////////////////////




export async function networkSecurityGroup_analyse(nsgList: Array<NetworkSecurityGroup>) {
    try {
        const resultList = new Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>;
        for await (let item of nsgList){
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel=0;
            //check default rules
            if(item.securityRules) {
                for(let rule of item.securityRules) {
                    //check for blocking rules in and out
                }
            }
        }
        return resultList;
    }catch (e) {
        logger.error("error"+e);
        return null;
    }  
}