/*
    * Provider : kubernetes
    * Thumbnail : https://logos-download.com/wp-content/uploads/2018/09/Kubernetes_Logo.png
    * Documentation : https://github.com/kubernetes-client/javascript
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - namespaces
    *     - pods
    *     - helm
*/

import helm from 'helm-ts';
import { KubernetesResources } from "../../models/kubernetes/kubernetes.models";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import { KubernetesConfig } from "../../models/kubernetes/config.models";
const yaml = require('js-yaml');

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("KubernetesLogger");

const k8s = require('@kubernetes/client-node');

export async function collectData(kubernetesConfig:KubernetesConfig[]): Promise<KubernetesResources[]|null>{
    let resources = new Array<KubernetesResources>();
    for(let config of kubernetesConfig??[]){
        let prefix = config.prefix??(kubernetesConfig.indexOf(config).toString());
        try {
            let pathKubeFile = await getConfigOrEnvVar(config, "KUBECONFIG", prefix);
            writeStringToJsonFile(JSON.stringify(yaml.load(getFile(pathKubeFile??"")), null, 2), "./config/kubernetes.json");
            const promises = [
                kubernetesListing(pathKubeFile),
            ];

            const [kubernetesList] = await Promise.all(promises);
            let kubernetesResource = {
                "namespaces": kubernetesList["namespaces"],
                "pods": kubernetesList["pods"],
                "helm": kubernetesList["helm"],
            } as KubernetesResources;
            resources.push(kubernetesResource);
        }catch(e){
            logger.debug(e);
        }
        deleteFile("./config/kubernetes.json");
    }
    return resources??null;
}

//kubernetes list
export async function kubernetesListing(isPathKubeFile: boolean): Promise<any> {
    let context = getContext();
    context?.log("starting kubernetesListing");
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    (isPathKubeFile)?kc.loadFromFile("./config/kubernetes.json"):kc.loadFromDefault();
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources: any = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["helm"] = [];
    const namespacePromises = namespaces.body.items.map(async (item: any) => {
        const promises = [
            collectHelm(item.metadata.name),
            collectPods(k8sApiCore, item.metadata.name),
        ];
        const [helmData, pods] = await Promise.all(promises);
        helmData?.forEach((helmItem: any) => {
            kubResources["helm"].push(helmItem);
        });
        pods?.body?.items?.forEach((pod: any) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}

async function collectHelm(namespace: string): Promise<any> {
    try{
        let helmData = await helm.list({ namespace: namespace });
        return helmData;
    }catch(e){
        logger.debug(e);
        return null;
    }
}

async function collectPods(k8sApiCore: any, namespace: string): Promise<any> {
    try{
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods;
    }catch(e){
        logger.debug(e);
        return null;
    }
}