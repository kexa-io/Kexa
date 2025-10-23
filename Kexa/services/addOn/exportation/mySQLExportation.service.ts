import type { ProviderResource } from '../../../models/providerResource.models';
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import type { MySQLSaveConfig } from '../../../models/export/mysql/config.models';
import { MySQLClass } from '../../saving/mySQL.service';
import { getConfig } from '../../../helpers/loaderConfig';

const logger = getNewLogger("mySQLExportLogger");
const context = getContext();

export async function exportation(save: MySQLSaveConfig, resources: ProviderResource): Promise<void>{
    let mySQL = new MySQLClass();
    try{
        if(!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName))??save.urlName;
        const config = await getConfig();
        await mySQL.createTables({
            uri: url
        });
        let providers = await mySQL.createAndGetProviders(Object.keys(resources));
        await Promise.all(Object.keys(resources).map(async (providerName) => {
            let providerId = providers[providerName];
            let providerResource = resources[providerName];
            if (providerResource && typeof providerId === "number") {
                await Promise.all(providerResource.map(async (resources, indexEnvironnement) => {
                    let dataEnvironnementConfig = config[providerName][indexEnvironnement];
                    const [originId, providerItemsId] = await Promise.all([
                        mySQL.createAndGetOrigin(dataEnvironnementConfig),
                        mySQL.createAndGetProviderItems(providerId, Object.keys(resources))
                    ]);
                    await Promise.all(Object.keys(resources).map(async (resourceName) => {
                        const itemId = providerItemsId[resourceName];
                        if (typeof itemId === "number") {
                            await mySQL.createAndGetResources(resources[resourceName], originId, itemId);
                        } else {
                            logger.warn(`Provider item ID for resource '${resourceName}' is undefined and will be skipped.`);
                        }
                    }));
                }));
            } else if (!providerId) {
                logger.warn(`Provider ID for '${providerName}' is undefined and will be skipped.`);
            }
        }));
        logger.info("All data exported in MySQL");
        await mySQL.disconnect();
    }catch(e:any){
        await mySQL.disconnect(true);
        throw e;
    }
}
