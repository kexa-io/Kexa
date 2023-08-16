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
                await listTasks(projectId),
                await listAllComputes(projectId),
                await listAllBucket(),
            ];
            
            const [taskList, computeList, bucketList] = await Promise.all(promises);

            logger.info("- listing cloud resources done -");

            gcpResources = {
                task : taskList,
                compute : computeList,
                bucket : bucketList
            };
           // gcpResources.bucket = bucketList;
//            gcpResources.compute = computeList;


            logger.info("- loading client Google Cloud Provider done-");

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
    console.log("GCP TASKS LISTING : ");
    const parent = 'projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION_ID/queues/YOUR_QUEUE_ID';
    const tasksClient = new CloudTasksClient();
    try {
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
    }
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
    return (jsonData);
}

async function listQueues(client: any, projectId: string): Promise<Array<any>|null> {
    // Get the fully qualified path to the region
    //const parent = client.locationPath(projectId);
    // list all fo the queues
    const [queues] = await client.listQueues({client});
    let jsonData;
    if (queues.length > 0) {

        console.log('Queues:');
        queues.forEach((queue: any) => {
            jsonData.push(JSON.parse(JSON.stringify(queue)));
            console.log(`  ${queue.name}`);
        });
    } else {
        console.log('No queues found!');
    }
    return jsonData ?? null;
}

const compute = require('@google-cloud/compute');
async function listAllComputes(projectId: string): Promise<Array<any>|null> {
    let jsonData = [];

    const instancesClient = new compute.InstancesClient();
    console.log("PROJCET ID : " + projectId);
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
    return (jsonData);
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
    return (jsonReturn);
}
