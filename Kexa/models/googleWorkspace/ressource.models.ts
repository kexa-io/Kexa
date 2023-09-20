import {googleWorkspaceConfig} from "./config.models";

export interface googleWorkspaceResources {
    user: Array<any> | null;
    domain: Array<any> | null;
    group: Array<any> | null;

    role: Array<any> | null;

    orgaunit: Array<any> | null;
    calendar: Array<any> | null;
    test: Array<any> | null;
}