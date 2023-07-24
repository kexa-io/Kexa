export interface KubernetesResources {
    namespaces: Array<any>|null;
    pods: Array<any>|null;
    helm: Array<any>|null;
}