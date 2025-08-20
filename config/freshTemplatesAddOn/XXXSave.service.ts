//change the path of this file to "~/Kexa/services/addOns/save/XXXSave.service.ts"
//change XXX by the name of your addOn
//change the path of this import to match the path of your addOn
//change the path of this file to "~/Kexa/services/addOns/save/XXXSave.service.ts"
//change XXX by the name of your addOn
//change the path of this import to match the path of your addOn
import type { ResultScan } from './../../Kexa/models/resultScan.models';
import type { SaveConfig } from "../../Kexa/models/export/config.models";

export async function save(save: SaveConfig, result: ResultScan[][]): Promise<void>{
    //code here to save the result in the format you want (database, file, etc.)
    //please dont forget to close the connection if you open one either if there is an error or not
}

//can add other function here