import { writeStringToJsonFile } from "../helpers/files";
import { Rules } from "../models/settingFile/rules.models";
import { SettingFile } from "../models/settingFile/settingFile.models";
import { extractHeaders } from "./addOn.service";
import { gatheringRules } from "./analyse.service";

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

    console.log(JSON.stringify(headers, null, 4));
    writeStringToJsonFile(JSON.stringify(headers, null, 4), "./capacity.json");
}

function updateVersion(){
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
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
            fs.writeFileSync("Kexa/services/addOn/" + fileName, fileContent);
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
import * as AzureImports from "./addOn/azurePackage.import";

interface AzureClients {
    [key: string]: any;
}

function extractClients(module: any): AzureClients {
  const clients: AzureClients = {};
  Object.keys(module).forEach((key) => {
      if ((module[key] instanceof Function && module[key].prototype instanceof ServiceClient && module[key].prototype !== undefined)) {
        clients[key] = module[key];
      }
  });
  return clients;
}


function generateResourceList(resources: Record<string, boolean>): string {
    const resourceList = Object.keys(resources).map(resource => `*\t- ${resource}`).join('\n');
    return `${resourceList}`;
}

const testHeader = `/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *   - test
    *   - test2
    *   - test3
    *   - test4
    *   - test5
    */
    DONOTDELETE`;

function retrieveAzureArmClients() {
    let allClients: AzureClients = {};

    console.log("retrieve clients from arm pkg...");

    for (const key of Object.keys(AzureImports)) {
        const currentItem = (AzureImports as { [key: string]: unknown })[key];
        const clientsFromModule = extractClients(currentItem);
        allClients = { ...allClients, ...clientsFromModule };
    }

    console.log("Writing clients to header...");
    console.log(generateResourceList(allClients));
    
    const regex = /(\* Resources :)[\s\S]*?(\*\/)/;
    const updatedHeader = testHeader.replace(regex, `$1\n${generateResourceList(allClients)}\n$2`);
    console.log(updatedHeader);
}

if (require.main === module) {
    releaseCapability();
    updateVersion();
    createAzureArmPkgImportList();
}