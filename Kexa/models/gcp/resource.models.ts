import { Storage } from '@google-cloud/storage';
import  Compute from '@google-cloud/compute';
import { CloudTasksClient } from '@google-cloud/tasks';

export interface GCPResources {
    task: Array<typeof Compute> | null;
    bucket: Array<Storage> | null;
    compute: Array<CloudTasksClient> | null;
   // project: Array<any> | null;
    // billingAccount: Array<any> | null;
  //  cluster: Array<any> | null;
    workstation: Array<any> | null;
    workflow: Array<any> | null;
    websecurity: Array<any> | null;
    connector: Array<any> | null;
    vmware_engine: Array<any> | null;
    storage_config: Array<any> | null;
    namespace: Array<any> | null;

    certificate: Array<any> | null;

    secret: Array<any> | null;

    connectivity_test: Array<any> | null;
    catalog: Array<any> | null;

}