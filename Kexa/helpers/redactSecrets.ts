// Redacts likely-sensitive fields before an object gets logged. Provider
// config objects can carry credentials directly (e.g. AzureConfig.AZURECLIENTSECRET)
// instead of via environment variables, so logging them as-is at debug level
// leaks secrets into logs/log aggregators.
const SENSITIVE_KEY_PATTERN = /secret|password|pwd|token|credential|private[_-]?key|apikey|api[_-]?key/i;

export function redactSecrets(value: any): any {
    if (Array.isArray(value)) {
        return value.map(redactSecrets);
    }
    if (value !== null && typeof value === "object") {
        const result: Record<string, any> = {};
        for (const key of Object.keys(value)) {
            result[key] = SENSITIVE_KEY_PATTERN.test(key) ? "[REDACTED]" : redactSecrets(value[key]);
        }
        return result;
    }
    return value;
}
