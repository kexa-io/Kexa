import { AzureBlobStorageSaveConfig } from "../../../models/export/azureBlobStorage/config.models";
import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { saveJsonToAzureBlobStorage } from "../../saving/azureBlobStorage.service";

export async function save(save: AzureBlobStorageSaveConfig, result: ResultScan[][]): Promise<void>{
    if(!save.containerName) throw new Error("containerName is missing");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    await saveJsonToAzureBlobStorage(url, save, {data: result});
}