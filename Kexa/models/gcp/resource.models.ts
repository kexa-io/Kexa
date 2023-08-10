import { Storage } from '@google-cloud/storage';
import  Compute from '@google-cloud/compute';
import { CloudTasksClient } from '@google-cloud/tasks';

export interface GCPResources {
    task: Array<typeof Compute> | null;
    bucket: Array<Storage> | null;
    compute: Array<CloudTasksClient> | null;
}