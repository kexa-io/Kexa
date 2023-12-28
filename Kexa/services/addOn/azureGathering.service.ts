/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
	*	- ResourceManagementClient
	*	- getContinuationToken
	*	- SubscriptionClient
	*	- SqlManagementClient
	*	- StorageManagementClient
	*	- WebSiteManagementClient
	*	- MonitorClient
	*	- ServiceBusManagementClient
	*	- KeyVaultManagementClient
	*	- ComputeManagementClient
	*	- EventHubManagementClient
	*	- RedisManagementClient
	*	- PostgreSQLManagementClient
	*	- AzureMapsManagementClient
	*	- MariaDBManagementClient
	*	- AzureMediaServices
	*	- ContainerServiceClient
	*	- ContainerRegistryManagementClient
	*	- CosmosDBManagementClient
	*	- StreamAnalyticsManagementClient
	*	- ConsumptionManagementClient
	*	- RecoveryServicesBackupClient
	*	- ManagementLockClient
	*	- EventGridManagementClient
	*	- PolicyClient
	*	- IotCentralClient
	*	- DevTestLabsClient
	*	- LogicManagementClient
	*	- DnsManagementClient
	*	- PurviewManagementClient
	*	- ServiceFabricManagementClient
	*	- ApplicationClient
	*	- ManagedServiceIdentityClient
	*	- BillingManagementClient
	*	- SearchManagementClient
	*	- ManagementGroupsAPI
	*	- CdnManagementClient
	*	- MicrosoftResourceHealth
	*	- AzureMachineLearningWorkspaces
	*	- PrivateDnsManagementClient
	*	- ContainerInstanceManagementClient
	*	- AuthorizationManagementClient
	*	- KustoManagementClient
	*	- PowerBIEmbeddedManagementClient
	*	- HybridComputeManagementClient
	*	- SignalRManagementClient
	*	- AzureChangeAnalysisManagementClient
	*	- AttestationManagementClient
	*	- ImageBuilderClient
	*	- MarketplaceOrderingAgreements
	*	- CommunicationServiceManagementClient
	*	- CognitiveServicesManagementClient
	*	- PolicyInsightsClient
	*	- StorageCacheManagementClient
	*	- FrontDoorManagementClient
	*	- MixedRealityClient
	*	- PeeringManagementClient
	*	- FeatureClient
	*	- NetAppManagementClient
	*	- VMwareCloudSimple
	*	- HDInsightManagementClient
	*	- StorageImportExport
	*	- AzureMLWebServicesManagementClient
	*	- MicrosoftStorageSync
	*	- PowerBIDedicated
	*	- ACEProvisioningManagementPartnerAPI
	*	- DataCatalogRestClient
	*	- AzureMigrateV2
	*	- BatchManagementClient
	*	- MicrosoftSerialConsoleClient
	*	- RedisEnterpriseManagementClient
	*	- RelayAPI
	*	- TrafficManagerManagementClient
	*	- DomainServicesResourceProvider
	*	- PostgreSQLManagementFlexibleServerClient
	*	- SiteRecoveryManagementClient
	*	- APIKeys
	*	- AnalyticsItems
	*	- Annotations
	*	- ApplicationInsightsManagementClient
	*	- ApplicationInsightsManagementClientContext
	*	- ComponentAvailableFeatures
	*	- ComponentCurrentBillingFeatures
	*	- ComponentFeatureCapabilities
	*	- ComponentLinkedStorageAccountsOperations
	*	- ComponentQuotaStatus
	*	- Components
	*	- ExportConfigurations
	*	- Favorites
	*	- LiveToken
	*	- MyWorkbooks
	*	- Operations
	*	- ProactiveDetectionConfigurations
	*	- WebTestLocations
	*	- WebTests
	*	- WorkItemConfigurations
	*	- WorkbookTemplates
	*	- Workbooks
	*	- AppPlatformManagementClient
	*	- ManagementAssociations
	*	- ManagementConfigurations
	*	- OperationsManagementClient
	*	- OperationsManagementClientContext
	*	- Solutions
	*	- SourceControlConfigurationClient
	*	- AppConfigurationManagementClient
	*	- LabServicesClient
	*	- HanaInstances
	*	- HanaManagementClient
	*	- HanaManagementClientContext
	*	- SapMonitors
	*	- AzureStackManagementClient
	*	- AzureStackManagementClientContext
	*	- CustomerSubscriptions
	*	- Products
	*	- Registrations
	*	- Accounts
	*	- Extensions
	*	- Projects
	*	- VisualStudioResourceProviderClient
	*	- VisualStudioResourceProviderClientContext
	*	- DataBoxManagementClient
	*	- MachineLearningCompute
	*	- MachineLearningComputeManagementClient
	*	- MachineLearningComputeManagementClientContext
	*	- OperationalizationClusters
	*	- DataMigrationServiceClient
	*	- DataMigrationServiceClientContext
	*	- Files
	*	- ResourceSkus
	*	- ServiceTasks
	*	- Services
	*	- Tasks
	*	- Usages
	*	- ArtifactSources
	*	- AzureDeploymentManager
	*	- AzureDeploymentManagerContext
	*	- Rollouts
	*	- ServiceTopologies
	*	- ServiceUnits
	*	- Steps
	*	- ComputePolicies
	*	- DataLakeAnalyticsAccountManagementClient
	*	- DataLakeAnalyticsAccountManagementClientContext
	*	- DataLakeStoreAccounts
	*	- FirewallRules
	*	- Locations
	*	- StorageAccounts
	*	- IoTSpacesClient
	*	- IoTSpacesClientContext
	*	- IoTSpaces
	*	- BatchAIManagementClient
	*	- BatchAIManagementClientContext
	*	- Workspaces
	*	- Experiments
	*	- Jobs
	*	- FileServers
	*	- Clusters
	*	- VideoAnalyzerManagementClient
	*	- AzureQuotaExtensionAPI
	*	- Portal
	*	- AzureOrbital
	*	- DesktopVirtualizationAPIClient
	*	- LoadTestClient
	*	- CustomLocationsManagementClient
	*	- MLTeamAccountManagementClient
	*	- MLTeamAccountManagementClientContext
	*	- ServiceFabricMeshManagementClient
	*	- ServiceFabricMeshManagementClientContext
	*	- Secret
	*	- SecretValueOperations
	*	- Volume
	*	- Network
	*	- Gateway
	*	- Application
	*	- Service
	*	- ServiceReplica
	*	- CodePackage
	*	- AzureMLCommitmentPlansManagementClient
	*	- AzureMLCommitmentPlansManagementClientContext
	*	- Skus
	*	- CommitmentAssociations
	*	- CommitmentPlans
	*	- UsageHistory
	*	- DnsResolverManagementClient
	*	- DataBoxEdgeManagementClient
	*	- DataBoxEdgeManagementClientContext
	*	- Devices
	*	- Alerts
	*	- BandwidthSchedules
	*	- OperationsStatus
	*	- Orders
	*	- Roles
	*	- Shares
	*	- StorageAccountCredentials
	*	- Triggers
	*	- Users
	*	- MobileNetworkManagementClient
	*	- NetworkManagementClient
	*	- SynapseManagementClient
	*	- MySQLManagementClient
	*	- SecurityCenter
	*	- AzureBotService
	*	- TemplateSpecsClient
	*	- ManagementLinkClient
	*	- ResourceMoverServiceAPI
	*	- AzureVMwareSolutionAPI
	*	- MicrosoftDatadogClient
	*	- IotHubClient
	*	- AzureStackHCIClient
	*	- MicrosoftSupport
	*	- MachineLearningWorkspacesManagementClient
	*	- OperationalInsightsManagementClient
	*	- ActivityOperations
	*	- AgentRegistrationInformation
	*	- AutomationAccountOperations
	*	- AutomationClient
	*	- AutomationClientContext
	*	- CertificateOperations
	*	- ConnectionOperations
	*	- ConnectionTypeOperations
	*	- CredentialOperations
	*	- DscCompilationJobOperations
	*	- DscCompilationJobStream
	*	- DscConfigurationOperations
	*	- DscNodeConfigurationOperations
	*	- DscNodeOperations
	*	- Fields
	*	- HybridRunbookWorkerGroupOperations
	*	- JobOperations
	*	- JobScheduleOperations
	*	- JobStreamOperations
	*	- Keys
	*	- LinkedWorkspaceOperations
	*	- ModuleOperations
	*	- NodeCountInformation
	*	- NodeReports
	*	- ObjectDataTypes
	*	- Python2Package
	*	- RunbookDraftOperations
	*	- RunbookOperations
	*	- ScheduleOperations
	*	- SoftwareUpdateConfigurationMachineRuns
	*	- SoftwareUpdateConfigurationRuns
	*	- SoftwareUpdateConfigurations
	*	- SourceControlOperations
	*	- SourceControlSyncJobOperations
	*	- SourceControlSyncJobStreams
	*	- StatisticsOperations
	*	- TestJobOperations
	*	- TestJobStreams
	*	- VariableOperations
	*	- WatcherOperations
	*	- WebhookOperations
	*	- ResourceGraphClient
	*	- ResourceGraphClientContext
	*	- RateCard
	*	- UsageAggregates
	*	- UsageManagementClient
	*	- UsageManagementClientContext
	*	- ConfluentManagementClient
	*	- ServicemapManagementClient
	*	- ServicemapManagementClientContext
	*	- Machines
	*	- Processes
	*	- Ports
	*	- ClientGroups
	*	- Maps
	*	- Summaries
	*	- MachineGroups
	*	- OpenEnergyPlatformManagementServiceAPIs
	*	- ApiManagementClient
	*	- AvailabilityGroupListeners
	*	- SqlVirtualMachineGroups
	*	- SqlVirtualMachineManagementClient
	*	- SqlVirtualMachineManagementClientContext
	*	- SqlVirtualMachines
	*	- RecoveryServicesClient
	*	- AzureDatabricksManagementClient
	*	- DataFactoryManagementClient
	*	- TimeSeriesInsightsClient
	*	- AzureDigitalTwinsManagementClient
	*	- AzureReservationAPI
	*	- WebPubSubManagementClient
	*	- NotificationHubsManagementClient
	*	- ConnectedKubernetesClient
	*	- AdvisorManagementClient
	*	- HealthbotClient
	*	- AzureAnalysisServices
	*	- HealthcareApisManagementClient
	*	- CustomerInsightsManagementClient
	*	- IotDpsClient
	*	- DevSpacesManagementClient
	*	- MySQLManagementFlexibleServerClient
	*	- SecurityInsights
	*	- ContainerAppsAPIClient
	*	- ChangesClient
	*	- ServiceLinkerManagementClient
	*	- ConfidentialLedgerClient
	*	- DeviceUpdate
	*	- DynatraceObservability
	*	- EducationManagementClient
	*	- AzureDedicatedHSMResourceProvider
	*	- ExternalIdentitiesConfigurationClient
	*	- DashboardManagementClient
	*	- Scvmm
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////
//// RETRIEVING ALL IMPORTS & CLIENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////


