export function isEmpty(variable: any) {
    if (
        variable === null ||
        variable === undefined ||
        variable === '' ||
        (Array.isArray(variable) && variable.length === 0) ||
        (typeof variable === 'object' && Object.keys(variable).every(key => variable[key] === undefined))
    ) {
        return true;
    }
    return false;
}