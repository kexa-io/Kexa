import { jsonStringify } from "../../helpers/jsonStringify";

const { expect } = require('chai');

describe('jsonStringify', () => {
    it('should stringify data with bigints', () => {
        const data = { a: 1n, b: 2214435645764574572432n };
        expect(jsonStringify(data,4)).to.equal(`{
    "a": "1",
    "b": "2214435645764574572432"
}`);
    });

    it('should stringify data without bigints', () => {
        const data = { a: 1, b: 2 };
        expect(jsonStringify(data,4)).to.equal(`{
    "a": 1,
    "b": 2
}`);
    });

    it('should stringify data with nested bigints', () => {
        const data = { a: { b: 1n, c: 2n } };
        expect(jsonStringify(data,4)).to.equal(`{
    "a": {
        "b": "1",
        "c": "2"
    }
}`);
    });
});

