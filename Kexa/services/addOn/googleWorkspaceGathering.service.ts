/*
    * Provider : googleWorkspace
    * Thumbnail : https://lh3.googleusercontent.com/sYGCKFdty43En6yLGeV94mfNGHXfVj-bQYitHRndarB7tHmQq_kyVxhlPejeCBVEEYUbnKG2_jUzgNXoPoer6XJm71V3uz2Z6q0CmNw=w0
    * Documentation : https://developers.google.com/workspace?hl=fr
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - user
    *       - domain
    *       - group
    *       - role
    *       - orgaunit
    *       - calendar
    *       - file
    *       - drive
*/

const process = require('process');

import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { googleWorkspaceResources } from "../../models/googleWorkspace/ressource.models";
import { googleWorkspaceConfig } from "../../models/googleWorkspace/config.models";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import { jsonStringify } from '../../helpers/jsonStringify';

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("googleWorkspaceLogger");

const fs = require('fs').promises;
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
let currentConfig: googleWorkspaceConfig;
import { JWT } from 'google-auth-library';

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////


//////////////////////////////////
// DELETE NOT READ ONLY AND TRY //
//////////////////////////////////
const SCOPES = [
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.domain',
    'https://www.googleapis.com/auth/admin.directory.group',
    'https://www.googleapis.com/auth/admin.directory.rolemanagement',
    'https://www.googleapis.com/auth/admin.directory.orgunit',
    'https://www.googleapis.com/auth/calendar',
    // 'https://www.googleapis.com/auth/calendar.settings.readonly',
    // 'https://www.googleapis.com/auth/calendar.acls.readonly',
    'https://www.googleapis.com/auth/admin.directory.resource.calendar',
    'https://www.googleapis.com/auth/drive'
];

const TOKEN_PATH = path.join(process.cwd(), '/config/token_workspace.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials_workspace.json');


export async function collectData(googleWorkspaceConfig:googleWorkspaceConfig[]): Promise<googleWorkspaceResources[] | null> {
    let context = getContext();
    let resources = new Array<googleWorkspaceResources>();

    for (let config of googleWorkspaceConfig??[]) {
        currentConfig = config;
        let googleWorkspaceResources = {
            "user": null,
            "domain": null,
            "group": null,
            "role": null,
            "orgaunit": null,
            "calendar": null,
            "file": null,
            "drive": null
        } as googleWorkspaceResources;
        try {
            let prefix = config.prefix??(googleWorkspaceConfig.indexOf(config).toString());

            const workspaceEnvCredentials = await getConfigOrEnvVar(config, "WORKSPACECRED", prefix);
            const workspaceToken = await getConfigOrEnvVar(config, "WORKSPACETOKEN", prefix);
        
            if (workspaceEnvCredentials && workspaceEnvCredentials.includes(".json")) {
                const workCred = getFile(JSON.parse(JSON.stringify(workspaceEnvCredentials)));
                writeStringToJsonFile(workCred as string, path.join(process.cwd(), '/config/credentials_workspace.json'));

            } else {
                writeStringToJsonFile(await getConfigOrEnvVar(config, "WORKSPACECRED", prefix), path.join(process.cwd(), '/config/credentials_workspace.json'));
            }
            if (process.env[googleWorkspaceConfig.indexOf(config)+"-WORKSPACETOKEN"])
                writeStringToJsonFile(await getConfigOrEnvVar(config, "WORKSPACETOKEN", prefix), "./config/token_workspace.json");
            let auth = await authorizeSP(); // for service account
            if (workspaceEnvCredentials) {
                if (workspaceEnvCredentials.includes(".json")) {
                    const workCred = getFile(JSON.parse(JSON.stringify(workspaceEnvCredentials)));
                    await writeStringToJsonFile(workCred as string, CREDENTIALS_PATH);
                } else {
                    await writeStringToJsonFile(workspaceEnvCredentials, CREDENTIALS_PATH);
                }
            }

            const promises = [
                    await listUsers(auth),
                    await listDomains(auth),
                    await listGroups(auth),
                    await listRoles(auth),
                    await listOrganizationalUnits(auth),
                    await listCalendars(auth),
                    await listFiles(auth),
                    await listDrive(auth)
                ];
                const [userList, domainList, groupList, roleList, orgaunitList, calendarList, fileList, driveList] = await Promise.all(promises);

                googleWorkspaceResources = {
                    user: userList,
                    domain: domainList,
                    group: groupList,
                    role: roleList,
                    orgaunit: orgaunitList,
                    calendar: calendarList,
                    file: fileList,
                    drive: driveList
                };
                context?.log("- listing googleWorkspace resources done -");
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
    const payload = jsonStringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

const authorizeWithToken = async (scopes: string[], user: string)=>{
   
    const SRVC_ACCOUNT_CREDS = getFile(CREDENTIALS_PATH);
  
    const auth = new google.auth.GoogleAuth({
      credentials: SRVC_ACCOUNT_CREDS
    //   scopes: scopes
    });
    const client = await auth.getClient();
    return client;
};

async function authorizeSP() {
    const client = new google.auth.JWT({
        keyFile: CREDENTIALS_PATH,
        scopes: SCOPES,
        subject: 'aeepling@innovtech.eu', 
    });

    return client;
}

async function authorizeUser() {
 
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
    if(!currentConfig?.ObjectNameNeed?.includes("user")) return null;
    await auth.authorize();

    let jsonData = [];

    const service = google.admin({version: 'directory_v1', auth});
    const res = await service.users.list({
        customer: 'my_customer',
        orderBy: 'email',
    });
    const users = res.data.users;
    if (!users || users.length === 0) {
        return null;
    }
    jsonData = JSON.parse(jsonStringify(users));
    let nbSuperAdmin = 0;
    for (let i = 0; i < jsonData.length; i++) {
        const service = google.admin({ version: 'directory_v1', auth });
        let isSuperAdmin = false;
        try {
            const adminRoles = await service.roles.list({
                customer: 'my_customer',
                userKey: jsonData[i].primaryEmail,
            });
            jsonData[i].adminRoles = JSON.parse(jsonStringify(adminRoles.data.items));
            jsonData[i].adminRoles.forEach((element: any) => {
                if (element.isSuperAdminRole == true) {
                    isSuperAdmin = true;
                }
            });

        } catch (error) {
            logger.debug('Error listing user roles:', error);
            return [];
        }
        if (isSuperAdmin) {
            nbSuperAdmin = nbSuperAdmin + 1;
        }
    }
    jsonData.forEach((element: any) => {
        element.totalSuperAdmin = nbSuperAdmin;
    })
    return jsonData ?? null;
}
async function listDomains(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("domain")) return null;
    await auth.authorize();

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
                jsonData.push(JSON.parse(jsonStringify(newJsonEntry)));
            } catch (e) {
                logger.debug(e);
            }
        }
    } catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}

