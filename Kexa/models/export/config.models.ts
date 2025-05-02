export interface SaveConfig {
    type: string;
    urlName: string;
    prefix?: string;
    name?: string;
    token?: string;
    description?: string;
    origin?: string;
    tags?: {[key: string]: string};
    onlyErrors?: boolean;
}