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
    if (!subscriptionId) {
        throw new Error("- Please pass SUBSCRIPTIONID as env var");
    }
    else {
        //getting clients for azure
        resourcesClient = new arm_resources_1.ResourceManagementClient(credential, subscriptionId);
        computeClient = new arm_compute_1.ComputeManagementClient(credential, subscriptionId);
        networkClient = new arm_network_1.NetworkManagementClient(credential, subscriptionId);
    }
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
    // Analyse rules
    let settings = await analyse.mainAnalyse(rulesDirectory);
    console.log("settings", settings);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
    logger.info("___________________________________________________________________________________________________");
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE2RTtBQUM3RSxvREFBdUc7QUFDdkcsd0RBQWdGO0FBQ2hGLDhDQUF5RDtBQUV6RCxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pELG9EQUF5QjtBQUN6QixrRkFBb0U7QUFDcEUsaUNBQStCO0FBQy9CLG9FQUFzRDtBQUN0RCx1SUFBdUk7QUFDdkksSUFBSSxhQUFzQyxDQUFDO0FBQzNDLElBQUksZUFBMEMsQ0FBRTtBQUNoRCxJQUFJLGFBQXNDLENBQUM7QUFDM0MsZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUE2Qyw2QkFBNkI7QUFDdkYsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQ0FBc0IsRUFBRSxDQUFDO0FBQ2hELE1BQU0sY0FBYyxHQUFVLGFBQWEsQ0FBQyxDQUFrQix1Q0FBdUM7QUFDckcsSUFBSSxVQUFVLEdBQWtCLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUUxRix1SUFBdUk7QUFDdkksSUFBSSxNQUFNLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxNQUFNLEdBQXFCLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxRQUFRLEdBQW1CLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxPQUFPLEdBQW9CLElBQUksS0FBSyxFQUFFLENBQUM7QUFDM0MsSUFBSSxrQkFBa0IsR0FBUyxJQUFJ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