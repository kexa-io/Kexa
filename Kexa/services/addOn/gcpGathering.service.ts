/*
    * Provider : gcp
    * Thumbnail : https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/google-cloud-square.png
    * Documentation : https://cloud.google.com/nodejs/docs/reference
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - tasks_queue
    *     - compute
    *     - storage
    *     - project
    *     - billingAccount
    *     - cluster
    *     - workflows
    *     - websecurity
    *     - connector
    *     - vmware-engine
    *     - namespace
    *     - certificate
    *     - secret
    *     - connectivity_test
    *     - resource_settings
    *     - redis_instance
    *     - os_config
    *     - org_policy_constraint
    *     - airflow_image_version
    *     - disk
    *     - compute_item
*/

import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { GCPResources } from "../../models/gcp/resource.models";
import {Storage} from "@google-cloud/storage";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import { GcpConfig } from "../../models/gcp/config.models";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("GcpLogger");

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////


export async function collectData(gcpConfig:GcpConfig[]): Promise<GCPResources[] | null> {
    let context = getContext();
    let resources = new Array<GCPResources>();
    let defaultPathCred = await getEnvVar("GOOGLE_APPLICATION_CREDENTIALS");
    for (let config of gcpConfig??[]) {
        setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        let prefix = config.prefix??(gcpConfig.indexOf(config)+"-");
        let gcpResources = {
            "bucket": null,
            "tasks_queue": null,
            "compute": null,
            "project": null,
            "billingAccount": null,
            "cluster": null,
            "workflow": null,
            "websecurity": null,
            "connector": null,
            "vmware_engine": null,
            "namespace": null,
            "secret": null,
            "connectivity_test": null,
            "resource_settings": null,
            "redis_instance": null,
            "os_config": null,
            "org_policy_contraint": null,
            "airflow_image_version": null,
            "notebook": null,
            "lineage_process": null,
            "dashboard": null,
            "identity_domain": null,
            "kms_crypto_key": null,
            "kms_key_ring": null,
            "domain_registration": null,
            "dns_zone": null,
            "pipeline": null,
            "certificate": null,
            "batch_job": null,
            "workload": null,
            "artifact_repository": null,
            "app_gateway": null,
            "disk": null,
            "compute_item": null
        } as GCPResources;
        let projectId = await getConfigOrEnvVar(config, "GOOGLE_PROJECT_ID", prefix);
        let googleCred = await getConfigOrEnvVar(config, "GOOGLE_APPLICATION_CREDENTIALS", prefix)
        if(projectId && googleCred) writeStringToJsonFile(googleCred, "./config/gcp.json");
        else{
            setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", defaultPathCred);
            projectId = JSON.parse(getFile(defaultPathCred)??"")?.project_id;
        }
        let regionsList = new Array<string>();
        await retrieveAllRegions(projectId, regionsList);
        if ('regions' in config) {
            const userRegions = config.regions as Array<string>;
            if (userRegions.length <= 0) {
                context?.log("GCP - No Regions found in Config, gathering all regions...")
                logger.info("GCP - No Regions found in Config, gathering all regions...");
            }
            else if (!(compareUserAndValidRegions(userRegions as Array<string>, regionsList, gcpConfig, config)))
                continue;
            else {
                regionsList = userRegions as Array<string>;
            }
        } else {
            context?.log("GCP - No Regions found in Config, gathering all regions...")
            logger.info("GCP - No Regions found in Config, gathering all regions...")
        }
        try {
            context?.log("- listing GCP resources -");
            logger.info("- listing GCP resources -");
            const promises = [
                listTasks(projectId, regionsList),
                listAllComputes(projectId),
                listAllBucket(),
                listAllProject(),
                getBillingAccount(projectId),
                listAllClusters(),
                listWorkflows(projectId),
                listWebSecurityConfig(projectId),
                listVpcConnectors(projectId, regionsList),
                listVMWareEngine(projectId),
                listNamespaces(projectId, regionsList),
                listSecrets(projectId),
                listConnectivityTests(projectId),
                listResourceSettings(projectId),
                listRedisInstances(projectId, regionsList),
                listOSConfig(projectId),
                listOrgPolicyContraints(projectId),
                listOrchestrationAirflow(projectId, regionsList),
                listNotebookInstances(projectId),
                listLineageProcesses(projectId),
                listDashboards(projectId),
                listIdentitiesDomain(projectId),
                listKMSCryptoKeys(projectId),
                listKMSKeyRings(projectId),
                listDomainsRegistration(projectId),
                listDnsZones(projectId),
                listDeliveryPipelines(projectId, regionsList),
                listCertificates(projectId),
                listBatchJobs(projectId, regionsList),
                listWorkloads(projectId),
                listArtifactsRepositories(projectId, regionsList),
                listAppGateways(projectId, regionsList),
                listPersistentDisks(projectId),
                listSSHKey(projectId)
        ];
            const [taskList, computeList, bucketList, projectList, billingAccountList,
                clusterList, workflowList, webSecurityList, connectorList,
                engineList, namespaceList, secretList,
                connectivityTestList, resourceSettingsList, redisIntanceList,
                os_configList, org_policy_contraintList, airflow_image_versionList,
                notebookList, lineage_processList, dashboardList, identity_domainList,
                kms_crypto_keyList, kms_key_ringList, domain_registrationList, dns_zoneList,
                pipelineList, certificateList, batchJobList, workloadList, artifactRepoList,
                app_gatewayList, diskList, compute_itemList] = await Promise.all(promises);
            
            context?.log("- listing cloud resources done -");
            logger.info("- listing cloud resources done -");

            ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
            //const client = new CloudTasksClient();

            gcpResources = {
                tasks_queue: taskList,
                compute: computeList,
                bucket: bucketList,
                project : projectList,
                billingAccount: billingAccountList,
                cluster: clusterList,
                workflow: workflowList,
                websecurity: webSecurityList,
                connector: connectorList,
                vmware_engine: engineList,
                namespace: namespaceList,
                secret: secretList,
                connectivity_test: connectivityTestList,
                resource_settings: resourceSettingsList,
                redis_instance: redisIntanceList,
                os_config: os_configList,
                org_policy_contraint: org_policy_contraintList,
                airflow_image_version: airflow_image_versionList,
                notebook: notebookList,
                lineage_process: lineage_processList,
                dashboard: dashboardList,
                identity_domain: identity_domainList,
                kms_crypto_key: kms_crypto_keyList,
                kms_key_ring: kms_key_ringList,
                domain_registration: domain_registrationList,
                dns_zone: dns_zoneList,
                pipeline: pipelineList,
                certificate: certificateList,
                batch_job: batchJobList,
                workload: workloadList,
                artifact_repository: artifactRepoList,
                app_gateway: app_gatewayList,
                disk: diskList,
                compute_item: compute_itemList
            };
        }
        catch (e) {
            logger.error("error in collectGCPData: " + projectId);
            logger.error(e);
        }
        deleteFile("./config/gcp.json");
        resources.push(gcpResources);
    }
    return resources ?? null;
}

