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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkSecurityGroup_analyse = exports.resourceGroupListing = exports.virtualMachinesListing = exports.disksListing = exports.networkInterfacesListing = exports.virtualNetworksListing = exports.networkSecurityGroupListing = exports.kubernetesListing = exports.aksListing = exports.collectAzureData = void 0;
const arm_network_1 = require("@azure/arm-network");
const arm_compute_1 = require("@azure/arm-compute");
const arm_resources_1 = require("@azure/arm-resources");
const ckiNetworkSecurityClass = __importStar(require("../class/azure/ckiNetworkSecurityGroup.class"));
const tslog_1 = require("tslog");
const identity_1 = require("@azure/identity");
const helm_ts_1 = __importDefault(require("helm-ts"));
////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = 2;
const { ContainerServiceClient } = require("@azure/arm-containerservice");
const k8s = require('@kubernetes/client-node');
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
let computeClient;
let resourcesClient;
let networkClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectAzureData() {
    const subscriptionId = process.env.SUBSCRIPTIONID;
    const credential = new identity_1.DefaultAzureCredential();
    let azureResource;
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
        };
    }
    return azureResource;
}
exports.collectAzureData = collectAzureData;
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
//kubernetes list
async function kubernetesListing() {
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["helm"] = [];
    const namespacePromises = namespaces.body.items.map(async (item) => {
        let helmData = await helm_ts_1.default.list({ namespace: item.metadata.name });
        helmData.forEach((helmItem) => {
            kubResources["helm"].push(helmItem);
        });
        const pods = await k8sApiCore.listNamespacedPod(item.metadata.name);
        pods.body.items.forEach((pod) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}
exports.kubernetesListing = kubernetesListing;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9henVyZUdhdGhlcmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBTzRCO0FBQzVCLG9EQUFtRjtBQUNuRix3REFBZ0Y7QUFDaEYsc0dBQXdGO0FBQ3hGLGlDQUErQjtBQUUvQiw4Q0FBeUQ7QUFDekQsc0RBQTJCO0FBRTNCLHdHQUF3RztBQUN4RyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDMUUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztBQUM1RixJQUFJLGFBQXNDLENBQUM7QUFDM0MsSUFBSSxlQUEwQyxDQUFFO0FBQ2hELElBQUksYUFBc0MsQ0FBQztBQUMzQyx3R0FBd0c7QUFDeEcsNEJBQTRCO0FBQzVCLHdHQUF3RztBQUNqRyxLQUFLLFVBQVUsZ0JBQWdCO0lBQ2xDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksaUNBQXNCLEVBQUUsQ0FBQztJQUNoRCxJQUFJLGFBQTZCLENBQUM7SUFDbEMsSUFBRyxDQUFDLGNBQWMsRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7S0FDOUQ7U0FBSTtRQUNELDJCQUEyQjtRQUMzQixlQUFlLEdBQUcsSUFBSSx3Q0FBd0IsQ0FBQyxV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