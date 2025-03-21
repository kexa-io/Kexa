export const splitProperty = (prop: string, delimiter:string, ignore:string="/"):string[] => {
    const result = [];
    let current = "";
    let escape = false;

    for (const char of prop) {
        if (char === delimiter && !escape) {
            result.push(current);
            current = "";
        } else if (char === ignore && !escape) {
            escape = true;
        } else {
            if(escape && char !== delimiter) current += ignore;
            current += char;
            escape = false;
        }
    }

    result.push(current);
    return result;
}