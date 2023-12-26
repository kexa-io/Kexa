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
    *     - storage
    *     - blob
    *     - firewall
    *     - route_table
    *     - network_interface
    *     - express_route
    *     - private_endpoint
    *     - all
*/

/*import * as AzureCompute from "@azure/arm-compute";
import * as AzureResources from "@azure/arm-resources";
import * as AzureStorage from "@azure/arm-storage";
import * as AzureBlob from "@azure/storage-blob";
import * as AzureAppConfiguration from "@azure/arm-appconfiguration";
import * as AzureSql from "@azure/arm-sql";
import * as AzurePostgreSQL from "@azure/arm-postgresql";
import * as AzureRedis from "@azure/arm-rediscache";
import * as AzureAppInsights from "@azure/arm-appinsights";
import * as AzureAppService from "@azure/arm-appservice";
import * as AzureRecoveryServices from "@azure/arm-recoveryservices";

interface AzureClients {
  [key: string]: any;
}

function extractClients(module: any): AzureClients {
  const clients: AzureClients = {};
  Object.keys(module).forEach((key) => {
    if (key.endsWith("Client")) {
      clients[key] = module[key];
    }
  });
  return clients;
}

const azureClients: Record<string, AzureClients> = {
  AzureCompute: extractClients(AzureCompute),
  AzureResources: extractClients(AzureResources),
  AzureStorage: extractClients(AzureStorage),
  AzureBlob: extractClients(AzureBlob),
  AzureAppConfiguration: extractClients(AzureAppConfiguration),
  AzureSql: extractClients(AzureSql),
  AzurePostgreSQL: extractClients(AzurePostgreSQL),
  AzureRedis: extractClients(AzureRedis),
  AzureAppInsights: extractClients(AzureAppInsights),
  AzureAppService: extractClients(AzureAppService),
  AzureRecoveryServices: extractClients(AzureRecoveryServices),
};

console.log("Available clients:");
console.log(azureClients);
*/

import { 
    NetworkManagementClient,
    VirtualNetwork,
    NetworkInterface,
    NetworkSecurityGroup,
} from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import {StorageAccount, StorageManagementClient} from "@azure/arm-storage";
import { BlobServiceClient } from "@azure/storage-blob";
import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import  {SqlManagementClient} from '@azure/arm-sql';
import  {PostgreSQLManagementClient} from '@azure/arm-postgresql';
import  {RedisManagementClient} from '@azure/arm-rediscache';
import {ApplicationInsightsManagementClient} from '@azure/arm-appinsights';
import {WebSiteManagementClient} from '@azure/arm-appservice';
import {RecoveryServicesClient} from '@azure/arm-recoveryservices';

import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { AzureResources } from "../../models/azure/resource.models";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";

///////////////////////////////////////////////////////////////////////////////////////////////////////
const { ContainerServiceClient } = require("@azure/arm-containerservice");

import {getContext, getNewLogger} from "../logger.service";
import { String } from "aws-sdk/clients/acm";
import { Bool } from "aws-sdk/clients/clouddirectory";
const logger = getNewLogger("AzureLogger");

let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
let storageClient: StorageManagementClient;
let appConfigClient: AppConfigurationManagementClient;
let sqlClient: SqlManagementClient;
let postgresClient: PostgreSQLManagementClient;
let redisClient: RedisManagementClient;
let insightClient: ApplicationInsightsManagementClient;
let webappClient: WebSiteManagementClient;
let recoveryClient: RecoveryServicesClient;

import { exec } from 'child_process';

function listAzureArmPackages(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec('npm search -l @azure/arm-', (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        const packageList = stdout
          .split('\n')
          .filter(line => line.startsWith('@azure/'))
          .map(line => line.split(' ')[0]);
        resolve(packageList);
      }
    });
  });
}