import { ServiceClient } from "@azure/core-client";
import * as AzureImports from "./imports/azurePackage.import";

let allClients: AzureClients = {};

for (const key of Object.keys(AzureImports)) {
    const currentItem = (AzureImports as { [key: string]: unknown })[key];
    const clientsFromModule = extractClients(currentItem);
    allClients = { ...allClients, ...clientsFromModule };
}


interface AzureClients {
  [key: string]: any;
}

function extractClients(module: any): AzureClients {
  const clients: AzureClients = {};
  Object.keys(module).forEach((key) => {
      if ((module[key] instanceof Function && module[key].prototype !== undefined)) {
        clients[key] = module[key];
      }
  });
  return clients;
}

import { 
    NetworkSecurityGroup
} from "@azure/arm-network";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import {StorageAccount, StorageManagementClient} from "@azure/arm-storage";
import { BlobServiceClient } from "@azure/storage-blob";

const clientConstructors: Record<string, any> = {
    ResourceManagementClient,
};
Object.assign(clientConstructors, allClients);


import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";

import {getContext, getNewLogger} from "../logger.service";
import { Logger } from "azure";
const logger = getNewLogger("AzureLogger");


////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<Object[]|null>{

    console.log(azureConfig);
    let context = getContext();
    let resources = new Array<Object>();
    for(let config of azureConfig??[]){
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix??(azureConfig.indexOf(config).toString());
        try {
            logger.debug("prefix: " + prefix);
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await getConfigOrEnvVar(config, "AZURECLIENTID", prefix);
            if(azureClientId) setEnvVar("AZURE_CLIENT_ID", azureClientId);
            else logger.warn(prefix + "AZURECLIENTID not found");
            let azureClientSecret = await getConfigOrEnvVar(config, "AZURECLIENTSECRET", prefix);
            if(azureClientSecret) setEnvVar("AZURE_CLIENT_SECRET", azureClientSecret);
            else logger.warn(prefix + "AZURECLIENTSECRET not found");
            let azureTenantId = await getConfigOrEnvVar(config, "AZURETENANTID", prefix);
            if(azureTenantId) setEnvVar("AZURE_TENANT_ID", azureTenantId);
            else logger.warn(prefix + "AZURETENANTID not found");
            let UAI = {}
            let useAzureIdentity = await getConfigOrEnvVar(config, "USERAZUREIDENTITYID", prefix);
            if(useAzureIdentity) UAI = {managedIdentityClientId: useAzureIdentity};
            const credential = new DefaultAzureCredential();

            if(!subscriptionId) {
                throw new Error("- Please pass "+ prefix + "SUBSCRIPTIONID in your config file");
            } else {
                context?.log("- loading client microsoft azure done-");
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
                interface AzureRet {
                    [key: string]: any;
                }
                const azureRet: AzureRet = {};
                for (const clientService in allClients) {
                    const constructor = clientConstructors[clientService];
                    const clientName = constructor.name;
                    try {
                        azureRet[clientName] = await callGenericClient(createGenericClient(constructor, credential, subscriptionId));
                    } catch (e) {
                        logger.debug("Error constructing client", e);
                    }
                }
                resources.push(azureRet);
            }
        } catch(e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix))??null);
            logger.error(e);
        }
    }
    return resources??null;
}
  
  
//get service principal key information
export async function getSPKeyInformation(credential: DefaultAzureCredential, subscriptionId: string): Promise<any> {
    const { GraphRbacManagementClient } = require("@azure/graph");
    logger.info("starting getSPKeyInformation");
    try {
        const client = new GraphRbacManagementClient(credential,subscriptionId);
        const resultList = new Array<any>;
        for await (const item of client.servicePrincipals.list('')) {
            resultList.push(item);
        }
        return resultList;
    } catch (err) {
        logger.debug("error in getSPKeyInformation:"+err);
        return null;
    }
}