///////////////////////////////////////////////     The following functions are used to gather informations
///// FUNCTIONS FOR ALL REGIONS GATHERING /////     from all required regions.
///////////////////////////////////////////////

function compareUserAndValidRegions(userRegions: Array<any>, validRegions: Array<string>, gcpConfig: any, config: any) {
    for (let i = 0; i < userRegions.length; i++) {
        if (validRegions.includes(userRegions[i]))
            continue;
        else {
            logger.error("GCP - Config '" + gcpConfig.indexOf(config) + "' Skipped - Regions '" + userRegions[i] + "' is not a valid GCP region.");
            return (false);
        }
    }
    logger.info("GCP - Config n°" + gcpConfig.indexOf(config) + " correctly loaded user regions.");
    return (true);
}
function addRegionGCP(response: any, region: string) {
    response.region = region;
    return response;
}
async function retrieveAllRegions(projectId: number, regionsList: Array<string>) {
    const {RegionsClient} = require('@google-cloud/compute').v1;
    try {
        const computeClient = new RegionsClient();
        const request = {
            project: projectId
        };
        const iterable = await computeClient.listAsync(request);
        for await (const response of iterable) {
            regionsList.push(response.name);
        }
    } catch (e) {
        logger.error("GCP : Error while retrieving all regions")
    }
}

