import { groupBy } from "../../helpers/groupBy";

const { expect } = require('chai');

describe('groupBy', () => {
    it('should group items by the key returned by fn', () => {
        const items = [
            { type: "a", value: 1 },
            { type: "b", value: 2 },
            { type: "a", value: 3 },
        ];
        const grouped = groupBy(items, (item) => item.type);
        expect(Object.keys(grouped).sort()).to.deep.equal(["a", "b"]);
        expect(grouped.a).to.deep.equal([items[0], items[2]]);
        expect(grouped.b).to.deep.equal([items[1]]);
    });

    it('should handle a large input without losing any item (O(n) accumulation regression check)', () => {
        const items = Array.from({ length: 5000 }, (_, i) => ({ key: i % 3, i }));
        const grouped = groupBy(items, (item) => item.key);
        const total = Object.values(grouped).reduce((sum, group) => sum + group.length, 0);
        expect(total).to.equal(5000);
    });

    it('should return an empty object for an empty array', () => {
        expect(groupBy([], (x: any) => x)).to.deep.equal({});
    });
});
