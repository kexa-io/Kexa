import {googleWorkspaceConfig} from "./config.models";

export interface googleWorkspaceResources {
    user: Array<any> | null;
    domain: Array<any> | null;
    group: Array<any> | null;
}