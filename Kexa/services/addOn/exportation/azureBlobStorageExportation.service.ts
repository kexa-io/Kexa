import { AzureBlobStorageSaveConfig } from "../../../models/export/azureBlobStorage/config.models";
import { ProviderResource } from "../../../models/providerResource.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { saveJsonToAzureBlobStorage } from "../../saving/azureBlobStorage.service";

export async function exportation(save: AzureBlobStorageSaveConfig, result: ProviderResource): Promise<void>{
    if(!save.containerName) throw new Error("containerName is missing");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    await saveJsonToAzureBlobStorage(url, save, result);
}