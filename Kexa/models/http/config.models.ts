import type { Config } from "../settingFile/config.models";

export interface HttpConfig extends Config {
    header?: { [key: string]: string };
    body?: any;
    url: string[]|string;
    /** Opt-in only: skip TLS certificate validation for this target (e.g. an
     * internal endpoint with a self-signed certificate). Defaults to false --
     * certificates are verified unless a config explicitly disables it. */
    insecureTLS?: boolean;
}