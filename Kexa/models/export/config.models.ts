export interface SaveConfig {
    type: string;
    urlName: string;
    name?: string;
    description?: string;
    origin?: string;
    tags?: {[key: string]: string};
    onlyErrors?: boolean;
}