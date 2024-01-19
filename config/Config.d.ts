/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    kubernetes: Kubernete[]
    http: Http[]
    save: Save[]
    export: Export[]
  }
  interface Export {
    type: string
    urlName: string
    collectionName: string
  }
  interface Save {
    type: string
    urlName: string
    collectionName: string
    onlyErrors: boolean
  }
  interface Http {
    description: string
    prefix: string
    rules: string[]
    URL: string
  }
  interface Kubernete {
    description: string
    prefix: string
    rules: string[]
  }
  export const config: Config
  export type Config = IConfig
}
