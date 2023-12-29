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
Kexa, your ally in multi-cloud compliance management, simplifies compliance on platforms such as Azure, Google, Amazon and more.<br><br>
With simple, intuitive rules, even non-experts can guarantee the security of their cloud environments. Kexa, an Open Source tool, offers real-time monitoring, instantly alerting to any deviation from defined rules.<br><br>
Its detailed reports facilitate compliance analysis, ensuring complete visibility of the state of the infrastructure. Scalable and integrable, Kexa adapts to the evolution of your infrastructure and connects easily to your existing tools.<br><br>
Turn complexity into simplicity with Kexa, ensuring unrivalled security and turning compliance into a competitive advantage.
    <br />
    <a href="https://github.com/4urcloud/Kexa/blob/main/documentation/Documentation-Kexa.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
<a class="github-button" href="https://github.com/4urcloud/Kexa/issues" data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light_high_contrast;" data-icon="octicon-issue-opened" data-size="large" aria-label="Issue 4urcloud/Kexa on GitHub">Report Bug</a>
    ·
<a class="github-button" href="https://github.com/4urcloud/Kexa/discussions" data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light_high_contrast;" data-icon="octicon-comment-discussion" data-size="large" aria-label="Discuss 4urcloud/Kexa on GitHub">Request Feature</a>
	·
<a class="github-button" href="https://github.com/4urcloud/Kexa" data-color-scheme="no-preference: dark_high_contrast; light: dark_high_contrast; dark: light_high_contrast;" data-icon="octicon-star" data-size="large" aria-label="Star 4urcloud/Kexa on GitHub">Put Star</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents (Presentation & Quick launch)</summary>
  <ol>
    <li>
      <a href="#about-project">About Project</a>
	  <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
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

# <div align="center" id="about-project">**About Project**</div>
<br/>

We have built Kexa to automatize verifications across your working environments (cloud, workspace, APIs endpoints), with a easy-to-deploy script that will allow you to optimize your costs, conformity and security.

