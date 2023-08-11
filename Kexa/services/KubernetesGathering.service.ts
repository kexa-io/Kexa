import { Logger } from "tslog";
import helm from 'helm-ts';
import { KubernetesResources } from "../models/kubernetes/kubernetes.models";
import { getConfigOrEnvVar, setEnvVar } from "./manageVarEnvironnement.service";
import { deleteFile, writeStringToJsonFile } from "../helpers/files";


let debug_mode = Number(process.env.DEBUG_MODE)??3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "KubernetesLogger" });
const k8s = require('@kubernetes/client-node');
const config = require('config');
const kubernetesConfig = (config.has('kubernetes'))?config.get('kubernetes'):null;

export async function collectKubernetes(): Promise<KubernetesResources[]|null>{
    logger.info("starting collectKubernetes");
    let resources = new Array<KubernetesResources>();
    for(let config of kubernetesConfig??[]){
        try {
            if(!config["config"]){
                throw new Error("- Please pass CONFIG in your config file");
            }
            writeStringToJsonFile(await getConfigOrEnvVar(config, "KUBERNETESJSON", kubernetesConfig.indexOf(config)+"-"), "./config/kubernetes.json");
            setEnvVar("KUBECONFIG", config["config"]);
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
    console.log(kubResources["namespaces"][0]);
    console.log(kubResources["pods"][0]);
    console.log(kubResources["helm"]);
    console.log("END OF KUB DISPLAY");
    await Promise.all(namespacePromises);
    return kubResources;
}