import { isPrivateUrl } from "../../helpers/isPrivateUrl";

const { expect } = require('chai');

describe('isPrivateUrl', () => {
    it('should block the cloud metadata endpoint', () => {
        expect(isPrivateUrl("http://169.254.169.254/latest/meta-data/")).to.equal(true);
    });

    it('should block localhost in all forms', () => {
        expect(isPrivateUrl("http://localhost/")).to.equal(true);
        expect(isPrivateUrl("http://127.0.0.1/")).to.equal(true);
        expect(isPrivateUrl("http://[::1]/")).to.equal(true);
    });

    it('should block RFC1918 private ranges', () => {
        expect(isPrivateUrl("http://10.0.0.1/")).to.equal(true);
        expect(isPrivateUrl("http://172.16.0.1/")).to.equal(true);
        expect(isPrivateUrl("http://192.168.1.1/")).to.equal(true);
    });

    it('should allow a public address', () => {
        expect(isPrivateUrl("https://example.com/")).to.equal(false);
        expect(isPrivateUrl("https://8.8.8.8/")).to.equal(false);
    });

    it('should treat an unparseable URL as private (fail closed)', () => {
        expect(isPrivateUrl("not a url")).to.equal(true);
    });
});
