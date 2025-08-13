import { getContext, getNewLogger } from "./logger.service";
import { loadAddOnsCustomUtility } from './addOn.service';
import type { SaveConfig } from '../models/export/config.models';
import { getConfig } from '../helpers/loaderConfig';
import type { ProviderResource } from '../models/providerResource.models';

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

export async function exportationData(resources: ProviderResource): Promise<any[]> {
    if(!configuration.export) return [];
    const addOnExportation: { [key: string]: Function; } = loadAddOnsCustomUtility("exportation", "exportation", configuration.export.map((save: SaveConfig) => save.type));
    if(!Array.isArray(configuration.export)) configuration.export = [configuration.export];
    let promises = Promise.all(configuration.export.map(async (save: SaveConfig) => {
        const exportFn = addOnExportation[save.type];
        if (typeof exportFn === "function") {
            try {
                await exportFn(save, resources);
            } catch (e: any) {
                logger.error("Error in exportation " + save.type + " : " + e.message);
                context?.log("Error in exportation " + save.type + " : " + e.message);
                logger.debug(e);
            }
        } else {
            logger.warn('Unknown exportation type: ' + save.type);
            context?.log('Unknown exportation type: ' + save.type);
        }
    }));
    return promises;
}