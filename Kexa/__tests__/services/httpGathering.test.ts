import { createSsrfSafeLookup } from "../../services/addOn/httpGathering.service";
import { isPrivateIp } from "../../helpers/isPrivateUrl";

const { expect } = require('chai');

describe('httpGathering SSRF protections', () => {
    describe('isPrivateIp', () => {
        it('should block the cloud metadata address', () => {
            expect(isPrivateIp("169.254.169.254")).to.equal(true);
        });

        it('should block localhost variants', () => {
            expect(isPrivateIp("localhost")).to.equal(true);
            expect(isPrivateIp("127.0.0.1")).to.equal(true);
            expect(isPrivateIp("::1")).to.equal(true);
        });

        it('should block IPv4 private ranges', () => {
            expect(isPrivateIp("10.0.0.5")).to.equal(true);
            expect(isPrivateIp("172.16.0.5")).to.equal(true);
            expect(isPrivateIp("172.31.255.255")).to.equal(true);
            expect(isPrivateIp("192.168.1.1")).to.equal(true);
            expect(isPrivateIp("169.254.1.1")).to.equal(true);
        });

        it('should block IPv6-mapped IPv4 loopback', () => {
            expect(isPrivateIp("::ffff:127.0.0.1")).to.equal(true);
        });

        it('should block IPv6 unique-local, link-local and multicast', () => {
            expect(isPrivateIp("fd00::1")).to.equal(true);
            expect(isPrivateIp("fe80::1")).to.equal(true);
            expect(isPrivateIp("ff02::1")).to.equal(true);
        });

        it('should not block a public IPv4 address', () => {
            expect(isPrivateIp("8.8.8.8")).to.equal(false);
            expect(isPrivateIp("1.1.1.1")).to.equal(false);
        });

        it('should not falsely block a public hostname that merely contains "10." etc as text', () => {
            // 172.32.x.x is public (only 172.16-172.31 is private)
            expect(isPrivateIp("172.32.0.1")).to.equal(false);
        });
    });

    describe('createSsrfSafeLookup', () => {
        it('should refuse to resolve "localhost", which resolves to a private loopback address', (done: any) => {
            const lookup = createSsrfSafeLookup();
            lookup("localhost", {}, (err: any) => {
                expect(err).to.not.equal(null);
                expect(err).to.be.an('error');
                done();
            });
        });
    });
});
