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
    *     - job
    *     - cronjob
    *     - ingress
    *     - persistentvolume
    *     - persistentvolumeclaim
    *     - secret
    *     - serviceaccount
    *     - role
    *     - rolebinding
    *     - clusterrole
    *     - clusterrolebinding
    *     - storageclass
    *     - networkpolicy
    *     - podsecuritypolicy
    *     - limitrange
    *     - resourcequota
    *     - horizontalpodautoscaler
    *     - verticalpodautoscaler
    *     - priorityclass
    *     - customresourcedefinition
    *     - poddisruptionbudget
    *     - event
    *     - endpoint
    *     - node
    *     - podtemplate
    *     - mutatingwebhookconfiguration
    *     - validatingwebhookconfiguration
    *     - apiservice
    *     - controllerrevision
    *     - lease
    *     - certificate
    *     - certificateSigningRequest
    *     - componentstatus
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
export async function kubernetesListing(isPathKubeFile: boolean): Promise<any> {
    let context = getContext();
    context?.log("starting kubernetesListing");
    logger.info("starting kubernetesListing");
    const kc = new k8s.KubeConfig();
    (isPathKubeFile)?kc.loadFromFile("./config/kubernetes.json"):kc.loadFromDefault();
    //opening different api to get kubernetes resources
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sAppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    // const k8sExtensionsV1beta1Api = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
    // const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);
    // const k8sRbacAuthorizationV1Api = kc.makeApiClient(k8s.rbacAuthorizationV1Api);
    // const k8sStorageV1Api = kc.makeApiClient(k8s.StorageV1Api);
    // const k8sApiregistrationV1Api = kc.makeApiClient(k8s.ApiregistrationV1Api);
    // const k8CoordinationV1Api = kc.makeApiClient(k8s.CoordinationV1Api);
    // const k8scertificatesV1Api = kc.makeApiClient(k8s.certificatesV1Api);
    /////////////////////////////////////////////////////////////////////////////////
    let namespaces = await k8sApiCore.listNamespace();
    let kubResources: any = {};
    kubResources["namespaces"] = namespaces.body.items;
    kubResources["pods"] = [];
    kubResources["services"] = [];
    kubResources["helm"] = [];
    kubResources["configmap"] = [];
    kubResources["deployment"] = [];
    kubResources["replicaset"] = [];
    kubResources["statefulset"] = [];
    kubResources["daemonset"] = [];
    kubResources["job"] = [];
    kubResources["cronjob"] = [];
    kubResources["ingress"] = [];
    kubResources["persistentvolume"] = [];
    kubResources["persistentvolumeclaim"] = [];
    kubResources["secret"] = [];
    kubResources["serviceaccount"] = [];
    kubResources["role"] = [];
    kubResources["rolebinding"] = [];
    kubResources["clusterrole"] = [];
    kubResources["clusterrolebinding"] = [];
    kubResources["storageclass"] = [];
    kubResources["networkpolicy"] = [];
    kubResources["podsecuritypolicy"] = [];
    kubResources["limitrange"] = [];
    kubResources["resourcequota"] = [];
    kubResources["horizontalpodautoscaler"] = [];
    kubResources["verticalpodautoscaler"] = [];
    kubResources["priorityclass"] = [];
    kubResources["customresourcedefinition"] = [];
    kubResources["poddisruptionbudget"] = [];
    kubResources["event"] = [];
    kubResources["endpoint"] = [];
    kubResources["node"] = [];
    kubResources["podtemplate"] = [];
    kubResources["mutatingwebhookconfiguration"] = [];
    kubResources["validatingwebhookconfiguration"] = [];
    kubResources["apiservice"] = [];
    kubResources["controllerrevision"] = [];
    kubResources["lease"] = [];
    kubResources["certificate"] = [];
    kubResources["certificateSigningRequest"] = [];
    kubResources["componentstatus"] = [];
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
            // collectJob(k8sApiCore, item.metadata.name),
            // collectCronjob(k8sApiCore, item.metadata.name),
            // collectIngress(k8sNetworkingV1Api, item.metadata.name),
            // collectPersistentvolume(k8sApiCore, item.metadata.name),
            // collectPersistentvolumeclaim(k8sApiCore, item.metadata.name),
            // collectSecret(k8sApiCore, item.metadata.name),
            // collectServiceaccount(k8sApiCore, item.metadata.name),
            // collectRole(k8sRbacAuthorizationV1Api, item.metadata.name),
            // collectRolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            // collectClusterrole(k8sRbacAuthorizationV1Api, item.metadata.name),
            // collectClusterrolebinding(k8sRbacAuthorizationV1Api, item.metadata.name),
            // collectStorageclass(k8sStorageV1Api, item.metadata.name),
            // collectNetworkpolicy(k8sNetworkingV1Api, item.metadata.name),
            // collectPodsecuritypolicy(k8sApiCore, item.metadata.name),
            // collectLimitrange(k8sApiCore, item.metadata.name),
            // collectResourcequota(k8sApiCore, item.metadata.name),
            // collectHorizontalpodautoscaler(k8sApiCore, item.metadata.name),
            // collectVerticalpodautoscaler(k8sApiCore, item.metadata.name),
            // collectPriorityclass(k8sApiCore, item.metadata.name),
            // collectCustomresourcedefinition(k8sApiCore, item.metadata.name),
            // collectPoddisruptionbudget(k8sApiCore, item.metadata.name),
            // collectEvent(k8sApiCore, item.metadata.name),
            // collectEndpoint(k8sApiCore, item.metadata.name),
            // collectNode(k8sApiCore, item.metadata.name),
            // collectPodtemplate(k8sApiCore, item.metadata.name),
            // collectMutatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            // collectValidatingwebhookconfiguration(k8sApiCore, item.metadata.name),
            // collectApiservice(k8sApiregistrationV1Api, item.metadata.name),
            // collectControllerrevision(k8sApiCore, item.metadata.name),
            // collectLease(k8CoordinationV1Api, item.metadata.name),
            // collectCertificate(k8scertificatesV1Api, item.metadata.name),
            // collectCertificateSigningRequest(k8scertificatesV1Api, item.metadata.name),
            // collectComponentstatus(k8sApiCore, item.metadata.name)
        ];
        const [helmData, pods, serviceData, configmapData, deploymentData, replicasetData, statefulsetData, daemonsetData, jobData, cronjobData, ingressData, persistentvolumeData, persistentvolumeclaimData, secretData, serviceaccountData, roleData, rolebindingData, clusterroleData, clusterrolebindingData, storageclassData, networkpolicyData, podsecuritypolicyData, limitrangeData, resourcequotaData, horizontalpodautoscalerData, verticalpodautoscalerData, priorityclassData, customresourcedefinitionData, poddisruptionbudgetData, eventData, endpointData, nodeData, podtemplateData, mutatingwebhookconfigurationData, validatingwebhookconfigurationData, apiserviceData, controllerrevisionData, leaseData, certificateData, certificateSigningRequestData, componentstatusData ] = await Promise.all(promises);
        helmData?.forEach((helmItem: any) => {
            kubResources["helm"].push(helmItem);
        });
        pods?.body?.items?.forEach((pod: any) => {
            pod.metadata.namespace = item.metadata.name;
            kubResources["pods"].push(pod);
        });
        serviceData.body.items?.forEach((service: any) => {
            service.metadata.namespace = item.metadata.name;
            kubResources["services"].push(service);
        });
        configmapData.body.items?.forEach((configmap:any) => {
            configmap.metadata.namespace = item.metadata.name;
            kubResources["configmap"].push(configmap);
        });
        deploymentData.body.items?.forEach((deployment:any) => {
            deployment.metadata.namespace = item.metadata.name;
            kubResources["deployment"].push(deployment);
        });
        replicasetData.body.items?.forEach((replicaset:any) => {
            replicaset.metadata.namespace = item.metadata.name;
            kubResources["replicaset"].push(replicaset);
        });
        statefulsetData.body.items?.forEach((statefulset:any) => {
            statefulset.metadata.namespace = item.metadata.name;
            kubResources["statefulset"].push(statefulset);
        }); 
        daemonsetData.body.items?.forEach((daemonset:any) => {
            daemonset.metadata.namespace = item.metadata.name;
            kubResources["daemonset"].push(daemonset);
        });
        // jobData.body.items?.forEach((job:any) => {
        //     job.metadata.namespace = item.metadata.name;
        //     kubResources["job"].push(job);
        // });
        // cronjobData.body.items?.forEach((cronjob:any) => {
        //     cronjob.metadata.namespace = item.metadata.name;
        //     kubResources["cronjob"].push(cronjob);
        // });
        // ingressData.body.items?.forEach((ingress:any) => {
        //     ingress.metadata.namespace = item.metadata.name;
        //     kubResources["ingress"].push(ingress);
        // });
        // persistentvolumeData.body.items?.forEach((persistentvolume:any) => {
        //     persistentvolume.metadata.namespace = item.metadata.name;
        //     kubResources["persistentvolume"].push(persistentvolume);
        // });
        // persistentvolumeclaimData.body.items?.forEach((persistentvolumeclaim:any) => {
        //     persistentvolumeclaim.metadata.namespace = item.metadata.name;
        //     kubResources["persistentvolumeclaim"].push(persistentvolumeclaim);
        // });
        // secretData.body.items?.forEach((secret:any) => {
        //     secret.metadata.namespace = item.metadata.name;
        //     kubResources["secret"].push(secret);
        // });
        // serviceaccountData.body.items?.forEach((serviceaccount:any) => {
        //     serviceaccount.metadata.namespace = item.metadata.name;
        //     kubResources["serviceaccount"].push(serviceaccount);
        // });
        // roleData.body.items?.forEach((role:any) => {
        //     role.metadata.namespace = item.metadata.name;
        //     kubResources["role"].push(role);
        // });
        // rolebindingData.body.items?.forEach((rolebinding:any) => {
        //     rolebinding.metadata.namespace = item.metadata.name;
        //     kubResources["rolebinding"].push(rolebinding);
        // });
        // clusterroleData.body.items?.forEach((clusterrole:any) => {
        //     clusterrole.metadata.namespace = item.metadata.name;
        //     kubResources["clusterrole"].push(clusterrole);
        // });
        // clusterrolebindingData.body.items?.forEach((clusterrolebinding:any) => {
        //     clusterrolebinding.metadata.namespace = item.metadata.name;
        //     kubResources["clusterrolebinding"].push(clusterrolebinding);
        // });
        // storageclassData.body.items?.forEach((storageclass:any) => {
        //     storageclass.metadata.namespace = item.metadata.name;
        //     kubResources["storageclass"].push(storageclass);
        // });
        // networkpolicyData.body.items?.forEach((networkpolicy:any) => {
        //     networkpolicy.metadata.namespace = item.metadata.name;
        //     kubResources["networkpolicy"].push(networkpolicy);
        // });
        // podsecuritypolicyData.body.items?.forEach((podsecuritypolicy:any) => {
        //     podsecuritypolicy.metadata.namespace = item.metadata.name;
        //     kubResources["podsecuritypolicy"].push(podsecuritypolicy);
        // });
        // limitrangeData.body.items?.forEach((limitrange:any) => {
        //     limitrange.metadata.namespace = item.metadata.name;
        //     kubResources["limitrange"].push(limitrange);
        // });
        // resourcequotaData.body.items?.forEach((resourcequota:any) => {
        //     resourcequota.metadata.namespace = item.metadata.name;
        //     kubResources["resourcequota"].push(resourcequota);
        // });
        // horizontalpodautoscalerData.body.items?.forEach((horizontalpodautoscaler:any) => {
        //     horizontalpodautoscaler.metadata.namespace = item.metadata.name;
        //     kubResources["horizontalpodautoscaler"].push(horizontalpodautoscaler);
        // }); 
        // verticalpodautoscalerData.body.items?.forEach((verticalpodautoscaler:any) => {
        //     verticalpodautoscaler.metadata.namespace = item.metadata.name;
        //     kubResources["verticalpodautoscaler"].push(verticalpodautoscaler);
        // });
        // priorityclassData.body.items?.forEach((priorityclass:any) => {
        //     priorityclass.metadata.namespace = item.metadata.name;
        //     kubResources["priorityclass"].push(priorityclass);
        // });
        // customresourcedefinitionData.body.items?.forEach((customresourcedefinition:any) => {
        //     customresourcedefinition.metadata.namespace = item.metadata.name;
        //     kubResources["customresourcedefinition"].push(customresourcedefinition);
        // });
        // poddisruptionbudgetData.body.items?.forEach((poddisruptionbudget:any) => {
        //     poddisruptionbudget.metadata.namespace = item.metadata.name;
        //     kubResources["poddisruptionbudget"].push(poddisruptionbudget);
        // }); 
        // eventData.body.items?.forEach((event:any) => {
        //     event.metadata.namespace = item.metadata.name;
        //     kubResources["event"].push(event);
        // }); 
        // endpointData.body.items?.forEach((endpoint:any) => {
        //     endpoint.metadata.namespace = item.metadata.name;
        //     kubResources["endpoint"].push(endpoint);
        // });
        // nodeData.body.items?.forEach((node:any) => {
        //     node.metadata.namespace = item.metadata.name;
        //     kubResources["node"].push(node);
        // });
        // podtemplateData.body.items?.forEach((podtemplate:any) => {
        //     podtemplate.metadata.namespace = item.metadata.name;
        //     kubResources["podtemplate"].push(podtemplate);
        // }); 
        // mutatingwebhookconfigurationData.body.items?.forEach((mutatingwebhookconfiguration:any) => {
        //     mutatingwebhookconfiguration.metadata.namespace = item.metadata.name;
        //     kubResources["mutatingwebhookconfiguration"].push(mutatingwebhookconfiguration);
        // });
        // validatingwebhookconfigurationData.body.items?.forEach((validatingwebhookconfiguration:any) => {
        //     validatingwebhookconfiguration.metadata.namespace = item.metadata.name;
        //     kubResources["validatingwebhookconfiguration"].push(validatingwebhookconfiguration);
        // });
        // apiserviceData.body.items?.forEach((apiservice:any) => {
        //     apiservice.metadata.namespace = item.metadata.name;
        //     kubResources["apiservice"].push(apiservice);
        // });
        // controllerrevisionData.body.items?.forEach((controllerrevision:any) => {
        //     controllerrevision.metadata.namespace = item.metadata.name;
        //     kubResources["controllerrevision"].push(controllerrevision);
        // });
        // leaseData.body.items?.forEach((lease:any) => {
        //     lease.metadata.namespace = item.metadata.name;
        //     kubResources["lease"].push(lease);
        // });
        // certificateData.body.items?.forEach((certificate:any) => {
        //     certificate.metadata.namespace = item.metadata.name;
        //     kubResources["certificate"].push(certificate);
        // });
        // certificateSigningRequestData.body.items?.forEach((certificateSigningRequest:any) => {
        //     certificateSigningRequest.metadata.namespace = item.metadata.name;
        //     kubResources["certificateSigningRequest"].push(certificateSigningRequest);
        // });
        // componentstatusData.body.items?.forEach((componentstatus:any) => {
        //     componentstatus.metadata.namespace = item.metadata.name;
        //     kubResources["componentstatus"].push(componentstatus);
        // });
     });
     await Promise.all(namespacePromises);
     return kubResources;
 }

