import axios from 'axios';
import { writeStringToJsonFile } from "../helpers/files";
import { jsonStringify } from "../helpers/jsonStringify";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";

const fs = require("fs");

async function releaseCapability(){
    let rules = await gatheringRules("https://api.github.com/repos/kexa-io/public-rules/zipball/main", true);
    let freeRules = [...rules.map((rule: SettingFile) => {
        return rule.rules
    })];
    let headers = await extractHeaders();
    freeRules.flat(1).forEach((rule: Rules) => {
        if(headers[rule.cloudProvider]){
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });
    writeStringToJsonFile(jsonStringify(headers, 4), "./capacity.json");
}

export function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", jsonStringify(packageJson, 4));
}

export function updateREADME(){
    let readme = fs.readFileSync("./README.md", "utf8");
    let capacityJson = require("../../capacity.json");
    const tab = "    ";
    let goal = "\n\n"
    Object.keys(capacityJson).forEach((key: string) => {
        goal += `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`
        capacityJson[key]["resources"].forEach((resource: string) => {
            goal += `- ✅ ${resource}\n`
        });
        goal += `</details>\n`
    });
    readme = readme.split("<div class='spliter_code'></div>")
    readme[1] = goal + "\n";
    readme = readme.join("<div class='spliter_code'></div>")
    fs.writeFileSync("./README.md", readme);
}

/* ************************************ */
/*        GENERIC PACKAGE FETCH         */
/*  this can be used by many addons for */
/*          automatization              */
/* ************************************ */
async function fetchArmPackages(packageNeedle: string, destFile: string, destFileScript: string,exceptionEndNeedles?: Array<string>) {
    try {
        const searchString = encodeURIComponent(packageNeedle);
        let offset = 0;
        let allResults: any[] = [];
        let stringResults: any[] = [];
        while (true) {
            const response = await axios.get(`https://api.npms.io/v2/search?size=250&from=${offset}&q=${searchString}`);
            if (response.data.results.length === 0) {
                break;
            }
            allResults = allResults.concat(response.data.results);
            offset += 250;
        }
        const searchTerm = packageNeedle;
        let filteredResults;
        if (exceptionEndNeedles) {
            filteredResults = allResults.filter(result => {
                const packageName = result.package.name;
                const startsWithSearchTerm = packageName.startsWith(searchTerm);
                const endsWithExcludedTerm = exceptionEndNeedles.some(term => packageName.endsWith(term));
                return startsWithSearchTerm && !endsWithExcludedTerm;
              });
        } else {
            filteredResults = allResults.filter(result => result.package.name.startsWith(searchTerm));
        }
        const finalResults = filteredResults.filter(result => !/\d/.test(result.package.name));
        let i = 0;
        finalResults.forEach((element: any) => {
            i++;
            const firstSlashIndex = element.package.name.indexOf('/');
            const extractedAlias = firstSlashIndex !== -1 ? element.package.name.substring(firstSlashIndex + 1) : element.package.name;
            const aliasName = extractedAlias.replace(/-/g, '');    
            const obj = {
                packageName: element.package.name,
                aliasName: aliasName
            };
            stringResults.push(obj);
         })
         /* ********************************************* */
         /* *  Generate the addonPackage.import.ts file * */
         /* ********************************************* */
        let fileContent = '// This file was auto-generated by updateCapability.service.ts\n\n';
        
        const fileName = destFile;

        stringResults.forEach((item) => {
            fileContent += `import * as ${item.aliasName} from '${item.packageName}';\n`;
        });
        if (packageNeedle == "@aws-sdk/client-") {
            additionalAwsImports.forEach((element: string) => {
                fileContent += element;
            })
        }
        fileContent += `export {\n`;
        if (packageNeedle == "@aws-sdk/client-") {
            additionalAwsImportsKeys.forEach((element: string) => {
                fileContent += `${element},\n`;
            })
        }
        stringResults.forEach((item, index) => {
            if (index === stringResults.length - 1) {
                fileContent += `${item.aliasName}`;
            } else {
                fileContent += `${item.aliasName},\n`;
            }
        });
        fileContent += `};\n`;
        try {
            fs.writeFileSync("Kexa/services/addOn/imports/" + fileName, fileContent);
            console.log('File created: ' + destFile);
        } catch (error) {
            console.error('Error writing file:', error);
        }
         /* ************************************************ */
         /* *  Write the addonPackageImport.script.sh      * */
         /* ************************************************ */
         try {
            fs.writeFileSync("Kexa/services/addOn/imports/scripts/" + destFileScript, generateShellScript(stringResults));
            console.log('File created: ' + destFileScript);
        } catch (error) {
            console.error('Error writing file:', error);

        }
         return stringResults;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


/* Generate a Shell script to install easily all the packages */
/* if they're not already in package.json, this could also be */
/* use to make modulable dependencies                         */
function generateShellScript(stringResults: any): string {
    const packageNames = stringResults.map((item: any) => item.packageName);

    let scriptContentHeader = `# This script was auto-generated by updateCapability.service.ts\n`;
    const scriptContent = scriptContentHeader += `packages=(
${packageNames.map((pkg: any) => `    '${pkg}'`).join('\n')}
)

# for pkg in "\${packages[@]}"
# do
#     npm install "\$pkg" || echo "Failed to install \$pkg"
#     echo "done for \$pkg"
# done

package_string=""
for package in "\${packages[@]}"; do
    package_string+=" $package"
done

# Install packages using npm
npm install $package_string`;
    return scriptContent;
}



/* ***************************** */
/*                               */
/*        Microsoft Azure        */
/*                               */
/* ***************************** */

import { DefaultAzureCredential } from "@azure/identity";
import * as AzureImports from "./addOn/imports/azurePackage.import";

interface AzureClients {
    [key: string]: any;
}

async function createAzureArmPkgImportList() {
    try {
        await fetchArmPackages('@azure/arm-', 'azurePackage.import.ts', 'azurePackageInstall.script.sh');
        retrieveAzureArmClients();
    } catch (e) {
        console.error("Error fetching Azure Packages", e);
    }
}

/* Here we're creating the Azure client from their */
/* constructors, so we can retrieve the objects    */
/* name they contains                              */
function createGenericClient<T>(Client: new (credential: any, subscriptionId: any) => T, credential: any, subscriptionId: any): T {
    return new Client(credential, credential);
}

function callGenericClient(client: any) {
    const properties = Object.getOwnPropertyNames(client);
    return properties;
}

function extractClientsAzure(module: any): AzureClients {
    const clients: AzureClients = {};

    const credentials = new DefaultAzureCredential();

    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
            try {
                clients[key] = callGenericClient(createGenericClient(module[key], credentials, null));
            } catch (e) {
                console.debug("Error when using client constructor in update capability.", e);
            }

        }
    });
    return clients;
}

