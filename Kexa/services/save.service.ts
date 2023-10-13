import { BlobServiceClient } from '@azure/storage-blob';
import AWS from 'aws-sdk';
import { Storage } from '@google-cloud/storage';

async function saveJsonToAzureBlobStorage(connectionString: string, containerName: string, blobName: string, json: object): Promise<void> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const jsonString = JSON.stringify(json);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(jsonString, jsonString.length);
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