listAzureArmPackages()
  .then(packages => {
    console.log('Packages:', packages);
  })
  .catch(error => {
    console.error('Error:', error);
  });


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
            "storage": null,
            "blob": null,
            "firewall": null,
            "route_table": null,
            "network_interface": null,
            "express_route": null,
            "private_endpoint": null,
            "all": null,
            "insight": null,
            "gateway": null,
            "service": null,
            "backup": null,
            "sql": null,
            "postgres": null,
            "redis": null
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
                sqlClient = new SqlManagementClient(credential, subscriptionId);
                postgresClient = new PostgreSQLManagementClient(credential, subscriptionId);
                redisClient = new RedisManagementClient(credential, subscriptionId);
                insightClient = new ApplicationInsightsManagementClient(credential, subscriptionId);
                webappClient = new WebSiteManagementClient(credential, subscriptionId);
                recoveryClient = new RecoveryServicesClient(credential, subscriptionId);

                context?.log("- loading client microsoft azure done-");
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////

                const promises = [
                    await networkSecurityGroupListing(networkClient),
                    await virtualMachinesListing(computeClient),
                    await resourceGroupListing(resourcesClient),
                    await disksListing(computeClient),
                    await virtualNetworksListing(networkClient),
                    await aksListing(credential, subscriptionId),
                    await ipListing(networkClient),
                    await listAllStorage(storageClient),
                    await listAllBlob(storageClient, credential),
                    await listAzureFirewall(networkClient),
                    await listRouteTable(networkClient),
                    await listNetworkInterfaces(networkClient),
                    await listExpressRoute(networkClient),
                    await listPrivateEndpoint(appConfigClient),
                    await listAllResources(resourcesClient),
                    await listAppInsight(insightClient),
                    await listAppGateway(networkClient),
                    await listAppService(webappClient),
                    await listAzBackup(recoveryClient),
                    await listSQL(sqlClient),
                    await listPostgres(postgresClient),
                    await listRedis(redisClient),
                    //getSPKeyInformation(credential, subscriptionId)
                ];
                
                const [nsgList, vmList, rgList, diskList, virtualNetworkList,
                    aksList, ipList, storageList, blobList, firewallList, routeList,
                interfaceList, expressList, pvEndpointList, allList, insightList, gatewayList,
                serviceList, backupList, sqlList, postgresList, redisList] = await Promise.all(promises); //, SPList
                context?.log("- listing cloud resources done -");
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
        //const test = await client.networkSecurityGroups.listAll();
        for await (const item of client.networkSecurityGroups.listAll()) {
            resultList.push(item);
        }
        logger.info("ended networkSecurityGroupListing");
        console.log(resultList);
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
        console.log(resultList);
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

export async function listAllStorage(client:StorageManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting listAllStorage");
    try {
        const resultList = new Array<ResourceGroup>;
        const test = await client.storageAccounts.list();
        console.log("storage :", test);
        for await (let item of client.storageAccounts.list()){
            resultList.push(item);
        }
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }

    return null;
}

export async function listAllBlob(client:StorageManagementClient, credentials: any): Promise<Array<StorageAccount>|null> {
    logger.info("starting listAllBlob");

    try {
        const resultList = new Array<ResourceGroup>;
        console.log("storage :", test);
        for await (let item of client.storageAccounts.list()){
            resultList.push(item);
            const blobServiceClient = new BlobServiceClient(
                `https://${item.name}.blob.core.windows.net`,
                credentials
            );
            for await (const container of blobServiceClient.listContainers()) {
                console.log(`Container: ${container.name}`);
                for await (const blob of blobServiceClient.getContainerClient(container.name).listBlobsFlat()) {
                    console.log(` - Blob: ${blob.name}`);
                    // Process each blob as needed
                }
            }
        }
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }

    return null;
}

export async function listAzureFirewall(client:NetworkManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting list Azure Firewall");
    try {
        const resultList = new Array<ResourceGroup>;
        const test = await client.azureFirewalls.listAll();
        console.log("firewalls :", test);
      /*  for await (let item of client.azureFirewalls.list()){
            resultList.push(item);
        }*/
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }

    return null;
}

export async function listRouteTable(client:NetworkManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting list route table");
    try {
        const resultList = new Array<ResourceGroup>;
        const test = await client.routeTables.listAll();
        console.log("route table :", test);
        /*  for await (let item of client.azureFirewalls.list()){
              resultList.push(item);
          }*/
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }

    return null;
}

