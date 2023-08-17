/*
    * Provider : gcp
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - task
    *     - compute
    *     - storage
    *     - project
    *     - billingAccount
    *     - cluster
    *     - workstation
    *     - workflows
    *     - websecurity
    *     - connector
    *     - vmware-engine
    *     - storage_config
    *     - namespace
    *     - certificate
    *     - secret
    *     - connectivity_test
    *     - catalog
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { GCPResources } from "../../models/gcp/resource.models";
import {Storage} from "@google-cloud/storage";
import { deleteFile, writeStringToJsonFile } from "../../helpers/files";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;

const config = require('config');

const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "GcpLogger" });
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(): Promise<GCPResources[] | null> {
    let resources = new Array<GCPResources>();
    setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
    for (let config of gcpConfig??[]) {
        let gcpResources = {
            "bucket": null,
            "task": null,
            "compute": null,
        //    "project": null,
          //  "billingAccount": null
         //   "cluster": null,
            "workstation": null,
            "workflow": null,
            "websecurity": null,
            "connector": null,
            "vmware_engine": null,
            "storage_config": null,
            "namespace": null,
            "certificate": null,
            "secret": null,
            "connectivity_test": null,
            "catalog": null
        } as GCPResources;
        let projectId = await getConfigOrEnvVar(config, "PROJECTID", gcpConfig.indexOf(config)+"-");
        writeStringToJsonFile(await getConfigOrEnvVar(config, "GOOGLEJSON", gcpConfig.indexOf(config)+"-"), "./config/gcp.json");
        try {
            logger.info("- listing GCP resources -");
            const promises = [
                await listTasks(projectId),
                await listAllComputes(projectId),
                await listAllBucket(),
             //   await listAllClusters()
            //   await listAllProject(),
            //    await getBillingAccount(projectId),
                await listWorkstations(projectId),
                await listWorkflows(projectId),
                await listWebSecurityConfig(projectId),
                await listVpcConnectors(projectId),
                await listVMWareEngine(projectId),
                await listStorageConfig(projectId),
                await listNamespaces(projectId),
                await listCertificates(projectId),
                await listSecrets(projectId),
                await listConnectivityTests(projectId),
                await listCatalogs(projectId)
        ];
            const [taskList, computeList, bucketList/*, projectList, billingAccountList,
             clusterList*/, workstationList, workflowList, webSecurityList, connectorList,
                engineList, storageConfigList, namespaceList, certificateList, secretList,
                connectivityTestList, catalogList] = await Promise.all(promises);

            logger.info("- listing cloud resources done -");

            gcpResources = {
                task: taskList,
                compute: computeList,
                bucket: bucketList,
              //  project : projectList,
              //  billingAccount: billingAccountList
              //  cluster: clusterList,
                workstation: workstationList,
                workflow: workflowList,
                websecurity: webSecurityList,
                connector: connectorList,
                vmware_engine: engineList,
                storage_config: storageConfigList,
                namespace: namespaceList,
                certificate: certificateList,
                secret: secretList,
                connectivity_test: connectivityTestList,
                catalog: catalogList
            };
            // gcpResources.bucket = bucketList;
//            gcpResources.compute = computeList;
            logger.info("- loading client Google Cloud Provider done-");
            //await listWorkflows(projectId);
            ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
        }
        catch (e) {
            logger.error("error in collectGCPData: " + projectId);
            logger.error(e);
        }
        deleteFile("./config/gcp.json");
        resources.push(gcpResources);
    }
    return resources??null;
}

const {CloudTasksClient} = require('@google-cloud/tasks').v2;
async function listTasks(projectId: string): Promise<Array<any>|null> {
    // Instantiates a client
    let jsonData = [];
    const parent = 'projects/'+  projectId + '/locations/-';
    const tasksClient = new CloudTasksClient();
    try {
        const request = {
            parent,
        };
        const iterable = await tasksClient.listQueuesAsync(request);
        for await (const response of iterable) {
            jsonData.push(JSON.parse(JSON.stringify(response)));
            console.log(response);
        }
    } catch (e) {
        logger.error("Error while retrieving GCP Tasks")
    }
    /*  try {
          const request = {
              parent,
          };
          const iterable = await tasksClient.listTasksAsync(request);
          for await (const response of iterable) {
              jsonData.push(JSON.parse(JSON.stringify(response)));
              console.log(response);
          }
      } catch (e) {
          logger.error("Error while retrieving GCP Tasks queues")
      }*/
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
                jsonData.push(JSON.parse(JSON.stringify(instances[i])));
            }
        }
    }
    logger.info("GCP Compute Listing Done");
    return jsonData ?? null;
}

async function listAllBucket(): Promise<Array<any>|null> {
    const storage = new Storage();
    const [buckets] = await storage.getBuckets();
    let jsonReturn = [];
    for (let i = 0; i < buckets.length; i++) {
        console.log(buckets[i].name);
        const current_bucket = await storage.bucket(buckets[i].name).get();
        const jsonData = JSON.parse(JSON.stringify(current_bucket));
        jsonReturn.push(jsonData);

    }
    logger.info("GCP Buckets Listing Done");
    return jsonReturn ?? null;
}

import { ClusterManagerClient } from '@google-cloud/container';

