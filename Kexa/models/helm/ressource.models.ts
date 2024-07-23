export interface HelmResources {
    chart: Array<any> | null;
}

export function createHelmResourcesDefault(): HelmResources {
    return {
        chart: []
    };
}