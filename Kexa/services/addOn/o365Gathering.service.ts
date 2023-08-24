/*
    * Provider : gcp
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *     - subscription
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { o365Resources } from "../../models/o365/ressource.models";
import { o365Config } from "../../models/o365/config.models";
import {GcpConfig} from "../../models/gcp/config.models";
import {GCPResources} from "../../models/gcp/resource.models";
import {listSecrets} from "./gcpGathering.service";
import {DefaultAzureCredential} from "@azure/identity";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

let debug_mode = Number(process.env.DEBUG_MODE)??3;

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "o365Logger" });

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(gcpConfig:GcpConfig[]): Promise<o365Resources[] | null> {
    let resources = new Array<o365Resources>();

    for (let config of gcpConfig??[]) {
        let o365Resources = {
            "subscription": null
        } as o365Resources;
        try {
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", gcpConfig.indexOf(config)+"-");
            setEnvVar("AZURE_CLIENT_ID", await getConfigOrEnvVar(config, "AZURECLIENTID", gcpConfig.indexOf(config)+"-"))
            setEnvVar("AZURE_CLIENT_SECRET", await getConfigOrEnvVar(config, "AZURECLIENTSECRET", gcpConfig.indexOf(config)+"-"))
            setEnvVar("AZURE_TENANT_ID", await getConfigOrEnvVar(config, "AZURETENANTID", gcpConfig.indexOf(config)+"-"))

            const credential = new DefaultAzureCredential();
            if(!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            } else {

                logger.info("- listing O365 resources -");
                const promises = [
                    await listSubscriptions()
                ];
                const [subscriptionList] = await Promise.all(promises);

                o365Resources = {
                    subscription: subscriptionList
                };
                logger.info("- listing O365 resources done -");
            }
        } catch (e) {
            logger.error("error in collect O365 data: ");
            logger.error(e);
        }
        resources.push(o365Resources);
    }
    return resources ?? null;
}

async function  listSubscriptions(): Promise<Array<any> | null> {
    return (new Array<any>());
}