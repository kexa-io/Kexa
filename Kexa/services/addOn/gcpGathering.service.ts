/*
    * Provider : gcp
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - task
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { GcpResources } from "../../models/gcp/resource.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;

const config = require('config');
const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(): Promise<GcpResources[]|null>{
    let resources = new Array<GcpResources>();
    for(let config of gcpConfig??[]){
        let gcpResources = {
            
        } as GcpResources;
        try{
            let subscriptionId = await getConfigOrEnvVar(config, "PROJECTID", gcpConfig.indexOf(config)+"-");

            if(!subscriptionId) {
                throw new Error("- Please pass PROJECTID in your config file");
            }else{
                logger.info("- loading client microsoft azure done-");
                ///////////////// List cloud resources ///////////////////////////////////////////////////////////////////////////////////////////////
        
                const promises = [
                    listTasks(),
                ];
                
                const [taskList] = await Promise.all(promises);

                logger.info("- listing cloud resources done -");
                gcpResources = {
                    task : taskList,
                } as GcpResources;
            }
        }catch(e){
            logger.error("error in collectAzureData with the subscription ID: " + config["subscriptionId"]??null);
            logger.error(e);
        }
        resources.push(gcpResources);
    }
    return resources??null;
}

const {CloudTasksClient} = require('@google-cloud/tasks').v2;
async function listTasks(): Promise<Array<any>|null> {
    // Instantiates a client
    const tasksClient = new CloudTasksClient();
    // Construct request
    const request = {
        parent,
    };

    // Run request
    const iterable = await tasksClient.listTasksAsync(request);
    let result = [];
    for await (const response of iterable) {
        result.push(response);
    }
    return (result.length)?result:null;
}