export async function listAllBlob(client:StorageManagementClient, credentials: any): Promise<Array<StorageAccount>|null> {
    logger.info("starting listAllBlob");

    try {
        const resultList = new Array<ResourceGroup>;
        console.log("storage :", test);
        for await (let item of client.storageAccounts.list()){
            resultList.push(item);
            const blobServiceClient = new BlobServiceClient(
                `https://${item.name}.blob.core.windows.net`,
                credentials
            );
            for await (const container of blobServiceClient.listContainers()) {
                console.log(`Container: ${container.name}`);
                for await (const blob of blobServiceClient.getContainerClient(container.name).listBlobsFlat()) {
                    console.log(` - Blob: ${blob.name}`);
                    // Process each blob as needed
                }
            }
        }
        return resultList;
    }catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }
}

export async function networkSecurityGroup_analyse(nsgList: Array<NetworkSecurityGroup>): Promise<Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>|null> {
    try {
        const resultList = new Array<ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass>;
        for await (let item of nsgList){
            let nsgAnalysed = new ckiNetworkSecurityClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            nsgAnalysed.securityLevel=0;
            resultList.push(nsgAnalysed);
        }
        return resultList;
    }catch (e) {
        logger.debug("error" + e);
        return null;
    }  
}

function createGenericClient<T>(Client: new (credential: any, subscriptionId: any) => T, credential: any, subscriptionId: any): T {
    return new Client(credential, subscriptionId);
}

