import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import fs from "fs";
import { getNewLogger } from '../services/logger.service';
import path from 'path';
import { getEnvVar } from '../services/manageVarEnvironnement.service';

const logger = getNewLogger("DownloadLogger");

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
        const fileStream = fs.createWriteStream(destinationPath+".zip");
        response.data.pipe(fileStream);
        return new Promise<void>((resolve, reject) => {
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });

            fileStream.on('error', (err:any) => {
                reject(err);
            });
        });
    } catch (error:any) {
        logger.error(`Error downloading file: ${error}`);
        throw new Error(`Error downloading file: ${error}`);
    }
}

export async function unzipFile(relativePath: string): Promise<void> {
    const extract = require('extract-zip');
    const absolutePath = process.cwd() + relativePath.replace("./", ["/", "\\"][process.platform == "win32" ? 1:0]);
    logger.debug(`Unzipping file: ${absolutePath}`)
    try {
        if(fs.existsSync(absolutePath)) fs.rmSync(absolutePath, { recursive: true, force: true });
        await extract(absolutePath + ".zip", { dir: absolutePath });
        await moveSubFilesToRoot(absolutePath);
        fs.unlinkSync(relativePath + ".zip");
    } catch (err:any) {
        logger.error(`Error unzipping file: ${err}`);
        throw new Error(`Error unzipping file: ${err.message}`);
    }
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