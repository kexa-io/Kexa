import axios from "axios";
import {getNewLogger} from "./logger.service";
import { jsonStringify } from "../helpers/jsonStringify";
import {getEnvVarFromApi} from "./api/loaderApi.service";

const logger = getNewLogger("KubernetesLogger");


const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");



export async function getEnvVar(name:string, optionalPrefix:string = "") {
    return (await getFromManager(name))??process.env[name];
}

async function getFromApi(name:string, prefix:string) {
    try {
        return await getEnvVarFromApi(name, prefix);
    } catch(e) {
        console.error("Error fetching variables from Kexa API");  
    }
}

async function possibleWithApi(name:string, isPrefix:boolean) {
    if (!isPrefix)
        return false;
    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true' && process.env.KEXA_API_TOKEN && process.env.KEXA_API_TOKEN_NAME)
        return true;
    else
        return false;
}

async function getFromManager(name:string, optionalPrefix:string = ""){
    try {
        if (await possibleWithApi(name, (optionalPrefix != "")))
            return await getFromApi(name, optionalPrefix);
        else if(possibleWithAzureKeyVault())
            return await getEnvVarWithAzureKeyVault(name);
        else if (possibleWithAwsSecretManager())
            return await getEnvVarWithAwsSecretManager(name);
        else if (possibleWithHashipcorpVault())
            return await getEnvVarWithHashicorpVault(name);
        } catch(e) {}
    return null;
}

function possibleWithAzureKeyVault(){
    return Boolean(process.env.AZUREKEYVAULTNAME);
}

async function getEnvVarWithAzureKeyVault(name:string){
    const url = `https://${process.env.AZUREKEYVAULTNAME}.vault.azure.net`;
    let UAI = {}
    let useAzureIdentity = process.env.USERAZUREIDENTITYID;
    if(useAzureIdentity) UAI = {managedIdentityClientId: useAzureIdentity};
    const credential = new DefaultAzureCredential(UAI);
    const client = new SecretClient(url, credential);
    return (await client.getSecret(name)).value;
}

function possibleWithAwsSecretManager(){
    return (Boolean(process.env.AWS_SECRET_NAME && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY));
}


import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

async function getEnvVarWithAwsSecretManager(name:string){

    const credentials = fromNodeProviderChain();
    
    const secretsmanager = new SecretsManagerClient({credentials});
    const secName = process.env.AWS_SECRET_NAME;

    try {
        const input = { SecretId: secName };
        const data = await secretsmanager.send(new GetSecretValueCommand(input));
        const secretData = JSON.parse(jsonStringify(data.SecretString));
        const value = secretData[name];
        return (value);
    } catch (e) {
        console.error("Error fetching secret from AWS");
    }
}

function possibleWithHashipcorpVault() {
    return (Boolean(process.env.HCP_CLIENT_ID && process.env.HCP_CLIENT_SECRET && process.env.HCP_API_URL));
}

function possibleWithBitwarden(){
    return (Boolean(process.env.BITWARDEN_CLIENTID && process.env.BITWARDEN_CLIENTSECRET));
}

async function getEnvVarWithHashicorpVault(name:string) {
    let hcpClientId = process.env.HCP_CLIENT_ID;
    let hcpClientSecret = process.env.HCP_CLIENT_SECRET;
    let hcpApiUrl = process.env.HCP_API_URL;

    const authData = {
        audience: 'https://api.hashicorp.cloud',
        grant_type: 'client_credentials',
        client_id: hcpClientId,
        client_secret: hcpClientSecret,
    };
    
    const authHeaders = {
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.post('https://auth.hashicorp.com/oauth/token', authData, {
            headers: authHeaders,
        });
        const accessToken = response.data.access_token;
        const apiHeaders = {
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            const secretUrl = hcpApiUrl + '/' + name;
            const responseSecret = await axios.get(secretUrl, {
                headers: apiHeaders,
            });
            if (responseSecret.status != 200)
                return;
            return responseSecret.data.secret.version.value;
        } catch (error) {
            throw error;
        }
    } catch (error) {
        logger.silly('Error fetching hashicorp secret:', error);
        return ;
    }
}

import { BitwardenClient, ClientSettings, DeviceType, LogLevel } from "@bitwarden/sdk-napi";

async function getEnvVarWithBitwarden(){
    let bitwardenClientId = process.env.BITWARDEN_CLIENTID;
    let bitwtardenClientSecret = process.env.BITWARDEN_CLIENTSECRET;

    /* not available yet, maintenance from Bitwarden      */

    /*   const postData = {
         grant_type: 'client_credentials',
         scope: 'api',
         client_id: bitwardenClientId as string,
         client_secret: bitwtardenClientSecret as string
     };

   axios.post('https://identity.bitwarden.com/connect/token',
         new URLSearchParams(postData), {
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             }
         })
         .then(response => {
             console.log('Response:', response.data);
         })
         .catch(error => {
             console.error('Error:', error);
         });*/

}



import {listSecrets} from "./addOn/gcpGathering.service";
import {deleteFile, writeStringToJsonFile} from "../helpers/files";
import {Storage} from "@google-cloud/storage";
async function possibleWithGoogleSecretManager(projectId: any): Promise<boolean> {
    if ((process.env["GOOGLE_APPLICATION_CREDENTIALS"]
        && process.env["GOOGLE_STORAGE_PROJECT_ID"]))
    {
        return false;
    }
    else {
        return false;
    }
}
async function getEnvVarWithGoogleSecretManager(name:string, projectId: any) {

    const usrScrt = process.env.GOOGLE_SECRET_NAME;

}

export async function setEnvVar(name:string, value:string){
    process.env[name] = value;
}

export async function getConfigOrEnvVar(config:any, name:string, optionalPrefix:string = "") {
    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true')
        return ((await getFromManager(name, optionalPrefix))??config[name])??process.env[optionalPrefix+name];
    return ((await getFromManager(optionalPrefix+name))??config[name])??process.env[optionalPrefix+name];
}