/////////////////////////////////////////////////////////    This function is the main gathering function,
/////  ASYNC REGIONS GATHERING FOR FASTER EXECUTION /////    it iterate async to gather all.
/////////////////////////////////////////////////////////
async function executeAllRegions(projectId: number, serviceFunction: Function, client: any,
                                 regionsList: Array<string>, isIterable: Boolean) : Promise<Array<any>> {
    const processRegion = async (currentRegion: any) => {
        const parent = 'projects/' + projectId + '/locations/' + currentRegion;
        try {
            const jsonResponses = [];
            const request = { parent };
            if (!isIterable) {
                let response = await serviceFunction.call(client, request);
                let jsonTmp = JSON.parse(JSON.stringify(response));
                if (jsonTmp != null && jsonTmp.length > 0) {
                    jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                }
            } else {
                const iterable = await serviceFunction.call(client, request);
                for await (const response of iterable) {
                    let jsonTmp = JSON.parse(JSON.stringify(response));
                    if (jsonTmp != null && jsonTmp.length > 0) {
                        jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                    }
                }
            }
            return jsonResponses;
        } catch (e) {
            logger.warn(`GCP : Error while retrieving data in multiple regions - Region: ${currentRegion} not found or access not authorized for ${serviceFunction.name}`);
        }
    };
    const processingPromises = regionsList.map(processRegion);
    const jsonDataArrays = await Promise.all(processingPromises);

    const jsonData = jsonDataArrays.reduce((acc, jsonResponses) => {
        if (jsonResponses) {
            if (acc != null)
                acc.push(...jsonResponses);
        }
        return acc;
    }, []);
    if (jsonData)
        return jsonData ?? null;
    else
        return (new Array());
}

////////////////////////////////////////////////////////////////
//////   ALL SERVICES FUNCTIONS FOR RESOURCES GATHERING   //////
////////////////////////////////////////////////////////////////

const {CloudTasksClient} = require('@google-cloud/tasks').v2;
async function listTasks(projectId: number, regionsList: Array<string>): Promise<Array<any>|null> {
    let jsonData = [];
    try {
        const tasksClient = new CloudTasksClient();
        jsonData = await executeAllRegions(projectId, tasksClient.listQueuesAsync, tasksClient, regionsList, true);
    } catch (e) {
        logger.error("Error while retrieving GCP Tasks Queues");
    }
    return jsonData ?? null;
}

const compute = require('@google-cloud/compute');

async function listAllComputes(projectId: string): Promise<Array<any>|null> {
    let jsonData = [];

    const instancesClient = new compute.InstancesClient();
    const aggListRequest =  await instancesClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;

        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse(JSON.stringify(instances[i].metadata.items.length)));
            }
        }
    }
    logger.info("GCP Compute Listing Done");
    return jsonData ?? null;
}

async function listSSHKey(projectId: string): Promise<Array<any>|null> {
    let jsonData = [];

    const instancesClient = new compute.InstancesClient();
    const aggListRequest = await instancesClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;
        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse(JSON.stringify(instances[i].metadata?.items)));
            }
        }
    }
    return jsonData ?? null;
}
async function listPersistentDisks(projectId: any) {
    let jsonData = [];
    const disksClient = new compute.DisksClient();
    const aggListRequest =  await disksClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, diskObject] of aggListRequest) {
        const disks = diskObject.disks;

        if (disks && disks.length > 0) {
            for (let i = 0; i < disks.length; i++) {
                jsonData.push(JSON.parse(JSON.stringify(disks[i])));
            }
        }
    }
    logger.info("GCP Persistent Disks Listing Done");
    return jsonData ?? null;
}

