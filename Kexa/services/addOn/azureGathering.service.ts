/*
    * Provider : azure
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - vm
    *     - rg
    *     - disk
    *     - nsg
    *     - virtualNetwork
    *     - networkInterfaces
    *     - aks
*/

import { 
    NetworkManagementClient,
    VirtualNetwork,
    NetworkInterface,
    NetworkSecurityGroup,
} from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { Logger } from "tslog";
import { AzureResources } from "../../models/azure/resource.models";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;
const { ContainerServiceClient } = require("@azure/arm-containerservice");

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<AzureResources[]|null>{
    let resources = new Array<AzureResources>();
    for(let config of azureConfig??[]){
        let azureResource = {
            "vm": null,
            "rg": null,
            "disk": null,
            "nsg": null,
            "virtualNetwork": null,
            "networkInterfaces": null,
            "aks": null,
        } as AzureResources;
        try{
            let prefix = config.prefix??(azureConfig.indexOf(config)+"-");
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix);
            setEnvVar("AZURE_CLIENT_ID", await getConfigOrEnvVar(config, "AZURECLIENTID", prefix))
            setEnvVar("AZURE_CLIENT_SECRET", await getConfigOrEnvVar(config, "AZURECLIENTSECRET", prefix))
            setEnvVar("AZURE_TENANT_ID", await getConfigOrEnvVar(config, "AZURETENANTID", prefix))

            const credential = new DefaultAzureCredential();
            if(!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            }else{
                //getting clients for azure
                resourcesClient = new ResourceManagementClient(credential, subscriptionId);
                computeClient   = new ComputeManagementClient(credential, subscriptionId);
                networkClient   = new NetworkManagementClient(credential, subscriptionId);
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
        
                const promises = [
                    networkSecurityGroupListing(networkClient),
                    virtualMachinesListing(computeClient),
                    resourceGroupListing(resourcesClient),
                    disksListing(computeClient),
                    virtualNetworksListing(networkClient),
                    aksListing(credential, subscriptionId),
                    ipListing(networkClient),
                    //getSPKeyInformation(credential, subscriptionId)
                ];
                
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, aksList, ipList] = await Promise.all(promises); //, SPList
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"]??[], ...vmList],
                    "rg": [...azureResource["rg"]??[], ...rgList],
                    "disk": [...azureResource["disk"]??[], ...diskList],
                    "nsg": [...azureResource["nsg"]??[], ...nsgList],
                    "virtualNetwork": [...azureResource["virtualNetwork"]??[], ...virtualNetworkList],
                    "aks": [...azureResource["aks"]??[], ...aksList],
                    "ip": [...azureResource["ip"]??[], ...ipList],
                    //"sp": [...azureResource["sp"]??[], ...SPList],
                } as AzureResources;
            }
        }catch(e){
            logger.error("error in collectAzureData with the subscription ID: " + config.SUBSCRIPTIONID??null);
            logger.error(e);
        }
        resources.push(azureResource);
    }
    return resources??null;
}

//get service principal key information
export async function getSPKeyInformation(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
   const { GraphRbacManagementClient } = require("@azure/graph");
    logger.info("starting getSPKeyInformation");
    try {
        const client = new GraphRbacManagementClient(credential,subscriptionId);
        const resultList = new Array<any>;
        for await (const item of client.servicePrincipals.list('')) {
            resultList.push(item);
        }
        return resultList;
    } catch (err) {
        logger.error("error in getSPKeyInformation:"+err);
        return null;
    }
   return null;
}

//ip list
export async function ipListing(client:NetworkManagementClient): Promise<Array<any>|null> {
    logger.info("starting ipListing");
    try{
        const resultList = new Array<any>;
        for await (const item of client.publicIPAddresses.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }catch(e){
        logger.error("error in ipListing:"+e);
        return null;
    }
}

//aks list
export async function aksListing(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
    logger.info("starting aksListing");
    try{
        const client = new ContainerServiceClient(credential, subscriptionId);
        const resArray = new Array();
        for await (let item of client.managedClusters.list()) {
            resArray.push(item);
        }
        return resArray;
    }catch(e){
        logger.error("error in aksListing:"+e);
        return null;
    }
}

//network security group list
export async function networkSecurityGroupListing(client:NetworkManagementClient): Promise<Array<NetworkSecurityGroup>|null> {
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
export async function virtualNetworksListing(client:NetworkManagementClient): Promise<Array<VirtualNetwork>|null> {
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
export async function networkInterfacesListing(client:NetworkManagementClient): Promise<Array<NetworkInterface>|null> {
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
export async function disksListing(client:ComputeManagementClient): Promise<Array<Disk>|null> {
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
export async function virtualMachinesListing(client:ComputeManagementClient): Promise<Array<VirtualMachine>|null> {
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
export async function resourceGroupListing(client:ResourceManagementClient): Promise<Array<ResourceGroup>|null> {
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


export async function networkSecurityGroup_analyse(nsgList: Array<NetworkSecurityGroup>): Promise<Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>|null> {
    try {
        const resultList = new Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>;
        for await (let item of nsgList){
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel=0;
            //check default rules
            resultList.push(nsgAnalysed);
        }
        return resultList;
    }catch (e) {
        logger.error("error"+e);
        return null;
    }  
}