/* ********************************************* */
/*        GENERATING RESOURCES HEADER AZURE      */
/* ********************************************* */


/* Add matching string you want to bannish when gathering object */
/* from Azure clients                                            */
let blackListObjectAzure = [
    "_requestContentType",
    "_endpoint",
    "_allowInsecureConnection",
    "_httpClient",
    "$host",
    "pipeline",
    "apiVersion",
    "subscriptionId"
];

import { stringKeys } from "../models/azure/resource.models";

function displayTotalGatheredMessage(provider: string, amount: number) {
    console.log("------------------------------------------");
    console.log("Gathered " + provider + " objects : " + amount + " items.");
    console.log("------------------------------------------");
}

function generateResourceListAzure(resources: Record<string, boolean>): string {
    let concatedArray: string[];
    concatedArray = [];
    Object.keys(resources).forEach(key => {
        let value = resources[key];
        if (Array.isArray(value)) {
            if (!(value.length == 1 && value[0] === "client") || (value.length <= 2)) {
                    value.forEach((element: any) => {
                        if (!blackListObjectAzure.includes(element) && !(element.startsWith("_")))
                            concatedArray.push(key + "." + element);
                    })
            }
        }
    });
    displayTotalGatheredMessage("Azure", concatedArray.length);
    for (const key of stringKeys)
        concatedArray.push(key.toString());
    const resourceList = concatedArray.map(line => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}


/* Those two read & write functions are for      */
/* the auto-generated header in addon.service.ts */
function writeFileContent(outputFilePath: string, content: string) {
    try {
        fs.writeFileSync(outputFilePath, content, 'utf-8');
        console.log("Updated " + outputFilePath + " resources header.");
    } catch (e) {
        console.error("Error when writing to file: ", e);
    }
}
function readFileContent(inputFilePath: string) {
    try {
        const file = fs.readFileSync(inputFilePath, 'utf-8');
        return (file);
    } catch (e) {
        console.error("Error when reading file: ", e);
    }
}


async function fileReplaceContentAzure(inputFilePath: string, outputFilePath: string, allClients: AzureClients) {
    try {
        const fileContent = await readFileContent(inputFilePath);
        const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
        const updatedContent = fileContent.replace(regex, `$1\n${generateResourceListAzure(allClients)}\n$2`);  
        writeFileContent(outputFilePath, updatedContent);
    } catch (error) {
        console.error('Error:', error);
    }
}

function retrieveAzureArmClients() {
    let allClients: AzureClients = {};

    console.log("retrieve clients from arm pkg...");

    for (const key of Object.keys(AzureImports)) {
        const currentItem = (AzureImports as { [key: string]: unknown })[key];
        const clientsFromModule = extractClientsAzure(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }

    console.log("Writing clients to header...");
    
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/azureGathering.service.ts");
    fileReplaceContentAzure(filePath, filePath, allClients);
}

releaseCapability();
updateVersion();
createAzureArmPkgImportList();
createAwsArmPkgImportList();

/* ***************************** */
/*                               */
/*      Amazon Web Services      */
/*                               */
/* ***************************** */


import * as AwsImports from "./addOn/imports/awsPackage.import";

const additionalAwsImports = ["import * as clientec2 from '@aws-sdk/client-ec2';\n",
"import * as clients3 from '@aws-sdk/client-s3';\n"];

const additionalAwsImportsKeys = ["clientec2", "clients3"];

interface AwsClient {
    [key: string]: any;
}

async function createAwsArmPkgImportList() {
    try {
        await fetchArmPackages('@aws-sdk/client-', 'awsPackage.import.ts', 'awsPackageInstall.script.sh', ["data", "browser", "node", "catalog", "service", "generator", "redshift-serverless"]);
        retrieveAwsClients();
    } catch (e) {
        console.error("Error fetching AWS Packages", e);
    }
}


export function extractClientsAws(module: any): AzureClients {
    const clients: AwsClient = {};

    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
        }
    });
    return clients;
}


