import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface } from "@azure/arm-network";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import { info } from "console";
const { setLogLevel } = require("@azure/logger");
import env from "dotenv";
import * as azureFunctions from "./services/azureGathering.service";
import { Logger } from "tslog";
import * as analyse from "./services/analyse.service";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
env.config();                                             // reading environnement vars
const subscriptionId = process.env.SUBSCRIPTIONID;
const credential = new DefaultAzureCredential();
const rulesDirectory:string = "./src/rules";                  //the directory where to find the rules
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let vmList                   = new Array();
let rgList                   = new Array();
let diskList                 = new Array();
let nsgList                  = new Array();
let virtualNetworkList       = new Array();
let networkInterfacesList    = new Array();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function main() {
  logger.info("___________________________________________________________________________________________________"); 
  logger.info("___________________________________-= running checkinfra scan =-___________________________________");
  logger.info("___________________________________________________________________________________________________");   
  if(!subscriptionId) {
    throw new Error("- Please pass SUBSCRIPTIONID as env var");
  }else{
    //getting clients for azure
    resourcesClient = new ResourceManagementClient(credential, subscriptionId);
    computeClient   = new ComputeManagementClient(credential, subscriptionId);
    networkClient   = new NetworkManagementClient(credential, subscriptionId);
  }
  logger.info("- loading client microsoft azure done-");
  ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
  let nsgList = await azureFunctions.networkSecurityGroupListing(networkClient);
  let vmList = await azureFunctions.virtualMachinesListing(computeClient);
  let rgList = await azureFunctions.resourceGroupListing(resourcesClient);
  let diskList = await azureFunctions.disksListing(computeClient);
  let virtualNetworkList = await azureFunctions.virtualNetworksListing(networkClient);
  let networkInterfacesList = await azureFunctions.networkSecurityGroupListing(networkClient);
  console.log("vmList",vmList);
  console.log("rgList",rgList);
  console.log("diskList",diskList);
  console.log("nsgList",nsgList);
  console.log("virtualNetworkList",virtualNetworkList);
  console.log("networkInterfacesList",networkInterfacesList);

  // Analyse rules
  let settings = await analyse.mainAnalyse(rulesDirectory);
  console.log("settings",settings);
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logger.info("___________________________________________________________________________________________________"); 
  logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
  logger.info("___________________________________________________________________________________________________");  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();