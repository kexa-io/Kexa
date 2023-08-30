/*
    * Provider : gcp
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - user
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { googleResources } from "../../models/google/ressource.models";
import { googleConfig } from "../../models/google/config.models";
import {DefaultAzureCredential} from "@azure/identity";
import {deleteFile, writeStringToJsonFile} from "../../helpers/files";
import { google } from 'googleapis';

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

let debug_mode = Number(process.env.DEBUG_MODE)??3;

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "o365Logger" });

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(googleConfig:googleConfig[]): Promise<googleResources[] | null> {
    let resources = new Array<googleResources>();

   /* for (let config of googleConfig??[]) {
        let googleResources = {
            "subscription": null,
            "user": null
        } as googleResources;
        try {
            let projectId = await getConfigOrEnvVar(config, "GOOGLE_PROJECT_ID", googleConfig.indexOf(config)+"-");
            writeStringToJsonFile(await getConfigOrEnvVar(config, "GOOGLE_APPLICATION_CREDENTIALS", googleConfig.indexOf(config)+"-"), "./config/google.json");

            credentials = Credentials.from_authorized_user_file('./config/google.json', scopes=['https://www.googleapis.com/auth/admin.directory.user.readonly'])

            logger.info("- listing Google resources -");
                const promises = [
                    await listUnused(graphApiEndpoint, accessToken, headers),
                    await listUsers(graphApiEndpoint, accessToken, headers)
                ];
                const [subscriptionList, userList] = await Promise.all(promises);

                googleResources = {
                    user: userList
                };
                logger.info("- listing Google resources done -");
        } catch (e) {
            logger.error("error in collect Google data: ");
            logger.error(e);
        }
        deleteFile("./config/google.json");
        resources.push(googleResources);
    }*/
    return resources ?? null;
}