export const extractObjectFromOutputCommand  = (listingCommand: string): string | null => {
    const outputCommand = listingCommand + "Output";
    console.log(outputCommand);
    return null;
}

import { extractObjectBetween } from "../helpers/extractAddonName";


export function extractObjectsOrFunctionsAws(module: any, isObject: Boolean): AwsClient {
    const clients: AwsClient = {};
    let clientsMatch: string[] = [];

    /* Start and End string to match for extract client listing functions */
    /* You can edit those as you wish, addind as much startStrings as you want */ 
    const startStrings =  ["Get", "List", "Describe"];
    const endString = "Command";

    let clientName;
    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clientName = module[key].name;
            if (clientName != "Client") {
                clientsMatch.push(clientName);
                if (clientsMatch.length > 1)
                    console.warn("WARNING: Multiple client found for AWS objects, header & gather could be wrong.");
                else if (clientsMatch.length < 1)
                    console.warn("WARNING: No client found for AWS objects, header & gather could be wrong.");
            }
        }
    });

    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined 
            && module[key].name.endsWith(endString) && startStrings.some(startString => module[key].name.startsWith(startString)))) {
                if (isObject) {
                    //extractObjectFromOutputCommand(module[key].name);
                    const objectName = extractObjectBetween(module[key].name, startStrings, endString);
                    if (clientsMatch.length < 1)
                        clients[key] = objectName;
                    else
                        clients[key] = clientsMatch[clientsMatch.length - 1] + "." + objectName;
                }
                else
                    clients[key] = module[key];
        }
    });
    return clients;
}

function retrieveAwsClients() {
    let allClients: AwsClient = {};
    let allObjects: AwsClient = [];

    console.log("retrieve clients from aws pkg...");

    for (const key of Object.keys(AwsImports)) {
        const currentItem = (AwsImports as { [key: string]: unknown })[key];
        const clientsFromModule = extractClientsAws(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }

    for (const key of Object.keys(AwsImports)) {
        const currentItem = (AwsImports as { [key: string]: unknown })[key];
        const clientsFromModule = extractObjectsOrFunctionsAws(currentItem, true);
        allObjects.push(clientsFromModule);
    }
    console.log("Writing clients to header...");
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/awsGathering.service.ts");
    fileReplaceContentAws(filePath, filePath, allObjects);
}

async function fileReplaceContentAws(inputFilePath: string, outputFilePath: string, allObjects: AzureClients) {
    try {
      const fileContent = await readFileContent(inputFilePath);
      const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
      const updatedContent = fileContent.replace(regex, `$1\n${generateResourceListAws(allObjects)}\n${generateCustomResourceListAws()}\n$2`);  
      writeFileContent(outputFilePath, updatedContent);
    } catch (error) {
      console.error('Error:', error);
    }
}

import { stringKeys as AwsCustomObjects } from "../models/aws/ressource.models";

function generateResourceListAws(resources: AzureClients): string {
    let concatedArray: string[] = [];

    resources.forEach((element: any) => {
        Object.keys(element).forEach(key => {
            concatedArray.push(element[key]);
        });
    })
 
    displayTotalGatheredMessage("Aws", concatedArray.length);
    const resourceList = concatedArray.map(line => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}


function generateCustomResourceListAws(): string {
    const resourceList = AwsCustomObjects.map((line: String) => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}
