import { Logger } from "tslog";
import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "./manageVarEnvironnement.service";
import { GcpResources } from "../models/gcp/resource.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;

const config = require('config');
const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "GcpLogger" });
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectGcpData(): Promise<GcpResources[]|null>{
    let resources = new Array<GcpResources>();
    for(let config of gcpConfig??[]){
        let gcpResources = {
            
        } as GcpResources;
        try{
            let projectId = await getConfigOrEnvVar(config, "PROJECTID", gcpConfig.indexOf(config)+"-");

            if(!projectId) {
                throw new Error("- Please pass PROJECTID in your config file");
            }else{
                logger.info("- loading client google cloud platform done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
        
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
                } as GcpResources;
            }
        }catch(e){
            logger.error("error in collectGcpData with the project ID: " + await getConfigOrEnvVar(config, "PROJECTID", gcpConfig.indexOf(config)+"-"));
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
    let result: any[] = [];
    const instancesClient = new compute.InstancesClient();
    const aggListRequest = instancesClient.aggregatedListAsync({
        project: projectId,
    });
    console.log('Instances in project:');
    console.log(aggListRequest);
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;

        if (instances && instances.length > 0) {
            result = [...result, ...instances]
            for (const instance of instances) {
                console.log(instance);
            }
        }
    }

    return (result.length)?result:null;
}

const {Storage} = require('@google-cloud/storage');
async function listAllBucket(projectId: string) {
    let result: string | any[] = [];
    const storage = new Storage({
        projectId,
    });
    const [buckets] = await storage.getBuckets();
    result = [...result, ...buckets];
    for (const bucket of buckets) {
        console.log(bucket);
    }
    return (result.length)?result:null;
}