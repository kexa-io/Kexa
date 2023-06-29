import { ComputeManagementClient, VirtualMachine } from "@azure/arm-compute";
import { NetworkManagementClient, VirtualNetwork, Subnet, NetworkInterface } from "@azure/arm-network";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { setLogLevel } = require("@azure/logger");
import env from "dotenv";
import * as azureFunctions from "./services/azureGathering.service";
import { Logger } from "tslog";
import { AzureResources } from "./models/azure/resource.models";
import { ProviderResource } from "./models/providerResource.models";
import { checkRules, gatheringRules } from "./services/analyse.service";
import { alertGlobal } from "./services/alerte.service";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let computeClient: ComputeManagementClient;
let resourcesClient : ResourceManagementClient ;
let networkClient: NetworkManagementClient;
env.config();                                             // reading environnement vars
const rulesDirectory:string = "./src/rules";                  //the directory where to find the rules
let debug_mode = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "globalLogger" });


async function main() {
  logger.info("___________________________________________________________________________________________________"); 
  logger.info("___________________________________-= running checkinfra scan =-___________________________________");
  logger.info("___________________________________________________________________________________________________"); 
  const subscriptionId = process.env.SUBSCRIPTIONID;
  const credential = new DefaultAzureCredential();
  let azureResource: AzureResources;  
  if(!subscriptionId) {
    throw new Error("- Please pass SUBSCRIPTIONID as env var");
  }else{
    //getting clients for azure
    resourcesClient = new ResourceManagementClient(credential, subscriptionId);
    computeClient   = new ComputeManagementClient(credential, subscriptionId);
    networkClient   = new NetworkManagementClient(credential, subscriptionId);
    logger.info("- loading client microsoft azure done-");
    ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
    let nsgList = await azureFunctions.networkSecurityGroupListing(networkClient);
    let vmList = await azureFunctions.virtualMachinesListing(computeClient);
    let rgList = await azureFunctions.resourceGroupListing(resourcesClient);
    let diskList = await azureFunctions.disksListing(computeClient);
    let virtualNetworkList = await azureFunctions.virtualNetworksListing(networkClient);
    let networkInterfacesList = await azureFunctions.networkSecurityGroupListing(networkClient);

    //const K8sClientAzurenpm = new ConnectedKubernetesClient(credential, subscriptionId);
    //let k8sListAzurenpm = await K8sClientAzurenpm.connectedClusterOperations.listBySubscription();
    //console.log("k8sListAzurenpm",k8sListAzurenpm);
    //console.log("k8sListAzurenpm",k8sListAzurenpm.next);
    //console.log("k8sListAzurenpm",k8sListAzurenpm.byPage);
    //console.log("K8sClientAzurenpm",K8sClientAzurenpm);
    //const resArray = new Array();
    //for await (let item of K8sClientAzurenpm.connectedClusterOperations.listBySubscription()) {
    //  resArray.push(item);
    //}
    //console.log(resArray);
//
    //const k8s = require('@kubernetes/client-node');
//
    //const kc = new k8s.KubeConfig();
    //kc.loadFromDefault();
//
    //const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    //const k8sApApps = kc.makeApiClient(k8s.AppsV1Api);
    //console.log("k8sApiCore",k8sApiCore.authentications.default);
    //console.log("k8sApiList",await k8sApiCore.listNamespacedService("aks-dv-innovtech-global-01"));
    //console.log("k8sApApps",k8sApApps);
//
    //k8sApiCore.listNamespacedPod("aks-dv-innovtech-global-01 ").then((res: any) => {
    //    console.log(res.body);
    //});

    console.log("vmList",vmList);
    console.log("rgList",rgList);
    console.log("diskList",diskList);
    console.log("nsgList",nsgList);
    console.log("virtualNetworkList",virtualNetworkList);
    console.log("networkInterfacesList",networkInterfacesList);
    azureResource = {
      "vm": vmList,
      "rg": rgList,
      "disk": diskList,
      "nsg": nsgList,
      "virtualNetwork": virtualNetworkList,
      "networkInterfaces": networkInterfacesList
    } as AzureResources;
  }

  let resources = {
    "azure": azureResource??null,
    "gcp": null,
    "aws": null,
    "ovh": null
  } as ProviderResource;

  // Analyse rules
  let settings = gatheringRules(rulesDirectory);
  settings.forEach(setting => {
    let result = checkRules(setting.rules, resources, setting.alert);
    if(setting.alert.global.enabled){
      alertGlobal(result, setting.alert.global);
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