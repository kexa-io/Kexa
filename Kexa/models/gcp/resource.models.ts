import { Storage } from '@google-cloud/storage';
import  Compute from '@google-cloud/compute';
import { CloudTasksClient } from '@google-cloud/tasks';

export interface GCPResources {
    storage: Array<Storage> | null;
    task: Array<typeof Compute> | null;

    compute: Array<CloudTasksClient> | null;
}