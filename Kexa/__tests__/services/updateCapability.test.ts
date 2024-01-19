import fs from 'fs';
import { updateREADME, updateVersion } from '../../services/updateCapability.service';
const { expect } = require('chai');

describe('Update Capability Service', () => {
    it('Update Version', async () => {
        const testVersion = "1.0.0";
        const packageJsonOriginal = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        const versionOriginal = fs.readFileSync('./VERSION', 'utf8');
        fs.writeFileSync('./VERSION', testVersion);
        updateVersion();
        const packageJson = require('../../../package.json');
        expect(packageJson.version).to.equal(testVersion);
        fs.writeFileSync('./VERSION', versionOriginal);
        fs.writeFileSync('./package.json', JSON.stringify(packageJsonOriginal, null, 4));
    });

    it('Update README', async () => {
        const capacityJsonOriginal = require('../../../capacity.json');
        const readmeOriginal = fs.readFileSync('./README.md', 'utf8');
        fs.writeFileSync('./capacity.json', JSON.stringify(JSON.parse(fs.readFileSync('./Kexa/__tests__/filesForTest/capacity.json', 'utf8'))));
        const capacityJson = require('../../../capacity.json');
        updateREADME();
        const readme = fs.readFileSync('./README.md', 'utf8');
        const tab = '    ';
        Object.keys(capacityJson).forEach((key: string) => {
            let sentence = `- ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:\n`;
            expect((readme.match(new RegExp(sentence, "g")) || []).length).to.equal(1);
            capacityJson[key]['resources'].forEach((resource: string) => {
                sentence = `${tab}- ✅ ${resource}\n`
                expect(readme.match(new RegExp(sentence, "g")) || []).not.to.be.empty;
            });
        });
        expect((readme.match(new RegExp("<div class='spliter_code'></div>", "g")) || []).length).to.equal(2);
        fs.writeFileSync('./capacity.json', JSON.stringify(capacityJsonOriginal, null, 4));
        fs.writeFileSync('./README.md', readmeOriginal);
    });
});