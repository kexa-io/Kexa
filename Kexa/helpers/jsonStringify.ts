export function jsonStringify(data: any, space?: number) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, space);
}

const jsome = require('jsome');

export function getColorStringHandler(data: any) {
    const processedConditions = JSON.parse(JSON.stringify(data, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v
    ));
      
    return (jsome.getColoredString(processedConditions));
}

