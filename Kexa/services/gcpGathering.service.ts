import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "./manageVarEnvironnement.service";
import { GCPResources } from "../models/gcp/resource.models";
import {Storage} from "@google-cloud/storage";
import { deleteFile, writeStringToJsonFile } from "../helpers/files";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;

const config = require('config');

const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "GcpLogger" });
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectGcpData(): Promise<GCPResources[] | null> {
    let resources = new Array<GCPResources>();
    setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
    for (let config of gcpConfig??[]) {
        let gcpResources = {
            "bucket": null,
            "task": null,
            "compute": null,
        } as GCPResources;
        let projectId = await getConfigOrEnvVar(config, "PROJECTID", gcpConfig.indexOf(config)+"-");
        writeStringToJsonFile(await getConfigOrEnvVar(config, "GOOGLEJSON", gcpConfig.indexOf(config)+"-"), "./config/gcp.json");
        try {
            logger.info("- listing GCP resources -");
            const promises = [
                listTasks(projectId),
                listAllComputes(projectId),
                listAllBucket(projectId),
            ];
            
            const [taskList, computeList, bucketList] = await Promise.all(promises);

            logger.info("- listing cloud resources done -");
            gcpResources = {
                task : taskList,
                compute : computeList,
                bucket : bucketList,
            };
            logger.info("- loading client Google Cloud Provider done-");

            ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////

            const tasksClient = new CloudTasksClient();

            // Run request
            const iterable = await tasksClient.listTasksAsync();
            for await (const response of iterable) {
                console.log(response);
            }
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
    const tasksClient = new CloudTasksClient();
    // Construct request
    const request = {
        projectId,
    };

    // Run request
    const iterable = await tasksClient.listTasksAsync(request);
    let result = [];
    for await (const response of iterable) {
        result.push(response);
    }
    logger.info("GCP Task Listing Done");
    return (result.length)?result:null;
}

const compute = require('@google-cloud/compute');
async function listAllComputes(projectId: string): Promise<Array<any>|null> {
    let jsonData = [];

    const instancesClient = new compute.InstancesClient();
    const aggListRequest = instancesClient.aggregatedListAsync({
        project: projectId,
        //credentials
    });
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;

        if (instances && instances.length > 0) {
            for (let i = 0; i < instances.length; i++) {
                jsonData.push(JSON.parse(JSON.stringify(instances[i])))
            }
        }
    }
    logger.info("GCP Compute Listing Done");
    return (jsonData);
}

async function listAllBucket(projectId: string): Promise<Array<Storage>|null> {
    const storage = new Storage();
    const [buckets] = await storage.getBuckets();
    let jsonReturn = [];
    for (let i = 0; i < buckets.length; i++) {
        const current_bucket = await storage.bucket(buckets[i].name).get();
        const jsonData = JSON.parse(JSON.stringify(current_bucket));
        jsonReturn.push(jsonData);
    }
    logger.info("GCP Buckets Listing Done");
    return (jsonReturn);
}