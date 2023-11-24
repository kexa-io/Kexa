/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    azure: Azure[]
  }
  interface Azure {
    description: string
    rules: string[]
  }
  export const config: Config
  export type Config = IConfig
}
