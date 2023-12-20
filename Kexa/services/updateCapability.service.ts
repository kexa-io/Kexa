import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";
import { getNewLogger } from "./logger.service";

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
    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
}

function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}

function updateREADME(){
    let readme = fs.readFileSync("./README.md", "utf8");
    let packageJson = require("../../capacity.json");
    const tab = "    ";
    let gaol = "\n\n"
    Object.keys(packageJson).forEach((key: string) => {
        gaol += `- ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:\n`
        packageJson[key]["resources"].forEach((resource: string) => {
            gaol += `${tab}- ✅ ${resource}\n`
        });
    });
    readme = readme.split("<div class='spliter_code'></div>")
    readme[1] = gaol + "\n";
    readme = readme.join("<div class='spliter_code'></div>")
    fs.writeFileSync("./README.md", readme);
}

if (require.main === module) {
    releaseCapability();
    updateREADME();
    updateVersion();
}