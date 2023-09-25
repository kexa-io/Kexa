import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";

async function releaseCapability(){
    let rules = await gatheringRules("./Kexa/rules");
    let freeRules = [...rules.map((rule: SettingFile) => {
        return rule.rules.map((r: Rules) => {
            return {
                "name": r.name,
                "provider": r.cloudProvider,
                "description": r.description,
                "objectName": r.objectName,
            }
        });
    })];
    let headers = await extractHeaders();
    console.log(JSON.stringify({
        "addOn" : headers,
        "rules": freeRules.flat(1),
    }, null, 4));
}

if (require.main === module) {
    releaseCapability();
}