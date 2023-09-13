/*
    * Provider : googleWorkspace
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - user
    *       - domain
    *       - group
*/

const process = require('process');

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { googleWorkspaceResources } from "../../models/googleWorkspace/ressource.models";
import { googleWorkspaceConfig } from "../../models/googleWorkspace/config.models";
import {deleteFile, writeStringToJsonFile} from "../../helpers/files";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

let debug_mode = Number(process.env.DEBUG_MODE)??3;

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "googleWorkspaceLogger" });

const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.domain.readonly',
    'https://www.googleapis.com/auth/admin.directory.group.readonly'];

//getConfigOrEnvVar();
const TOKEN_PATH = path.join(process.cwd(), '/config/token_workspace.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials_workspace.json');

export async function collectData(googleWorkspaceConfig:googleWorkspaceConfig[]): Promise<googleWorkspaceResources[] | null> {
    let resources = new Array<googleWorkspaceResources>();


    for (let config of googleWorkspaceConfig??[]) {
        let googleWorkspaceResources = {
            "user": null,
            "domain": null,
            "group": null
        } as googleWorkspaceResources;
        try {
            writeStringToJsonFile(await getConfigOrEnvVar(config, "WORKSPACECRED", googleWorkspaceConfig.indexOf(config)+"-"), path.join(process.cwd(), '/config/credentials_workspace.json'));
            if (process.env[googleWorkspaceConfig.indexOf(config)+"-WORKSPACETOKEN"])
                writeStringToJsonFile(await getConfigOrEnvVar(config, "WORKSPACETOKEN", googleWorkspaceConfig.indexOf(config)+"-"), "./config/token_workspace.json");
            const auth = await authorize();
                const promises = [
                    await listUsers(auth),
                    await listDomains(auth),
                    await listGroups(auth)
                ];
                const [userList, domainList, groupList] = await Promise.all(promises);

                googleWorkspaceResources = {
                    user: userList,
                    domain: domainList,
                    group: groupList
                };
                logger.info("- listing googleWorkspace resources done -");
            }
            catch (e)
            {
                logger.error("error in collect googleWorkspace data: ");
                logger.error(e);
            }
        deleteFile("./config/credentials_workspace.json");
        deleteFile("./config/token_workspace.json");
        resources.push(googleWorkspaceResources);
    }
    return resources ?? null;
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

async function saveCredentials(client: any) {
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

async function listUsers(auth: any): Promise<Array<any> | null> {
    let jsonData = [];

    const service = google.admin({version: 'directory_v1', auth});
    const res = await service.users.list({
        customer: 'my_customer',
        orderBy: 'email',
    });
    const users = res.data.users;
    if (!users || users.length === 0) {
        console.log('No users found.');
        return null;
    }
    jsonData = JSON.parse(JSON.stringify(users));
    return jsonData ?? null;
}
async function listDomains(auth: any): Promise<Array<any> | null> {
   let jsonData = [];

    const admin = google.admin({version: 'directory_v1', auth});
    try {
        const domainResponse = await admin.domains.list({
            customer: 'my_customer',
        });
        const domains = domainResponse.data.domains;
        for (let i = 0; i < domains.length; i++) {
            let newJsonEntry = {};
            try {
                const admin = google.admin({ version: 'directory_v1', auth });

                const domainResponse = await admin.domains.get({
                    customer: 'my_customer',
                    domainName: domains[i].domainName,
                });
                newJsonEntry = {
                    domainName: domains[i].domainName,
                    domainInfos: domainResponse.data
                }
                jsonData.push(JSON.parse(JSON.stringify(newJsonEntry)));
            } catch (e) {
                logger.error(e);
            }
        }
    } catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}

async function listGroups(auth: any): Promise<Array<any> | null> {
    let jsonData = [];

    const admin = google.admin({version: 'directory_v1', auth});
    try {
        const groupResponse = await admin.groups.list({
            customer: 'my_customer',
        });
        const groups = groupResponse.data.groups;
        if (groupResponse.data.groups)
            jsonData = JSON.parse(JSON.stringify(groups));
        else
            return null;
    } catch (e) {
        logger.error(e);
    }
    return jsonData ?? null;
}