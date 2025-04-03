/*
    * Provider : googleDrive
    * Thumbnail : https://icones.pro/wp-content/uploads/2022/08/logo-google-drive.png
    * Documentation : https://developers.google.com/drive/api/reference/rest/v3?hl=fr
    * Creation date : 2023-08-16
    * Note : 
    * Resources :
    *     - files
*/

const process = require('process');
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, writeStringToJsonFile } from "../../helpers/files";

import {getNewLogger} from "../logger.service";
const logger = getNewLogger("GoogleDriveLogger");

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const SA_CREDENTIALS_PATH = path.join(process.cwd(), './config/credentials_drive.json');

export async function collectData(googleDriveConfig: any) {
    let resources = []
    for(let config of googleDriveConfig??[]) {
        let prefix = config.prefix??(googleDriveConfig.indexOf(config).toString());
        
        try {
            const credContent = await getConfigOrEnvVar(config, "DRIVECRED", prefix);
            
            if (credContent.trim().startsWith('{')) {
                writeStringToJsonFile(credContent, SA_CREDENTIALS_PATH);
            } else {
                const fileContent = await fs.readFile(credContent.trim(), 'utf8');
                writeStringToJsonFile(fileContent, SA_CREDENTIALS_PATH);
            }
            
            let authClient = await authorizeServiceAccount();
            let files = await listFiles(authClient);
            
            resources.push({
                "files": files
            });
        } catch (err) {
            logger.error("Error processing credentials:", err);
        } finally {
            try {
                await deleteFile(SA_CREDENTIALS_PATH);
            } catch (e) {
                logger.error("Error deleting credentials file:", e);
            }
        }
    }
    logger.debug("Google Drive resources collected");
    return resources??null;
}

async function authorizeServiceAccount() {
    try {
        const content = await fs.readFile(SA_CREDENTIALS_PATH, 'utf8');
        const credentials = JSON.parse(content);
        
        const authClient = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: ['https://www.googleapis.com/auth/drive.readonly']
        });
        
        return authClient;
    } catch (err) {
        logger.error("Error authorizing service account:", err);
        throw err;
    }
}

async function listFiles(authClient:any) {
    const driveService = google.drive({ version: 'v3', auth: authClient });
    try {
        const response = await driveService.files.list({
            fields: "files(*)",
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
        });
        const files = response.data.files;
        if (files && files.length) {
            logger.debug(`Found ${files.length} files`);
            return files;
        } else {
            logger.debug("No files found");
            return [];
        }
    } catch (err) {
        console.debug("Erreur lors de la récupération des fichiers :", err);
    }
}

