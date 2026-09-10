import { mapWithConcurrency } from "../../helpers/concurrencyLimit";

const { expect } = require('chai');

describe('mapWithConcurrency', () => {
    it('should return results in the original order regardless of completion order', async () => {
        const items = [30, 10, 20, 5];
        const results = await mapWithConcurrency(items, 4, async (ms) => {
            await new Promise((resolve) => setTimeout(resolve, ms));
            return ms * 2;
        });
        expect(results).to.deep.equal([60, 20, 40, 10]);
    });

    it('should never have more than `limit` calls in flight at once', async () => {
        let inFlight = 0;
        let maxInFlight = 0;
        const items = Array.from({ length: 20 }, (_, i) => i);
        await mapWithConcurrency(items, 3, async (i) => {
            inFlight++;
            maxInFlight = Math.max(maxInFlight, inFlight);
            await new Promise((resolve) => setTimeout(resolve, 5));
            inFlight--;
            return i;
        });
        expect(maxInFlight).to.be.at.most(3);
    });

    it('should process every item exactly once', async () => {
        const items = Array.from({ length: 50 }, (_, i) => i);
        const seen = new Set<number>();
        await mapWithConcurrency(items, 7, async (i) => {
            seen.add(i);
            return i;
        });
        expect(seen.size).to.equal(50);
    });

    it('should handle an empty array', async () => {
        const results = await mapWithConcurrency([], 5, async (i: any) => i);
        expect(results).to.deep.equal([]);
    });
});
