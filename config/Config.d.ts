/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    kubernetes: Kubernete[]
  }
  interface Kubernete {
    description: string
    prefix: string
    rules: string[]
  }
  export const config: Config
  export type Config = IConfig
}
