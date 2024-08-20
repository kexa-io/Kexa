import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { MySQLSaveConfig } from '../../../models/export/mysql/config.models';
import { MySQLClass } from '../../saving/mySQL.service';
import { ResultScan } from '../../../models/resultScan.models';

const logger = getNewLogger("mySQLSaveLogger");
const context = getContext();

const { v4: uuidv4 } = require('uuid');

export async function save(save: MySQLSaveConfig, result: ResultScan[][]): Promise<void>{
    let mySQL = new MySQLClass();
    let batchId = uuidv4();
    try{
        if(!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName))??save.urlName;
        await mySQL.createTables({
            uri: url
        });
        await Promise.all(result.flat().map(async (resultScan) => {
            await saveResultScan(resultScan, save, mySQL, batchId);
        }));
    
        logger.info("All data saved in MySQL");
        await mySQL.disconnect();
    }catch(e:any){
        await mySQL.disconnect(true);
        throw e;
    }
}

async function saveResultScan(resultScan: ResultScan, save: MySQLSaveConfig, mySQL:MySQLClass, batchId: string): Promise<void>{
    let providerId = await mySQL.createAndGetProvider(resultScan.rule.cloudProvider);
    let providerItemId = (await mySQL.getProviderItemsByNameAndProvider(providerId, resultScan.rule.objectName)).ID;
    let ruleId = await mySQL.createAndGetRule(resultScan.rule, providerId, providerItemId);
    let originId = await mySQL.createAndGetOrigin({name: save.origin??"Unknown"});
    let resourceId = await mySQL.createAndGetResource(resultScan.objectContent, originId, providerItemId);
    await mySQL.createScan(resultScan, resourceId, ruleId, batchId);
}