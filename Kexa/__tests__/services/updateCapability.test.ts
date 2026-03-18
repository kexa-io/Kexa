import fs from 'fs';
import { updateVersion } from '../../services/updateCapability.service';
const { expect } = require('chai');

describe('Update Capability Service', () => {
    it('Update Version', async () => {
        const testVersion = "1.0.0";
        const versionExists = fs.existsSync('./VERSION');
        const packageJsonOriginal = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        const versionOriginal = versionExists ? fs.readFileSync('./VERSION', 'utf8') : null;
        fs.writeFileSync('./VERSION', testVersion);
        updateVersion();
        const packageJson = require('../../../package.json');
        expect(packageJson.version).to.equal(testVersion);
        if (versionOriginal !== null) {
            fs.writeFileSync('./VERSION', versionOriginal);
        } else {
            fs.unlinkSync('./VERSION');
        }
        fs.writeFileSync('./package.json', JSON.stringify(packageJsonOriginal, null, 4));
    });
});