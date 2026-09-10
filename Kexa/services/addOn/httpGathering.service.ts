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
import http from 'http';
let httpConfig: HttpConfig[] = [];

import {getNewLogger} from "../logger.service";
import { isPrivateUrl, isPrivateIp } from "../../helpers/isPrivateUrl";
const logger = getNewLogger("HttpLogger");

/** Strip embedded Basic-Auth credentials (user:pass@host) before logging a URL. */
function redactUrlCredentials(urlStr: string): string {
    try {
        const parsed = new URL(urlStr);
        parsed.username = '';
        parsed.password = '';
        return parsed.toString();
    } catch {
        return urlStr;
    }
}

/** A custom dns lookup (Node's `net.connect`/http(s).Agent `lookup` option)
 * that rejects the connection if the hostname resolves to a private/internal/
 * metadata address. Passed to the agent used for every request axios makes,
 * including ones it issues automatically to follow a redirect -- so unlike a
 * one-off check of the initial URL string, this also blocks DNS-rebinding
 * (a public hostname whose DNS answer is a private IP) and redirect-based
 * SSRF (a 3xx Location pointing at a private/metadata address). */
export function createSsrfSafeLookup() {
    return (hostname: string, options: any, callback: any) => {
        const cb = typeof options === "function" ? options : callback;
        const opts = typeof options === "function" ? {} : (options ?? {});
        dns.lookup(hostname, { ...opts, all: true }, (err: any, addresses: any) => {
            if (err) return cb(err);
            const list = Array.isArray(addresses) ? addresses : [addresses];
            const blocked = list.find((a: any) => isPrivateIp(a.address ?? a));
            if (blocked) {
                return cb(new Error(`Blocked request to ${hostname}: resolves to private/internal address ${blocked.address ?? blocked}`));
            }
            if (opts.all) return cb(null, list);
            return cb(null, list[0].address, list[0].family);
        });
    };
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
                    const rawUrl = (await getConfigOrEnvVar(config, "URL", prefix)) ?? null;
                    logger.error("error in collectHttpData with the url: " + (rawUrl ? redactUrlCredentials(rawUrl) : null));
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
    headers?: Record<string, string>,
    insecureTLS: boolean = false
): Promise<AxiosResponse<T>> {
    const lookup = createSsrfSafeLookup();
    const httpsAgent = new https.Agent({
        rejectUnauthorized: !insecureTLS,
        lookup,
    } as any);
    const httpAgent = new http.Agent({ lookup } as any);
    const requestConfig: AxiosRequestConfig = {
        method : method as any,
        url,
        data: body,
        headers,
        validateStatus: (status) => status >= 0 && status < 1000,
        httpsAgent,
        httpAgent,
        maxRedirects: 5,
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
        const parsedUrl = urlModule.parse(response.config.url!);
        const socket: TLSSocket = tls.connect({
            host: parsedUrl.hostname!,
            port: parsedUrl.port ? Number(parsedUrl.port) : 443,
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
    const insecureTLS = Boolean(config.insecureTLS);
    if(!header) result = await makeHttpRequest<any>(method, url, body, undefined, insecureTLS);
    else result = await makeHttpRequest<any>(method, url, body, header, insecureTLS);
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
        logger.error("error in getDataHttp with the url: " + redactUrlCredentials(url));
        logger.error(e);
    }
    return httpResources;
}
