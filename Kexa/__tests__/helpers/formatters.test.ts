import { formatCsv, formatToml, formatHtml } from "../../helpers/formatters";
import type { ResultScan } from "../../models/resultScan.models";

const { expect } = require('chai');

function makeScan(overrides: Partial<any> = {}): ResultScan {
    return {
        rule: {
            name: "test-rule",
            description: "a description",
            level: 2,
            cloudProvider: "aws",
            objectName: "s3",
            ...overrides.rule,
        },
        error: overrides.error ?? [{ value: 1, result: false, condition: [] }],
        loud: overrides.loud,
    } as ResultScan;
}

describe('formatCsv', () => {
    it('should neutralize a formula-injection payload with a leading apostrophe', () => {
        const scans: ResultScan[][] = [[makeScan({ rule: { name: "=cmd|'/c calc'!A1", description: "d", level: 2, cloudProvider: "aws", objectName: "s3" } })]];
        const csv = formatCsv(scans);
        expect(csv).to.include(`"'=cmd|'/c calc'!A1"`);
    });

    it('should quote fields and escape embedded double quotes', () => {
        const scans: ResultScan[][] = [[makeScan({ rule: { name: 'a "quoted" name', description: "d", level: 1, cloudProvider: "aws", objectName: "s3" } })]];
        const csv = formatCsv(scans);
        expect(csv).to.include(`"a ""quoted"" name"`);
    });

    it('should not mangle an ordinary field', () => {
        const scans: ResultScan[][] = [[makeScan()]];
        const csv = formatCsv(scans);
        expect(csv).to.include(`"test-rule"`);
    });
});

describe('formatToml', () => {
    it('should escape embedded double quotes and backslashes in string fields', () => {
        const scans: ResultScan[][] = [[makeScan({ rule: { name: 'weird "name"', description: 'back\\slash', level: 0, cloudProvider: "aws", objectName: "s3" } })]];
        const toml = formatToml(scans);
        expect(toml).to.include('name = "weird \\"name\\""');
        expect(toml).to.include('description = "back\\\\slash"');
    });
});

describe('formatHtml', () => {
    it('should escape HTML-significant characters in rule name, provider, and description', () => {
        const scans: ResultScan[][] = [[makeScan({ rule: { name: '<script>alert(1)</script>', description: 'a & b < c > d "e" \'f\'', level: 2, cloudProvider: 'aws"><img>', objectName: "s3" } })]];
        const html = formatHtml(scans);
        expect(html).to.not.include('<script>alert(1)</script>');
        expect(html).to.include('&lt;script&gt;');
        expect(html).to.not.include('aws"><img>');
    });
});
