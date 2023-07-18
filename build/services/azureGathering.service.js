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
let debug_mode = Number(process.env.DEBUG_MODE) ?? 3;
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
    try {
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
            logger.info("- listing cloud resources done -");
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
    catch (e) {
        logger.error(e);
        return null;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVHYXRoZXJpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0tleGEvc2VydmljZXMvYXp1cmVHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQU80QjtBQUM1QixvREFBbUY7QUFDbkYsd0RBQWdGO0FBQ2hGLHNHQUF3RjtBQUN4RixpQ0FBK0I7QUFFL0IsOENBQXlEO0FBQ3pELHNEQUEyQjtBQUUzQix3R0FBd0c7QUFDeEcsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUUsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQzFFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFDNUYsSUFBSSxhQUFzQyxDQUFDO0FBQzNDLElBQUksZUFBMEMsQ0FBRTtBQUNoRCxJQUFJLGFBQXNDLENBQUM7QUFDM0Msd0dBQXdHO0FBQ3hHLDRCQUE0QjtBQUM1Qix3R0FBd0c7QUFDakcsS0FBSyxVQUFVLGdCQUFnQjtJQUNsQyxJQUFHO1FBQ0MsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQ0FBc0IsRUFBRSxDQUFDO1FBQ2hELElBQUksYUFBNkIsQ0FBQztRQUNsQyxJQUFHLENBQUMsY0FBYyxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUM5RDthQUFJO1lBQ0QsMkJBQTJCO1lBQzNCLGVBQWUsR0FBRyxJQUFJLHdDQUF3QixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMzRSxhQUFhLEdBQUssSUFBSSxxQ0FBdUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDMUUsYUFBYSxHQUFLLElBQUkscUNBQXVCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxzSUFBc0k7WUFFdEksTUFBTSxRQUFRLEdBQUc7Z0JBQ2IsMkJBQTJCLENBQUMsYUFBYSxDQUFDO2dCQUMxQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7Z0JBQ3JDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztnQkFDckMsWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFDM0Isc0JBQXNCLENBQUMsYUFBYSxDQUFDO2dCQUNyQywyQkFBMkIsQ0FBQyxhQUFhLENBQUM7Z0JBQzFDLGlCQUFpQixFQUFFO2dCQUNuQixVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQzthQUN6QyxDQUFDO1lBRUYsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUNoRCxhQUFhLEdBQUc7Z0JBQ1osSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEtBQUssRUFBRSxPQUFPO2dCQUNkLGdCQUFnQixFQUFFLGtCQUFrQjtnQkFDcEMsbUJBQW1CLEVBQUUscUJBQXFCO2dCQUMxQyxZQUFZLEVBQUUsY0FBYyxDQUFDLFlBQVksQ0FBQztnQkFDMUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUM7Z0JBQzlCLE1BQU0sRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDO2dCQUM5QixLQUFLLEVBQUUsT0FBTzthQUNDLENBQUM7U0FDdkI7UUFDRCxPQUFPLGFBQWEsQ0FBQztLQUN4QjtJQUFBLE9BQU0sQ0FBQyxFQUFDO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQTlDRCw0Q0E4Q0M7QUFFRCxVQUFVO0FBQ0gsS0FBSyxVQUFVLFVBQVUsQ0FBQyxVQUFrQyxFQUFFLGNBQXNCO0lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFSRCxnQ0FRQztBQUVELGlCQUFpQjtBQUNWLEtBQUssVUFBVSxpQkFBaUI7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNyQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxJQUFJLFVBQVUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNsRCxJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7SUFDM0IsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ25ELFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBUyxFQUFFLEVBQUU7UUFDcEUsSUFBSSxRQUFRLEdBQUcsTUFBTSxpQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQy9CLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUF4QkQsOENBd0JDO0FBRUQsNkJBQTZCO0FBQ3RCLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxNQUE4QjtJQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDcEQsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBMkIsQ0FBQztRQUNuRCxJQUFJLEtBQUssRUFBRSxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0QsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNqRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQWJELGtFQWFDO0FBRUQsc0JBQXNCO0FBQ2YsS0FBSyxVQUFVLHNCQUFzQixDQUFDLE1BQThCO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUMvQyxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFxQixDQUFDO1FBQzdDLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdkQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBYkQsd0RBYUM7QUFFRCxjQUFjO0FBQ1AsS0FBSyxVQUFVLHdCQUF3QixDQUFDLE1BQThCO0lBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUNqRCxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUF1QixDQUFDO1FBQy9DLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFaRCw0REFZQztBQUVELFlBQVk7QUFDTCxLQUFLLFVBQVUsWUFBWSxDQUFDLE1BQThCO0lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNyQyxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFXLENBQUM7UUFDbkMsSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFaRCxvQ0FZQztBQUVELHlCQUF5QjtBQUNsQixLQUFLLFVBQVUsc0JBQXNCLENBQUMsTUFBOEI7SUFDdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQy9DLElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQXFCLENBQUM7UUFDN0MsSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBQztZQUNwRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQSxPQUFPLEdBQUcsRUFBRTtRQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFaRCx3REFZQztBQUVELHFCQUFxQjtBQUNkLEtBQUssVUFBVSxvQkFBb0IsQ0FBQyxNQUErQjtJQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDN0MsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBb0IsQ0FBQztRQUM1QyxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFDO1lBQ2hELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtJQUFBLE9BQU8sR0FBRyxFQUFFO1FBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVpELG9EQVlDO0FBRUQsdUdBQXVHO0FBS2hHLEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxPQUFvQztJQUNuRixJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxLQUEyRCxDQUFDO1FBQ25GLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBQztZQUMzQixJQUFJLFdBQVcsR0FBRyxJQUFJLHVCQUF1QixDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDN0UsV0FBVyxDQUFDLFFBQVEsR0FBRSxJQUFJLENBQUM7WUFDM0IsV0FBVyxDQUFDLFlBQVksR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3BDLDBEQUEwRDtZQUMxRCxXQUFXLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQztZQUM1QixxQkFBcUI7WUFDckIsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNuQixLQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ2hDLHFDQUFxQztpQkFDeEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDckI7SUFBQSxPQUFPLENBQUMsRUFBRTtRQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBckJELG9FQXFCQyJ9