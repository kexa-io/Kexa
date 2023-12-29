import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";
import { getNewLogger } from "./logger.service";

const fs = require("fs");
import axios from 'axios';

async function releaseCapability(){
    let rules = await gatheringRules("./Kexa/rules", true);
    let freeRules = [...rules.map((rule: SettingFile) => {
        return rule.rules
    })];
    let headers = await extractHeaders();
    freeRules.flat(1).forEach((rule: Rules) => {
        if(headers[rule.cloudProvider]){
            headers[rule.cloudProvider].freeRules.push(rule);
        }
    });
    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
}

function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}

function updateREADME(){
    let readme = fs.readFileSync("./README.md", "utf8");
    let packageJson = require("../../capacity.json");
    const tab = "    ";
    let gaol = "\n\n"
    Object.keys(packageJson).forEach((key: string) => {
        gaol += `- ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:\n`
        packageJson[key]["resources"].forEach((resource: string) => {
            gaol += `${tab}- ✅ ${resource}\n`
        });
    });
    readme = readme.split("<div class='spliter_code'></div>")
    readme[1] = gaol + "\n";
    readme = readme.join("<div class='spliter_code'></div>")
    fs.writeFileSync("./README.md", readme);
}

/* ***************************** */
/*            PKG FOR AZURE      */
/* ***************************** */

async function fetchArmPackages() {
    try {
        const searchString = encodeURIComponent('@azure/arm-');
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
        const searchTerm = '@azure/arm-';
        const filteredResults = allResults.filter(result => result.package.name.startsWith(searchTerm));
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
        let fileContent = '';
        const fileName = "azurePackage.import.ts";
        stringResults.forEach((item) => {
            fileContent += `import * as ${item.aliasName} from '${item.packageName}';\n`;
        });
        fileContent += `export {\n`;
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
            console.log('File created: azurePackage.import.ts');
        } catch (error) {
            console.error('Error writing file:', error);
        }
         console.log("total results Azure packages found : " + i);
         return stringResults;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}

async function createAzureArmPkgImportList() {
    try {
        await fetchArmPackages();
        retrieveAzureArmClients();
    } catch (e) {
        console.error("Error fetching ARM Packages", e);
    }
}

/* ****************************************** */
/*        RETRIEVE CLIENT FROM PKG AZURE      */
/* ****************************************** */

import { ServiceClient } from "@azure/core-client";
import * as AzureImports from "./addOn/imports/azurePackage.import";
import { AnonymousCredential } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

interface AzureClients {
    [key: string]: any;
}

function createGenericClient<T>(Client: new (credential: any, subscriptionId: any) => T, credential: any, subscriptionId: any): T {
    return new Client(credential, credential);
}

function callGenericClient(client: any) {
    console.log("starting " + client.constructor.name + " Listing");
    const properties = Object.getOwnPropertyNames(client);
    return properties;
}

function extractClients(module: any): AzureClients {
    const clients: AzureClients = {};

    const credentials = new DefaultAzureCredential();

    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
            clients[key] = module[key];
            try {
                clients[key] = callGenericClient(createGenericClient(module[key], credentials, null));
            } catch (e) {
                console.error("Error when using client constructor in update capability.", e);
            }

        }
    });
    return clients;
}

/* ********************************************* */
/*        GENERATING RESOURCES HEADER AZURE      */
/* ********************************************* */

let blackListObject = [
    "_requestContentType",
    "_endpoint",
    "_allowInsecureConnection",
    "_httpClient",
    "$host",
    "pipeline",
    "apiVersion",
    "subscriptionId"
];

function generateResourceList(resources: Record<string, boolean>): string {
    let concatedArray: string[];
    concatedArray = [];
    Object.keys(resources).forEach(key => {
        let value = resources[key];
        if (Array.isArray(value)) {
            if (!(value.length == 1 && value[0] === "client") || (value.length <= 2)) {
                    value.forEach((element: any) => {
                        if (!blackListObject.includes(element) && !(element.startsWith("_")))
                            concatedArray.push(key + "." + element);
                    })
            }
        }
    });
    const resourceList = concatedArray.map(line => `\t*\t- ${line}`).join('\n');
    return `${resourceList}`;
}

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

async function fileReplaceContent(inputFilePath: string, outputFilePath: string, allClients: AzureClients) {
    try {
      const fileContent = await readFileContent(inputFilePath);
      const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
      const updatedContent = fileContent.replace(regex, `$1\n${generateResourceList(allClients)}\n$2`);  
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
        const clientsFromModule = extractClients(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }

    console.log("Writing clients to header...");
    
    const path = require("path");
    const filePath = path.resolve(__dirname, "../../Kexa/services/addOn/azureGathering.service.ts");
    fileReplaceContent(filePath, filePath, allClients);
}

if (require.main === module) {
    releaseCapability();
    updateREADME();
    updateVersion();
    createAzureArmPkgImportList();
}