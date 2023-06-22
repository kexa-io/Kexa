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
const analyse = __importStar(require("./services/analyse.service"));
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let vmList = new Array();
let rgList = new Array();
let diskList = new Array();
let nsgList = new Array();
let virtualNetworkList = new Array();
let networkInterfacesList = new Array();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    let settings = analyse.gatheringRules(rulesDirectory);
    let result = analyse.checkRules(settings, resources);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE2RTtBQUM3RSxvREFBdUc7QUFDdkcsd0RBQWdGO0FBQ2hGLDhDQUF5RDtBQUV6RCxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pELG9EQUF5QjtBQUN6QixrRkFBb0U7QUFDcEUsaUNBQStCO0FBQy9CLG9FQUFzRDtBQUd0RCx1SUFBdUk7QUFDdkksSUFBSSxhQUFzQyxDQUFDO0FBQzNDLElBQUksZUFBMEMsQ0FBRTtBQUNoRCxJQUFJLGFBQXNDLENBQUM7QUFDM0MsZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUE2Qyw2QkFBNkI7QUFDdkYsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQ0FBc0IsRUFBRSxDQUFDO0FBQ2hELE1BQU0sY0FBYyxHQUFVLGFBQWEsQ0FBQyxDQUFrQix1Q0FBdUM7QUFDckcsSUFBSSxVQUFVLEdBQWtCLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUUxRix1SUFBdUk7QUFDdkksSUFBSSxNQUFNLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxNQUFNLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxRQUFRLEdBQW1CLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxPQUFPLEdBQW9CLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxrQkFBa0IsR0FBUyxJQUFJ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