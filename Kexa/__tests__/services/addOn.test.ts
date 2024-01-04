import { Logger } from "tslog";
import { hasValidHeader } from "../../services/addOn.service";

const { expect } = require('chai');
const fs = require('fs');
const mainFolder = 'Kexa';
let logger = new Logger({ minLevel: Number(process.env.DEBUG_MODE)??4, type: "pretty", name: "globalLogger" });

describe('Add On', function() {
    const addOnPath = '../../services/addOn';
    this.timeout(5000);
    this.retries(4);

    describe('Main Add On Folder', () => {
        const files = fs.readdirSync("./" + mainFolder + "/services/addOn");
        
        files.forEach((file: string) => {
            if (file.endsWith('Gathering.service.ts')) {
                let addOnName = file.split('Gathering.service.ts')[0];
                describe(`Add On ${addOnName}`, () => {
                    it(`File ${file} should contain an importable collectData function`, async () => {
                        const moduleExports = await import(`${addOnPath}/${file.replace(".ts", "")}`);
                        const collectDataFn = moduleExports.collectData;
                        expect(collectDataFn).to.be.a('function');
                    });

                    it(`Display part of ${addOnName} should be ok`, async () => {
                        const moduleExports = require(`${addOnPath}/display/${addOnName}Display.service.ts`);
                        const displayFn = moduleExports.propertyToSend;
                        expect(displayFn).to.be.a('function');
                    });

                    it(`File ${file} should contain a valid header`, async () => {
                        let header = hasValidHeader(`./${mainFolder}/services/addOn/${file}`);
                        expect(typeof(header) !== "string").to.equal(true);
                    });
                });
            }
        });
    });

    describe('Secondary Add On Folder', () => {
        const noCheckFolders = ["display", "imports"];
        const folders = fs.readdirSync("./" + mainFolder + "/services/addOn").filter((folder: string) => !folder.endsWith('.ts'));
        folders.forEach((folder: string) => {
            if(noCheckFolders.some((noCheckFolder: string) => { return folder.includes(noCheckFolder) })) return;
            const files = fs.readdirSync("./" + mainFolder + "/services/addOn/" + folder);
            const folderName = folder.slice(0, -1).toUpperCase() + folder.slice(1);
            files.forEach((file: string) => {
                if (file.endsWith(folderName+'.service.ts')) {
                    let addOnName = file.split(folderName+'.service.ts')[0];
                    describe(`Add On ${addOnName} for ${folderName}`, () => {
                        it(`File ${file} should contain an importable collectData function`, async () => {
                            const moduleExports = await import(`${addOnPath}/addOn/${folder}/${file.replace(".ts", "").replace(".js", "")}`);
                            const exportFn = moduleExports[folder];
                            expect(exportFn).to.be.a('function');
                        });
                    });
                }
            });
        });
    });
});