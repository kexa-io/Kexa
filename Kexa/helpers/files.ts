import * as fs from 'fs';
//import { Logger } from "tslog"; // PsK: removing not bun compatible 21032025
import adze from 'adze';
import { jsonStringify } from './jsonStringify';
const logger = adze.timestamp.seal();

export function writeStringToJsonFile(data: string, filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        logger.debug("File exists: " + fileExists);
        if (!fileExists) {
            logger.debug("Creating file: " + filePath);
            const initialData = jsonStringify({});
            fs.writeFileSync(filePath, initialData);
        }
        logger.debug("Writing data to file: " + filePath);
        fs.writeFileSync(filePath, jsonStringify(JSON.parse(data), 4), 'utf8');
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export function deleteFile(filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            fs.unlinkSync(filePath);
        }
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export function getFile(filePath: string){
    try{
        const fileExists = fs.existsSync(filePath);
        if(fileExists){
            return fs.readFileSync(filePath, 'utf8');
        }
        return null;
    }catch(error){
        return null;
    }
}

export function createFileSync(data:string, filePath:string, jsonData:boolean=false): boolean{
    try{
        let pathFolder = filePath.split("/").slice(0, -1).join("/");
        createFolderIfNotExists(pathFolder);
        logger.debug("Writing data to file in "+ (jsonData)?'JSON':'RAW' +": " + filePath);
        fs.writeFileSync(filePath, (jsonData)?jsonStringify(JSON.parse(data), 4):data);
        return true;
    }catch(error){
        logger.debug(error);
        return false;
    }
}

function createFolderIfNotExists(filePath:string): boolean{
    try{
        fs.mkdirSync(filePath, { recursive: true });
        logger.debug("Folder created: " + filePath);
        return true;
    }catch(error){
        logger.debug(error);
        return false;
    }

}