
import { getConfig } from "../helpers/loaderConfig";
import { Rules } from "../models/settingFile/rules.models";
import { loadAddOnsCustomUtility } from "./addOn.service";
import { getNewLogger } from "./logger.service";
const configuration = getConfig();
const generalConfig = (configuration.hasOwnProperty("general")) ? configuration["general"] : null;
const logger = getNewLogger("MemoisationLogger");

interface ItemMemoisationInterface {
    time: Date;
    idScan: string;
}

export class Memoisation{
    private static cache = new Map<string, ItemMemoisationInterface>();
    private static addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");
    private static lastGlobalAlert: Date;

    public static setCache(rule: Rules, value: any, idScan:string): void {
        const key = Memoisation.addOnPropertyToSend[rule.cloudProvider](rule, value) + "Rule: " + rule.name + "Level: " + rule.level;
        Memoisation.cache.set(key, {
            "time": new Date(),
            idScan
        });
        setTimeout(function() {
            Memoisation.clearCache(key)
        }, Math.max(~~generalConfig?.alertInterval *1000, 0));
    }

    public static clearCache(key: string): void {
        logger.debug("Clearing cache for key: "+key);
        Memoisation.cache.delete(key);
    }

    public static needToBeCache(rule: Rules, value: any, idScan:string, start?:Date): boolean {
        const key = Memoisation.addOnPropertyToSend[rule.cloudProvider](rule, value) + "Rule: " + rule.name + "Level: " + rule.level;
        if (!Memoisation.cache.has(key)){ // all new object pass here and need to be save
            Memoisation.setCache(rule, value, idScan);
            return true;
        }else{
            if((Memoisation.cache.get(key)?.time??new Date()) >= (start??new Date())){ // in case of individual alert this object has already saved but in the global alert we don't need to save it again but keep it for the global alert
                return true;
            }
            return false;
        }
    }

    public static canSendGlobalAlert(): boolean {
        if(!generalConfig?.alertInterval) return true;
        if(!Memoisation.lastGlobalAlert){
            Memoisation.lastGlobalAlert = new Date();
            return true;
        }
        if(Memoisation.lastGlobalAlert <= new Date(new Date().getTime() - (~~generalConfig.alertInterval * 1000))){
            Memoisation.lastGlobalAlert = new Date();
            return true;
        }
        return false;
    }
}
