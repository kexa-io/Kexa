
const { expect } = require('chai');
import { redactSecretData } from "../../services/addOn/kubernetesGathering.service";

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