It can be deployed as a script, [Docker](https://hub.docker.com/r/innovtech/kexa) or [github action](https://github.com/4urcloud/Kexa_githubAction). Kexa is flexible in the way it is deployed, and can be quickly incorporated into CI/CDs or pipeline to guarantee the integrity of your workflow on a hight frequency check.

Clone the repository, follow our [setup guide](documentation/Documentation-Kexa.md) or the [quick launch](#quick-launch), setup the rules you want to verify from the already available rules file, or build your own.

Run it and get all the available optimizations with the different notification tools (logs, mail, sms, webhook, Teams, and more incoming with generics tools)

With Kexa, you can [edit your own rules](documentation/Documentation-Kexa.md#rules-fields) and retrieve rules or even addons [built by the community](documentation/Documentation-Kexa.md#community-addons).

### Built With

* [![NODE][NODE-shield]](https://nodejs.org/fr)

# <div align="center" id="quick-launch">**Quick Launch**</div>
<br/>

For a quick launch, we're going to use docker. If you can't use docker you can refer to [this documention](documentation/Documentation-Kexa.md) to try Kexa. However, we have a powershell script to initialize all resources and credentials if you want to get Kexa up and running quickly such as :
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/4urcloud/Kexa/dev/initKexa.ps1" -OutFile "./initKexa.ps1"; & "./initKexa.ps1" -d -c
#answer all question to setup

#dont forget to get [nodejs](https://nodejs.org/en/download) to launch Kexa:
npm i
npm run start
```

From any folder, create a folder called "config" and create a "default.json" file inside this folder. This file will be populated according to the provider you want to test, as follows.

Don't forget to modify "Absolute/Path/To/config" with the absolute path to your config folder (ex: "C:\Users\MyUser\Documents\Kubernetes" in windows). Obviously, the credentials you supply must have read rights on the environments you want to scan.

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

<details>
<summary>Github</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<details>
<summary>Kubernetes</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<details>
<summary>Office 365</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

<details>
<summary>Google Workspace</summary>

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
<p align="right">(<a href="#top">back to top</a>)</p>
</details>

# <div align="center" id="results-explanation">**Results Explanation**</div>
<br/>

Once a scan has been performed, you can observe the results at the locations you have specified in your [rules files](./documentation/Documentation-Kexa.md#rules-editing). In addition to the notification locations you have set up, by default a html files of scan results for each rule file has been created. In the case of a quick-launch, your results will be displayed in logs + output files by default.
Those html files can be found in your /output folder by default. To change your default folder, add the environment variable: "OUTPUT" with the path to your folder.

I'm going to show the result of a ruler scan with HTML rendering. The name of this file follow this type format : "./output/resources/[Name of the rule]/[Date as : 'YYYYMMDDHHmm'].html". In our case our scan rule is "Security" :
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

- ✅ Setting notification levels

<div class='spliter_code'></div>

- ✅ Aws check in:
    - ✅ ec2Instance
    - ✅ ec2SG
    - ✅ ec2Volume
    - ✅ rds
    - ✅ resourceGroup
    - ✅ tagsValue
    - ✅ ecsCluster
    - ✅ ecrRepository
- ✅ Azure check in:
    - ✅ vm
    - ✅ rg
    - ✅ disk
    - ✅ nsg
    - ✅ virtualNetwork
    - ✅ networkInterfaces
    - ✅ aks
    - ✅ mlWorkspace
    - ✅ mlJobs
    - ✅ mlComputes
    - ✅ mlSchedule
    - ✅ ResourceManagementClient.operations
    - ✅ ResourceManagementClient.deployments
    - ✅ ResourceManagementClient.providers
    - ✅ ResourceManagementClient.providerResourceTypes
    - ✅ ResourceManagementClient.resources
    - ✅ ResourceManagementClient.resourceGroups
    - ✅ ResourceManagementClient.tagsOperations
    - ✅ ResourceManagementClient.deploymentOperations
    - ✅ SubscriptionClient.operations
    - ✅ SubscriptionClient.subscriptions
    - ✅ SubscriptionClient.tenants
    - ✅ SqlManagementClient.dataMaskingPolicies
    - ✅ SqlManagementClient.dataMaskingRules
    - ✅ SqlManagementClient.geoBackupPolicies
    - ✅ SqlManagementClient.databases
    - ✅ SqlManagementClient.elasticPools
    - ✅ SqlManagementClient.serverCommunicationLinks
    - ✅ SqlManagementClient.serviceObjectives
    - ✅ SqlManagementClient.elasticPoolActivities
    - ✅ SqlManagementClient.elasticPoolDatabaseActivities
    - ✅ SqlManagementClient.serverUsages
    - ✅ SqlManagementClient.databaseAdvisors
    - ✅ SqlManagementClient.databaseAutomaticTuningOperations
    - ✅ SqlManagementClient.databaseColumns
    - ✅ SqlManagementClient.databaseRecommendedActions
    - ✅ SqlManagementClient.databaseSchemas
    - ✅ SqlManagementClient.databaseSecurityAlertPolicies
    - ✅ SqlManagementClient.databaseTables
    - ✅ SqlManagementClient.databaseVulnerabilityAssessmentRuleBaselines
    - ✅ SqlManagementClient.databaseVulnerabilityAssessments
    - ✅ SqlManagementClient.databaseVulnerabilityAssessmentScans
    - ✅ SqlManagementClient.dataWarehouseUserActivitiesOperations
    - ✅ SqlManagementClient.deletedServers
    - ✅ SqlManagementClient.elasticPoolOperations
    - ✅ SqlManagementClient.encryptionProtectors
    - ✅ SqlManagementClient.failoverGroups
    - ✅ SqlManagementClient.firewallRules
    - ✅ SqlManagementClient.instancePools
    - ✅ SqlManagementClient.jobAgents
    - ✅ SqlManagementClient.jobCredentials
    - ✅ SqlManagementClient.jobExecutions
    - ✅ SqlManagementClient.jobs
    - ✅ SqlManagementClient.jobStepExecutions
    - ✅ SqlManagementClient.jobSteps
    - ✅ SqlManagementClient.jobTargetExecutions
    - ✅ SqlManagementClient.jobTargetGroups
    - ✅ SqlManagementClient.jobVersions
    - ✅ SqlManagementClient.capabilities
    - ✅ SqlManagementClient.longTermRetentionPolicies
    - ✅ SqlManagementClient.maintenanceWindowOptionsOperations
    - ✅ SqlManagementClient.maintenanceWindowsOperations
    - ✅ SqlManagementClient.managedBackupShortTermRetentionPolicies
    - ✅ SqlManagementClient.managedDatabaseColumns
    - ✅ SqlManagementClient.managedDatabaseQueries
    - ✅ SqlManagementClient.managedDatabaseSchemas
    - ✅ SqlManagementClient.managedDatabaseSecurityAlertPolicies
    - ✅ SqlManagementClient.managedDatabaseSecurityEvents
    - ✅ SqlManagementClient.managedDatabaseTables
    - ✅ SqlManagementClient.managedDatabaseTransparentDataEncryption
    - ✅ SqlManagementClient.managedDatabaseVulnerabilityAssessmentRuleBaselines
    - ✅ SqlManagementClient.managedDatabaseVulnerabilityAssessments
    - ✅ SqlManagementClient.managedDatabaseVulnerabilityAssessmentScans
    - ✅ SqlManagementClient.managedInstanceAdministrators
    - ✅ SqlManagementClient.managedInstanceAzureADOnlyAuthentications
    - ✅ SqlManagementClient.managedInstanceEncryptionProtectors
    - ✅ SqlManagementClient.managedInstanceKeys
    - ✅ SqlManagementClient.managedInstanceLongTermRetentionPolicies
    - ✅ SqlManagementClient.managedInstanceOperations
    - ✅ SqlManagementClient.managedInstancePrivateEndpointConnections
    - ✅ SqlManagementClient.managedInstancePrivateLinkResources
    - ✅ SqlManagementClient.managedInstanceTdeCertificates
    - ✅ SqlManagementClient.managedInstanceVulnerabilityAssessments
    - ✅ SqlManagementClient.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies
    - ✅ SqlManagementClient.managedServerSecurityAlertPolicies
    - ✅ SqlManagementClient.operations
    - ✅ SqlManagementClient.privateEndpointConnections
    - ✅ SqlManagementClient.privateLinkResources
    - ✅ SqlManagementClient.recoverableManagedDatabases
    - ✅ SqlManagementClient.restorePoints
    - ✅ SqlManagementClient.serverAdvisors
    - ✅ SqlManagementClient.serverAutomaticTuningOperations
    - ✅ SqlManagementClient.serverAzureADAdministrators
    - ✅ SqlManagementClient.serverAzureADOnlyAuthentications
    - ✅ SqlManagementClient.serverDevOpsAuditSettings
    - ✅ SqlManagementClient.serverDnsAliases
    - ✅ SqlManagementClient.serverKeys
    - ✅ SqlManagementClient.serverOperations
    - ✅ SqlManagementClient.serverSecurityAlertPolicies
    - ✅ SqlManagementClient.serverTrustGroups
    - ✅ SqlManagementClient.serverVulnerabilityAssessments
    - ✅ SqlManagementClient.sqlAgent
    - ✅ SqlManagementClient.subscriptionUsages
    - ✅ SqlManagementClient.syncAgents
    - ✅ SqlManagementClient.syncGroups
    - ✅ SqlManagementClient.syncMembers
    - ✅ SqlManagementClient.tdeCertificates
    - ✅ SqlManagementClient.timeZones
    - ✅ SqlManagementClient.virtualNetworkRules
    - ✅ SqlManagementClient.workloadClassifiers
    - ✅ SqlManagementClient.workloadGroups
    - ✅ SqlManagementClient.backupShortTermRetentionPolicies
    - ✅ SqlManagementClient.databaseExtensionsOperations
    - ✅ SqlManagementClient.databaseOperations
    - ✅ SqlManagementClient.databaseUsages
    - ✅ SqlManagementClient.ledgerDigestUploadsOperations
    - ✅ SqlManagementClient.outboundFirewallRules
    - ✅ SqlManagementClient.usages
    - ✅ SqlManagementClient.longTermRetentionBackups
    - ✅ SqlManagementClient.longTermRetentionManagedInstanceBackups
    - ✅ SqlManagementClient.restorableDroppedManagedDatabases
    - ✅ SqlManagementClient.serverConnectionPolicies
    - ✅ SqlManagementClient.distributedAvailabilityGroups
    - ✅ SqlManagementClient.serverTrustCertificates
    - ✅ SqlManagementClient.iPv6FirewallRules
    - ✅ SqlManagementClient.endpointCertificates
    - ✅ SqlManagementClient.managedDatabaseSensitivityLabels
    - ✅ SqlManagementClient.managedDatabaseRecommendedSensitivityLabels
    - ✅ SqlManagementClient.sensitivityLabels
    - ✅ SqlManagementClient.recommendedSensitivityLabels
    - ✅ SqlManagementClient.serverBlobAuditingPolicies
    - ✅ SqlManagementClient.databaseBlobAuditingPolicies
    - ✅ SqlManagementClient.extendedDatabaseBlobAuditingPolicies
    - ✅ SqlManagementClient.extendedServerBlobAuditingPolicies
    - ✅ SqlManagementClient.databaseAdvancedThreatProtectionSettings
    - ✅ SqlManagementClient.serverAdvancedThreatProtectionSettings
    - ✅ SqlManagementClient.managedServerDnsAliases
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentBaselines
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentExecuteScan
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentRuleBaselines
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentScanResult
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentScans
    - ✅ SqlManagementClient.databaseSqlVulnerabilityAssessmentsSettings
    - ✅ SqlManagementClient.managedDatabaseAdvancedThreatProtectionSettings
    - ✅ SqlManagementClient.managedInstanceAdvancedThreatProtectionSettings
    - ✅ SqlManagementClient.replicationLinks
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentBaseline
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentBaselines
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentExecuteScan
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentRuleBaseline
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentRuleBaselines
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentScanResult
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentScans
    - ✅ SqlManagementClient.sqlVulnerabilityAssessmentsSettings
    - ✅ SqlManagementClient.sqlVulnerabilityAssessments
    - ✅ SqlManagementClient.managedDatabaseMoveOperations
    - ✅ SqlManagementClient.managedInstanceDtcs
    - ✅ SqlManagementClient.synapseLinkWorkspaces
    - ✅ SqlManagementClient.virtualClusters
    - ✅ SqlManagementClient.instanceFailoverGroups
    - ✅ SqlManagementClient.managedDatabaseRestoreDetails
    - ✅ SqlManagementClient.managedDatabases
    - ✅ SqlManagementClient.databaseEncryptionProtectors
    - ✅ SqlManagementClient.managedInstances
    - ✅ SqlManagementClient.managedLedgerDigestUploadsOperations
    - ✅ SqlManagementClient.recoverableDatabases
    - ✅ SqlManagementClient.restorableDroppedDatabases
    - ✅ SqlManagementClient.serverConfigurationOptions
    - ✅ SqlManagementClient.servers
    - ✅ SqlManagementClient.startStopManagedInstanceSchedules
    - ✅ SqlManagementClient.transparentDataEncryptions
    - ✅ StorageManagementClient.operations
    - ✅ StorageManagementClient.skus
    - ✅ StorageManagementClient.storageAccounts
    - ✅ StorageManagementClient.deletedAccounts
    - ✅ StorageManagementClient.usages
    - ✅ StorageManagementClient.managementPolicies
    - ✅ StorageManagementClient.blobInventoryPolicies
    - ✅ StorageManagementClient.privateEndpointConnections
    - ✅ StorageManagementClient.privateLinkResources
    - ✅ StorageManagementClient.objectReplicationPoliciesOperations
    - ✅ StorageManagementClient.localUsersOperations
    - ✅ StorageManagementClient.encryptionScopes
    - ✅ StorageManagementClient.blobServices
    - ✅ StorageManagementClient.blobContainers
    - ✅ StorageManagementClient.fileServices
    - ✅ StorageManagementClient.fileShares
    - ✅ StorageManagementClient.queueServices
    - ✅ StorageManagementClient.queue
    - ✅ StorageManagementClient.tableServices
    - ✅ StorageManagementClient.tableOperations
    - ✅ WebSiteManagementClient.appServiceCertificateOrders
    - ✅ WebSiteManagementClient.certificateOrdersDiagnostics
    - ✅ WebSiteManagementClient.certificateRegistrationProvider
    - ✅ WebSiteManagementClient.domains
    - ✅ WebSiteManagementClient.topLevelDomains
    - ✅ WebSiteManagementClient.domainRegistrationProvider
    - ✅ WebSiteManagementClient.appServiceEnvironments
    - ✅ WebSiteManagementClient.appServicePlans
    - ✅ WebSiteManagementClient.certificates
    - ✅ WebSiteManagementClient.containerApps
    - ✅ WebSiteManagementClient.containerAppsRevisions
    - ✅ WebSiteManagementClient.deletedWebApps
    - ✅ WebSiteManagementClient.diagnostics
    - ✅ WebSiteManagementClient.global
    - ✅ WebSiteManagementClient.kubeEnvironments
    - ✅ WebSiteManagementClient.provider
    - ✅ WebSiteManagementClient.recommendations
    - ✅ WebSiteManagementClient.resourceHealthMetadataOperations
    - ✅ WebSiteManagementClient.getUsagesInLocation
    - ✅ WebSiteManagementClient.staticSites
    - ✅ WebSiteManagementClient.webApps
    - ✅ WebSiteManagementClient.workflows
    - ✅ WebSiteManagementClient.workflowRuns
    - ✅ WebSiteManagementClient.workflowRunActions
    - ✅ WebSiteManagementClient.workflowRunActionRepetitions
    - ✅ WebSiteManagementClient.workflowRunActionRepetitionsRequestHistories
    - ✅ WebSiteManagementClient.workflowRunActionScopeRepetitions
    - ✅ WebSiteManagementClient.workflowTriggers
    - ✅ WebSiteManagementClient.workflowTriggerHistories
    - ✅ WebSiteManagementClient.workflowVersions
    - ✅ MonitorClient.autoscaleSettings
    - ✅ MonitorClient.operations
    - ✅ MonitorClient.alertRuleIncidents
    - ✅ MonitorClient.alertRules
    - ✅ MonitorClient.logProfiles
    - ✅ MonitorClient.diagnosticSettings
    - ✅ MonitorClient.diagnosticSettingsCategory
    - ✅ MonitorClient.actionGroups
    - ✅ MonitorClient.activityLogs
    - ✅ MonitorClient.eventCategories
    - ✅ MonitorClient.tenantActivityLogs
    - ✅ MonitorClient.metricDefinitions
    - ✅ MonitorClient.metrics
    - ✅ MonitorClient.baselines
    - ✅ MonitorClient.metricAlerts
    - ✅ MonitorClient.metricAlertsStatus
    - ✅ MonitorClient.scheduledQueryRules
    - ✅ MonitorClient.metricNamespaces
    - ✅ MonitorClient.vMInsights
    - ✅ MonitorClient.privateLinkScopes
    - ✅ MonitorClient.privateLinkScopeOperationStatus
    - ✅ MonitorClient.privateLinkResources
    - ✅ MonitorClient.privateEndpointConnections
    - ✅ MonitorClient.privateLinkScopedResources
    - ✅ MonitorClient.activityLogAlerts
    - ✅ MonitorClient.dataCollectionEndpoints
    - ✅ MonitorClient.dataCollectionRuleAssociations
    - ✅ MonitorClient.dataCollectionRules
    - ✅ ServiceBusManagementClient.namespaces
    - ✅ ServiceBusManagementClient.privateEndpointConnections
    - ✅ ServiceBusManagementClient.privateLinkResources
    - ✅ ServiceBusManagementClient.operations
    - ✅ ServiceBusManagementClient.disasterRecoveryConfigs
    - ✅ ServiceBusManagementClient.migrationConfigs
    - ✅ ServiceBusManagementClient.queues
    - ✅ ServiceBusManagementClient.topics
    - ✅ ServiceBusManagementClient.rules
    - ✅ ServiceBusManagementClient.subscriptions
    - ✅ KeyVaultManagementClient.keys
    - ✅ KeyVaultManagementClient.managedHsmKeys
    - ✅ KeyVaultManagementClient.vaults
    - ✅ KeyVaultManagementClient.privateEndpointConnections
    - ✅ KeyVaultManagementClient.privateLinkResources
    - ✅ KeyVaultManagementClient.managedHsms
    - ✅ KeyVaultManagementClient.mhsmPrivateEndpointConnections
    - ✅ KeyVaultManagementClient.mhsmPrivateLinkResources
    - ✅ KeyVaultManagementClient.mhsmRegions
    - ✅ KeyVaultManagementClient.operations
    - ✅ KeyVaultManagementClient.secrets
    - ✅ ComputeManagementClient.operations
    - ✅ ComputeManagementClient.usageOperations
    - ✅ ComputeManagementClient.virtualMachineSizes
    - ✅ ComputeManagementClient.virtualMachineScaleSets
    - ✅ ComputeManagementClient.virtualMachineScaleSetExtensions
    - ✅ ComputeManagementClient.virtualMachineScaleSetRollingUpgrades
    - ✅ ComputeManagementClient.virtualMachineScaleSetVMExtensions
    - ✅ ComputeManagementClient.virtualMachineScaleSetVMs
    - ✅ ComputeManagementClient.virtualMachineExtensions
    - ✅ ComputeManagementClient.virtualMachines
    - ✅ ComputeManagementClient.virtualMachineImages
    - ✅ ComputeManagementClient.virtualMachineImagesEdgeZone
    - ✅ ComputeManagementClient.virtualMachineExtensionImages
    - ✅ ComputeManagementClient.availabilitySets
    - ✅ ComputeManagementClient.proximityPlacementGroups
    - ✅ ComputeManagementClient.dedicatedHostGroups
    - ✅ ComputeManagementClient.dedicatedHosts
    - ✅ ComputeManagementClient.sshPublicKeys
    - ✅ ComputeManagementClient.images
    - ✅ ComputeManagementClient.restorePointCollections
    - ✅ ComputeManagementClient.restorePoints
    - ✅ ComputeManagementClient.capacityReservationGroups
    - ✅ ComputeManagementClient.capacityReservations
    - ✅ ComputeManagementClient.logAnalytics
    - ✅ ComputeManagementClient.virtualMachineRunCommands
    - ✅ ComputeManagementClient.virtualMachineScaleSetVMRunCommands
    - ✅ ComputeManagementClient.disks
    - ✅ ComputeManagementClient.diskAccesses
    - ✅ ComputeManagementClient.diskEncryptionSets
    - ✅ ComputeManagementClient.diskRestorePointOperations
    - ✅ ComputeManagementClient.snapshots
    - ✅ ComputeManagementClient.resourceSkus
    - ✅ ComputeManagementClient.galleries
    - ✅ ComputeManagementClient.galleryImages
    - ✅ ComputeManagementClient.galleryImageVersions
    - ✅ ComputeManagementClient.galleryApplications
    - ✅ ComputeManagementClient.galleryApplicationVersions
    - ✅ ComputeManagementClient.gallerySharingProfile
    - ✅ ComputeManagementClient.sharedGalleries
    - ✅ ComputeManagementClient.sharedGalleryImages
    - ✅ ComputeManagementClient.sharedGalleryImageVersions
    - ✅ ComputeManagementClient.communityGalleries
    - ✅ ComputeManagementClient.communityGalleryImages
    - ✅ ComputeManagementClient.communityGalleryImageVersions
    - ✅ ComputeManagementClient.cloudServiceRoleInstances
    - ✅ ComputeManagementClient.cloudServiceRoles
    - ✅ ComputeManagementClient.cloudServices
    - ✅ ComputeManagementClient.cloudServicesUpdateDomain
    - ✅ ComputeManagementClient.cloudServiceOperatingSystems
    - ✅ EventHubManagementClient.clusters
    - ✅ EventHubManagementClient.configuration
    - ✅ EventHubManagementClient.namespaces
    - ✅ EventHubManagementClient.privateEndpointConnections
    - ✅ EventHubManagementClient.privateLinkResources
    - ✅ EventHubManagementClient.operations
    - ✅ EventHubManagementClient.eventHubs
    - ✅ EventHubManagementClient.disasterRecoveryConfigs
    - ✅ EventHubManagementClient.consumerGroups
    - ✅ EventHubManagementClient.schemaRegistry
    - ✅ RedisManagementClient.operations
    - ✅ RedisManagementClient.redis
    - ✅ RedisManagementClient.firewallRules
    - ✅ RedisManagementClient.patchSchedules
    - ✅ RedisManagementClient.linkedServer
    - ✅ RedisManagementClient.privateEndpointConnections
    - ✅ RedisManagementClient.privateLinkResources
    - ✅ RedisManagementClient.asyncOperationStatus
    - ✅ RedisManagementClient.accessPolicy
    - ✅ RedisManagementClient.accessPolicyAssignment
    - ✅ PostgreSQLManagementClient.servers
    - ✅ PostgreSQLManagementClient.replicas
    - ✅ PostgreSQLManagementClient.firewallRules
    - ✅ PostgreSQLManagementClient.virtualNetworkRules
    - ✅ PostgreSQLManagementClient.databases
    - ✅ PostgreSQLManagementClient.configurations
    - ✅ PostgreSQLManagementClient.serverParameters
    - ✅ PostgreSQLManagementClient.logFiles
    - ✅ PostgreSQLManagementClient.serverAdministrators
    - ✅ PostgreSQLManagementClient.recoverableServers
    - ✅ PostgreSQLManagementClient.serverBasedPerformanceTier
    - ✅ PostgreSQLManagementClient.locationBasedPerformanceTier
    - ✅ PostgreSQLManagementClient.checkNameAvailability
    - ✅ PostgreSQLManagementClient.operations
    - ✅ PostgreSQLManagementClient.serverSecurityAlertPolicies
    - ✅ PostgreSQLManagementClient.privateEndpointConnections
    - ✅ PostgreSQLManagementClient.privateLinkResources
    - ✅ PostgreSQLManagementClient.serverKeys
    - ✅ AzureMapsManagementClient.accounts
    - ✅ AzureMapsManagementClient.maps
    - ✅ AzureMapsManagementClient.creators
    - ✅ MariaDBManagementClient.servers
    - ✅ MariaDBManagementClient.replicas
    - ✅ MariaDBManagementClient.firewallRules
    - ✅ MariaDBManagementClient.virtualNetworkRules
    - ✅ MariaDBManagementClient.databases
    - ✅ MariaDBManagementClient.configurations
    - ✅ MariaDBManagementClient.serverParameters
    - ✅ MariaDBManagementClient.logFiles
    - ✅ MariaDBManagementClient.recoverableServers
    - ✅ MariaDBManagementClient.serverBasedPerformanceTier
    - ✅ MariaDBManagementClient.locationBasedPerformanceTier
    - ✅ MariaDBManagementClient.checkNameAvailability
    - ✅ MariaDBManagementClient.operations
    - ✅ MariaDBManagementClient.queryTexts
    - ✅ MariaDBManagementClient.topQueryStatistics
    - ✅ MariaDBManagementClient.waitStatistics
    - ✅ MariaDBManagementClient.advisors
    - ✅ MariaDBManagementClient.recommendedActions
    - ✅ MariaDBManagementClient.locationBasedRecommendedActionSessionsOperationStatus
    - ✅ MariaDBManagementClient.locationBasedRecommendedActionSessionsResult
    - ✅ MariaDBManagementClient.privateEndpointConnections
    - ✅ MariaDBManagementClient.privateLinkResources
    - ✅ MariaDBManagementClient.serverSecurityAlertPolicies
    - ✅ ContainerServiceClient.operations
    - ✅ ContainerServiceClient.managedClusters
    - ✅ ContainerServiceClient.maintenanceConfigurations
    - ✅ ContainerServiceClient.agentPools
    - ✅ ContainerServiceClient.privateEndpointConnections
    - ✅ ContainerServiceClient.privateLinkResources
    - ✅ ContainerServiceClient.resolvePrivateLinkServiceId
    - ✅ ContainerServiceClient.snapshots
    - ✅ ContainerServiceClient.trustedAccessRoleBindings
    - ✅ ContainerServiceClient.trustedAccessRoles
    - ✅ ContainerRegistryManagementClient.registries
    - ✅ ContainerRegistryManagementClient.operations
    - ✅ ContainerRegistryManagementClient.privateEndpointConnections
    - ✅ ContainerRegistryManagementClient.replications
    - ✅ ContainerRegistryManagementClient.scopeMaps
    - ✅ ContainerRegistryManagementClient.tokens
    - ✅ ContainerRegistryManagementClient.webhooks
    - ✅ ContainerRegistryManagementClient.agentPools
    - ✅ ContainerRegistryManagementClient.runs
    - ✅ ContainerRegistryManagementClient.taskRuns
    - ✅ ContainerRegistryManagementClient.tasks
    - ✅ CosmosDBManagementClient.databaseAccounts
    - ✅ CosmosDBManagementClient.operations
    - ✅ CosmosDBManagementClient.database
    - ✅ CosmosDBManagementClient.collection
    - ✅ CosmosDBManagementClient.collectionRegion
    - ✅ CosmosDBManagementClient.databaseAccountRegion
    - ✅ CosmosDBManagementClient.percentileSourceTarget
    - ✅ CosmosDBManagementClient.percentileTarget
    - ✅ CosmosDBManagementClient.percentile
    - ✅ CosmosDBManagementClient.collectionPartitionRegion
    - ✅ CosmosDBManagementClient.collectionPartition
    - ✅ CosmosDBManagementClient.partitionKeyRangeId
    - ✅ CosmosDBManagementClient.partitionKeyRangeIdRegion
    - ✅ CosmosDBManagementClient.sqlResources
    - ✅ CosmosDBManagementClient.mongoDBResources
    - ✅ CosmosDBManagementClient.tableResources
    - ✅ CosmosDBManagementClient.cassandraResources
    - ✅ CosmosDBManagementClient.gremlinResources
    - ✅ CosmosDBManagementClient.locations
    - ✅ CosmosDBManagementClient.cassandraClusters
    - ✅ CosmosDBManagementClient.cassandraDataCenters
    - ✅ CosmosDBManagementClient.notebookWorkspaces
    - ✅ CosmosDBManagementClient.privateEndpointConnections
    - ✅ CosmosDBManagementClient.privateLinkResources
    - ✅ CosmosDBManagementClient.restorableDatabaseAccounts
    - ✅ CosmosDBManagementClient.restorableSqlDatabases
    - ✅ CosmosDBManagementClient.restorableSqlContainers
    - ✅ CosmosDBManagementClient.restorableSqlResources
    - ✅ CosmosDBManagementClient.restorableMongodbDatabases
    - ✅ CosmosDBManagementClient.restorableMongodbCollections
    - ✅ CosmosDBManagementClient.restorableMongodbResources
    - ✅ CosmosDBManagementClient.restorableGremlinDatabases
    - ✅ CosmosDBManagementClient.restorableGremlinGraphs
    - ✅ CosmosDBManagementClient.restorableGremlinResources
    - ✅ CosmosDBManagementClient.restorableTables
    - ✅ CosmosDBManagementClient.restorableTableResources
    - ✅ CosmosDBManagementClient.service
    - ✅ StreamAnalyticsManagementClient.operations
    - ✅ StreamAnalyticsManagementClient.streamingJobs
    - ✅ StreamAnalyticsManagementClient.inputs
    - ✅ StreamAnalyticsManagementClient.outputs
    - ✅ StreamAnalyticsManagementClient.transformations
    - ✅ StreamAnalyticsManagementClient.functions
    - ✅ StreamAnalyticsManagementClient.subscriptions
    - ✅ StreamAnalyticsManagementClient.clusters
    - ✅ StreamAnalyticsManagementClient.privateEndpoints
    - ✅ ConsumptionManagementClient.usageDetails
    - ✅ ConsumptionManagementClient.marketplaces
    - ✅ ConsumptionManagementClient.budgets
    - ✅ ConsumptionManagementClient.tags
    - ✅ ConsumptionManagementClient.charges
    - ✅ ConsumptionManagementClient.balances
    - ✅ ConsumptionManagementClient.reservationsSummaries
    - ✅ ConsumptionManagementClient.reservationsDetails
    - ✅ ConsumptionManagementClient.reservationRecommendations
    - ✅ ConsumptionManagementClient.reservationRecommendationDetails
    - ✅ ConsumptionManagementClient.reservationTransactions
    - ✅ ConsumptionManagementClient.priceSheet
    - ✅ ConsumptionManagementClient.operations
    - ✅ ConsumptionManagementClient.aggregatedCost
    - ✅ ConsumptionManagementClient.eventsOperations
    - ✅ ConsumptionManagementClient.lotsOperations
    - ✅ ConsumptionManagementClient.credits
    - ✅ RecoveryServicesBackupClient.backupResourceStorageConfigsNonCRR
    - ✅ RecoveryServicesBackupClient.protectionIntentOperations
    - ✅ RecoveryServicesBackupClient.backupStatus
    - ✅ RecoveryServicesBackupClient.featureSupport
    - ✅ RecoveryServicesBackupClient.backupProtectionIntent
    - ✅ RecoveryServicesBackupClient.backupUsageSummaries
    - ✅ RecoveryServicesBackupClient.operations
    - ✅ RecoveryServicesBackupClient.backupResourceVaultConfigs
    - ✅ RecoveryServicesBackupClient.backupResourceEncryptionConfigs
    - ✅ RecoveryServicesBackupClient.privateEndpointConnectionOperations
    - ✅ RecoveryServicesBackupClient.privateEndpointOperations
    - ✅ RecoveryServicesBackupClient.bMSPrepareDataMoveOperationResult
    - ✅ RecoveryServicesBackupClient.protectedItems
    - ✅ RecoveryServicesBackupClient.protectedItemOperationResults
    - ✅ RecoveryServicesBackupClient.recoveryPoints
    - ✅ RecoveryServicesBackupClient.restores
    - ✅ RecoveryServicesBackupClient.backupPolicies
    - ✅ RecoveryServicesBackupClient.protectionPolicies
    - ✅ RecoveryServicesBackupClient.protectionPolicyOperationResults
    - ✅ RecoveryServicesBackupClient.backupJobs
    - ✅ RecoveryServicesBackupClient.jobDetails
    - ✅ RecoveryServicesBackupClient.jobCancellations
    - ✅ RecoveryServicesBackupClient.jobOperationResults
    - ✅ RecoveryServicesBackupClient.exportJobsOperationResults
    - ✅ RecoveryServicesBackupClient.jobs
    - ✅ RecoveryServicesBackupClient.backupProtectedItems
    - ✅ RecoveryServicesBackupClient.operation
    - ✅ RecoveryServicesBackupClient.validateOperation
    - ✅ RecoveryServicesBackupClient.validateOperationResults
    - ✅ RecoveryServicesBackupClient.validateOperationStatuses
    - ✅ RecoveryServicesBackupClient.backupEngines
    - ✅ RecoveryServicesBackupClient.protectionContainerRefreshOperationResults
    - ✅ RecoveryServicesBackupClient.protectableContainers
    - ✅ RecoveryServicesBackupClient.protectionContainers
    - ✅ RecoveryServicesBackupClient.backupWorkloadItems
    - ✅ RecoveryServicesBackupClient.protectionContainerOperationResults
    - ✅ RecoveryServicesBackupClient.backups
    - ✅ RecoveryServicesBackupClient.protectedItemOperationStatuses
    - ✅ RecoveryServicesBackupClient.itemLevelRecoveryConnections
    - ✅ RecoveryServicesBackupClient.backupOperationResults
    - ✅ RecoveryServicesBackupClient.backupOperationStatuses
    - ✅ RecoveryServicesBackupClient.protectionPolicyOperationStatuses
    - ✅ RecoveryServicesBackupClient.backupProtectableItems
    - ✅ RecoveryServicesBackupClient.backupProtectionContainers
    - ✅ RecoveryServicesBackupClient.deletedProtectionContainers
    - ✅ RecoveryServicesBackupClient.securityPINs
    - ✅ RecoveryServicesBackupClient.recoveryPointsRecommendedForMove
    - ✅ RecoveryServicesBackupClient.resourceGuardProxies
    - ✅ RecoveryServicesBackupClient.resourceGuardProxy
    - ✅ RecoveryServicesBackupClient.fetchTieringCost
    - ✅ RecoveryServicesBackupClient.getTieringCostOperationResult
    - ✅ RecoveryServicesBackupClient.tieringCostOperationStatus
    - ✅ ManagementLockClient.authorizationOperations
    - ✅ ManagementLockClient.managementLocks
    - ✅ EventGridManagementClient.channels
    - ✅ EventGridManagementClient.domains
    - ✅ EventGridManagementClient.domainTopics
    - ✅ EventGridManagementClient.topicEventSubscriptions
    - ✅ EventGridManagementClient.domainEventSubscriptions
    - ✅ EventGridManagementClient.eventSubscriptions
    - ✅ EventGridManagementClient.domainTopicEventSubscriptions
    - ✅ EventGridManagementClient.systemTopicEventSubscriptions
    - ✅ EventGridManagementClient.partnerTopicEventSubscriptions
    - ✅ EventGridManagementClient.operations
    - ✅ EventGridManagementClient.topics
    - ✅ EventGridManagementClient.partnerConfigurations
    - ✅ EventGridManagementClient.partnerNamespaces
    - ✅ EventGridManagementClient.partnerRegistrations
    - ✅ EventGridManagementClient.partnerTopics
    - ✅ EventGridManagementClient.privateEndpointConnections
    - ✅ EventGridManagementClient.privateLinkResources
    - ✅ EventGridManagementClient.systemTopics
    - ✅ EventGridManagementClient.extensionTopics
    - ✅ EventGridManagementClient.topicTypes
    - ✅ EventGridManagementClient.verifiedPartners
    - ✅ PolicyClient.dataPolicyManifests
    - ✅ PolicyClient.policyAssignments
    - ✅ PolicyClient.policyDefinitions
    - ✅ PolicyClient.policySetDefinitions
    - ✅ PolicyClient.policyExemptions
    - ✅ IotCentralClient.apps
    - ✅ IotCentralClient.operations
    - ✅ DevTestLabsClient.providerOperations
    - ✅ DevTestLabsClient.labs
    - ✅ DevTestLabsClient.operations
    - ✅ DevTestLabsClient.globalSchedules
    - ✅ DevTestLabsClient.artifactSources
    - ✅ DevTestLabsClient.armTemplates
    - ✅ DevTestLabsClient.artifacts
    - ✅ DevTestLabsClient.costs
    - ✅ DevTestLabsClient.customImages
    - ✅ DevTestLabsClient.formulas
    - ✅ DevTestLabsClient.galleryImages
    - ✅ DevTestLabsClient.notificationChannels
    - ✅ DevTestLabsClient.policySets
    - ✅ DevTestLabsClient.policies
    - ✅ DevTestLabsClient.schedules
    - ✅ DevTestLabsClient.serviceRunners
    - ✅ DevTestLabsClient.users
    - ✅ DevTestLabsClient.disks
    - ✅ DevTestLabsClient.environments
    - ✅ DevTestLabsClient.secrets
    - ✅ DevTestLabsClient.serviceFabrics
    - ✅ DevTestLabsClient.serviceFabricSchedules
    - ✅ DevTestLabsClient.virtualMachines
    - ✅ DevTestLabsClient.virtualMachineSchedules
    - ✅ DevTestLabsClient.virtualNetworks
    - ✅ LogicManagementClient.workflows
    - ✅ LogicManagementClient.workflowVersions
    - ✅ LogicManagementClient.workflowTriggers
    - ✅ LogicManagementClient.workflowVersionTriggers
    - ✅ LogicManagementClient.workflowTriggerHistories
    - ✅ LogicManagementClient.workflowRuns
    - ✅ LogicManagementClient.workflowRunActions
    - ✅ LogicManagementClient.workflowRunActionRepetitions
    - ✅ LogicManagementClient.workflowRunActionRepetitionsRequestHistories
    - ✅ LogicManagementClient.workflowRunActionRequestHistories
    - ✅ LogicManagementClient.workflowRunActionScopeRepetitions
    - ✅ LogicManagementClient.workflowRunOperations
    - ✅ LogicManagementClient.integrationAccounts
    - ✅ LogicManagementClient.integrationAccountAssemblies
    - ✅ LogicManagementClient.integrationAccountBatchConfigurations
    - ✅ LogicManagementClient.integrationAccountSchemas
    - ✅ LogicManagementClient.integrationAccountMaps
    - ✅ LogicManagementClient.integrationAccountPartners
    - ✅ LogicManagementClient.integrationAccountAgreements
    - ✅ LogicManagementClient.integrationAccountCertificates
    - ✅ LogicManagementClient.integrationAccountSessions
    - ✅ LogicManagementClient.integrationServiceEnvironments
    - ✅ LogicManagementClient.integrationServiceEnvironmentSkus
    - ✅ LogicManagementClient.integrationServiceEnvironmentNetworkHealth
    - ✅ LogicManagementClient.integrationServiceEnvironmentManagedApis
    - ✅ LogicManagementClient.integrationServiceEnvironmentManagedApiOperations
    - ✅ LogicManagementClient.operations
    - ✅ DnsManagementClient.recordSets
    - ✅ DnsManagementClient.zones
    - ✅ DnsManagementClient.dnsResourceReferenceOperations
    - ✅ PurviewManagementClient.accounts
    - ✅ PurviewManagementClient.defaultAccounts
    - ✅ PurviewManagementClient.operations
    - ✅ PurviewManagementClient.privateEndpointConnections
    - ✅ PurviewManagementClient.privateLinkResources
    - ✅ ServiceFabricManagementClient.clusters
    - ✅ ServiceFabricManagementClient.clusterVersions
    - ✅ ServiceFabricManagementClient.operations
    - ✅ ServiceFabricManagementClient.applicationTypes
    - ✅ ServiceFabricManagementClient.applicationTypeVersions
    - ✅ ServiceFabricManagementClient.applications
    - ✅ ServiceFabricManagementClient.services
    - ✅ ApplicationClient.applications
    - ✅ ApplicationClient.applicationDefinitions
    - ✅ ApplicationClient.jitRequests
    - ✅ ManagedServiceIdentityClient.systemAssignedIdentities
    - ✅ ManagedServiceIdentityClient.operations
    - ✅ ManagedServiceIdentityClient.userAssignedIdentities
    - ✅ ManagedServiceIdentityClient.federatedIdentityCredentials
    - ✅ BillingManagementClient.billingAccounts
    - ✅ BillingManagementClient.address
    - ✅ BillingManagementClient.availableBalances
    - ✅ BillingManagementClient.instructions
    - ✅ BillingManagementClient.billingProfiles
    - ✅ BillingManagementClient.customers
    - ✅ BillingManagementClient.invoiceSections
    - ✅ BillingManagementClient.billingPermissions
    - ✅ BillingManagementClient.billingSubscriptions
    - ✅ BillingManagementClient.products
    - ✅ BillingManagementClient.invoices
    - ✅ BillingManagementClient.transactions
    - ✅ BillingManagementClient.policies
    - ✅ BillingManagementClient.billingPropertyOperations
    - ✅ BillingManagementClient.operations
    - ✅ BillingManagementClient.billingRoleDefinitions
    - ✅ BillingManagementClient.billingRoleAssignments
    - ✅ BillingManagementClient.agreements
    - ✅ BillingManagementClient.reservations
    - ✅ BillingManagementClient.enrollmentAccounts
    - ✅ BillingManagementClient.billingPeriods
    - ✅ SearchManagementClient.operations
    - ✅ SearchManagementClient.adminKeys
    - ✅ SearchManagementClient.queryKeys
    - ✅ SearchManagementClient.services
    - ✅ SearchManagementClient.privateLinkResources
    - ✅ SearchManagementClient.privateEndpointConnections
    - ✅ SearchManagementClient.sharedPrivateLinkResources
    - ✅ SearchManagementClient.usages
    - ✅ CdnManagementClient.afdProfiles
    - ✅ CdnManagementClient.afdCustomDomains
    - ✅ CdnManagementClient.afdEndpoints
    - ✅ CdnManagementClient.afdOriginGroups
    - ✅ CdnManagementClient.afdOrigins
    - ✅ CdnManagementClient.routes
    - ✅ CdnManagementClient.ruleSets
    - ✅ CdnManagementClient.rules
    - ✅ CdnManagementClient.securityPolicies
    - ✅ CdnManagementClient.secrets
    - ✅ CdnManagementClient.logAnalytics
    - ✅ CdnManagementClient.profiles
    - ✅ CdnManagementClient.endpoints
    - ✅ CdnManagementClient.origins
    - ✅ CdnManagementClient.originGroups
    - ✅ CdnManagementClient.customDomains
    - ✅ CdnManagementClient.resourceUsageOperations
    - ✅ CdnManagementClient.operations
    - ✅ CdnManagementClient.edgeNodes
    - ✅ CdnManagementClient.policies
    - ✅ CdnManagementClient.managedRuleSets
    - ✅ PrivateDnsManagementClient.privateZones
    - ✅ PrivateDnsManagementClient.virtualNetworkLinks
    - ✅ PrivateDnsManagementClient.recordSets
    - ✅ ContainerInstanceManagementClient.containerGroups
    - ✅ ContainerInstanceManagementClient.operations
    - ✅ ContainerInstanceManagementClient.location
    - ✅ ContainerInstanceManagementClient.containers
    - ✅ ContainerInstanceManagementClient.subnetServiceAssociationLink
    - ✅ AuthorizationManagementClient.classicAdministrators
    - ✅ AuthorizationManagementClient.globalAdministrator
    - ✅ AuthorizationManagementClient.denyAssignments
    - ✅ AuthorizationManagementClient.providerOperationsMetadataOperations
    - ✅ AuthorizationManagementClient.roleAssignments
    - ✅ AuthorizationManagementClient.permissions
    - ✅ AuthorizationManagementClient.roleDefinitions
    - ✅ AuthorizationManagementClient.eligibleChildResources
    - ✅ AuthorizationManagementClient.roleAssignmentSchedules
    - ✅ AuthorizationManagementClient.roleAssignmentScheduleInstances
    - ✅ AuthorizationManagementClient.roleAssignmentScheduleRequests
    - ✅ AuthorizationManagementClient.roleEligibilitySchedules
    - ✅ AuthorizationManagementClient.roleEligibilityScheduleInstances
    - ✅ AuthorizationManagementClient.roleEligibilityScheduleRequests
    - ✅ AuthorizationManagementClient.roleManagementPolicies
    - ✅ AuthorizationManagementClient.roleManagementPolicyAssignments
    - ✅ KustoManagementClient.clusters
    - ✅ KustoManagementClient.clusterPrincipalAssignments
    - ✅ KustoManagementClient.skus
    - ✅ KustoManagementClient.databases
    - ✅ KustoManagementClient.attachedDatabaseConfigurations
    - ✅ KustoManagementClient.managedPrivateEndpoints
    - ✅ KustoManagementClient.databaseOperations
    - ✅ KustoManagementClient.databasePrincipalAssignments
    - ✅ KustoManagementClient.scripts
    - ✅ KustoManagementClient.sandboxCustomImages
    - ✅ KustoManagementClient.privateEndpointConnections
    - ✅ KustoManagementClient.privateLinkResources
    - ✅ KustoManagementClient.dataConnections
    - ✅ KustoManagementClient.operations
    - ✅ KustoManagementClient.operationsResults
    - ✅ KustoManagementClient.operationsResultsLocation
    - ✅ PowerBIEmbeddedManagementClient.workspaceCollections
    - ✅ PowerBIEmbeddedManagementClient.workspaces
    - ✅ HybridComputeManagementClient.machines
    - ✅ HybridComputeManagementClient.machineExtensions
    - ✅ HybridComputeManagementClient.operations
    - ✅ HybridComputeManagementClient.privateLinkScopes
    - ✅ HybridComputeManagementClient.privateLinkResources
    - ✅ HybridComputeManagementClient.privateEndpointConnections
    - ✅ SignalRManagementClient.operations
    - ✅ SignalRManagementClient.signalR
    - ✅ SignalRManagementClient.usages
    - ✅ SignalRManagementClient.signalRCustomCertificates
    - ✅ SignalRManagementClient.signalRCustomDomains
    - ✅ SignalRManagementClient.signalRPrivateEndpointConnections
    - ✅ SignalRManagementClient.signalRPrivateLinkResources
    - ✅ SignalRManagementClient.signalRSharedPrivateLinkResources
    - ✅ AzureChangeAnalysisManagementClient.operations
    - ✅ AzureChangeAnalysisManagementClient.resourceChanges
    - ✅ AzureChangeAnalysisManagementClient.changes
    - ✅ AttestationManagementClient.operations
    - ✅ AttestationManagementClient.attestationProviders
    - ✅ AttestationManagementClient.privateEndpointConnections
    - ✅ ImageBuilderClient.virtualMachineImageTemplates
    - ✅ ImageBuilderClient.triggers
    - ✅ ImageBuilderClient.operations
    - ✅ CommunicationServiceManagementClient.operations
    - ✅ CommunicationServiceManagementClient.communicationServices
    - ✅ CommunicationServiceManagementClient.domains
    - ✅ CommunicationServiceManagementClient.emailServices
    - ✅ CommunicationServiceManagementClient.senderUsernames
    - ✅ CognitiveServicesManagementClient.accounts
    - ✅ CognitiveServicesManagementClient.deletedAccounts
    - ✅ CognitiveServicesManagementClient.resourceSkus
    - ✅ CognitiveServicesManagementClient.usages
    - ✅ CognitiveServicesManagementClient.operations
    - ✅ CognitiveServicesManagementClient.commitmentTiers
    - ✅ CognitiveServicesManagementClient.models
    - ✅ CognitiveServicesManagementClient.privateEndpointConnections
    - ✅ CognitiveServicesManagementClient.privateLinkResources
    - ✅ CognitiveServicesManagementClient.deployments
    - ✅ CognitiveServicesManagementClient.commitmentPlans
    - ✅ PolicyInsightsClient.policyTrackedResources
    - ✅ PolicyInsightsClient.remediations
    - ✅ PolicyInsightsClient.policyEvents
    - ✅ PolicyInsightsClient.policyStates
    - ✅ PolicyInsightsClient.operations
    - ✅ PolicyInsightsClient.policyMetadataOperations
    - ✅ PolicyInsightsClient.policyRestrictions
    - ✅ PolicyInsightsClient.attestations
    - ✅ StorageCacheManagementClient.amlFilesystems
    - ✅ StorageCacheManagementClient.operations
    - ✅ StorageCacheManagementClient.skus
    - ✅ StorageCacheManagementClient.usageModels
    - ✅ StorageCacheManagementClient.ascOperations
    - ✅ StorageCacheManagementClient.ascUsages
    - ✅ StorageCacheManagementClient.caches
    - ✅ StorageCacheManagementClient.storageTargets
    - ✅ StorageCacheManagementClient.storageTargetOperations
    - ✅ FrontDoorManagementClient.policies
    - ✅ FrontDoorManagementClient.managedRuleSets
    - ✅ FrontDoorManagementClient.frontDoorNameAvailability
    - ✅ FrontDoorManagementClient.frontDoorNameAvailabilityWithSubscription
    - ✅ FrontDoorManagementClient.frontDoors
    - ✅ FrontDoorManagementClient.frontendEndpoints
    - ✅ FrontDoorManagementClient.endpoints
    - ✅ FrontDoorManagementClient.rulesEngines
    - ✅ FrontDoorManagementClient.networkExperimentProfiles
    - ✅ FrontDoorManagementClient.preconfiguredEndpoints
    - ✅ FrontDoorManagementClient.experiments
    - ✅ FrontDoorManagementClient.reports
    - ✅ MixedRealityClient.operations
    - ✅ MixedRealityClient.spatialAnchorsAccounts
    - ✅ MixedRealityClient.remoteRenderingAccounts
    - ✅ PeeringManagementClient.cdnPeeringPrefixes
    - ✅ PeeringManagementClient.legacyPeerings
    - ✅ PeeringManagementClient.lookingGlass
    - ✅ PeeringManagementClient.operations
    - ✅ PeeringManagementClient.peerAsns
    - ✅ PeeringManagementClient.peeringLocations
    - ✅ PeeringManagementClient.registeredAsns
    - ✅ PeeringManagementClient.registeredPrefixes
    - ✅ PeeringManagementClient.peerings
    - ✅ PeeringManagementClient.receivedRoutes
    - ✅ PeeringManagementClient.connectionMonitorTests
    - ✅ PeeringManagementClient.peeringServiceCountries
    - ✅ PeeringManagementClient.peeringServiceLocations
    - ✅ PeeringManagementClient.prefixes
    - ✅ PeeringManagementClient.peeringServiceProviders
    - ✅ PeeringManagementClient.peeringServices
    - ✅ FeatureClient.features
    - ✅ FeatureClient.subscriptionFeatureRegistrations
    - ✅ NetAppManagementClient.operations
    - ✅ NetAppManagementClient.netAppResource
    - ✅ NetAppManagementClient.netAppResourceQuotaLimits
    - ✅ NetAppManagementClient.accounts
    - ✅ NetAppManagementClient.pools
    - ✅ NetAppManagementClient.volumes
    - ✅ NetAppManagementClient.snapshots
    - ✅ NetAppManagementClient.snapshotPolicies
    - ✅ NetAppManagementClient.backups
    - ✅ NetAppManagementClient.backupPolicies
    - ✅ NetAppManagementClient.volumeQuotaRules
    - ✅ NetAppManagementClient.volumeGroups
    - ✅ NetAppManagementClient.subvolumes
    - ✅ HDInsightManagementClient.clusters
    - ✅ HDInsightManagementClient.applications
    - ✅ HDInsightManagementClient.locations
    - ✅ HDInsightManagementClient.configurations
    - ✅ HDInsightManagementClient.extensions
    - ✅ HDInsightManagementClient.scriptActions
    - ✅ HDInsightManagementClient.scriptExecutionHistory
    - ✅ HDInsightManagementClient.operations
    - ✅ HDInsightManagementClient.virtualMachines
    - ✅ HDInsightManagementClient.privateEndpointConnections
    - ✅ HDInsightManagementClient.privateLinkResources
    - ✅ AzureMLWebServicesManagementClient.operations
    - ✅ AzureMLWebServicesManagementClient.webServices
    - ✅ DataCatalogRestClient.aDCOperations
    - ✅ DataCatalogRestClient.aDCCatalogs
    - ✅ BatchManagementClient.batchAccountOperations
    - ✅ BatchManagementClient.applicationPackageOperations
    - ✅ BatchManagementClient.applicationOperations
    - ✅ BatchManagementClient.location
    - ✅ BatchManagementClient.operations
    - ✅ BatchManagementClient.certificateOperations
    - ✅ BatchManagementClient.privateLinkResourceOperations
    - ✅ BatchManagementClient.privateEndpointConnectionOperations
    - ✅ BatchManagementClient.poolOperations
    - ✅ MicrosoftSerialConsoleClient.serialPorts
    - ✅ RedisEnterpriseManagementClient.operations
    - ✅ RedisEnterpriseManagementClient.operationsStatus
    - ✅ RedisEnterpriseManagementClient.redisEnterprise
    - ✅ RedisEnterpriseManagementClient.databases
    - ✅ RedisEnterpriseManagementClient.privateEndpointConnections
    - ✅ RedisEnterpriseManagementClient.privateLinkResources
    - ✅ TrafficManagerManagementClient.endpoints
    - ✅ TrafficManagerManagementClient.profiles
    - ✅ TrafficManagerManagementClient.geographicHierarchies
    - ✅ TrafficManagerManagementClient.heatMap
    - ✅ TrafficManagerManagementClient.trafficManagerUserMetricsKeys
    - ✅ PostgreSQLManagementFlexibleServerClient.administrators
    - ✅ PostgreSQLManagementFlexibleServerClient.backups
    - ✅ PostgreSQLManagementFlexibleServerClient.locationBasedCapabilities
    - ✅ PostgreSQLManagementFlexibleServerClient.checkNameAvailability
    - ✅ PostgreSQLManagementFlexibleServerClient.checkNameAvailabilityWithLocation
    - ✅ PostgreSQLManagementFlexibleServerClient.configurations
    - ✅ PostgreSQLManagementFlexibleServerClient.databases
    - ✅ PostgreSQLManagementFlexibleServerClient.firewallRules
    - ✅ PostgreSQLManagementFlexibleServerClient.servers
    - ✅ PostgreSQLManagementFlexibleServerClient.operations
    - ✅ PostgreSQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
    - ✅ PostgreSQLManagementFlexibleServerClient.replicas
    - ✅ PostgreSQLManagementFlexibleServerClient.virtualNetworkSubnetUsage
    - ✅ SiteRecoveryManagementClient.operations
    - ✅ SiteRecoveryManagementClient.replicationAlertSettings
    - ✅ SiteRecoveryManagementClient.replicationAppliances
    - ✅ SiteRecoveryManagementClient.replicationEligibilityResultsOperations
    - ✅ SiteRecoveryManagementClient.replicationEvents
    - ✅ SiteRecoveryManagementClient.replicationFabrics
    - ✅ SiteRecoveryManagementClient.replicationLogicalNetworks
    - ✅ SiteRecoveryManagementClient.replicationNetworks
    - ✅ SiteRecoveryManagementClient.replicationNetworkMappings
    - ✅ SiteRecoveryManagementClient.replicationProtectionContainers
    - ✅ SiteRecoveryManagementClient.replicationMigrationItems
    - ✅ SiteRecoveryManagementClient.migrationRecoveryPoints
    - ✅ SiteRecoveryManagementClient.replicationProtectableItems
    - ✅ SiteRecoveryManagementClient.replicationProtectedItems
    - ✅ SiteRecoveryManagementClient.recoveryPoints
    - ✅ SiteRecoveryManagementClient.targetComputeSizes
    - ✅ SiteRecoveryManagementClient.replicationProtectionContainerMappings
    - ✅ SiteRecoveryManagementClient.replicationRecoveryServicesProviders
    - ✅ SiteRecoveryManagementClient.replicationStorageClassifications
    - ✅ SiteRecoveryManagementClient.replicationStorageClassificationMappings
    - ✅ SiteRecoveryManagementClient.replicationvCenters
    - ✅ SiteRecoveryManagementClient.replicationJobs
    - ✅ SiteRecoveryManagementClient.replicationPolicies
    - ✅ SiteRecoveryManagementClient.replicationProtectionIntents
    - ✅ SiteRecoveryManagementClient.replicationRecoveryPlans
    - ✅ SiteRecoveryManagementClient.supportedOperatingSystemsOperations
    - ✅ SiteRecoveryManagementClient.replicationVaultHealth
    - ✅ SiteRecoveryManagementClient.replicationVaultSetting
    - ✅ ApplicationInsightsManagementClient.acceptLanguage
    - ✅ ApplicationInsightsManagementClient.longRunningOperationRetryTimeout
    - ✅ ApplicationInsightsManagementClient.baseUri
    - ✅ ApplicationInsightsManagementClient.requestContentType
    - ✅ ApplicationInsightsManagementClient.credentials
    - ✅ ApplicationInsightsManagementClient.operations
    - ✅ ApplicationInsightsManagementClient.annotations
    - ✅ ApplicationInsightsManagementClient.aPIKeys
    - ✅ ApplicationInsightsManagementClient.exportConfigurations
    - ✅ ApplicationInsightsManagementClient.componentCurrentBillingFeatures
    - ✅ ApplicationInsightsManagementClient.componentQuotaStatus
    - ✅ ApplicationInsightsManagementClient.componentFeatureCapabilities
    - ✅ ApplicationInsightsManagementClient.componentAvailableFeatures
    - ✅ ApplicationInsightsManagementClient.proactiveDetectionConfigurations
    - ✅ ApplicationInsightsManagementClient.workItemConfigurations
    - ✅ ApplicationInsightsManagementClient.favorites
    - ✅ ApplicationInsightsManagementClient.webTestLocations
    - ✅ ApplicationInsightsManagementClient.webTests
    - ✅ ApplicationInsightsManagementClient.analyticsItems
    - ✅ ApplicationInsightsManagementClient.workbookTemplates
    - ✅ ApplicationInsightsManagementClient.myWorkbooks
    - ✅ ApplicationInsightsManagementClient.workbooks
    - ✅ ApplicationInsightsManagementClient.components
    - ✅ ApplicationInsightsManagementClient.componentLinkedStorageAccounts
    - ✅ ApplicationInsightsManagementClient.liveToken
    - ✅ AppPlatformManagementClient.services
    - ✅ AppPlatformManagementClient.configServers
    - ✅ AppPlatformManagementClient.configurationServices
    - ✅ AppPlatformManagementClient.serviceRegistries
    - ✅ AppPlatformManagementClient.buildServiceOperations
    - ✅ AppPlatformManagementClient.buildpackBinding
    - ✅ AppPlatformManagementClient.buildServiceBuilder
    - ✅ AppPlatformManagementClient.buildServiceAgentPool
    - ✅ AppPlatformManagementClient.monitoringSettings
    - ✅ AppPlatformManagementClient.apps
    - ✅ AppPlatformManagementClient.bindings
    - ✅ AppPlatformManagementClient.certificates
    - ✅ AppPlatformManagementClient.customDomains
    - ✅ AppPlatformManagementClient.deployments
    - ✅ AppPlatformManagementClient.operations
    - ✅ AppPlatformManagementClient.runtimeVersions
    - ✅ AppPlatformManagementClient.skus
    - ✅ SourceControlConfigurationClient.extensions
    - ✅ SourceControlConfigurationClient.operationStatus
    - ✅ SourceControlConfigurationClient.fluxConfigurations
    - ✅ SourceControlConfigurationClient.fluxConfigOperationStatus
    - ✅ SourceControlConfigurationClient.sourceControlConfigurations
    - ✅ SourceControlConfigurationClient.operations
    - ✅ AppConfigurationManagementClient.configurationStores
    - ✅ AppConfigurationManagementClient.operations
    - ✅ AppConfigurationManagementClient.privateEndpointConnections
    - ✅ AppConfigurationManagementClient.privateLinkResources
    - ✅ AppConfigurationManagementClient.keyValues
    - ✅ AppConfigurationManagementClient.replicas
    - ✅ LabServicesClient.images
    - ✅ LabServicesClient.labPlans
    - ✅ LabServicesClient.operations
    - ✅ LabServicesClient.labs
    - ✅ LabServicesClient.operationResults
    - ✅ LabServicesClient.schedules
    - ✅ LabServicesClient.skus
    - ✅ LabServicesClient.usages
    - ✅ LabServicesClient.users
    - ✅ LabServicesClient.virtualMachines
    - ✅ HanaManagementClient.acceptLanguage
    - ✅ HanaManagementClient.longRunningOperationRetryTimeout
    - ✅ HanaManagementClient.baseUri
    - ✅ HanaManagementClient.requestContentType
    - ✅ HanaManagementClient.credentials
    - ✅ HanaManagementClient.operations
    - ✅ HanaManagementClient.hanaInstances
    - ✅ HanaManagementClient.sapMonitors
    - ✅ AzureStackManagementClient.acceptLanguage
    - ✅ AzureStackManagementClient.longRunningOperationRetryTimeout
    - ✅ AzureStackManagementClient.baseUri
    - ✅ AzureStackManagementClient.requestContentType
    - ✅ AzureStackManagementClient.credentials
    - ✅ AzureStackManagementClient.operations
    - ✅ AzureStackManagementClient.products
    - ✅ AzureStackManagementClient.registrations
    - ✅ AzureStackManagementClient.customerSubscriptions
    - ✅ VisualStudioResourceProviderClient.acceptLanguage
    - ✅ VisualStudioResourceProviderClient.longRunningOperationRetryTimeout
    - ✅ VisualStudioResourceProviderClient.baseUri
    - ✅ VisualStudioResourceProviderClient.requestContentType
    - ✅ VisualStudioResourceProviderClient.credentials
    - ✅ VisualStudioResourceProviderClient.operations
    - ✅ VisualStudioResourceProviderClient.accounts
    - ✅ VisualStudioResourceProviderClient.extensions
    - ✅ VisualStudioResourceProviderClient.projects
    - ✅ DataBoxManagementClient.operations
    - ✅ DataBoxManagementClient.jobs
    - ✅ DataBoxManagementClient.service
    - ✅ MachineLearningComputeManagementClient.acceptLanguage
    - ✅ MachineLearningComputeManagementClient.longRunningOperationRetryTimeout
    - ✅ MachineLearningComputeManagementClient.baseUri
    - ✅ MachineLearningComputeManagementClient.requestContentType
    - ✅ MachineLearningComputeManagementClient.credentials
    - ✅ MachineLearningComputeManagementClient.operationalizationClusters
    - ✅ MachineLearningComputeManagementClient.machineLearningCompute
    - ✅ DataMigrationServiceClient.acceptLanguage
    - ✅ DataMigrationServiceClient.longRunningOperationRetryTimeout
    - ✅ DataMigrationServiceClient.baseUri
    - ✅ DataMigrationServiceClient.requestContentType
    - ✅ DataMigrationServiceClient.credentials
    - ✅ DataMigrationServiceClient.resourceSkus
    - ✅ DataMigrationServiceClient.services
    - ✅ DataMigrationServiceClient.tasks
    - ✅ DataMigrationServiceClient.serviceTasks
    - ✅ DataMigrationServiceClient.projects
    - ✅ DataMigrationServiceClient.usages
    - ✅ DataMigrationServiceClient.operations
    - ✅ DataMigrationServiceClient.files
    - ✅ DataLakeAnalyticsAccountManagementClient.acceptLanguage
    - ✅ DataLakeAnalyticsAccountManagementClient.longRunningOperationRetryTimeout
    - ✅ DataLakeAnalyticsAccountManagementClient.baseUri
    - ✅ DataLakeAnalyticsAccountManagementClient.requestContentType
    - ✅ DataLakeAnalyticsAccountManagementClient.credentials
    - ✅ DataLakeAnalyticsAccountManagementClient.accounts
    - ✅ DataLakeAnalyticsAccountManagementClient.dataLakeStoreAccounts
    - ✅ DataLakeAnalyticsAccountManagementClient.storageAccounts
    - ✅ DataLakeAnalyticsAccountManagementClient.computePolicies
    - ✅ DataLakeAnalyticsAccountManagementClient.firewallRules
    - ✅ DataLakeAnalyticsAccountManagementClient.operations
    - ✅ DataLakeAnalyticsAccountManagementClient.locations
    - ✅ IoTSpacesClient.ioTSpaces
    - ✅ IoTSpacesClient.operations
    - ✅ BatchAIManagementClient.acceptLanguage
    - ✅ BatchAIManagementClient.longRunningOperationRetryTimeout
    - ✅ BatchAIManagementClient.baseUri
    - ✅ BatchAIManagementClient.requestContentType
    - ✅ BatchAIManagementClient.credentials
    - ✅ BatchAIManagementClient.operations
    - ✅ BatchAIManagementClient.usages
    - ✅ BatchAIManagementClient.workspaces
    - ✅ BatchAIManagementClient.experiments
    - ✅ BatchAIManagementClient.jobs
    - ✅ BatchAIManagementClient.fileServers
    - ✅ BatchAIManagementClient.clusters
    - ✅ VideoAnalyzerManagementClient.edgeModules
    - ✅ VideoAnalyzerManagementClient.pipelineTopologies
    - ✅ VideoAnalyzerManagementClient.livePipelines
    - ✅ VideoAnalyzerManagementClient.pipelineJobs
    - ✅ VideoAnalyzerManagementClient.livePipelineOperationStatuses
    - ✅ VideoAnalyzerManagementClient.pipelineJobOperationStatuses
    - ✅ VideoAnalyzerManagementClient.operations
    - ✅ VideoAnalyzerManagementClient.videoAnalyzers
    - ✅ VideoAnalyzerManagementClient.privateLinkResources
    - ✅ VideoAnalyzerManagementClient.privateEndpointConnections
    - ✅ VideoAnalyzerManagementClient.operationStatuses
    - ✅ VideoAnalyzerManagementClient.operationResults
    - ✅ VideoAnalyzerManagementClient.videoAnalyzerOperationStatuses
    - ✅ VideoAnalyzerManagementClient.videoAnalyzerOperationResults
    - ✅ VideoAnalyzerManagementClient.locations
    - ✅ VideoAnalyzerManagementClient.videos
    - ✅ VideoAnalyzerManagementClient.accessPolicies
    - ✅ DesktopVirtualizationAPIClient.operations
    - ✅ DesktopVirtualizationAPIClient.workspaces
    - ✅ DesktopVirtualizationAPIClient.privateEndpointConnections
    - ✅ DesktopVirtualizationAPIClient.privateLinkResources
    - ✅ DesktopVirtualizationAPIClient.scalingPlans
    - ✅ DesktopVirtualizationAPIClient.scalingPlanPooledSchedules
    - ✅ DesktopVirtualizationAPIClient.scalingPlanPersonalSchedules
    - ✅ DesktopVirtualizationAPIClient.applicationGroups
    - ✅ DesktopVirtualizationAPIClient.startMenuItems
    - ✅ DesktopVirtualizationAPIClient.applications
    - ✅ DesktopVirtualizationAPIClient.desktops
    - ✅ DesktopVirtualizationAPIClient.hostPools
    - ✅ DesktopVirtualizationAPIClient.userSessions
    - ✅ DesktopVirtualizationAPIClient.sessionHosts
    - ✅ DesktopVirtualizationAPIClient.msixPackages
    - ✅ DesktopVirtualizationAPIClient.msixImages
    - ✅ LoadTestClient.operations
    - ✅ LoadTestClient.loadTests
    - ✅ CustomLocationsManagementClient.customLocations
    - ✅ CustomLocationsManagementClient.resourceSyncRules
    - ✅ MLTeamAccountManagementClient.acceptLanguage
    - ✅ MLTeamAccountManagementClient.longRunningOperationRetryTimeout
    - ✅ MLTeamAccountManagementClient.baseUri
    - ✅ MLTeamAccountManagementClient.requestContentType
    - ✅ MLTeamAccountManagementClient.credentials
    - ✅ MLTeamAccountManagementClient.operations
    - ✅ MLTeamAccountManagementClient.accounts
    - ✅ MLTeamAccountManagementClient.workspaces
    - ✅ MLTeamAccountManagementClient.projects
    - ✅ ServiceFabricMeshManagementClient.acceptLanguage
    - ✅ ServiceFabricMeshManagementClient.longRunningOperationRetryTimeout
    - ✅ ServiceFabricMeshManagementClient.baseUri
    - ✅ ServiceFabricMeshManagementClient.requestContentType
    - ✅ ServiceFabricMeshManagementClient.credentials
    - ✅ ServiceFabricMeshManagementClient.operations
    - ✅ ServiceFabricMeshManagementClient.secret
    - ✅ ServiceFabricMeshManagementClient.secretValue
    - ✅ ServiceFabricMeshManagementClient.volume
    - ✅ ServiceFabricMeshManagementClient.network
    - ✅ ServiceFabricMeshManagementClient.gateway
    - ✅ ServiceFabricMeshManagementClient.application
    - ✅ ServiceFabricMeshManagementClient.service
    - ✅ ServiceFabricMeshManagementClient.serviceReplica
    - ✅ ServiceFabricMeshManagementClient.codePackage
    - ✅ AzureMLCommitmentPlansManagementClient.acceptLanguage
    - ✅ AzureMLCommitmentPlansManagementClient.longRunningOperationRetryTimeout
    - ✅ AzureMLCommitmentPlansManagementClient.baseUri
    - ✅ AzureMLCommitmentPlansManagementClient.requestContentType
    - ✅ AzureMLCommitmentPlansManagementClient.credentials
    - ✅ AzureMLCommitmentPlansManagementClient.skus
    - ✅ AzureMLCommitmentPlansManagementClient.commitmentAssociations
    - ✅ AzureMLCommitmentPlansManagementClient.commitmentPlans
    - ✅ AzureMLCommitmentPlansManagementClient.usageHistory
    - ✅ DnsResolverManagementClient.dnsResolvers
    - ✅ DnsResolverManagementClient.inboundEndpoints
    - ✅ DnsResolverManagementClient.outboundEndpoints
    - ✅ DnsResolverManagementClient.dnsForwardingRulesets
    - ✅ DnsResolverManagementClient.forwardingRules
    - ✅ DnsResolverManagementClient.virtualNetworkLinks
    - ✅ DataBoxEdgeManagementClient.operations
    - ✅ DataBoxEdgeManagementClient.availableSkus
    - ✅ DataBoxEdgeManagementClient.devices
    - ✅ DataBoxEdgeManagementClient.alerts
    - ✅ DataBoxEdgeManagementClient.bandwidthSchedules
    - ✅ DataBoxEdgeManagementClient.diagnosticSettings
    - ✅ DataBoxEdgeManagementClient.jobs
    - ✅ DataBoxEdgeManagementClient.nodes
    - ✅ DataBoxEdgeManagementClient.operationsStatus
    - ✅ DataBoxEdgeManagementClient.orders
    - ✅ DataBoxEdgeManagementClient.roles
    - ✅ DataBoxEdgeManagementClient.addons
    - ✅ DataBoxEdgeManagementClient.monitoringConfig
    - ✅ DataBoxEdgeManagementClient.shares
    - ✅ DataBoxEdgeManagementClient.storageAccountCredentials
    - ✅ DataBoxEdgeManagementClient.storageAccounts
    - ✅ DataBoxEdgeManagementClient.containers
    - ✅ DataBoxEdgeManagementClient.triggers
    - ✅ DataBoxEdgeManagementClient.supportPackages
    - ✅ DataBoxEdgeManagementClient.users
    - ✅ MobileNetworkManagementClient.attachedDataNetworks
    - ✅ MobileNetworkManagementClient.dataNetworks
    - ✅ MobileNetworkManagementClient.diagnosticsPackages
    - ✅ MobileNetworkManagementClient.mobileNetworks
    - ✅ MobileNetworkManagementClient.operations
    - ✅ MobileNetworkManagementClient.packetCaptures
    - ✅ MobileNetworkManagementClient.packetCoreControlPlanes
    - ✅ MobileNetworkManagementClient.packetCoreControlPlaneVersions
    - ✅ MobileNetworkManagementClient.packetCoreDataPlanes
    - ✅ MobileNetworkManagementClient.services
    - ✅ MobileNetworkManagementClient.sims
    - ✅ MobileNetworkManagementClient.simGroups
    - ✅ MobileNetworkManagementClient.simPolicies
    - ✅ MobileNetworkManagementClient.sites
    - ✅ MobileNetworkManagementClient.slices
    - ✅ NetworkManagementClient.applicationGateways
    - ✅ NetworkManagementClient.applicationGatewayPrivateLinkResources
    - ✅ NetworkManagementClient.applicationGatewayPrivateEndpointConnections
    - ✅ NetworkManagementClient.applicationGatewayWafDynamicManifestsDefault
    - ✅ NetworkManagementClient.applicationGatewayWafDynamicManifests
    - ✅ NetworkManagementClient.applicationSecurityGroups
    - ✅ NetworkManagementClient.availableDelegations
    - ✅ NetworkManagementClient.availableResourceGroupDelegations
    - ✅ NetworkManagementClient.availableServiceAliases
    - ✅ NetworkManagementClient.azureFirewalls
    - ✅ NetworkManagementClient.azureFirewallFqdnTags
    - ✅ NetworkManagementClient.webCategories
    - ✅ NetworkManagementClient.bastionHosts
    - ✅ NetworkManagementClient.networkInterfaces
    - ✅ NetworkManagementClient.publicIPAddresses
    - ✅ NetworkManagementClient.vipSwap
    - ✅ NetworkManagementClient.customIPPrefixes
    - ✅ NetworkManagementClient.ddosCustomPolicies
    - ✅ NetworkManagementClient.ddosProtectionPlans
    - ✅ NetworkManagementClient.dscpConfigurationOperations
    - ✅ NetworkManagementClient.availableEndpointServices
    - ✅ NetworkManagementClient.expressRouteCircuitAuthorizations
    - ✅ NetworkManagementClient.expressRouteCircuitPeerings
    - ✅ NetworkManagementClient.expressRouteCircuitConnections
    - ✅ NetworkManagementClient.peerExpressRouteCircuitConnections
    - ✅ NetworkManagementClient.expressRouteCircuits
    - ✅ NetworkManagementClient.expressRouteServiceProviders
    - ✅ NetworkManagementClient.expressRouteCrossConnections
    - ✅ NetworkManagementClient.expressRouteCrossConnectionPeerings
    - ✅ NetworkManagementClient.expressRoutePortsLocations
    - ✅ NetworkManagementClient.expressRoutePorts
    - ✅ NetworkManagementClient.expressRouteLinks
    - ✅ NetworkManagementClient.expressRoutePortAuthorizations
    - ✅ NetworkManagementClient.expressRouteProviderPortsLocation
    - ✅ NetworkManagementClient.firewallPolicies
    - ✅ NetworkManagementClient.firewallPolicyRuleCollectionGroups
    - ✅ NetworkManagementClient.firewallPolicyIdpsSignatures
    - ✅ NetworkManagementClient.firewallPolicyIdpsSignaturesOverrides
    - ✅ NetworkManagementClient.firewallPolicyIdpsSignaturesFilterValues
    - ✅ NetworkManagementClient.ipAllocations
    - ✅ NetworkManagementClient.ipGroups
    - ✅ NetworkManagementClient.loadBalancers
    - ✅ NetworkManagementClient.loadBalancerBackendAddressPools
    - ✅ NetworkManagementClient.loadBalancerFrontendIPConfigurations
    - ✅ NetworkManagementClient.inboundNatRules
    - ✅ NetworkManagementClient.loadBalancerLoadBalancingRules
    - ✅ NetworkManagementClient.loadBalancerOutboundRules
    - ✅ NetworkManagementClient.loadBalancerNetworkInterfaces
    - ✅ NetworkManagementClient.loadBalancerProbes
    - ✅ NetworkManagementClient.natGateways
    - ✅ NetworkManagementClient.networkInterfaceIPConfigurations
    - ✅ NetworkManagementClient.networkInterfaceLoadBalancers
    - ✅ NetworkManagementClient.networkInterfaceTapConfigurations
    - ✅ NetworkManagementClient.networkManagers
    - ✅ NetworkManagementClient.networkManagerCommits
    - ✅ NetworkManagementClient.networkManagerDeploymentStatusOperations
    - ✅ NetworkManagementClient.subscriptionNetworkManagerConnections
    - ✅ NetworkManagementClient.managementGroupNetworkManagerConnections
    - ✅ NetworkManagementClient.connectivityConfigurations
    - ✅ NetworkManagementClient.networkGroups
    - ✅ NetworkManagementClient.staticMembers
    - ✅ NetworkManagementClient.scopeConnections
    - ✅ NetworkManagementClient.securityAdminConfigurations
    - ✅ NetworkManagementClient.adminRuleCollections
    - ✅ NetworkManagementClient.adminRules
    - ✅ NetworkManagementClient.networkProfiles
    - ✅ NetworkManagementClient.networkSecurityGroups
    - ✅ NetworkManagementClient.securityRules
    - ✅ NetworkManagementClient.defaultSecurityRules
    - ✅ NetworkManagementClient.networkVirtualAppliances
    - ✅ NetworkManagementClient.virtualApplianceSites
    - ✅ NetworkManagementClient.virtualApplianceSkus
    - ✅ NetworkManagementClient.inboundSecurityRuleOperations
    - ✅ NetworkManagementClient.networkWatchers
    - ✅ NetworkManagementClient.packetCaptures
    - ✅ NetworkManagementClient.connectionMonitors
    - ✅ NetworkManagementClient.flowLogs
    - ✅ NetworkManagementClient.operations
    - ✅ NetworkManagementClient.privateEndpoints
    - ✅ NetworkManagementClient.availablePrivateEndpointTypes
    - ✅ NetworkManagementClient.privateDnsZoneGroups
    - ✅ NetworkManagementClient.privateLinkServices
    - ✅ NetworkManagementClient.publicIPPrefixes
    - ✅ NetworkManagementClient.routeFilters
    - ✅ NetworkManagementClient.routeFilterRules
    - ✅ NetworkManagementClient.routeTables
    - ✅ NetworkManagementClient.routes
    - ✅ NetworkManagementClient.securityPartnerProviders
    - ✅ NetworkManagementClient.bgpServiceCommunities
    - ✅ NetworkManagementClient.serviceEndpointPolicies
    - ✅ NetworkManagementClient.serviceEndpointPolicyDefinitions
    - ✅ NetworkManagementClient.serviceTags
    - ✅ NetworkManagementClient.serviceTagInformationOperations
    - ✅ NetworkManagementClient.usages
    - ✅ NetworkManagementClient.virtualNetworks
    - ✅ NetworkManagementClient.subnets
    - ✅ NetworkManagementClient.resourceNavigationLinks
    - ✅ NetworkManagementClient.serviceAssociationLinks
    - ✅ NetworkManagementClient.virtualNetworkPeerings
    - ✅ NetworkManagementClient.virtualNetworkGateways
    - ✅ NetworkManagementClient.virtualNetworkGatewayConnections
    - ✅ NetworkManagementClient.localNetworkGateways
    - ✅ NetworkManagementClient.virtualNetworkGatewayNatRules
    - ✅ NetworkManagementClient.virtualNetworkTaps
    - ✅ NetworkManagementClient.virtualRouters
    - ✅ NetworkManagementClient.virtualRouterPeerings
    - ✅ NetworkManagementClient.virtualWans
    - ✅ NetworkManagementClient.vpnSites
    - ✅ NetworkManagementClient.vpnSiteLinks
    - ✅ NetworkManagementClient.vpnSitesConfiguration
    - ✅ NetworkManagementClient.vpnServerConfigurations
    - ✅ NetworkManagementClient.configurationPolicyGroups
    - ✅ NetworkManagementClient.virtualHubs
    - ✅ NetworkManagementClient.routeMaps
    - ✅ NetworkManagementClient.hubVirtualNetworkConnections
    - ✅ NetworkManagementClient.vpnGateways
    - ✅ NetworkManagementClient.vpnLinkConnections
    - ✅ NetworkManagementClient.vpnConnections
    - ✅ NetworkManagementClient.vpnSiteLinkConnections
    - ✅ NetworkManagementClient.natRules
    - ✅ NetworkManagementClient.p2SVpnGateways
    - ✅ NetworkManagementClient.vpnServerConfigurationsAssociatedWithVirtualWan
    - ✅ NetworkManagementClient.virtualHubRouteTableV2S
    - ✅ NetworkManagementClient.expressRouteGateways
    - ✅ NetworkManagementClient.expressRouteConnections
    - ✅ NetworkManagementClient.virtualHubBgpConnection
    - ✅ NetworkManagementClient.virtualHubBgpConnections
    - ✅ NetworkManagementClient.virtualHubIpConfiguration
    - ✅ NetworkManagementClient.hubRouteTables
    - ✅ NetworkManagementClient.routingIntentOperations
    - ✅ NetworkManagementClient.webApplicationFirewallPolicies
    - ✅ SynapseManagementClient.azureADOnlyAuthentications
    - ✅ SynapseManagementClient.operations
    - ✅ SynapseManagementClient.ipFirewallRules
    - ✅ SynapseManagementClient.keys
    - ✅ SynapseManagementClient.privateEndpointConnections
    - ✅ SynapseManagementClient.privateLinkResources
    - ✅ SynapseManagementClient.privateLinkHubPrivateLinkResources
    - ✅ SynapseManagementClient.privateLinkHubs
    - ✅ SynapseManagementClient.privateEndpointConnectionsPrivateLinkHub
    - ✅ SynapseManagementClient.sqlPools
    - ✅ SynapseManagementClient.sqlPoolMetadataSyncConfigs
    - ✅ SynapseManagementClient.sqlPoolOperationResults
    - ✅ SynapseManagementClient.sqlPoolGeoBackupPolicies
    - ✅ SynapseManagementClient.sqlPoolDataWarehouseUserActivities
    - ✅ SynapseManagementClient.sqlPoolRestorePoints
    - ✅ SynapseManagementClient.sqlPoolReplicationLinks
    - ✅ SynapseManagementClient.sqlPoolMaintenanceWindows
    - ✅ SynapseManagementClient.sqlPoolMaintenanceWindowOptions
    - ✅ SynapseManagementClient.sqlPoolTransparentDataEncryptions
    - ✅ SynapseManagementClient.sqlPoolBlobAuditingPolicies
    - ✅ SynapseManagementClient.sqlPoolOperations
    - ✅ SynapseManagementClient.sqlPoolUsages
    - ✅ SynapseManagementClient.sqlPoolSensitivityLabels
    - ✅ SynapseManagementClient.sqlPoolRecommendedSensitivityLabels
    - ✅ SynapseManagementClient.sqlPoolSchemas
    - ✅ SynapseManagementClient.sqlPoolTables
    - ✅ SynapseManagementClient.sqlPoolTableColumns
    - ✅ SynapseManagementClient.sqlPoolConnectionPolicies
    - ✅ SynapseManagementClient.sqlPoolVulnerabilityAssessments
    - ✅ SynapseManagementClient.sqlPoolVulnerabilityAssessmentScans
    - ✅ SynapseManagementClient.sqlPoolSecurityAlertPolicies
    - ✅ SynapseManagementClient.sqlPoolVulnerabilityAssessmentRuleBaselines
    - ✅ SynapseManagementClient.extendedSqlPoolBlobAuditingPolicies
    - ✅ SynapseManagementClient.dataMaskingPolicies
    - ✅ SynapseManagementClient.dataMaskingRules
    - ✅ SynapseManagementClient.sqlPoolColumns
    - ✅ SynapseManagementClient.sqlPoolWorkloadGroup
    - ✅ SynapseManagementClient.sqlPoolWorkloadClassifier
    - ✅ SynapseManagementClient.workspaceManagedSqlServerBlobAuditingPolicies
    - ✅ SynapseManagementClient.workspaceManagedSqlServerExtendedBlobAuditingPolicies
    - ✅ SynapseManagementClient.workspaceManagedSqlServerSecurityAlertPolicy
    - ✅ SynapseManagementClient.workspaceManagedSqlServerVulnerabilityAssessments
    - ✅ SynapseManagementClient.workspaceManagedSqlServerEncryptionProtector
    - ✅ SynapseManagementClient.workspaceManagedSqlServerUsages
    - ✅ SynapseManagementClient.workspaceManagedSqlServerRecoverableSqlPools
    - ✅ SynapseManagementClient.workspaces
    - ✅ SynapseManagementClient.workspaceAadAdmins
    - ✅ SynapseManagementClient.workspaceSqlAadAdmins
    - ✅ SynapseManagementClient.workspaceManagedIdentitySqlControlSettings
    - ✅ SynapseManagementClient.restorableDroppedSqlPools
    - ✅ SynapseManagementClient.bigDataPools
    - ✅ SynapseManagementClient.library
    - ✅ SynapseManagementClient.libraries
    - ✅ SynapseManagementClient.integrationRuntimes
    - ✅ SynapseManagementClient.integrationRuntimeNodeIpAddressOperations
    - ✅ SynapseManagementClient.integrationRuntimeObjectMetadata
    - ✅ SynapseManagementClient.integrationRuntimeNodes
    - ✅ SynapseManagementClient.integrationRuntimeCredentials
    - ✅ SynapseManagementClient.integrationRuntimeConnectionInfos
    - ✅ SynapseManagementClient.integrationRuntimeAuthKeysOperations
    - ✅ SynapseManagementClient.integrationRuntimeMonitoringDataOperations
    - ✅ SynapseManagementClient.integrationRuntimeStatusOperations
    - ✅ SynapseManagementClient.sparkConfiguration
    - ✅ SynapseManagementClient.sparkConfigurations
    - ✅ SynapseManagementClient.kustoOperations
    - ✅ SynapseManagementClient.kustoPools
    - ✅ SynapseManagementClient.kustoPoolChildResource
    - ✅ SynapseManagementClient.kustoPoolAttachedDatabaseConfigurations
    - ✅ SynapseManagementClient.kustoPoolDatabases
    - ✅ SynapseManagementClient.kustoPoolDataConnections
    - ✅ SynapseManagementClient.kustoPoolPrincipalAssignments
    - ✅ SynapseManagementClient.kustoPoolDatabasePrincipalAssignments
    - ✅ MySQLManagementClient.servers
    - ✅ MySQLManagementClient.replicas
    - ✅ MySQLManagementClient.firewallRules
    - ✅ MySQLManagementClient.virtualNetworkRules
    - ✅ MySQLManagementClient.databases
    - ✅ MySQLManagementClient.configurations
    - ✅ MySQLManagementClient.serverParameters
    - ✅ MySQLManagementClient.logFiles
    - ✅ MySQLManagementClient.serverAdministrators
    - ✅ MySQLManagementClient.recoverableServers
    - ✅ MySQLManagementClient.serverBasedPerformanceTier
    - ✅ MySQLManagementClient.locationBasedPerformanceTier
    - ✅ MySQLManagementClient.checkNameAvailability
    - ✅ MySQLManagementClient.operations
    - ✅ MySQLManagementClient.serverSecurityAlertPolicies
    - ✅ MySQLManagementClient.queryTexts
    - ✅ MySQLManagementClient.topQueryStatistics
    - ✅ MySQLManagementClient.waitStatistics
    - ✅ MySQLManagementClient.advisors
    - ✅ MySQLManagementClient.recommendedActions
    - ✅ MySQLManagementClient.locationBasedRecommendedActionSessionsOperationStatus
    - ✅ MySQLManagementClient.locationBasedRecommendedActionSessionsResult
    - ✅ MySQLManagementClient.privateEndpointConnections
    - ✅ MySQLManagementClient.privateLinkResources
    - ✅ MySQLManagementClient.serverKeys
    - ✅ TemplateSpecsClient.templateSpecs
    - ✅ TemplateSpecsClient.templateSpecVersions
    - ✅ ManagementLinkClient.operations
    - ✅ ManagementLinkClient.resourceLinks
    - ✅ MicrosoftDatadogClient.marketplaceAgreements
    - ✅ MicrosoftDatadogClient.creationSupported
    - ✅ MicrosoftDatadogClient.monitors
    - ✅ MicrosoftDatadogClient.operations
    - ✅ MicrosoftDatadogClient.tagRules
    - ✅ MicrosoftDatadogClient.singleSignOnConfigurations
    - ✅ MicrosoftDatadogClient.monitoredSubscriptions
    - ✅ IotHubClient.operations
    - ✅ IotHubClient.iotHubResource
    - ✅ IotHubClient.resourceProviderCommon
    - ✅ IotHubClient.certificates
    - ✅ IotHubClient.iotHub
    - ✅ IotHubClient.privateLinkResourcesOperations
    - ✅ IotHubClient.privateEndpointConnections
    - ✅ AzureStackHCIClient.arcSettings
    - ✅ AzureStackHCIClient.clusters
    - ✅ AzureStackHCIClient.extensions
    - ✅ AzureStackHCIClient.operations
    - ✅ MachineLearningWorkspacesManagementClient.operations
    - ✅ MachineLearningWorkspacesManagementClient.workspaces
    - ✅ OperationalInsightsManagementClient.queryPacks
    - ✅ OperationalInsightsManagementClient.queries
    - ✅ OperationalInsightsManagementClient.dataExports
    - ✅ OperationalInsightsManagementClient.dataSources
    - ✅ OperationalInsightsManagementClient.intelligencePacks
    - ✅ OperationalInsightsManagementClient.linkedServices
    - ✅ OperationalInsightsManagementClient.linkedStorageAccounts
    - ✅ OperationalInsightsManagementClient.managementGroups
    - ✅ OperationalInsightsManagementClient.operationStatuses
    - ✅ OperationalInsightsManagementClient.sharedKeysOperations
    - ✅ OperationalInsightsManagementClient.usages
    - ✅ OperationalInsightsManagementClient.storageInsightConfigs
    - ✅ OperationalInsightsManagementClient.savedSearches
    - ✅ OperationalInsightsManagementClient.availableServiceTiers
    - ✅ OperationalInsightsManagementClient.gateways
    - ✅ OperationalInsightsManagementClient.schemaOperations
    - ✅ OperationalInsightsManagementClient.workspacePurge
    - ✅ OperationalInsightsManagementClient.clusters
    - ✅ OperationalInsightsManagementClient.operations
    - ✅ OperationalInsightsManagementClient.workspaces
    - ✅ OperationalInsightsManagementClient.deletedWorkspaces
    - ✅ OperationalInsightsManagementClient.tables
    - ✅ ResourceGraphClient.acceptLanguage
    - ✅ ResourceGraphClient.longRunningOperationRetryTimeout
    - ✅ ResourceGraphClient.baseUri
    - ✅ ResourceGraphClient.requestContentType
    - ✅ ResourceGraphClient.credentials
    - ✅ ResourceGraphClient.operations
    - ✅ UsageManagementClient.acceptLanguage
    - ✅ UsageManagementClient.longRunningOperationRetryTimeout
    - ✅ UsageManagementClient.baseUri
    - ✅ UsageManagementClient.requestContentType
    - ✅ UsageManagementClient.credentials
    - ✅ UsageManagementClient.usageAggregates
    - ✅ UsageManagementClient.rateCard
    - ✅ ConfluentManagementClient.marketplaceAgreements
    - ✅ ConfluentManagementClient.organizationOperations
    - ✅ ConfluentManagementClient.organization
    - ✅ ConfluentManagementClient.validations
    - ✅ ConfluentManagementClient.access
    - ✅ ServicemapManagementClient.acceptLanguage
    - ✅ ServicemapManagementClient.longRunningOperationRetryTimeout
    - ✅ ServicemapManagementClient.baseUri
    - ✅ ServicemapManagementClient.requestContentType
    - ✅ ServicemapManagementClient.credentials
    - ✅ ServicemapManagementClient.machines
    - ✅ ServicemapManagementClient.processes
    - ✅ ServicemapManagementClient.ports
    - ✅ ServicemapManagementClient.clientGroups
    - ✅ ServicemapManagementClient.maps
    - ✅ ServicemapManagementClient.summaries
    - ✅ ServicemapManagementClient.machineGroups
    - ✅ ApiManagementClient.api
    - ✅ ApiManagementClient.apiRevision
    - ✅ ApiManagementClient.apiRelease
    - ✅ ApiManagementClient.apiOperation
    - ✅ ApiManagementClient.apiOperationPolicy
    - ✅ ApiManagementClient.tag
    - ✅ ApiManagementClient.graphQLApiResolver
    - ✅ ApiManagementClient.graphQLApiResolverPolicy
    - ✅ ApiManagementClient.apiProduct
    - ✅ ApiManagementClient.apiPolicy
    - ✅ ApiManagementClient.apiSchema
    - ✅ ApiManagementClient.apiDiagnostic
    - ✅ ApiManagementClient.apiIssue
    - ✅ ApiManagementClient.apiIssueComment
    - ✅ ApiManagementClient.apiIssueAttachment
    - ✅ ApiManagementClient.apiTagDescription
    - ✅ ApiManagementClient.operationOperations
    - ✅ ApiManagementClient.apiWiki
    - ✅ ApiManagementClient.apiWikis
    - ✅ ApiManagementClient.apiExport
    - ✅ ApiManagementClient.apiVersionSet
    - ✅ ApiManagementClient.authorizationServer
    - ✅ ApiManagementClient.authorizationProvider
    - ✅ ApiManagementClient.authorization
    - ✅ ApiManagementClient.authorizationLoginLinks
    - ✅ ApiManagementClient.authorizationAccessPolicy
    - ✅ ApiManagementClient.backend
    - ✅ ApiManagementClient.cache
    - ✅ ApiManagementClient.certificate
    - ✅ ApiManagementClient.contentType
    - ✅ ApiManagementClient.contentItem
    - ✅ ApiManagementClient.deletedServices
    - ✅ ApiManagementClient.apiManagementOperations
    - ✅ ApiManagementClient.apiManagementServiceSkus
    - ✅ ApiManagementClient.apiManagementService
    - ✅ ApiManagementClient.diagnostic
    - ✅ ApiManagementClient.emailTemplate
    - ✅ ApiManagementClient.gateway
    - ✅ ApiManagementClient.gatewayHostnameConfiguration
    - ✅ ApiManagementClient.gatewayApi
    - ✅ ApiManagementClient.gatewayCertificateAuthority
    - ✅ ApiManagementClient.group
    - ✅ ApiManagementClient.groupUser
    - ✅ ApiManagementClient.identityProvider
    - ✅ ApiManagementClient.issue
    - ✅ ApiManagementClient.logger
    - ✅ ApiManagementClient.namedValue
    - ✅ ApiManagementClient.networkStatus
    - ✅ ApiManagementClient.notification
    - ✅ ApiManagementClient.notificationRecipientUser
    - ✅ ApiManagementClient.notificationRecipientEmail
    - ✅ ApiManagementClient.openIdConnectProvider
    - ✅ ApiManagementClient.outboundNetworkDependenciesEndpoints
    - ✅ ApiManagementClient.policy
    - ✅ ApiManagementClient.policyDescription
    - ✅ ApiManagementClient.policyFragment
    - ✅ ApiManagementClient.portalConfig
    - ✅ ApiManagementClient.portalRevision
    - ✅ ApiManagementClient.portalSettings
    - ✅ ApiManagementClient.signInSettings
    - ✅ ApiManagementClient.signUpSettings
    - ✅ ApiManagementClient.delegationSettings
    - ✅ ApiManagementClient.privateEndpointConnectionOperations
    - ✅ ApiManagementClient.product
    - ✅ ApiManagementClient.productApi
    - ✅ ApiManagementClient.productGroup
    - ✅ ApiManagementClient.productSubscriptions
    - ✅ ApiManagementClient.productPolicy
    - ✅ ApiManagementClient.productWiki
    - ✅ ApiManagementClient.productWikis
    - ✅ ApiManagementClient.quotaByCounterKeys
    - ✅ ApiManagementClient.quotaByPeriodKeys
    - ✅ ApiManagementClient.region
    - ✅ ApiManagementClient.reports
    - ✅ ApiManagementClient.globalSchema
    - ✅ ApiManagementClient.tenantSettings
    - ✅ ApiManagementClient.apiManagementSkus
    - ✅ ApiManagementClient.subscription
    - ✅ ApiManagementClient.tagResource
    - ✅ ApiManagementClient.tenantAccess
    - ✅ ApiManagementClient.tenantAccessGit
    - ✅ ApiManagementClient.tenantConfiguration
    - ✅ ApiManagementClient.user
    - ✅ ApiManagementClient.userGroup
    - ✅ ApiManagementClient.userSubscription
    - ✅ ApiManagementClient.userIdentities
    - ✅ ApiManagementClient.userConfirmationPassword
    - ✅ ApiManagementClient.documentation
    - ✅ SqlVirtualMachineManagementClient.acceptLanguage
    - ✅ SqlVirtualMachineManagementClient.longRunningOperationRetryTimeout
    - ✅ SqlVirtualMachineManagementClient.baseUri
    - ✅ SqlVirtualMachineManagementClient.requestContentType
    - ✅ SqlVirtualMachineManagementClient.credentials
    - ✅ SqlVirtualMachineManagementClient.availabilityGroupListeners
    - ✅ SqlVirtualMachineManagementClient.operations
    - ✅ SqlVirtualMachineManagementClient.sqlVirtualMachineGroups
    - ✅ SqlVirtualMachineManagementClient.sqlVirtualMachines
    - ✅ RecoveryServicesClient.vaultCertificates
    - ✅ RecoveryServicesClient.registeredIdentities
    - ✅ RecoveryServicesClient.replicationUsages
    - ✅ RecoveryServicesClient.privateLinkResourcesOperations
    - ✅ RecoveryServicesClient.recoveryServices
    - ✅ RecoveryServicesClient.vaults
    - ✅ RecoveryServicesClient.operations
    - ✅ RecoveryServicesClient.vaultExtendedInfo
    - ✅ RecoveryServicesClient.usages
    - ✅ AzureDatabricksManagementClient.workspaces
    - ✅ AzureDatabricksManagementClient.operations
    - ✅ AzureDatabricksManagementClient.privateLinkResources
    - ✅ AzureDatabricksManagementClient.privateEndpointConnections
    - ✅ AzureDatabricksManagementClient.outboundNetworkDependenciesEndpoints
    - ✅ AzureDatabricksManagementClient.vNetPeering
    - ✅ AzureDatabricksManagementClient.accessConnectors
    - ✅ DataFactoryManagementClient.operations
    - ✅ DataFactoryManagementClient.factories
    - ✅ DataFactoryManagementClient.exposureControl
    - ✅ DataFactoryManagementClient.integrationRuntimes
    - ✅ DataFactoryManagementClient.integrationRuntimeObjectMetadata
    - ✅ DataFactoryManagementClient.integrationRuntimeNodes
    - ✅ DataFactoryManagementClient.linkedServices
    - ✅ DataFactoryManagementClient.datasets
    - ✅ DataFactoryManagementClient.pipelines
    - ✅ DataFactoryManagementClient.pipelineRuns
    - ✅ DataFactoryManagementClient.activityRuns
    - ✅ DataFactoryManagementClient.triggers
    - ✅ DataFactoryManagementClient.triggerRuns
    - ✅ DataFactoryManagementClient.dataFlows
    - ✅ DataFactoryManagementClient.dataFlowDebugSession
    - ✅ DataFactoryManagementClient.managedVirtualNetworks
    - ✅ DataFactoryManagementClient.managedPrivateEndpoints
    - ✅ DataFactoryManagementClient.credentialOperations
    - ✅ DataFactoryManagementClient.privateEndPointConnections
    - ✅ DataFactoryManagementClient.privateEndpointConnection
    - ✅ DataFactoryManagementClient.privateLinkResources
    - ✅ DataFactoryManagementClient.globalParameters
    - ✅ DataFactoryManagementClient.changeDataCapture
    - ✅ TimeSeriesInsightsClient.operations
    - ✅ TimeSeriesInsightsClient.environments
    - ✅ TimeSeriesInsightsClient.eventSources
    - ✅ TimeSeriesInsightsClient.referenceDataSets
    - ✅ TimeSeriesInsightsClient.accessPolicies
    - ✅ AzureDigitalTwinsManagementClient.digitalTwins
    - ✅ AzureDigitalTwinsManagementClient.digitalTwinsEndpoint
    - ✅ AzureDigitalTwinsManagementClient.operations
    - ✅ AzureDigitalTwinsManagementClient.privateLinkResources
    - ✅ AzureDigitalTwinsManagementClient.privateEndpointConnections
    - ✅ AzureDigitalTwinsManagementClient.timeSeriesDatabaseConnections
    - ✅ WebPubSubManagementClient.operations
    - ✅ WebPubSubManagementClient.webPubSub
    - ✅ WebPubSubManagementClient.usages
    - ✅ WebPubSubManagementClient.webPubSubCustomCertificates
    - ✅ WebPubSubManagementClient.webPubSubCustomDomains
    - ✅ WebPubSubManagementClient.webPubSubHubs
    - ✅ WebPubSubManagementClient.webPubSubPrivateEndpointConnections
    - ✅ WebPubSubManagementClient.webPubSubPrivateLinkResources
    - ✅ WebPubSubManagementClient.webPubSubSharedPrivateLinkResources
    - ✅ NotificationHubsManagementClient.operations
    - ✅ NotificationHubsManagementClient.namespaces
    - ✅ NotificationHubsManagementClient.notificationHubs
    - ✅ ConnectedKubernetesClient.connectedClusterOperations
    - ✅ ConnectedKubernetesClient.operations
    - ✅ AdvisorManagementClient.recommendationMetadata
    - ✅ AdvisorManagementClient.configurations
    - ✅ AdvisorManagementClient.recommendations
    - ✅ AdvisorManagementClient.operations
    - ✅ AdvisorManagementClient.suppressions
    - ✅ HealthbotClient.bots
    - ✅ HealthbotClient.operations
    - ✅ HealthcareApisManagementClient.services
    - ✅ HealthcareApisManagementClient.privateEndpointConnections
    - ✅ HealthcareApisManagementClient.privateLinkResources
    - ✅ HealthcareApisManagementClient.workspaces
    - ✅ HealthcareApisManagementClient.dicomServices
    - ✅ HealthcareApisManagementClient.iotConnectors
    - ✅ HealthcareApisManagementClient.fhirDestinations
    - ✅ HealthcareApisManagementClient.iotConnectorFhirDestination
    - ✅ HealthcareApisManagementClient.fhirServices
    - ✅ HealthcareApisManagementClient.workspacePrivateEndpointConnections
    - ✅ HealthcareApisManagementClient.workspacePrivateLinkResources
    - ✅ HealthcareApisManagementClient.operations
    - ✅ HealthcareApisManagementClient.operationResults
    - ✅ CustomerInsightsManagementClient.operations
    - ✅ CustomerInsightsManagementClient.hubs
    - ✅ CustomerInsightsManagementClient.profiles
    - ✅ CustomerInsightsManagementClient.interactions
    - ✅ CustomerInsightsManagementClient.relationships
    - ✅ CustomerInsightsManagementClient.relationshipLinks
    - ✅ CustomerInsightsManagementClient.authorizationPolicies
    - ✅ CustomerInsightsManagementClient.connectors
    - ✅ CustomerInsightsManagementClient.connectorMappings
    - ✅ CustomerInsightsManagementClient.kpi
    - ✅ CustomerInsightsManagementClient.widgetTypes
    - ✅ CustomerInsightsManagementClient.views
    - ✅ CustomerInsightsManagementClient.links
    - ✅ CustomerInsightsManagementClient.roles
    - ✅ CustomerInsightsManagementClient.roleAssignments
    - ✅ CustomerInsightsManagementClient.images
    - ✅ CustomerInsightsManagementClient.predictions
    - ✅ IotDpsClient.operations
    - ✅ IotDpsClient.dpsCertificate
    - ✅ IotDpsClient.iotDpsResource
    - ✅ DevSpacesManagementClient.containerHostMappings
    - ✅ DevSpacesManagementClient.operations
    - ✅ DevSpacesManagementClient.controllers
    - ✅ MySQLManagementFlexibleServerClient.servers
    - ✅ MySQLManagementFlexibleServerClient.replicas
    - ✅ MySQLManagementFlexibleServerClient.backups
    - ✅ MySQLManagementFlexibleServerClient.firewallRules
    - ✅ MySQLManagementFlexibleServerClient.databases
    - ✅ MySQLManagementFlexibleServerClient.configurations
    - ✅ MySQLManagementFlexibleServerClient.locationBasedCapabilities
    - ✅ MySQLManagementFlexibleServerClient.checkVirtualNetworkSubnetUsage
    - ✅ MySQLManagementFlexibleServerClient.checkNameAvailability
    - ✅ MySQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
    - ✅ MySQLManagementFlexibleServerClient.operations
    - ✅ ContainerAppsAPIClient.containerAppsAuthConfigs
    - ✅ ContainerAppsAPIClient.availableWorkloadProfiles
    - ✅ ContainerAppsAPIClient.billingMeters
    - ✅ ContainerAppsAPIClient.connectedEnvironments
    - ✅ ContainerAppsAPIClient.connectedEnvironmentsCertificates
    - ✅ ContainerAppsAPIClient.connectedEnvironmentsDaprComponents
    - ✅ ContainerAppsAPIClient.connectedEnvironmentsStorages
    - ✅ ContainerAppsAPIClient.containerApps
    - ✅ ContainerAppsAPIClient.containerAppsRevisions
    - ✅ ContainerAppsAPIClient.containerAppsRevisionReplicas
    - ✅ ContainerAppsAPIClient.containerAppsDiagnostics
    - ✅ ContainerAppsAPIClient.managedEnvironmentDiagnostics
    - ✅ ContainerAppsAPIClient.managedEnvironmentsDiagnostics
    - ✅ ContainerAppsAPIClient.operations
    - ✅ ContainerAppsAPIClient.jobs
    - ✅ ContainerAppsAPIClient.jobsExecutions
    - ✅ ContainerAppsAPIClient.managedEnvironments
    - ✅ ContainerAppsAPIClient.certificates
    - ✅ ContainerAppsAPIClient.managedCertificates
    - ✅ ContainerAppsAPIClient.namespaces
    - ✅ ContainerAppsAPIClient.daprComponents
    - ✅ ContainerAppsAPIClient.managedEnvironmentsStorages
    - ✅ ContainerAppsAPIClient.containerAppsSourceControls
    - ✅ ChangesClient.changes
    - ✅ ServiceLinkerManagementClient.linker
    - ✅ ServiceLinkerManagementClient.operations
    - ✅ ConfidentialLedgerClient.operations
    - ✅ ConfidentialLedgerClient.ledger
    - ✅ EducationManagementClient.operations
    - ✅ EducationManagementClient.grants
    - ✅ EducationManagementClient.labs
    - ✅ EducationManagementClient.joinRequests
    - ✅ EducationManagementClient.students
    - ✅ EducationManagementClient.studentLabs
    - ✅ ExternalIdentitiesConfigurationClient.b2CTenants
    - ✅ ExternalIdentitiesConfigurationClient.operations
    - ✅ ExternalIdentitiesConfigurationClient.guestUsages
    - ✅ DashboardManagementClient.operations
    - ✅ DashboardManagementClient.grafana
    - ✅ DashboardManagementClient.privateEndpointConnections
    - ✅ DashboardManagementClient.privateLinkResources
    - ✅ DashboardManagementClient.managedPrivateEndpoints
- ✅ Gcp check in:
    - ✅ tasks_queue
    - ✅ compute
    - ✅ storage
    - ✅ project
    - ✅ billingAccount
    - ✅ cluster
    - ✅ workflows
    - ✅ websecurity
    - ✅ connector
    - ✅ vmware
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
    - ✅ runners
- ✅ GoogleDrive check in:
    - ✅ files
- ✅ GoogleWorkspace check in:
    - ✅ user
    - ✅ domain
    - ✅ group
    - ✅ role
    - ✅ orgaunit
    - ✅ calendar
    - ✅ file
    - ✅ drive
- ✅ Http check in:
    - ✅ request
- ✅ Kubernetes check in:
    - ✅ namespaces
    - ✅ pods
    - ✅ services
    - ✅ helm
    - ✅ configmap
    - ✅ deployment
    - ✅ replicaset
    - ✅ statefulset
    - ✅ daemonset
    - ✅ ingress
    - ✅ persistentvolume
    - ✅ persistentvolumeclaim
    - ✅ secret
    - ✅ serviceaccount
    - ✅ storageclass
    - ✅ networkpolicy
    - ✅ event
    - ✅ node
    - ✅ apiservice
    - ✅ lease
    - ✅ componentstatus
    - ✅ limitrange
    - ✅ resourcequota
    - ✅ podtemplate
- ✅ O365 check in:
    - ✅ sku
    - ✅ user
    - ✅ domain
    - ✅ secure_score
    - ✅ auth_methods
    - ✅ organization
    - ✅ directory_role
    - ✅ sp
    - ✅ alert
    - ✅ incident
    - ✅ app_access_policy
    - ✅ group
    - ✅ policy
    - ✅ conditional_access
    - ✅ sharepoint_settings

<div class='spliter_code'></div>

</details>

Next step:

- [ ] Kexa SaaS
- [ ] VM Ware
- [ ] OVH
- [ ] Database
	- [ ] Postgres
	- [ ] SQL
	- [ ] Mysql/MariaDB
	- [ ] Oracle

If you would like additional functionality, please send us your request. : <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
<p align="right">(<a href="#top">back to top</a>)</p>

# <div align="center" id="license">**License**</div>
<br/>

Distributed under the MIT License. See [`LICENSE.txt`](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt) for more information just [here](https://github.com/4urcloud/Kexa/blob/main/LICENCE.txt).


# <div align="center" id="contact">**Contact**</div>
<br/>

[contact@4urcloud.com](mailto:contact@4urcloud.com) - [![LinkedIn][linkedin-shield]](https://www.linkedin.com/company/4urcloud/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Blkvp7yZwRd2%2BaYEK4b0VWg%3D%3D)

Projects Link: [4urcloud](https://github.com/4urcloud)
Public site: 
	- [Kexa.io](https://github.com/4urcloud/Kexa/blob/rework-documentation/documentation/www.kexa.io)
	- [4urcloud.eu](https://4urcloud.eu/#/)
	- [www.TheCloudPrices.com](https://www.thecloudprices.com/)
<p align="right">(<a href="#top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
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
[NODE-shield]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
