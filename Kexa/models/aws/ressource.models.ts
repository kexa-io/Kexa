import { EC2 } from "aws-sdk";
import { RDS } from "aws-sdk";
import * as AWS from "aws-sdk";
import {tagsValueListing} from "../../services/awsGathering.service";


export interface AWSResources {
    ec2Instance: Array<AWS.EC2.Instance> | null;
    ec2SG: Array<AWS.EC2.SecurityGroup> | null;
    ec2Volume: Array<AWS.EC2.Volume> | null;
    rds: Array<AWS.RDS.DBInstance> | null;
 //   s3: Array<AWS.S3.Bucket> | null;

    resourceGroup: Array<AWS.ResourceGroups> | null;
    tagsValue: Array<AWS.ResourceGroupsTaggingAPI.TagValue> | null;
    ecsCluster: Array<AWS.ECS> | null;
    ecrImage: Array<AWS.ECR> | null;
}