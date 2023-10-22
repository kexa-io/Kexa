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
  <summary>Table of Contents (Presentation & Quick launch)</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#quick-launch">Quick Launch</a>
      <ul>
        <li><a href="#azure">Azure</a></li>
        <li><a href="#aws">AWS</a></li>
        <li><a href="#gcp">GCP</a></li>
        <li><a href="#github">Github</a></li>
        <li><a href="#kubernetes">Kubernetes</a></li>
        <li><a href="#office-365">Office 365</a></li>
        <li><a href="#google-workspace">Google Workspace</a></li>
      </ul>
    </li>
    <li>
      <a href="#results-explanation">Results Explanation</a>
    </li>
    <li>
      <a href="#rules-usage">Rules Usage</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br/><br/><br/>
# <div align="center">**About Project**</div>
<br/><br/>

We have built Kexa to automatize verifications across your working environments (cloud, workspace, APIs endpoints), with a easy-to-deploy script that will allow you to optimize your costs, conformity and security.

Clone the repository, follow our [setup guide](documentation/Documentation-Kexa.md) or the [quick launch](#quick-launch), setup the rules you want to verify from the already available rules file, or build your own.

Run it and get all the available optimizations with the different notification tools (logs, mail, sms, webhook, Teams, and more incoming with generics tools)

With Kexa, you can [edit your own rules](documentation/Documentation-Kexa.md#rules-fields) and retrieve rules or even addons [built by the community](documentation/Documentation-Kexa.md#rules-fields).

<br/><br/><br/>
# <div align="center">**Quick Launch**</div>
<br/><br/>

For a quick launch, we're going to use docker.

Create a folder called "config" and create a "default.json" file inside this folder. This file will be populated according to the provider you want to test, as follows.

Don't forget to modify "Absolute/Path/To/config" with the absolute path to your config folder. Obviously, the tokens you supply must have read rights on the environments you want to scan.

<br/>

### Azure
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	  docker run -v Absolute/Path/To/config:/app/config /
	  -e A_AZURECLIENTID="" /
	  -e A_AZURETENANTID="" /
	  -e A_AZURECLIENTSECRET="" /
	  -e A_SUBSCRIPTIONID="" /
	  innovtech/kexa
	```
<br/>

### AWS
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	  docker run -v Absolute/Path/To/config:/app/config /
	  -e A_AWS_SECRET_NAME= /
	  -e A_AWS_REGION= /
	  -e A_AWS_ACCESS_KEY_ID= /
	  -e A_AWS_SECRET_ACCESS_KEY= /
	  innovtech/kexa
	```
<br/>

### GCP
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
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
	```
<br/>

### Github
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	        docker run -v Absolute/Path/To/config:/app/config /
	        -e A_GITHUBTOKEN= /
	        innovtech/kexa
	```
<br/>

### Kubernetes
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	docker run -v Absolute/Path/To/config:/app/config /
	-v Absolute/Path/To/.kube:/app/.kube /
	-e A_KUBECONFIG="/app/.kube" /
	innovtech/kexa
	```
<br/>

### Office 365
default.json:
	
	```json
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	        docker run -v Absolute/Path/To/config:/app/config /
	        -e A_AZURE_CLIENT_ID= /
	        -e A_AZURE_TENANT_ID= /
	        -e A_AZURE_CLIENT_SECRET= /
	        -e A_SUBSCRIPTIONID= /
	        innovtech/kexa
	```

### Google Workspace
default.json:
	
	```json
	          {
	              "googleWorkspace": [
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
	```
	
	Then paste this command fill with your credential:
	
	```shell
	        docker run -v Absolute/Path/To/config:/app/config /
	        -e A_WORKSPACECRED= (the credentials.json content) /
	        innovtech/kexa
	```

<br/><br/><br/>
# <div align="center">**Results Explanation**</div>
<br/><br/>

<br/><br/><br/>
# <div align="center">**Rules Usage**</div>
<br/><br/>

Kexa offers significant benefits in a number of areas, contributing to the efficiency and reliability of your environment. You can define rules with YAML (.yaml) files, that you will store in your Kexa 'rules' folder, located in the Kexa root folder.

You can then launch a scan, Kexa will retrieve resource's information from the required sources (providers or others online services supported by addons), and apply the rules you defined.

All issues will be reported following the [notification configuration](documentation/Documentation-Kexa.md#directory--notifications) you've set.


The rules editing section in [full documentation](documentation/Documentation-Kexa.md) will present you the main areas where our tool add value, with and examples of YAML rules.
If you want explanations and details about rules in Kexa, please refer to [this section](documentation/Documentation-Kexa.md#div-aligncenter-rules-editing-div) in the full documentation.

<br/><br/>

<br/><br/><br/>
# <div align="center">**Roadmap**</div>
<br/><br/>

- ✅ Setting notification levels
- ✅ Azure check in:
    - ✅ virtual machine (vm)
    - ✅ resource groupe (rg)
    - ✅ disk
    - ✅ network security groupe (nsg)
    - ✅ virtual network (virtualNetwork)
    - ✅ ip
    - ✅ namespaces (namespaces)
    - ✅ pods
    - ✅ aks
- ✅ Github check in:
    - ✅ repositories
    - ✅ branches
    - ✅ issues
    - ✅ organizations
    - ✅ members
    - ✅ teams
    - ✅ teamProjects
    - ✅ teamMembers
    - ✅ teamRepositories
    - ✅ outsideCollaborators
- ✅ Kubernetes check in:
    - ✅ namespaces
    - ✅ pods
    - ✅ helm
- ✅ AWS :
    - ✅ EC2 Instance (ec2Instance)
    - ✅ EC2 Volume (ec2Volume)
    - ✅ EC2 Security group (ec2SG)
    - ✅ Relational Database Service (rds)
    - ✅ Resource Groups (resourceGroups)
    - ✅ Tags (tagsValue)
    - ✅ Elastic Container Service CLUSTER (ecsCluster)
    - ✅ Elastic Container Repository(ecrRepository)
- ✅ HTTP and HTTPS request
    - ✅ request
        - ✅ certificate
        - ✅ body
        - ✅ headers
        - ✅ http code(code)
- ✅ GCP
    - ✅ tasks_queue
    - ✅ compute
    - ✅ storage
    - ✅ project
    - ✅ billingAccount
    - ✅ cluster
    - ✅ workflows
    - ✅ websecurity
    - ✅ connector
    - ✅ vmware-engine
    - ✅ namespace
    - ✅ certificate
    - ✅ secret
    - ✅ connectivity_test
    - ✅ resource_settings
    - ✅ redis_instance
    - ✅ os_config
    - ✅ org_policy_constraint
    - ✅ airflow_image_version
    - ✅ disk
    - ✅ compute_item
- ✅ Google Workspace
    - ✅ user
    - ✅ domain
    - ✅ group
    - ✅ role
    - ✅ orgaunit
    - ✅ calendar
    - ✅ drive
    - ✅ file
- ✅ O365
    - ✅ sku
    - ✅ user
    - ✅ domain
    - ✅ secure_score
    - ✅ auth_methods
    - ✅ organization
    - ✅ directory
    - ✅ sp
    - ✅ alert
    - ✅ incident
    - ✅ app_access_policy
- [ ]  OVH
- [ ]  VM Ware
- [ ]  Postgres
- [ ]  SQL
- [ ]  Mysql/MariaDB
- [ ]  Oracle
- [ ] Kexa SAAS

<br/><br/><br/>
# <div align="center">**License**</div>
<br/><br/>

Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt) for more information just [here](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt).

<br/><br/><br/>
# <div align="center">**Contact**</div>
<br/><br/>

[contact@4urcloud.com](mailto:contact@4urcloud.com)

Project Link: [https://github.com/4urcloud/Kexa](https://github.com/4urcloud/Kexa) Public site: [Kexa.io](https://github.com/4urcloud/Kexa/blob/rework-documentation/documentation/www.kexa.io)
