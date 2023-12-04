/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
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
    *     - mlWorkspace
    *     - mlJobs
    *     - mlComputes
    *     - mlSchedule
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
import { AzureResources } from "../../models/azure/resource.models";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";

///////////////////////////////////////////////////////////////////////////////////////////////////////
const { ContainerServiceClient } = require("@azure/arm-containerservice");

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("AzureLogger");

let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<AzureResources[]|null>{
    let context = getContext();
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
            "mlWorkspaces": null,
            "mlJobs": null,
            "mlComputes": null,
            "mlSchedules": null,
        } as AzureResources;
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix??(azureConfig.indexOf(config).toString());
        try{
            logger.debug("prefix: "+prefix);
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await getConfigOrEnvVar(config, "AZURECLIENTID", prefix);
            if(azureClientId) setEnvVar("AZURE_CLIENT_ID", azureClientId);
            else logger.warn(prefix + "AZURECLIENTID not found");
            let azureClientSecret = await getConfigOrEnvVar(config, "AZURECLIENTSECRET", prefix);
            if(azureClientSecret) setEnvVar("AZURE_CLIENT_SECRET", azureClientSecret);
            else logger.warn(prefix + "AZURECLIENTSECRET not found");
            let azureTenantId = await getConfigOrEnvVar(config, "AZURETENANTID", prefix);
            if(azureTenantId) setEnvVar("AZURE_TENANT_ID", azureTenantId);
            else logger.warn(prefix + "AZURETENANTID not found");
            let UAI = {}
            let useAzureIdentity = await getConfigOrEnvVar(config, "USERAZUREIDENTITYID", prefix);
            if(useAzureIdentity) UAI = {managedIdentityClientId: useAzureIdentity};
            const credential = new DefaultAzureCredential(UAI);
            if(!subscriptionId) {
                throw new Error("- Please pass "+ prefix + "SUBSCRIPTIONID in your config file");
            }else{
                //getting clients for azure
                resourcesClient = new ResourceManagementClient(credential, subscriptionId);
                computeClient   = new ComputeManagementClient(credential, subscriptionId);
                networkClient   = new NetworkManagementClient(credential, subscriptionId);
                context?.log("- loading client microsoft azure done-");
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
                    mlListing(credential, subscriptionId),
                    //getSPKeyInformation(credential, subscriptionId)
                ];
                
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, aksList, ipList, mlList] = await Promise.all(promises); //, SPList
                context?.log("- listing cloud resources done -");
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"]??[], ...vmList??[]],
                    "rg": [...azureResource["rg"]??[], ...rgList??[]],
                    "disk": [...azureResource["disk"]??[], ...diskList??[]],
                    "nsg": [...azureResource["nsg"]??[], ...nsgList??[]],
                    "virtualNetwork": [...azureResource["virtualNetwork"]??[], ...virtualNetworkList??[]],
                    "aks": [...azureResource["aks"]??[], ...aksList??[]],
                    "ip": [...azureResource["ip"]??[], ...ipList??[]],
                    "mlWorkspaces": [...azureResource["mlWorkspaces"]??[], ...mlList?.workspaces??[]],
                    "mlJobs": [...azureResource["mlJobs"]??[], ...mlList?.jobs??[]],
                    "mlComputes": [...azureResource["mlComputes"]??[], ...mlList?.computes??[]],
                    "mlSchedules": [...azureResource["mlSchedules"]??[], ...mlList?.schedule??[]],
                    //"sp": [...azureResource["sp"]??[], ...SPList],
                } as AzureResources;
            }
        }catch(e){
            logger.error("error in collectAzureData with the subscription ID: " + (await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix))??null);
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
        logger.debug("error in getSPKeyInformation:"+err);
        return null;
    }
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
        logger.debug("error in ipListing:"+e);
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
        logger.debug("error in aksListing:"+e);
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
        logger.debug("error in networkSecurityGroupListing:"+err);
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
        logger.debug("error in virtualNetworksListing:"+err);
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
        logger.debug("error in networkInterfacesListing:"+err);
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
        logger.debug("error in disksListing:"+err);
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
        logger.debug("error in virtualMachinesListing:"+err);
        return null;
    } 
}

export async function resourceGroupListing(client:ResourceManagementClient): Promise<Array<ResourceGroup>|null> {
    logger.info("starting resourceGroupListing");
    try {
        const resultList = new Array<ResourceGroup>;
        for await (let item of client.resourceGroups.list()){
            resultList.push(item);
        }
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }     
}

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
        logger.debug("error"+e);
        return null;
    }  
}


import { AzureMachineLearningWorkspaces } from "@azure/arm-machinelearning";
export async function mlListing(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
    logger.info("starting mlListing");
    try{
        const client = new AzureMachineLearningWorkspaces(credential, subscriptionId);
        const result = {
            "workspaces": new Array(),
            "jobs": new Array(),
            "computes": new Array(),
            "schedule": new Array(),
        }
        for await (let item of client.workspaces.listBySubscription()) {
            result.workspaces = [...result.workspaces??[], item];
            let resourceGroupName = item?.id?.split("/")[4] ?? "";
            let workspaceName = item?.name ?? "";
            const promises = [
                jobsListing(client, resourceGroupName, workspaceName),
                computeOperationsListing(client, resourceGroupName, workspaceName),
                schedulesListing(client, resourceGroupName, workspaceName),
            ];
            const [jobsList, computeOperationsList, schedulesList] = await Promise.all(promises);
            result.jobs = [...result.jobs??[], ...jobsList];
            result.computes = [...result.computes??[], ...computeOperationsList];
            result.schedule = [...result.schedule??[], ...schedulesList];
        }
        return result;
    }catch(e){
        logger.debug("error in mlListing:"+e);
        return null;
    }
}

export async function jobsListing(client: AzureMachineLearningWorkspaces, resourceGroupName: string, workspaceName: string): Promise<any[]> {
    //logger.info("starting jobsListing");
    try{
        const resArray = new Array();
        for await (let item of client.jobs.list(resourceGroupName, workspaceName)) {
            let result:any = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(result);
        }
        return resArray;
    }catch(e){
        logger.debug("error in jobsListing:"+e);
        return [];
    }
}

export async function computeOperationsListing(client: AzureMachineLearningWorkspaces, resourceGroupName: string, workspaceName: string): Promise<any[]> {
    //logger.info("starting computeOperationsListing");
    try{
        const resArray = new Array();
        for await (let item of client.computeOperations.list(resourceGroupName, workspaceName)) {
            let result:any = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(item);
        }
        return resArray;
    }catch(e){
        logger.debug("error in computeOperationsListing:"+e);
        return [];
    }
}

export async function schedulesListing(client: AzureMachineLearningWorkspaces, resourceGroupName: string, workspaceName: string): Promise<any[]> {
    //logger.info("starting schedulesListing");
    try{
        const resArray = new Array();
        for await (let item of client.schedules.list(resourceGroupName, workspaceName)) {
            let result:any = item;
            result.workspace = workspaceName;
            result.resourceGroupName = resourceGroupName;
            resArray.push(item);
        }
        return resArray;
    }catch(e){
        logger.debug("error in schedulesListing:"+e);
        return [];
    }
}