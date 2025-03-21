import { AzureBlobStorageSaveConfig } from "../../../models/export/azureBlobStorage/config.models";
import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { saveJsonToAzureBlobStorage } from "../../saving/azureBlobStorage.service";
import { getConfigOrEnvVar } from "../../manageVarEnvironnement.service";

export async function save(save: AzureBlobStorageSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.containerName) throw new Error("containerName is missing");
    if (save.urlName === undefined && save.prefix === undefined) throw new Error("urlName or prefix is required");
    let url = "";
    if (save.urlName)
        url = save.urlName;
    else {
        const config = save;
        url = await getConfigOrEnvVar(config, save.type, save.prefix);    
    }
    await saveJsonToAzureBlobStorage(url, save, {data: result});
}