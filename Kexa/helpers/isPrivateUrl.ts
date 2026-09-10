import net from 'net';

/** Block requests to private/internal IP ranges (SSRF protection). */
export function isPrivateUrl(urlStr: string): boolean {
    try {
        const parsed = new URL(urlStr);
        let hostname = parsed.hostname.replace(/^\[|\]$/g, ''); // strip [] from IPv6
        // Block metadata endpoints
        if (hostname === "169.254.169.254") return true;
        // Block localhost (IPv4, IPv6, hostname)
        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return true;
        // Block IPv6-mapped IPv4 (::ffff:127.0.0.1 etc.)
        const v4mapped = hostname.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
        if (v4mapped) {
            hostname = v4mapped[1]; // extract the IPv4 and check it below
        }
        // Block IPv6 private ranges
        if (hostname.includes(':')) {
            const lower = hostname.toLowerCase();
            if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // unique local
            if (lower.startsWith('fe80')) return true; // link-local
            if (lower.startsWith('ff')) return true; // multicast
        }
        // Block IPv4 private ranges
        if (net.isIPv4(hostname)) {
            const parts = hostname.split('.').map(Number);
            if (parts[0] === 10) return true;
            if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
            if (parts[0] === 192 && parts[1] === 168) return true;
            if (parts[0] === 127) return true;
            if (parts[0] === 0) return true;
            if (parts[0] === 169 && parts[1] === 254) return true; // link-local
        }
        return false;
    } catch {
        return true;
    }
}
