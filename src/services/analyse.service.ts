import { Logger } from "tslog";
import fs from "fs";
import yaml from "js-yaml";
import { SettingFile } from "../models/settingFile/settingFile.model";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
export async function mainAnalyse(rulesDirectory:string) {
    // list directory
    const paths = fs.readdirSync(rulesDirectory, { withFileTypes: true});
    logger.debug("listing rules files.");
    for(const p of paths) {
        logger.debug("getting "+rulesDirectory+"/"+p.name+" rules.");
        //let fileContent = fs.readFileSync(rulesDirectory+"/"+p.name, 'utf8');
        await analyseRule(rulesDirectory+"/"+p.name);
    }
}

export async function analyseRule(ruleFilePath:string) {
    logger.debug("analyse:"+ruleFilePath);
    try {
        const doc = (yaml.load(fs.readFileSync(ruleFilePath, 'utf8')) as SettingFile[])[0];

        //TODO : be more precise on the type of doc
        console.log("doc", doc);
        for( let rule of doc.rules) {
            console.log(rule);
            logger.debug("name:"+rule.name);
            logger.debug("description:"+rule.description);
            logger.debug("applied:"+rule.applied);
            logger.debug("conditions:"+rule.conditions);
            if( rule.conditions) for(let condition of rule.conditions) {
                logger.debug("cloudProvider:"+condition.cloudProvider);
                logger.debug("objectName:"+condition.objectName);
                logger.debug("function:"+condition.function);
                logger.debug("condition:"+condition.condition);
                logger.debug("value:"+condition.value);
            }
        }
    } catch (e) {
        logger.error("error"+e);
    }    
}