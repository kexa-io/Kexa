import { writeCleanedKubeconfigAndLoad } from "../../services/addOn/kubernetesGathering.service";
import fs from "fs";
import os from "os";
import path from "path";

const { expect } = require('chai');

describe('kubernetesGathering writeCleanedKubeconfigAndLoad', () => {
    it('should write the temp file with owner-only permissions', () => {
        const tempPath = path.join(os.tmpdir(), `kexa-test-kubeconfig-${Date.now()}.clean`);
        let seenDuringLoad: string | null = null;
        writeCleanedKubeconfigAndLoad(tempPath, "apiVersion: v1", (p) => {
            seenDuringLoad = fs.readFileSync(p, 'utf8');
            const mode = fs.statSync(p).mode & 0o777;
            expect(mode).to.equal(0o600);
        });
        expect(seenDuringLoad).to.equal("apiVersion: v1");
        expect(fs.existsSync(tempPath)).to.equal(false);
    });

    it('should delete the temp file even when the loader throws', () => {
        const tempPath = path.join(os.tmpdir(), `kexa-test-kubeconfig-err-${Date.now()}.clean`);
        expect(() => {
            writeCleanedKubeconfigAndLoad(tempPath, "apiVersion: v1", () => {
                throw new Error("simulated loadFromFile failure");
            });
        }).to.throw("simulated loadFromFile failure");
        expect(fs.existsSync(tempPath)).to.equal(false);
    });
});
