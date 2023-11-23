/*
    * Provider : o365
    * Thumbnail : https://www.logo.wine/a/logo/Office_365/Office_365-Logo.wine.svg
    * Documentation : https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - sku
    *       - user
    *       - domain
    *       - secure_score
    *       - auth_methods
    *       - organization
    *       - directory
    *       - sp
    *       - alert
    *       - incident
    *       - app_access_policy
*/

import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { o365Resources } from "../../models/o365/ressource.models";
import { o365Config } from "../../models/o365/config.models";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("o365Logger");

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(o365Config:o365Config[]): Promise<o365Resources[] | null> {
    let context = getContext();
    let resources = new Array<o365Resources>();

    for (let config of o365Config??[]) {
        let o365Resources = {
            "sku": null,
            "user": null,
            "domain": null,
            "secure_score": null,
            "auth_methods": null,
            "organization": null,
            "directory_role": null,
            "sp": null,
            "alert": null,
            "incident": null,
            "app_access_policy": null
        } as o365Resources;
        try {
            let prefix = config.prefix??(o365Config.indexOf(config).toString());
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix);

            const clientId = await getConfigOrEnvVar(config, "AZURECLIENTID", prefix);
            const clientSecret = await getConfigOrEnvVar(config, "AZURECLIENTSECRET", prefix);
            const tenantId = await getConfigOrEnvVar(config, "AZURETENANTID", prefix);

            const graphApiEndpoint = 'https://graph.microsoft.com/v1.0';
            let accessToken;
            if (tenantId && clientId && clientSecret)
                accessToken = await getToken(tenantId, clientId, clientSecret);
            else
                logger.error("Failed to get client id, tenant id or client secret env var for token retrieve. Leaving O365 gathering...")
            if (accessToken == null) {
                logger.error("Failed to get authentification token for Microsoft Graph API. Leaving O365 gathering...")
            }
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`);
            if(!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            } else {
                context?.log("- listing O365 resources -");
                logger.info("- listing O365 resources -");
                const userList = await listUsers(graphApiEndpoint, accessToken, headers);
                const promises = [
                    await listSubscribedSkus(graphApiEndpoint, accessToken, headers),
                    await listDomains(graphApiEndpoint, accessToken, headers),
                    await listSecureScore(graphApiEndpoint, accessToken, headers),
                    await listAuthMethods(graphApiEndpoint, accessToken, userList),
                    await listOrganization(graphApiEndpoint, accessToken, headers),
                    await listDirectoryRole(graphApiEndpoint, accessToken, headers),
                    await listServicePrincipal(graphApiEndpoint, accessToken, headers),
                    await listAlerts(graphApiEndpoint, accessToken, headers),
                    await listIncidents(graphApiEndpoint, accessToken, headers),
                    await listAppAccessPolicy(graphApiEndpoint, accessToken, headers, userList)
            ];
                const [skuList, domainList, secure_scoreList, auth_methodsList,
                    organizationList, directoryList, spList, alertList, incidentList, app_access_policyList] = await Promise.all(promises);

                o365Resources = {
                    sku: skuList,
                    user: userList,
                    domain: domainList,
                    secure_score: secure_scoreList,
                    auth_methods: auth_methodsList,
                    organization: organizationList,
                    directory_role: directoryList,
                    sp: spList,
                    alert: alertList,
                    incident: incidentList,
                    app_access_policy: app_access_policyList
                };
                context?.log("- listing O365 resources done -");
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

import axios from "axios";

async function getToken(tenantId: string, clientId: string, clientSecret: string) {
    const requestBody = new URLSearchParams();
    if (clientId && clientSecret) {
        requestBody.append('grant_type', 'client_credentials');
        requestBody.append('client_id', clientId);
        requestBody.append('client_secret', clientSecret);
        requestBody.append('scope', 'https://graph.microsoft.com/.default');
    }
    let accessToken;
    try {
        const response = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, requestBody);
        if (response.status == 200)
            accessToken = response.data.access_token;
        else {
            logger.error("O365 - Error on token retrieve.");
            return null;
        }
    } catch (error) {
        console.debug('O365 - Error fetching token:', error);
        throw error;
    }
    return accessToken ?? null;
}
async function  listUsers(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    const axios = require("axios");
    let jsonData = [];

        try {
            const response = await axios.get(`${endpoint}/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status != 200) {
                logger.error("O365 - Error when calling graph API")
                return null;
            }
            jsonData = JSON.parse(JSON.stringify(response.data.value));
            for (const element of jsonData) {
                try {
                    const licenseResponse = await axios.get(`${endpoint}/users/${element.id}/licenseDetails`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    element.licenses = licenseResponse.data.value;
                    const userTypeResponse = await axios.get(`${endpoint}/users/${element.id}?$select=userType,id,passwordPolicies`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    if (userTypeResponse.status != 200) {
                        logger.warn("O365 - Error when calling graph API for user " + element.displayName);
                        element.userType = null;
                        continue;
                    }
                    element.userType = userTypeResponse.data.userType;
                    element.passwordPolicies = userTypeResponse.data.passwordPolicies;
                } catch (e) {
                    logger.error('O365 - Error fetching user ');
                    logger.error(e);
                }
            }
        } catch (error: any) {
            console.debug('O365 - Error fetching :');
            console.debug(error.response.data);
        }
    return  jsonData ?? null;
}

async function  listSubscribedSkus(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData = [];


        try {
            const response = await axios.get(`${endpoint}/subscribedSkus`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (response.status != 200) {
                logger.warn("O365 - Error when calling graph API for subsribed Skus ");
                return null;
            }
            else {
                jsonData = JSON.parse(JSON.stringify(response.data.value));
            }
            const assignedResponse = await axios.get(`${endpoint}/users?$select=id,assignedLicenses`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (assignedResponse.status != 200) {
                logger.warn("O365 - Error when calling graph API for users (skus) ");
            }
            else {
                const adaptedResponse = assignedResponse.data.value.map((user: any) => ({
                    userId: user.id,
                    assignedLicenses: user.assignedLicenses,
                }));
                jsonData.usersLicenses = JSON.parse(JSON.stringify(adaptedResponse));
            }

        } catch (e: any) {
            logger.debug(e.response.data);
        }
    return jsonData ?? null;
}

async function genericListing(endpoint: string, accessToken: string, queryEndpoint: string, operationName: string): Promise<Array<any> | null> {
    let jsonData = [];

    try {
        const response = await axios.get(`${endpoint}/${queryEndpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for " + operationName);
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.debug(e.response.data);
    }
    return jsonData ?? null;
}

async function listDomains(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null>  {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "domains", "Domains");
    return jsonData ?? null;
}

async function listSecureScore(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null>  {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "security/secureScores", "Secure scores");
    return jsonData ?? null;
}

async function listAuthMethods(endpoint: string, accessToken: string, userList: any): Promise<Array<any> | null>  {
    let jsonData = [];

    for (const element of userList) {
            try {
                const response = await axios.get(`${endpoint}/users/${element.id}/authentication/methods`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                if (response.status != 200) {
                    logger.warn("O365 - Error when calling graph API for Auth Methods ");
                    return null;
                } else {
                    let tmpJson = {methods: [], userId: {}, userName: {}};
                    tmpJson.methods = JSON.parse(JSON.stringify(response.data.value));
                    tmpJson.userId = element.id;
                    tmpJson.userName = element.displayName;
                    tmpJson.methods.forEach((method: any) => {
                        method.dataType = method['@odata.type'];
                        method.userId = element.id;
                        delete method['@odata.type'];
                    })
                    jsonData.push(tmpJson);
                }
        } catch (e: any) {
            logger.debug(e.response.data);
        }
    }
    return jsonData ?? null;
}

async function listOrganization(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "organization?$select=passwordPolicies", "Organization");
    return jsonData ?? null;
}

async function listDirectoryRole(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "directoryRoles", "Directory roles");
    return jsonData ?? null;
}

async function listServicePrincipal(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "servicePrincipals", "Service principals");
    return jsonData ?? null;
}

async function listAlerts(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "security/alerts_v2", "Security alerts");
    return jsonData ?? null;
}

async function listIncidents(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData : any[] | null;

    jsonData = await genericListing(endpoint, accessToken, "security/incidents", "Security incidents");
    return jsonData ?? null;
}

async function listAppAccessPolicy(endpoint: string, accessToken: string, headers: Headers, userList: any): Promise<Array<any> | null> {
    const axios = require("axios");
    let jsonData: any | [];
        for (let i = 0; i < userList.length; i++) {
            try {
                const licenseResponse = await axios.get(`${endpoint}/users/${userList[i].id}/memberOf`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (licenseResponse.status != 200) {
                    logger.warn("O365 - Error when calling graph API for user " + jsonData[i].displayName);
                    continue;
                }
                jsonData = licenseResponse.data.value;
            } catch (e) {
                logger.debug('O365 - Error fetching user ');
                logger.debug(e);
            }
        }
    return jsonData ?? null;
}
