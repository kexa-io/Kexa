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
//import { Subscription, SubscriptionClient, Subscriptions } from "@azure/arm-resources-subscriptions";
import * as ckiNetworkSecurityClass from "../class/azure/ckiNetworkSecurityGroup.class";
import { Logger } from "tslog";
import { AzureResources } from "../models/azure/resource.models";
import { DefaultAzureCredential, ClientSecretCredential } from "@azure/identity";
import { getEnvVar, setEnvVar } from "./manageVarEnvironnement.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;
const { ContainerServiceClient } = require("@azure/arm-containerservice");

const config = require('config');
const azureConfig = (config.has('azure'))?config.get('azure'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectAzureData(): Promise<AzureResources[]|null>{
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
            //TODO : gestion Nouvelle subscription auth gestion
            let subscriptionId = config["SUBSCRIPTIONID"]??null;
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
                    networkSecurityGroupListing(networkClient),
                    aksListing(credential, subscriptionId),
                    //subscriptionInformation(credential)
                ];
                
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, networkInterfacesList, aksList] = await Promise.all(promises);
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"]??[], ...vmList],
                    "rg": [...azureResource["rg"]??[], ...rgList],
                    "disk": [...azureResource["disk"]??[], ...diskList],
                    "nsg": [...azureResource["nsg"]??[], ...nsgList],
                    "virtualNetwork": [...azureResource["virtualNetwork"]??[], ...virtualNetworkList],
                    "networkInterfaces": [...azureResource["networkInterfaces"]??[], ...networkInterfacesList],
                    "aks": [...azureResource["aks"]??[], ...aksList],
                    //subscription
                } as AzureResources;
            }
            //return azureResource;
        }catch(e){
            logger.error("error in collectAzureData with the subscription ID: " + config["subscriptionId"]??null);
            logger.error(e);
        }
        resources.push(azureResource);
    }
    return resources??null;
}

//subscription information
//export async function subscriptionInformation(credential: DefaultAzureCredential): Promise<Subscriptions> {
//    logger.info("starting subscriptionInformation");
//    const client = new SubscriptionClient(credential);
//    return client.subscriptions;
//}

//aks list
export async function aksListing(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
    logger.info("starting aksListing");
    const client = new ContainerServiceClient(credential, subscriptionId);
    const resArray = new Array();
    for await (let item of client.managedClusters.list()) {
        resArray.push(item);
    }
    return resArray;
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