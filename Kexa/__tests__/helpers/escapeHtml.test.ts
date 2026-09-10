import { escapeHtml } from "../../helpers/escapeHtml";

const { expect } = require('chai');

describe('escapeHtml', () => {
    it('should escape angle brackets and quotes', () => {
        expect(escapeHtml(`<img src=x onerror=alert(1)>`)).to.equal('&lt;img src=x onerror=alert(1)&gt;');
    });

    it('should escape ampersands', () => {
        expect(escapeHtml('AT&T')).to.equal('AT&amp;T');
    });

    it('should escape double and single quotes (attribute-breakout)', () => {
        expect(escapeHtml(`"><script>alert(1)</script>`)).to.equal('&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
        expect(escapeHtml(`'onmouseover='alert(1)`)).to.equal('&#39;onmouseover=&#39;alert(1)');
    });

    it('should return an empty string for null/undefined', () => {
        expect(escapeHtml(null)).to.equal('');
        expect(escapeHtml(undefined)).to.equal('');
    });

    it('should leave plain text unchanged', () => {
        expect(escapeHtml('my-bucket-name-01')).to.equal('my-bucket-name-01');
    });

    it('should stringify non-string values before escaping', () => {
        expect(escapeHtml(42)).to.equal('42');
        expect(escapeHtml(['a', 'b'])).to.equal('a,b');
    });
});
