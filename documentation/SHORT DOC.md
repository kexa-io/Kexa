

**EN-TÊTE**

1-**ABOUT PROJECT**

We have built Kexa to automatize verifications across your cloud environments (and more than cloud, like APIs endpoints), with a easy-to-deploy script that will allow you to optimize your costs, conformity and security.

Clone the repository, follow our setup guide (LINK HERE) or the quick launch (LINK HERE), setup the rules you want to verify from the already available rules file, or build your own.

Run it and get all the available optimizations with the different notification tools (logs, mail, sms, webhook, Teams, and more incoming with generic tool)

With Kexa, you can edit your own rules (LINK HERE) and retrieve rules or even addons built by the community.


2-**RULES  USAGE** 

Kexa offers significant benefits in a number of areas, contributing to the efficiency and reliability of your environment. You can define rules with YAML (.yaml) files, that you will store in your Kexa 'rules' folder, located in the Kexa root folder.

In this section, we will present you the main areas where our tool add value, with rules files explanations and examples about how to create custom rules (LINK HERE).

/// **Rules fields** ///

Here is the structure and required fields for a new rule :

```yaml
- name: string 
  # the name of the rule to set in your ./config/default.json
  description : string 
  # the description of the rule
  applied: boolean 
  # active or ignore this rule
  level: enum 
  # the warning level to trigger (defined in ./enum/level.enum.ts)
  cloudProvider: enum 
  # the target provider (defined in ./enum/provider.enum.ts)
  objectName : enum 
  # the target object name (defined in the ./models/[provider]/ressource.model.ts)
  conditions: # the list of criteria to match
	 - property : string 
	 # the object field name to check (you can see the objects fields by launching Kexa with -o option)
	- condition : enum 
	# the condition for this comparison (defined in ./enum/condition.enum.ts)
	- value : string 
	# the value to compare with (refer to the provider documentation)

	# add more criteria by starting a new '- property:' here #
```

You can also cross operations with logical operators :

```yaml
- name: string 
  description : string 
  applied: boolean 
  level: enum 
  cloudProvider: enum 
  objectName : enum 
  conditions:
   - operator : enum
   # the operator to apply accross criterias (defined in ./enum/operator.enum.ts)
      rules:
		- property : string 
		- condition : enum 
		- value : string 
		# first criteria
		- property : string 
		- condition : enum 
		- value : string
		# second criteria

		# add more criteria by starting a new '- property:' here #

	
```

With nested operations :

```yaml
- name: string 
  description : string 
  applied: boolean 
  level: enum 
  cloudProvider: enum 
  objectName : enum 
  conditions:
   - operator : enum
   # the operator to apply accross criterias (defined in ./enum/operator.enum.ts)
      rules:
		- property : string 
		- condition : enum 
		- value : string 
		# first criteria
		- property : string 
		- condition : enum 
		- value : # nested operation
			- operator: AND
			  rules:
				- property : string 
				- condition : enum 
				- value : string 
				# first criteria
				- property : string 
				- condition : enum 
				- value : string 
				# second criteria
		 
		# add more criteria by starting a new '- property:' here #

	
```

/// **Full Yaml rules file** ///

```yaml
- version: string
  # to indicate the version of this yaml (xxx.xxx.xxx)
  date: string
  # to indicate the date of this yaml (dd-mm-yyyy)
  alert:
  # area to create your custom notification
    info: # alert settings for info level (level 0)
      enabled: boolean
      # to enable or ignore entire rules file
      type:
        - enum
        - ...
      # add every type of notification you want (email|sms|webhook|log)
      to:
        - string
        - ...
      # add all the endpoint you need according to the type of notification you have
      # (for example : myemail@email.com or +3306070809)
    warn: # alert settings for warning level (level 1)
      enabled: boolean
      type:
        - enum
      to:
        - string
    error: # alert settings for error level (level 2)
      enabled: boolean
      type:
        - enum
      to:
        - string
    fatal: # alert settings for fatal level (level 3)
      enabled: boolean
      type:
        - enum
      to:
        - string
    global: # alert settings for the global sum up
      enabled: boolean
      type:
        - enum
      to:
        - string
      conditions:
      # condition for each level, how many is required before alerting
        - level: 0
          min: int
        - level: 1
          min: int
        - level: 2
          min: int
        - level: 3
          min: int
  rules: # the list of the rules, refer to the previous section explaining rules
	- name: string 
	# rule here #
	- name: string
	# rule here #
	
	# Add as much rules as you want by starting a new '-name' #
	
```