async function listAllClusters(): Promise<Array<any>|null> {
    const cnt = new ClusterManagerClient();
    const projectId = await cnt.getProjectId();
    const request = {
        projectId: projectId,
        zone: "-",
    };
    const [response] = await cnt.listClusters(request);
    let jsonData = JSON.parse(JSON.stringify(response));
    logger.info("GCP Clusters Listing Done");
    return jsonData ?? null;
}

const {ProjectsClient} = require('@google-cloud/resource-manager');
async function listAllProject(): Promise<Array<any>|null> {
    const client = new ProjectsClient();
    let jsonData = [];

    const projects = client.searchProjectsAsync();
    for await (const project of projects) {
        jsonData = JSON.parse(JSON.stringify(project));
    }
    logger.info("GCP Projects Listing Done");
    return jsonData ?? null;
}

/*async function getProjectRegion(projectId: any) {
    const client = new ProjectsClient();

    try {
        console.log("HEERE ");
        const [project] = await client.getProject({projectId});

        // Extract region from the project metadata if available
        const region = project.labels && project.labels.region;

        if (region) {
            console.log(`Region for project ${projectId}: ${region}`);
        } else {
            console.log(`Project ${projectId} does not have a region label.`);
        }
    } catch (error) {
        console.error('Error retrieving project:', error);
    }
}*/

async function getBillingAccount(projectId: any): Promise<Array<any>|null> {
    const {CloudBillingClient} = require('@google-cloud/billing');
    const client = new CloudBillingClient();
    let jsonData = [];

    const [accounts] = await client.listBillingAccounts({
        projectId,
    });
    for (const account of accounts) {
        jsonData = JSON.parse(JSON.stringify(account));
    }
    logger.info("GCP Billing Accounts Listing Done");
    return jsonData ?? null;
}

async function listOrganizations() {
/*    const resourceManager = new ProjectsClient();
    const [organizations] = await resourceManager.getOrganizations();

 organizations.forEach((organization: any) => {
        console.log(`Organization ID: ${organization.id}`);
    });

    const iterable = await resourceManager.Search();
    for await (const response of iterable) {
        console.log(response);
    }*/
}

async function listWorkstations(projectId: any): Promise<Array<any>|null> {
    const {WorkstationsClient} = require('@google-cloud/workstations').v1beta;
    let jsonData = [];
    try {
        const workstationsClient = new WorkstationsClient();
        const parent = 'projects/' + projectId + '/locations/-';
        const request = {
            parent,
        };
        const iterable = await workstationsClient.listWorkstationsAsync(request);
        for await (const response of iterable) {
            jsonData = JSON.parse(JSON.stringify(response));
        }
    }
    catch (e) {
        logger.error(e);
    }
    logger.info("GCP Workstations Listing Done");
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

async function listVpcConnectors(projectId: any): Promise<Array<any>|null> {
    const {VpcAccessServiceClient} = require('@google-cloud/vpc-access');
    let jsonData =  [];
    try {
        const client = new VpcAccessServiceClient();
         const connectors = await client.listConnectors({
             parent: `projects/${projectId}/locations/-`,
         });
        jsonData = JSON.parse(JSON.stringify(connectors));
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
            console.log(jsonData);
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Storage Configs Listing Done");
    return jsonData ?? null;
}

async function listNamespaces(projectId: any): Promise<Array<any>|null> {
    const {RegistrationServiceClient,} = require('@google-cloud/service-directory');
    let jsonData = [];

    const registrationServiceClient = new RegistrationServiceClient();
    const locationName = registrationServiceClient.locationPath(projectId, "-");

    const [namespaces] = await registrationServiceClient.listNamespaces({parent: locationName});

    console.log('Namespaces: ');
    for (const n of namespaces) {
        console.log(`${n.name}`);
        jsonData = JSON.parse(JSON.stringify(n));
    }
    logger.info("GCP Namespaces Listing Done");
    return jsonData ?? null;
}

async function listCertificates(projectId: any): Promise<Array<any>|null> {
    const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
    let jsonData = [];

    try {
        const client = new CertificateAuthorityServiceClient();
        const res = await client.listCertificates({
            parent: `projects/${projectId}/locations/-/caPools/-`,
        });
        jsonData = JSON.parse(JSON.stringify(res));
        console.log(jsonData);
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Certificates Listing Done");
    return jsonData ?? null;
}

async function listSecrets(projectId: any): Promise<Array<any>|null> {
    const {SecretManagerServiceClient,} = require('@google-cloud/secret-manager').v1;
    const parent = 'projects/' + projectId + '/locations/-';
    let jsonData = [];

    try {
        const secretmanagerClient = new SecretManagerServiceClient();
        const request = { parent };
        const iterable = await secretmanagerClient.listSecretsAsync(request);
        for await (const response of iterable) {
            console.log(response);
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
    const parent = 'projects/' + projectId + '/locations/-';
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

async function listCatalogs(projectId: any): Promise<Array<any>|null> {
    const {CatalogServiceClient} = require('@google-cloud/retail');
    let jsonData = [];

    try {
        const client = new CatalogServiceClient();
        const catalogs = await client.listCatalogs({
            parent: `projects/${projectId}/locations/global`,
        });
        console.info(catalogs);
        jsonData = JSON.parse(JSON.stringify(catalogs));
    } catch (e) {
        logger.error(e);
    }
    logger.info("GCP Catalogs Listing Done");
    return jsonData ?? null;
}