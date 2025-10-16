/*
    * Provider : gcp
    * Thumbnail : https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/events/google-cloud-square.png
    * Documentation : https://cloud.google.com/nodejs/docs/reference
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - tasks_queue
    *     - compute
    *     - bucket
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
    *     - tags_keys
*/

import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { GCPResources } from "../../models/gcp/resource.models";
import {Storage} from "@google-cloud/storage";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import { GcpConfig } from "../../models/gcp/config.models";
import { jsonStringify } from '../../helpers/jsonStringify';

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("GcpLogger");
let currentConfig: GcpConfig;

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(gcpConfig:GcpConfig[]): Promise<GCPResources[] | null> {
    let context = getContext();
    let resources = new Array<GCPResources>();
    let defaultPathCred = await getEnvVar("GOOGLE_APPLICATION_CREDENTIALS");
    for (let config of gcpConfig??[]) {
        currentConfig = config;
        let prefix = config.prefix??(gcpConfig.indexOf(config).toString());
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
            "compute_item": null,
            "tags_keys": null
        } as GCPResources;
        let projectId = await getConfigOrEnvVar(config, "GOOGLE_PROJECT_ID", prefix);
        let googleCred = await getConfigOrEnvVar(config, "GOOGLE_APPLICATION_CREDENTIALS", prefix);
        let originalCredPath = defaultPathCred;
        let credentialsObject = null;
        
         // check if google cred is a path or a json
        if (googleCred && typeof googleCred === 'string' && googleCred.includes(".json")) {
            setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", googleCred);
        }
        else if (projectId && googleCred) {
            try {
                credentialsObject = JSON.parse(googleCred);
                setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "");
            } catch (e) {
                logger.error("GCP - Failed to parse credential JSON");
                continue;
            }
        }
        else {
            setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", defaultPathCred);
            if (defaultPathCred) {
                const credentials = JSON.parse(getFile(defaultPathCred)??"");
                projectId = credentials?.project_id;
            }else{
                logger.error("GCP - No Google Credential found in Config, please provide a path to a valid Google Credential JSON file.");
                continue;
            }
        }
        let regionsList = new Array<string>();
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
            context?.log("GCP - No Regions found in Config, gathering all regions...");
            logger.info("GCP - No Regions found in Config, gathering all regions...");
            await retrieveAllRegions(projectId, regionsList, credentialsObject); 
        }
        try {
            context?.log("- listing GCP resources -");
            logger.info("- listing GCP resources -");
            const promises = [
                listTasks(projectId, regionsList, credentialsObject),
                listAllComputes(projectId, credentialsObject),
                listAllBucket(credentialsObject),
                listAllProject(credentialsObject),
                getBillingAccount(projectId, credentialsObject),
                listAllClusters(credentialsObject),
                listWorkflows(projectId, credentialsObject),
                listWebSecurityConfig(projectId, credentialsObject),
                listVpcConnectors(projectId, regionsList, credentialsObject),
                listVMWareEngine(projectId, credentialsObject),
                listNamespaces(projectId, regionsList, credentialsObject),
                listSecrets(projectId, credentialsObject),
                listConnectivityTests(projectId, credentialsObject),
                listResourceSettings(projectId, credentialsObject),
                listRedisInstances(projectId, regionsList, credentialsObject),
                listOSConfig(projectId, credentialsObject),
                listOrgPolicyContraints(projectId, credentialsObject),
                listOrchestrationAirflow(projectId, regionsList, credentialsObject),
                listNotebookInstances(projectId, credentialsObject),
                listLineageProcesses(projectId, credentialsObject),
                listDashboards(projectId, credentialsObject),
                listIdentitiesDomain(projectId, credentialsObject),
                listKMSCryptoKeys(projectId, credentialsObject),
                listKMSKeyRings(projectId, credentialsObject),
                listDomainsRegistration(projectId, credentialsObject),
                listDnsZones(credentialsObject),
                listDeliveryPipelines(projectId, regionsList, credentialsObject),
                listCertificates(projectId, credentialsObject),
                listBatchJobs(projectId, regionsList, credentialsObject),
                listWorkloads(projectId, credentialsObject),
                listArtifactsRepositories(projectId, regionsList, credentialsObject),
                listAppGateways(projectId, regionsList, credentialsObject),
                listPersistentDisks(projectId, credentialsObject),
                listSSHKey(projectId, credentialsObject),
                listTagsKeys(projectId, regionsList, credentialsObject)
        ];
            const [taskList, computeList, bucketList, projectList, billingAccountList,
                clusterList, workflowList, webSecurityList, connectorList,
                engineList, namespaceList, secretList,
                connectivityTestList, resourceSettingsList, redisIntanceList,
                os_configList, org_policy_contraintList, airflow_image_versionList,
                notebookList, lineage_processList, dashboardList, identity_domainList,
                kms_crypto_keyList, kms_key_ringList, domain_registrationList, dns_zoneList,
                pipelineList, certificateList, batchJobList, workloadList, artifactRepoList,
                app_gatewayList, diskList, compute_itemList, tags_keysList] = await Promise.all(promises);
            
            context?.log("- listing cloud resources done -");
            logger.info("- listing cloud resources done -");

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
                compute_item: compute_itemList,
                tags_keys: tags_keysList
            };
            console.log(gcpResources['project']);
        }
        catch (e) {
            logger.error("error in collectGCPData: " + projectId);
            logger.error(e);
        } finally {
            if (originalCredPath) {
                setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", originalCredPath);
            }
        }
        resources.push(gcpResources);
    }
    return resources ?? null;
}


