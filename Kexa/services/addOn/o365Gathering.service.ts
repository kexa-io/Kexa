/*
    * Provider : gcp
    * Creation date : 2023-08-24
    * Note :
    * Resources :
    *       - skus
    *       - user
    *       - domain
    *       - secure_score
    *       - auth_methods
    *       - organization
    *       - directory
    *       - sp
    *       - alert
    *       - incident
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { o365Resources } from "../../models/o365/ressource.models";
import { o365Config } from "../../models/o365/config.models";
import {DefaultAzureCredential} from "@azure/identity";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

let debug_mode = Number(process.env.DEBUG_MODE)??3;

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "o365Logger" });

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(o365Config:o365Config[]): Promise<o365Resources[] | null> {
    let resources = new Array<o365Resources>();

    for (let config of o365Config??[]) {
        let o365Resources = {
            "skus": null,
            "user": null,
            "domain": null,
            "secure_score": null,
            "auth_methods": null,
            "organization": null,
            "directory": null,
            "sp": null,
            "alert": null,
            "incident": null
        } as o365Resources;
        try {
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", o365Config.indexOf(config)+"-");
            setEnvVar("AZURE_CLIENT_ID", await getConfigOrEnvVar(config, "AZURECLIENTID", o365Config.indexOf(config)+"-"))
            setEnvVar("AZURE_CLIENT_SECRET", await getConfigOrEnvVar(config, "AZURECLIENTSECRET", o365Config.indexOf(config)+"-"))
            setEnvVar("AZURE_TENANT_ID", await getConfigOrEnvVar(config, "AZURETENANTID", o365Config.indexOf(config)+"-"))

            const credential = new DefaultAzureCredential();
            const tenantId = process.env["0-AZURETENANTID"];
            const graphApiEndpoint = 'https://graph.microsoft.com/v1.0';
            let accessToken = await getToken();
            if (accessToken == null) {
                logger.error("Failed to get authentification token for Microsoft Graph API. Leaving O365 gathering...")
            }
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`);
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            if(!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            } else {
                logger.info("- listing O365 resources -");
                const promises = [
                    await listSubscribedSkus(graphApiEndpoint, accessToken, headers),
                    await listUsers(graphApiEndpoint, accessToken, headers),
                    await listDomains(graphApiEndpoint, accessToken, headers),
                    await listSecureScore(graphApiEndpoint, accessToken, headers),
                    await listAuthMethods(graphApiEndpoint, accessToken, headers),
                    await listOrganization(graphApiEndpoint, accessToken, headers),
                    await listDirectory(graphApiEndpoint, accessToken, headers),
                    await listServicePrincipal(graphApiEndpoint, accessToken, headers),
                    await listAlerts(graphApiEndpoint, accessToken, headers),
                    await listIncidents(graphApiEndpoint, accessToken, headers)
            ];
                const [skusList, userList, domainList, secure_scoreList, auth_methodsList,
                    organizationList, directoryList, spList, alertList, incidentList] = await Promise.all(promises);

                o365Resources = {
                    skus: skusList,
                    user: userList,
                    domain: domainList,
                    secure_score: secure_scoreList,
                    auth_methods: auth_methodsList,
                    organization: organizationList,
                    directory: directoryList,
                    sp: spList,
                    alert: alertList,
                    incident: incidentList
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

import { Client } from '@microsoft/microsoft-graph-client';
import axios from "axios";

async function getToken() {
    const tenantId = process.env["0-AZURETENANTID"];
    const clientId = process.env["0-AZURECLIENTID"];
    const clientSecret = process.env["0-AZURECLIENTSECRET"];
    const requestBody = new URLSearchParams();
    if (clientId && clientSecret) {
        requestBody.append('grant_type', 'client_credentials');
        requestBody.append('client_id', clientId);
        requestBody.append('client_secret', clientSecret);
        requestBody.append('scope', 'https://graph.microsoft.com/.default');
        // requestBody.append('scope', 'https://manage.office.com/.default');
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
        console.error('O365 - Error fetching token:', error);
        throw error;
    }
    return accessToken ?? null;
}
async function  listUsers(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    const axios = require("axios");
    let jsonData;

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
            for (let i = 0; i < jsonData.length; i++) {
                try {
                    const licenseResponse = await axios.get(`${endpoint}/users/${jsonData[i].id}/licenseDetails`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    if (licenseResponse.status != 200) {
                        logger.warn("O365 - Error when calling graph API for user " + jsonData[i].displayName);
                        jsonData[i].licenses = null;
                        continue;
                    }
                    jsonData[i].licenses = licenseResponse.data.value;
                    const userTypeResponse = await axios.get(`${endpoint}/users/${jsonData[i].id}?$select=userType,id`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    if (userTypeResponse.status != 200) {
                        logger.warn("O365 - Error when calling graph API for user " + jsonData[i].displayName);
                        jsonData[i].userType = null;
                        continue;
                    }
                    jsonData[i].userType = userTypeResponse.data.userType;
                } catch (e) {
                    logger.error('O365 - Error fetching user ');
                    logger.error(e);
                }
            }
        } catch (error: any) {
            console.error('O365 - Error fetching :');
            console.error(error.response.data);
        }
    return  jsonData ?? null;
}

async function  listSubscribedSkus(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;


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
          /*      jsonData.usersLicenses.forEach((element: any) => {
                    console.log(element);
                });

                jsonData.forEach((element: any) => {
                    console.log(element.skuId);

                });*/
              //  console.log('Unused Licenses:', unusedLicenses);
            }

        } catch (e: any) {
            logger.error(e.response.data);
        }
    return jsonData ?? null;
}

async function listDomains(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null>  {
    let jsonData;

    try {
        const response = await axios.get(`${endpoint}/domains`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for domains ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listSecureScore(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null>  {
    let jsonData;

    try {
        const response = await axios.get(`${endpoint}/security/secureScores`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for secure scores ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listAuthMethods(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null>  {
    let jsonData;

    try {//users/0e736261-b29d-43e3-a7d0-f592d4a9a1a5/authentication/methods
        const response = await axios.get(`${endpoint}/users/0e736261-b29d-43e3-a7d0-f592d4a9a1a5/authentication/methods`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Auth Methods ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listOrganization(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;

    headers.append('Authorization', `Bearer ${accessToken}`);
    try {
        const response = await axios.get(`${endpoint}/organization`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Organization");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listDirectory(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;

    headers.append('Authorization', `Bearer ${accessToken}`);
    try {
        const response = await axios.get(`${endpoint}/directoryRoles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Directory sync status ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listServicePrincipal(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;

    try {
        const response = await axios.get(`${endpoint}/servicePrincipals`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Directory sync status ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listAlerts(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;

    try {
        const response = await axios.get(`${endpoint}/security/alerts_v2`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Directory sync status ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function listIncidents(endpoint: string, accessToken: string, headers: Headers): Promise<Array<any> | null> {
    let jsonData;

    try {
        const response = await axios.get(`${endpoint}/security/incidents`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (response.status != 200) {
            logger.warn("O365 - Error when calling graph API for Directory sync status ");
            return null;
        }
        else {
            jsonData = JSON.parse(JSON.stringify(response.data.value));
        }
    } catch (e: any) {
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}