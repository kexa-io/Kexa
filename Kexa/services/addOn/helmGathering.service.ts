/*
    * Provider : helm
    * Thumbnail : https://seeklogo.com/images/H/helm-logo-9208DB3EE5-seeklogo.com.png
    * Documentation : https://helm.sh/docs/
    * Creation date : 2024-07-10
    * Note :
    * Resources :
    *       - chart
*/

import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { HelmResources } from "../../models/helm/ressource.models";
import { HelmConfig } from "../../models/helm/config.models";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
const yaml = require('js-yaml');

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("helmLogger");
let currentConfig:HelmConfig;

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////

export async function collectData(helmConfig:HelmConfig[]): Promise<HelmResources[] | null> {
    let context = getContext();
    let resources = new Array<HelmResources>();

    for (let config of helmConfig??[]) {
        currentConfig = config;
        let prefix = config.prefix??(helmConfig.indexOf(config).toString());

        let helmResources = {
            "chart": null
        } as HelmResources;
        try {
            let pathKubeFile = await getConfigOrEnvVar(config, "KUBECONFIG", prefix);
            writeStringToJsonFile(JSON.stringify(yaml.load(getFile(pathKubeFile??"")), null, 2), "./config/kubernetes.json");
            context?.log("- listing Helm resources -");
            logger.info("- listing Helm resources -");


            const promises = [
                listCharts()
            ];

            const [
               chartList
            ] = await Promise.all(promises);

            helmResources = {
                chart: chartList
            };
            context?.log("- listing Helm resources done -");
            logger.info("- listing Helm resources done -");
      
        } catch (e) {
            logger.error("error in collect Helm data: ");
            logger.error(e);
        }
        resources.push(helmResources);
        deleteFile("./config/kubernetes.json");
    }
    return resources ?? null;
}


const { exec } = require('child_process');
function execShellCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error: any, stdout: any, stderr: any) => {  // 10 MB buffer
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Stderr: ${stderr}`);
          return;
        }
        resolve(stdout);
      });
    });
  }


  async function getHelmReleaseInfo(releaseName: string, namespace: string) {
    try {
      const cmd = `helm get all ${releaseName} --namespace ${namespace}`;
      const output = await execShellCommand(cmd);
      return output;
    } catch (error) {
      logger.debug(`Error getting Helm release info for ${releaseName} in ${namespace}:`, error);
      return null;
    }
  }
  
  async function getHelmLatestVersion(chartName: string, namespace: string) {
    try {
      const cmd = `helm search repo ${chartName} --versions --namespace ${namespace}`;
      let output = await execShellCommand(cmd);
      try {
        const lines = output.trim().split('\n');
        const latestVersionLine = lines[1].trim();
        const latestVersion = latestVersionLine.split(/\s+/)[1];
        return latestVersion;
      } catch (error) {
        logger.debug('Error parsing Helm for latest version:', error);
        return null
      }
    } catch (error) {
      logger.debug('Error getting Helm version:', error);
      return null;
    }
  }

  function getVersionDifference(currentVersion: string, latestVersion: string) {
    const currentMajor = parseInt(currentVersion[0], 10);
    const latestMajor = parseInt(latestVersion[0], 10);
    
    let majorDiff = latestMajor - currentMajor;
    let minorDiff = 0;
    let patchDiff = 0;
    
    if (majorDiff === 0) {
        const currentMinor = parseInt(currentVersion[1], 10);
        const latestMinor = parseInt(latestVersion[1], 10);
        minorDiff = latestMinor - currentMinor;
    
        if (minorDiff === 0) {
            const currentPatch = parseInt(currentVersion[2], 10);
            const latestPatch = parseInt(latestVersion[2], 10);
            patchDiff = latestPatch - currentPatch;
        }
    } else {
        minorDiff = 0;
        patchDiff = 0;
    }
    
    if (Number.isNaN(patchDiff)) {
        patchDiff = 0;
    }

    const versionDifference = {
        major: majorDiff,
        minor: minorDiff,
        patch: patchDiff
    };
    
    return versionDifference;
  }

  function toISOFormat(dateString: string) {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
        return isoString;
    }


  function limitDepth(obj: any, depthLimit: any, currentDepth = 0) {
    if (currentDepth >= depthLimit) {
        return {};
    }

    const limitedObj: any = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            limitedObj[key] = limitDepth(obj[key], depthLimit, currentDepth + 1);
        } else {
            limitedObj[key] = obj[key];
        }
    }
    return limitedObj;
}

  interface AnyObject {
    [key: string]: any;
  }
  
  function parseProperties(input: string): AnyObject {
    const lines = input.split('\n');
    const stack: AnyObject[] = [{}];
    let currentObj: AnyObject;
  
    for (const line of lines) {
      const trimmedLine = line.trim();
  
      if (trimmedLine === '') continue;
  
      const parts = trimmedLine.split(':');
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim();
  
      currentObj = stack[stack.length - 1];
  
      if (value === '') {
        currentObj[key] = {};
        stack.push(currentObj[key]);
      } else {
        if (value.match(/^[0-9]+$/)) {
          currentObj[key] = Number(value);
        } else if (value === 'true' || value === 'false') {
          currentObj[key] = value === 'true';
        } else {
          currentObj[key] = value;
        }
      }
    }
    const userSuppliedPropertyName = Object.keys(stack[0]['USER-SUPPLIED VALUES'])[0];
    const computedValues = stack[0]['USER-SUPPLIED VALUES'][userSuppliedPropertyName]['COMPUTED VALUES'];
    const retObject = {
        name: stack[0].NAME,
        lastDeployed: toISOFormat(stack[0]['LAST DEPLOYED']),
        namespace: stack[0].NAMESPACE,
        status: stack[0].STATUS,
        revision: stack[0].REVISION,
        chart: stack[0].CHART,
        version: stack[0].VERSION,
        appVersion: stack[0].APP_VERSION,
        testSuite: stack[0]['TEST SUITE'],
        computedValues: limitDepth(computedValues, 4),
   };
    return retObject;
  }

async function listCharts() : Promise<Array<any> | null> {

    const k8s = require('@kubernetes/client-node');
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


    let results = new Array<any>();
    try {
        const res = await k8sApi.listSecretForAllNamespaces();
        const secrets = res.body.items;
    
        const helmReleases = secrets.filter((secret: any) =>
          secret.metadata.annotations && secret.metadata.annotations['meta.helm.sh/release-name']
        );

        const helmCharts = helmReleases.map((secret: any) => ({
          name: secret.metadata.annotations['meta.helm.sh/release-name'],
          namespace: secret.metadata.namespace,
          version: secret.metadata.labels['helm.sh/chart'],
          metadata: secret.metadata,
          id: secret.metadata.annotations['meta.helm.sh/release-name'],
          uid: secret.metadata.uid,
        }));
        for (const chart of helmCharts) {
            const releaseInfo = await getHelmReleaseInfo(chart.name, chart.namespace);
            chart.details = parseProperties(JSON.parse(JSON.stringify(releaseInfo)));
            const latestVersion = await getHelmLatestVersion(chart.details.chart, chart.namespace);
            chart.details.latestVersion = latestVersion;
            if (latestVersion != null)
                chart.details.versionDifference = getVersionDifference(chart.details.version, latestVersion as string);
            else
                chart.details.versionDifference = null;
            results.push(chart);
          }
        return results;

      } catch (error) {
        logger.debug('Error listing Helm charts:', error);
      }
    return null;
}