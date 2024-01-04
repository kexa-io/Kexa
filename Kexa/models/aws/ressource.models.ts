
export interface AWSResources {
    ec2Instance: Array<any> | null;
    ec2SG: Array<any> | null;
    ec2Volume: Array<any> | null;
    rds: Array<any> | null;
 //   s3: Array<AWS.S3.Bucket> | null;

    resourceGroup: Array<any> | null;
    tagsValue: Array<any> | null;
    ecsCluster: Array<any> | null;
    ecrRepository: Array<any> | null;
}