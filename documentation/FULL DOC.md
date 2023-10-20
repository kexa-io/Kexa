
# **GLOBAL CONFIGURATION**


In the Kexa config folder, edit the default.json (create it if it doesn't exist)

## **Basic configuration**

Here you can define the providers you want to retrieve data from, and for each one, which rules
file you want to check.
- You can find the available providers name for this in /enum/provider.enum.ts
- The 'rules' field is mandatory to specify the rules to be applied to each environment.

```yaml
{
  "azure": [
    {
      "name": "MyAzureSubscription",
      "description": "First subscription description",
      "rules": [
        "Name of my rule"
      ]
    },
  ],
  "gcp": [
	  {
		"name": "MyGCPProject",
	    "description": "First project description",
	    "rules": [
		    "Name of my rule"
	    ]
	  }
  ]
}
```



## **Multiple environments provider prefix**

For every provider you can define multiple projects to make custom verifications for your  subscriptions.
Each projects in this list refers to a "subscription"/"environment". It's a good idea to give each project a name and a description, to make it easier to understand

 The 'prefix' field is optional, but you may need it if you want to have multiple authentication / variables for a provider. It corresponds to the environment index.
	This will allow you to identify the variables used to log on your different environment. ( if not specified, a default value will be assigned )
	- This attribute should be unique, unless you want to use the same identifiers more than once on several environments

```yaml
{
  "azure": [
    {
      "name": "Project A",
      "prefix": "PROJECTA_", #(if not specify it would have been: '0')
      "description": "First subscription (0) : Project A subscription",
      "rules": [
        "Name of my rule"
      ]
    },
    {
      "name": "Project B",
      "prefix": "PROJECTB_", #(if not specify it would have been: '1')
      "description": "Second subscription (1) : Project B subscription",
      "rules": [
        "Name of my rule",
        "Another rules"
      ]
    }
  ]
}
```


## **Regions**

	For Amazon Web Services and Google Cloud Provider (or other official addons using regions), you can choose to select specifics regions to check. 
	Without "regions" property (or empty "regions property), all the regions will be checked.

```yaml
{
  "aws": [
    {
      "name": "Project A",
      "prefix": "AWSPROJECTA_", #(if not specify it would have been: '0')
      "description": "First subscription (0) : Project A subscription",
      "rules": [
        "Name of my rule"
      ],
      "regions": [
        "us-east-1"
      ]
    }
  ],
  "gcp": [
    {
      "name": "Project B",
      "prefix": "GCPPROJECTB_", #(if not specify it would have been: '0')
      "description": "First subscription (0) : Project B subscription",
      "rules": [
        "Name of my rule",
        "Another rules"
      ],
      "regions": [
        "us-east1"
      ]
    }
  ]
}
```

# **ENVIRONMENT VARIABLE & AUTH** 

## **Directory & Notifications**

Specify a folder to store the rules files.
```
  RULESDIRECTORY=./Kexa/rules (default value)
```

Setup your notification tools. (for those selected in your rules files)
>email
```
 EMAILPORT=587
  EMAILHOST=smtp.sendgrid.net
  EMAILUSER=XXXXXXXXXXXXXX
  EMAILPWD=XXXXXXXXXXXXXXX
  EMAILFROM='"Kexa" <noreply@4urcloud.eu>'
```
> sms (with Twilio)
```
 SMSFROM='+00000000000'
  SMSACCOUNTSID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  SMSAUTHTOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## **Providers Authentications**

For each environment you want to test, you'll need to provide the environment variables needed to authenticate to it. For this you can refer to the addons section corresponding to each addon.

LIST LINK DOC ADDONS

An environment file is also available in our repository, with every official addon's needed variables.
You can use it by filling the field corresponding to the providers you want to authenticate to.

## **Password manager**

You can optionally use a key manager; for these variables no prefix are needed. Those variables does not refer to any specific environment, but simply to the runner space :

- Azure: To refer to your Key Vault add this following environement variable :
    
    ```
      AZUREKEYVAULTNAME=MyKeyVault
      AZURE_CLIENT_ID=XXXXXXXXXXXX
      AZURE_TENANT_ID=XXXXXXXXXXXX
      AZURE_CLIENT_SECRET=XXXXXXXX
    ```
    
    You can also use this combination with UAI (User Assigned Identities):
    
    ```
      AZUREKEYVAULTNAME=MyKeyVault
      USERAZUREIDENTITYID=XXXXXXXX
    ```
    
- AWS: To refer to your Key Vault add this following environement variable :
    
    ```
      AWS_SECRET_NAME=XXXXXXXXX
    ```
    
- GCP: To refer to your Key Vault add this following environment variable :
    
    ```
      GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_JSON_CRED
    ```


# **OFFICIAL ADDONS**

### **AWS**
quick catchphrase

- Link notre doc.md


### **GCP**
quick catchphrase

- Link notre doc.md


### **WORKSPACE**
quick catchphrase

- Link notre doc.md


### **O365**
quick catchphrase

- Link notre doc.md

# **COMMUNITY ADDONS**

## **Getting new addons**

To use a community addon, simply download the required {AddonName}Gathering.service.ts and {AddonName}Display.service.ts, and move them in the /services/addOn and /services/addOn/display folder in the Kexa root directory.

You will need to refer to the addOn documentation to get information about the required environment variable, gathered data or specific configuration fields.


## **Contributing** 

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!


## **Forking project**

	1. Fork the Project
	2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
	3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
	4. Push to the Branch (`git push origin feature/AmazingFeature`)
	5. Open a Pull Request


## **Adding functionalities**
	
	 Each published addOn is free to set its own mandatory key values for its default.config configuration schema.
	 Our minimum values for any addOn are "rules". Keys such as "prefix", "name" and "description" are strongly recommended to maintain ease of use.
	
	We've set up a system to facilitate the development of new features. This system is based on the "addOn" system. To develop a new feature, you don't need to know the whole project. You can develop additional services to collect additional data, among which you can make rules.


## **Gathering data**

	A file to collect data whose path will be "./Kexa/services/addOn". It is named as follows: [extension's name]Gathering.service.ts . The entry point for this file is a function named "collectData", which takes one arguments. The argument is a list containing all the configs for your addOn. The return format of this function is as shown in the following example. exemple :
	
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
	
	export async function collectData(myGlobalConfig: any[]){
	  //the type of myGlobalConfig is any but you can make an interface if you want
	
	  //insert your stuff here
	}
	
	//can add other function here
	```
	

## **Display data**

	The display data file a pour schema de nom : [same extension's name]Display.service.ts, its path will be: "./Kexa/services/addOn/display". This file is used to display precise attributes of an object to quickly identify it in its environment. This return is done by returning a string, with the possibility of putting html in this sting. The function used as an entry point is named "propertyToSend". It takes 3 arguments. The first is a "Rules", and the relative path to the object definition is
	
	```ts
	import { Rules } from "../../../models/settingFile/rules.models";
	```
	
	The second is an "any", corresponding to an object you've collected previously. Finally, the last element is a boolean, which you'll set to false by default. It corresponds to your obligation not to put html in your string. example for an "azureComplement" module: file name : azureComplementGathering.service.ts
	
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



## **Tests**

	We've set up some tests you can use to validate the integration of your addOn:
	
	```shell
	npm run test
	```
	
	Other checks are carried out at various stages to validate the integration of your addOn and the rules you can design. However, these checks are only carried out during software execution. Indeed, due to the nature of certain data collections, it is not possible to carry out "cold" tests without having access to dedicated environments.


# **HOW TO LAUNCH KEXA**

## **Local**

Use this command to launch scans:
```
npm run start
```



## **Local Docker**

Build the image
```shell
docker build -t kexa .
```

Or pull it from our repository [here](https://hub.docker.com/r/innovtech/kexa)
```
docker pull innovtech/kexa
```

Run the image
```shell
docker run -d kexa
```



## **Azure function**

To run the deployment commands, make sure that your "func" command is functional. If it is not, you can install it with this command:

```shell
npm i -g azure-functions-core-tools@4 --unsafe-perm true
```

Build your version

```shell
npm run build
```

To test azure function locally :

```shell
func start
```

To publish Kexa to your azure function

```shell
func azure functionapp publish [Name of your function app]
```



## **Kubernetes**

Build the image

```shell
docker build -t kexa .
```

create a yaml file named "kexa.yaml" such as:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: kexacronjob
  namespace: kexa
spec:
  schedule: "0 0 * * *"  # Planning for a daily run at midnight
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: Never
          containers:
          - name: mykexacontainer
            image: kexa:latest
            env:
              # all the environment variables needed by the container according to the previous example configuration
              - name: PROJECTA_SUBSCRIPTIONID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTA_AZURECLIENTID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTA_AZURETENANTID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTA_AZURECLIENTSECRET
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTB_SUBSCRIPTIONID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTB_AZURECLIENTID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTB_AZURETENANTID
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: PROJECTB_AZURECLIENTSECRET
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: EMAILPORT
                value: "587"
              - name: EMAILHOST
                value: smtp.sendgrid.net
              - name: EMAILUSER
                value: didier
              - name: EMAILPWD
                value: XXXXXXXXXXXXXXXXXXXXXXXXXXXX
              - name: EMAILFROM
                value: '"Kexa" <noreply@4urcloud.eu>'
```

create the namespace:

```shell
kubectl create namespace kexa
```

deploy it:

```shell
kubectl apply -f kexa.yaml
```

Checked that everything went smoothly :

```shell
kubectl get cronjob kexacronjob -n kexa
```

You're supposed to have something like:

```
NAME          SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
kexacronjob   0 0 * * *   False     0        <none>          3m33s
```


