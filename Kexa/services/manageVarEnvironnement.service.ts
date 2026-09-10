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
        logger.error("Error fetching variables from Kexa API", e);
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
        } catch(e) {
            logger.error("Failed to retrieve secret from manager", e);
        }
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
    name = name.replace(/_/g, '-');
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
        logger.error("Error fetching secret from AWS", e);
    }
}

function possibleWithHashipcorpVault() {
    return (Boolean(process.env.HCP_CLIENT_ID && process.env.HCP_CLIENT_SECRET && process.env.HCP_API_URL));
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
        logger.debug('Error fetching hashicorp secret:', error);
        return ;
    }
}

export async function setEnvVar(name:string, value:string){
    process.env[name] = value;
}

export async function getConfigOrEnvVar(config:any, name:string, optionalPrefix:string = "") {
    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true')
        return ((await getFromManager(name, optionalPrefix))??config[name])??process.env[optionalPrefix+name];
    return ((await getFromManager(optionalPrefix+name))??config[name])??process.env[optionalPrefix+name];
}