async function listGroups(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("group")) return null;
    await auth.authorize();

    let jsonData = [];

    const admin = google.admin({version: 'directory_v1', auth});
    try {
        const groupResponse = await admin.groups.list({
            customer: 'my_customer',
        });
        const groups = groupResponse.data;
        if (groups)
            jsonData = JSON.parse(jsonStringify(groups));
        else
            return null;
    } catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}

async function listRoles(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("role")) return null;
    await auth.authorize();

    let jsonData = [];

    const service = google.admin({version: 'directory_v1', auth});

    try {
        const adminRoles = await service.roles.list({
            customer: 'my_customer',
        });
        jsonData = JSON.parse(jsonStringify(adminRoles.data.items));
    } catch (error) {
        logger.debug('Error listing user roles:', error);
    }
    return jsonData ?? null;
}

async function listOrganizationalUnits(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("orgaunit")) return null;
    await auth.authorize();

    let jsonData = [];

    try {
        const service = google.admin({
            version: 'directory_v1',
            auth,
        });
        const orgUnits = await service.orgunits.list({
            customerId: 'my_customer',
        });
        const orgUnitList = orgUnits.data;
        jsonData = JSON.parse(jsonStringify(orgUnitList));
    } catch (error) {
        logger.debug('Error listing organizational units:', error);
    }
    return jsonData ?? null;
}
async function listCalendars(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("calendar")) return null;
    await auth.authorize();

    let jsonData = [];

    try {
        const calendar = google.calendar({ version: 'v3', auth });
        const response = await calendar.calendarList.list({
            customer: "my_customer"
        });
        const calendars = response.data.items;
        jsonData = JSON.parse(jsonStringify(calendars))
        for (let i = 0; i < jsonData.length; i++) {
            const responseUnit = await calendar.acl.list({
                customer: "my_customer",
                calendarId: jsonData[i].id
            });
            const calendarACL = responseUnit.data;
            jsonData[i].calendarACL = JSON.parse(jsonStringify(calendarACL.items));
        }
    } catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}

async function listFiles(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("file")) return null;
    await auth.authorize();

    let jsonData = [];

    try {
        const drive = google.drive({ version: 'v3', auth });

        const response = await drive.files.list();
        const files = response.data.files;
        for (let i = 0; i < files.length; i++) {
            const res = await drive.files.get({
                fileId: files[i].id,
                fields: '*'
            });
            jsonData.push(JSON.parse(jsonStringify(res.data)));
        }
    } catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}

async function listDrive(auth: any): Promise<Array<any> | null> {
    if(!currentConfig?.ObjectNameNeed?.includes("drive")) return null;
    await auth.authorize();

    let jsonData = [];

    try {
        const drive = google.drive({ version: 'v3', auth });

        const response = await drive.drives.list();
        const drives = response.data.drives;
        for (let i = 0; i < drives.length; i++) {
            const res = await drive.drives.get({
                driveId: drives[i].id,
                fields: '*'
            });
            jsonData.push(JSON.parse(jsonStringify(res.data)));
        }
    } catch (e) {
        logger.debug(e);
    }
    return jsonData ?? null;
}