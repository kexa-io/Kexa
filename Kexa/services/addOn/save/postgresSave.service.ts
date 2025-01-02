import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { ResultScan } from '../../../models/resultScan.models';
import { PostgreSQLSaveConfig } from '../../../models/export/postgre/config.models';
import { PostgreSQLClass } from '../../saving/postgresSQL.service';
import {getConfigOrEnvVar} from '../../manageVarEnvironnement.service';

const logger = getNewLogger("pgSQLSaveLogger");
const context = getContext();

const { v4: uuidv4 } = require('uuid');


export async function save(save: PostgreSQLSaveConfig, result: ResultScan[][]): Promise<void> {
    let pgSQL = new PostgreSQLClass();
    let batchId = uuidv4();
    try {

        if(!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName))??save.urlName;

        await pgSQL.createTables({
            connectionString: url
        });

        await Promise.all(result.flat().map(async (resultScan) => {
            await saveResultScan(resultScan, save, pgSQL, batchId);
        }));
        
        logger.info("All data saved in PostgreSQL");
        await pgSQL.disconnect();
    } catch (e: any) {
        await pgSQL.disconnect(true);
        throw e;
    }
}

async function saveResultScan(resultScan: ResultScan, save: PostgreSQLSaveConfig, pgSQL: PostgreSQLClass, batchId: string): Promise<void> {
   
    let providerId = await pgSQL.createAndGetProvider(resultScan.rule.cloudProvider);
    let providerItem = (await pgSQL.getProviderItemsByNameAndProvider(providerId, resultScan.rule.objectName));
    let providerItemId = providerItem.ID;
    let ruleId = await pgSQL.createAndGetRule(resultScan.rule, providerId, providerItemId);
    let originId = await pgSQL.createAndGetOrigin({ name: save.origin ?? "Unknown" });
    let resourceId = await pgSQL.createAndGetResource(resultScan.objectContent, originId, providerItemId);

    if (resourceId === undefined) {
        throw new Error("Resource ID is undefined");
    }

    if (resultScan?.rule.objectName === "podLogs") {
        
        if (resultScan.error.length > 0) {
            logger.info("Saving scan (logs) for: " + providerItem.name);
            await pgSQL.createScan(resultScan, resourceId as number, ruleId, batchId);
        }
        
        if (save.logs && save.logs != undefined) {
            logger.info("Saving logs for: " + providerItem.name);
            const logPromises = resultScan.objectContent.logs.map(async (log: any) => {
                await pgSQL.createLog(log.line, resourceId as number);
            });
            await Promise.all(logPromises);
        }
    }
    else  {
        logger.info("Saving scan for: " + providerItem.name);
        await pgSQL.createScan(resultScan, resourceId as number, ruleId, batchId);
    }
}