import { redactSecrets } from "../../helpers/redactSecrets";

const { expect } = require('chai');

describe('redactSecrets', () => {
    it('should redact a top-level secret-like field', () => {
        const result = redactSecrets({ AZURECLIENTID: "app-1", AZURECLIENTSECRET: "sup3rSecr3t" });
        expect(result.AZURECLIENTID).to.equal("app-1");
        expect(result.AZURECLIENTSECRET).to.equal("[REDACTED]");
    });

    it('should redact nested secret-like fields', () => {
        const result = redactSecrets({ prefix: "P_", nested: { client_secret: "abc", name: "ok" } });
        expect(result.nested.client_secret).to.equal("[REDACTED]");
        expect(result.nested.name).to.equal("ok");
    });

    it('should redact common variants: password, token, credential, apikey', () => {
        const result = redactSecrets({
            password: "x", PWD: "x", access_token: "x", GOOGLE_APPLICATION_CREDENTIALS: "x", apiKey: "x",
            safeField: "keep-me",
        });
        expect(result.password).to.equal("[REDACTED]");
        expect(result.PWD).to.equal("[REDACTED]");
        expect(result.access_token).to.equal("[REDACTED]");
        expect(result.GOOGLE_APPLICATION_CREDENTIALS).to.equal("[REDACTED]");
        expect(result.apiKey).to.equal("[REDACTED]");
        expect(result.safeField).to.equal("keep-me");
    });

    it('should not mutate the original object', () => {
        const original = { AZURECLIENTSECRET: "sup3rSecr3t" };
        redactSecrets(original);
        expect(original.AZURECLIENTSECRET).to.equal("sup3rSecr3t");
    });
});