async function collectHelm(namespace: string): Promise<any> {
    try{
        let helmData = await helm.list({ namespace: namespace });
        return helmData;
    }catch(e){
        logger.error(e);
        return null;
    }
}

async function collectPods(k8sApiCore: any, namespace: string): Promise<any> {
    try{
        const pods = await k8sApiCore.listNamespacedPod(namespace);
        return pods;
    }catch(e){
        logger.error(e);
        return null;
    }
}

async function collectServices(k8sApiCore: any, namespace: string): Promise<any> {
    try{
        const services = await k8sApiCore.listNamespacedService(namespace);
        return services;
    }catch(e){
        logger.debug(e);
        return null;
    }
}
async function collectConfigmap(k8sApiCore: any, namespace: string): Promise<any> {
        try{
        const configmap = await k8sApiCore.listNamespacedConfigMap(namespace);
        return configmap;
    }catch(e){
        logger.debug(e);
        return null;
    }
}
async function collectDeployment(k8sAppsV1Api: any, namespace: string): Promise<any> {
        try{
        const deployment = await k8sAppsV1Api.listNamespacedDeployment(namespace);
        return deployment;
    }catch(e){
        logger.debug(e);
        return null;
    }
}
async function collectReplicaset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    try {
        const replicasets = await k8sAppsV1Api.listNamespacedReplicaSet(namespace);
        return replicasets;
    } catch (e) {
        logger.debug(e);
        return null;
    }
}
async function collectStatefulset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    try {
        const statefulsets = await k8sAppsV1Api.listNamespacedStatefulSet(namespace);
        return statefulsets;
    } catch (e) {
        logger.debug(e);
        return null;
    }
}

