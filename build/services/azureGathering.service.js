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
exports.networkSecurityGroup_analyse = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.aksListing = exports.collectAzureData = void 0;
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
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
let computeClient;
let resourcesClient;
let networkClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectAzureData() {
    let azureResource = {
        "vm": null,
        "rg": null,
        "disk": null,
        "nsg": null,
        "virtualNetwork": null,
        "networkInterfaces": null,
        "aks": null,
    };
    const subscriptionsId = await (0, manageVarEnvironnement_service_1.getEnvVar)("SUBSCRIPTIONID");
    for (let subscriptionId of subscriptionsId.split("|")) {
        try {
            (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_ID", "ac525a4f-da35-4e6e-bb28-4964358fb42b");
            (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_TENANT_ID", "e17d1063-88c2-4368-9d08-203b84a1bb40");
            (0, manageVarEnvironnement_service_1.setEnvVar)("AZURE_CLIENT_SECRET", "unX8Q~tR66dpxrBpe5oCdjgH_tiI5y~.7I7QXaFO");
            const credential = new identity_1.DefaultAzureCredential();
            logger.fatal(credential);
            if (!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID as env var");
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
                    networkSecurityGroupListing(networkClient),
                    aksListing(credential, subscriptionId),
                    //subscriptionInformation(credential)
                ];
                const [nsgList, vmList, rgList, diskList, virtualNetworkList, networkInterfacesList, aksList] = await Promise.all(promises);
                logger.info("- listing cloud resources done -");
                azureResource = {
                    "vm": [...azureResource["vm"] ?? [], ...vmList],
                    "rg": [...azureResource["rg"] ?? [], ...rgList],
                    "disk": [...azureResource["disk"] ?? [], ...diskList],
                    "nsg": [...azureResource["nsg"] ?? [], ...nsgList],
                    "virtualNetwork": [...azureResource["virtualNetwork"] ?? [], ...virtualNetworkList],
                    "networkInterfaces": [...azureResource["networkInterfaces"] ?? [], ...networkInterfacesList],
                    "aks": [...azureResource["aks"] ?? [], ...aksList],
                    //subscription
                };
            }
            //return azureResource;
        }
        catch (e) {
            logger.error("error in collectAzureData with the subscription ID: " + subscriptionId);
            logger.error(e);
        }
    }
    return azureResource ?? null;
}
exports.collectAzureData = collectAzureData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0tleGEvc2VydmljZXMvYXp1cmVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQU80QjtBQUM1QixvREFBbUY7QUFDbkYsd0RBQWdGO0FBQ2hGLHVHQUF1RztBQUN2RyxzR0FBd0Y7QUFDeEYsaUNBQStCO0FBRS9CLDhDQUFpRjtBQUNqRixxRkFBd0U7QUFFeEUsd0dBQXdHO0FBQ3hHLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFFLENBQUMsQ0FBQztBQUNuRCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUUxRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUN6RixJQUFJLGFBQXNDLENBQUM7QUFDM0MsSUFBSSxlQUEwQyxDQUFFO0FBQ2hELElBQUksYUFBc0MsQ0FBQztBQUMzQyx3R0FBd0c7QUFDeEcsNEJBQTRCO0FBQzVCLHdHQUF3RztBQUNqRyxLQUFLLFVBQVUsZ0JBQWdCO0lBQ2xDLElBQUksYUFBYSxHQUFHO1FBQ2hCLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLElBQUk7UUFDVixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO1FBQ1gsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixtQkFBbUIsRUFBRSxJQUFJO1FBQ3pCLEtBQUssRUFBRSxJQUFJO0tBQ0ksQ0FBQztJQUNwQixNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUEsMENBQVMsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFD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