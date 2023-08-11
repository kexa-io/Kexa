import * as AWS from "aws-sdk";
import { Logger } from "tslog";
import { AWSResources } from "../models/aws/ressource.models";
import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "./manageVarEnvironnement.service";

////////////////////////////////////////////////////////////////////////////////////////////////////////
const debug_mode = Number(process.env.DEBUG_MODE) ?? 3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AWSLogger" });
const config = require('config');
const awsConfig = (config.has('aws'))?config.get('aws'):null;
let ec2Client: AWS.EC2;
let rdsClient: AWS.RDS;
let s3Client: AWS.S3;
let ecsClient: AWS.ECS;
let ecrClient: AWS.ECR;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectAWSData(): Promise<AWSResources[] | null> {
    let resources = new Array<AWSResources>();
    for (let config of awsConfig ?? []) {
        let awsResource = {
            "ec2Instance": null,
            "ec2SG": null,
            "ec2Volume": null,
            "rds": null,
      //      "s3": null,
            "resourceGroup": null,
            "tagsValue": null,
            "ecsCluster": null,
            "ecrRepository": null,
            // Add more AWS resource
        } as AWSResources;
        try {
            const credentials = new AWS.Credentials({
                accessKeyId: await getConfigOrEnvVar(config, "AWSACCESSKEYID", awsConfig.indexOf(config) + "-"),
                secretAccessKey: await getConfigOrEnvVar(config, "AWSSECRETACCESSKEY", awsConfig.indexOf(config) + "-"),
            });
            AWS.config.update({ credentials: credentials, region: "us-east-1" });
            ec2Client = new AWS.EC2(config);
            rdsClient = new AWS.RDS(config);
        //    s3Client = new AWS.S3(config);
            ecsClient = new AWS.ECS(config);
            ecrClient = new AWS.ECR(config);
            const resourceGroups = new AWS.ResourceGroups(config);
            const tags = new AWS.ResourceGroupsTaggingAPI(config);
            const promises = [
                await ec2InstancesListing(ec2Client),
                await ec2VolumesListing(ec2Client),
                await ec2SGListing(ec2Client),
                await rdsInstancesListing(rdsClient),
                //await s3BucketsListing(s3Client),
                await resourceGroupsListing(resourceGroups),
                await tagsValueListing(tags),
                await ecsClusterListing(ecsClient),
                await ecrRepositoryListing(ecrClient),
                // Add more AWS resource lists
            ];
            //
            const [ec2Instances, ec2Volumes, ec2SG, rdsList,/* s3List,*/ resourceGroup,
                tagsValue, ecsCluster, ecrRepository] = await Promise.all(promises);
            awsResource = {
                "ec2Instance": [...awsResource["ec2Instance"] ?? [], ...ec2Instances],
                "ec2SG": [...awsResource["ec2SG"] ?? [], ...ec2SG],
                "ec2Volume": [...awsResource["ec2Volume"] ?? [], ...ec2Volumes],
                "rds": [...awsResource["rds"] ?? [], ...rdsList],
              //  "s3": [...awsResource["s3"] ?? [], ...s3List],
                "resourceGroup": [...awsResource["resourceGroup"] ?? [], ...resourceGroup],
                "tagsValue": [...awsResource["tagsValue"] ?? [], ...tagsValue],
                "ecsCluster": [...awsResource["ecsCluster"] ?? [], ...ecsCluster],
                "ecrRepository": [...awsResource["ecrRepository"] ?? [], ...ecrRepository]
            } as AWSResources;
            logger.info("- listing cloud resources done -");

        } catch (e) {
            logger.error("error in collectAWSData with AWSACCESSKEYID: " + config["AWSACCESSKEYID"] ?? null);
            logger.error(e);
        }
        resources.push(awsResource);
    }
    return resources ?? null;
}

export async function ec2SGListing(client: AWS.EC2): Promise<any> {
    try {
        const data = await client.describeSecurityGroups().promise();
        const jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        logger.info("ec2SGListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2SGListing: ", err);
        return null;
    }
}
export async function ec2VolumesListing(client: AWS.EC2): Promise<any> {
    try {
        const data = await client.describeVolumes().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Volumes));
        logger.info("ec2VolumesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2VolumesListing: ", err);
        return null;
    }
}
export async function ec2InstancesListing(client: AWS.EC2): Promise<Array<AWS.EC2.Instance> | null> {
    try {
        const data = await client.describeInstances().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Reservations));
        logger.info("ec2InstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2InstancesListing: ", err);
        return null;
    }
}

export async function rdsInstancesListing(client: AWS.RDS): Promise<any> {
    try {
        const data = await client.describeDBInstances().promise();
        const jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        logger.info("rdsInstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in rdsInstancesListing: ", err);
        return null;
    }
}

export async function resourceGroupsListing(client: AWS.ResourceGroups): Promise<any> {
    try {
        const data = await client.listGroups().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Groups));
        logger.info("Ressource Group Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in Ressource Group Listing: ", err);
        return null;
    }
}

export async function tagsValueListing(client: AWS.ResourceGroupsTaggingAPI): Promise<any> {
    try {
        interface TagParams {Key: string;}
        const dataKeys = await client.getTagKeys().promise();
        const jsonDataKeys = JSON.parse(JSON.stringify(dataKeys.TagKeys));
        let jsonData: any[] = [];
        for (const element of jsonDataKeys) {
            const newData = { name: element};
            jsonData.push(newData);
        }
        logger.info("Tags Done");
        return jsonDataKeys;
    } catch (err) {
        logger.error("Error in Tags Value Listing: ", err);
        return null;
    }
}

export async function s3BucketsListing(client: AWS.S3): Promise<Array<AWS.S3> | null> {
    try {
        const data = await client.listBuckets().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Buckets));
        logger.info("s3BucketsListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in s3BucketsListing: ", err);
        return null;
    }
}

export async function ecsClusterListing(client: AWS.ECS): Promise<any> {
    try {
        const data = await client.describeClusters().promise();
        const jsonData = JSON.parse(JSON.stringify(data.clusters));
        logger.info("ECS Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECS Listing: ", err);
        return null;
    }
}

export async function ecrRepositoryListing(client: AWS.ECR): Promise<any> {
    try {
        const data = await client.describeRepositories().promise();
        const jsonData = JSON.parse(JSON.stringify(data.repositories));
        logger.info("ECR Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECR Listing: ", err);
        return null;
    }
}