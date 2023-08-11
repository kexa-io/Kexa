import { Logger } from "tslog";

const AWS = require('aws-sdk');
let debug_mode = Number(process.env.DEBUG_MODE)??3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "KubernetesLogger" });
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
//const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

export async function getEnvVar(name:string) {
    return (await getFromManager(name))??process.env[name];
}

async function getFromManager(name:string){
    try{
        if(possibleWithAzureKeyVault()){
            return await getEnvVarWithAzureKeyVault(name);
        } else if (possibleWithAwsSecretManager()) {
            return await getEnvVarWithAwsSecretManager(name);
            /* } else if (/*possibleWithGoogleSecretManager()){
                 return await getEnvVarWithGoogleSecretManager(name);
             }*/
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
    return (Boolean(process.env.AWS_SECRET_NAME));
}

async function getEnvVarWithAwsSecretManager(name:string){
    const secretsmanager = new AWS.SecretsManager();
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

function possibleWithGoogleSecretManager(){
    return (process.env.GOOGLE_APPLICATION_CREDENTIALS);
    //(
    //    process.env.GOOGLE_SECRET_NAME &&
    //    process.env.GOOGLE_PROJECT_ID &&
    //    process.env.GOOGLE_LOCATION_ID
    //);
    // GOOGLE_APPLICATION_CREDENTIALS
}

//const {SecretManagerServiceClient} = require('@google-cloud/secret-manager').v1;
//async function getEnvVarWithGoogleSecretManager(name:string){
//    const client = new SecretManagerServiceClient();
//    const [version] = await client.accessSecretVersion({
//        name: `projects/${process.env.GCP_PROJECT}/secrets/secrets-prod/versions/latest`,
//    });
//    const responsePayload = version.payload.data.toString();
//    //secrets = JSON.parse(responsePayload);
//    return responsePayload;
//}

export async function setEnvVar(name:string, value:string){
    process.env[name] = value;
}

export async function getConfigOrEnvVar(config:any, name:string, optionalPrefix:string = ""){
    return ((await getFromManager(optionalPrefix+name))??config[optionalPrefix+name])??process.env[optionalPrefix+name];
}