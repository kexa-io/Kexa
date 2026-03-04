export interface MongoDbResources {
    databases: Array<any>|null;
    users: Array<any>|null;
    serverStatus: Array<any>|null;
    currentOp: Array<any>|null;
    cmdLineOpts: Array<any>|null;
    parameters: Array<any>|null;
}