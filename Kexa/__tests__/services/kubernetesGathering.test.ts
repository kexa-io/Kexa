import { writeCleanedKubeconfigAndLoad, redactSecretData } from "../../services/addOn/kubernetesGathering.service";
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

describe('kubernetesGathering redactSecretData', () => {
    it('should redact base64 .data values but keep the key names', () => {
        const secret = {
            metadata: { name: "db-creds", namespace: "default" },
            type: "Opaque",
            data: { password: "c3VwZXJzZWNyZXQ=", username: "YWRtaW4=" },
        };
        const redacted = redactSecretData(secret);
        expect(redacted.metadata.name).to.equal("db-creds");
        expect(Object.keys(redacted.data)).to.deep.equal(["password", "username"]);
        expect(redacted.data.password).to.equal("[REDACTED]");
        expect(redacted.data.username).to.equal("[REDACTED]");
    });

    it('should redact .stringData too, and not mutate the original', () => {
        const secret = { stringData: { token: "plain-text-secret" } };
        const redacted = redactSecretData(secret);
        expect(redacted.stringData.token).to.equal("[REDACTED]");
        expect(secret.stringData.token).to.equal("plain-text-secret");
    });

    it('should handle a secret with neither data nor stringData', () => {
        const secret = { metadata: { name: "empty" } };
        expect(() => redactSecretData(secret)).to.not.throw();
    });
});
