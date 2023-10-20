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
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { HttpConfig } from "../../models/http/config.models";
import { isEmpty } from "../../helpers/isEmpty";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let httpConfig: HttpConfig[] = [];

const jsome = require('jsome');
jsome.level.show = true;

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("HttpLogger");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING HTTP RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(_httpConfig:HttpConfig[]) {
    httpConfig = _httpConfig;
    let resources = new Array<HttpResources>();
    let promises: any = []
    let context = getContext();
    for(let config of httpConfig??[]){
        let prefix = config.prefix??(httpConfig.indexOf(config).toString());
        promises.push(
            (async () => {
                context?.log("- add one config for http -");
                logger.info("- add one config for http -");
                let httpResources = {
                    certificate: null,
                    body: null,
                    headers: null,
                    code: null,
                } as HttpRequest;

                try {
                    const url = await getConfigOrEnvVar(config, "URL", prefix);
                    if (!url) {
                        throw new Error("- Please pass URL in your config file");
                    }

                    httpResources = await getDataHttp(url, config);

                } catch (e) {
                    logger.error("error in collectHttpData with the url: " + ((await getConfigOrEnvVar(config, "URL", prefix)) ?? null));
                    logger.error(e);
                }

                return { request: [httpResources] };
            })()
        );
    }
    const results = await Promise.all(promises);
    resources.push(...results);

    logger.info("- listing http resources done -");
    context?.log("- listing http resources done -");
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

import tls, { TLSSocket } from 'tls';
import { HttpRequest } from "../../models/http/request.models";
const URL = require('url')

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
            host: URL.parse(response.config.url!).hostname!,
            port: 443,
            socket: response.config.httpsAgent?.keepAliveSocket,
        }, () => {
            const cert = socket.getPeerCertificate();
            socket.end();
            resolve(cert);
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
        httpResources.ip = await dnsLookup(URL.parse(url).hostname!);
        httpResources.certificate = await getCertificateFromResponse(response);
        httpResources.delays = response?.delays;
    }catch(e){
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
