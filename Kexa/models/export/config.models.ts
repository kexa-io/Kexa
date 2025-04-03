export interface SaveConfig {
    type: string;
    urlName: string;
    prefix?: string;
    name?: string;
    description?: string;
    origin?: string;
    tags?: {[key: string]: string};
    onlyErrors?: boolean;
}