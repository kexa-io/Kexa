import { Rules } from "./rules.models";

export interface Capacity {
    [key: string]: CapacityProvider; 
}

export interface CapacityProvider {
    resources: string[];
    thumbnail: string;
    customName?: string;
    freeRules: Rules[];
}