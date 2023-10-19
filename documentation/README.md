<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://www.kexa.io/">
    <img src="images/kexa-no-background-color.png" alt="Logo" width="100" height="100">
  </a>

# <h3 align="center">Kexa</h3>

  <p align="center">
    Generic alert tools to ensure the quality of your infrastructure. Avoid wasting money on useless infrastructure, avoidable security breaches and service malfunctions.
    <br />
    <a href="https://github.com/4urcloud/Kexa"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/4urcloud/Kexa">View Demo</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <ul>
          <li><a href="#clone-the-repo">Clone the repo</a></li>
          <li><a href="#install-NPM-packages">Install NPM packages</a></li>
          <li><a href="#configure-your-config">Configure your config</a></li>
          <li><a href="#configure-your-environnement-variable">Configure your variable environnement</a></li>
          <li><a href="#key-vault">Optional: Key Vault</a></li>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#how-to-launch-Kexa">How to launch Kexa</a>
      <ul>
        <li><a href="#quick-launch">Quick Launch</a></li>
        <li><a href="#local">Local</a></li>
        <li><a href="#local-docker">Local docker</a></li>
        <li><a href="#azure-function">Azure function</a></li>
        <li><a href="#kubernetes">Kubernetes</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#cost-saving">Cost saving</a></li>
        <li><a href="#safety-guarantee">Safety guarantee</a></li>
        <li><a href="#standardisation">Standardisation</a></li>
        <li><a href="#community">Community</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The Kexa tool is a powerful way to monitor and evaluate the behavior of your cloud environment, Kubernetes clusters and GitHub repositories. Using a series of YAML files, you can configure specific rules to check specific elements and properties. Kexa is an engine that allows you to add any APIsable service or sdk you want in order to extend its compliance capacity as far as possible.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [![NodeJs][NodeJs.com]][NodeJs-url]

optional : 

* [![Docker][Docker.com]][Docker-url]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

List of things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

#### Clone the repo
   ```sh
   git clone https://github.com/4urcloud/Kexa.git
   ```
#### Install NPM packages
  Then move to the directory you have just cloned:
   ```sh
   npm install
   ```

#### Add local module need to build

Command to be executed as administrator in the case of WSL or linux
```sh
npm install rimraf -g
npm install typescript
```

#### Configure your config:

  In the config folder, create a file if not already exist: 'default.json' and the path is "./config/default.json" to inform the providers you want to test and the rules that will be applied to them. Each key at the root of the json refers to the provider you wish to use. In the following example, we wish to use only "azure". Each item in this list refers to a "subscription"/"environment". It's a good idea to give each item a name and a description, to make it easier to understand. The "rules" key is mandatory to specify the rules to be applied to each environment. Finally, a key called "prefix" will allow you to identify the variables used to log on to the environment among your environment variables or your secret manager. The attribute of this value should preferably be unique, unless you want to use the same identifiers more than once on several environments. If you haven't specified a prefix, a default value is assigned. It corresponds to the environment index.
In addition, we've standardized the config schema of the official addons we've published. Each published addOn is free to set its own mandatory key values. Our minimum values for any addOn are "rules". Keys such as "prefix", "name" and "description" are strongly recommended to maintain ease of use.
  The file will have the following format : 
  __Azure config exemple__
  ```js
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
  

  For Amazon Web Services and Google Cloud Provider, you can choose to select specifics regions in your config to avoid checking all regions if it's not in your needs. Without "regions" property (or empty "regions property), all the regions will be checked.
  __An other config exemple__
  ```js
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

<p align="right">(<a href="#top">back to top</a>)</p>

#### Configure your environnement variable

