import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface } from "@azure/arm-network";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import { info } from "console";
const { setLogLevel } = require("@azure/logger");
import env from "dotenv";
import * as azureFunctions from "./library/azureFunctions";
import { Logger } from "tslog";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let computeclient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkclient: NetworkManagementClient;
env.config();                                             // reading environnement vars
const subscriptionId = process.env.SUBSCRIPTIONID;
const credential = new DefaultAzureCredential();
const rulesDirectory:string = "./src/rules";                  //the directory where to find the rules
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let vm_list                   = new Array();
let rg_list                   = new Array();
let disk_list                 = new Array();
let nsg_list                  = new Array();
let virtualnetwork_list       = new Array();
let networkInterfaces_list    = new Array();
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
    computeclient   = new ComputeManagementClient(credential, subscriptionId);
    networkclient   = new NetworkManagementClient(credential, subscriptionId);
  }
  logger.info("- loading client microsoft azure done-");
  ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
  let nsg_list = await azureFunctions.networkSecurityGroup_listing(networkclient);
  let vm_list = await azureFunctions.virtualMachines_listing(computeclient);
  let rg_list = await azureFunctions.resourceGroup_listing(resourcesClient);
  let disk_list = await azureFunctions.disks_listing(computeclient);
  let virtualnetwork_list = await azureFunctions.virtualNetworks_listing(networkclient);
  let networkInterfaces_list = await azureFunctions.networkSecurityGroup_listing(networkclient);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // listing nsg
  // logger.debug("listing nsg");
  // logger.debug(nsg_list);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Analyse rules
  let analyse_list = await azureFunctions.mainAnalyse(rulesDirectory);
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logger.info("___________________________________________________________________________________________________"); 
  logger.info("_______________________________________-= End checkinfra scan =-___________________________________");
  logger.info("___________________________________________________________________________________________________");  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
logger.info("Main.");
main();