import { renderTableAllScan, renderTableAllScanLoud, propertyToSend } from "../../services/display.service";
import type { ResultScan } from "../../models/resultScan.models";

const { expect } = require('chai');

const XSS_PAYLOAD = `<img src=x onerror=alert(1)>`;
const XSS_ESCAPED = `&lt;img src=x onerror=alert(1)&gt;`;

function makeResultScan(overrides: Partial<ResultScan> = {}): ResultScan {
    return {
        rule: { name: "rule-name", description: "rule-description", cloudProvider: "unknownProvider" } as any,
        objectContent: { id: "obj-1" },
        error: [],
        ...overrides,
    } as ResultScan;
}

describe('display service', () => {
    describe('renderTableAllScan', () => {
        it('should escape a malicious rule name/description instead of injecting it as HTML', () => {
            const scan = makeResultScan({
                rule: { name: XSS_PAYLOAD, description: XSS_PAYLOAD, cloudProvider: "unknownProvider" } as any,
            });
            const html = renderTableAllScan([[scan]]);
            expect(html).to.not.include(XSS_PAYLOAD);
            expect(html).to.include(XSS_ESCAPED);
        });
    });

    describe('renderTableAllScanLoud', () => {
        it('should escape a malicious rule name and loud message', () => {
            const scan = makeResultScan({
                rule: { name: XSS_PAYLOAD, description: "d", cloudProvider: "unknownProvider" } as any,
                loud: { value: true, result: true, condition: [], message: XSS_PAYLOAD },
            });
            const html = renderTableAllScanLoud([[scan]]);
            expect(html).to.not.include(XSS_PAYLOAD);
            expect(html).to.include(XSS_ESCAPED);
        });
    });

    describe('propertyToSend (default/unregistered provider fallback)', () => {
        it('should escape a malicious resource id', () => {
            const result = propertyToSend({ cloudProvider: "unknownProvider" } as any, { id: XSS_PAYLOAD }, false);
            expect(result).to.not.include(XSS_PAYLOAD);
        });
    });
});
