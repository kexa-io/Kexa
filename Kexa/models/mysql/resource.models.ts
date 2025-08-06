export interface MySqlResources {
    databases: Array<any>|null;
    users: Array<any>|null;
    grants: Array<any>|null;
    variables: Array<any>|null;
    status: Array<any>|null;
    engines: Array<any>|null;
    processlist: Array<any>|null;
}