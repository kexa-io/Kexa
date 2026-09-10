/** Runs `fn` over `items` with at most `limit` calls in flight at once,
 * instead of firing every call simultaneously via Promise.all(items.map(fn)).
 * Used where an unthrottled fan-out (one call, or several, per item) can
 * overwhelm a rate-limited API and cause silent per-item failures under load. */
export async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
    const results: R[] = new Array(items.length);
    let nextIndex = 0;

    async function worker() {
        while (true) {
            const current = nextIndex++;
            if (current >= items.length) return;
            results[current] = await fn(items[current]!, current);
        }
    }

    const workers = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, () => worker());
    await Promise.all(workers);
    return results;
}
