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
            "s3": null,
            // Add more AWS resource
        } as AWSResources;
        try {
            const credentials = new AWS.Credentials({
                accessKeyId: "AKIA2K3BXGKYDJ32GREF",
//                secretAccessKey: await getConfigOrEnvVar(config, "AWS_SECRET_ACCESS_KEY", awsConfig.indexOf(config) + "-"),
                secretAccessKey: "DIwvdrJVSLUpKBJAZyPukXcgVl3vWSbaGowu0i03"
            });
            AWS.config.update({ credentials: credentials, region: "us-east-1" });

            ec2Client = new AWS.EC2();
            rdsClient = new AWS.RDS();
            s3Client = new AWS.S3();
            const promises = [
                await ec2InstancesListing(ec2Client),
                await ec2VolumesListing(ec2Client),
                await ec2SGListing(ec2Client),
                await rdsInstancesListing(rdsClient),
                await s3BucketsListing(s3Client),
                // Add more AWS resource lists
            ];
            //
            const [ec2Instances, ec2Volumes, ec2SG, rdsList, s3List] = await Promise.all(promises);
            awsResource = {
                "ec2Instance": [...awsResource["ec2Instance"] ?? [], ...ec2Instances],
                "ec2SG": [...awsResource["ec2SG"] ?? [], ...ec2SG],
                "ec2Volume": [...awsResource["ec2Volume"] ?? [], ...ec2Volumes],
                "rds": [...awsResource["rds"] ?? [], ...rdsList],
                "s3": [...awsResource["s3"] ?? [], ...s3List],
            } as AWSResources;
            logger.info("- listing cloud resources done -");

        } catch (e) {
            logger.error("error in collectAWSData with AWS_ACCESS_KEY_ID: " + config["AWS_ACCESS_KEY_ID"] ?? null);
            logger.error(e);
        }
        resources.push(awsResource);
    }
    return resources ?? null;
}

export async function ec2SGListing(client: AWS.EC2): Promise<any> {
    logger.info("starting ec2SGListing");
    let params = {
    };
    try {
        const data = await client.describeSecurityGroups(params).promise();
        const jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        let i = 1;
        jsonData.forEach((element: any) => {
            console.log("Security Group " + i + " :");
            console.log(element);
            i++;
        });
        logger.info("ec2SGListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2SGListing: ", err);
        return null;
    }
}
export async function ec2VolumesListing(client: AWS.EC2): Promise<any> {
    logger.info("starting ec2VolumesListing");
    let params = {
    };
    try {
        const data = await client.describeVolumes(params).promise();
        const jsonData = JSON.parse(JSON.stringify(data.Volumes));
        let i = 1;
        jsonData.forEach((element: any) => {
            console.log("Volume " + i + " :");
            console.log(element);
            i++;
        });
        logger.info("ec2VolumesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2VolumesListing: ", err);
        return null;
    }
}
export async function ec2InstancesListing(client: AWS.EC2): Promise<Array<AWS.EC2.Instance> | null> {
    logger.info("starting ec2InstancesListing");
    const params = {};

    try {
        const data = await client.describeInstances(params).promise();
        const jsonData = JSON.parse(JSON.stringify(data.Reservations));
        let i = 1;
        jsonData.forEach((element: any) => {
            console.log("Instance " + i + " :");
            console.log(element);
            i++;
        });
        logger.info("ec2InstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in ec2InstancesListing: ", err);
        return null;
    }
}

export async function rdsInstancesListing(client: AWS.RDS): Promise<any> {
    logger.info("starting rdsInstancesListing");
    let params = {
    };
    try {
        const data = await client.describeDBInstances(params).promise();
        const jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        let i = 1;
        jsonData.forEach((element: any) => {
            console.log("RDS DB Instance " + i + " :");
            console.log(element);
            i++;
        });
        logger.info("rdsInstancesListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in rdsInstancesListing: ", err);
        return null;
    }
}

export async function s3BucketsListing(client: AWS.S3): Promise<Array<AWS.S3.Bucket> | null> {
    logger.info("starting s3BucketsListing");
    try {
        const data = await client.listBuckets().promise();
        const jsonData = JSON.parse(JSON.stringify(data.Buckets));
        let i = 1;
        jsonData.forEach((element: any) => {
            console.log("Bucket S3 " + i + " :");
            console.log(element);
            i++;
        });
        logger.info("s3BucketsListing Done");
        return jsonData;
    } catch (err) {
        logger.error("Error in s3BucketsListing: ", err);
        return null;
    }
}