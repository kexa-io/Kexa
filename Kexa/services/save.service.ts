import { BlobServiceClient } from '@azure/storage-blob';
import AWS from 'aws-sdk';
import { Storage } from '@google-cloud/storage';
import { ResultScan } from '../models/resultScan.models';
import {getContext, getNewLogger} from "./logger.service";
import { loadAddOnsCustomUtility } from './addOn.service';

const configuration = require('node-config-ts').config;
const logger = getNewLogger("SaveLogger");
const context = getContext();
const addOnSave: { [key: string]: Function; } = loadAddOnsCustomUtility("save", "save");

export async function saveResult(result: ResultScan[][]): Promise<void> {
    if(!configuration.save) return Promise.resolve();
    if(!Array.isArray(configuration.save)) configuration.save = [configuration.save];
    Promise.all(configuration.save.map(async (save: any) => {
        if(addOnSave[save.type]){
            try{
                await addOnSave[save.type](save, result);
            }catch(e:any){
                logger.error("Error in save " + save.type + " : " + e.message);
                context?.log("Error in save " + save.type + " : " + e.message);
                logger.debug(e);
            }
        }else{
            logger.warn('Unknown save type: ' + save.type);
            context?.log('Unknown save type: ' + save.type);
        }
    }));
}

async function saveJsonToAwsS3Bucket(bucketName: string, objectKey: string, json: object): Promise<void> {
    const s3 = new AWS.S3();
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: JSON.stringify(json)
    };
    await s3.putObject(params).promise();
}

async function saveJsonToGcpBucket(bucketName: string, objectKey: string, json: object): Promise<void> {
    await new Storage().bucket(bucketName).file(objectKey).save(JSON.stringify(json));
}

async function saveJsonToMongoDB(connectionString: string, databaseName: string, collectionName: string, json: object): Promise<void> {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    await collection.insertOne(json);
    await client.close();
}

async function saveJsonToPrometheus(prometheusUrl: string, prometheusPort: number, prometheusPath: string, json: object): Promise<void> {
    const axios = require('axios');
    const url = prometheusUrl + ':' + prometheusPort + prometheusPath;
    await axios.post(url, json);
}