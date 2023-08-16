/*
* Provider : drive
* Creation date : 2023-08-16
* Note : 
* Resources :
*     - files
*/
const process = require('process');
import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, writeStringToJsonFile } from "../../helpers/files";

let debug_mode = Number(process.env.DEBUG_MODE)??3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });
const config = require('config');
const googleWorkspaceConfig = (config.has('drive'))?config.get('drive'):null;
const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = path.join(process.cwd(), '/config/token_drive.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials_drive.json');

export async function collectData(){
    let resources = []
    for(let config of googleWorkspaceConfig??[]){
        logger.error("config : ", config);
        //writeStringToJsonFile(await getConfigOrEnvVar(config, "DRIVECRED", googleWorkspaceConfig.indexOf(config)+"-"), "./config/credentials_drive.json");
        //writeStringToJsonFile(await getConfigOrEnvVar(config, "DRIVETOKEN", googleWorkspaceConfig.indexOf(config)+"-"), "./config/token_drive.json");
        let auth = await authorize()
        let files = await listFiles(auth);
        //deleteFile("./config/credentials_drive.json");
        //deleteFile("./config/token_drive.json");
        resources.push({
            "files": files
        });
    }
    return resources??null;
}

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any ) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}


async function listFiles(auth:any) {
    const drive = google.drive({ version: "v3", auth });
    try {
        const response = await drive.files.list({
            q: "'root' in parents",
            fields: "files(*)",
        });

        const files = response.data.files;
        if (files.length) {
            logger.debug(files[0]);
            return files;
        } else {
            return null;
        }
    } catch (err) {
        console.error("Erreur lors de la récupération des fichiers :", err);
    }
}