function createClientWithCredentials(ClientClass: any, credentialsObject?: any) {
    if (credentialsObject) {
        return new ClientClass({
            credentials: credentialsObject,
            projectId: credentialsObject.project_id
        });
    }
    return new ClientClass();
}

const mutePaginationWarning = process.emitWarning;
process.emitWarning = function(warning, type, code, ctor) {
    if (code === 'GOPAGINATION' || (typeof warning === 'string' && warning.includes('Autopaginate will always be set to false'))) {
        return; // mute
    }
    return mutePaginationWarning.call(this, warning, type, code, ctor);
};


///////////////////////////////////////////////   
///// FUNCTIONS FOR ALL REGIONS GATHERING /////  
///////////////////////////////////////////////

function compareUserAndValidRegions(userRegions: Array<any>, validRegions: Array<string>, gcpConfig: any, config: any) {
    for (let i = 0; i < userRegions.length; i++) {
        if (validRegions.includes(userRegions[i]))
            continue;
        else {
            logger.warn("GCP - Config '" + gcpConfig.indexOf(config) + "' Skipped - Regions '" + userRegions[i] + "' is not a valid GCP region.");
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

async function retrieveAllRegions(projectId: string, regionsList: Array<string>, credentialsObject?: any) {
    const {RegionsClient} = require('@google-cloud/compute').v1;
    try {
        const computeClient = createClientWithCredentials(RegionsClient, credentialsObject);
        const request = {
            project: projectId
        };
        const [regions] = await computeClient.list(request);
        if (regions && Array.isArray(regions)) {
            for (const region of regions) {
                if (region.name) {
                    regionsList.push(region.name);
                }
            }
        }
    } catch (e) {
        logger.debug("GCP : Error while retrieving all regions", e)
    }
}

/////////////////////////////////////////////////////////
/////  ASYNC REGIONS GATHERING FOR FASTER EXECUTION ///// 
/////////////////////////////////////////////////////////
async function executeAllRegions(projectId: string, serviceFunction: Function, client: any,
                                 regionsList: Array<string>, isIterable: Boolean) : Promise<Array<any>> {
                                    
    const processRegion = async (currentRegion: any) => {
        const parent = 'projects/' + projectId + '/locations/' + currentRegion;
        try {

            const jsonResponses = [];
            const request = { parent };
            if (!isIterable) {
                let response = await serviceFunction.call(client, request);
                let jsonTmp = JSON.parse(jsonStringify(response));
                if (jsonTmp != null && jsonTmp.length > 0) {
                    jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                }
            } else {
                const [results] = await serviceFunction.call(client, request);
                if (results && Array.isArray(results)) {
                    for (const response of results) {
                        let jsonTmp = JSON.parse(jsonStringify(response));
                        if (jsonTmp != null && jsonTmp.length > 0) {
                            jsonResponses.push(addRegionGCP(jsonTmp, currentRegion));
                        }
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
async function listTasks(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("tasks_queue")) return null;
    let jsonData = [];
    try {
        const tasksClient = createClientWithCredentials(CloudTasksClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, tasksClient.listQueues, tasksClient, regionsList, false);
    } catch (e) {
        logger.debug("Error while retrieving GCP Tasks Queues");
    }
    return jsonData ?? null;
}

const compute = require('@google-cloud/compute');
const {InstancesClient} = compute.v1;

async function listAllComputes(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("compute")) return null;
    let jsonData = [];
    const instancesClient = createClientWithCredentials(InstancesClient, credentialsObject);
    try {
        const aggListRequest = instancesClient.aggregatedListAsync({
            project: projectId
        });
        for await (const [zone, instancesObject] of aggListRequest) {
            const instances = instancesObject.instances;
            if (instances && instances.length > 0) {
                for (let i = 0; i < instances.length; i++) {
                    const instanceData = JSON.parse(jsonStringify(instances[i]));
                    instanceData.zone = zone;
                    jsonData.push(instanceData);
                }
            }
        }
        logger.info("GCP Compute Listing Done");
    } catch (e) {
        logger.error("Error while retrieving GCP Compute Instances");
        logger.debug(e);
    }
    return jsonData ?? null;
}

async function listSSHKey(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("compute_item")) return null;
    let jsonData = [];

    const instancesClient = createClientWithCredentials(compute.InstancesClient, credentialsObject);
    const aggListRequest = await instancesClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;
        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse(jsonStringify(instances[i].metadata?.items)));
            }
        }
    }
    return jsonData ?? null;
}

async function listPersistentDisks(projectId: string, credentialsObject?: any) {
    if(!currentConfig.ObjectNameNeed?.includes("disk")) return null;
    let jsonData = [];
    const disksClient = createClientWithCredentials(compute.DisksClient, credentialsObject);
    const aggListRequest =  await disksClient.aggregatedListAsync({
        project: projectId
    });
    for await (const [zone, diskObject] of aggListRequest) {
        const disks = diskObject.disks;

        if (disks && disks.length > 0) {
            for (let i = 0; i < disks.length; i++) {
                jsonData.push(JSON.parse(jsonStringify(disks[i])));
            }
        }
    }
    logger.info("GCP Persistent Disks Listing Done");
    return jsonData ?? null;
}

async function listAllBucket(credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("bucket")) return null;
    let jsonData = [];
    
    try {
        logger.info("Starting GCP Buckets listing...");
        if (!credentialsObject || !credentialsObject.project_id) {
            logger.error("No credentials or project_id provided for bucket listing");
            return null;
        }
        const storage = new Storage({ 
            credentials: credentialsObject,
            projectId: credentialsObject.project_id
        });
        const [buckets] = await storage.getBuckets();
        if (buckets.length === 0) {
            return [];
        }
        for (const bucket of buckets) {
            try {
                const [metadata] = await bucket.getMetadata();
                jsonData.push(JSON.parse(jsonStringify(metadata)));
            } catch (bucketError: any) {
                logger.warn(`Could not get metadata for bucket ${bucket.name}: ${bucketError.message}`);
            }
        }
        logger.info(`GCP Buckets Listing Done`);
        return jsonData;
    } catch (e: any) {
        logger.error("Error while retrieving GCP Buckets");
        logger.error(`  Message: ${e.message}`);
        if (e.code) {
            logger.error(`  Code: ${e.code}`);
        }
        logger.debug(e);
    }
    
    return null;
}

import { ClusterManagerClient } from '@google-cloud/container';
import {CloudBillingClient} from "@google-cloud/billing";
import {VpcAccessServiceClient} from "@google-cloud/vpc-access";
import { config } from "dotenv";

async function listAllClusters(credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("cluster")) return null;
    let jsonData = [];

    try {
        const cnt = createClientWithCredentials(ClusterManagerClient, credentialsObject);
        const projectId = credentialsObject?.project_id || await cnt.getProjectId();
        const request = {
            projectId: projectId,
            zone: "-",
        };
        const [response] = await cnt.listClusters(request);
        jsonData = JSON.parse(jsonStringify(response));
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Clusters Listing Done");
    return jsonData ?? null;
}

const {ProjectsClient} = require('@google-cloud/resource-manager');
async function listAllProject(credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("project")) return null;
    let jsonData = [];

    try {
        const client = createClientWithCredentials(ProjectsClient, credentialsObject);
        const [projects] = await client.searchProjects();
        if (projects && Array.isArray(projects)) {
            for (const project of projects) {
                jsonData.push(JSON.parse(jsonStringify(project)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Projects Listing Done");
    return jsonData ?? null;
}

async function getBillingAccount(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("billingAccount")) return null;
    const {CloudBillingClient} = require('@google-cloud/billing');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(CloudBillingClient, credentialsObject);
        const [accounts] = await client.listBillingAccounts({
            projectId,
        });
        for (const account of accounts) {
            jsonData.push(JSON.parse(jsonStringify(account)));
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Billing Accounts Listing Done");
    return jsonData ?? null;
}

async function listWorkflows(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("workflow")) return null;
    const {WorkflowsClient} = require('@google-cloud/workflows');
    let jsonData = [];
    try {
        const client = createClientWithCredentials(WorkflowsClient, credentialsObject);
        const [workflows] = await client.listWorkflows({
            parent: client.locationPath(projectId, '-'),
        });
        for (const workflow of workflows) {
            jsonData.push(JSON.parse(jsonStringify(workflow)));
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Workflows Listing Done");
    return jsonData ?? null;
}

async function listWebSecurityConfig(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("websecurity")) return null;
    const { WebSecurityScannerClient } = require('@google-cloud/web-security-scanner');
    let jsonData = [];
    try {
        const client = createClientWithCredentials(WebSecurityScannerClient, credentialsObject);
        const [configs] = await client.listScanConfigs({
            parent: `projects/${projectId}`,
        });
        if (configs && Array.isArray(configs)) {
            for (const config of configs) {
                jsonData.push(JSON.parse(jsonStringify(config)));
            }
        }
    }
    catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Web Security Configs Listing Done");
    return jsonData ?? null;
}

async function listVpcConnectors(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("connector")) return null;
    const {VpcAccessServiceClient} = require('@google-cloud/vpc-access');
    let jsonData =  [];
    try {
        const client = createClientWithCredentials(VpcAccessServiceClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, client.listConnectors, client, regionsList, false )
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP VPC Connectors Listing Done");
    return jsonData ?? null;
}

async function listVMWareEngine(projectId: string, credentialsObject?: any): Promise<Array<any>|null>  {
    if(!currentConfig.ObjectNameNeed?.includes("vmware_engine")) return null;
    const {VmwareEngineClient} = require('@google-cloud/vmwareengine').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';
    try {
        const vmwareengineClient = createClientWithCredentials(VmwareEngineClient, credentialsObject);
        const request = {
            parent,
        };
        const [networks] = await vmwareengineClient.listVmwareEngineNetworks(request);
        if (networks && Array.isArray(networks)) {
            for (const network of networks) {
                jsonData.push(JSON.parse(jsonStringify(network)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP VMWare Engine Listing Done");
    return jsonData ?? null;
}

async function listNamespaces(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("namespace")) return null;
    const {RegistrationServiceClient,} = require('@google-cloud/service-directory');
    let jsonData = [];

    try {
        const registrationServiceClient = createClientWithCredentials(RegistrationServiceClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, registrationServiceClient.listNamespaces, registrationServiceClient,
            regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Namespaces Listing Done");
    return jsonData ?? null;
}

export async function listSecrets(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("secret")) return null;
    const {SecretManagerServiceClient,} = require('@google-cloud/secret-manager').v1;
    const parent = `projects/${projectId}`;
    let jsonData = [];

    try {
        const secretmanagerClient = createClientWithCredentials(SecretManagerServiceClient, credentialsObject);
        const request = { parent };
        const [secrets] = await secretmanagerClient.listSecrets(request);
        if (secrets && Array.isArray(secrets)) {
            for (const secret of secrets) {
                jsonData.push(JSON.parse(jsonStringify(secret)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Secrets Listing Done");
    return jsonData ?? null;
}

async function listConnectivityTests(projectId: string, credentialsObject?: any): Promise<Array<any>|null>  {
    if(!currentConfig.ObjectNameNeed?.includes("connectivity_test")) return null;
    const {ReachabilityServiceClient} = require('@google-cloud/network-management');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(ReachabilityServiceClient, credentialsObject);
        const [tests] = await client.listConnectivityTests({
            parent: `projects/${projectId}/locations/global`,
        });
        if (tests && Array.isArray(tests)) {
            for (const test of tests) {
                jsonData.push(JSON.parse(jsonStringify(test)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Connectivity Tests Listing Done");
    return jsonData ?? null;
}

async function listResourceSettings(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("resource_settings")) return null;
    let jsonData = [];

    const { ResourceSettingsServiceClient } = require('@google-cloud/resource-settings');

    try {
        const client = createClientWithCredentials(ResourceSettingsServiceClient, credentialsObject);
        const [settings] = await client.listSettings({
            parent: `projects/${projectId}`,
        });
        if (settings && Array.isArray(settings)) {
            for (const setting of settings) {
                jsonData.push(JSON.parse(jsonStringify(setting)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Resources Settings Listing Done");
    return jsonData ?? null;
}

async function listRedisInstances(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("redis_instance")) return null;
    const {CloudRedisClient} = require('@google-cloud/redis');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(CloudRedisClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, client.listInstances, client, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Redis Instances Listing Done");
    return jsonData ?? null;
}

async function listOSConfig(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("os_config")) return null;
    const {OsConfigServiceClient} = require('@google-cloud/os-config');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(OsConfigServiceClient, credentialsObject);
        const [deployments] = await client.listPatchDeployments({
            parent: `projects/${projectId}`,
        });
        if (deployments && Array.isArray(deployments)) {
            for (const deployment of deployments) {
                jsonData.push(JSON.parse(jsonStringify(deployment)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP OS Config Listing Done");
    return jsonData ?? null;
}

async function listOrgPolicyContraints(projectId: string, credentialsObject?: any): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("org_policy_constraint")) return null;
    const {OrgPolicyClient} = require('@google-cloud/org-policy');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(OrgPolicyClient, credentialsObject);
        const [constraints] = await client.listConstraints({
            parent: `projects/${projectId}`,
        });
        if (constraints && Array.isArray(constraints)) {
            for (const constraint of constraints) {
                jsonData.push(JSON.parse(jsonStringify(constraint)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP OrgPolicy Contraints Listing Done");
    return jsonData ?? null;
}

async function listOrchestrationAirflow(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("airflow_image_version")) return null;
    const {ImageVersionsClient} = require('@google-cloud/orchestration-airflow');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(ImageVersionsClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, client.listImageVersions, client, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Airflow Image Versions Listing Done");
    return jsonData ?? null;
}

async function listNotebookInstances(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("notebook")) return null;
    const {NotebookServiceClient} = require('@google-cloud/notebooks');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(NotebookServiceClient, credentialsObject);
        const [instances] = await client.listInstances({
            parent: `projects/${projectId}/locations/-`,
        });
        if (instances && Array.isArray(instances)) {
            for (const instance of instances) {
                jsonData.push(JSON.parse(jsonStringify(instance)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Notebook Instances Listing Done");
    return jsonData ?? null;
}

async function listDashboards(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("dashboard")) return null;
    const { DashboardsServiceClient } = require('@google-cloud/monitoring-dashboards');
    const parent = 'projects/' + projectId;
    let jsonData = [];

    try {
        const ds = createClientWithCredentials(DashboardsServiceClient, credentialsObject);
        const [dashboards] = await ds.listDashboards({parent,});
        if (dashboards && Array.isArray(dashboards)) {
            for (const dashboard of dashboards) {
                jsonData.push(JSON.parse(jsonStringify(dashboard)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Dashboards Listing Done");
    return jsonData ?? null;
}

async function listIdentitiesDomain(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("identity_domain")) return null;
    const { ManagedIdentitiesServiceClient } = require('@google-cloud/managed-identities');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(ManagedIdentitiesServiceClient, credentialsObject);
        const [domains] = await client.listDomains({
            parent: `projects/${projectId}/locations/global`,
        });
        if (domains && Array.isArray(domains)) {
            for (const domain of domains) {
                jsonData.push(JSON.parse(jsonStringify(domain)));
            }
        }
    } catch (e) {
        logger.debug(e)
    }
    logger.info("GCP Identities Domains Listing Done");
    return jsonData ?? null;
}

async function listLineageProcesses(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    const {LineageClient} = require('@google-cloud/lineage').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];

    try {
        const lineageClient = createClientWithCredentials(LineageClient, credentialsObject);
        const request = {parent};
        const [processes] = await lineageClient.listProcesses(request);
        if (processes && Array.isArray(processes)) {
            for (const process of processes) {
                jsonData.push(JSON.parse(jsonStringify(process)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Lineage Processes Listing Done");
    return jsonData ?? null;
}

async function listKMSCryptoKeys(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("kms_crypto_key")) return null;
    const {KeyDashboardServiceClient} = require('@google-cloud/kms-inventory').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId;

    try {
        const inventoryClient = createClientWithCredentials(KeyDashboardServiceClient, credentialsObject);
        const request = {parent};
        const [response] = await inventoryClient.listCryptoKeys(request, {
            maxResults: 50,
            autoPaginate: false,
        });
        if (response && Array.isArray(response)) {
            for (const key of response) {
                jsonData.push(JSON.parse(jsonStringify(key)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP KMS Crypto Keys Listing Done");
    return jsonData ?? null;
}

async function listKMSKeyRings(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("kms_key_ring")) return null;
    const {KeyManagementServiceClient} = require('@google-cloud/kms');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(KeyManagementServiceClient, credentialsObject);
        const locationName = client.locationPath(projectId, "global");
        const [keyRings] = await client.listKeyRings({
            parent: locationName
        });
        if (keyRings && Array.isArray(keyRings)) {
            for (const keyRing of keyRings) {
                jsonData.push(JSON.parse(jsonStringify(keyRing)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP KMS Key Rings Listing Done");
    return jsonData ?? null;
}

async function listDomainsRegistration(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("domain_registration")) return null;
    const {DomainsClient} = require('@google-cloud/domains');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(DomainsClient, credentialsObject);
        const [registrations] = await client.listRegistrations({
            parent: `projects/${projectId}/locations/global`,
        });
        if (registrations && Array.isArray(registrations)) {
            for (const registration of registrations) {
                jsonData.push(JSON.parse(jsonStringify(registration)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Domains Registration Listing Done");
    return jsonData ?? null;
}

async function listDnsZones(credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("dns_zone")) return null;
    const {DNS} = require('@google-cloud/dns');
    let jsonData = [];

    try {
        const dns = credentialsObject ?
            new DNS({ credentials: credentialsObject, projectId: credentialsObject.project_id }) :
            new DNS();
        const [zones] = await dns.getZones();
        if (zones && Array.isArray(zones)) {
            for (const zone of zones) {
                jsonData.push(JSON.parse(jsonStringify(zone)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP DNS Zones Listing Done");
    return jsonData ?? null;
}

async function listDeliveryPipelines(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("pipeline")) return null;
    const {CloudDeployClient} = require('@google-cloud/deploy').v1;
    let jsonData = [];

    try {
        const deployClient = createClientWithCredentials(CloudDeployClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, deployClient.listDeliveryPipelines, deployClient, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Delivery Pipelines Listing Done");
    return jsonData ?? null;
}

async function listCertificates(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("certificate")) return null;
    const {CertificateManagerClient} = require('@google-cloud/certificate-manager').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/global';

    try {
        const certificatemanagerClient = createClientWithCredentials(CertificateManagerClient, credentialsObject);
        const request = { parent };
        const [certificates] = await certificatemanagerClient.listCertificates(request);
        if (certificates && Array.isArray(certificates)) {
            for (const certificate of certificates) {
                jsonData.push(JSON.parse(jsonStringify(certificate)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Certificates Listing Done");
    return jsonData ?? null;
}

async function listBatchJobs(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("batch_job")) return null;
    let jsonData = [];
    const {BatchServiceClient} = require('@google-cloud/batch').v1;

    try {
        const batchClient = createClientWithCredentials(BatchServiceClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, batchClient.listJobs, batchClient, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Batch Jobs Listing Done");
    return jsonData ?? null;
}

async function listWorkloads(projectId: string, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("workload")) return null;
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
            jsonData = JSON.parse(jsonStringify(workload));
        }*/
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Workloads Listing Done");
    return jsonData ?? null;
}

async function listArtifactsRepositories(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("artifact_repository")) return null;
    const {ArtifactRegistryClient} = require('@google-cloud/artifact-registry');
    let jsonData = [];

    try {
        const client = createClientWithCredentials(ArtifactRegistryClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, client.listRepositories, client, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Artifacts Repositories Listing Done");
    return jsonData ?? null;
}

async function listAppGateways(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("app_gateway")) return null;
    const {AppGatewaysServiceClient} = require('@google-cloud/appgateways').v1;
    let jsonData = [];

    try {
        const appgatewaysClient = createClientWithCredentials(AppGatewaysServiceClient, credentialsObject);
        jsonData = await executeAllRegions(projectId, appgatewaysClient.listAppGateways, appgatewaysClient, regionsList, false);
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP App Gateways Listing Done");
    return jsonData ?? null;
}

async function listTagsKeys(projectId: string, regionsList: Array<string>, credentialsObject?: any): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("tags_keys")) return null;
    const {TagKeysClient, TagValuesClient} = require('@google-cloud/resource-manager').v3;
    let jsonData = [];

    try {
        const tagsKeyClient = createClientWithCredentials(TagKeysClient, credentialsObject);
        const tagsValueClient = createClientWithCredentials(TagValuesClient, credentialsObject);
        const [tagValues] = await tagsValueClient.listTagValues();
        if (tagValues && Array.isArray(tagValues)) {
            for (const tagValue of tagValues) {
                jsonData.push(JSON.parse(jsonStringify(tagValue)));
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.info("GCP Tags Keys Listing Done");
    return jsonData ?? null;
}
/////////////////////////////////////////////////////////
/// THE FOLLOWINGS RESOURCES HAVE NOT BEEN TESTED YET ///
/////////////////////////////////////////////////////////
/*
async function listAppConnectors(projectId: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("app_connector")) return null;
    const {AppConnectorsServiceClient} = require('@google-cloud/appconnectors').v1;
    const parent = 'projects/' + projectId + '/locations/global';
    let jsonData = [];

    try {
        const appconnectorsClient = new AppConnectorsServiceClient();
        const request = {parent};
        const [connectors] = await appconnectorsClient.listAppConnectors(request);
        if (connectors && Array.isArray(connectors)) {
            for (const connector of connectors) {
                jsonData.push(JSON.parse(jsonStringify(connector)));
            }
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP App Connectors Listing Done");
    return jsonData ?? null;
}
*/
/*
async function listApiKeys(projectId: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("api_key")) return null;
    const {ApiKeysClient} = require('@google-cloud/apikeys').v2;
    const parent = 'projects/' + projectId;
    let jsonData = [];

    try {
        const apikeysClient = new ApiKeysClient();
        const request = { parent };
        const [keys] = await apikeysClient.listKeys(request);
        if (keys && Array.isArray(keys)) {
            for (const key of keys) {
                jsonData.push(JSON.parse(jsonStringify(key)));
            }
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Keys Listing Done");
    return jsonData ?? null;
}*/
/*
async function listApi(projectId: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("api")) return null;
    const {ApiGatewayServiceClient} = require('@google-cloud/api-gateway');
    let jsonData = [];

    try {
        const client = new ApiGatewayServiceClient();
        const [apis] = await client.listApis({
            parent: `projects/${projectId}/locations/global`,
        });
        if (apis && Array.isArray(apis)) {
            for (const api of apis) {
                jsonData.push(JSON.parse(jsonStringify(api)));
            }
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Api Listing Done");
    return jsonData ?? null;
}*/
/*
async function listAccessPolicy(projectId: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("access_policy")) return null;
    const {AccessApprovalClient} = require('@google-cloud/access-approval');
    let jsonData = [];

    try {
        const client = new AccessApprovalClient();
        const [requests] = await client.listApprovalRequests({
            parent: `projects/${projectId}`,
        });
        if (requests && Array.isArray(requests)) {
            for (const request of requests) {
                jsonData.push(JSON.parse(jsonStringify(request)));
            }
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Access Policy Listing Done");
    return jsonData ?? null;
}
*/

// Workstations : timeout because no instance to be tested //
/*
async function listWorkstations(projectId: string, regionsList: Array<string>): Promise<Array<any>|null> { // KO
    if(!currentConfig.ObjectNameNeed?.includes("workstation")) return null;
    const {WorkstationsClient} = require('@google-cloud/workstations').v1;
    let jsonData;
    try {
        const workstationsClient = new WorkstationsClient();
        jsonData = await executeAllRegions(projectId, workstationsClient.listWorkstations, workstationsClient, regionsList,false);
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
async function listStorageConfig(projectId: string): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("storage_config")) return null;
    const {StorageInsightsClient} = require('@google-cloud/storageinsights').v1;
    let jsonData = [];
    const parent = 'projects/' + projectId + '/locations/-';

    try {
        const storageinsightsClient = new StorageInsightsClient();
        const request = {
            parent,
        };
        const [configs] = await storageinsightsClient.listReportConfigs(request);
        if (configs && Array.isArray(configs)) {
            for (const config of configs) {
                jsonData.push(JSON.parse(jsonStringify(config)));
            }
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
async function listPrivateCertificates(projectId: string): Promise<Array<any>|null> {
    if(!currentConfig.ObjectNameNeed?.includes("private_certificate")) return null;
    const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
    let jsonData = [];

    try {
        const client = new CertificateAuthorityServiceClient();
        const [certificates] = await client.listCertificates({
            parent: `projects/${projectId}/locations/-/caPools/-`,
        });
        if (certificates && Array.isArray(certificates)) {
            for (const certificate of certificates) {
                jsonData.push(JSON.parse(jsonStringify(certificate)));
            }
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Private Certificates Listing Done");
    return jsonData ?? null;
}
 */