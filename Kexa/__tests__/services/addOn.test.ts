import { Logger } from "tslog";
import { hasValidHeader } from "../../services/addOn.service";

const { expect } = require('chai');
const fs = require('fs');
const mainFolder = 'Kexa';
let logger = new Logger({ minLevel: Number(process.env.DEBUG_MODE)??4, type: "pretty", name: "globalLogger" });

describe('Add On', () => {
    const addOnPath = '../../services/addOn';
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
                    expect(Array.isArray(header)).to.equal(true);
                });
            });
        }
    });

    it(`File AWS and git test`, async () => {
        // pre load few modules to avoid timeout
        const moduleExportsAws = await import(`../../services/addOn/awsGathering.service`);
        const moduleExportsGcp = await import(`../../services/addOn/gcpGathering.service`);
        expect(true).to.equal(true);
    });
});