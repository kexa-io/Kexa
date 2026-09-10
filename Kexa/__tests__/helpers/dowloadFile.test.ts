import { computeSha256, verifyFileSha256 } from "../../helpers/dowloadFile";
import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";

const { expect } = require('chai');

describe('computeSha256 / verifyFileSha256', () => {
    let filePath: string;

    beforeEach(() => {
        filePath = path.join(os.tmpdir(), `kexa-checksum-test-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`);
        fs.writeFileSync(filePath, "hello kexa");
    });

    afterEach(() => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    it('should compute the correct SHA-256 hex digest of a file', async () => {
        const expected = crypto.createHash('sha256').update("hello kexa").digest('hex');
        const actual = await computeSha256(filePath);
        expect(actual).to.equal(expected);
    });

    it('should verify a matching checksum, case-insensitively', async () => {
        const expected = crypto.createHash('sha256').update("hello kexa").digest('hex');
        expect(await verifyFileSha256(filePath, expected)).to.equal(true);
        expect(await verifyFileSha256(filePath, expected.toUpperCase())).to.equal(true);
        expect(await verifyFileSha256(filePath, `  ${expected}  `)).to.equal(true);
    });

    it('should reject a mismatching checksum', async () => {
        const wrong = crypto.createHash('sha256').update("not the same content").digest('hex');
        expect(await verifyFileSha256(filePath, wrong)).to.equal(false);
    });
});
