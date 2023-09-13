/*
    * Provider : test365
    * Creation date : 2023-09-03
    * Note :
    * Resources :
    *       - sku
*/

import { Logger } from "tslog";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { test365Resources } from "../../models/test365/ressource.models";
import { test365Config } from "../../models/test365/config.models";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

let debug_mode = Number(process.env.DEBUG_MODE)??3;

const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "o365Logger" });

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(test365Config:test365Config[]): Promise<test365Resources[] | null> {
    let resources = new Array<test365Resources>();

    for (let config of test365Config??[]) {
        let test365Resources = {
            "sku": null
        } as test365Resources;
        try {
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", test365Config.indexOf(config)+"-");
            await setEnvVar("AZURE_CLIENT_ID", await getConfigOrEnvVar(config, "AZURECLIENTID", test365Config.indexOf(config)+"-"))
            await setEnvVar("AZURE_CLIENT_SECRET", await getConfigOrEnvVar(config, "AZURECLIENTSECRET", test365Config.indexOf(config)+"-"))
            await setEnvVar("AZURE_TENANT_ID", await getConfigOrEnvVar(config, "AZURETENANTID", test365Config.indexOf(config)+"-"))

            const officeApiEndpoint = 'https://manage.office.com/api/v1.0/';
            let accessToken = await getToken();
            if (accessToken == null) {
                logger.error("Failed to get authentification token for Microsoft Graph API. Leaving O365 gathering...")
            }
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`);
            if(!subscriptionId) {
                throw new Error("- Please pass SUBSCRIPTIONID in your config file");
            } else {
                logger.info("- listing O365 resources -");
                const promises = [
                    await testList(officeApiEndpoint, accessToken)
                ];
                const [skuList] = await Promise.all(promises);

                test365Resources = {
                    sku: skuList
                };
                logger.info("- listing O365 resources done -");
            }
        } catch (e) {
            logger.error("error in collect O365 data: ");
            logger.error(e);
        }
        resources.push(test365Resources);
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
        requestBody.append('scope', 'https://manage.office.com/.default');
    }
    let accessToken;
    try {
        const response = await axios.post(`https://login.windows.net/${tenantId}/oauth2/token`, requestBody);
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
        logger.error(e.response.data);
    }
    return jsonData ?? null;
}

async function testList(endpoint: string, accessToken: string): Promise<Array<any> | null> {
    let jsonData: any[] | null;

    jsonData = await genericListing(endpoint, accessToken, process.env["0-AZURETENANTID"]+"/ServiceComms/CurrentStatus", "test listing");
    console.log("HERE :");
    console.log(jsonData);
    return jsonData ?? null;
}