async function collectDaemonset(k8sAppsV1Api: any, namespace: string): Promise<any> {
    try {
        const daemonsets = await k8sAppsV1Api.listNamespacedDaemonSet(namespace);
        return daemonsets;
    } catch (e) {
        logger.debug(e);
        return null;
    }
}
//TODO:find a way to get jobs
async function collectJob(k8sApiCore: any, namespace: string): Promise<any> {
    try {
        //const jobs = await k8sApiCore.listNamespacedJob(namespace);
        //return jobs;
    } catch (e) {
        logger.debug(e);
        return null;
    }
}
//TODO:find a way to get cronjobs
async function collectCronjob(k8sApiCore: any, namespace: string): Promise<any> {
    try {
        //const cronjobs = await k8sApiCore.listNamespacedCronJob(namespace);
        //return cronjobs;
    } catch (e) {
        logger.debug(e);
        return null;
    }
}

// async function collectIngress(k8sNetworkingV1Api: any, namespace: string): Promise<any> {
//     try {
//         const ingress = await k8sNetworkingV1Api.listNamespacedIngress(namespace);
//         return ingress;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectPersistentvolume(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const persistentVolumes = await k8sApiCore.listPersistentVolume(namespace);
//         return persistentVolumes;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectPersistentvolumeclaim(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const persistentVolumeClaims = await k8sApiCore.listNamespacedPersistentVolumeClaim(namespace);
//         return persistentVolumeClaims;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectSecret(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const secrets = await k8sApiCore.listNamespacedSecret(namespace);
//         return secrets;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectServiceaccount(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const serviceAccounts = await k8sApiCore.listNamespacedServiceAccount(namespace);
//         return serviceAccounts;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectRole(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const roles = await k8sRbacAuthorizationV1Api.listNamespacedRole(namespace);
//         return roles;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectRolebinding(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const roleBindings = await k8sRbacAuthorizationV1Api.listNamespacedRoleBinding(namespace);
//         return roleBindings;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectClusterrole(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const clusterRoles = await k8sRbacAuthorizationV1Api.listClusterRole();
//         return clusterRoles;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectClusterrolebinding(k8sRbacAuthorizationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const clusterRoleBindings = await k8sRbacAuthorizationV1Api.listClusterRoleBinding();
//         return clusterRoleBindings;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectStorageclass(k8sStorageV1Api: any, namespace: string): Promise<any> {
//     try {
//         const storageClasses = await k8sStorageV1Api.listStorageClass();
//         return storageClasses;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectNetworkpolicy(k8sNetworkingV1Api: any, namespace: string): Promise<any> {
//     try {
//         const networkPolicies = await k8sNetworkingV1Api.listNamespacedNetworkPolicy(namespace);
//         return networkPolicies;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get podsecuritypolicy
// async function collectPodsecuritypolicy(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const podSecurityPolicies = await k8sApiCore.listPodSecurityPolicy();
//         //return podSecurityPolicies;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectLimitrange(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const limitRanges = await k8sApiCore.listNamespacedLimitRange(namespace);
//         return limitRanges;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectResourcequota(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const resourceQuotas = await k8sApiCore.listNamespacedResourceQuota(namespace);
//         return resourceQuotas;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get horizontalpodautoscaler
// async function collectHorizontalpodautoscaler(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const horizontalPodAutoscalers = await k8sApiCore.listNamespacedHorizontalPodAutoscaler(namespace);
//         //return horizontalPodAutoscalers;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get verticalpodautoscaler
// async function collectVerticalpodautoscaler(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const verticalPodAutoscalers = await k8sApiCore.listNamespacedVerticalPodAutoscaler(namespace);
//         //return verticalPodAutoscalers;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get priorityclass
// async function collectPriorityclass(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const priorityClasses = await k8sApiCore.listPriorityClass();
//         //return priorityClasses;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get customresourcedefinition
// async function collectCustomresourcedefinition(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const customResourceDefinitions = await k8sApiCore.listCustomResourceDefinition();
//         //return customResourceDefinitions;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get poddisruptionbudget
// async function collectPoddisruptionbudget(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const podDisruptionBudgets = await k8sApiCore.listNamespacedPodDisruptionBudget(namespace);
//         //return podDisruptionBudgets;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectEvent(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const events = await k8sApiCore.listNamespacedEvent(namespace);
//         return events;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectEndpoint(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const endpoints = await k8sApiCore.listNamespacedEndpoint(namespace);
//         return endpoints;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectNode(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const nodes = await k8sApiCore.listNode();
//         return nodes;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectPodtemplate(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const podTemplates = await k8sApiCore.listNamespacedPodTemplate(namespace);
//         return podTemplates;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectMutatingwebhookconfiguration(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const mutatingWebhookConfigurations = await k8sApiCore.listMutatingWebhookConfiguration();
//         return mutatingWebhookConfigurations;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get validatingwebhookconfiguration
// async function collectValidatingwebhookconfiguration(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const validatingWebhookConfigurations = await k8sApiCore.listValidatingWebhookConfiguration();
//         //return validatingWebhookConfigurations;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectApiservice(k8sApiregistrationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const apiServices = await k8sApiregistrationV1Api.listAPIService();
//         return apiServices;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get controllerrevision
// async function collectControllerrevision(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const controllerRevisions = await k8sApiCore.listNamespacedControllerRevision(namespace);
//         //return controllerRevisions;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectLease(k8CoordinationV1Api: any, namespace: string): Promise<any> {
//     try {
//         const leases = await k8CoordinationV1Api.listNamespacedLease(namespace);
//         return leases;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get certificate
// async function collectCertificate(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         const certificates = await k8sApiCore.listNamespacedCertificate(namespace);
//         return certificates;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }

// async function collectCertificateSigningRequest(k8scertificatesV1Api: any, namespace: string): Promise<any> {
//     try {
//         const certificateSigningRequests = await k8scertificatesV1Api.listCertificateSigningRequest();
//         return certificateSigningRequests;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }
// //todo: find a way to get componentstatus
// async function collectComponentstatus(k8sApiCore: any, namespace: string): Promise<any> {
//     try {
//         //const componentStatuses = await k8sApiCore.listComponentStatus();
//         //return componentStatuses;
//     } catch (e) {
//         logger.debug(e);
//         return null;
//     }
// }