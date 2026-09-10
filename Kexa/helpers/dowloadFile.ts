import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import fs from "fs";
import crypto from "crypto";
import { getNewLogger } from '../services/logger.service';
import path from 'path';
import { getEnvVar } from '../services/manageVarEnvironnement.service';

const logger = getNewLogger("DownloadLogger");

/** Compute the SHA-256 hex digest of a file, streamed (no full-file buffering). */
export async function computeSha256(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

/** Compare a file's SHA-256 against an expected digest (case-insensitive, whitespace-tolerant). */
export async function verifyFileSha256(filePath: string, expectedSha256: string): Promise<boolean> {
    const actual = await computeSha256(filePath);
    return actual.toLowerCase() === expectedSha256.trim().toLowerCase();
}

export async function downloadFile(url: string, destinationPath: string, type:string): Promise<void> {
    try {
        if(!await checkFileType(url)) throw new Error("File type not valid");
        let authorization = await getEnvVar("RULESAUTHORIZATION");
        let axiosConfig: AxiosRequestConfig = {
            method: "get",
            url: url,
            responseType: "stream",
        };
        if(authorization) axiosConfig.headers = { "Authorization": authorization };
        const response: AxiosResponse = await axios(axiosConfig);
        const zipPath = destinationPath + ".zip";
        const fileStream = fs.createWriteStream(zipPath);
        response.data.pipe(fileStream);
        return new Promise<void>((resolve, reject) => {
            fileStream.on('finish', async () => {
                fileStream.close();
                try {
                    const expectedSha256 = await getEnvVar("RULESSHA256");
                    if (expectedSha256) {
                        const matches = await verifyFileSha256(zipPath, expectedSha256);
                        if (!matches) {
                            fs.unlinkSync(zipPath);
                            reject(new Error(`Downloaded rules bundle failed SHA-256 verification (expected ${expectedSha256}). Refusing to load it.`));
                            return;
                        }
                        logger.info("Rules bundle SHA-256 checksum verified.");
                    } else {
                        logger.warn("RULESSHA256 not set -- skipping integrity verification of the downloaded rules bundle. Set RULESSHA256 to a trusted checksum to enable it.");
                    }
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });

            fileStream.on('error', (err:any) => {
                reject(err);
            });
        });
    } catch (error:any) {
        throw new Error(`Error downloading file: ${error}`);
    }
}

export async function unzipFile(relativePath: string): Promise<void> {
    const extract = require('extract-zip');
    const absolutePath = path.resolve(relativePath)
    logger.debug(`Unzipping file: ${absolutePath}`)
    try {
        if(fs.existsSync(absolutePath)) fs.rmSync(absolutePath, { recursive: true, force: true });
        await extract(absolutePath + ".zip", { dir: absolutePath });
        await moveSubFilesToRoot(absolutePath);
    } catch (err:any) {
        logger.error(`Error unzipping file: ${err}`);
        throw new Error(`Error unzipping file: ${err.message}`);
    }
    fs.unlinkSync(relativePath + ".zip");
}

async function checkFileType(url: string, type:string="application/zip"): Promise<boolean> {
    let authorization = await getEnvVar("RULESAUTHORIZATION");
    let axiosConfig: AxiosRequestConfig = {};
    if(authorization) axiosConfig.headers = { "Authorization": authorization };
    const response: AxiosResponse = await axios.head(url, axiosConfig);
    const fileType = response.headers['content-type'];
    if (!fileType || fileType !== type) {
        return false;
    }
    return true;
}

async function moveSubFilesToRoot(folderPath: string): Promise<void> {
    try {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                const subFiles = fs.readdirSync(filePath);
                subFiles.forEach((subFile) => {
                    const subFilePath = path.join(filePath, subFile);
                    const newFilePath = path.join(folderPath, subFile);
                    fs.renameSync(subFilePath, newFilePath);
                });
                fs.rmdirSync(filePath);
            }
        });
        logger.debug('All sub-files have been successfully moved to the root.');
    } catch (error) {
        logger.error(`Error moving subFiles : ${error}`);
    }
}