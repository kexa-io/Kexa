export interface KubernetesResources {
    namespaces: Array<any>|null;
    pods: Array<any>|null;
    services: Array<any>|null;
    helm: Array<any>|null;
}