export async function listNetworkInterfaces(client:NetworkManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting list network interface");
    try {
        const resultList = new Array<ResourceGroup>;
        const test = await client.networkInterfaces.listAll();
        console.log("network interface :", test);
        /*  for await (let item of client.azureFirewalls.list()){
              resultList.push(item);
          }*/
        return resultList;
    }catch (err) {
        logger.debug("error in network interface:"+err);
        return null;
    }
    return null;
}

export async function listExpressRoute(client:NetworkManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting list express route");
    try {
        const resultList = new Array<ResourceGroup>;
        const test = await client.expressRouteCircuits.listAll();
        console.log("express route :", test);
        /*  for await (let item of client.azureFirewalls.list()){
              resultList.push(item);
          }*/
        return resultList;
    }catch (err) {
        logger.debug("error in express route:"+err);
        return null;
    }
    return null;
}

export async function listPrivateEndpoint(client:AppConfigurationManagementClient): Promise<Array<StorageAccount>|null> {
    logger.info("starting list private endpoint");
    console.log("list store :");

    try {
        const resultList = new Array<ResourceGroup>;
        console.log("list store :");
        const test = client.configurationStores.list();
        console.log("config store :");
        console.log(test);
        /*  for await (let item of client.azureFirewalls.list()){
              resultList.push(item);
          }*/
        return resultList;
    }catch (err) {
        logger.debug("error in private endpoint:"+err);
        return null;
    }
    return null;
}

export async function networkSecurityGroup_analyse(nsgList: Array<NetworkSecurityGroup>): Promise<Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>|null> {
    try {
        const resultList = new Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>;
        for await (let item of nsgList){
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            nsgAnalysed.securityLevel=0;
            resultList.push(nsgAnalysed);
        }
        return resultList;
    }catch (e) {
        logger.debug("error"+e);
        return null;
    }  
}


async function listAppInsight(resourcesClient: ApplicationInsightsManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}

async function listAppGateway(resourcesClient: NetworkManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}

async function listAppService(resourcesClient: WebSiteManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}

async function listAzBackup(resourcesClient: RecoveryServicesClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}


async function listSQL(resourcesClient: SqlManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}


async function listPostgres(resourcesClient: PostgreSQLManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}


async function listRedis(resourcesClient: RedisManagementClient): Promise<Array<any>|null> {
    await callGenericClient(resourcesClient);
    return null;
}

async function callGenericClient(client: any) {
    logger.info("starting " + client.constructor.name + " Listing");
    let results = await listAllResources(client);
    logger.trace(results);
    return results;
}

async function listAllResources(client: any) {
    logger.trace("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);
    logger.silly("Properties of client:");
    logger.silly(properties);

    const resultList: Record<string, any> = {};

    const promises = properties.map(async (element) => {
        type StatusKey = keyof typeof client;
        let key: StatusKey = element;
        const methods = ["listAll", "list"];

        if (client[key]) {
            await Promise.all(
                methods.map(async (method) => {
                    const resource = client[key];
                    if (typeof resource === 'object' && typeof resource[method as keyof typeof resource] === 'function') {
                        const gotMethod = resource[method as keyof typeof resource] as (...args: any[]) => any;
                        const numberOfArgs = gotMethod.length;
                        if (numberOfArgs > 2) {
                            logger.debug(`Function ${key as string}.${method} requires ${numberOfArgs} arguments.`);
                            return;
                        }
                        const keyStr = key as string;
                        const toExec = "resourcesClient." + (key as string) + "." + method + "()";
                        console.log("To exec: " + toExec);
                        let resultObject: Record<string, any> = {};
                        try {
                            resultObject = await resource[method]();
                            resultList[keyStr] = resultObject;
                        } catch (e) {
                            logger.debug("Error on function :", e);
                        }
                    } else {
                        logger.debug(`Invalid property ${key as string} or function call ${method}.`);
                        return;
                    }
                })
            );
        }
    });

    await Promise.all(promises);
    return resultList;
}
