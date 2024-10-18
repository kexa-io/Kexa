import { Storage } from '@google-cloud/storage';
import { ResultScan } from '../models/resultScan.models';
import { getContext, getNewLogger } from "./logger.service";
import { loadAddOnsCustomUtility } from './addOn.service';
import { SaveConfig } from '../models/export/config.models';
import { getConfig } from '../helpers/loaderConfig';
import { jsonStringify } from '../helpers/jsonStringify';

let configuration: any;
async function init() {
    try {
        configuration = await getConfig();
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();
const logger = getNewLogger("SaveLogger");
const context = getContext();

export async function saveResult(result: ResultScan[][]): Promise<void> {
    if(!configuration.save) return Promise.resolve();
    const addOnSave: { [key: string]: Function; } = loadAddOnsCustomUtility("save", "save", configuration.save.map((save: SaveConfig) => save.type));
    if(!Array.isArray(configuration.save)) configuration.save = [configuration.save];
    let resultOnlyWithErrors = result.map((resultScan) => {
        return resultScan.filter((resultScan) => {
            return resultScan.error.length > 0;
        });
    });
    let dataToSave = [ result, resultOnlyWithErrors ];
    Promise.all(configuration.save.map(async (save: SaveConfig) => {
        if(addOnSave[save.type]){
            try{
                await addOnSave[save.type](save, dataToSave[save.onlyErrors??false ? 1 : 0]);
            }catch(e:any){
                logger.error("Error in save " + save.type + " : " + e.message);
                context?.log("Error in save " + save.type + " : " + e.message);
                logger.debug(e);
            }
        }else{
            logger.warn('Unknown save type: ' + save.type);
            context?.log('Unknown save type: ' + save.type);
        }
        return Promise.resolve();
    }));
}

async function saveJsonToGcpBucket(bucketName: string, objectKey: string, json: object): Promise<void> {
    await new Storage().bucket(bucketName).file(objectKey).save(jsonStringify(json));
}