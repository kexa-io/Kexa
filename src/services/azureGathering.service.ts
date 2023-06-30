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
import { AzureResources } from "../models/azure/resource.models";
import { DefaultAzureCredential } from "@azure/identity";
import helm from 'helm-ts';

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = 2;
const { ContainerServiceClient } = require("@azure/arm-containerservice");
const k8s = require('@kubernetes/client-node');
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectAzureData(): Promise<AzureResources>{
    const subscriptionId = process.env.SUBSCRIPTIONID;
    const credential = new DefaultAzureCredential();
    let azureResource: AzureResources;  
    if(!subscriptionId) {
        throw new Error("- Please pass SUBSCRIPTIONID as env var");
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
            kubernetesListing(),
            aksListing(credential, subscriptionId)
        ];
        
        const [nsgList, vmList, rgList, diskList, virtualNetworkList, networkInterfacesList, kubernetesList, aksList] = await Promise.all(promises);


        //console.log("vmList",vmList);
        //console.log("rgList",rgList);
        //console.log("diskList",diskList);
        //console.log("nsgList",nsgList);
        //console.log("virtualNetworkList",virtualNetworkList);
        //console.log("networkInterfacesList",networkInterfacesList);
        azureResource = {
            "vm": vmList,
            "rg": rgList,
            "disk": diskList,
            "nsg": nsgList,
            "virtualNetwork": virtualNetworkList,
            "networkInterfaces": networkInterfacesList,
            "namespaces": kubernetesList["namespaces"],
            "pods": kubernetesList["pods"],
            "helm": kubernetesList["helm"],
            "aks": aksList,
        } as AzureResources;
        console.log("helm",kubernetesList["helm"]);
    }
    return azureResource;
}

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

//kubernetes list
export async function kubernetesListing(): Promise<any> {
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources: any = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["helm"] = [];
    const namespacePromises = namespaces.body.items.map(async (item: any) => {
        let helmData = await helm.list({ namespace: item.metadata.name });
        helmData.forEach((helmItem: any) => {
            kubResources["helm"].push(helmItem);
        });
        const pods = await k8sApiCore.listNamespacedPod(item.metadata.name);
        pods.body.items.forEach((pod: any) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });

    await Promise.all(namespacePromises);
    return kubResources;
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