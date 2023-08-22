import { Storage } from '@google-cloud/storage';
import  Compute from '@google-cloud/compute';
import { CloudTasksClient } from '@google-cloud/tasks';

export interface GCPResources {
    task: Array<typeof Compute> | null;
    bucket: Array<Storage> | null;
    compute: Array<CloudTasksClient> | null;
    project: Array<any> | null;
     billingAccount: Array<any> | null;
    cluster: Array<any> | null;
    workflow: Array<any> | null;
    websecurity: Array<any> | null;
    connector: Array<any> | null;
    vmware_engine: Array<any> | null;
    namespace: Array<any> | null;

    secret: Array<any> | null;

    connectivity_test: Array<any> | null;
    resource_settings: Array<any> | null;
    redis_instance: Array<any> | null;
    os_config: Array<any> | null;
    org_policy_contraint: Array<any> | null;
    airflow_image_version: Array<any> | null;
    notebook: Array<any> | null;

    lineage_process: Array<any> | null;
    dashboard: Array<any> | null;
    identity_domain: Array<any> | null;
    kms_crypto_key: Array<any> | null;
    kms_key_ring: Array<any> | null;

    domain_registration: Array<any> | null;
    dns_zone: Array<any> | null;
    pipeline: Array<any> | null;
    certificate: Array<any> | null;
    batch_job: Array<any> | null;
    workload: Array<any> | null;
    artifact_repository: Array<any> | null;
    app_gateway: Array<any> | null;
}