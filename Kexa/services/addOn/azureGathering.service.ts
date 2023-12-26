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

import axios from 'axios';

async function fetchArm() {
    try {
      const response = await axios.get('https://api.npms.io/v2/search?q=@azure/arm');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  fetchArm();


import { 
    NetworkManagementClient,
    NetworkSecurityGroup,
} from "@azure/arm-network";
import { ComputeManagementClient } from "@azure/arm-compute";
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
import {ContainerServiceClient} from '@azure/arm-containerservice';
import {ExternalIdentitiesConfigurationClient} from '@azure/arm-azureadexternalidentities';
import {AdvisorManagementClient} from '@azure/arm-advisor';
import {ApiManagementClient } from '@azure/arm-apimanagement';
import { AttestationManagementClient } from '@azure/arm-attestation';
import { AppPlatformManagementClient } from '@azure/arm-appplatform';
import { AzureVMwareSolutionAPI } from '@azure/arm-avs';
import { AzureStackManagementClient } from '@azure/arm-azurestack';
import { AzureStackHCIClient } from '@azure/arm-azurestackhci';
import { AutomanageClient } from '@azure/arm-automanage';

// FAILED
//import { AutomationClient } from '@azure/arm-automation';
//import { AutoSuggestClient } from '@azure/cognitiveservices-autosuggest';

// WARNING THIS DELETE DEPENDENCIES
//import { BatchManagementClient } from '@azure/arm-batch';

// NEW STARTING FROM HERE (NOT TESTED)
import { BillingManagementClient } from '@azure/arm-billing';
import { BillingBenefitsRP } from '@azure/arm-billingbenefits';
import { AzureBotService } from '@azure/arm-botservice';
import { AzureChangeAnalysisManagementClient } from '@azure/arm-changeanalysis';
import { ChangesClient } from '@azure/arm-changes';
import { ChaosManagementClient } from '@azure/arm-chaos';




import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";

///////////////////////////////////////////////////////////////////////////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("AzureLogger");


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

const clientConstructors: Record<string, any> = {
    ResourceManagementClient,
    StorageManagementClient,
    ComputeManagementClient,
    NetworkManagementClient,
    AppConfigurationManagementClient,
    SqlManagementClient,
    PostgreSQLManagementClient,
    RedisManagementClient,
    ApplicationInsightsManagementClient,
    WebSiteManagementClient,
    RecoveryServicesClient,
    ExternalIdentitiesConfigurationClient,
    AdvisorManagementClient,
    ApiManagementClient,
    ContainerServiceClient,
    
    AttestationManagementClient,
   AppPlatformManagementClient,
    AzureVMwareSolutionAPI,
    AzureStackManagementClient,
    AzureStackHCIClient,
    AutomanageClient,

    BillingManagementClient,
    BillingBenefitsRP,
    AzureBotService,
    AzureChangeAnalysisManagementClient,
    ChangesClient,
    ChaosManagementClient
   // AutomationClient,
    //AutoSuggestClient
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<Object[]|null>{
    let context = getContext();
    let resources = new Array<Object>();
    for(let config of azureConfig??[]){
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix??(azureConfig.indexOf(config).toString());
        try{
            logger.debug("prefix: " + prefix);
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
            } else {
                context?.log("- loading client microsoft azure done-");
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
                interface AzureRet {
                    [key: string]: any;
                }
                const azureRet: AzureRet = {};
                for (const clientService in clientConstructors) {
                    const constructor = clientConstructors[clientService];
                    const clientName = constructor.name;
                    azureRet[clientName] = await callGenericClient(createGenericClient(constructor, credential, subscriptionId));
                }
                console.log(azureRet);
                resources.push(azureRet);
            }
        } catch(e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix))??null);
            logger.error(e);
        }
    }
    console.log(resources);
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

function createGenericClient<T>(Client: new (credential: any, subscriptionId: any) => T, credential: any, subscriptionId: any): T {
    return new Client(credential, subscriptionId);
}

async function callGenericClient(client: any) {
    logger.info("starting " + client.constructor.name + " Listing");
    let results = await listAllResources(client);
    logger.info(results);
    return results;
}

async function listAllResources(client: any) {
    logger.trace("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);
    logger.trace("Properties of client:");
    logger.trace(properties);

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