- Minumum Environnement variables you need, if you want to specify a folder to store rules: 
    ```
      RULESDIRECTORY=./Kexa/rules (default value)
    ```
  - add the following variables for each type of notification you have use in your rules, they will be used to identify yourself to your notification tools:
    - [email](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key):
      ```
        EMAILPORT=587
        EMAILHOST=smtp.sendgrid.net
        EMAILUSER=didier
        EMAILPWD=XXXXXXXXXXXXXXX
        EMAILFROM='"Kexa" <noreply@4urcloud.eu>'
      ```
    - [sms with twilio](https://www.twilio.com/docs/iam/keys/api-key):
      ```
        SMSFROM='+00000000000'
        SMSACCOUNTSID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SMSAUTHTOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      ```

  Add the following variables for each provider you want to test preceded by the prefix mentioned in the previous section. For each environment you want to test, you'll need to provide the environment variables needed to authenticate to it. Be careful when creating your credentials so that they have read access to your environment. :
  - [Azure](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal):
    ```
      SUBSCRIPTIONID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
      AZURECLIENTID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX	(ID of an Azure AD application)
      AZURETENANTID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX	(ID of the application's Azure AD tenant)
      AZURECLIENTSECRET=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX	(one of the application's client secrets)
    ```
    If you are runnning your Kexa in a azure function you can also use this with [UAI (User Assigned Identities)](https://learn.microsoft.com/en-us/azure/active-directory/workload-identities/workload-identity-federation-create-trust-user-assigned-managed-identity):
    ```
      AZUREKEYVAULTNAME=MyKeyVault
      USERAZUREIDENTITYID=XXXXXXXX
    ```
  - [GitHub](https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens):
    ```
      GITHUBTOKEN=github_pat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    ```
  - Kubernetes:
    ```
      KUBECONFIG="./Path/to/my/config.yml"
    ```
  - [AWS](https://docs.aws.amazon.com/singlesignon/latest/userguide/howtogetcredentials.html):
    ```
      AWSACCESSKEYID
      AWSSECRETACCESSKEY
    ```
  - [GCP](https://developers.google.com/workspace/guides/create-credentials):
    ```
      GOOGLE_APPLICATION_CREDENTIALS (id your google json credential)
      GOOGLE_PROJECT_ID (ID of a gcp project)
    ```
  - HTTP:
    at least you must add this following var :
    ```
      URL=https://www.kexa.io
      METHOD=GET
    ```
    You can optionally add this variable to add more context:
    ```
      AUTHORIZATION=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLZXhhIiwiaWF0IjoxNjkxNzY1MTUwLCJleHAiOjE5MTI2MDMzMzAsImF1ZCI6Ind3dy5rZXhhLmlvIiwic3ViIjoiZXN0ZWJhbi5tYXRoaWFAc3VwaW5mby5jb20iLCJtZXNzYWdlIjoiRsOpbGljaXRhdGlvbiB0dSBhcyBkw6ljb3V2ZXJ0IGxlIG1lc3NhZ2UgY2FjaMOpLCBlbnZvaWUgbW9pIHVuIHBldGl0IG1lc3NhZ2UifQ.tOT5jPHngkXgjGoJsedxk9mQx3wWr_ENusX_Ab2zs1s
      header:{"content-type":"application/json"}
      body:{"name": "Toto"}
    ```
  
  Before each of this variable you must add a prefix which indicates to which "environment" this refers. The default prefix is the index in the provider's config (we start counting from zero).
  Example of my environnement variable for __Azure config exemple__ previously show : 
  ```
    PROJECTA_SUBSCRIPTIONID=XXXXXXXXXXXXXXXXXXXXX
    PROJECTA_AZURECLIENTID =XXXXXXXXXXXXXXXXXXXXX
    PROJECTA_AZURETENANTID=XXXXXXXXXXXXXXXXXXXXXX
    PROJECTA_AZURECLIENTSECRET=XXXXXXXXXXXXXXXXXX
    PROJECTB-SUBSCRIPTIONID=XXXXXXXXXXXXXXXXXXXXX
    PROJECTB-AZURECLIENTID =XXXXXXXXXXXXXXXXXXXXX
    PROJECTB-AZURETENANTID=XXXXXXXXXXXXXXXXXXXXXX
    PROJECTB-AZURECLIENTSECRET=XXXXXXXXXXXXXXXXXX
  ```

##### Password manager

  You can optionally use a key manager; for these variables no prefix must be set. The prefix is not mandatory, as it does not refer to any specific environment, but simply to the runner space :
  - Azure:
    To refer to your Key Vault add this following environnement variable :
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
  - AWS:
    To refer to your Key Vault add this following environnement variable :
    ```
      AWS_SECRET_NAME=XXXXXXXXX
    ```
  - GCP:
    To refer to your Key Vault add this following environnement variable :
    ```
      GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_JSON_CRED
    ```


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- How to launch -->
## How to launch Kexa

Whichever way you want to launch Kexa, you need to go through the configuration phase. Except if you use a quick launch configuration, with this way you only need your credential

<div id="quick-launch"></div>

### Quick launch

For a quick launch, we're going to use docker.
To do this, create a folder called "config", for example.
In this folder, create a "default.json" file.
This file will be populated according to the provider you want to test, as follows.
Don't forget to modify "Absolute/Path/To/config" with the absolute path to your config folder.
Obviously, the tokens you supply must have read rights on the environments you want to scan.

<details>
  <summary>Azure</summary>
  default.json:  

~~~json
  {
      "azure": [
          {
              "name": "Project A",
              "prefix": "A_",
              "description": "Project A is a quick-launch test",
              "rules": [
                  "Economy",
                  "OperationalExcellence",
                  "Security",
                  "rules-testing",
                  "Performance"
              ]
          }
      ]
  }
~~~
<p>Then paste this command fill with your credential: </p>

~~~bash
  docker run -v Absolute/Path/To/config:/app/config /
  -e A_AZURECLIENTID="" /
  -e A_AZURETENANTID="" /
  -e A_AZURECLIENTSECRET="" /
  -e A_SUBSCRIPTIONID="" /
  innovtech/kexa
~~~
</details>

<details>
<summary>AWS</summary>
default.json: 

~~~json
{
  "aws": [
      {
          "name": "Project A",
          "prefix": "A_",
          "description": "Project A is a quick-launch test",
          "rules": [
              "Economy",
              "OperationalExcellence",
              "Security",
              "rules-testing",
              "Performance"
          ]
      }
  ]
}
~~~
<p>Then paste this command fill with your credential: </p>

~~~bash
  docker run -v Absolute/Path/To/config:/app/config /
  -e A_AWS_SECRET_NAME= /
  -e A_AWS_REGION= /
  -e A_AWS_ACCESS_KEY_ID= /
  -e A_AWS_SECRET_ACCESS_KEY= /
  innovtech/kexa
~~~
</details>

<details>
<summary>GCP</summary>
default.json: 

~~~json
  {
      "gcp": [
          {
              "name": "Project A",
              "prefix": "A_",
              "description": "Project A is a quick-launch test",
              "rules": [
                  "Economy",
                  "OperationalExcellence",
                  "Security",
                  "rules-testing",
                  "Performance"
              ]
          }
      ]
  }
~~~
<p>Then paste this command fill with your credential: </p>

~~~bash
docker run -v Absolute/Path/To/config:/app/config /
-e A_GOOGLE_APPLICATION_CREDENTIALS= '{ /
        "type": "service_account", /
        "project_id": "", /
        "private_key_id": "", /
        "private_key": "-----BEGIN PRIVATE KEY----- -----END PRIVATE KEY-----\n", /
        "client_email": "", /
        "client_id": "", /
        "auth_uri": "", /
        "token_uri": "", /
        "auth_provider_x509_cert_url": "", /
        "client_x509_cert_url": "", /
        "universe_domain": "googleapis.com" /
      }'/
-e A_GOOGLE_PROJECT_ID= /
innovtech/kexa
~~~
</details>

<details>
        <summary>Github</summary>
        default.json: 

~~~json
          {
              "github": [
                  {
                      "name": "Project A",
                      "prefix": "A_",
                      "description": "Project A is a quick-launch test",
                      "rules": [
                          "Economy",
                          "OperationalExcellence",
                          "Security",
                          "rules-testing",
                          "Performance"
                      ]
                  }
              ]
          }
~~~

<p>Then paste this command fill with your credential: </p>

~~~bash
        docker run -v Absolute/Path/To/config:/app/config /
        -e A_GITHUBTOKEN= /
        innovtech/kexa
~~~
</details>

<details>
        <summary>Kubernetes</summary>
        default.json:

~~~json
{
    "kubernetes": [
        {
            "name": "Project A",
            "prefix": "A_",
            "description": "Project A is a quick-launch test",
            "rules": [
                "Economy",
                "OperationalExcellence",
                "Security",
                "rules-testing",
                "Performance"
            ]
        }
    ]
}
~~~

<p>Then paste this command fill with your credential: </p>

~~~bash
docker run -v Absolute/Path/To/config:/app/config /
-v Absolute/Path/To/.kube:/app/.kube /
-e A_KUBECONFIG="/app/.kube" /
innovtech/kexa
~~~
</details>

<details>
        <summary>Office 365</summary>
        default.json: 

~~~json
          {
              "o365": [
                  {
                      "name": "Project A",
                      "prefix": "A_",
                      "description": "Project A is a quick-launch test",
                      "rules": [
                          "Economy",
                          "OperationalExcellence",
                          "Security",
                          "rules-testing",
                          "Performance"
                      ]
                  }
              ]
          }
~~~

<p>Then paste this command fill with your credential: </p>

~~~bash
        docker run -v Absolute/Path/To/config:/app/config /
        -e A_AZURE_CLIENT_ID= /
        -e A_AZURE_TENANT_ID= /
        -e A_AZURE_CLIENT_SECRET= /
        -e A_SUBSCRIPTIONID= /
        innovtech/kexa
~~~
</details>

<div id="local"></div>

### Local

Use this command to launch scans:

```bash
npm run start
```

<div id="local-docker"></div>

### Local docker

Build the image
```bash
docker build -t kexa .
```

Or pull it from our repository [here](https://hub.docker.com/r/innovtech/kexa)
```
docker pull innovtech/kexa
```

Run the image
```bash
docker run -d kexa
```

<div id="azure-function"></div>

### Azure function

To run the deployment commands, make sure that your "func" command is functional. If it is not, you can install it with this command:
```bash
npm i -g azure-functions-core-tools@4 --unsafe-perm true
``` 

Build your version
```bash
npm run build
```

To test azure function locally :
```bash
func start
```

To publish Kexa to your azure function
```bash
func azure functionapp publish [Name of your function app]
```

### Kubernetes

Build the image
```bash
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

```bash
kubectl create namespace kexa
```

deploy it:

```bash
kubectl apply -f kexa.yaml
```

Checked that everything went smoothly :

```bash
kubectl get cronjob kexacronjob -n kexa
```

You're supposed to have something like: 
```
NAME          SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
kexacronjob   0 0 * * *   False     0        <none>          3m33s
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Kexa offers significant benefits in a number of areas, contributing to the efficiency and reliability of your environment. Here are the main areas where the tool adds value :

### Utility

<div id="cost-saving"></div>

1. **Cost savings**

By automating the monitoring of your infrastructure's status and behaviour, our tool enables you to make significant savings. By detecting rule violations quickly, you can avoid the additional costs associated with prolonged problems and prevent costly malfunctions. For example, the tool will alert you to unallocated disks or ips.

example of rules for alerting in the event of an orphan disk:

```
- name: "azure-disk-orphan"
  description : "this rules is to check if disk is orphan"
  applied: true
  level: 1 #warn
  cloudProvider: azure
  objectName : disk
  conditions:
    - property : diskState
      condition : DIFFERENT
      value : Unattached
```

<div id="safety-guarantee"></div>

2. **Safety guarantee**

The security of your infrastructure is paramount, and our tool enables you to ensure constant and rigorous monitoring. By defining specific security rules, you can constantly check that good practice is being followed and that your infrastructure is protected against potential threats. The tool alerts you immediately in the event of non-compliance, enabling you to take corrective action quickly and maintain a high level of security.

exemple of rule to verify:

```
- name: azure-disk not public or encrypted
  description : "this rules is to check if disk is either not public or encrypted by default"
  applied: true
  level: 2
  cloudProvider: azure
  objectName : disk
  conditions:
    - operator : OR
      rules:
        - property : networkAccessPolicy
          condition : DIFFERENT
          value : AllowAll
        - property : encryption.type
          condition : EQUAL
          value : EncryptionAtRestWithPlatformKey
```

<div id="standardisation"></div>

3. **Standardisation**

Using our tool, you can standardise the behaviour and status of your infrastructure. Pre-defined or customised rules help you to implement consistent operating standards. This makes it easier to manage your entire environment and helps you maintain a stable, predictable infrastructure. By standardising configurations and behaviour, you reduce the risk of human error and unforeseen malfunctions.

exemple of rule to normalise names among tags:
```
  - name: check-tags-on-aks-cluster
    description : "this rules is to check if aks cluster are conform to the tag norms"
    applied: true
    level: 2
    cloudProvider: azure
    objectName : aks
    conditions:
      - property : tags.environment
        condition : REGEX
        value : ^(DEV|NPR|PROD)$
      - property : tags.author
        condition : DIFFERENT
        value : NULL
      - property : tags.billing
        condition : REGEX
        value : ^(VADOR|YODA|LUKE)$
```

<div id="community"></div>

4. **Community**

Our infrastructure health check tool promotes a community-based approach that encourages collaboration and knowledge exchange between users. One of the key features of our tool is its flexibility, allowing users to customise and adjust the rules to suit their specific needs. The rules are easily shared using simple YAML files, making it easy to spread best practice and innovative ideas.

Our tool provides a learning and sharing space where users can collaborate to create monitoring rules for specific use cases. Whether you want to check specific elements of your infrastructure or take a more general approach, the possibilities are endless. Everyone is free to design and share their own use cases, providing a wealth of resources for the community as a whole.

<p align="right">(<a href="#top">back to top</a>)</p>

### How to create Yaml file

```yml
- version: /^[0-9]+\.[0-9]+\.[0-9]+$/
  #to indicate the version of this yaml
  date: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/
  #to indicate the date of this yaml
  alert:
  #area to create your custom notification
    info:
    #alert for info (level 0)
      enabled: ^(true|false)$
      #to enable it
      type:
      #add every type of notification you want
        - ^(email|sms|webhook|log)$
      to:
      #add all the endpoint you need according to the type of notification you have
        - string
    warn:
    #alert for warn (level 1)
      enabled: ^(true|false)$
      type:
        - ^(email|sms|webhook|log)$
      to:
        - string
    error:
    #alert for error (level 2)
      enabled: ^(true|false)$
      type:
        - ^(email|sms|webhook|log)$
      to:
        - string
    fatal:
    #alert for fatal (level 3)
      enabled: ^(true|false)$
      type:
        - ^(email|sms|webhook|log)$
      to:
        - string
    global:
    #alert for the sum up
      enabled: ^(true|false)$
      type:
        - ^(email|sms|webhook|log)$
      to:
        - string
      conditions:
      #condition is for each level, how many is required before have the sum up
        - level: 0
          min: int
        - level: 1
          min: int
        - level: 2
          min: int
        - level: 3
          min: int
  rules:
    - name: string
      description: string
      applied: ^(true|false)$
      level: ^(0|1|2|3)$
      cloudProvider: ^(
          azure|
          git|
          aws|
          kubernetes|
          gcp|
          http
        )$
      objectName: ^(
          vm|
          rg|
          disk|
          nsg|
          virtualNetwork|
          ip|
          namespaces|
          pods|
          helm|
          aks|
          repositories|
          branches|
          issues|
          ip|
          PublicIp|
          ec2Instance|
          ec2Volume|
          ec2SG|
          rds|
          resourceGroups|
          tagsValue|
          ecsCluster|
          ecrRepository|
          request
        )$
      conditions: 
        - object -> RulesConditions | ParentRules
```

RulesConditions :
```yml
property: string
condition: ^(
  EQUAL|
  DIFFERENT|
  INCLUDE|
  NOT_INCLUDE|
  INCLUDE_NOT_SENSITIVE|
  NOT_INCLUDE_NOT_SENSITIVE|
  SUP|
  INF|
  SUP_OR_EQUAL|
  INF_OR_EQUAL|
  STARTS_WITH|
  NOT_STARTS_WITH|
  ENDS_WITH|
  NOT_ENDS_WITH|
  REGEX
  ALL|
  NOT_ANY|
  SOME|
  ONE|
  COUNT|
  COUNT_SUP|
  COUNT_INF|
  COUNT_SUP_OR_EQUAL|
  COUNT_INF_OR_EQUAL|
  DATE_EQUAL |
  DATE_SUP |
  DATE_INF |
  DATE_SUP_OR_EQUAL |
  DATE_INF_OR_EQUAL |
  INTERVAL |
  DATE_INTERVAL
)$
value: int|string|RulesConditions|ParentRules
#date is the format of the date you want to parse. For example:
date?: "YYYY-MM-DDThh:mm:ss.SSSZ"
```

ParentRules :
```yml
name: string
description: string
operator: ^(AND|OR|XOR|NAND|NOR|XNOR|NOT)$
rules: 
  - object -> RulesConditions | ParentRules
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

* :white_check_mark: Setting notification levels
* :white_check_mark: Azure check in:
  * :white_check_mark: virtual machine (vm)
  * :white_check_mark: resource groupe (rg)
  * :white_check_mark: disk
  * :white_check_mark: network security groupe (nsg)
  * :white_check_mark: virtual network (virtualNetwork)
  * :white_check_mark: ip
  * :white_check_mark: namespaces (namespaces)
  * :white_check_mark: pods
  * :white_check_mark: aks
* :white_check_mark: Github check in:
  * :white_check_mark: repositories
  * :white_check_mark: branches
  * :white_check_mark: issues
  * :white_check_mark: organizations
  * :white_check_mark: members
  * :white_check_mark: teams
  * :white_check_mark: teamProjects
  * :white_check_mark: teamMembers
  * :white_check_mark: teamRepositories
  * :white_check_mark: outsideCollaborators
* :white_check_mark: Kubernetes check in:
  * :white_check_mark: namespaces
  * :white_check_mark: pods
  * :white_check_mark: helm
* :white_check_mark: AWS :
  * :white_check_mark: EC2 Instance (ec2Instance)
  * :white_check_mark: EC2 Volume (ec2Volume)
  * :white_check_mark: EC2 Security group (ec2SG)
  * :white_check_mark: Relational Database Service (rds)
  * :white_check_mark: Resource Groups (resourceGroups)
  * :white_check_mark: Tags (tagsValue)
  * :white_check_mark: Elastic Container Service CLUSTER (ecsCluster)
  * :white_check_mark: Elastic Container Repository(ecrRepository)
* :white_check_mark: HTTP and HTTPS request
  * :white_check_mark: request
    * :white_check_mark: certificate
    * :white_check_mark: body
    * :white_check_mark: headers
    * :white_check_mark: http code(code)
* :white_check_mark: GCP
  * :white_check_mark: tasks_queue
  * :white_check_mark: compute
  * :white_check_mark: storage
  * :white_check_mark: project
  * :white_check_mark: billingAccount
  * :white_check_mark: cluster
  * :white_check_mark: workflows
  * :white_check_mark: websecurity
  * :white_check_mark: connector
  * :white_check_mark: vmware-engine
  * :white_check_mark: namespace
  * :white_check_mark: certificate
  * :white_check_mark: secret
  * :white_check_mark: connectivity_test
  * :white_check_mark: resource_settings
  * :white_check_mark: redis_instance
  * :white_check_mark: os_config
  * :white_check_mark: org_policy_constraint
  * :white_check_mark: airflow_image_version
  * :white_check_mark: disk
  * :white_check_mark: compute_item
* :white_check_mark: Google Workspace
  * :white_check_mark: user
  * :white_check_mark: domain
  * :white_check_mark: group
  * :white_check_mark: role
  * :white_check_mark: orgaunit
  * :white_check_mark: calendar
  * :white_check_mark: drive
  * :white_check_mark: file
* :white_check_mark: O365
  * :white_check_mark: sku
  * :white_check_mark: user
  * :white_check_mark: domain
  * :white_check_mark: secure_score
  * :white_check_mark: auth_methods
  * :white_check_mark: organization
  * :white_check_mark: directory
  * :white_check_mark: sp
  * :white_check_mark: alert
  * :white_check_mark: incident
  * :white_check_mark: app_access_policy
* [ ] OVH
* [ ] VM Ware
* [ ] Postgres
* [ ] SQL
* [ ] Mysql/MariaDB
* [ ] Oracle

See the [open issues](https://github.com/4urcloud/Kexa/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

### How to add new functionality ?

We've set up a system to facilitate the development of new features. This system is based on the "addOn" system. To develop a new feature, you don't need to know the whole project. You can develop additional services to collect additional data, among which you can make rules.

To create an addOn, you'll need to create 2 files. 


#### Gathering Data

A file to collect data whose path will be "./Kexa/services/addOn". It is named as follows: [extension's name]Gathering.service.ts . The entry point for this file is a function named "collectData", which takes one arguments. The argument is a list containing all the configs for your addOn. The return format of this function is as shown in the following example. 
exemple :
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

For project maintainability, we require addOn modules to contain a header to quickly identify certain information. It's also important to update this header according to the capabilities of your addOn. In fact, this header serves as a basis for checking the feasibility of certain rules.
This header is a comment that must contain at least 2 pieces of information: the name of the module and the "categoryItems" you've included in your module.
example for an "azureComplement" module:
file name : azureComplementGathering.service.ts
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
<p align="right">(<a href="#top">back to top</a>)</p>

#### Display data

The display data file a pour schema de nom : [same extension's name]Display.service.ts, its path will be: "./Kexa/services/addOn/display". This file is used to display precise attributes of an object to quickly identify it in its environment. This return is done by returning a string, with the possibility of putting html in this sting. The function used as an entry point is named "propertyToSend". It takes 3 arguments. The first is a "Rules", and the relative path to the object definition is
```ts
import { Rules } from "../../../models/settingFile/rules.models";
```
The second is an "any", corresponding to an object you've collected previously.
Finally, the last element is a boolean, which you'll set to false by default. It corresponds to your obligation not to put html in your string.
example for an "azureComplement" module:
file name : azureComplementGathering.service.ts
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

<p align="right">(<a href="#top">back to top</a>)</p>

#### Test

We've set up some tests you can use to validate the integration of your addOn:
```bash
npm run test
```

Other checks are carried out at various stages to validate the integration of your addOn and the rules you can design. However, these checks are only carried out during software execution. Indeed, due to the nature of certain data collections, it is not possible to carry out "cold" tests without having access to dedicated environments.



<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt) for more information just [here](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

contact@4urcloud.com

Project Link: [https://github.com/4urcloud/Kexa](https://github.com/4urcloud/Kexa)
Public site: [Kexa.io](www.kexa.io)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/4urcloud/Kexa.svg?style=for-the-badge
[contributors-url]: https://github.com/4urcloud/Kexa/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/4urcloud/Kexa.svg?style=for-the-badge
[forks-url]: https://github.com/4urcloud/Kexa/network/members
[stars-shield]: https://img.shields.io/github/stars/4urcloud/Kexa.svg?style=for-the-badge
[stars-url]: https://github.com/4urcloud/Kexa/stargazers
[issues-shield]: https://img.shields.io/github/issues/4urcloud/Kexa.svg?style=for-the-badge
[issues-url]: https://github.com/4urcloud/Kexa/issues
[license-shield]: https://img.shields.io/github/license/4urcloud/Kexa.svg?style=for-the-badge
[license-url]: https://github.com/4urcloud/Kexa/blob/master/LICENSE.txt
[NodeJs-url]:https://nodejs.org/en
[NodeJs.com]:https://img.shields.io/badge/Nodejs-3c873a?style=for-the-badge&logo=node.js&logoColor=white
[Docker-url]:https://www.docker.com/
[Docker.com]:https://img.shields.io/badge/DOCKER-2596be?style=for-the-badge