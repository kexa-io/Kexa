import { extractSecretValue } from "../../services/manageVarEnvironnement.service";

const { expect } = require('chai');

describe('manageVarEnvironnement extractSecretValue (AWS Secrets Manager)', () => {
    it('should extract a named value from a real Secrets Manager SecretString', () => {
        // This is the exact shape AWS Secrets Manager returns: SecretString
        // is already a JSON-encoded string, not an object.
        const secretString = JSON.stringify({ AWS_ACCESS_KEY_ID: "AKIA123", AWS_SECRET_ACCESS_KEY: "shh" });
        expect(extractSecretValue(secretString, "AWS_ACCESS_KEY_ID")).to.equal("AKIA123");
        expect(extractSecretValue(secretString, "AWS_SECRET_ACCESS_KEY")).to.equal("shh");
    });

    it('should return undefined for a name not present in the secret', () => {
        const secretString = JSON.stringify({ FOO: "bar" });
        expect(extractSecretValue(secretString, "MISSING")).to.equal(undefined);
    });

    it('should return undefined when SecretString is undefined (e.g. binary secret)', () => {
        expect(extractSecretValue(undefined, "ANY")).to.equal(undefined);
    });
});
