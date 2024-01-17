import { ProviderResource } from '../../../models/providerResource.models';
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { MySQLSaveConfig } from '../../../models/export/mysql/config.models';
import { MySQLClass } from '../../saving/mySQL.service';
import { getConfig } from '../../../helpers/loaderConfig';

const logger = getNewLogger("mySQLExportLogger");
const context = getContext();

export async function exportation(save: MySQLSaveConfig, resources: ProviderResource): Promise<void>{
    let mySQL = new MySQLClass();
    try{
        if(!save.urlName) throw new Error("urlName is required");
        let url = (await getEnvVar(save.urlName))??save.urlName;
        const config = getConfig();
        await mySQL.createTables({
            uri: url
        });
        let providers = await mySQL.createAndGetProviders(Object.keys(resources));
        await Promise.all(Object.keys(resources).map(async (providerName) => {
            let providerId = providers[providerName];
            let providerResource = resources[providerName];
            await Promise.all(providerResource.map(async (resources, indexEnvironnement) => {
                let dataEnvironnementConfig = config[providerName][indexEnvironnement];
                const [originId, providerItemsId] = await Promise.all([
                    mySQL.createAndGetOrigin(dataEnvironnementConfig),
                    mySQL.createAndGetProviderItems(providerId, Object.keys(resources))
                ]);
                await Promise.all(Object.keys(resources).map(async (resourceName) => {
                    await mySQL.createAndGetResources(resources[resourceName], originId, providerItemsId[resourceName]);
                }));
            }));
        }));
        logger.info("All data exported in MySQL");
        await mySQL.disconnect();
    }catch(e:any){
        await mySQL.disconnect(true);
        throw e;
    }
}
