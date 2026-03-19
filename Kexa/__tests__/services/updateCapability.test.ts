import fs from 'fs';
import { updateVersion } from '../../services/updateCapability.service';
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
});