import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { ResultScan } from '../../../models/resultScan.models';
import { PostgreSQLSaveConfig } from '../../../models/export/postgre/config.models';
import { PostgreSQLClass } from '../../saving/postgresSQL.service';

const logger = getNewLogger("pgSQLSaveLogger");
const context = getContext();

export async function save(save: PostgreSQLSaveConfig, result: ResultScan[][]): Promise<void> {
    let pgSQL = new PostgreSQLClass();
    try {
        if (!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName)) ?? save.urlName;
        await pgSQL.createTables({
            connectionString: url // Use `connectionString` instead of `uri`
        });
        await Promise.all(result.flat().map(async (resultScan) => {
            await saveResultScan(resultScan, save, pgSQL);
        }));

        logger.info("All data saved in PostgreSQL");
        await pgSQL.disconnect();
    } catch (e: any) {
        await pgSQL.disconnect(true);
        throw e;
    }
}

async function saveResultScan(resultScan: ResultScan, save: PostgreSQLSaveConfig, pgSQL: PostgreSQLClass): Promise<void> {
    let providerId = await pgSQL.createAndGetProvider(resultScan.rule.cloudProvider);
    let providerItemId = (await pgSQL.getProviderItemsByNameAndProvider(providerId, resultScan.rule.objectName)).ID;
    let ruleId = await pgSQL.createAndGetRule(resultScan.rule, providerId, providerItemId);
    let originId = await pgSQL.createAndGetOrigin({ name: save.origin ?? "Unknown" });
    let resourceId = await pgSQL.createAndGetResource(resultScan.objectContent, originId, providerItemId);
    if (resourceId === undefined) {
        throw new Error("Resource ID is undefined");
    }
    await pgSQL.createScan(resultScan, resourceId as number, ruleId);
}