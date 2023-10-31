import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";

const fs = require("fs");

async function releaseCapability(){
    let rules = await gatheringRules("./Kexa/rules", true);
    let freeRules = [...rules.map((rule: SettingFile) => {
        return rule.rules
    })];
    let headers = await extractHeaders();
    freeRules.flat(1).forEach((rule: Rules) => {
        if(headers[rule.cloudProvider]){
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });

    console.log(JSON.stringify(headers, null, 4));
    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
}

function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}

if (require.main === module) {
    releaseCapability();
    updateVersion();
}