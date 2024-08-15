import { ProviderResource } from '../../../models/providerResource.models';
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { PostgreSQLSaveConfig } from '../../../models/export/postgre/config.models';
import { PostgreSQLClass } from '../../saving/postgreSQL.service';
import { getConfig } from '../../../helpers/loaderConfig';

const logger = getNewLogger("pgSQLExportLogger");
const context = getContext();

export async function exportation(save: PostgreSQLSaveConfig, resources: ProviderResource): Promise<void>{

    //////////////////////////
    ///////////// USE A TIMEOUT
    ///////////////////////////
    let pgSQL = new PostgreSQLClass();
    try{
        if(!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName)) ?? save.urlName;
        const config = getConfig();
        try {
            await pgSQL.createTables({
                connectionString: url
            });
        } catch (e) {
            logger.warn("Error in creating tables: ", e);
            throw e;
        }
        let providers = await pgSQL.createAndGetProviders(Object.keys(resources));
        await Promise.all(Object.keys(resources).map(async (providerName) => {
            let providerId = providers[providerName];
            let providerResource = resources[providerName];
            await Promise.all(providerResource.map(async (resource, indexEnvironnement) => {
                let dataEnvironnementConfig = config[providerName][indexEnvironnement];
                const [originId, providerItemsId] = await Promise.all([
                    pgSQL.createAndGetOrigin(dataEnvironnementConfig),
                    pgSQL.createAndGetProviderItems(providerId, Object.keys(resource))
                ]);
                try  {
                    await Promise.all(Object.keys(resource).map(async (resourceName) => {
                        await pgSQL.createAndGetResources(resource[resourceName], originId, providerItemsId[resourceName]);
                    }));
                } catch (e) {
                    logger.warn("Error in creating resources: ", e);
                    throw e;
                }
            }));
        }));
        try {
            await pgSQL.disconnect(true);
        } catch (e) {
            logger.warn("Error in closing connection: ", e);
            throw e;
        }
        logger.info("All data exported to PostgreSQL");
    }catch(e:any){
        logger.warn("Error in exportation to PostgreSQL: " + e);
        await pgSQL.disconnect(true);
        throw e;
    }
}