/// **Date & time criteria** ///

You can also set up date and time comparison for your rules, we have built a set of specific conditions and fields for this feature :

```yaml
property: string
condition: (
  DATE_EQUAL |
  DATE_SUP |
  DATE_INF |
  DATE_SUP_OR_EQUAL |
  DATE_INF_OR_EQUAL |
  INTERVAL |
  DATE_INTERVAL
)
value: 0 0 0 0 0 0 0
# time value to compare.
date: "YYYY-MM-DDThh:mm:ss.SSSZ"
# the format of the date you want to parse (the one used in the resource object field).
```

/// **Utility examples** ///

1. **Cost savings**

By automating the monitoring of your infrastructure's status and behaviour, our tool enables you to make significant savings. 
By detecting rule violations quickly, you can avoid the additional costs associated with prolonged problems and prevent costly malfunctions. 

For example, a rule for alerting if there is an orphan disk:
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

2. **Safety guarantee**

By defining specific security rules, you can constantly check that good practice is being followed and that your infrastructure is protected against potential threats.
The tool alerts you in the event of non-compliance, enabling you to take corrective action quickly and maintain a high level of security.

Example of rule to verify:

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

3. **Standardization**

Rules can help you to implement consistent operating standards. This makes it easier to manage your entire environment and helps you maintain a stable, predictable infrastructure.

By standardizing configurations and behaviors, you reduce the risk of human error and unforeseen malfunctions.

Exemple of rule to normalise names among tags:

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
        value : [DEV | NPR | PROD]
      - property : tags.author
        condition : DIFFERENT
        value : NULL
      - property : tags.billing
        condition : REGEX
        value : ^(VADOR|YODA|LUKE)$
```

4. **Community**

Our infrastructure health check tool promotes a community-based approach that encourages collaboration and knowledge exchange between users.

One of the key features of our tool is its flexibility, allowing users to customize and adjust the rules to suit their specific needs. The rules are easily shared using simple YAML files, making it easy to spread best practice and innovative ideas.

Whether you want to check specific elements of your infrastructure or take a more general approach, the possibilities are endless. Everyone is free to design and share their own use cases, providing a wealth of resources for the community as a whole.

////////////////////////////////////
//         **QUICK LAUNCH**          //
////////////////////////////////////

For a quick launch, we're going to use docker.

Create a folder called "config" and create a "default.json" file inside this folder. This file will be populated according to the provider you want to test, as follows.

Don't forget to modify "Absolute/Path/To/config" with the absolute path to your config folder. Obviously, the tokens you supply must have read rights on the environments you want to scan.

Azure
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

AWS
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

GCP
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

Github
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

Kubernetes
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

Office 365
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

///////////////////////////////////////////////
//          **EXPLANATION RESULTS**          //
//////////////////////////////////////////////

////////////////////////////////////
//               **ROADMAP**             //
////////////////////////////////////

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
- [ ]  Kexa SAAS

////////////////////////////////////
//               **LICENSE**             //
////////////////////////////////////

Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt) for more information just [here](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt).

////////////////////////////////////
//               **CONTACT**             //
////////////////////////////////////

[contact@4urcloud.com](mailto:contact@4urcloud.com)

Project Link: [https://github.com/4urcloud/Kexa](https://github.com/4urcloud/Kexa) Public site: [Kexa.io](https://github.com/4urcloud/Kexa/blob/rework-documentation/documentation/www.kexa.io)
