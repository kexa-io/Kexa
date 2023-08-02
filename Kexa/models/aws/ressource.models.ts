import { EC2 } from "aws-sdk";
import { RDS } from "aws-sdk";
import * as AWS from "aws-sdk";


export interface AWSResources {
  /*  ec2: Array<EC2.Instance> | null;
    rds: Array<RDS.DBInstance> | null;
    s3: Array<S3.Bucket> | null;*/
    ec2Instance: Array<AWS.EC2.Instance> | null;
    ec2SG: Array<AWS.EC2.SecurityGroup> | null;
    ec2Volume: Array<AWS.EC2.Volume> | null;
    rds: Array<AWS.RDS.DBInstance> | null;
    s3: Array<AWS.S3.Bucket> | null;

    resourceGroup: Array<AWS.ResourceGroups> | null;
    tagsKeys: Array<AWS.ResourceGroupsTaggingAPI> | null;
    ecsCluster: Array<AWS.ECS> | null;
    ecrImage: Array<AWS.ECR> | null;
}