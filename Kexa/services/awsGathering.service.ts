import * as AWS from "aws-sdk";
import { EC2Client, DescribeRegionsCommand } from "@aws-sdk/client-ec2";
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
//// LISTING CLOUD RESOURCES ///////////////////////////////////////////////////////////////////////////
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
            //   "ecrImage": null
            // Add more AWS resource
        } as AWSResources;
        try {
            const credentials = new AWS.Credentials({
                accessKeyId: await getConfigOrEnvVar(config, "AWS_ACCESS_KEY_ID", awsConfig.indexOf(config) + "-"),
                secretAccessKey: await getConfigOrEnvVar(config, "AWS_SECRET_ACCESS_KEY", awsConfig.indexOf(config) + "-")
            });
            const client = new EC2Client({region: "us-east-1", credentials: credentials});
            const command = new DescribeRegionsCommand({AllRegions: false,});
            const response = await client.send(command);
            if (response.Regions) {
                const promises = response.Regions.map(async (region) => {
                    try {
                        logger.info("Retrieving AWS Region : " + region.RegionName);
                        AWS.config.update({credentials: credentials, region: region.RegionName});
                        ec2Client = new AWS.EC2(config);
                        rdsClient = new AWS.RDS(config);
                        //    s3Client = new AWS.S3(config);
                        ecsClient = new AWS.ECS(config);
                        ecrClient = new AWS.ECR(config);
                        const resourceGroups = new AWS.ResourceGroups(config);
                        const tags = new AWS.ResourceGroupsTaggingAPI(config);

                        const ec2InstancesPromise = ec2InstancesListing(ec2Client, region.RegionName as string);
                        const ec2VolumesPromise = ec2VolumesListing(ec2Client, region.RegionName as string);
                        const ec2SGPromise = ec2SGListing(ec2Client, region.RegionName as string);
                        const rdsListPromise = rdsInstancesListing(rdsClient, region.RegionName as string);
                        const resourceGroupPromise = resourceGroupsListing(resourceGroups, region.RegionName as string);
                        const tagsValuePromise = tagsValueListing(tags, region.RegionName as string);
                        const ecsClusterPromise = ecsClusterListing(ecsClient, region.RegionName as string);

                        const [ec2Instances, ec2Volumes, ec2SG, rdsList, resourceGroup, tagsValue, ecsCluster] =
                            await Promise.all([ec2InstancesPromise, ec2VolumesPromise, ec2SGPromise, rdsListPromise, resourceGroupPromise, tagsValuePromise, ecsClusterPromise]);
                        return {
                            ec2Instance: ec2Instances,
                            ec2SG: ec2SG,
                            ec2Volume: ec2Volumes,
                            rds: rdsList,
                            resourceGroup: resourceGroup,
                            tagsValue: tagsValue,
                            ecsCluster: ecsCluster
                        };
                    } catch (e) {
                        logger.error("error in collectAWSData with AWS_ACCESS_KEY_ID: " + config["AWS_ACCESS_KEY_ID"] ?? null);
                        logger.error(e);
                    }
                });
                const awsResourcesPerRegion = await Promise.all(promises);
                const awsResource: { [key: string]: any[] } = {};
                awsResourcesPerRegion.forEach((regionResources) => {
                    if (regionResources) {
                        Object.keys(regionResources).forEach((resourceType) => {
                            const key = resourceType.toString();
                            const regionKey = resourceType.toString();
                            awsResource[key] = [...(awsResource[key] || []), ...regionResources[regionKey as keyof typeof regionResources]];
                        //    console.log("KEY : " + key);
                      //      console.log(awsResource.ec2Volume);
                        });
                    }
                });
                logger.info("- Listing AWS resources done -");
                resources.push(awsResource as any);
            }
        } catch (e) {
            logger.error("error in AWS connect with AWS_ACCESS_KEY_ID: " + config["AWS_ACCESS_KEY_ID"] ?? null);
            logger.error(e);
        }
    }
    return resources ?? null;
}

export async function ec2SGListing(client: AWS.EC2, region: string): Promise<any> {
    try {
        const data = await client.describeSecurityGroups().promise();
        const jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        logger.info(region + " - ec2SGListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2SGListing: ", err);
        return null;
    }
}
export async function ec2VolumesListing(client: AWS.EC2, region: string): Promise<any> {
    try {
        const data = await client.describeVolumes().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Volumes));
        logger.info(region, " - ec2VolumesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2VolumesListing: ", err);
        return null;
    }
}
export async function ec2InstancesListing(client: AWS.EC2, region: string): Promise<Array<AWS.EC2.Instance> | null> {
    try {
        const data = await client.describeInstances().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Reservations));
        logger.info(region + " - ec2InstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2InstancesListing: ", err);
        return null;
    }
}

export async function rdsInstancesListing(client: AWS.RDS, region: string): Promise<any> {
    try {
        const data = await client.describeDBInstances().promise();
        const jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        logger.info(region + " - rdsInstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in rdsInstancesListing: ", err);
        return null;
    }
}

export async function resourceGroupsListing(client: AWS.ResourceGroups, region: string): Promise<any> {
    try {
        const data = await client.listGroups().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Groups));
        logger.info(region + " - Ressource Group Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in Ressource Group Listing: ", err);
        return null;
    }
}

export async function tagsValueListing(client: AWS.ResourceGroupsTaggingAPI, region: string): Promise<any> {
    try {
        interface TagParams {Key: string;}
        const dataKeys = await client.getTagKeys().promise();
        const jsonDataKeys = JSON.parse(JSON.stringify(dataKeys.TagKeys));
        let jsonData: any[] = [];
        for (const element of jsonDataKeys) {
            const newData = { name: element};
            jsonData.push(newData);
        }
        logger.info(region + " - Tags Done");
        return jsonDataKeys;
    } catch (err) {
        logger.error("Error in Tags Value Listing: ", err);
        return null;
    }
}

export async function s3BucketsListing(client: AWS.S3, region: string): Promise<Array<AWS.S3> | null> {
    try {
        const data = await client.listBuckets().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Buckets));
        logger.info(region + " - s3BucketsListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in s3BucketsListing: ", err);
        return null;
    }
}

export async function ecsClusterListing(client: AWS.ECS, region: string): Promise<any> {
    try {
        const data = await client.describeClusters().promise();
        const jsonData = JSON.parse(JSON.stringify(data.clusters));
        logger.info(region + " - ECS Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECS Listing: ", err);
        return null;
    }
}

export async function ecrImagesListing(client: AWS.ECR, region: string): Promise<any> {
    try {
        const data = await client.describeRepositories().promise();
        const jsonData = JSON.parse(JSON.stringify(data.repositories));
        logger.info(region + " - ECR Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECR Listing: ", err);
        return null;
    }
}