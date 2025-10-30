import { DOMParser } from "linkedom";

export const extractURL = (text: string): string | null => {
    return extractFirstURLFromHTML(text)??extractFirstURL(text);
}

function extractFirstURLFromHTML(html: string): string | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const urlElements = Array.from(doc.querySelectorAll('a[href], img[src]'));

    for (const element of urlElements) {
        const url = (element as HTMLAnchorElement).href || (element as HTMLImageElement).src;
        if (url) {
            return url;
        }
    }

    return null;
}

function extractFirstURL(input:string): string | null {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = input.match(urlRegex);

    if (matches && matches.length > 0) {
        return matches[0];
    }

    return null;
}