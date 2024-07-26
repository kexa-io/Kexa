/*
    * Provider : kubernetes
    * Thumbnail : https://logos-download.com/wp-content/uploads/2018/09/Kubernetes_Logo.png
    * Documentation : https://github.com/kubernetes-client/javascript
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - namespaces
    *     - pods
    *     - services
    *     - helm
    *     - configmap
    *     - deployment
    *     - replicaset
    *     - statefulset
    *     - daemonset
    *     - ingress
    *     - persistentvolume
    *     - persistentvolumeclaim
    *     - secret
    *     - serviceaccount
    *     - storageclass
    *     - networkpolicy
    *     - event
    *     - node
    *     - apiservice
    *     - lease
    *     - componentstatus
    *     - limitrange
    *     - resourcequota
    *     - podtemplate
    *     - hpa
    *     - podLogs
    *     - podsConsumption
*/

//*     - job
//*     - cronjob
//*     - role
//*     - rolebinding
//*     - clusterrole
//*     - clusterrolebinding
//*     - certificate
//*     - certificateSigningRequest
//*     - podsecuritypolicy
//*     - horizontalpodautoscaler
//*     - verticalpodautoscaler
//*     - priorityclass
//*     - customresourcedefinition
//*     - poddisruptionbudget
//*     - endpoint
//*     - mutatingwebhookconfiguration
//*     - validatingwebhookconfiguration
//*     - controllerrevision

import { getConfig } from "../../helpers/loaderConfig";
import helm from 'helm-ts';
import { KubernetesResources, createKubernetesResourcesDefault } from "../../models/kubernetes/kubernetes.models";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { deleteFile, getFile, writeStringToJsonFile } from "../../helpers/files";
import { KubernetesConfig } from "../../models/kubernetes/config.models";
const yaml = require('js-yaml');

import {getNewLogger} from "../logger.service";
const logger = getNewLogger("KubernetesLogger");

const k8s = require('@kubernetes/client-node');
let currentConfig:KubernetesConfig;

let globalConfiguration = getConfig().global ?? {};

export async function collectData(kubernetesConfig:KubernetesConfig[]): Promise<KubernetesResources[]|null>{
    let resources = new Array<KubernetesResources>();
    for(let config of kubernetesConfig??[]){
        currentConfig = config;
        let prefix = config.prefix??(kubernetesConfig.indexOf(config).toString());
        try {
            let pathKubeFile = await getConfigOrEnvVar(config, "KUBECONFIG", prefix);

            if (pathKubeFile?.endsWith(".json"))
                writeStringToJsonFile(JSON.stringify(getFile(pathKubeFile??"")), "./config/kubernetes.json");
            else if (pathKubeFile?.endsWith(".yaml") || pathKubeFile?.endsWith(".yml"))
                writeStringToJsonFile(JSON.stringify(yaml.load(getFile(pathKubeFile??"")), null, 2), "./config/kubernetes.json");
            else
                logger.error("Unknow credentials type for Kubernetes (path must be a .json or .yaml/.yml)");         

            const promises = [
                kubernetesListing(pathKubeFile),
            ];

            const [kubernetesList] = await Promise.all(promises);
            let kubernetesResource = {
                "namespaces": kubernetesList["namespaces"],
                "pods": kubernetesList["pods"],
                "services": kubernetesList["services"],
                "helm": kubernetesList["helm"],
                "configmap":kubernetesList["configmap"],
                "deployment":kubernetesList["deployment"],
                "replicaset":kubernetesList["replicaset"],
                "statefulset":kubernetesList["statefulset"],
                "daemonset":kubernetesList["daemonset"],
                "job":kubernetesList["job"],
                "cronjob":kubernetesList["cronjob"],
                "ingress":kubernetesList["ingress"],
                "persistentvolume":kubernetesList["persistentvolume"],
                "persistentvolumeclaim":kubernetesList["persistentvolumeclaim"],
                "secret":kubernetesList["secret"],
                "serviceaccount":kubernetesList["serviceaccount"],
                "role":kubernetesList["role"],
                "rolebinding":kubernetesList["rolebinding"],
                "clusterrole":kubernetesList["clusterrole"],
                "clusterrolebinding":kubernetesList["clusterrolebinding"],
                "storageclass":kubernetesList["storageclass"],
                "networkpolicy":kubernetesList["networkpolicy"],
                "podsecuritypolicy":kubernetesList["podsecuritypolicy"],
                "limitrange":kubernetesList["limitrange"],
                "resourcequota":kubernetesList["resourcequota"],
                "horizontalpodautoscaler":kubernetesList["horizontalpodautoscaler"],
                "verticalpodautoscaler":kubernetesList["verticalpodautoscaler"],
                "priorityclass":kubernetesList["priorityclass"],
                "customresourcedefinition":kubernetesList["customresourcedefinition"],
                "poddisruptionbudget":kubernetesList["poddisruptionbudget"],
                "event":kubernetesList["event"],
                "endpoint":kubernetesList["endpoint"],
                "node":kubernetesList["node"],
                "podtemplate":kubernetesList["podtemplate"],
                "mutatingwebhookconfiguration":kubernetesList["mutatingwebhookconfiguration"],
                "validatingwebhookconfiguration":kubernetesList["validatingwebhookconfiguration"],
                "apiservice":kubernetesList["apiservice"],
                "controllerrevision":kubernetesList["controllerrevision"],
                "lease":kubernetesList["lease"],
                "certificate":kubernetesList["certificate"],
                "certificateSigningRequest":kubernetesList["certificateSigningRequest"],
                "componentstatus":kubernetesList["componentstatus"],
                "hpa":kubernetesList["hpa"],
                "podLogs":kubernetesList["podLogs"],
                "podsConsumption":kubernetesList["podsConsumption"],
            } as KubernetesResources;
            resources.push(kubernetesResource);
        }catch(e:any){
            logger.error(e);
        }
        deleteFile("./config/kubernetes.json");
    }
    return resources??null;
}

