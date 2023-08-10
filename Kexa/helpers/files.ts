import * as fs from 'fs';
import { Logger } from "tslog";
const logger = new Logger({ minLevel: 3, type: "pretty", name: "GcpLogger" });

export function writeStringToJsonFile(data: string, filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            const initialData = JSON.stringify({});
            fs.writeFileSync(filePath, initialData);
        }
        logger.fatal("data")
        logger.fatal(data)
        logger.fatal(JSON.parse(data));
        logger.fatal(JSON.stringify(JSON.parse(data), null, 4));
        fs.writeFileSync(filePath, JSON.stringify(JSON.parse(data), null, 4), 'utf8');
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export function deleteFile(filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            fs.unlinkSync(filePath);
        }
        return true;
    } catch (error) {
        logger.error(error);
        return false;
    }
}