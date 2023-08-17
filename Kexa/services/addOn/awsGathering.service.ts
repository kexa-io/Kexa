/*
    * Provider : aws
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - ec2Instance
    *     - ec2SG
    *     - ec2Volume
    *     - rds
    *     - resourceGroup
    *     - tagsValue
    *     - ecsCluster
    *     - ecrRepository
*/

import { Credentials, EC2, RDS, S3, ECS, ECR, ResourceGroups, ResourceGroupsTaggingAPI, config } from "aws-sdk";
import { Logger } from "tslog";
import { AWSResources } from "../../models/aws/ressource.models";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { EC2Client, DescribeRegionsCommand } from "@aws-sdk/client-ec2";
import { AwsConfig } from "../../models/aws/config.models";

////////////////////////////////////////////////////////////////////////////////////////////////////////
const debug_mode = Number(process.env.DEBUG_MODE) ?? 3;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "AWSLogger" });
const configuration = require('config');
//const awsConfig = (configuration.has('aws'))?configuration.get('aws'):null;
let ec2Client: EC2;
let rdsClient: RDS;
let s3Client: S3;
let ecsClient: ECS;
let ecrClient: ECR;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(awsConfig: AwsConfig[]): Promise<AWSResources[] | null> {
    let resources = new Array<AWSResources>();
    for (let oneConfig of awsConfig ?? []) {
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
            const credentials = new Credentials({
                accessKeyId: await getConfigOrEnvVar(oneConfig, "AWSACCESSKEYID", awsConfig.indexOf(oneConfig) + "-"),
                secretAccessKey: await getConfigOrEnvVar(oneConfig, "AWSSECRETACCESSKEY", awsConfig.indexOf(oneConfig) + "-"),
            });
            const client = new EC2Client(oneConfig);
            const command = new DescribeRegionsCommand({AllRegions: false,});
            const response = await client.send(command);
            if (response.Regions) {
                response.Regions.forEach(async (region: any) => {
                    try {
                        logger.info("Retrieving AWS Region : " + region.RegionName);
                        config.update({credentials: credentials, region: region.RegionName});
                        ec2Client = new EC2();
                        rdsClient = new RDS();
                        //    s3Client = new AWS.S3(config);
                        ecsClient = new ECS();
                        ecrClient = new ECR();
                        const resourceGroups = new ResourceGroups();
                        const tags = new ResourceGroupsTaggingAPI();
                        const promises = [
                            await ec2InstancesListing(ec2Client),
                            await ec2VolumesListing(ec2Client),
                            await ec2SGListing(ec2Client),
                            await rdsInstancesListing(rdsClient),
                            //await s3BucketsListing(s3Client),
                            await resourceGroupsListing(resourceGroups),
                            await tagsValueListing(tags),
                            await ecsClusterListing(ecsClient),
                           // await ecrImagesListing(ecrClient),
                            // Add more AWS resource lists
                        ];
                        //
                        const [ec2Instances, ec2Volumes, ec2SG, rdsList,/* s3List,*/ resourceGroup,
                            tagsValue, ecsCluster,/* ecrImage*/] = await Promise.all(promises);
                        awsResource = {
                            "ec2Instance": [...(awsResource["ec2Instance"] ?? []), ...ec2Instances],
                            "ec2SG": [...(awsResource["ec2SG"] ?? []), ...ec2SG],
                            "ec2Volume": [...(awsResource["ec2Volume"] ?? []), ...ec2Volumes],
                            "rds": [...(awsResource["rds"] ?? []), ...rdsList],
                            //  "s3": [...awsResource["s3"] ?? [], ...s3List],
                            "resourceGroup": [...(awsResource["resourceGroup"] ?? []), ...resourceGroup],
                            "tagsValue": [...(awsResource["tagsValue"] ?? []), ...tagsValue],
                            "ecsCluster": [...(awsResource["ecsCluster"] ?? []), ...ecsCluster],
                            //"ecrImage": [...(awsResource["ecrImage"] ?? []), ...ecrImage]
                        } as AWSResources;
                        logger.info("- listing AWS resources done -");
                    } catch (e) {
                        logger.error("error in collectAWSData with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
                        logger.error(e);
                    }
                });
            }
        } catch (e) {
            logger.error("error in AWS connect with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
            logger.error(e);
        }
        resources.push(awsResource);
    }
    return resources ?? null;
}

async function ec2SGListing(client: EC2): Promise<any> {
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

async function ec2VolumesListing(client: EC2): Promise<any> {
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

async function ec2InstancesListing(client: EC2): Promise<Array<EC2.Instance> | null> {
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

async function rdsInstancesListing(client: RDS): Promise<any> {
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

async function resourceGroupsListing(client: ResourceGroups): Promise<any> {
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

async function tagsValueListing(client: ResourceGroupsTaggingAPI): Promise<any> {
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

async function s3BucketsListing(client: S3): Promise<Array<S3> | null> {
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

async function ecsClusterListing(client: ECS): Promise<any> {
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

async function ecrRepositoryListing(client: ECR): Promise<any> {
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