//kubernetes list
export async function kubernetesListing(isPathKubeFile: boolean): Promise<any> {
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    const metricsClient = new k8s.Metrics(kc);
    (isPathKubeFile)?kc.loadFromFile("./config/kubernetes.json"):kc.loadFromDefault();
    //opening different api to get kubernetes resources
    const autoscalingV1Api = kc.makeApiClient(k8s.AutoscalingV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    // const k8sExtensionsV1beta1Api = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    // const k8sRbacAuthorizationV1Api = kc.makeApiClient(k8s.rbacAuthorizationV1Api);
    const k8sStorageV1Api = kc.makeApiClient(k8s.StorageV1Api);
    const k8sApiregistrationV1Api = kc.makeApiClient(k8s.ApiregistrationV1Api);
    const k8CoordinationV1Api = kc.makeApiClient(k8s.CoordinationV1Api);
    const k8sLog = new k8s.Log(kc);
        //const k8scertificatesV1Api = kc.makeApiClient(k8s.certificatesV1Api);
    /////////////////////////////////////////////////////////////////////////////////
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources: KubernetesResources = createKubernetesResourcesDefault();
    kubResources.namespaces = namespaces.body.items;
    const namespacePromises = namespaces.body.items.map(async (item: any) => {
        const promises = [
            collectHelm(item.metadata.name),
            collectPods(k8sApiCore, item.metadata.name),
            collectServices(k8sApiCore, item.metadata.name),
            collectConfigmap(k8sApiCore, item.metadata.name),
            collectDeployment(k8sAppsV1Api, item.metadata.name),
            collectReplicaset(k8sAppsV1Api, item.metadata.name),
            collectStatefulset(k8sAppsV1Api, item.metadata.name),
            collectDaemonset(k8sAppsV1Api, item.metadata.name),
            //collectJob(k8sApiCore, item.metadata.name),
            //collectCronjob(k8sApiCore, item.metadata.name),
            collectIngress(k8sNetworkingV1Api, item.metadata.name),
            collectPersistentvolume(k8sApiCore, item.metadata.name),
            collectPersistentvolumeclaim(k8sApiCore, item.metadata.name),
            collectSecret(k8sApiCore, item.metadata.name),
            collectServiceaccount(k8sApiCore, item.metadata.name),
            //collectRole(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectRolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectClusterrole(k8sRbacAuthorizationV1Api, item.metadata.name),
            //collectClusterrolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            collectStorageclass(k8sStorageV1Api, item.metadata.name),
            collectNetworkpolicy(k8sNetworkingV1Api, item.metadata.name),
            //collectPodsecuritypolicy(k8sApiCore, item.metadata.name),
            //collectLimitrange(k8sApiCore, item.metadata.name),
            //collectResourcequota(k8sApiCore, item.metadata.name),
            //collectHorizontalpodautoscaler(k8sApiCore, item.metadata.name),
            //collectVerticalpodautoscaler(k8sApiCore, item.metadata.name),
            //collectPriorityclass(k8sApiCore, item.metadata.name),
            //collectCustomresourcedefinition(k8sApiCore, item.metadata.name),
            //collectPoddisruptionbudget(k8sApiCore, item.metadata.name),
            collectEvent(k8sApiCore, item.metadata.name),
            //collectEndpoint(k8sApiCore, item.metadata.name),
            collectNode(k8sApiCore, item.metadata.name),
            //collectPodtemplate(k8sApiCore, item.metadata.name),
            //collectMutatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            //collectValidatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            collectApiservice(k8sApiregistrationV1Api, item.metadata.name),
            //collectControllerrevision(k8sApiCore, item.metadata.name),
            collectLease(k8CoordinationV1Api, item.metadata.name),
            //collectCertificate(k8scertificatesV1Api, item.metadata.name),
            //collectCertificateSigningRequest(k8scertificatesV1Api, item.metadata.name),
            collectComponentstatus(k8sApiCore, item.metadata.name),
            collectHorizontalPodAutoscaler(autoscalingV1Api, item.metadata.name),
            collectPodLogs(k8sLog, k8sApiCore, item.metadata.name),
            collectPodsConsumption(k8sApiCore, metricsClient, item.metadata.name)
        ];
        const [
            helmData,
            pods,
            serviceData,
            configmapData,
            deploymentData,
            replicasetData,
            statefulsetData,
            daemonsetData,
            //jobData,
            //cronjobData,
            ingressData,
            persistentvolumeData,
            persistentvolumeclaimData,
            secretData,
            serviceaccountData,
            //roleData,
            //rolebindingData,
            //clusterroleData,
            //clusterrolebindingData,
            storageclassData,
            networkpolicyData,
            //podsecuritypolicyData,
            //limitrangeData,
            //resourcequotaData,
            //horizontalpodautoscalerData,
            //verticalpodautoscalerData,
            //priorityclassData,
            //customresourcedefinitionData,
            //poddisruptionbudgetData,
            eventData,
            //endpointData,
            nodeData,
            //podtemplateData,
            //mutatingwebhookconfigurationData,
            //validatingwebhookconfigurationData,
            apiserviceData,
            //controllerrevisionData,
            leaseData,
            //certificateData,
            //certificateSigningRequestData,
            componentstatusData,
            hpa,
            podLogs,
            podsConsumption
        ] = await Promise.all(promises);

        const resourcesToAddNamespace = [
            [helmData, "helm"],
            [pods, "pods"], // work
            [serviceData, "services"], // work
            [configmapData, "configmap"], // work
            [deploymentData, "deployment"], // work
            [replicasetData, "replicaset"], // work
            [statefulsetData, "statefulset"], // work
            [daemonsetData, "daemonset"], // work
            //[jobData, "job"],
            //[cronjobData, "cronjob"],
            [ingressData, "ingress"], // work
            [persistentvolumeData, "persistentvolume"], // work
            [persistentvolumeclaimData, "persistentvolumeclaim"], // work
            [secretData, "secret"], // work
            [serviceaccountData, "serviceaccount"], // work
            //[roleData, "role"],
            //[rolebindingData, "rolebinding"],
            //[clusterroleData, "clusterrole"],
            //[clusterrolebindingData, "clusterrolebinding"],
            [storageclassData, "storageclass"], // work
            [networkpolicyData, "networkpolicy"], // work
            //[podsecuritypolicyData, "podsecuritypolicy"],
            //[limitrangeData, "limitrange"], // no crash but no data
            //[resourcequotaData, "resourcequota"], // no crash but no data
            //[horizontalpodautoscalerData, "horizontalpodautoscaler"],
            //[verticalpodautoscalerData, "verticalpodautoscaler"],
            //[priorityclassData, "priorityclass"],
            //[customresourcedefinitionData, "customresourcedefinition"],
            //[poddisruptionbudgetData, "poddisruptionbudget"],
            [eventData, "event"], // work
            //[endpointData, "endpoint"],
            [nodeData, "node"], // work
            //[podtemplateData, "podtemplate"], // no crash but no data
            //[mutatingwebhookconfigurationData, "mutatingwebhookconfiguration"],
            //[validatingwebhookconfigurationData, "validatingwebhookconfiguration"],
            [apiserviceData, "apiservice"], // work
            //[controllerrevisionData, "controllerrevision"],
            [leaseData, "lease"], // work
            //[certificateData, "certificate"],
            //[certificateSigningRequestData, "certificateSigningRequest"],
            [componentstatusData, "componentstatus"], // work
            [hpa, "hpa"],
            [podLogs, "podLogs"],
            [podsConsumption, "podsConsumption"]
        ];
        Promise.all(resourcesToAddNamespace.map
            (async (resource: any) => {
            kubResources = await getAllElementsWithNameSpace(resource, item.metadata.name, kubResources);
        }));
  
        helmData?.forEach((helmItem: any) => {
            kubResources["helm"].push(helmItem);
        });
    });
    await Promise.all(namespacePromises);
    return kubResources;
}

async function getAllElementsWithNameSpace(resources: [any, string], namespace:string, kubResources: KubernetesResources): Promise<KubernetesResources>{
    const [resourceData, resourceName] = resources;
    if(resourceData == null) return kubResources;
    await Promise.all(resourceData.map(async (resource:any) => {
                // if namepsace properties does not exist, create it
        if (!resource.metadata) 
            resource.metadata = {};
        if (!resource.metadata.namespace) 
            resource.metadata.namespace = namespace;
        (kubResources as any)[resourceName].push(resource);
    }));
    return kubResources
}

async function collectHelm(namespace: string): Promise<any> {
  //  if(!currentConfig?.ObjectNameNeed?.includes("helm")) return [];
    try{
        let helmData = await helm.list({ namespace: namespace });
        return helmData;
    }catch(e:any){
        logger.debug(e);
        return [];
    }
}

/*async function collectPods(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("pods")) return [];
    try{
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods?.body?.items;
    }catch(e:any){
        logger.debug(e);
        return [];
    }
}*/

async function collectPods(k8sApiCore: any, namespace: string): Promise<any> {

    if (!currentConfig?.ObjectNameNeed?.includes("pods")) return [];
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        const formattedPods = pods?.body?.items.map((pod: any) => {
            const formattedLabels = Object.entries(pod.metadata.labels || {}).map(([key, value]) => ({
                key,
                value,
            }));

            return {
                ...pod,
                metadata: {
                    ...pod.metadata,
                    labels: formattedLabels,
                },
            };
        });
        formattedPods.forEach((pod: any) => {
            pod.status.formattedConditions = {};
        
            pod.status.conditions.forEach((condition: any) => {
                const type = condition.type;
                pod.status.formattedConditions[type] = {
                    lastProbeTime: condition.lastProbeTime,
                    lastTransitionTime: condition.lastTransitionTime,
                    message: condition.message,
                    reason: condition.reason,
                    status: condition.status
                };
            });
        });
        return formattedPods;
    } catch (e: any) {
        logger.debug(e);
        return [];
    }
}

