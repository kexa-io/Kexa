# Contributing to Kexa

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag `enhancement`. Don't forget to give the project a star! Thanks again!

<br/>

<div id="table-of-contents"></div>

## Table of Contents

- [Contributing to Kexa](#contributing-to-kexa)
  - [Table of Contents](#table-of-contents)
  - [**Getting Started**](#getting-started)
    - [**Prerequisites**](#prerequisites)
  - [**Forking project**](#forking-project)
    - [Code Style](#code-style)
    - [Branches](#branches)
  - [**Adding functionalities**](#adding-functionalities)
    - [**Gathering data**](#gathering-data)
    - [**Display results**](#display-results)
    - [**Save results**](#save-results)
    - [**Export gather**](#export-gather)
  - [Core engine](#core-engine)
    - [src/](#src)
    - [Services (src/services)](#services-srcservices)
    - [Helpers (src/models)](#helpers-srcmodels)
    - [Models (src/models)](#models-srcmodels)
    - [Enumerations (src/enumerations/)](#enumerations-srcenumerations)
  - [**Security Guidelines**](#security-guidelines)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [**Tests**](#tests)

<br/>

<div id="getting-started"></div>

## **Getting Started**

### **Prerequisites**

- Bun

## **Forking project**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the coding style used in the project.
- Use meaningful variable and function names.

### Branches

- Use `main` for stable code.
- Create feature branches for new features.
- Create bugfix branches for

## **Adding functionalities**

Each published addOn is free to set its own mandatory key values for its `default.config` configuration schema.

Our minimum values for any addOn are `rules`. Keys such as `prefix`, `name` and `description` are strongly recommended to maintain ease of use.

We've set up a system to facilitate the development of new features. This system is based on the `addOn` system. To develop a new feature, you don't need to know the whole project. You can develop additional services to collect additional data, among which you can make rules.

### **Gathering data**

A file to collect data whose path will be `./Kexa/services/addOn`. It is named as follows: `[extension's name]Gathering.service.ts`.

The entry point for this file is a function named "collectData", which takes one argument. The argument is a list containing all the configs for your addOn. This list corresponds to what you can find in the `default.json` file in the key that has the same name as your addOn.

As additional information per item in the list, you have "ObjectNameNeed" which corresponds to the CategoryItem solicity in the rules set up. This helps you, to optimize your addOn and make faster, more targeted collections. The return format of this function is as shown in the following example.

Example :

```json
[
  {
    "categoryItem1": [
      {},
      {},
      {}
    ],
    "categoryItem2": [
      {},
      {}
    ]
  },
  {
    "categoryItem1": [
      {}
    ],
    "categoryItem2": [
      {},
      {},
      {}
    ]
  }
]
```

The data format is the following for several reasons. The first list corresponds to the different subscriptions or accounts in a sector. To illustrate, in the case of a cloud provider such as Azure, we might need different identifiers to scan all our accounts, and each account scan result is an item in the list. The dictionaries in the main list correspond to your dictionary that you find relevant to create to identify the different resources of your addOn, in the rules this corresponds to your `objectName`. Finally, the lowest-level lists correspond to the list of items collected by your addOn.

For project maintainability, we require addOn modules to contain a header to quickly identify certain information. It's also important to update this header according to the capabilities of your addOn. In fact, this header serves as a basis for checking the feasibility of certain rules. This header is a comment that must contain at least 2 pieces of information: the name of the module and the `categoryItems` you've included in your module.

Example for an `azureComplement` module, the file name will be `azureComplementGathering.service.ts`.

```typescript
/*
    * Provider : azure
    * Creation date : 2023-08-14
    * Note : Important note for understand what's going on here
    * Resources :
    *    - secretManager
    *    - SP
    *    - azFunction
*/

export async function collectData(myAddonConfig: any[]){
  //the type of myAddonConfig is "any" but you can make an interface if you want

  //insert your stuff here
}

//can add other function here
```

### **Display results**

The display data file has for name schema : `[same extension's name]Display.service.ts`, its path will be: `./Kexa/services/addOn/display`. This file is used to display precise attributes of an object to quickly identify it in its environment.

This return is done by returning a string, with the possibility of putting html in this sting. The function used as an entry point is named `propertyToSend`. It takes 3 arguments.

The first is a `Rules`, and the relative path to the object definition is `"../../../models/settingFile/rules.models"`.

The second is an "any", corresponding to an object you've collected previously.

Finally, the last element is a boolean, which you'll set to false by default. It corresponds to your obligation not to put html in your string.

```typescript
import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
    //you can also use a switch on rule.objectName to perform a specific return for each type of objectName you create with your addOn
    //it is advisable to make a default return to cover all possible cases.
    if (isSms)
        return `Id : `+ objectContent?.id + `https://portal.azure.com/#@/resource/` + objectContent?.id
    else
        return `Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a>`
}

//can add other function here
```

### **Save results**

You can also add AddOns to save your data. These extensions are based on the same principle as Display AddOn. The Save AddOn file is named `[extension name]Save.service.ts`, and its path is `"./Kexa/services/addOn/save"`. This file is used to store the scanned data in a specific location. No return is attempted. The function used as an entry point is called "save". It takes 2 arguments. 

The first is a "save", corresponding to [SaveConfig interface](./Kexa/models/export/config.models.ts). But you can make your own by extends this interface.

The second is a table of [ResultScan interface](./Kexa/models/resultScan.models.ts).

If you want to see an example of [fresh template of save addOn](./config/freshTemplatesAddOn/XXXSave.service.ts).

### **Export gather**

You can also add AddOns to export your data. These extensions are based on the same principle as Save AddOn. The Exportation AddOn file is named [extension name]Exportation.service.ts, and its path is "./Kexa/services/addOn/exportation". This file is used to store the scanned data in a specific location. No return is attempted. The function used as an entry point is called "exportation". It takes 2 arguments.

The first is a [SaveConfig interface](./Kexa/models/export/config.models.ts). But you can make your own by extends this interface.

The second is a [ProviderResource interface](./Kexa/models/providerResource.models.ts).

If you want to see an example of [fresh template of exportation addOn](./config/freshTemplatesAddOn/XXXExportation.service.ts).

## Core engine

If you'd like to contribute to extending or updating Kexa's core engine, here are a few explanations and guidelines to help you collaborate on the project.

### src/

This is the main source code directory. It contains all the core functionalities and services of the project.

### Services (src/services)

The "/services" folder contain all files related to the gathering, exportation, alerting and saving addons. It also contain services related to the environment managing.

If you need to add a new service, ensure to isolate each service in a specific file, or folder if the service need a file for each addon for example.

### Helpers (src/models)

Helpers are small functions that are used across the project, the file must have only one explicit functionnality to avoid importing useless functions. (you can have multiple function in one file, but ensure it make sense to not seperate them)

### Models (src/models)

The models folder contains all the class definitions for addons. This is where you define the structure and behavior of different addons.

### Enumerations (src/enumerations/)

This folder contains enumeration definitions used throughout the project. Enumerations are a way to define a set of named values, which can be used to represent a collection of related constants.

## **Security Guidelines**

Security is important when contributing. Please adhere to the following guidelines to ensure the security of the project and its users:

**Data Protection:**

Never hardcode sensitive information such as API keys, passwords, or other secrets.
Retrieve credentials from environment and keyvaults (priority).
Do not store any sensitive data.

**Dependency Management:**

Keep dependencies up to date to ensure that security patches are applied.
Use only trusted and well-maintained libraries and frameworks.
Avoid using deprecated or unmaintained dependencies.

**Secure Coding Practices:**

Review the code for potential security vulnerabilities before submitting a pull request.
Be cautious with the use of third-party code and ensure it complies with the project's security standards.

**Authentication and Authorization:**

Use the offical SDK and APIs from cloud providers and follow their authentication flows and instructions.
Never require write permissions from providers.

**Reporting Security Issues:**

If you discover a security vulnerability, please follow the guidelines in "/SECURITY.md"

## Suggesting Enhancements

We welcome suggestions for new features or improvements. Please open an issue to discuss your idea before implementing it.

## **Tests**

We've set up some tests you can use to validate the integration of your addOn:

```bash
bun test
```

Other checks are carried out at various stages to validate the integration of your addOn and the rules you can design. However, these checks are only carried out during software execution. Indeed, due to the nature of certain data collections, it is not possible to carry out "cold" tests without having access to dedicated environments.
