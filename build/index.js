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
const arm_compute_1 = require("@azure/arm-compute");
const arm_network_1 = require("@azure/arm-network");
const arm_resources_1 = require("@azure/arm-resources");
const identity_1 = require("@azure/identity");
const { setLogLevel } = require("@azure/logger");
const dotenv_1 = __importDefault(require("dotenv"));
const azureFunctions = __importStar(require("./services/azureGathering.service"));
const tslog_1 = require("tslog");
const analyse_service_1 = require("./services/analyse.service");
const alerte_service_1 = require("./services/alerte.service");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let computeClient;
let resourcesClient;
let networkClient;
dotenv_1.default.config(); // reading environnement vars
const subscriptionId = process.env.SUBSCRIPTIONID;
const credential = new identity_1.DefaultAzureCredential();
const rulesDirectory = "./src/rules"; //the directory where to find the rules
let debug_mode = 2;
const logger = new tslog_1.Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });
async function main() {
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
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
        let nsgList = await azureFunctions.networkSecurityGroupListing(networkClient);
        let vmList = await azureFunctions.virtualMachinesListing(computeClient);
        let rgList = await azureFunctions.resourceGroupListing(resourcesClient);
        let diskList = await azureFunctions.disksListing(computeClient);
        let virtualNetworkList = await azureFunctions.virtualNetworksListing(networkClient);
        let networkInterfacesList = await azureFunctions.networkSecurityGroupListing(networkClient);
        console.log("vmList", vmList);
        console.log("rgList", rgList);
        console.log("diskList", diskList);
        console.log("nsgList", nsgList);
        console.log("virtualNetworkList", virtualNetworkList);
        console.log("networkInterfacesList", networkInterfacesList);
        azureResource = {
            "vm": vmList,
            "rg": rgList,
            "disk": diskList,
            "nsg": nsgList,
            "virtualNetwork": virtualNetworkList,
            "networkInterfaces": networkInterfacesList
        };
    }
    let resources = {
        "azure": azureResource ?? null,
        "gcp": null,
        "aws": null,
        "ovh": null
    };
    // Analyse rules
    let settings = (0, analyse_service_1.gatheringRules)(rulesDirectory);
    settings.forEach(setting => {
        let result = (0, analyse_service_1.checkRules)(setting.rules, resources, setting.alert);
        if (setting.alert.global.enabled) {
            (0, alerte_service_1.alertGlobal)(result, setting.alert.global);
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE2RTtBQUM3RSxvREFBdUc7QUFDdkcsd0RBQWdGO0FBQ2hGLDhDQUF5RDtBQUN6RCxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pELG9EQUF5QjtBQUN6QixrRkFBb0U7QUFDcEUsaUNBQStCO0FBRy9CLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsdUlBQXVJO0FBQ3ZJLElBQUksYUFBc0MsQ0FBQztBQUMzQyxJQUFJLGVBQTBDLENBQUU7QUFDaEQsSUFBSSxhQUFzQyxDQUFDO0FBQzNDLGdCQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBNkMsNkJBQTZCO0FBQ3ZGLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksaUNBQXNCLEVBQUUsQ0FBQztBQUNoRCxNQUFNLGNBQWMsR0FBVSxhQUFhLENBQUMsQ0FBa0IsdUNBQXVDO0FBQ3JHLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUcxRixLQUFLLFVBQVUsSUFBSTtJQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxJQUFJLGFBQTZCLENBQUM7SUFDbEMsSUFBRyxDQUFDLGNBQWMsRUFB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