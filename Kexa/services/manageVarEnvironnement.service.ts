import { Logger } from "tslog";

//const AWS = require('aws-sdk');
let debug_mode = Number(process.env.DEBUG_MODE)??3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "KubernetesLogger" });
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
//const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

export async function getEnvVar(name:string) {
    return getFromManager(name)??process.env[name];
}

async function getFromManager(name:string){
    try{
        if(possibleWithAzureKeyVault()){
            return await getEnvVarWithAzureKeyVault(name);
        } else if (possibleWithAwsSecretManager()){
            return await getEnvVarWithAwsSecretManager(name);
        } else if (possibleWithGoogleSecretManager()){
            return await getEnvVarWithGoogleSecretManager(name);
        }
    }catch(e){}
    return null;
}

function possibleWithAzureKeyVault(){
    return Boolean(process.env.AZUREKEYVAULTNAME);
}

async function getEnvVarWithAzureKeyVault(name:string){
    const url = `https://${process.env.AZUREKEYVAULTNAME}.vault.azure.net`;
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(url, credential);
    return (await client.getSecret(name)).value;
}

function possibleWithAwsSecretManager(){
    return false
    //return (
    //    process.env.AWS_SECRET_NAME &&
    //    process.env.AWS_REGION
    //);
}

async function getEnvVarWithAwsSecretManager(name:string){
    //const client = new AWS.SecretsManager({
    //    region: process.env.AWS_REGION
    //});
    //const getSecretValue = await client.getSecretValue({SecretId: name});
    //if ('SecretString' in getSecretValue) {
    //    return getSecretValue.SecretString;
    //} else {
    //    let buff = new Buffer(getSecretValue.SecretBinary, 'base64');
    //    return buff.toString('ascii');
    //}
}

function possibleWithGoogleSecretManager(){
    return false
    //(
    //    process.env.GOOGLE_SECRET_NAME &&
    //    process.env.GOOGLE_PROJECT_ID &&
    //    process.env.GOOGLE_LOCATION_ID
    //);
}

async function getEnvVarWithGoogleSecretManager(name:string){
    //const client = new SecretManagerServiceClient();
    //const [version] = await client.accessSecretVersion({
    //    name: `projects/${process.env.GOOGLE_PROJECT_ID}/secrets/${process.env.GOOGLE_SECRET_NAME}/versions/latest`,
    //});
    //return version.payload.data[name].toString();
}

export async function setEnvVar(name:string, value:string){
    process.env[name] = value;
}

export async function getConfigOrEnvVar(config:any, name:string, optionalPrefix:string = ""){
    return getFromManager(optionalPrefix+name)??config[name];
}