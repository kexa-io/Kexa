/*
    * Provider : http
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - request
*/

import dns from 'dns';
import { HttpResources } from "../../models/http/resource.model";
import { Logger } from "tslog";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { HttpConfig } from "../../models/http/config.models";
import { isEmpty } from "../../helpers/isEmpty";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const jsome = require('jsome');
jsome.level.show = true;

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode = Number(process.env.DEBUG_MODE)??3;

const config = require('config');
const httpConfig = (config.has('http'))?config.get('http'):null;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "HttpLogger" });

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING HTTP RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData() {
    let resources = new Array<HttpResources>();
    let promises = []
    logger.info("- loading client http -");
    for(let config of httpConfig??[]){
        promises.push(
            (async () => {
                let httpResources = {
                    certificate: null,
                    body: null,
                    headers: null,
                    code: null,
                } as HttpRequest;
    
                try {
                    const url = await getConfigOrEnvVar(config, "URL", httpConfig.indexOf(config) + "-");
    
                    if (!url) {
                        throw new Error("- Please pass URL in your config file");
                    }
    
                    httpResources = await getDataHttp(url, config);
    
                } catch (e) {
                    logger.error("error in collectHttpData with the url: " + ((await getConfigOrEnvVar(config, "URL", httpConfig.indexOf(config) + "-")) ?? null));
                    logger.error(e);
                }
    
                return { request: [httpResources] };
            })()
        );
    }
    const results = await Promise.all(promises);
    resources.push(...results);

    logger.info("- listing http resources done -");
    return resources??null;
}

async function getHeader(config: HttpConfig): Promise<Record<string, string>|null>{
    let authorization = await getConfigOrEnvVar(config, "AUTHORIZATION", httpConfig.indexOf(config)+"-");
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
    let method = await getConfigOrEnvVar(config, "METHOD", httpConfig.indexOf(config)+"-");
    let header = await getHeader(config);
    let body = getBody(config);
    if(!header) return await makeHttpRequest<any>(method, url, body);
    return await makeHttpRequest<any>(method, url, body, header);
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
    }catch(e){
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
