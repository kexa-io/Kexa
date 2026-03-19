/*
    * Provider : http
    * Thumbnail : https://cdn-icons-png.flaticon.com/512/2165/2165004.png
    * Documentation : https://developer.mozilla.org/fr/docs/Web/HTTP
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - request
*/

import dns from 'dns';
import { HttpResources } from "../../models/http/resource.model";
import tls, { TLSSocket } from 'tls';
import { HttpRequest } from "../../models/http/request.models";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { HttpConfig } from "../../models/http/config.models";
import { isEmpty } from "../../helpers/isEmpty";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
let httpConfig: HttpConfig[] = [];

const jsome = require('jsome');
jsome.level.show = true;

import {getNewLogger} from "../logger.service";
import net from 'net';
const logger = getNewLogger("HttpLogger");

/** Block requests to private/internal IP ranges (SSRF protection). */
function isPrivateUrl(urlStr: string): boolean {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING HTTP RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(_httpConfig:HttpConfig[]) {
    httpConfig = _httpConfig;
    let resources = new Array<HttpResources>();
    let promises: any = []
    for(let config of httpConfig??[]){
        let prefix = config.prefix??(httpConfig.indexOf(config).toString());
        promises.push(
            (async () => {
                logger.info("- add one config for http -");
                let listHttpResources = new Array<HttpRequest>();

                try {
                    const url = await getConfigOrEnvVar(config, "URL", prefix);
                    if (!url) {
                        throw new Error("- Please pass URL in your config file");
                    }
                    if (!Array.isArray(url)) {
                        if (isPrivateUrl(url)) {
                            throw new Error("Requests to private/internal addresses are blocked");
                        }
                        let data = await getDataHttp(url, config);
                        listHttpResources.push(data);
                    }else{
                        await Promise.all(url.map(async (url) => {
                            if (isPrivateUrl(url)) {
                                logger.warn("Skipping private/internal URL: " + url);
                                return Promise.resolve();
                            }
                            let data = await getDataHttp(url, config);
                            listHttpResources.push(data);
                            return Promise.resolve();
                        }));
                    }
                } catch (e:any) {
                    logger.error("error in collectHttpData with the url: " + ((await getConfigOrEnvVar(config, "URL", prefix)) ?? null));
                    logger.error(e);
                }

                return { request: listHttpResources };
            })()
        );
    }
    const results = await Promise.all(promises);
    resources.push(...results);

    logger.info("- listing http resources done -");
    return resources??null;
}

async function getHeader(config: HttpConfig): Promise<Record<string, string>|null>{
    let authorization = await getConfigOrEnvVar(config, "AUTHORIZATION", config.prefix??(httpConfig.indexOf(config)+"-"));
    let header = { ...config.header };
    if(authorization){
        header["Authorization"] = authorization;
    }
    if(isEmpty(header)) return null;
    return header;
}

function getBody(config: HttpConfig): any{
    let body = config.body;
    if(isEmpty(body)) return null;
    return body;
}

const urlModule = require('url')

async function makeHttpRequest<T>(
    method: string,
    url: string,
    body?: any,
    headers?: Record<string, string>
): Promise<AxiosResponse<T>> {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const requestConfig: AxiosRequestConfig = {
        method : method as any,
        url,
        data: body,
        headers,
        validateStatus: (status) => status >= 0 && status < 1000,
        httpsAgent: agent,
    };

    try {
        const response: AxiosResponse<T> = await axios(requestConfig);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getCertificateFromResponse(response: AxiosResponse<any>): Promise<any> {
    return new Promise((resolve, reject) => {
        const socket: TLSSocket = tls.connect({
            host: urlModule.parse(response.config.url!).hostname!,
            port: 443,
            socket: response.config.httpsAgent?.keepAliveSocket,
        }, () => {
            const cert = socket.getPeerCertificate();
            const cipherName = socket.encrypted ? socket.getCipher().name : null;
            const protocolVersion = socket.encrypted ? socket.getProtocol() : null;
            const TLS = {
                cipherName,
                protocolVersion,
            };
            socket.end();
            resolve({cert, TLS});
        });
        socket.on('error', (err) => {
            resolve(null);
        });
    });
}


async function dnsLookup(hostname: string): Promise<string[]|string|null> {
    return new Promise((resolve, reject) => {
        dns.resolve(hostname, (err, addresses) => {
            if (err) {
                resolve(null);
            } else {
                resolve(addresses);
            }
        });
    });
}

async function doRequest(url: string, config: HttpConfig): Promise<any> {
    const method = await getConfigOrEnvVar(config, "METHOD", config.prefix??(httpConfig.indexOf(config)+"-"));
    const header = await getHeader(config);
    const body = getBody(config);
    const start = Date.now();
    let result = null;
    if(!header) result = await makeHttpRequest<any>(method, url, body);
    else result = await makeHttpRequest<any>(method, url, body, header);
    const delays = Date.now() - start;
    return {
        ...result,
        delays: delays,
    };
}

async function getDataHttp(url: string, config: HttpConfig): Promise<HttpRequest> {
    let httpResources = {
        certificate: null,
        body: null,
        headers: null,
        code: null,
    } as HttpRequest;
    try{
        let response = await doRequest(url, config);
        httpResources.body = response?.data;
        httpResources.headers = response?.headers;
        httpResources.code = response?.status;
        httpResources.url = url;
        httpResources.ip = await dnsLookup(urlModule.parse(url).hostname!);
        const {cert, TLS} = await getCertificateFromResponse(response);
        httpResources.certificate = cert;
        httpResources.tls = TLS
        httpResources.delays = response?.delays;
    }catch(e:any){
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
