import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { MySQLSaveConfig } from '../../../models/export/mysql/config.models';
import { MySQLSingleton, createAndGetOrigin, createAndGetResource, createAndGetRule, createScan, getOneProviderByName, getProviderItemsByNameAndProvider } from '../../saving/mySQL.service';
import { ResultScan } from '../../../models/resultScan.models';

const logger = getNewLogger("mySQLSaveLogger");
const context = getContext();

export async function save(save: MySQLSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.urlName) throw new Error("urlName is required");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    await MySQLSingleton.createTables({
        uri: url
    });
    await Promise.all(result.flat().map(async (resultScan) => {
        let providerId = (await getOneProviderByName(resultScan.rule.cloudProvider)).ID
        let providerItemId = (await getProviderItemsByNameAndProvider(providerId, resultScan.rule.objectName)).ID
        let ruleId = await createAndGetRule(resultScan.rule, providerId, providerItemId);
        let originId = await createAndGetOrigin({name: save.origin??"Unknown"});
        logger.warn("originId" + originId)
        let resourceId = await createAndGetResource(resultScan.objectContent, originId, providerItemId);
        logger.warn("resourceId" + resourceId)
        await createScan(resultScan, resourceId, ruleId)
    }));

    logger.info("All data saved in MySQL");
    await MySQLSingleton.disconnect();
}
