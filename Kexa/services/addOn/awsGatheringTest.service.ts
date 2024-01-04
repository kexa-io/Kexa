/*
    * Provider : aws
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png
    * Documentation : https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
	*	- KexaAzure.vm
	*	- KexaAzure.mlWorkspaces
	*	- KexaAzure.mlJobs
	*	- KexaAzure.mlComputes
	*	- KexaAzure.mlSchedules
	*	- KexaAzure.storage
	*	- KexaAzure.blob
*/

import { AWSResources } from "../../models/aws/ressource.models";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { DescribeRegionsCommand } from "@aws-sdk/client-ec2";
import { AwsConfig } from "../../models/aws/config.models";

import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { EC2Client, DescribeVolumesCommand, DescribeSecurityGroupsCommand, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { RDSClient, DescribeDBInstancesCommand } from "@aws-sdk/client-rds";
import { ECSClient, DescribeClustersCommand } from "@aws-sdk/client-ecs";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { ECRClient, DescribeRepositoriesCommand } from "@aws-sdk/client-ecr";
import { ResourceGroupsClient, ListGroupsCommand } from "@aws-sdk/client-resource-groups";
import { ResourceGroupsTaggingAPIClient, GetTagKeysCommand } from "@aws-sdk/client-resource-groups-tagging-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////

import { getContext, getNewLogger } from "../logger.service";
const logger = getNewLogger("AWSLogger");

let currentConfig: AwsConfig;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(awsConfig: AwsConfig[]): Promise<AWSResources[] | null> {
    let context = getContext();
    let resources = new Array<AWSResources>();
    for (let oneConfig of awsConfig ?? []) {
        currentConfig = oneConfig;
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
        let prefix = oneConfig["prefix"]??( awsConfig.indexOf(oneConfig).toString())
        try {
            let awsKeyId = await getConfigOrEnvVar(oneConfig, "AWS_ACCESS_KEY_ID", prefix);
            let awsSecretKey = await getConfigOrEnvVar(oneConfig, "AWS_SECRET_ACCESS_KEY", prefix);
            if (awsKeyId)
                setEnvVar("AWS_ACCESS_KEY_ID", awsKeyId);
            else
                logger.warn(prefix + "AWS_ACCESS_KEY_ID not found");
            if (awsSecretKey)
                setEnvVar("AWS_SECRET_ACCESS_KEY", awsSecretKey);
            else
                logger.warn(prefix + "AWS_SECRET_ACCESS_KEY not found");

            const credentialProvider = fromNodeProviderChain();

            const client = new EC2Client({region: "us-east-1", credentials: credentialProvider});
            const clientRds = new RDSClient({region: "us-east-1", credentials: credentialProvider});
            const clientEcs = new ECSClient({region: "us-east-1", credentials: credentialProvider});
            const clientS3 = new S3Client({region: "us-east-1", credentials: credentialProvider});
            const clientEcr = new ECRClient({region: "us-east-1", credentials: credentialProvider});
            const clientRg = new ResourceGroupsClient({region: "us-east-1", credentials: credentialProvider});
            const clientRgTags = new ResourceGroupsTaggingAPIClient({region: "us-east-1", credentials: credentialProvider});

            const command = new DescribeRegionsCommand({AllRegions: false});
            const response = await client.send(command);
            let gatherAll = false;
            let userRegions = new Array<string>();
            let skip = false;
            if ('regions' in oneConfig) {
                userRegions = oneConfig.regions as Array<string>;
                if (userRegions.length > 0) {
                    userRegions.forEach((userRegion: any) => {
                        let check = false;
                        response.Regions?.forEach((regionObj: any) => {
                            if (userRegion == regionObj.RegionName)
                                check = true;
                        })
                        if (!check) {
                            logger.error("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " Skipped - Regions '" + userRegion + "' is not a valid AWS region.");
                            skip = true;
                        }
                    })
                }
                else
                    gatherAll = true;
            }
            else {
                gatherAll = true;
                context?.log("AWS - No Regions found, gathering all regions...");
                logger.info("AWS - No Regions found, gathering all regions...");
            }
            if (skip)
                continue;
            else if (!gatherAll){
                context?.log("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
                logger.info("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
            }
            if (response.Regions) {
                const promises = response.Regions.map(async (region) => {
                    try {
                        if (!gatherAll) {
                            if (!(userRegions.includes(region.RegionName as string)))
                                return;
                        }
                        context?.log("Retrieving AWS Region : " + region.RegionName);
                        logger.info("Retrieving AWS Region : " + region.RegionName);
                        const ec2InstancesPromise = ec2InstancesListing(client, region.RegionName as string);
                        const ec2VolumesPromise = ec2VolumesListing(client, region.RegionName as string);
                        const ec2SGPromise = ec2SGListing(client, region.RegionName as string);
                        const rdsListPromise = rdsInstancesListing(clientRds, region.RegionName as string);
                        const resourceGroupPromise = resourceGroupsListing(clientRg, region.RegionName as string);
                        const tagsValuePromise = tagsValueListing(clientRgTags, region.RegionName as string);
                        const ecsClusterPromise = ecsClusterListing(clientEcs, region.RegionName as string);

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
                        logger.error("error in collectAWSData with AWS_ACCESS_KEY_ID: " + oneConfig["AWS_ACCESS_KEY_ID"] ?? null);
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
                context?.log("- Listing AWS resources done -");
                logger.info("- Listing AWS resources done -");
                resources.push(awsResource as any);
            }
        } catch (e) {
            context?.log("error in AWS connect with AWS_ACCESS_KEY_ID: " + oneConfig["AWS_ACCESS_KEY_ID"] ?? null);
            logger.error("error in AWS connect with AWS_ACCESS_KEY_ID: " + oneConfig["AWS_ACCESS_KEY_ID"] ?? null);
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

async function ec2SGListing(client: EC2Client, region: string): Promise<any> {
   // if(!currentConfig.ObjectNameNeed?.includes("ec2SG")) return null;
    try {
        const input = {};
        const command = new DescribeSecurityGroupsCommand(input);
        const data = await client.send(command);

        let jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ec2SGListing Done");
        console.log(jsonData);
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in ec2SGListing: ", err);
        return null;
    }
}

async function ec2VolumesListing(client: EC2Client, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("ec2Volume")) return null;
    try {
        const input = {};
        const data = await client.send(new DescribeVolumesCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.Volumes));
        jsonData = addRegion(jsonData, region);
        logger.debug(region, " - ec2VolumesListing Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in ec2VolumesListing: ", err);
        return null;
    }
}

async function ec2InstancesListing(client: EC2Client, region: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("ec2Instance")) return null;
    try {
        const input = {};
        const data = await client.send(new DescribeInstancesCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.Reservations));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ec2InstancesListing Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in ec2InstancesListing: ", err);
        return null;
    }
}

async function rdsInstancesListing(client: RDSClient, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("rds")) return null;
    try {
        const input = {};
        const data = await client.send(new DescribeDBInstancesCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - rdsInstancesListing Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in rdsInstancesListing: ", err);
        return null;
    }
}

async function resourceGroupsListing(client: ResourceGroupsClient, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("resourceGroup")) return null;
    try {
        const input = {};
        const data = await client.send(new ListGroupsCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.Groups));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - Ressource Group Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in Ressource Group Listing: ", err);
        return null;
    }
}

async function tagsValueListing(client: ResourceGroupsTaggingAPIClient, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("tagsValue")) return null;
    try {
        const input = {};
        const dataKeys = await client.send(new GetTagKeysCommand(input));
        const jsonDataKeys = JSON.parse(JSON.stringify(dataKeys.TagKeys));
        let jsonData: any[] = [];
        for (const element of jsonDataKeys) {
            const newData = { 
                Value: element,
                Region: region,
            };
            jsonData.push(newData);
        }
        logger.debug(region + " - Tags Done");
        return jsonDataKeys ?? null;
    } catch (err) {
        logger.debug("Error in Tags Value Listing: ", err);
        return null;
    }
}

async function s3BucketsListing(client: S3Client, region: string): Promise<Array<any> | null> {
    if(!currentConfig.ObjectNameNeed?.includes("s3")) return null;
    try {
        const input = {};
        const data = await client.send(new ListBucketsCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.Buckets));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - s3BucketsListing Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in s3BucketsListing: ", err);
        return null;
    }
}

async function ecsClusterListing(client: ECSClient, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("ecsCluster")) return null;
    try {
        const input = {};
        const data = await client.send(new DescribeClustersCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.clusters));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ECS Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in ECS Listing: ", err);
        return null;
    }
}

async function ecrImagesListing(client: ECRClient, region: string): Promise<any> {
    if(!currentConfig.ObjectNameNeed?.includes("ecrRepository")) return null;
    try {
        const input = {};
        const data = await client.send(new DescribeRepositoriesCommand(input));
        let jsonData = JSON.parse(JSON.stringify(data.repositories));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ECR Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in ECR Listing: ", err);
        return null;
    }
}