# Contributing to Kexa

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

<div id="forking-project"></div>

## **Forking project**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

<div id="adding-functionalities"></div>

## **Adding functionalities**
	
Each published addOn is free to set its own mandatory key values for its default.config configuration schema.
Our minimum values for any addOn are "rules". Keys such as "prefix", "name" and "description" are strongly recommended to maintain ease of use.

We've set up a system to facilitate the development of new features. This system is based on the "addOn" system. To develop a new feature, you don't need to know the whole project. You can develop additional services to collect additional data, among which you can make rules.

<br/>

<div id="gathering-data"></div>

## **Gathering data**

A file to collect data whose path will be "./Kexa/services/addOn". It is named as follows: [extension's name]Gathering.service.ts . The entry point for this file is a function named "collectData", which takes one arguments. The argument is a list containing all the configs for your addOn. This list corresponds to what you can find in the default.json file in the key that has the same name as your addOn. As additional information per item in the list, you have "ObjectNameNeed" which corresponds to the CategoryItem solicity in the rules set up. This helps you, to optimize your addOn and make faster, more targeted collections. The return format of this function is as shown in the following example. exemple :
	
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

The data format is the following for several reasons. The first list corresponds to the different subscriptions or accounts in a sector. To illustrate, in the case of a cloud provider such as Azure, we might need different identifiers to scan all our accounts, and each account scan result is an item in the list. The dictionaries in the main list correspond to your dictionary that you find relevant to create to identify the different resources of your addOn, in the rules this corresponds to your "objectName". Finally, the lowest-level lists correspond to the list of items collected by your addOn.

For project maintainability, we require addOn modules to contain a header to quickly identify certain information. It's also important to update this header according to the capabilities of your addOn. In fact, this header serves as a basis for checking the feasibility of certain rules. This header is a comment that must contain at least 2 pieces of information: the name of the module and the "categoryItems" you've included in your module. example for an "azureComplement" module: file name : azureComplementGathering.service.ts

```ts
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
	
<br/>

<div id="display-results"></div>

## **Display results**

The display data file has for name schema : [same extension's name]Display.service.ts, its path will be: "./Kexa/services/addOn/display". This file is used to display precise attributes of an object to quickly identify it in its environment. This return is done by returning a string, with the possibility of putting html in this sting. The function used as an entry point is named "propertyToSend". It takes 3 arguments. The first is a "Rules", and the relative path to the object definition is

![interface of a Rules](../Kexa/models/settingFile/rules.models.ts)

The second is an "any", corresponding to an object you've collected previously. Finally, the last element is a boolean, which you'll set to false by default. It corresponds to your obligation not to put html in your string. Example display file for an "azureComplement" module: file name : azureComplementGathering.service.ts

```ts
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

<br/>

<div id="save-results"></div>

## **Save results**

You can also add AddOns to save your data. These extensions are based on the same principle as Display AddOn. The Save AddOn file is named [extension name]Save.service.ts, and its path is "./Kexa/services/addOn/save". This file is used to store the scanned data in a specific location. No return is attempted. The function used as an entry point is called "save". It takes 2 arguments. The first is a "save", corresponding to :

![interface of a SaveConfig](../Kexa/models/export/config.models.ts)

But you can make your own by extends this interface.
The second is a table of ResultScan:

![interface of a resultScan](../Kexa/models/resultScan.models.ts)

example of fresh template of save addOn:

![fresh template of save addOn](../config/freshTemplatesAddOn/XXXSave.service.ts)

<br/>

<div id="export-gather"></div>

## **Export gather**

You can also add AddOns to export your data. These extensions are based on the same principle as Save AddOn. The Exportation AddOn file is named [extension name]Exportation.service.ts, and its path is "./Kexa/services/addOn/exportation". This file is used to store the scanned data in a specific location. No return is attempted. The function used as an entry point is called "exportation". It takes 2 arguments. The first is a "save", corresponding to :

![interface of a SaveConfig](../Kexa/models/export/config.models.ts)

But you can make your own by extends this interface.
The second is a ProviderResource:

![interface of a ProviderResource](../Kexa/models/providerResource.models.ts)

example of fresh template of exportation addOn:

![fresh template of exportation addOn](../config/freshTemplatesAddOn/XXXExportation.service.ts)

<br/>

<div id="tests"></div>

## **Tests**

We've set up some tests you can use to validate the integration of your addOn:

```shell
npm run test
```

Other checks are carried out at various stages to validate the integration of your addOn and the rules you can design. However, these checks are only carried out during software execution. Indeed, due to the nature of certain data collections, it is not possible to carry out "cold" tests without having access to dedicated environments.