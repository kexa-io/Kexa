import { Logger } from "tslog";
import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "./manageVarEnvironnement.service";
import { GCPResources } from "../models/gcp/resource.models";
import {Storage} from "@google-cloud/storage";
const {GoogleAuth} = require('google-auth-library');

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;
let projectId = process.env.PROJECTID;

const config = require('config');

const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "GcpLogger" });
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectGcpData(): Promise<GCPResources[] | null> {
/*    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
    const res = await client.request({ url });
    console.log(res.data);*/

        let resources = new Array<GCPResources>();
    for (let config of gcpConfig??[]) {
        let gcpResources = {
            "storage": null,
            "task": null,
            "compute": null,
        } as GCPResources;

        try {
            if(!projectId) {
                throw new Error("- Please pass PROJECTID in your config file");
            }
            const {Storage} = require('@google-cloud/storage');
            const {Compute} = require('@google-cloud/compute');
            const {CloudTasksClient} = require('@google-cloud/tasks').v2;

            logger.info("- loading client Google Cloud Provider done-");
            ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////

            const promises = [
               // listTasks(projectId),
                listAllComputes(projectId),
                listAllBucket()
            ];
            const [compute, storage] = await Promise.all(promises);
          /*  gcpResources = {
                "compute": [...gcpResources["compute"] ?? [], ...compute],
                "storage": [...gcpResources["storage"] ?? [], ...storage]
            } as GCPResources;*/
           await listAllBucket();
           await listAllComputes(projectId);



            const tasksClient = new CloudTasksClient();
            console.log("LIST TASKS : ")
            const request = {
                parent,
            };

            // Run request
            const iterable = await tasksClient.listTasksAsync(request);
            for await (const response of iterable) {
                console.log(response);
            }
        }
        catch (e) {
            logger.error("error in collectGCPData:");
            logger.error(e);
        }
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
    return (result.length)?result:null;
}

const compute = require('@google-cloud/compute');
async function listAllComputes(projectId: string): Promise<Array<any>|null> {
  //  let result: any[] = [];
    let jsonData = [];

    const instancesClient = new compute.InstancesClient();
    const aggListRequest = instancesClient.aggregatedListAsync({
        project: projectId,
        maxResults: 5,
    });
    console.log('Instances found:');
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;

        if (instances && instances.length > 0) {
            jsonData = JSON.parse(JSON.stringify(instances));
            jsonData.forEach((element: any) => {
                console.log(element);
            })
        }
    }
    return (jsonData);
   // return (result.length)?result:null;
}

async function listAllBucket(): Promise<Array<any>|null> {
    const storage = new Storage();
    const [buckets] = await storage.getBuckets();
    console.log('Buckets:');
    let jsonReturn = [];
    for (let i = 0; i < buckets.length; i++) {
        console.log(buckets[i].name);
        const current_bucket = await storage.bucket(buckets[i].name).get();
        const wtf = storage.bucket(buckets[i].name);
        const jsonData = JSON.parse(JSON.stringify(current_bucket));
        jsonData.forEach((element : any) => {
            console.log(element);
        })
        jsonReturn.push(jsonData);
       // const [files] = await buckets[i].getFiles();
      /*  console.log('Objects in the bucket:');
        files.forEach((file: any) => {
            console.log(file.name);
        });*/
    }
    return (jsonReturn);
/*    let result: string | any[] = [];
    result = [...result, ...buckets];
    return (result.length)?result:null;*/
}