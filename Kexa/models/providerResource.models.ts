export interface ProviderResource {
    [provider: string]: Provider[];
}

export interface Provider {
    [key: string]: Resource[]; 
}

export interface Resource {
    [key: string]: any;
}