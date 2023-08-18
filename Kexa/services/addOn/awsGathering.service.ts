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
let ec2Client: EC2;
let rdsClient: RDS;
let s3Client: S3;
let ecsClient: ECS;
let ecrClient: ECR;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES ///////////////////////////////////////////////////////////////////////////
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
                accessKeyId: await getConfigOrEnvVar(oneConfig, "AWS_ACCESS_KEY_ID", awsConfig.indexOf(oneConfig) + "-"),
                secretAccessKey: await getConfigOrEnvVar(oneConfig, "AWS_SECRET_ACCESS_KEY", awsConfig.indexOf(oneConfig) + "-")
            });
            const client = new EC2Client({region: "us-east-1", credentials: credentials});
            const command = new DescribeRegionsCommand({AllRegions: false,});
            const response = await client.send(command);
            if (response.Regions) {
                const promises = response.Regions.map(async (region) => {
                    try {
                        logger.info("Retrieving AWS Region : " + region.RegionName);
                        config.update({credentials: credentials, region: region.RegionName});
                        ec2Client = new EC2();
                        rdsClient = new RDS();
                        //    s3Client = new AWS.S3(config);
                        ecsClient = new ECS(oneConfig);
                        ecrClient = new ECR(oneConfig);
                        const resourceGroups = new ResourceGroups(oneConfig);
                        const tags = new ResourceGroupsTaggingAPI(oneConfig);

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
                            ec2SG,
                            ec2Volume: ec2Volumes,
                            rds: rdsList,
                            resourceGroup,
                            tagsValue,
                            ecsCluster
                        };
                    } catch (e) {
                        logger.error("error in collectAWSData with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
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
                        });
                    }
                });
                logger.info("- Listing AWS resources done -");
                resources.push(awsResource as any);
            }
        } catch (e) {
            logger.error("error in AWS connect with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
            logger.error(e);
        }
    }
    return resources ?? null;
}

function addRegion(resources:any, region:string) {
    for (let resource of resources) {
        resource.region = region;
    }
    return resources;
}

async function ec2SGListing(client: EC2, region: string): Promise<any> {
    try {
        const data = await client.describeSecurityGroups().promise();
        let jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - ec2SGListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2SGListing: ", err);
        return null;
    }
}

async function ec2VolumesListing(client: EC2, region: string): Promise<any> {
    try {
        const data = await client.describeVolumes().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Volumes));
        jsonData = addRegion(jsonData, region);
        logger.info(region, " - ec2VolumesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2VolumesListing: ", err);
        return null;
    }
}

async function ec2InstancesListing(client: EC2, region: string): Promise<Array<EC2.Instance> | null> {
    try {
        const data = await client.describeInstances().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Reservations));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - ec2InstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2InstancesListing: ", err);
        return null;
    }
}

async function rdsInstancesListing(client: RDS, region: string): Promise<any> {
    try {
        const data = await client.describeDBInstances().promise();
        let jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - rdsInstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in rdsInstancesListing: ", err);
        return null;
    }
}

async function resourceGroupsListing(client: ResourceGroups, region: string): Promise<any> {
    try {
        const data = await client.listGroups().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Groups));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - Ressource Group Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in Ressource Group Listing: ", err);
        return null;
    }
}

async function tagsValueListing(client: ResourceGroupsTaggingAPI, region: string): Promise<any> {
    try {
        interface TagParams {Key: string;}
        const dataKeys = await client.getTagKeys().promise();
        const jsonDataKeys = JSON.parse(JSON.stringify(dataKeys.TagKeys));
        let jsonData: any[] = [];
        for (const element of jsonDataKeys) {
            const newData = { 
                Value: element,
                Region: region,
            };
            jsonData.push(newData);
        }
        logger.info(region + " - Tags Done");
        return jsonDataKeys;
    } catch (err) {
        logger.error("Error in Tags Value Listing: ", err);
        return null;
    }
}

async function s3BucketsListing(client: S3, region: string): Promise<Array<S3> | null> {
    try {
        const data = await client.listBuckets().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Buckets));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - s3BucketsListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in s3BucketsListing: ", err);
        return null;
    }
}

async function ecsClusterListing(client: ECS, region: string): Promise<any> {
    try {
        const data = await client.describeClusters().promise();
        let jsonData = JSON.parse(JSON.stringify(data.clusters));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - ECS Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECS Listing: ", err);
        return null;
    }
}

async function ecrImagesListing(client: ECR, region: string): Promise<any> {
    try {
        const data = await client.describeRepositories().promise();
        let jsonData = JSON.parse(JSON.stringify(data.repositories));
        jsonData = addRegion(jsonData, region);
        logger.info(region + " - ECR Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ECR Listing: ", err);
        return null;
    }
}