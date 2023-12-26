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
import { MonitorClient } from "@azure/arm-monitor";
import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { AzureResources } from "../../models/azure/resource.models";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";
import axios from "axios";

///////////////////////////////////////////////////////////////////////////////////////////////////////
const { ContainerServiceClient } = require("@azure/arm-containerservice");

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("AzureLogger");

let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
let monitorClient: MonitorClient;
let currentConfig: AzureConfig;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<AzureResources[]|null>{
    let context = getContext();
    let resources = new Array<AzureResources>();
    for(let config of azureConfig??[]){
        currentConfig = config;
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
                monitorClient = new MonitorClient(credential, subscriptionId);
                context?.log("- loading client microsoft azure done-");
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
        
                const promises = [
                    networkSecurityGroupListing(networkClient),
                    virtualMachinesListing(computeClient, monitorClient),
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
    if(!currentConfig.ObjectNameNeed?.includes("sp")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("ip")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("aks")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("nsg")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("virtualNetwork")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("networkInterfaces")) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("disk")) return null;
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
export async function virtualMachinesListing(client:ComputeManagementClient, monitor:MonitorClient): Promise<Array<VirtualMachine>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("vm")) return null;
    logger.info("starting virtualMachinesListing");
    try {
        const resultList = new Array<VirtualMachine>;
        for await (let item of client.virtualMachines.listAll()){
            let vm:any = item;
            let rg = item.id?.split("/")[4] ?? "";
            vm.resourceGroupName = rg;
            const promises = [
                getMetrics(monitor, item.id??""),
                getVMDetails(item.hardwareProfile?.vmSize??""),
            ];
            const [metrics, vmDetails] = await Promise.all(promises);
            vm.instanceView = metrics;
            vm.details = vmDetails;
            vm.instanceView.availableMemoryBytes = convertMinMaxMeanMedianToPercentage(vm.instanceView.availableMemoryBytes, convertGbToBytes(vm.details?.MemoryGb??0));
            resultList.push(vm);
        }
        return resultList;
    }catch (err) {
        logger.debug("error in virtualMachinesListing:"+err);
        return null;
    } 
}

function convertGbToBytes(gb: number): number {
    return gb * 1024 * 1024 * 1024;
}

const VMSizeMemory: {[x:string]: any} = {}
async function getVMDetails(VMSize:string): Promise<any> {
    if(VMSizeMemory[VMSize]) return VMSizeMemory[VMSize];
    try {
        let capabilities = (await axios.post("https://api.thecloudprices.com/api/props/sku", {"name": VMSize})).data.message.CommonCapabilities;
        capabilities.MemoryGb = parseFloat(capabilities.MemoryGb.$numberDecimal);
        return capabilities;
    } catch (err) {
        logger.debug("error in getVMDetails:"+err);
        return null;
    }
}

async function getMetrics(client: MonitorClient, vmId:string): Promise<any> {
    try {
        const vmMetrics = await client.metrics.list(vmId, {
            //get all list of metrics available : az vm monitor metrics list-definitions --name MyVmName --resource-group MyRg --query "@[*].name.value" (select max 20)
            metricnames: "Percentage CPU,Network In,Network Out,Disk Read Operations/Sec,Disk Write Operations/Sec,OS Disk IOPS Consumed Percentage,Data Disk Latency,Available Memory Bytes",
            aggregation: "Average",
            timespan: "P14D",
        });
        let dataMetricsReformat:any = {};
        for(const metric of vmMetrics.value??[]){
            let data = metric.timeseries?.[0].data;
            if(data?.length){
                let name = (metric.name?.value??metric.name?.localizedValue)??"";
                if(name == "") continue;
                dataMetricsReformat[name.charAt(0).toLowerCase() + name.slice(1).replace(/ /g, "")] = getMinMaxMeanMedian(data.map((item:any)=>item.average).filter((item:any)=>item!=null));
            }
        }
        return dataMetricsReformat;
    } catch (err) {
        logger.debug("error in getCPUAndRAMUsage:"+err);
        return null;
    }
}

function getMinMaxMeanMedian(array: Array<number>): any {
    let min = array[0];
    let max = array[0];
    let sum = 0;
    for(const num of array){
        if(num < min) min = num;
        if(num > max) max = num;
        sum += num;
    }
    return {
        "min": min,
        "max": max,
        "mean": sum/array.length,
        "median": array[Math.floor(array.length/2)],
    }
}

export async function resourceGroupListing(client:ResourceManagementClient): Promise<Array<ResourceGroup>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("rg")) return null;
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

export async function networkSecurityGroup_analyze(nsgList: Array<NetworkSecurityGroup>): Promise<Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("nsg_analyze")) return null;
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
import { convertMinMaxMeanMedianToPercentage } from "../../helpers/statsNumbers";
export async function mlListing(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
    if(
        !currentConfig.ObjectNameNeed?.includes("mlWorkspaces")
        && !currentConfig.ObjectNameNeed?.includes("mlJobs")
        && !currentConfig.ObjectNameNeed?.includes("mlComputes")
        && !currentConfig.ObjectNameNeed?.includes("mlSchedules")
    ) return null;
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
    if(!currentConfig.ObjectNameNeed?.includes("mlJobs")) return [];
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
    if(!currentConfig.ObjectNameNeed?.includes("mlComputes")) return [];
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
    if(!currentConfig.ObjectNameNeed?.includes("mlSchedules")) return [];
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