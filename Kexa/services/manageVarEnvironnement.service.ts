import axios from "axios";

const AWS = require('aws-sdk');

import {getNewLogger} from "./logger.service";
const logger = getNewLogger("KubernetesLogger");


const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
//const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

export async function getEnvVar(name:string) {
    return (await getFromManager(name))??process.env[name];
}

async function getFromManager(name:string){
    try {
        if(possibleWithAzureKeyVault())
            return await getEnvVarWithAzureKeyVault(name);
        else if (possibleWithAwsSecretManager())
            return await getEnvVarWithAwsSecretManager(name);
        else if (await possibleWithGoogleSecretManager(process.env["GOOGLE_PROJECT_ID"]))
            return await getEnvVarWithGoogleSecretManager(name, process.env["GOOGLE_PROJECT_ID"]);
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
    return (Boolean(process.env.AWS_SECRET_NAME));
}

import { Credentials, SharedIniFileCredentials } from "aws-sdk";
async function getEnvVarWithAwsSecretManager(name:string){
    let awsKeyId = process.env.AWS_ACCESS_KEY_ID;
    let awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
    let credentials: Credentials = new SharedIniFileCredentials({profile: 'default'});
    if(awsKeyId && awsSecretKey){
        credentials = new Credentials({
            accessKeyId: awsKeyId,
            secretAccessKey: awsSecretKey
        });
    }
    const secretsmanager = new AWS.SecretsManager({credentials});
    const secName = process.env.AWS_SECRET_NAME;
    const params = { SecretId: secName };
    secretsmanager.getSecretValue(params, function(err : any, data : any) {
        if (err) {
            console.log("Error when looking for AWS secrets");
            console.log(err, err.stack); // an error occurred
        }
        else {
            const secretData = JSON.parse(data.SecretString);
            const value = secretData[name];
            return (value);
        }
    });
}

function possibleWithBitwarden(){
    return (Boolean(process.env.BITWARDEN_CLIENTID && process.env.BITWARDEN_CLIENTSECRET));
}

import { BitwardenClient, ClientSettings, DeviceType, LogLevel } from "@bitwarden/sdk-napi";

async function getEnvVarWithBitwarden(){
    let bitwardenClientId = process.env.BITWARDEN_CLIENTID;
    let bitwtardenClientSecret = process.env.BITWARDEN_CLIENTSECRET;

    /* need to use api.organization with orga api key ??? */
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


    /* ******************************* */
    /* this is getting a 401 forbidden */
    /* ******************************* */

    /*const settings: ClientSettings = {
        apiUrl: "https://api.bitwarden.com",
        identityUrl: "https://identity.bitwarden.com",
        userAgent: "Bitwarden SDK",
        deviceType: DeviceType.SDK,
    };
    const accessToken = process.env.BITWARDEN_TOKEN;
    const client = new BitwardenClient(settings, LogLevel.Info);
    let result;
    if (accessToken)
        result = await client.loginWithAccessToken(accessToken);
    console.log("Result :", result);
    if (result) {
        if (!result.success) {
            logger.error("Error when authenticate for Bitwarden secret manager")
            throw Error("Authentication failed");
        }
    }*/
//    const secrets = await client.secrets().list(ogranizationId);
}



import {listSecrets} from "./addOn/gcpGathering.service";
import {deleteFile, writeStringToJsonFile} from "../helpers/files";
import {Storage} from "@google-cloud/storage";
async function possibleWithGoogleSecretManager(projectId: any): Promise<boolean> {
    // HERE LIST AND CHECK FOR NAME ///
    if ((process.env["GOOGLE_APPLICATION_CREDENTIALS"]
        && process.env["GOOGLE_STORAGE_PROJECT_ID"]))
    {
        /*console.log("OUI OUI");
        const config = require('config');
        const gcpConfig = (config.has('gcp'))?config.get('gcp'):null;
        setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        writeStringToJsonFile(process.env["0-GOOGLE_APPLICATION_CREDENTIALS"].toString(), "./config/gcp.json");
        setEnvVar("GOOGLE_APPLICATION_CREDENTIALS", "./config/gcp.json");
        const storage = new Storage({
            projectId,
        });
        let secret = await listSecrets(projectId);
        console.log("got secrets here...: " + secret);
        deleteFile("./config/gcp.json");*/
        return false;
    }
    else {
        return false;
    }
}
async function getEnvVarWithGoogleSecretManager(name:string, projectId: any) {
    console.log("NAME IS : " + name);
    console.log("PROJET ID : " + projectId);
    const usrScrt = process.env.GOOGLE_SECRET_NAME;

    console.log("LOG");
}

export async function setEnvVar(name:string, value:string){
    process.env[name] = value;
}

export async function getConfigOrEnvVar(config:any, name:string, optionalPrefix:string = "") {
    return ((await getFromManager(optionalPrefix+name))??config[name])??process.env[optionalPrefix+name];
}