// Escapes a value for safe interpolation into an HTML string (alert emails,
// SMTP/webhook report bodies). Resource data (tag values, names, descriptions...)
// comes from scanned cloud accounts and rule files, both untrusted, so it must
// never be interpolated into HTML templates unescaped.
export function escapeHtml(value: unknown): string {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
