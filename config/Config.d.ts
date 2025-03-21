/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    azure: Azure[]
    gcp: Azure[]
    variable: Variable
  }
  interface Variable {
    "azure-tags-check": Azuretagscheck
  }
  interface Azuretagscheck {
    var1: string
    var2: Var2
    var3: boolean
    var4: number
  }
  interface Var2 {
    "var2.1": string
    "var2.2": string
  }
  interface Azure {
    description: string
    prefix: string
    rules: string[]
  }
  export const config: Config
  export type Config = IConfig
}
