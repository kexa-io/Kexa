/*
    * Provider : kubernetes
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - namespaces
    *     - pods
    *     - helm
*/

import { Logger } from "tslog";
import helm from 'helm-ts';
import { KubernetesResources } from "../../models/kubernetes/kubernetes.models";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, writeStringToJsonFile } from "../../helpers/files";
import { KubernetesConfig } from "../../models/kubernetes/config.models";


import {getNewLogger} from "../logger.service";
const logger = getNewLogger("KubernetesLogger");

const k8s = require('@kubernetes/client-node');

export async function collectData(kubernetesConfig:KubernetesConfig[]): Promise<KubernetesResources[]|null>{
    logger.info("starting collectKubernetes");
    let resources = new Array<KubernetesResources>();
    for(let config of kubernetesConfig??[]){
        let prefix = config.prefix??(kubernetesConfig.indexOf(config)+"-");
        try {
            if(!config.KUBECONFIG){
                throw new Error("- Please pass CONFIG in your config file");
            }
            writeStringToJsonFile(await getConfigOrEnvVar(config, "KUBERNETESJSON", prefix), "./config/kubernetes.json");
            setEnvVar("KUBECONFIG", config.KUBECONFIG);
            const promises = [
                kubernetesListing(),
            ];

            const [kubernetesList] = await Promise.all(promises);
            let kubernetesResource = {
                "namespaces": kubernetesList["namespaces"],
                "pods": kubernetesList["pods"],
                "helm": kubernetesList["helm"],
            } as KubernetesResources;
            resources.push(kubernetesResource);
        }catch(e){
            logger.error(e);
        }
        deleteFile("./config/kubernetes.json");
    }
    return resources??null;
}

//kubernetes list
export async function kubernetesListing(): Promise<any> {
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources: any = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["helm"] = [];
    const namespacePromises = namespaces.body.items.map(async (item: any) => {
        let helmData = await helm.list({ namespace: item.metadata.name });
        helmData.forEach((helmItem: any) => {
            kubResources["helm"].push(helmItem);
        });
        const pods = await k8sApiCore.listNamespacedPod(item.metadata.name);
        pods.body.items.forEach((pod: any) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}