async function callGenericClient(client: any) {
    let results = [];
    logger.info("starting " + client.constructor.name + " Listing");
    results.push(await listAllResources(client));
    return results;
}

async function listAllResources(client: any) {
    logger.trace("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);
    logger.silly("Properties of client:" + client);
    logger.silly(properties);

    const resultList: Record<string, any> = {};

    const promises = properties.map(async (element) => {
        type StatusKey = keyof typeof client;
        let key: StatusKey = element;
        const methods = ["listAll", "list"];

        if (client[key]) {
            await Promise.all(
                methods.map(async (method) => {
                    const resource = client[key];
                    if (typeof resource === 'object' && typeof resource[method as keyof typeof resource] === 'function') {
                        const gotMethod = resource[method as keyof typeof resource] as (...args: any[]) => any;
                        const numberOfArgs = gotMethod.length;
                        if (numberOfArgs > 2) {
                            logger.debug(`Function ${key as string}.${method} requires ${numberOfArgs} arguments.`);
                            return;
                        }
                        const keyStr = key as string;
                        const toExec = "resourcesClient." + (key as string) + "." + method + "()";
                        logger.trace("To exec: " + toExec);
                        let resultObject: Record<string, any> = {};
                        try {
                            resultObject = await resource[method]();
                            // IS .VALUE ALWAYS HERE IN A GOOD RESPONSE??
                            resultList[keyStr] = resultObject.value ? resultObject.value : [];
                           // resultList[keyStr] = resultObject;
                        } catch (e) {
                            logger.debug("Error on function :", e);
                        }
                    } else {
                        logger.debug(`Invalid property ${key as string} or function call ${method}.`);
                        return;
                    }
                })
            );
        }
    });
    await Promise.all(promises);
    return resultList;
}
