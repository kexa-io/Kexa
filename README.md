[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<div align="center" id="top">

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


# <div align="center" id="about-project">**About Project**</div>
<br/>

We have built Kexa to automatize verifications across your working environments (cloud, workspace, APIs endpoints), with a easy-to-deploy script that will allow you to optimize your costs, conformity and security.

Kexa is flexible in the way it is deployed, and can be quickly incorporated into CI/CDs or pipeline to guarantee the integrity of your workflow on a hight frequency check. It can be deployed as a script, that can run in Azure functions, AWS lambdas, and others serverless computing services. A [Docker image](https://hub.docker.com/r/innovtech/kexa) is available, as well as a [github action](https://github.com/4urcloud/Kexa_githubAction) Kexa repository.

Clone the repository, follow our [setup guide](documentation/Documentation-Kexa.md) or the [quick launch](#quick-launch), setup the rules you want to verify from the already available rules file, or build your own.

Run it and get all the available optimizations with the different notification tools (logs, mail, sms, webhook, Teams, and more incoming with generics tools)

With Kexa, you can [edit your own rules](documentation/Documentation-Kexa.md#rules-fields) and retrieve rules or even addons [built by the community](documentation/Documentation-Kexa.md#community-addons).


# <div align="center" id="quick-launch">**Quick Launch**</div>
<br/>

For a quick launch, we're going to use Docker. If you can't use Docker you can refer to [this documention](documentation/Documentation-Kexa.md) to try Kexa.

Create a folder called "config" and create a "default.json" file inside this folder. This file will be populated according to the provider you want to test, as follows.

Don't forget to modify "Absolute/Path/To/config" with the absolute path to your config folder (ex: "C:\Users\MyUser\Documents\Kubernetes" in windows). Obviously, the credentials you supply must have read rights on the environments you want to scan.
<br/>
Click on the provider you want to fast try:

<details>
<summary>Azure</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<details>
<summary>AWS</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<details>
<summary>GCP</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<br/>
For more addons, please refer to the respective documentations.
     <ul>
        <li><a href="documentation/Github.md">Github</a></li>
        <li><a href="documentation/Kubernetes.md">Kubernetes</a></li>
        <li><a href="documentation/O365.md">Office 365</a></li>
        <li><a href="documentation/GoogleWorkspace.md">Google Workspace</a></li>
      </ul>

# <div align="center" id="results-explanation">**Results Explanation**</div>
<br/>

Once a scan has been performed, you can observe the results at the locations you have specified in your [rules files](./documentation/Documentation-Kexa.md#rules-editing). In addition to the notification locations you have set up, by default a html files of scan results for each rule file has been created. In the case of a quick-launch, your results will be displayed in logs + output files by default.

I'm going to show the result of a ruler scan with HTML rendering. The name of this file follow this type format : "./config/resources[Name of the rule][Date as : 'YYYYMMDDHHmm'].html". In our case our scan rule is "Security" :
<img alt="Render HTML of security scan" src="./images/Exemple_Scan_Security_html.png" height="800"/>

The summary sheet groups together all the different error levels, from info to critical error. Then, for each of the rules present in this rule file, we have all the rules that are not respected, as well as the resources that go against them. In this example, we only have github repos that don't respect our rules. Each resource has a clickable link whenever possible, as well as a few keywords to identify which resources are being referred to.

The same syntax applies to logs:
<img alt="Render HTML of security scan" src="./images/Exemple_Scan_Security.png"/>
<p align="right">(<a href="#top">back to top</a>)</p>

# <div align="center" id="rules-usage">**Rules Usage**</div>
<br/>

Kexa offers significant benefits in a number of areas, contributing to the efficiency and reliability of your environment. You can define rules with YAML (.yaml) files, that you will store in your Kexa 'rules' folder, located in the Kexa root folder.

You can then launch a scan, Kexa will retrieve resource's information from the required sources (providers or others online services supported by addons), and apply the rules you defined.

All issues will be reported following the [notification configuration](documentation/Documentation-Kexa.md#directory-notifications) you've set.


The rules editing section in [full documentation](documentation/Documentation-Kexa.md) will present you the main areas where our tool add value, with and examples of YAML rules.
If you want explanations and details about rules in Kexa, please refer to [this section](documentation/Documentation-Kexa.md#rules-editing) in the full documentation.
<p align="right">(<a href="#top">back to top</a>)</p>

# <div align="center" id="roadmap">**Roadmap**</div>
<br/>

<details>
<summary>All Achievements</summary>

<details>
<summary>Azure check-in</pre></summary>

- ✅ virtual machine (vm)
- ✅ resource group (rg)
- ✅ disk
- ✅ network security group (nsg)
- ✅ virtual network (virtualNetwork)
- ✅ IP
- ✅ namespaces (namespaces)
- ✅ pods
- ✅ AKS
</details>

<details>
  <summary>Github check-in</summary>

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
</details>

<details>
<summary>Kubernetes check-in</summary>

- ✅ namespaces
- ✅ pods
- ✅ Helm
</details>

<details>
<summary>AWS</summary>

- ✅ EC2 Instance (ec2Instance)
- ✅ EC2 Volume (ec2Volume)
- ✅ EC2 Security group (ec2SG)
- ✅ Relational Database Service (RDS)
- ✅ Resource Groups (resourceGroups)
- ✅ Tags (tagsValue)
- ✅ Elastic Container Service CLUSTER (ecsCluster)
- ✅ Elastic Container Repository (ecrRepository)
</details>

<details>
<summary>HTTP and HTTPS request</summary>

<details>
<summary>request</summary>

   - ✅ certificate
   - ✅ body
   - ✅ headers
   - ✅ http code (code)
   - ✅ latency
</details>

</details>

<details>
<summary>GCP</summary>

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
</details>

<details>
<summary>Google Workspace</summary>

- ✅ user
- ✅ domain
- ✅ group
- ✅ role
- ✅ orgaunit
- ✅ calendar
- ✅ drive
- ✅ file
</details>

<details>
<summary>O365</summary>

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
</details>

</details>
Next steps:

- [ ] Kexa SaaS
- [ ] VM Ware
- [ ] OVH
- [ ] Databases

If you would like additional functionality, please send us your request. : <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
<p align="right">(<a href="#top">back to top</a>)</p>

# <div align="center" id="license">**License**</div>
<br/>

Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt) for more information just [here](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt).


# <div align="center" id="contact">**Contact**</div>
<br/>

[contact@4urcloud.com](mailto:contact@4urcloud.com)

Project Link: [https://github.com/4urcloud/Kexa](https://github.com/4urcloud/Kexa) Public site: [Kexa.io](https://github.com/4urcloud/Kexa/blob/rework-documentation/documentation/www.kexa.io)
<p align="right">(<a href="#top">back to top</a>)</p>

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