async function collectPodsConsumption(k8sApiCore: any, metricsClient: any, namespace: string) : Promise<any> {
    if (!currentConfig?.ObjectNameNeed?.includes("podsConsumption")) return [];
    let podsAndContainersColumns;
    try {
        
        const topPodsRes2 = await k8s.topPods(k8sApiCore, metricsClient, namespace);
        podsAndContainersColumns = topPodsRes2.flatMap((pod: any) => {
            return pod.Containers.map((containerUsage: any) => {
                return {
                    podName: pod.Pod.metadata.name,
                    name: containerUsage.Container,
                    CPUUsage: parseFloat(containerUsage.CPUUsage.CurrentUsage),
                    MemoryUsage: containerUsage.MemoryUsage.CurrentUsage.toString(),
                    metadata: {}
                }
            });
        });
    } catch (err) {
        logger.debug(err);
    }

    return podsAndContainersColumns;
}

async function collectServices(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("services")) return [];
    try{
        const services = await k8sApiCore.listNamespacedService(namespace);
        return services?.body?.items;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

async function collectConfigmap(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("configmap")) return [];
    try{
        const configmap = await k8sApiCore.listNamespacedConfigMap(namespace);
        return configmap?.body?.items;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

async function collectDeployment(k8sAppsV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("deployment")) return [];
    try{
        const deployment = await k8sAppsV1Api.listNamespacedDeployment(namespace);
        return deployment?.body?.items;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

async function collectReplicaset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("replicaset")) return [];
    try {
        const replicasets = await k8sAppsV1Api.listNamespacedReplicaSet(namespace);
        return replicasets?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectStatefulset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("statefulset")) return [];
    try {
        const statefulsets = await k8sAppsV1Api.listNamespacedStatefulSet(namespace);
        return statefulsets?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectDaemonset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("daemonset")) return [];
    try {
        const daemonsets = await k8sAppsV1Api.listNamespacedDaemonSet(namespace);
        return daemonsets?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//TODO:find a way to get jobs
async function collectJob(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("job")) return [];
    try {
        const jobs = await k8sApiCore.listNamespacedJob(namespace);
        return jobs?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//TODO:find a way to get cronjobs
async function collectCronjob(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("cronjob")) return [];
    try {
        const cronjobs = await k8sApiCore.listNamespacedCronJob(namespace);
        return cronjobs?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectIngress(k8sNetworkingV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("ingress")) return [];
    try {
        const ingress = await k8sNetworkingV1Api.listNamespacedIngress(namespace);
        return ingress?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectPersistentvolume(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("persistentvolume")) return [];
    try {
        const persistentVolumes = await k8sApiCore.listPersistentVolume(namespace);
        return persistentVolumes?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectPersistentvolumeclaim(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("persistentvolumeclaim")) return [];
    try {
        const persistentVolumeClaims = await k8sApiCore.listNamespacedPersistentVolumeClaim(namespace);
        return persistentVolumeClaims?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectSecret(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("secret")) return [];
    try {
        const secrets = await k8sApiCore.listNamespacedSecret(namespace);
        return secrets?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectServiceaccount(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("serviceaccount")) return [];
    try {
        const serviceAccounts = await k8sApiCore.listNamespacedServiceAccount(namespace);
        return serviceAccounts?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectRole(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("role")) return [];
    try {
        const roles = await k8sRbacAuthorizationV1Api.listNamespacedRole(namespace);
        return roles?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectRolebinding(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("rolebinding")) return [];
    try {
        const roleBindings = await k8sRbacAuthorizationV1Api.listNamespacedRoleBinding(namespace);
        return roleBindings?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectClusterrole(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("clusterrole")) return [];
    try {
        const clusterRoles = await k8sRbacAuthorizationV1Api.listClusterRole();
        return clusterRoles?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectClusterrolebinding(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("clusterrolebinding")) return [];
    try {
        const clusterRoleBindings = await k8sRbacAuthorizationV1Api.listClusterRoleBinding();
        return clusterRoleBindings?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectStorageclass(k8sStorageV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("storageclass")) return [];
    try {
        const storageClasses = await k8sStorageV1Api.listStorageClass(namespace);
        return storageClasses?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectNetworkpolicy(k8sNetworkingV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("networkpolicy")) return [];
    try {
        const networkPolicies = await k8sNetworkingV1Api.listNamespacedNetworkPolicy(namespace);
        return networkPolicies?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get podsecuritypolicy
async function collectPodsecuritypolicy(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("podsecuritypolicy")) return [];
    try {
        const podSecurityPolicies = await k8sApiCore.listPodSecurityPolicy();
        return podSecurityPolicies?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectLimitrange(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("limitrange")) return [];
    try {
        const limitRanges = await k8sApiCore.listNamespacedLimitRange(namespace);
        return limitRanges?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectResourcequota(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("resourcequota")) return [];
    try {
        const resourceQuotas = await k8sApiCore.listNamespacedResourceQuota(namespace);
        return resourceQuotas?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get horizontalpodautoscaler
async function collectHorizontalpodautoscaler(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("horizontalpodautoscaler")) return [];
    try {
        const horizontalPodAutoscalers = await k8sApiCore.listNamespacedHorizontalPodAutoscaler(namespace);
        return horizontalPodAutoscalers?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get verticalpodautoscaler
async function collectVerticalpodautoscaler(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("verticalpodautoscaler")) return [];
    try {
        const verticalPodAutoscalers = await k8sApiCore.listNamespacedVerticalPodAutoscaler(namespace);
        return verticalPodAutoscalers?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get priorityclass
async function collectPriorityclass(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("priorityclass")) return [];
    try {
        const priorityClasses = await k8sApiCore.listPriorityClass();
        return priorityClasses?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get customresourcedefinition
async function collectCustomresourcedefinition(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("customresourcedefinition")) return [];
    try {
        const customResourceDefinitions = await k8sApiCore.listCustomResourceDefinition();
        return customResourceDefinitions?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get poddisruptionbudget
async function collectPoddisruptionbudget(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("poddisruptionbudget")) return [];
    try {
        const podDisruptionBudgets = await k8sApiCore.listNamespacedPodDisruptionBudget(namespace);
        return podDisruptionBudgets?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectEvent(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("event")) return [];
    try {
        const events = await k8sApiCore.listNamespacedEvent(namespace);
        return events?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectEndpoint(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("endpoint")) return [];
    try {
        const endpoints = await k8sApiCore.listNamespacedEndpoint(namespace);
        return endpoints?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectNode(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("node")) return [];
    try {
        const nodes = await k8sApiCore.listNode();

        nodes?.body?.items.forEach((node: any) => {
            node.status.formattedConditions = {};
        
            node.status.conditions.forEach((condition: any) => {
                const type = condition.type;
                node.status.formattedConditions[type] = {
                    lastProbeTime: condition.lastProbeTime,
                    lastTransitionTime: condition.lastTransitionTime,
                    message: condition.message,
                    reason: condition.reason,
                    status: condition.status
                };
            });
        });
        return nodes?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectPodtemplate(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("podtemplate")) return [];
    try {
        const podTemplates = await k8sApiCore.listNamespacedPodTemplate(namespace);
        return podTemplates?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectMutatingwebhookconfiguration(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("mutatingwebhookconfiguration")) return [];
    try {
        const mutatingWebhookConfigurations = await k8sApiCore.listMutatingWebhookConfiguration();
        return mutatingWebhookConfigurations?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get validatingwebhookconfiguration
async function collectValidatingwebhookconfiguration(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("validatingwebhookconfiguration")) return [];
    try {
        const validatingWebhookConfigurations = await k8sApiCore.listValidatingWebhookConfiguration();
        return validatingWebhookConfigurations?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectApiservice(k8sApiregistrationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("apiservice")) return [];
    try {
        const apiServices = await k8sApiregistrationV1Api.listAPIService();
        return apiServices?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get controllerrevision
async function collectControllerrevision(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("controllerrevision")) return [];
    try {
        const controllerRevisions = await k8sApiCore.listNamespacedControllerRevision(namespace);
        return controllerRevisions?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectLease(k8CoordinationV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("lease")) return [];
    try {
        const leases = await k8CoordinationV1Api.listNamespacedLease(namespace);
        return leases?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get certificate
async function collectCertificate(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("certificate")) return [];
    try {
        const certificates = await k8sApiCore.listNamespacedCertificate(namespace);
        return certificates?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

async function collectCertificateSigningRequest(k8scertificatesV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("certificateSigningRequest")) return [];
    try {
        const certificateSigningRequests = await k8scertificatesV1Api.listCertificateSigningRequest();
        return certificateSigningRequests?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}

//todo: find a way to get componentstatus
async function collectComponentstatus(k8sApiCore: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("componentstatus")) return [];
    try {
        const componentStatuses = await k8sApiCore.listComponentStatus();
        return componentStatuses?.body?.items;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}


async function collectPodLogs(k8sLog: any, k8sApiCore: any, namespace: string): Promise<any> {
    if (!currentConfig?.ObjectNameNeed?.includes("podLogs")) return [];
    if (globalConfiguration?.scanDelay == null) globalConfiguration.scanDelay = 3600;
    try {
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        const stream = require('stream');
        const logsData: any[] = [];
        const delay = (ms: any) => new Promise((resolve: any) => setTimeout(resolve, ms));

        await Promise.all(pods?.body?.items.map(async (pod: any) => {
            const logStream = new stream.PassThrough();
            const currDate = new Date();
            const interval = new Date(currDate.getTime() - (globalConfiguration?.scanDelay ?? 3600 ) * 1000);

            logStream.on('data', (chunk: any) => {
                const logEntries = chunk.toString();
                logsData.push({
                    metadata: pod.metadata,
                    logs: logEntries.split('\n').map((line: string) => ({ line })),
                    interval: interval
                });
            });

            try {
                const req = await k8sLog.log(namespace, pod.metadata.name, null, logStream, {
                    follow: true,
                    tailLines: 50,
                    pretty: false,
                    timestamps: true,
                    sinceSeconds: globalConfiguration?.scanDelay ?? 3600
                });
                if (req) {
                    await delay(2000);
                    req.abort();
                }
            } catch (err) {
                logger.debug("error when retrieving log on pod :" + pod.metadata.name);
                logger.silly(err);
            }
        }));
        return logsData;
    } catch (e) {
        logger.debug(e);
        return [];
    }
}



async function collectHorizontalPodAutoscaler(autoscalingV1Api: any, namespace: string): Promise<any> {
    if(!currentConfig?.ObjectNameNeed?.includes("hpa")) return [];
    try {
       const hpa = await autoscalingV1Api.listNamespacedHorizontalPodAutoscaler(namespace);
        return hpa?.body?.items;
    } catch (error) {
      logger.warn("Error getting Pod:", error);
      return null;
    }
  }
  