export interface MongoDbResources {
    databases: Array<any>|null;
    users: Array<any>|null;
    serverStatus: Array<any>|null;
    currentOp: Array<any>|null;
}