async function listAllBucket(): Promise<Array<any>|null> {
    let jsonReturn = [];
    try {
        const storage = new Storage();
        const [buckets] = await storage.getBuckets();
        for (let i = 0; i < buckets.length; i++) {
            const current_bucket = await storage.bucket(buckets[i].name).get();
            const jsonData = JSON.parse(JSON.stringify(current_bucket));
            jsonReturn.push(jsonData);

        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Buckets Listing Done");
    return jsonReturn ?? null;
}

import { ClusterManagerClient } from '@google-cloud/container';
import {CloudBillingClient} from "@google-cloud/billing";
import {VpcAccessServiceClient} from "@google-cloud/vpc-access";

async function listAllClusters(): Promise<Array<any>|null> {
    let jsonData = [];

    try {
        const cnt = new ClusterManagerClient();
        const projectId = await cnt.getProjectId();
        const request = {
            projectId: projectId,
            zone: "-",
        };
        const [response] = await cnt.listClusters(request);
        jsonData = JSON.parse(JSON.stringify(response));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Clusters Listing Done");
    return jsonData ?? null;
}

const {ProjectsClient} = require('@google-cloud/resource-manager');
async function listAllProject(): Promise<Array<any>|null> {
    let jsonData = [];

    try {
        const client = new ProjectsClient();
        const projects = client.searchProjectsAsync();
        for await (const project of projects) {
            jsonData = JSON.parse(JSON.stringify(project));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Projects Listing Done");
    return jsonData ?? null;
}

async function getBillingAccount(projectId: any): Promise<Array<any>|null> {
    const {CloudBillingClient} = require('@google-cloud/billing');
    let jsonData = [];

    try {
        const client = new CloudBillingClient();
        const [accounts] = await client.listBillingAccounts({
            projectId,
        });
        for (const account of accounts) {
            jsonData = JSON.parse(JSON.stringify(account));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Billing Accounts Listing Done");
    return jsonData ?? null;
}

async function listWorkflows(projectId: any): Promise<Array<any>|null> {
    const {WorkflowsClient} = require('@google-cloud/workflows');
    let jsonData = [];
    try {
        const client = new WorkflowsClient();
        const [workflows] = await client.listWorkflows({
            parent: client.locationPath(projectId, '-'),
        });
        for (const workflow of workflows) {
            jsonData = JSON.parse(JSON.stringify(workflow));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Workflows Listing Done");
    return jsonData ?? null;
}

async function listWebSecurityConfig(projectId: any): Promise<Array<any>|null> {
    const { WebSecurityScannerClient } = require('@google-cloud/web-security-scanner');
    let jsonData = [];
    try {
        const client = new WebSecurityScannerClient();
        const stats = await client.listScanConfigs({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(JSON.stringify(stats));
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Web Security Configs Listing Done");
    return jsonData ?? null;
}

async function listVpcConnectors(projectId: any, regionsList: Array<string>): Promise<Array<any>|null> {
    const {VpcAccessServiceClient} = require('@google-cloud/vpc-access');
    let jsonData =  [];
    try {
        const client = new VpcAccessServiceClient();
        jsonData = await executeAllRegions(projectId, client.listConnectors, client, regionsList, false )
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP VPC Connectors Listing Done");
    return jsonData ?? null;
}

async function listVMWareEngine(projectId: any): Promise<Array<any>|null>  {
    const {VmwareEngineClient} = require('@google-cloud/vmwareengine').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';
    try {
        const vmwareengineClient = new VmwareEngineClient();
        const request = {
            parent,
        };
        const iterable = await vmwareengineClient.listVmwareEngineNetworksAsync(
            request
        );
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP VMWare Engine Listing Done");
    return jsonData ?? null;
}

async function listNamespaces(projectId: any, regionsList: Array<string>): Promise<Array<any>|null> { ///// KO REGION
    const {RegistrationServiceClient,} = require('@google-cloud/service-directory');
    let jsonData = [];

    try {
        const registrationServiceClient = new RegistrationServiceClient();
        jsonData = await executeAllRegions(projectId, registrationServiceClient.listNamespaces, registrationServiceClient,
            regionsList, true);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Namespaces Listing Done");
    return jsonData ?? null;
}

export async function listSecrets(projectId: any): Promise<Array<any>|null> {
    const {SecretManagerServiceClient,} = require('@google-cloud/secret-manager').v1;
    const parent = 'projects/globalInnovtech';
    let jsonData = [];

    try {
        const secretmanagerClient = new SecretManagerServiceClient();
        const request = { parent };
        const iterable = await secretmanagerClient.listSecretsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Secrets Listing Done");
    return jsonData ?? null;
}

async function listConnectivityTests(projectId: any): Promise<Array<any>|null>  {
    const {ReachabilityServiceClient} = require('@google-cloud/network-management');
    let jsonData = [];

    try {
        const client = new ReachabilityServiceClient();
        const tests = await client.listConnectivityTests({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse(JSON.stringify(tests));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Connectivity Tests Listing Done");
    return jsonData ?? null;
}

async function listResourceSettings(projectId: any): Promise<Array<any>|null> {
    let jsonData = [];

    const { ResourceSettingsServiceClient } = require('@google-cloud/resource-settings');

    try {
        const client = new ResourceSettingsServiceClient();
        const settings = await client.listSettings({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(JSON.stringify(settings));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Resources Settings Listing Done");
    return jsonData ?? null;
}

async function listRedisInstances(projectId: any, regionsList: Array<string>): Promise<Array<any>|null> {
    const {CloudRedisClient} = require('@google-cloud/redis');
    let jsonData = [];

    try {
        const client = new CloudRedisClient();
        jsonData = await executeAllRegions(projectId, client.listInstances, client, regionsList, false);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Redis Instances Listing Done");
    return jsonData ?? null;
}

async function listOSConfig(projectId: any): Promise<Array<any>|null> {
    const {OsConfigServiceClient} = require('@google-cloud/os-config');
    let jsonData = [];

    try {
        const client = new OsConfigServiceClient();
        const [deployments] = await client.listPatchDeployments({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(JSON.stringify(deployments));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP OS Config Listing Done");
    return jsonData ?? null;
}

async function listOrgPolicyContraints(projectId: any): Promise<Array<any>|null> {
    const {OrgPolicyClient} = require('@google-cloud/org-policy');
    let jsonData = [];

    try {
        const client = new OrgPolicyClient();
        const constraints = await client.listConstraints({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(JSON.stringify(constraints));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}

async function listOrchestrationAirflow(projectId: any, regionsList: Array<string>): Promise<Array<any> | null> {
    const {ImageVersionsClient} = require('@google-cloud/orchestration-airflow');
    let jsonData = [];

    try {
        const client = new ImageVersionsClient();
        jsonData = await executeAllRegions(projectId, client.listImageVersions, client, regionsList, false);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}

async function listNotebookInstances(projectId: any): Promise<Array<any> | null> {
    const {NotebookServiceClient} = require('@google-cloud/notebooks');
    let jsonData = [];

    try {
        const client = new NotebookServiceClient();
        const [instances] = await client.listInstances({
            parent: `projects/${projectId}/locations/-`,
        });
        for (const instance of instances) {
            jsonData = JSON.parse(JSON.stringify(instance));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Notebook Instances Listing Done");
    return jsonData ?? null;
}

async function listDashboards(projectId: any): Promise<Array<any> | null> {
    const { DashboardsServiceClient } = require('@google-cloud/monitoring-dashboards');
    const parent = 'projects/' + projectId;
    let jsonData = [];

    try {
        const ds = new DashboardsServiceClient();
        const [dashboards] = await ds.listDashboards({parent,});
        for (const dashboard of dashboards) {
            jsonData = JSON.parse(JSON.stringify(dashboard));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Dashboards Listing Done");
    return jsonData ?? null;
}

async function listIdentitiesDomain(projectId: any): Promise<Array<any> | null> {
    const { ManagedIdentitiesServiceClient } = require('@google-cloud/managed-identities');
    let jsonData = [];

    try {
        const client = new ManagedIdentitiesServiceClient();
        const domains = await client.listDomains({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse(JSON.stringify(domains));
    } catch (e) {
        logger.error(e)
    }
    logger.info("GCP Identities Domains Listing Done");
    return jsonData ?? null;
}

async function listLineageProcesses(projectId: any): Promise<Array<any> | null> {
    const {LineageClient} = require('@google-cloud/lineage').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];

    try {
        const lineageClient = new LineageClient();
        const request = {parent};
        const iterable = await lineageClient.listProcessesAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Lineage Processes Listing Done");
    return jsonData ?? null;
}

async function listKMSCryptoKeys(projectId: any): Promise<Array<any> | null> {
    const {KeyDashboardServiceClient} = require('@google-cloud/kms-inventory').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId;

    try {
        const inventoryClient = new KeyDashboardServiceClient();
        const request = {parent};
        const [response] = await inventoryClient.listCryptoKeys(request, {
            maxResults: 50,
            autoPaginate: false,
        });
        jsonData = JSON.parse(JSON.stringify(response));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP KMS Crypto Keys Listing Done");
    return jsonData ?? null;
}

async function listKMSKeyRings(projectId: any): Promise<Array<any> | null> {
    const {KeyManagementServiceClient} = require('@google-cloud/kms');
    let jsonData = [];

    try {
        const client = new KeyManagementServiceClient();
        const locationName = client.locationPath(projectId, "global");
        const [keyRings] = await client.listKeyRings({
            parent: locationName
        });
        for (const keyRing of keyRings) {
            jsonData = JSON.parse(JSON.stringify(keyRing));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP KMS Key Rings Listing Done");
    return jsonData ?? null;
}

async function listDomainsRegistration(projectId: any): Promise<Array<any> | null> {
    const {DomainsClient} = require('@google-cloud/domains');
    let jsonData = [];

    try {
        const client = new DomainsClient();
        const [registrations] = await client.listRegistrations({
            parent: `projects/${projectId}/locations/global`,
        });
        jsonData = JSON.parse(JSON.stringify(registrations));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Domains Resgitration Listing Done");
    return jsonData ?? null;
}

async function listDnsZones(projectId: any): Promise<Array<any> | null> {
    const {DNS} = require('@google-cloud/dns');
    let jsonData = [];

    try {
        const dns = new DNS();
        const [zones] = await dns.getZones();
        for (const zone of zones) {
            jsonData = JSON.parse(JSON.stringify(zone));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP DNS Zones Listing Done");
    return jsonData ?? null;
}

async function listDeliveryPipelines(projectId: any, regionsList: Array<string>): Promise<Array<any> | null> {
    const {CloudDeployClient} = require('@google-cloud/deploy').v1;
    let jsonData = [];

    try {
        const deployClient = new CloudDeployClient();
        jsonData = await executeAllRegions(projectId, deployClient.listDeliveryPipelinesAsync, deployClient, regionsList, true);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Delivery Pipelines Listing Done");
    return jsonData ?? null;
}

async function listCertificates(projectId: any): Promise<Array<any> | null> {
    const {CertificateManagerClient} = require('@google-cloud/certificate-manager').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/global';

    try {
        const certificatemanagerClient = new CertificateManagerClient();
        const request = { parent };
        const iterable = await certificatemanagerClient.listCertificatesAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Certificates Listing Done");
    return jsonData ?? null;
}

async function listBatchJobs(projectId: any, regionsList: Array<string>): Promise<Array<any> | null> {
    let jsonData = [];
    const {BatchServiceClient} = require('@google-cloud/batch').v1;

    try {
        const batchClient = new BatchServiceClient();
        jsonData = await executeAllRegions(projectId, batchClient.listJobsAsync, batchClient, regionsList, true);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Batch Jobs Listing Done");
    return jsonData ?? null;
}

async function listWorkloads(projectId: any): Promise<Array<any> | null> {

    const { AssuredWorkloadsServiceClient } = require('@google-cloud/assured-workloads');
    const {ProjectsClient} = require('@google-cloud/resource-manager').v3;
    let jsonData;

    try {
     /*   const resource = new ProjectsClient();
        const response = await resource.getProject(projectId);
        const client = new AssuredWorkloadsServiceClient();
        const [workloads] = await client.listWorkloads({
            parent: `organizations/${projectId}`,
        });
        for (const workload of workloads) {
            jsonData = JSON.parse(JSON.stringify(workload));
        }*/
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Workloads Listing Done");
    return jsonData ?? null;
}

async function listArtifactsRepositories(projectId: any, regionsList: Array<string>): Promise<Array<any> | null> {
    const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
    let jsonData = [];

    try {
        const client = new ArtifactRegistryClient();
        jsonData = await executeAllRegions(projectId, client.listRepositories, client, regionsList, false);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Artifacts Repositories Listing Done");
    return jsonData ?? null;
}

async function listAppGateways(projectId: any, regionsList: Array<string>): Promise<Array<any> | null> {
    const {AppGatewaysServiceClient} = require('@google-cloud/appgateways').v1;
    let jsonData = [];

    try {
        const appgatewaysClient = new AppGatewaysServiceClient();
        jsonData = await executeAllRegions(projectId, appgatewaysClient.listAppGatewaysAsync, appgatewaysClient, regionsList, true);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP App Gateways Listing Done");
    return jsonData ?? null;
}

/////////////////////////////////////////////////////////
/// THE FOLLOWINGS RESOURCES HAVE NOT BEEN TESTED YET ///
/////////////////////////////////////////////////////////
/*
async function listAppConnectors(projectId: any): Promise<Array<any> | null> {
    const {AppConnectorsServiceClient} = require('@google-cloud/appconnectors').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];

    try {
        const appconnectorsClient = new AppConnectorsServiceClient();
        const request = {parent};
        const iterable = await appconnectorsClient.listAppConnectorsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP App Connectors Listing Done");
    return jsonData ?? null;
}
*/
/*
async function listApiKeys(projectId: any): Promise<Array<any> | null> {
    const {ApiKeysClient} = require('@google-cloud/apikeys').v2;
    const parent = 'projects/' + projectId;
    let jsonData = [];

    try {
        const apikeysClient = new ApiKeysClient();
        const request = { parent };
        const iterable = await apikeysClient.listKeysAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Keys Listing Done");
    return jsonData ?? null;
}*/
/*
async function listApi(projectId: any): Promise<Array<any> | null> {
    const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
    let jsonData = [];

    try {
        const client = new ApiGatewayServiceClient();
        const [apis] = await client.listApis({
            parent: `projects/${projectId}/locations/global`,
        });
        for (const api of apis) {
            jsonData = JSON.parse(JSON.stringify(api));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Listing Done");
    return jsonData ?? null;
}*/
/*
async function listAccessPolicy(projectId: any): Promise<Array<any> | null> {
    const {AccessApprovalClient} = require('@google-cloud/access-approval');
    let jsonData = [];

    try {
        const client = new AccessApprovalClient();
        const requests = await client.listApprovalRequests({
            parent: `projects/${projectId}`,
        });
        jsonData = JSON.parse(JSON.stringify(requests));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Listing Done");
    return jsonData ?? null;
}
*/

// Workstations : timeout because no instance to be tested //
/*
async function listWorkstations(projectId: any, regionsList: Array<string>): Promise<Array<any>|null> { // KO
    const {WorkstationsClient} = require('@google-cloud/workstations').v1;
    let jsonData;
    try {
        const workstationsClient = new WorkstationsClient();
        jsonData = await executeAllRegions(projectId, workstationsClient.listWorkstationsAsync, workstationsClient, regionsList,true);
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Workstations Listing Done");
    return jsonData ?? null;
}
*/


// Storage Config : Deadline/Timeout //
/*
async function listStorageConfig(projectId: any): Promise<Array<any>|null> {
    const {StorageInsightsClient} = require('@google-cloud/storageinsights').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';

    try {
        const storageinsightsClient = new StorageInsightsClient();
        const request = {
            parent,
        };
        const iterable = await storageinsightsClient.listReportConfigsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Storage Configs Listing Done");
    return jsonData ?? null;
}
*/

// Private CA : Timeout //
/*
async function listPrivateCertificates(projectId: any): Promise<Array<any>|null> {
    const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
    let jsonData = [];

    try {
        const client = new CertificateAuthorityServiceClient();
        const res = await client.listCertificates({
            parent: `projects/${projectId}/locations/-/caPools/-`,
        });
        jsonData = JSON.parse(JSON.stringify(res));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Private Certificates Listing Done");
    return jsonData ?? null;
}
 */