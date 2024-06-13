export function jsonStringify(data: any, space?: number) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, space);
}