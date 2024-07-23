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
import { toISOFormat } from "../../helpers/time";

////////////////////////////////
//////   INITIALIZATION   //////
////////////////////////////////

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("helmLogger");
let currentConfig:HelmConfig;

/////////////////////////////////////////
//////   LISTING CLOUD RESOURCES    /////
/////////////////////////////////////////
import helm from 'helm-ts';

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
            if (getFile("./config/kubernetes.json") == null) {
              writeStringToJsonFile(JSON.stringify(yaml.load(getFile(pathKubeFile??"")), null, 2), "./config/kubernetes.json");
            }
            context?.log("- listing Helm resources -");
            logger.info("- listing Helm resources -");

            const promises = [
                listCharts(pathKubeFile)
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
function execShellCommand(command: string): Promise<number | string> {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error: Error | null, stdout: string, stderr: string) => {
      const filteredStderr = stderr.split('\n').filter(line => 
        !line.includes("Kubernetes configuration file is group-readable. This is insecure.")
      ).join('\n');

      if (error) {
        if (error.message.includes("Kubernetes configuration file is group-readable. This is insecure.")) {
          resolve(stdout);
        } else {
          resolve(-1);
          reject(`Error: ${error.message}`);
        }
      } else if (filteredStderr) {
        console.error('Stderr:', filteredStderr);
        reject(-1);
      } else {
        resolve(stdout);
      }
    });
  });
  }


  async function getHelmReleaseInfo(releaseName: string, namespace: string) {
    try {
      const cmd = `helm get all ${releaseName} --namespace ${namespace} --kubeconfig "./config/kubernetes.json"`;
      const output = await execShellCommand(cmd);
      if (typeof output == 'number') {
        return output;
      } else if (typeof output == 'string' && output.length == 0) {
        return null;
      }
      else {
        return output;
      }
    } catch (error) {
      logger.debug(`Error getting Helm release info for ${releaseName} in ${namespace}:`, error);
      return null;
    }
  }
  
  type HelmPackage = {
    url: string;
    chartVersion: string;
    appVersion: string;
    description: string;
  };

  function parseHelmPackages(output: string): HelmPackage[] {
    const lines = output.trim().split('\n').slice(1);
    
    const helmCharts: HelmPackage[] = lines.map(line => {
        const [url, chartVersion, appVersion, ...descParts] = line.trim().split(/\s+/);
        const description = descParts.join(' ');
        return {
            url,
            chartVersion,
            appVersion,
            description
        };
    });

    return helmCharts;
}
  async function getHelmLatestVersionFromHub(chartName: string, appVersion: string) {
    try {
      const cmd = `helm search hub ${chartName} --kubeconfig "./config/kubernetes.json"`;
      let output = await execShellCommand(cmd);
      let latest = null;
      if (typeof output == 'number' && output == -1) {
        return output;
      } else if (typeof output == 'string') {
        if (output?.length === 0) {
          return null;
        }
        if (output.includes('No results found')) {
          return null;
        }
        try {
          let newTest = parseHelmPackages(output);

          for (let i = 0; i < newTest.length; i++) {
            if (newTest[i].appVersion == appVersion) {
              latest = newTest[i].chartVersion;
              break;
            }
          }
          return latest;
        } catch (error) {
          logger.debug('Error parsing Helm for latest version:', error);
          return null;
        }
      }
    } catch (error) {
      logger.debug('Error listing helm repository:', error);
      return null;
    }
  }


  async function getHelmLatestVersion(chartName: string, appVersion: string) {
    try {
      const cmd = `helm search repo ${chartName} --versions --kubeconfig "./config/kubernetes.json"`;
      let output = await execShellCommand(cmd);
      if (typeof output == 'number' && output == -1) {
        let output = await getHelmLatestVersionFromHub(chartName, appVersion);
        if (output != null && output != -1) {
          return output;
        }
      } else if (typeof output == 'string') {
        if (output?.length === 0) {
          return null;
        }
        if (output.includes('No results found')) {
          return null;
        }
        try {
          const lines = output.trim().split('\n');
          const latestVersionLine = lines[1].trim();
          const latestVersion = latestVersionLine.split(/\s+/)[1];
          return latestVersion;
        } catch (error) {
          logger.debug('Error parsing Helm for latest version:', error);
          return null
        }
      }
    } catch (error) {
      logger.debug('Error listing helm repository:', error);
      return null;
    }
  }

  function getVersionDifference(currentVersion: string, latestVersion: string) {
    let majorDot = latestVersion.indexOf('.');
    const latestMajor = parseInt(latestVersion.substring(0, majorDot));

    let minorDot = latestVersion.indexOf('.', majorDot + 1);
    const latestMinor = parseInt(latestVersion.substring(majorDot + 1, minorDot));

    const latestPatch = parseInt(latestVersion.substring(minorDot + 1, latestVersion.length));

  
    majorDot = currentVersion.indexOf('.');
    const currentMajor = parseInt(currentVersion.substring(0, majorDot));

    minorDot = currentVersion.indexOf('.', majorDot + 1);
    const currentMinor = parseInt(currentVersion.substring(majorDot + 1, minorDot));

    const currentPatch = parseInt(currentVersion.substring(minorDot + 1, currentVersion.length));
  

    let majorDiff = latestMajor - currentMajor;
    let minorDiff = 0;
    let patchDiff = 0;
    
    if (majorDiff === 0) {
        minorDiff = latestMinor - currentMinor;
        if (minorDiff === 0) {
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
        major: majorDiff < 0 ? 0 : majorDiff,
        minor: minorDiff < 0 ? 0 : minorDiff,
        patch: patchDiff < 0 ? 0 : patchDiff
    };
    
    return versionDifference;
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

async function listCharts(isPathKubeFile: boolean) : Promise<Array<any> | null> {
  if(!currentConfig?.ObjectNameNeed?.includes("chart")) return [];

    const k8s = require('@kubernetes/client-node');
    const kc = new k8s.KubeConfig();
    (isPathKubeFile)?kc.loadFromFile("./config/kubernetes.json"):kc.loadFromDefault();
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
          try {
              const releaseInfo = await getHelmReleaseInfo(chart.name, chart.namespace);
              if (releaseInfo != null && releaseInfo != -1) {
                chart.details = parseProperties(JSON.parse(JSON.stringify(releaseInfo)));
              }
              const latestVersion = await getHelmLatestVersion(chart.details.chart, chart.details.appVersion);
              chart.details.latestVersion = latestVersion;
              if (latestVersion != null && latestVersion != -1) {
                chart.details.versionDifference = getVersionDifference(chart.details.version, latestVersion as string);
              } else {
                const versionDifference = {
                    major: 0,
                    minor: 0,
                    patch: 0
                };
                chart.details.versionDifference = versionDifference;
              }
            } catch (error) {
              logger.debug('Error getting Helm release info:', error);  
            }
            results.push(chart);
          }
        results = helmCharts;
        return results;

      } catch (error) {
        logger.debug('Error listing Helm charts:', error);
      }
    return null;
}