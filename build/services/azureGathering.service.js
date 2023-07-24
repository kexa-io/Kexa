"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkSecurityGroup_analyse = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.aksListing = exports.ipListing = exports.collectAzureData = void 0;
const arm_network_1 = require("@azure/arm-network");
const arm_compute_1 = require("@azure/arm-compute");
const arm_resources_1 = require("@azure/arm-resources");
//import { Subscription, SubscriptionClient, Subscriptions } from "@azure/arm-resources-subscriptions";
const ckiNetworkSecurityClass = __importStar(require("../class/azure/ckiNetworkSecurityGroup.class"));
const tslog_1 = require("tslog");
const identity_1 = require("@azure/identity");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE) ?? 3;
const { ContainerServiceClient } = require("@azure/arm-containerservice");
const config = require('config');
const azureConfig = (config.has('azure')) ? config.get('azure') : null;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
let computeClient;
let resourcesClient;
let networkClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectAzureData() {
    let resources = new Array();
    for (let config of azureConfig ?? []) {
        let azureResource = {
            "vm": null,
            "rg": null,
            "disk": null,
            "nsg": null,
            "virtualNetwork": null,
            "networkInterfaces": null,
            "aks": null,
        };
        try {
            let subscriptionId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SUBSCRIPTIONID", azureConfig.indexOf(config) + "-");
            //setEnvVar("AZURE_CLIENT_ID", await getConfigOrEnvVar(config, "AZURECLIENTID", azureConfig.indexOf(config)+"-"))
            //setEnvVar("AZURE_CLIENT_SECRET", await getConfigOrEnvVar(config, "AZURECLIENTSECRET", azureConfig.indexOf(config)+"-"))
            //setEnvVar("AZURE_TENANT_ID", await getConfigOrEnvVar(config, "AZURETENANTID", azureConfig.indexOf(config)+"-"))
            const credential = new identity_1.DefaultAzureCredential();
            if (!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            }
            else {
                //getting clients for azure
                resourcesClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
                computeClient = new arm_compute_1.ComputeManagementClient(credential, subscriptionId);
                networkClient = new arm_network_1.NetworkManagementClient(credential, subscriptionId);
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
                const promises = [
                    networkSecurityGroupListing(networkClient),
                    virtualMachinesListing(computeClient),
                    resourceGroupListing(resourcesClient),
                    disksListing(computeClient),
                    virtualNetworksListing(networkClient),
                    aksListing(credential, subscriptionId),
                    ipListing(networkClient)
                    //subscriptionInformation(credential)
                ];
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, aksList, ipList] = await Promise.all(promises);
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"] ?? [], ...vmList],
                    "rg": [...azureResource["rg"] ?? [], ...rgList],
                    "disk": [...azureResource["disk"] ?? [], ...diskList],
                    "nsg": [...azureResource["nsg"] ?? [], ...nsgList],
                    "virtualNetwork": [...azureResource["virtualNetwork"] ?? [], ...virtualNetworkList],
                    "aks": [...azureResource["aks"] ?? [], ...aksList],
                    "ip": [...azureResource["ip"] ?? [], ...ipList],
                    //subscription
                };
            }
            //return azureResource;
        }
        catch (e) {
            logger.error("error in collectAzureData with the subscription ID: " + config["subscriptionId"] ?? null);
            logger.error(e);
        }
        resources.push(azureResource);
    }
    return resources ?? null;
}
exports.collectAzureData = collectAzureData;
//ip list
async function ipListing(client) {
    logger.info("starting ipListing");
    const resultList = new Array;
    for await (const item of client.publicIPAddresses.listAll()) {
        resultList.push(item);
    }
    return resultList;
}
exports.ipListing = ipListing;
//subscription information
//export async function subscriptionInformation(credential: DefaultAzureCredential): Promise<Subscriptions> {
//    logger.info("starting subscriptionInformation");
//    const client = new SubscriptionClient(credential);
//    return client.subscriptions;
//}
//aks list
async function aksListing(credential, subscriptionId) {
    logger.info("starting aksListing");
    const client = new ContainerServiceClient(credential, subscriptionId);
    const resArray = new Array();
    for await (let item of client.managedClusters.list()) {
        resArray.push(item);
    }
    return resArray;
}
exports.aksListing = aksListing;
//network security group list
async function networkSecurityGroupListing(client) {
    logger.info("starting networkSecurityGroupListing");
    try {
        const resultList = new Array;
        for await (const item of client.networkSecurityGroups.listAll()) {
            resultList.push(item);
        }
        logger.info("ended networkSecurityGroupListing");
        return resultList;
    }
    catch (err) {
        logger.error("error in networkSecurityGroupListing:" + err);
        return null;
    }
}
exports.networkSecurityGroupListing = networkSecurityGroupListing;
//virtual network list
async function virtualNetworksListing(client) {
    logger.info("starting virtualNetworksListing");
    try {
        const resultList = new Array;
        for await (const item of client.virtualNetworks.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in virtualNetworksListing:" + err);
        return null;
    }
}
exports.virtualNetworksListing = virtualNetworksListing;
//network list
async function networkInterfacesListing(client) {
    logger.info("starting networkInterfacesListing");
    try {
        const resultList = new Array;
        for await (const item of client.networkInterfaces.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in networkInterfacesListing:" + err);
        return null;
    }
}
exports.networkInterfacesListing = networkInterfacesListing;
//disks.list
async function disksListing(client) {
    logger.info("starting disksListing");
    try {
        const resultList = new Array;
        for await (const item of client.disks.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in disksListing:" + err);
        return null;
    }
}
exports.disksListing = disksListing;
//virtualMachines.listAll
async function virtualMachinesListing(client) {
    logger.info("starting virtualMachinesListing");
    try {
        const resultList = new Array;
        for await (let item of client.virtualMachines.listAll()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in virtualMachinesListing:" + err);
        return null;
    }
}
exports.virtualMachinesListing = virtualMachinesListing;
//resourceGroups.list
async function resourceGroupListing(client) {
    logger.info("starting resourceGroupListing");
    try {
        const resultList = new Array;
        for await (let item of client.resourceGroups.list()) {
            resultList.push(item);
        }
        return resultList;
    }
    catch (err) {
        logger.error("error in resourceGroupListing:" + err);
        return null;
    }
}
exports.resourceGroupListing = resourceGroupListing;
///////////////////////////////////////////////////////////////////////////////////////////////////////
async function networkSecurityGroup_analyse(nsgList) {
    try {
        const resultList = new Array;
        for await (let item of nsgList) {
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed = true;
            nsgAnalysed.scanningDate = new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel = 0;
            //check default rules
            if (item.securityRules) {
                for (let rule of item.securityRules) {
                    //check for blocking rules in and out
                }
            }
        }
        return resultList;
    }
    catch (e) {
        logger.error("error" + e);
        return null;
    }
}
exports.networkSecurityGroup_analyse = networkSecurityGroup_analyse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0tleGEvc2VydmljZXMvYXp1cmVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQU80QjtBQUM1QixvREFBbUY7QUFDbkYsd0RBQWdGO0FBQ2hGLHVHQUF1RztBQUN2RyxzR0FBd0Y7QUFDeEYsaUNBQStCO0FBRS9CLDhDQUFpRjtBQUNqRixxRkFBMkY7QUFFM0Ysd0dBQXdHO0FBQ3hHLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFFLENBQUMsQ0FBQztBQUNuRCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUUxRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQztBQUNuRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUN6RixJQUFJLGFBQXNDLENBQUM7QUFDM0MsSUFBSSxlQUEwQyxDQUFFO0FBQ2hELElBQUksYUFBc0MsQ0FBQztBQUMzQyx3R0FBd0c7QUFDeEcsNEJBQTRCO0FBQzVCLHdHQUF3RztBQUNqRyxLQUFLLFVBQVUsZ0JBQWdCO0lBQ2xDLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFrQixDQUFDO0lBQzVDLEtBQUksSUFBSSxN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