/*
    * Provider : googleWorkspace
    * Creation date : 2023-08-16
    * Note : 
    * Resources :
    *     - drive
*/
import { Logger } from "tslog";
let debug_mode = Number(process.env.DEBUG_MODE)??3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AzureLogger" });

const { google } = require("googleapis");
const credentials = require("../../../config/client_secret_drive.json");
const fs = require("fs");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const { client_secret, client_id, redirect_uris } = credentials.installed??credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const TOKEN_PATH = "token.json";

try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
} catch (err) {
    console.error("Erreur de chargement du jeton d'accès :", err);
}

const drive = google.drive({ version: "v3", auth: oAuth2Client });
export async function collectData(){
    listFiles();
}

async function listFiles() {
    try {
        const response = await drive.files.list({
            q: "'root' in parents",
            fields: "files(*)",
        });

        const files = response.data.files;
        if (files.length) {
            logger.debug("Fichiers et dossiers dans le répertoire racine :");
            files.forEach((file: any) => {
                logger.debug(`${file.name} (${file.id})`);
            });
        } else {
            logger.debug("Aucun fichier trouvé.");
        }
    } catch (err) {
        console.error("Erreur lors de la récupération des fichiers :", err);
    }
}

