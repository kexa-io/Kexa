export interface SnowflakeResources {
    account: Array<any>;
    "catalog-integration": Array<any>;
    "compute-pool": Array<any>;
    database: Array<any>;
    "database-role": Array<any>;
    "dynamic-table": Array<any>;
    "event-table": Array<any>;
    "external-volume": Array<any>;
    "function": Array<any>;
    "image-repository": Array<any>;
    "managed-account": Array<any>;
    "network-policy": Array<any>;
    notebook: Array<any>;
    "notification-integration": Array<any>;
    pipe: Array<any>;
    procedure: Array<any>;
    role: Array<any>;
    schema: Array<any>;
    service: Array<any>;
    stage: Array<any>;
    stream: Array<any>;
    table: Array<any>;
    task: Array<any>;
    "user-defined-function": Array<any>;
    view: Array<any>;
    warehouse: Array<any>;
}

export function createSnowflakeResourcesDefault(): SnowflakeResources {
    return {
        "account": [],
        "catalog-integration": [],
        "compute-pool": [],
        "database": [],
        "database-role": [],
        "dynamic-table": [],
        "event-table": [],
        "external-volume": [],
        "function": [],
        "image-repository": [],
        "managed-account": [],
        "network-policy": [],
        "notebook": [],
        "notification-integration": [],
        "pipe": [],
        "procedure": [],
        "role": [],
        "schema": [],
        "service": [],
        "stage": [],
        "stream": [],
        "table": [],
        "task": [],
        "user-defined-function": [],
        "view": [],
        "warehouse": [],
    };
}