/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
	*	- ResourceManagementClient.operations
	*	- ResourceManagementClient.deployments
	*	- ResourceManagementClient.providers
	*	- ResourceManagementClient.providerResourceTypes
	*	- ResourceManagementClient.resources
	*	- ResourceManagementClient.resourceGroups
	*	- ResourceManagementClient.tagsOperations
	*	- ResourceManagementClient.deploymentOperations
	*	- SubscriptionClient.operations
	*	- SubscriptionClient.subscriptions
	*	- SubscriptionClient.tenants
	*	- SqlManagementClient.dataMaskingPolicies
	*	- SqlManagementClient.dataMaskingRules
	*	- SqlManagementClient.geoBackupPolicies
	*	- SqlManagementClient.databases
	*	- SqlManagementClient.elasticPools
	*	- SqlManagementClient.serverCommunicationLinks
	*	- SqlManagementClient.serviceObjectives
	*	- SqlManagementClient.elasticPoolActivities
	*	- SqlManagementClient.elasticPoolDatabaseActivities
	*	- SqlManagementClient.serverUsages
	*	- SqlManagementClient.databaseAdvisors
	*	- SqlManagementClient.databaseAutomaticTuningOperations
	*	- SqlManagementClient.databaseColumns
	*	- SqlManagementClient.databaseRecommendedActions
	*	- SqlManagementClient.databaseSchemas
	*	- SqlManagementClient.databaseSecurityAlertPolicies
	*	- SqlManagementClient.databaseTables
	*	- SqlManagementClient.databaseVulnerabilityAssessmentRuleBaselines
	*	- SqlManagementClient.databaseVulnerabilityAssessments
	*	- SqlManagementClient.databaseVulnerabilityAssessmentScans
	*	- SqlManagementClient.dataWarehouseUserActivitiesOperations
	*	- SqlManagementClient.deletedServers
	*	- SqlManagementClient.elasticPoolOperations
	*	- SqlManagementClient.encryptionProtectors
	*	- SqlManagementClient.failoverGroups
	*	- SqlManagementClient.firewallRules
	*	- SqlManagementClient.instancePools
	*	- SqlManagementClient.jobAgents
	*	- SqlManagementClient.jobCredentials
	*	- SqlManagementClient.jobExecutions
	*	- SqlManagementClient.jobs
	*	- SqlManagementClient.jobStepExecutions
	*	- SqlManagementClient.jobSteps
	*	- SqlManagementClient.jobTargetExecutions
	*	- SqlManagementClient.jobTargetGroups
	*	- SqlManagementClient.jobVersions
	*	- SqlManagementClient.capabilities
	*	- SqlManagementClient.longTermRetentionPolicies
	*	- SqlManagementClient.maintenanceWindowOptionsOperations
	*	- SqlManagementClient.maintenanceWindowsOperations
	*	- SqlManagementClient.managedBackupShortTermRetentionPolicies
	*	- SqlManagementClient.managedDatabaseColumns
	*	- SqlManagementClient.managedDatabaseQueries
	*	- SqlManagementClient.managedDatabaseSchemas
	*	- SqlManagementClient.managedDatabaseSecurityAlertPolicies
	*	- SqlManagementClient.managedDatabaseSecurityEvents
	*	- SqlManagementClient.managedDatabaseTables
	*	- SqlManagementClient.managedDatabaseTransparentDataEncryption
	*	- SqlManagementClient.managedDatabaseVulnerabilityAssessmentRuleBaselines
	*	- SqlManagementClient.managedDatabaseVulnerabilityAssessments
	*	- SqlManagementClient.managedDatabaseVulnerabilityAssessmentScans
	*	- SqlManagementClient.managedInstanceAdministrators
	*	- SqlManagementClient.managedInstanceAzureADOnlyAuthentications
	*	- SqlManagementClient.managedInstanceEncryptionProtectors
	*	- SqlManagementClient.managedInstanceKeys
	*	- SqlManagementClient.managedInstanceLongTermRetentionPolicies
	*	- SqlManagementClient.managedInstanceOperations
	*	- SqlManagementClient.managedInstancePrivateEndpointConnections
	*	- SqlManagementClient.managedInstancePrivateLinkResources
	*	- SqlManagementClient.managedInstanceTdeCertificates
	*	- SqlManagementClient.managedInstanceVulnerabilityAssessments
	*	- SqlManagementClient.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies
	*	- SqlManagementClient.managedServerSecurityAlertPolicies
	*	- SqlManagementClient.operations
	*	- SqlManagementClient.privateEndpointConnections
	*	- SqlManagementClient.privateLinkResources
	*	- SqlManagementClient.recoverableManagedDatabases
	*	- SqlManagementClient.restorePoints
	*	- SqlManagementClient.serverAdvisors
	*	- SqlManagementClient.serverAutomaticTuningOperations
	*	- SqlManagementClient.serverAzureADAdministrators
	*	- SqlManagementClient.serverAzureADOnlyAuthentications
	*	- SqlManagementClient.serverDevOpsAuditSettings
	*	- SqlManagementClient.serverDnsAliases
	*	- SqlManagementClient.serverKeys
	*	- SqlManagementClient.serverOperations
	*	- SqlManagementClient.serverSecurityAlertPolicies
	*	- SqlManagementClient.serverTrustGroups
	*	- SqlManagementClient.serverVulnerabilityAssessments
	*	- SqlManagementClient.sqlAgent
	*	- SqlManagementClient.subscriptionUsages
	*	- SqlManagementClient.syncAgents
	*	- SqlManagementClient.syncGroups
	*	- SqlManagementClient.syncMembers
	*	- SqlManagementClient.tdeCertificates
	*	- SqlManagementClient.timeZones
	*	- SqlManagementClient.virtualNetworkRules
	*	- SqlManagementClient.workloadClassifiers
	*	- SqlManagementClient.workloadGroups
	*	- SqlManagementClient.backupShortTermRetentionPolicies
	*	- SqlManagementClient.databaseExtensionsOperations
	*	- SqlManagementClient.databaseOperations
	*	- SqlManagementClient.databaseUsages
	*	- SqlManagementClient.ledgerDigestUploadsOperations
	*	- SqlManagementClient.outboundFirewallRules
	*	- SqlManagementClient.usages
	*	- SqlManagementClient.longTermRetentionBackups
	*	- SqlManagementClient.longTermRetentionManagedInstanceBackups
	*	- SqlManagementClient.restorableDroppedManagedDatabases
	*	- SqlManagementClient.serverConnectionPolicies
	*	- SqlManagementClient.distributedAvailabilityGroups
	*	- SqlManagementClient.serverTrustCertificates
	*	- SqlManagementClient.iPv6FirewallRules
	*	- SqlManagementClient.endpointCertificates
	*	- SqlManagementClient.managedDatabaseSensitivityLabels
	*	- SqlManagementClient.managedDatabaseRecommendedSensitivityLabels
	*	- SqlManagementClient.sensitivityLabels
	*	- SqlManagementClient.recommendedSensitivityLabels
	*	- SqlManagementClient.serverBlobAuditingPolicies
	*	- SqlManagementClient.databaseBlobAuditingPolicies
	*	- SqlManagementClient.extendedDatabaseBlobAuditingPolicies
	*	- SqlManagementClient.extendedServerBlobAuditingPolicies
	*	- SqlManagementClient.databaseAdvancedThreatProtectionSettings
	*	- SqlManagementClient.serverAdvancedThreatProtectionSettings
	*	- SqlManagementClient.managedServerDnsAliases
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentBaselines
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentExecuteScan
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentRuleBaselines
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentScanResult
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentScans
	*	- SqlManagementClient.databaseSqlVulnerabilityAssessmentsSettings
	*	- SqlManagementClient.managedDatabaseAdvancedThreatProtectionSettings
	*	- SqlManagementClient.managedInstanceAdvancedThreatProtectionSettings
	*	- SqlManagementClient.replicationLinks
	*	- SqlManagementClient.sqlVulnerabilityAssessmentBaseline
	*	- SqlManagementClient.sqlVulnerabilityAssessmentBaselines
	*	- SqlManagementClient.sqlVulnerabilityAssessmentExecuteScan
	*	- SqlManagementClient.sqlVulnerabilityAssessmentRuleBaseline
	*	- SqlManagementClient.sqlVulnerabilityAssessmentRuleBaselines
	*	- SqlManagementClient.sqlVulnerabilityAssessmentScanResult
	*	- SqlManagementClient.sqlVulnerabilityAssessmentScans
	*	- SqlManagementClient.sqlVulnerabilityAssessmentsSettings
	*	- SqlManagementClient.sqlVulnerabilityAssessments
	*	- SqlManagementClient.managedDatabaseMoveOperations
	*	- SqlManagementClient.managedInstanceDtcs
	*	- SqlManagementClient.synapseLinkWorkspaces
	*	- SqlManagementClient.virtualClusters
	*	- SqlManagementClient.instanceFailoverGroups
	*	- SqlManagementClient.managedDatabaseRestoreDetails
	*	- SqlManagementClient.managedDatabases
	*	- SqlManagementClient.databaseEncryptionProtectors
	*	- SqlManagementClient.managedInstances
	*	- SqlManagementClient.managedLedgerDigestUploadsOperations
	*	- SqlManagementClient.recoverableDatabases
	*	- SqlManagementClient.restorableDroppedDatabases
	*	- SqlManagementClient.serverConfigurationOptions
	*	- SqlManagementClient.servers
	*	- SqlManagementClient.startStopManagedInstanceSchedules
	*	- SqlManagementClient.transparentDataEncryptions
	*	- StorageManagementClient.operations
	*	- StorageManagementClient.skus
	*	- StorageManagementClient.storageAccounts
	*	- StorageManagementClient.deletedAccounts
	*	- StorageManagementClient.usages
	*	- StorageManagementClient.managementPolicies
	*	- StorageManagementClient.blobInventoryPolicies
	*	- StorageManagementClient.privateEndpointConnections
	*	- StorageManagementClient.privateLinkResources
	*	- StorageManagementClient.objectReplicationPoliciesOperations
	*	- StorageManagementClient.localUsersOperations
	*	- StorageManagementClient.encryptionScopes
	*	- StorageManagementClient.blobServices
	*	- StorageManagementClient.blobContainers
	*	- StorageManagementClient.fileServices
	*	- StorageManagementClient.fileShares
	*	- StorageManagementClient.queueServices
	*	- StorageManagementClient.queue
	*	- StorageManagementClient.tableServices
	*	- StorageManagementClient.tableOperations
	*	- WebSiteManagementClient.appServiceCertificateOrders
	*	- WebSiteManagementClient.certificateOrdersDiagnostics
	*	- WebSiteManagementClient.certificateRegistrationProvider
	*	- WebSiteManagementClient.domains
	*	- WebSiteManagementClient.topLevelDomains
	*	- WebSiteManagementClient.domainRegistrationProvider
	*	- WebSiteManagementClient.appServiceEnvironments
	*	- WebSiteManagementClient.appServicePlans
	*	- WebSiteManagementClient.certificates
	*	- WebSiteManagementClient.containerApps
	*	- WebSiteManagementClient.containerAppsRevisions
	*	- WebSiteManagementClient.deletedWebApps
	*	- WebSiteManagementClient.diagnostics
	*	- WebSiteManagementClient.global
	*	- WebSiteManagementClient.kubeEnvironments
	*	- WebSiteManagementClient.provider
	*	- WebSiteManagementClient.recommendations
	*	- WebSiteManagementClient.resourceHealthMetadataOperations
	*	- WebSiteManagementClient.getUsagesInLocation
	*	- WebSiteManagementClient.staticSites
	*	- WebSiteManagementClient.webApps
	*	- WebSiteManagementClient.workflows
	*	- WebSiteManagementClient.workflowRuns
	*	- WebSiteManagementClient.workflowRunActions
	*	- WebSiteManagementClient.workflowRunActionRepetitions
	*	- WebSiteManagementClient.workflowRunActionRepetitionsRequestHistories
	*	- WebSiteManagementClient.workflowRunActionScopeRepetitions
	*	- WebSiteManagementClient.workflowTriggers
	*	- WebSiteManagementClient.workflowTriggerHistories
	*	- WebSiteManagementClient.workflowVersions
	*	- MonitorClient.autoscaleSettings
	*	- MonitorClient.operations
	*	- MonitorClient.alertRuleIncidents
	*	- MonitorClient.alertRules
	*	- MonitorClient.logProfiles
	*	- MonitorClient.diagnosticSettings
	*	- MonitorClient.diagnosticSettingsCategory
	*	- MonitorClient.actionGroups
	*	- MonitorClient.activityLogs
	*	- MonitorClient.eventCategories
	*	- MonitorClient.tenantActivityLogs
	*	- MonitorClient.metricDefinitions
	*	- MonitorClient.metrics
	*	- MonitorClient.baselines
	*	- MonitorClient.metricAlerts
	*	- MonitorClient.metricAlertsStatus
	*	- MonitorClient.scheduledQueryRules
	*	- MonitorClient.metricNamespaces
	*	- MonitorClient.vMInsights
	*	- MonitorClient.privateLinkScopes
	*	- MonitorClient.privateLinkScopeOperationStatus
	*	- MonitorClient.privateLinkResources
	*	- MonitorClient.privateEndpointConnections
	*	- MonitorClient.privateLinkScopedResources
	*	- MonitorClient.activityLogAlerts
	*	- MonitorClient.dataCollectionEndpoints
	*	- MonitorClient.dataCollectionRuleAssociations
	*	- MonitorClient.dataCollectionRules
	*	- ServiceBusManagementClient.namespaces
	*	- ServiceBusManagementClient.privateEndpointConnections
	*	- ServiceBusManagementClient.privateLinkResources
	*	- ServiceBusManagementClient.operations
	*	- ServiceBusManagementClient.disasterRecoveryConfigs
	*	- ServiceBusManagementClient.migrationConfigs
	*	- ServiceBusManagementClient.queues
	*	- ServiceBusManagementClient.topics
	*	- ServiceBusManagementClient.rules
	*	- ServiceBusManagementClient.subscriptions
	*	- KeyVaultManagementClient.keys
	*	- KeyVaultManagementClient.managedHsmKeys
	*	- KeyVaultManagementClient.vaults
	*	- KeyVaultManagementClient.privateEndpointConnections
	*	- KeyVaultManagementClient.privateLinkResources
	*	- KeyVaultManagementClient.managedHsms
	*	- KeyVaultManagementClient.mhsmPrivateEndpointConnections
	*	- KeyVaultManagementClient.mhsmPrivateLinkResources
	*	- KeyVaultManagementClient.mhsmRegions
	*	- KeyVaultManagementClient.operations
	*	- KeyVaultManagementClient.secrets
	*	- ComputeManagementClient.operations
	*	- ComputeManagementClient.usageOperations
	*	- ComputeManagementClient.virtualMachineSizes
	*	- ComputeManagementClient.virtualMachineScaleSets
	*	- ComputeManagementClient.virtualMachineScaleSetExtensions
	*	- ComputeManagementClient.virtualMachineScaleSetRollingUpgrades
	*	- ComputeManagementClient.virtualMachineScaleSetVMExtensions
	*	- ComputeManagementClient.virtualMachineScaleSetVMs
	*	- ComputeManagementClient.virtualMachineExtensions
	*	- ComputeManagementClient.virtualMachines
	*	- ComputeManagementClient.virtualMachineImages
	*	- ComputeManagementClient.virtualMachineImagesEdgeZone
	*	- ComputeManagementClient.virtualMachineExtensionImages
	*	- ComputeManagementClient.availabilitySets
	*	- ComputeManagementClient.proximityPlacementGroups
	*	- ComputeManagementClient.dedicatedHostGroups
	*	- ComputeManagementClient.dedicatedHosts
	*	- ComputeManagementClient.sshPublicKeys
	*	- ComputeManagementClient.images
	*	- ComputeManagementClient.restorePointCollections
	*	- ComputeManagementClient.restorePoints
	*	- ComputeManagementClient.capacityReservationGroups
	*	- ComputeManagementClient.capacityReservations
	*	- ComputeManagementClient.logAnalytics
	*	- ComputeManagementClient.virtualMachineRunCommands
	*	- ComputeManagementClient.virtualMachineScaleSetVMRunCommands
	*	- ComputeManagementClient.disks
	*	- ComputeManagementClient.diskAccesses
	*	- ComputeManagementClient.diskEncryptionSets
	*	- ComputeManagementClient.diskRestorePointOperations
	*	- ComputeManagementClient.snapshots
	*	- ComputeManagementClient.resourceSkus
	*	- ComputeManagementClient.galleries
	*	- ComputeManagementClient.galleryImages
	*	- ComputeManagementClient.galleryImageVersions
	*	- ComputeManagementClient.galleryApplications
	*	- ComputeManagementClient.galleryApplicationVersions
	*	- ComputeManagementClient.gallerySharingProfile
	*	- ComputeManagementClient.sharedGalleries
	*	- ComputeManagementClient.sharedGalleryImages
	*	- ComputeManagementClient.sharedGalleryImageVersions
	*	- ComputeManagementClient.communityGalleries
	*	- ComputeManagementClient.communityGalleryImages
	*	- ComputeManagementClient.communityGalleryImageVersions
	*	- ComputeManagementClient.cloudServiceRoleInstances
	*	- ComputeManagementClient.cloudServiceRoles
	*	- ComputeManagementClient.cloudServices
	*	- ComputeManagementClient.cloudServicesUpdateDomain
	*	- ComputeManagementClient.cloudServiceOperatingSystems
	*	- EventHubManagementClient.clusters
	*	- EventHubManagementClient.configuration
	*	- EventHubManagementClient.namespaces
	*	- EventHubManagementClient.privateEndpointConnections
	*	- EventHubManagementClient.privateLinkResources
	*	- EventHubManagementClient.operations
	*	- EventHubManagementClient.eventHubs
	*	- EventHubManagementClient.disasterRecoveryConfigs
	*	- EventHubManagementClient.consumerGroups
	*	- EventHubManagementClient.schemaRegistry
	*	- RedisManagementClient.operations
	*	- RedisManagementClient.redis
	*	- RedisManagementClient.firewallRules
	*	- RedisManagementClient.patchSchedules
	*	- RedisManagementClient.linkedServer
	*	- RedisManagementClient.privateEndpointConnections
	*	- RedisManagementClient.privateLinkResources
	*	- RedisManagementClient.asyncOperationStatus
	*	- RedisManagementClient.accessPolicy
	*	- RedisManagementClient.accessPolicyAssignment
	*	- PostgreSQLManagementClient.servers
	*	- PostgreSQLManagementClient.replicas
	*	- PostgreSQLManagementClient.firewallRules
	*	- PostgreSQLManagementClient.virtualNetworkRules
	*	- PostgreSQLManagementClient.databases
	*	- PostgreSQLManagementClient.configurations
	*	- PostgreSQLManagementClient.serverParameters
	*	- PostgreSQLManagementClient.logFiles
	*	- PostgreSQLManagementClient.serverAdministrators
	*	- PostgreSQLManagementClient.recoverableServers
	*	- PostgreSQLManagementClient.serverBasedPerformanceTier
	*	- PostgreSQLManagementClient.locationBasedPerformanceTier
	*	- PostgreSQLManagementClient.checkNameAvailability
	*	- PostgreSQLManagementClient.operations
	*	- PostgreSQLManagementClient.serverSecurityAlertPolicies
	*	- PostgreSQLManagementClient.privateEndpointConnections
	*	- PostgreSQLManagementClient.privateLinkResources
	*	- PostgreSQLManagementClient.serverKeys
	*	- AzureMapsManagementClient.accounts
	*	- AzureMapsManagementClient.maps
	*	- AzureMapsManagementClient.creators
	*	- MariaDBManagementClient.servers
	*	- MariaDBManagementClient.replicas
	*	- MariaDBManagementClient.firewallRules
	*	- MariaDBManagementClient.virtualNetworkRules
	*	- MariaDBManagementClient.databases
	*	- MariaDBManagementClient.configurations
	*	- MariaDBManagementClient.serverParameters
	*	- MariaDBManagementClient.logFiles
	*	- MariaDBManagementClient.recoverableServers
	*	- MariaDBManagementClient.serverBasedPerformanceTier
	*	- MariaDBManagementClient.locationBasedPerformanceTier
	*	- MariaDBManagementClient.checkNameAvailability
	*	- MariaDBManagementClient.operations
	*	- MariaDBManagementClient.queryTexts
	*	- MariaDBManagementClient.topQueryStatistics
	*	- MariaDBManagementClient.waitStatistics
	*	- MariaDBManagementClient.advisors
	*	- MariaDBManagementClient.recommendedActions
	*	- MariaDBManagementClient.locationBasedRecommendedActionSessionsOperationStatus
	*	- MariaDBManagementClient.locationBasedRecommendedActionSessionsResult
	*	- MariaDBManagementClient.privateEndpointConnections
	*	- MariaDBManagementClient.privateLinkResources
	*	- MariaDBManagementClient.serverSecurityAlertPolicies
	*	- ContainerServiceClient.operations
	*	- ContainerServiceClient.managedClusters
	*	- ContainerServiceClient.maintenanceConfigurations
	*	- ContainerServiceClient.agentPools
	*	- ContainerServiceClient.privateEndpointConnections
	*	- ContainerServiceClient.privateLinkResources
	*	- ContainerServiceClient.resolvePrivateLinkServiceId
	*	- ContainerServiceClient.snapshots
	*	- ContainerServiceClient.trustedAccessRoleBindings
	*	- ContainerServiceClient.trustedAccessRoles
	*	- ContainerRegistryManagementClient.registries
	*	- ContainerRegistryManagementClient.operations
	*	- ContainerRegistryManagementClient.privateEndpointConnections
	*	- ContainerRegistryManagementClient.replications
	*	- ContainerRegistryManagementClient.scopeMaps
	*	- ContainerRegistryManagementClient.tokens
	*	- ContainerRegistryManagementClient.webhooks
	*	- ContainerRegistryManagementClient.agentPools
	*	- ContainerRegistryManagementClient.runs
	*	- ContainerRegistryManagementClient.taskRuns
	*	- ContainerRegistryManagementClient.tasks
	*	- CosmosDBManagementClient.databaseAccounts
	*	- CosmosDBManagementClient.operations
	*	- CosmosDBManagementClient.database
	*	- CosmosDBManagementClient.collection
	*	- CosmosDBManagementClient.collectionRegion
	*	- CosmosDBManagementClient.databaseAccountRegion
	*	- CosmosDBManagementClient.percentileSourceTarget
	*	- CosmosDBManagementClient.percentileTarget
	*	- CosmosDBManagementClient.percentile
	*	- CosmosDBManagementClient.collectionPartitionRegion
	*	- CosmosDBManagementClient.collectionPartition
	*	- CosmosDBManagementClient.partitionKeyRangeId
	*	- CosmosDBManagementClient.partitionKeyRangeIdRegion
	*	- CosmosDBManagementClient.sqlResources
	*	- CosmosDBManagementClient.mongoDBResources
	*	- CosmosDBManagementClient.tableResources
	*	- CosmosDBManagementClient.cassandraResources
	*	- CosmosDBManagementClient.gremlinResources
	*	- CosmosDBManagementClient.locations
	*	- CosmosDBManagementClient.cassandraClusters
	*	- CosmosDBManagementClient.cassandraDataCenters
	*	- CosmosDBManagementClient.notebookWorkspaces
	*	- CosmosDBManagementClient.privateEndpointConnections
	*	- CosmosDBManagementClient.privateLinkResources
	*	- CosmosDBManagementClient.restorableDatabaseAccounts
	*	- CosmosDBManagementClient.restorableSqlDatabases
	*	- CosmosDBManagementClient.restorableSqlContainers
	*	- CosmosDBManagementClient.restorableSqlResources
	*	- CosmosDBManagementClient.restorableMongodbDatabases
	*	- CosmosDBManagementClient.restorableMongodbCollections
	*	- CosmosDBManagementClient.restorableMongodbResources
	*	- CosmosDBManagementClient.restorableGremlinDatabases
	*	- CosmosDBManagementClient.restorableGremlinGraphs
	*	- CosmosDBManagementClient.restorableGremlinResources
	*	- CosmosDBManagementClient.restorableTables
	*	- CosmosDBManagementClient.restorableTableResources
	*	- CosmosDBManagementClient.service
	*	- StreamAnalyticsManagementClient.operations
	*	- StreamAnalyticsManagementClient.streamingJobs
	*	- StreamAnalyticsManagementClient.inputs
	*	- StreamAnalyticsManagementClient.outputs
	*	- StreamAnalyticsManagementClient.transformations
	*	- StreamAnalyticsManagementClient.functions
	*	- StreamAnalyticsManagementClient.subscriptions
	*	- StreamAnalyticsManagementClient.clusters
	*	- StreamAnalyticsManagementClient.privateEndpoints
	*	- ConsumptionManagementClient.usageDetails
	*	- ConsumptionManagementClient.marketplaces
	*	- ConsumptionManagementClient.budgets
	*	- ConsumptionManagementClient.tags
	*	- ConsumptionManagementClient.charges
	*	- ConsumptionManagementClient.balances
	*	- ConsumptionManagementClient.reservationsSummaries
	*	- ConsumptionManagementClient.reservationsDetails
	*	- ConsumptionManagementClient.reservationRecommendations
	*	- ConsumptionManagementClient.reservationRecommendationDetails
	*	- ConsumptionManagementClient.reservationTransactions
	*	- ConsumptionManagementClient.priceSheet
	*	- ConsumptionManagementClient.operations
	*	- ConsumptionManagementClient.aggregatedCost
	*	- ConsumptionManagementClient.eventsOperations
	*	- ConsumptionManagementClient.lotsOperations
	*	- ConsumptionManagementClient.credits
	*	- RecoveryServicesBackupClient.backupResourceStorageConfigsNonCRR
	*	- RecoveryServicesBackupClient.protectionIntentOperations
	*	- RecoveryServicesBackupClient.backupStatus
	*	- RecoveryServicesBackupClient.featureSupport
	*	- RecoveryServicesBackupClient.backupProtectionIntent
	*	- RecoveryServicesBackupClient.backupUsageSummaries
	*	- RecoveryServicesBackupClient.operations
	*	- RecoveryServicesBackupClient.backupResourceVaultConfigs
	*	- RecoveryServicesBackupClient.backupResourceEncryptionConfigs
	*	- RecoveryServicesBackupClient.privateEndpointConnectionOperations
	*	- RecoveryServicesBackupClient.privateEndpointOperations
	*	- RecoveryServicesBackupClient.bMSPrepareDataMoveOperationResult
	*	- RecoveryServicesBackupClient.protectedItems
	*	- RecoveryServicesBackupClient.protectedItemOperationResults
	*	- RecoveryServicesBackupClient.recoveryPoints
	*	- RecoveryServicesBackupClient.restores
	*	- RecoveryServicesBackupClient.backupPolicies
	*	- RecoveryServicesBackupClient.protectionPolicies
	*	- RecoveryServicesBackupClient.protectionPolicyOperationResults
	*	- RecoveryServicesBackupClient.backupJobs
	*	- RecoveryServicesBackupClient.jobDetails
	*	- RecoveryServicesBackupClient.jobCancellations
	*	- RecoveryServicesBackupClient.jobOperationResults
	*	- RecoveryServicesBackupClient.exportJobsOperationResults
	*	- RecoveryServicesBackupClient.jobs
	*	- RecoveryServicesBackupClient.backupProtectedItems
	*	- RecoveryServicesBackupClient.operation
	*	- RecoveryServicesBackupClient.validateOperation
	*	- RecoveryServicesBackupClient.validateOperationResults
	*	- RecoveryServicesBackupClient.validateOperationStatuses
	*	- RecoveryServicesBackupClient.backupEngines
	*	- RecoveryServicesBackupClient.protectionContainerRefreshOperationResults
	*	- RecoveryServicesBackupClient.protectableContainers
	*	- RecoveryServicesBackupClient.protectionContainers
	*	- RecoveryServicesBackupClient.backupWorkloadItems
	*	- RecoveryServicesBackupClient.protectionContainerOperationResults
	*	- RecoveryServicesBackupClient.backups
	*	- RecoveryServicesBackupClient.protectedItemOperationStatuses
	*	- RecoveryServicesBackupClient.itemLevelRecoveryConnections
	*	- RecoveryServicesBackupClient.backupOperationResults
	*	- RecoveryServicesBackupClient.backupOperationStatuses
	*	- RecoveryServicesBackupClient.protectionPolicyOperationStatuses
	*	- RecoveryServicesBackupClient.backupProtectableItems
	*	- RecoveryServicesBackupClient.backupProtectionContainers
	*	- RecoveryServicesBackupClient.deletedProtectionContainers
	*	- RecoveryServicesBackupClient.securityPINs
	*	- RecoveryServicesBackupClient.recoveryPointsRecommendedForMove
	*	- RecoveryServicesBackupClient.resourceGuardProxies
	*	- RecoveryServicesBackupClient.resourceGuardProxy
	*	- RecoveryServicesBackupClient.fetchTieringCost
	*	- RecoveryServicesBackupClient.getTieringCostOperationResult
	*	- RecoveryServicesBackupClient.tieringCostOperationStatus
	*	- ManagementLockClient.authorizationOperations
	*	- ManagementLockClient.managementLocks
	*	- EventGridManagementClient.channels
	*	- EventGridManagementClient.domains
	*	- EventGridManagementClient.domainTopics
	*	- EventGridManagementClient.topicEventSubscriptions
	*	- EventGridManagementClient.domainEventSubscriptions
	*	- EventGridManagementClient.eventSubscriptions
	*	- EventGridManagementClient.domainTopicEventSubscriptions
	*	- EventGridManagementClient.systemTopicEventSubscriptions
	*	- EventGridManagementClient.partnerTopicEventSubscriptions
	*	- EventGridManagementClient.operations
	*	- EventGridManagementClient.topics
	*	- EventGridManagementClient.partnerConfigurations
	*	- EventGridManagementClient.partnerNamespaces
	*	- EventGridManagementClient.partnerRegistrations
	*	- EventGridManagementClient.partnerTopics
	*	- EventGridManagementClient.privateEndpointConnections
	*	- EventGridManagementClient.privateLinkResources
	*	- EventGridManagementClient.systemTopics
	*	- EventGridManagementClient.extensionTopics
	*	- EventGridManagementClient.topicTypes
	*	- EventGridManagementClient.verifiedPartners
	*	- PolicyClient.dataPolicyManifests
	*	- PolicyClient.policyAssignments
	*	- PolicyClient.policyDefinitions
	*	- PolicyClient.policySetDefinitions
	*	- PolicyClient.policyExemptions
	*	- IotCentralClient.apps
	*	- IotCentralClient.operations
	*	- DevTestLabsClient.providerOperations
	*	- DevTestLabsClient.labs
	*	- DevTestLabsClient.operations
	*	- DevTestLabsClient.globalSchedules
	*	- DevTestLabsClient.artifactSources
	*	- DevTestLabsClient.armTemplates
	*	- DevTestLabsClient.artifacts
	*	- DevTestLabsClient.costs
	*	- DevTestLabsClient.customImages
	*	- DevTestLabsClient.formulas
	*	- DevTestLabsClient.galleryImages
	*	- DevTestLabsClient.notificationChannels
	*	- DevTestLabsClient.policySets
	*	- DevTestLabsClient.policies
	*	- DevTestLabsClient.schedules
	*	- DevTestLabsClient.serviceRunners
	*	- DevTestLabsClient.users
	*	- DevTestLabsClient.disks
	*	- DevTestLabsClient.environments
	*	- DevTestLabsClient.secrets
	*	- DevTestLabsClient.serviceFabrics
	*	- DevTestLabsClient.serviceFabricSchedules
	*	- DevTestLabsClient.virtualMachines
	*	- DevTestLabsClient.virtualMachineSchedules
	*	- DevTestLabsClient.virtualNetworks
	*	- LogicManagementClient.workflows
	*	- LogicManagementClient.workflowVersions
	*	- LogicManagementClient.workflowTriggers
	*	- LogicManagementClient.workflowVersionTriggers
	*	- LogicManagementClient.workflowTriggerHistories
	*	- LogicManagementClient.workflowRuns
	*	- LogicManagementClient.workflowRunActions
	*	- LogicManagementClient.workflowRunActionRepetitions
	*	- LogicManagementClient.workflowRunActionRepetitionsRequestHistories
	*	- LogicManagementClient.workflowRunActionRequestHistories
	*	- LogicManagementClient.workflowRunActionScopeRepetitions
	*	- LogicManagementClient.workflowRunOperations
	*	- LogicManagementClient.integrationAccounts
	*	- LogicManagementClient.integrationAccountAssemblies
	*	- LogicManagementClient.integrationAccountBatchConfigurations
	*	- LogicManagementClient.integrationAccountSchemas
	*	- LogicManagementClient.integrationAccountMaps
	*	- LogicManagementClient.integrationAccountPartners
	*	- LogicManagementClient.integrationAccountAgreements
	*	- LogicManagementClient.integrationAccountCertificates
	*	- LogicManagementClient.integrationAccountSessions
	*	- LogicManagementClient.integrationServiceEnvironments
	*	- LogicManagementClient.integrationServiceEnvironmentSkus
	*	- LogicManagementClient.integrationServiceEnvironmentNetworkHealth
	*	- LogicManagementClient.integrationServiceEnvironmentManagedApis
	*	- LogicManagementClient.integrationServiceEnvironmentManagedApiOperations
	*	- LogicManagementClient.operations
	*	- DnsManagementClient.recordSets
	*	- DnsManagementClient.zones
	*	- DnsManagementClient.dnsResourceReferenceOperations
	*	- PurviewManagementClient.accounts
	*	- PurviewManagementClient.defaultAccounts
	*	- PurviewManagementClient.operations
	*	- PurviewManagementClient.privateEndpointConnections
	*	- PurviewManagementClient.privateLinkResources
	*	- ServiceFabricManagementClient.clusters
	*	- ServiceFabricManagementClient.clusterVersions
	*	- ServiceFabricManagementClient.operations
	*	- ServiceFabricManagementClient.applicationTypes
	*	- ServiceFabricManagementClient.applicationTypeVersions
	*	- ServiceFabricManagementClient.applications
	*	- ServiceFabricManagementClient.services
	*	- ApplicationClient.applications
	*	- ApplicationClient.applicationDefinitions
	*	- ApplicationClient.jitRequests
	*	- ManagedServiceIdentityClient.systemAssignedIdentities
	*	- ManagedServiceIdentityClient.operations
	*	- ManagedServiceIdentityClient.userAssignedIdentities
	*	- ManagedServiceIdentityClient.federatedIdentityCredentials
	*	- BillingManagementClient.billingAccounts
	*	- BillingManagementClient.address
	*	- BillingManagementClient.availableBalances
	*	- BillingManagementClient.instructions
	*	- BillingManagementClient.billingProfiles
	*	- BillingManagementClient.customers
	*	- BillingManagementClient.invoiceSections
	*	- BillingManagementClient.billingPermissions
	*	- BillingManagementClient.billingSubscriptions
	*	- BillingManagementClient.products
	*	- BillingManagementClient.invoices
	*	- BillingManagementClient.transactions
	*	- BillingManagementClient.policies
	*	- BillingManagementClient.billingPropertyOperations
	*	- BillingManagementClient.operations
	*	- BillingManagementClient.billingRoleDefinitions
	*	- BillingManagementClient.billingRoleAssignments
	*	- BillingManagementClient.agreements
	*	- BillingManagementClient.reservations
	*	- BillingManagementClient.enrollmentAccounts
	*	- BillingManagementClient.billingPeriods
	*	- SearchManagementClient.operations
	*	- SearchManagementClient.adminKeys
	*	- SearchManagementClient.queryKeys
	*	- SearchManagementClient.services
	*	- SearchManagementClient.privateLinkResources
	*	- SearchManagementClient.privateEndpointConnections
	*	- SearchManagementClient.sharedPrivateLinkResources
	*	- SearchManagementClient.usages
	*	- CdnManagementClient.afdProfiles
	*	- CdnManagementClient.afdCustomDomains
	*	- CdnManagementClient.afdEndpoints
	*	- CdnManagementClient.afdOriginGroups
	*	- CdnManagementClient.afdOrigins
	*	- CdnManagementClient.routes
	*	- CdnManagementClient.ruleSets
	*	- CdnManagementClient.rules
	*	- CdnManagementClient.securityPolicies
	*	- CdnManagementClient.secrets
	*	- CdnManagementClient.logAnalytics
	*	- CdnManagementClient.profiles
	*	- CdnManagementClient.endpoints
	*	- CdnManagementClient.origins
	*	- CdnManagementClient.originGroups
	*	- CdnManagementClient.customDomains
	*	- CdnManagementClient.resourceUsageOperations
	*	- CdnManagementClient.operations
	*	- CdnManagementClient.edgeNodes
	*	- CdnManagementClient.policies
	*	- CdnManagementClient.managedRuleSets
	*	- PrivateDnsManagementClient.privateZones
	*	- PrivateDnsManagementClient.virtualNetworkLinks
	*	- PrivateDnsManagementClient.recordSets
	*	- ContainerInstanceManagementClient.containerGroups
	*	- ContainerInstanceManagementClient.operations
	*	- ContainerInstanceManagementClient.location
	*	- ContainerInstanceManagementClient.containers
	*	- ContainerInstanceManagementClient.subnetServiceAssociationLink
	*	- AuthorizationManagementClient.classicAdministrators
	*	- AuthorizationManagementClient.globalAdministrator
	*	- AuthorizationManagementClient.denyAssignments
	*	- AuthorizationManagementClient.providerOperationsMetadataOperations
	*	- AuthorizationManagementClient.roleAssignments
	*	- AuthorizationManagementClient.permissions
	*	- AuthorizationManagementClient.roleDefinitions
	*	- AuthorizationManagementClient.eligibleChildResources
	*	- AuthorizationManagementClient.roleAssignmentSchedules
	*	- AuthorizationManagementClient.roleAssignmentScheduleInstances
	*	- AuthorizationManagementClient.roleAssignmentScheduleRequests
	*	- AuthorizationManagementClient.roleEligibilitySchedules
	*	- AuthorizationManagementClient.roleEligibilityScheduleInstances
	*	- AuthorizationManagementClient.roleEligibilityScheduleRequests
	*	- AuthorizationManagementClient.roleManagementPolicies
	*	- AuthorizationManagementClient.roleManagementPolicyAssignments
	*	- KustoManagementClient.clusters
	*	- KustoManagementClient.clusterPrincipalAssignments
	*	- KustoManagementClient.skus
	*	- KustoManagementClient.databases
	*	- KustoManagementClient.attachedDatabaseConfigurations
	*	- KustoManagementClient.managedPrivateEndpoints
	*	- KustoManagementClient.databaseOperations
	*	- KustoManagementClient.databasePrincipalAssignments
	*	- KustoManagementClient.scripts
	*	- KustoManagementClient.sandboxCustomImages
	*	- KustoManagementClient.privateEndpointConnections
	*	- KustoManagementClient.privateLinkResources
	*	- KustoManagementClient.dataConnections
	*	- KustoManagementClient.operations
	*	- KustoManagementClient.operationsResults
	*	- KustoManagementClient.operationsResultsLocation
	*	- PowerBIEmbeddedManagementClient.workspaceCollections
	*	- PowerBIEmbeddedManagementClient.workspaces
	*	- HybridComputeManagementClient.machines
	*	- HybridComputeManagementClient.machineExtensions
	*	- HybridComputeManagementClient.operations
	*	- HybridComputeManagementClient.privateLinkScopes
	*	- HybridComputeManagementClient.privateLinkResources
	*	- HybridComputeManagementClient.privateEndpointConnections
	*	- SignalRManagementClient.operations
	*	- SignalRManagementClient.signalR
	*	- SignalRManagementClient.usages
	*	- SignalRManagementClient.signalRCustomCertificates
	*	- SignalRManagementClient.signalRCustomDomains
	*	- SignalRManagementClient.signalRPrivateEndpointConnections
	*	- SignalRManagementClient.signalRPrivateLinkResources
	*	- SignalRManagementClient.signalRSharedPrivateLinkResources
	*	- AzureChangeAnalysisManagementClient.operations
	*	- AzureChangeAnalysisManagementClient.resourceChanges
	*	- AzureChangeAnalysisManagementClient.changes
	*	- AttestationManagementClient.operations
	*	- AttestationManagementClient.attestationProviders
	*	- AttestationManagementClient.privateEndpointConnections
	*	- ImageBuilderClient.virtualMachineImageTemplates
	*	- ImageBuilderClient.triggers
	*	- ImageBuilderClient.operations
	*	- CommunicationServiceManagementClient.operations
	*	- CommunicationServiceManagementClient.communicationServices
	*	- CommunicationServiceManagementClient.domains
	*	- CommunicationServiceManagementClient.emailServices
	*	- CommunicationServiceManagementClient.senderUsernames
	*	- CognitiveServicesManagementClient.accounts
	*	- CognitiveServicesManagementClient.deletedAccounts
	*	- CognitiveServicesManagementClient.resourceSkus
	*	- CognitiveServicesManagementClient.usages
	*	- CognitiveServicesManagementClient.operations
	*	- CognitiveServicesManagementClient.commitmentTiers
	*	- CognitiveServicesManagementClient.models
	*	- CognitiveServicesManagementClient.privateEndpointConnections
	*	- CognitiveServicesManagementClient.privateLinkResources
	*	- CognitiveServicesManagementClient.deployments
	*	- CognitiveServicesManagementClient.commitmentPlans
	*	- PolicyInsightsClient.policyTrackedResources
	*	- PolicyInsightsClient.remediations
	*	- PolicyInsightsClient.policyEvents
	*	- PolicyInsightsClient.policyStates
	*	- PolicyInsightsClient.operations
	*	- PolicyInsightsClient.policyMetadataOperations
	*	- PolicyInsightsClient.policyRestrictions
	*	- PolicyInsightsClient.attestations
	*	- StorageCacheManagementClient.amlFilesystems
	*	- StorageCacheManagementClient.operations
	*	- StorageCacheManagementClient.skus
	*	- StorageCacheManagementClient.usageModels
	*	- StorageCacheManagementClient.ascOperations
	*	- StorageCacheManagementClient.ascUsages
	*	- StorageCacheManagementClient.caches
	*	- StorageCacheManagementClient.storageTargets
	*	- StorageCacheManagementClient.storageTargetOperations
	*	- FrontDoorManagementClient.policies
	*	- FrontDoorManagementClient.managedRuleSets
	*	- FrontDoorManagementClient.frontDoorNameAvailability
	*	- FrontDoorManagementClient.frontDoorNameAvailabilityWithSubscription
	*	- FrontDoorManagementClient.frontDoors
	*	- FrontDoorManagementClient.frontendEndpoints
	*	- FrontDoorManagementClient.endpoints
	*	- FrontDoorManagementClient.rulesEngines
	*	- FrontDoorManagementClient.networkExperimentProfiles
	*	- FrontDoorManagementClient.preconfiguredEndpoints
	*	- FrontDoorManagementClient.experiments
	*	- FrontDoorManagementClient.reports
	*	- MixedRealityClient.operations
	*	- MixedRealityClient.spatialAnchorsAccounts
	*	- MixedRealityClient.remoteRenderingAccounts
	*	- PeeringManagementClient.cdnPeeringPrefixes
	*	- PeeringManagementClient.legacyPeerings
	*	- PeeringManagementClient.lookingGlass
	*	- PeeringManagementClient.operations
	*	- PeeringManagementClient.peerAsns
	*	- PeeringManagementClient.peeringLocations
	*	- PeeringManagementClient.registeredAsns
	*	- PeeringManagementClient.registeredPrefixes
	*	- PeeringManagementClient.peerings
	*	- PeeringManagementClient.receivedRoutes
	*	- PeeringManagementClient.connectionMonitorTests
	*	- PeeringManagementClient.peeringServiceCountries
	*	- PeeringManagementClient.peeringServiceLocations
	*	- PeeringManagementClient.prefixes
	*	- PeeringManagementClient.peeringServiceProviders
	*	- PeeringManagementClient.peeringServices
	*	- FeatureClient.features
	*	- FeatureClient.subscriptionFeatureRegistrations
	*	- NetAppManagementClient.operations
	*	- NetAppManagementClient.netAppResource
	*	- NetAppManagementClient.netAppResourceQuotaLimits
	*	- NetAppManagementClient.accounts
	*	- NetAppManagementClient.pools
	*	- NetAppManagementClient.volumes
	*	- NetAppManagementClient.snapshots
	*	- NetAppManagementClient.snapshotPolicies
	*	- NetAppManagementClient.backups
	*	- NetAppManagementClient.backupPolicies
	*	- NetAppManagementClient.volumeQuotaRules
	*	- NetAppManagementClient.volumeGroups
	*	- NetAppManagementClient.subvolumes
	*	- HDInsightManagementClient.clusters
	*	- HDInsightManagementClient.applications
	*	- HDInsightManagementClient.locations
	*	- HDInsightManagementClient.configurations
	*	- HDInsightManagementClient.extensions
	*	- HDInsightManagementClient.scriptActions
	*	- HDInsightManagementClient.scriptExecutionHistory
	*	- HDInsightManagementClient.operations
	*	- HDInsightManagementClient.virtualMachines
	*	- HDInsightManagementClient.privateEndpointConnections
	*	- HDInsightManagementClient.privateLinkResources
	*	- AzureMLWebServicesManagementClient.operations
	*	- AzureMLWebServicesManagementClient.webServices
	*	- DataCatalogRestClient.aDCOperations
	*	- DataCatalogRestClient.aDCCatalogs
	*	- BatchManagementClient.batchAccountOperations
	*	- BatchManagementClient.applicationPackageOperations
	*	- BatchManagementClient.applicationOperations
	*	- BatchManagementClient.location
	*	- BatchManagementClient.operations
	*	- BatchManagementClient.certificateOperations
	*	- BatchManagementClient.privateLinkResourceOperations
	*	- BatchManagementClient.privateEndpointConnectionOperations
	*	- BatchManagementClient.poolOperations
	*	- MicrosoftSerialConsoleClient.serialPorts
	*	- RedisEnterpriseManagementClient.operations
	*	- RedisEnterpriseManagementClient.operationsStatus
	*	- RedisEnterpriseManagementClient.redisEnterprise
	*	- RedisEnterpriseManagementClient.databases
	*	- RedisEnterpriseManagementClient.privateEndpointConnections
	*	- RedisEnterpriseManagementClient.privateLinkResources
	*	- TrafficManagerManagementClient.endpoints
	*	- TrafficManagerManagementClient.profiles
	*	- TrafficManagerManagementClient.geographicHierarchies
	*	- TrafficManagerManagementClient.heatMap
	*	- TrafficManagerManagementClient.trafficManagerUserMetricsKeys
	*	- PostgreSQLManagementFlexibleServerClient.administrators
	*	- PostgreSQLManagementFlexibleServerClient.backups
	*	- PostgreSQLManagementFlexibleServerClient.locationBasedCapabilities
	*	- PostgreSQLManagementFlexibleServerClient.checkNameAvailability
	*	- PostgreSQLManagementFlexibleServerClient.checkNameAvailabilityWithLocation
	*	- PostgreSQLManagementFlexibleServerClient.configurations
	*	- PostgreSQLManagementFlexibleServerClient.databases
	*	- PostgreSQLManagementFlexibleServerClient.firewallRules
	*	- PostgreSQLManagementFlexibleServerClient.servers
	*	- PostgreSQLManagementFlexibleServerClient.operations
	*	- PostgreSQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
	*	- PostgreSQLManagementFlexibleServerClient.replicas
	*	- PostgreSQLManagementFlexibleServerClient.virtualNetworkSubnetUsage
	*	- SiteRecoveryManagementClient.operations
	*	- SiteRecoveryManagementClient.replicationAlertSettings
	*	- SiteRecoveryManagementClient.replicationAppliances
	*	- SiteRecoveryManagementClient.replicationEligibilityResultsOperations
	*	- SiteRecoveryManagementClient.replicationEvents
	*	- SiteRecoveryManagementClient.replicationFabrics
	*	- SiteRecoveryManagementClient.replicationLogicalNetworks
	*	- SiteRecoveryManagementClient.replicationNetworks
	*	- SiteRecoveryManagementClient.replicationNetworkMappings
	*	- SiteRecoveryManagementClient.replicationProtectionContainers
	*	- SiteRecoveryManagementClient.replicationMigrationItems
	*	- SiteRecoveryManagementClient.migrationRecoveryPoints
	*	- SiteRecoveryManagementClient.replicationProtectableItems
	*	- SiteRecoveryManagementClient.replicationProtectedItems
	*	- SiteRecoveryManagementClient.recoveryPoints
	*	- SiteRecoveryManagementClient.targetComputeSizes
	*	- SiteRecoveryManagementClient.replicationProtectionContainerMappings
	*	- SiteRecoveryManagementClient.replicationRecoveryServicesProviders
	*	- SiteRecoveryManagementClient.replicationStorageClassifications
	*	- SiteRecoveryManagementClient.replicationStorageClassificationMappings
	*	- SiteRecoveryManagementClient.replicationvCenters
	*	- SiteRecoveryManagementClient.replicationJobs
	*	- SiteRecoveryManagementClient.replicationPolicies
	*	- SiteRecoveryManagementClient.replicationProtectionIntents
	*	- SiteRecoveryManagementClient.replicationRecoveryPlans
	*	- SiteRecoveryManagementClient.supportedOperatingSystemsOperations
	*	- SiteRecoveryManagementClient.replicationVaultHealth
	*	- SiteRecoveryManagementClient.replicationVaultSetting
	*	- ApplicationInsightsManagementClient.acceptLanguage
	*	- ApplicationInsightsManagementClient.longRunningOperationRetryTimeout
	*	- ApplicationInsightsManagementClient.baseUri
	*	- ApplicationInsightsManagementClient.requestContentType
	*	- ApplicationInsightsManagementClient.credentials
	*	- ApplicationInsightsManagementClient.operations
	*	- ApplicationInsightsManagementClient.annotations
	*	- ApplicationInsightsManagementClient.aPIKeys
	*	- ApplicationInsightsManagementClient.exportConfigurations
	*	- ApplicationInsightsManagementClient.componentCurrentBillingFeatures
	*	- ApplicationInsightsManagementClient.componentQuotaStatus
	*	- ApplicationInsightsManagementClient.componentFeatureCapabilities
	*	- ApplicationInsightsManagementClient.componentAvailableFeatures
	*	- ApplicationInsightsManagementClient.proactiveDetectionConfigurations
	*	- ApplicationInsightsManagementClient.workItemConfigurations
	*	- ApplicationInsightsManagementClient.favorites
	*	- ApplicationInsightsManagementClient.webTestLocations
	*	- ApplicationInsightsManagementClient.webTests
	*	- ApplicationInsightsManagementClient.analyticsItems
	*	- ApplicationInsightsManagementClient.workbookTemplates
	*	- ApplicationInsightsManagementClient.myWorkbooks
	*	- ApplicationInsightsManagementClient.workbooks
	*	- ApplicationInsightsManagementClient.components
	*	- ApplicationInsightsManagementClient.componentLinkedStorageAccounts
	*	- ApplicationInsightsManagementClient.liveToken
	*	- AppPlatformManagementClient.services
	*	- AppPlatformManagementClient.configServers
	*	- AppPlatformManagementClient.configurationServices
	*	- AppPlatformManagementClient.serviceRegistries
	*	- AppPlatformManagementClient.buildServiceOperations
	*	- AppPlatformManagementClient.buildpackBinding
	*	- AppPlatformManagementClient.buildServiceBuilder
	*	- AppPlatformManagementClient.buildServiceAgentPool
	*	- AppPlatformManagementClient.monitoringSettings
	*	- AppPlatformManagementClient.apps
	*	- AppPlatformManagementClient.bindings
	*	- AppPlatformManagementClient.certificates
	*	- AppPlatformManagementClient.customDomains
	*	- AppPlatformManagementClient.deployments
	*	- AppPlatformManagementClient.operations
	*	- AppPlatformManagementClient.runtimeVersions
	*	- AppPlatformManagementClient.skus
	*	- SourceControlConfigurationClient.extensions
	*	- SourceControlConfigurationClient.operationStatus
	*	- SourceControlConfigurationClient.fluxConfigurations
	*	- SourceControlConfigurationClient.fluxConfigOperationStatus
	*	- SourceControlConfigurationClient.sourceControlConfigurations
	*	- SourceControlConfigurationClient.operations
	*	- AppConfigurationManagementClient.configurationStores
	*	- AppConfigurationManagementClient.operations
	*	- AppConfigurationManagementClient.privateEndpointConnections
	*	- AppConfigurationManagementClient.privateLinkResources
	*	- AppConfigurationManagementClient.keyValues
	*	- AppConfigurationManagementClient.replicas
	*	- LabServicesClient.images
	*	- LabServicesClient.labPlans
	*	- LabServicesClient.operations
	*	- LabServicesClient.labs
	*	- LabServicesClient.operationResults
	*	- LabServicesClient.schedules
	*	- LabServicesClient.skus
	*	- LabServicesClient.usages
	*	- LabServicesClient.users
	*	- LabServicesClient.virtualMachines
	*	- HanaManagementClient.acceptLanguage
	*	- HanaManagementClient.longRunningOperationRetryTimeout
	*	- HanaManagementClient.baseUri
	*	- HanaManagementClient.requestContentType
	*	- HanaManagementClient.credentials
	*	- HanaManagementClient.operations
	*	- HanaManagementClient.hanaInstances
	*	- HanaManagementClient.sapMonitors
	*	- AzureStackManagementClient.acceptLanguage
	*	- AzureStackManagementClient.longRunningOperationRetryTimeout
	*	- AzureStackManagementClient.baseUri
	*	- AzureStackManagementClient.requestContentType
	*	- AzureStackManagementClient.credentials
	*	- AzureStackManagementClient.operations
	*	- AzureStackManagementClient.products
	*	- AzureStackManagementClient.registrations
	*	- AzureStackManagementClient.customerSubscriptions
	*	- VisualStudioResourceProviderClient.acceptLanguage
	*	- VisualStudioResourceProviderClient.longRunningOperationRetryTimeout
	*	- VisualStudioResourceProviderClient.baseUri
	*	- VisualStudioResourceProviderClient.requestContentType
	*	- VisualStudioResourceProviderClient.credentials
	*	- VisualStudioResourceProviderClient.operations
	*	- VisualStudioResourceProviderClient.accounts
	*	- VisualStudioResourceProviderClient.extensions
	*	- VisualStudioResourceProviderClient.projects
	*	- DataBoxManagementClient.operations
	*	- DataBoxManagementClient.jobs
	*	- DataBoxManagementClient.service
	*	- MachineLearningComputeManagementClient.acceptLanguage
	*	- MachineLearningComputeManagementClient.longRunningOperationRetryTimeout
	*	- MachineLearningComputeManagementClient.baseUri
	*	- MachineLearningComputeManagementClient.requestContentType
	*	- MachineLearningComputeManagementClient.credentials
	*	- MachineLearningComputeManagementClient.operationalizationClusters
	*	- MachineLearningComputeManagementClient.machineLearningCompute
	*	- DataMigrationServiceClient.acceptLanguage
	*	- DataMigrationServiceClient.longRunningOperationRetryTimeout
	*	- DataMigrationServiceClient.baseUri
	*	- DataMigrationServiceClient.requestContentType
	*	- DataMigrationServiceClient.credentials
	*	- DataMigrationServiceClient.resourceSkus
	*	- DataMigrationServiceClient.services
	*	- DataMigrationServiceClient.tasks
	*	- DataMigrationServiceClient.serviceTasks
	*	- DataMigrationServiceClient.projects
	*	- DataMigrationServiceClient.usages
	*	- DataMigrationServiceClient.operations
	*	- DataMigrationServiceClient.files
	*	- DataLakeAnalyticsAccountManagementClient.acceptLanguage
	*	- DataLakeAnalyticsAccountManagementClient.longRunningOperationRetryTimeout
	*	- DataLakeAnalyticsAccountManagementClient.baseUri
	*	- DataLakeAnalyticsAccountManagementClient.requestContentType
	*	- DataLakeAnalyticsAccountManagementClient.credentials
	*	- DataLakeAnalyticsAccountManagementClient.accounts
	*	- DataLakeAnalyticsAccountManagementClient.dataLakeStoreAccounts
	*	- DataLakeAnalyticsAccountManagementClient.storageAccounts
	*	- DataLakeAnalyticsAccountManagementClient.computePolicies
	*	- DataLakeAnalyticsAccountManagementClient.firewallRules
	*	- DataLakeAnalyticsAccountManagementClient.operations
	*	- DataLakeAnalyticsAccountManagementClient.locations
	*	- IoTSpacesClient.ioTSpaces
	*	- IoTSpacesClient.operations
	*	- BatchAIManagementClient.acceptLanguage
	*	- BatchAIManagementClient.longRunningOperationRetryTimeout
	*	- BatchAIManagementClient.baseUri
	*	- BatchAIManagementClient.requestContentType
	*	- BatchAIManagementClient.credentials
	*	- BatchAIManagementClient.operations
	*	- BatchAIManagementClient.usages
	*	- BatchAIManagementClient.workspaces
	*	- BatchAIManagementClient.experiments
	*	- BatchAIManagementClient.jobs
	*	- BatchAIManagementClient.fileServers
	*	- BatchAIManagementClient.clusters
	*	- VideoAnalyzerManagementClient.edgeModules
	*	- VideoAnalyzerManagementClient.pipelineTopologies
	*	- VideoAnalyzerManagementClient.livePipelines
	*	- VideoAnalyzerManagementClient.pipelineJobs
	*	- VideoAnalyzerManagementClient.livePipelineOperationStatuses
	*	- VideoAnalyzerManagementClient.pipelineJobOperationStatuses
	*	- VideoAnalyzerManagementClient.operations
	*	- VideoAnalyzerManagementClient.videoAnalyzers
	*	- VideoAnalyzerManagementClient.privateLinkResources
	*	- VideoAnalyzerManagementClient.privateEndpointConnections
	*	- VideoAnalyzerManagementClient.operationStatuses
	*	- VideoAnalyzerManagementClient.operationResults
	*	- VideoAnalyzerManagementClient.videoAnalyzerOperationStatuses
	*	- VideoAnalyzerManagementClient.videoAnalyzerOperationResults
	*	- VideoAnalyzerManagementClient.locations
	*	- VideoAnalyzerManagementClient.videos
	*	- VideoAnalyzerManagementClient.accessPolicies
	*	- DesktopVirtualizationAPIClient.operations
	*	- DesktopVirtualizationAPIClient.workspaces
	*	- DesktopVirtualizationAPIClient.privateEndpointConnections
	*	- DesktopVirtualizationAPIClient.privateLinkResources
	*	- DesktopVirtualizationAPIClient.scalingPlans
	*	- DesktopVirtualizationAPIClient.scalingPlanPooledSchedules
	*	- DesktopVirtualizationAPIClient.scalingPlanPersonalSchedules
	*	- DesktopVirtualizationAPIClient.applicationGroups
	*	- DesktopVirtualizationAPIClient.startMenuItems
	*	- DesktopVirtualizationAPIClient.applications
	*	- DesktopVirtualizationAPIClient.desktops
	*	- DesktopVirtualizationAPIClient.hostPools
	*	- DesktopVirtualizationAPIClient.userSessions
	*	- DesktopVirtualizationAPIClient.sessionHosts
	*	- DesktopVirtualizationAPIClient.msixPackages
	*	- DesktopVirtualizationAPIClient.msixImages
	*	- LoadTestClient.operations
	*	- LoadTestClient.loadTests
	*	- CustomLocationsManagementClient.customLocations
	*	- CustomLocationsManagementClient.resourceSyncRules
	*	- MLTeamAccountManagementClient.acceptLanguage
	*	- MLTeamAccountManagementClient.longRunningOperationRetryTimeout
	*	- MLTeamAccountManagementClient.baseUri
	*	- MLTeamAccountManagementClient.requestContentType
	*	- MLTeamAccountManagementClient.credentials
	*	- MLTeamAccountManagementClient.operations
	*	- MLTeamAccountManagementClient.accounts
	*	- MLTeamAccountManagementClient.workspaces
	*	- MLTeamAccountManagementClient.projects
	*	- ServiceFabricMeshManagementClient.acceptLanguage
	*	- ServiceFabricMeshManagementClient.longRunningOperationRetryTimeout
	*	- ServiceFabricMeshManagementClient.baseUri
	*	- ServiceFabricMeshManagementClient.requestContentType
	*	- ServiceFabricMeshManagementClient.credentials
	*	- ServiceFabricMeshManagementClient.operations
	*	- ServiceFabricMeshManagementClient.secret
	*	- ServiceFabricMeshManagementClient.secretValue
	*	- ServiceFabricMeshManagementClient.volume
	*	- ServiceFabricMeshManagementClient.network
	*	- ServiceFabricMeshManagementClient.gateway
	*	- ServiceFabricMeshManagementClient.application
	*	- ServiceFabricMeshManagementClient.service
	*	- ServiceFabricMeshManagementClient.serviceReplica
	*	- ServiceFabricMeshManagementClient.codePackage
	*	- AzureMLCommitmentPlansManagementClient.acceptLanguage
	*	- AzureMLCommitmentPlansManagementClient.longRunningOperationRetryTimeout
	*	- AzureMLCommitmentPlansManagementClient.baseUri
	*	- AzureMLCommitmentPlansManagementClient.requestContentType
	*	- AzureMLCommitmentPlansManagementClient.credentials
	*	- AzureMLCommitmentPlansManagementClient.skus
	*	- AzureMLCommitmentPlansManagementClient.commitmentAssociations
	*	- AzureMLCommitmentPlansManagementClient.commitmentPlans
	*	- AzureMLCommitmentPlansManagementClient.usageHistory
	*	- DnsResolverManagementClient.dnsResolvers
	*	- DnsResolverManagementClient.inboundEndpoints
	*	- DnsResolverManagementClient.outboundEndpoints
	*	- DnsResolverManagementClient.dnsForwardingRulesets
	*	- DnsResolverManagementClient.forwardingRules
	*	- DnsResolverManagementClient.virtualNetworkLinks
	*	- DataBoxEdgeManagementClient.operations
	*	- DataBoxEdgeManagementClient.availableSkus
	*	- DataBoxEdgeManagementClient.devices
	*	- DataBoxEdgeManagementClient.alerts
	*	- DataBoxEdgeManagementClient.bandwidthSchedules
	*	- DataBoxEdgeManagementClient.diagnosticSettings
	*	- DataBoxEdgeManagementClient.jobs
	*	- DataBoxEdgeManagementClient.nodes
	*	- DataBoxEdgeManagementClient.operationsStatus
	*	- DataBoxEdgeManagementClient.orders
	*	- DataBoxEdgeManagementClient.roles
	*	- DataBoxEdgeManagementClient.addons
	*	- DataBoxEdgeManagementClient.monitoringConfig
	*	- DataBoxEdgeManagementClient.shares
	*	- DataBoxEdgeManagementClient.storageAccountCredentials
	*	- DataBoxEdgeManagementClient.storageAccounts
	*	- DataBoxEdgeManagementClient.containers
	*	- DataBoxEdgeManagementClient.triggers
	*	- DataBoxEdgeManagementClient.supportPackages
	*	- DataBoxEdgeManagementClient.users
	*	- MobileNetworkManagementClient.attachedDataNetworks
	*	- MobileNetworkManagementClient.dataNetworks
	*	- MobileNetworkManagementClient.diagnosticsPackages
	*	- MobileNetworkManagementClient.mobileNetworks
	*	- MobileNetworkManagementClient.operations
	*	- MobileNetworkManagementClient.packetCaptures
	*	- MobileNetworkManagementClient.packetCoreControlPlanes
	*	- MobileNetworkManagementClient.packetCoreControlPlaneVersions
	*	- MobileNetworkManagementClient.packetCoreDataPlanes
	*	- MobileNetworkManagementClient.services
	*	- MobileNetworkManagementClient.sims
	*	- MobileNetworkManagementClient.simGroups
	*	- MobileNetworkManagementClient.simPolicies
	*	- MobileNetworkManagementClient.sites
	*	- MobileNetworkManagementClient.slices
	*	- NetworkManagementClient.applicationGateways
	*	- NetworkManagementClient.applicationGatewayPrivateLinkResources
	*	- NetworkManagementClient.applicationGatewayPrivateEndpointConnections
	*	- NetworkManagementClient.applicationGatewayWafDynamicManifestsDefault
	*	- NetworkManagementClient.applicationGatewayWafDynamicManifests
	*	- NetworkManagementClient.applicationSecurityGroups
	*	- NetworkManagementClient.availableDelegations
	*	- NetworkManagementClient.availableResourceGroupDelegations
	*	- NetworkManagementClient.availableServiceAliases
	*	- NetworkManagementClient.azureFirewalls
	*	- NetworkManagementClient.azureFirewallFqdnTags
	*	- NetworkManagementClient.webCategories
	*	- NetworkManagementClient.bastionHosts
	*	- NetworkManagementClient.networkInterfaces
	*	- NetworkManagementClient.publicIPAddresses
	*	- NetworkManagementClient.vipSwap
	*	- NetworkManagementClient.customIPPrefixes
	*	- NetworkManagementClient.ddosCustomPolicies
	*	- NetworkManagementClient.ddosProtectionPlans
	*	- NetworkManagementClient.dscpConfigurationOperations
	*	- NetworkManagementClient.availableEndpointServices
	*	- NetworkManagementClient.expressRouteCircuitAuthorizations
	*	- NetworkManagementClient.expressRouteCircuitPeerings
	*	- NetworkManagementClient.expressRouteCircuitConnections
	*	- NetworkManagementClient.peerExpressRouteCircuitConnections
	*	- NetworkManagementClient.expressRouteCircuits
	*	- NetworkManagementClient.expressRouteServiceProviders
	*	- NetworkManagementClient.expressRouteCrossConnections
	*	- NetworkManagementClient.expressRouteCrossConnectionPeerings
	*	- NetworkManagementClient.expressRoutePortsLocations
	*	- NetworkManagementClient.expressRoutePorts
	*	- NetworkManagementClient.expressRouteLinks
	*	- NetworkManagementClient.expressRoutePortAuthorizations
	*	- NetworkManagementClient.expressRouteProviderPortsLocation
	*	- NetworkManagementClient.firewallPolicies
	*	- NetworkManagementClient.firewallPolicyRuleCollectionGroups
	*	- NetworkManagementClient.firewallPolicyIdpsSignatures
	*	- NetworkManagementClient.firewallPolicyIdpsSignaturesOverrides
	*	- NetworkManagementClient.firewallPolicyIdpsSignaturesFilterValues
	*	- NetworkManagementClient.ipAllocations
	*	- NetworkManagementClient.ipGroups
	*	- NetworkManagementClient.loadBalancers
	*	- NetworkManagementClient.loadBalancerBackendAddressPools
	*	- NetworkManagementClient.loadBalancerFrontendIPConfigurations
	*	- NetworkManagementClient.inboundNatRules
	*	- NetworkManagementClient.loadBalancerLoadBalancingRules
	*	- NetworkManagementClient.loadBalancerOutboundRules
	*	- NetworkManagementClient.loadBalancerNetworkInterfaces
	*	- NetworkManagementClient.loadBalancerProbes
	*	- NetworkManagementClient.natGateways
	*	- NetworkManagementClient.networkInterfaceIPConfigurations
	*	- NetworkManagementClient.networkInterfaceLoadBalancers
	*	- NetworkManagementClient.networkInterfaceTapConfigurations
	*	- NetworkManagementClient.networkManagers
	*	- NetworkManagementClient.networkManagerCommits
	*	- NetworkManagementClient.networkManagerDeploymentStatusOperations
	*	- NetworkManagementClient.subscriptionNetworkManagerConnections
	*	- NetworkManagementClient.managementGroupNetworkManagerConnections
	*	- NetworkManagementClient.connectivityConfigurations
	*	- NetworkManagementClient.networkGroups
	*	- NetworkManagementClient.staticMembers
	*	- NetworkManagementClient.scopeConnections
	*	- NetworkManagementClient.securityAdminConfigurations
	*	- NetworkManagementClient.adminRuleCollections
	*	- NetworkManagementClient.adminRules
	*	- NetworkManagementClient.networkProfiles
	*	- NetworkManagementClient.networkSecurityGroups
	*	- NetworkManagementClient.securityRules
	*	- NetworkManagementClient.defaultSecurityRules
	*	- NetworkManagementClient.networkVirtualAppliances
	*	- NetworkManagementClient.virtualApplianceSites
	*	- NetworkManagementClient.virtualApplianceSkus
	*	- NetworkManagementClient.inboundSecurityRuleOperations
	*	- NetworkManagementClient.networkWatchers
	*	- NetworkManagementClient.packetCaptures
	*	- NetworkManagementClient.connectionMonitors
	*	- NetworkManagementClient.flowLogs
	*	- NetworkManagementClient.operations
	*	- NetworkManagementClient.privateEndpoints
	*	- NetworkManagementClient.availablePrivateEndpointTypes
	*	- NetworkManagementClient.privateDnsZoneGroups
	*	- NetworkManagementClient.privateLinkServices
	*	- NetworkManagementClient.publicIPPrefixes
	*	- NetworkManagementClient.routeFilters
	*	- NetworkManagementClient.routeFilterRules
	*	- NetworkManagementClient.routeTables
	*	- NetworkManagementClient.routes
	*	- NetworkManagementClient.securityPartnerProviders
	*	- NetworkManagementClient.bgpServiceCommunities
	*	- NetworkManagementClient.serviceEndpointPolicies
	*	- NetworkManagementClient.serviceEndpointPolicyDefinitions
	*	- NetworkManagementClient.serviceTags
	*	- NetworkManagementClient.serviceTagInformationOperations
	*	- NetworkManagementClient.usages
	*	- NetworkManagementClient.virtualNetworks
	*	- NetworkManagementClient.subnets
	*	- NetworkManagementClient.resourceNavigationLinks
	*	- NetworkManagementClient.serviceAssociationLinks
	*	- NetworkManagementClient.virtualNetworkPeerings
	*	- NetworkManagementClient.virtualNetworkGateways
	*	- NetworkManagementClient.virtualNetworkGatewayConnections
	*	- NetworkManagementClient.localNetworkGateways
	*	- NetworkManagementClient.virtualNetworkGatewayNatRules
	*	- NetworkManagementClient.virtualNetworkTaps
	*	- NetworkManagementClient.virtualRouters
	*	- NetworkManagementClient.virtualRouterPeerings
	*	- NetworkManagementClient.virtualWans
	*	- NetworkManagementClient.vpnSites
	*	- NetworkManagementClient.vpnSiteLinks
	*	- NetworkManagementClient.vpnSitesConfiguration
	*	- NetworkManagementClient.vpnServerConfigurations
	*	- NetworkManagementClient.configurationPolicyGroups
	*	- NetworkManagementClient.virtualHubs
	*	- NetworkManagementClient.routeMaps
	*	- NetworkManagementClient.hubVirtualNetworkConnections
	*	- NetworkManagementClient.vpnGateways
	*	- NetworkManagementClient.vpnLinkConnections
	*	- NetworkManagementClient.vpnConnections
	*	- NetworkManagementClient.vpnSiteLinkConnections
	*	- NetworkManagementClient.natRules
	*	- NetworkManagementClient.p2SVpnGateways
	*	- NetworkManagementClient.vpnServerConfigurationsAssociatedWithVirtualWan
	*	- NetworkManagementClient.virtualHubRouteTableV2S
	*	- NetworkManagementClient.expressRouteGateways
	*	- NetworkManagementClient.expressRouteConnections
	*	- NetworkManagementClient.virtualHubBgpConnection
	*	- NetworkManagementClient.virtualHubBgpConnections
	*	- NetworkManagementClient.virtualHubIpConfiguration
	*	- NetworkManagementClient.hubRouteTables
	*	- NetworkManagementClient.routingIntentOperations
	*	- NetworkManagementClient.webApplicationFirewallPolicies
	*	- SynapseManagementClient.azureADOnlyAuthentications
	*	- SynapseManagementClient.operations
	*	- SynapseManagementClient.ipFirewallRules
	*	- SynapseManagementClient.keys
	*	- SynapseManagementClient.privateEndpointConnections
	*	- SynapseManagementClient.privateLinkResources
	*	- SynapseManagementClient.privateLinkHubPrivateLinkResources
	*	- SynapseManagementClient.privateLinkHubs
	*	- SynapseManagementClient.privateEndpointConnectionsPrivateLinkHub
	*	- SynapseManagementClient.sqlPools
	*	- SynapseManagementClient.sqlPoolMetadataSyncConfigs
	*	- SynapseManagementClient.sqlPoolOperationResults
	*	- SynapseManagementClient.sqlPoolGeoBackupPolicies
	*	- SynapseManagementClient.sqlPoolDataWarehouseUserActivities
	*	- SynapseManagementClient.sqlPoolRestorePoints
	*	- SynapseManagementClient.sqlPoolReplicationLinks
	*	- SynapseManagementClient.sqlPoolMaintenanceWindows
	*	- SynapseManagementClient.sqlPoolMaintenanceWindowOptions
	*	- SynapseManagementClient.sqlPoolTransparentDataEncryptions
	*	- SynapseManagementClient.sqlPoolBlobAuditingPolicies
	*	- SynapseManagementClient.sqlPoolOperations
	*	- SynapseManagementClient.sqlPoolUsages
	*	- SynapseManagementClient.sqlPoolSensitivityLabels
	*	- SynapseManagementClient.sqlPoolRecommendedSensitivityLabels
	*	- SynapseManagementClient.sqlPoolSchemas
	*	- SynapseManagementClient.sqlPoolTables
	*	- SynapseManagementClient.sqlPoolTableColumns
	*	- SynapseManagementClient.sqlPoolConnectionPolicies
	*	- SynapseManagementClient.sqlPoolVulnerabilityAssessments
	*	- SynapseManagementClient.sqlPoolVulnerabilityAssessmentScans
	*	- SynapseManagementClient.sqlPoolSecurityAlertPolicies
	*	- SynapseManagementClient.sqlPoolVulnerabilityAssessmentRuleBaselines
	*	- SynapseManagementClient.extendedSqlPoolBlobAuditingPolicies
	*	- SynapseManagementClient.dataMaskingPolicies
	*	- SynapseManagementClient.dataMaskingRules
	*	- SynapseManagementClient.sqlPoolColumns
	*	- SynapseManagementClient.sqlPoolWorkloadGroup
	*	- SynapseManagementClient.sqlPoolWorkloadClassifier
	*	- SynapseManagementClient.workspaceManagedSqlServerBlobAuditingPolicies
	*	- SynapseManagementClient.workspaceManagedSqlServerExtendedBlobAuditingPolicies
	*	- SynapseManagementClient.workspaceManagedSqlServerSecurityAlertPolicy
	*	- SynapseManagementClient.workspaceManagedSqlServerVulnerabilityAssessments
	*	- SynapseManagementClient.workspaceManagedSqlServerEncryptionProtector
	*	- SynapseManagementClient.workspaceManagedSqlServerUsages
	*	- SynapseManagementClient.workspaceManagedSqlServerRecoverableSqlPools
	*	- SynapseManagementClient.workspaces
	*	- SynapseManagementClient.workspaceAadAdmins
	*	- SynapseManagementClient.workspaceSqlAadAdmins
	*	- SynapseManagementClient.workspaceManagedIdentitySqlControlSettings
	*	- SynapseManagementClient.restorableDroppedSqlPools
	*	- SynapseManagementClient.bigDataPools
	*	- SynapseManagementClient.library
	*	- SynapseManagementClient.libraries
	*	- SynapseManagementClient.integrationRuntimes
	*	- SynapseManagementClient.integrationRuntimeNodeIpAddressOperations
	*	- SynapseManagementClient.integrationRuntimeObjectMetadata
	*	- SynapseManagementClient.integrationRuntimeNodes
	*	- SynapseManagementClient.integrationRuntimeCredentials
	*	- SynapseManagementClient.integrationRuntimeConnectionInfos
	*	- SynapseManagementClient.integrationRuntimeAuthKeysOperations
	*	- SynapseManagementClient.integrationRuntimeMonitoringDataOperations
	*	- SynapseManagementClient.integrationRuntimeStatusOperations
	*	- SynapseManagementClient.sparkConfiguration
	*	- SynapseManagementClient.sparkConfigurations
	*	- SynapseManagementClient.kustoOperations
	*	- SynapseManagementClient.kustoPools
	*	- SynapseManagementClient.kustoPoolChildResource
	*	- SynapseManagementClient.kustoPoolAttachedDatabaseConfigurations
	*	- SynapseManagementClient.kustoPoolDatabases
	*	- SynapseManagementClient.kustoPoolDataConnections
	*	- SynapseManagementClient.kustoPoolPrincipalAssignments
	*	- SynapseManagementClient.kustoPoolDatabasePrincipalAssignments
	*	- MySQLManagementClient.servers
	*	- MySQLManagementClient.replicas
	*	- MySQLManagementClient.firewallRules
	*	- MySQLManagementClient.virtualNetworkRules
	*	- MySQLManagementClient.databases
	*	- MySQLManagementClient.configurations
	*	- MySQLManagementClient.serverParameters
	*	- MySQLManagementClient.logFiles
	*	- MySQLManagementClient.serverAdministrators
	*	- MySQLManagementClient.recoverableServers
	*	- MySQLManagementClient.serverBasedPerformanceTier
	*	- MySQLManagementClient.locationBasedPerformanceTier
	*	- MySQLManagementClient.checkNameAvailability
	*	- MySQLManagementClient.operations
	*	- MySQLManagementClient.serverSecurityAlertPolicies
	*	- MySQLManagementClient.queryTexts
	*	- MySQLManagementClient.topQueryStatistics
	*	- MySQLManagementClient.waitStatistics
	*	- MySQLManagementClient.advisors
	*	- MySQLManagementClient.recommendedActions
	*	- MySQLManagementClient.locationBasedRecommendedActionSessionsOperationStatus
	*	- MySQLManagementClient.locationBasedRecommendedActionSessionsResult
	*	- MySQLManagementClient.privateEndpointConnections
	*	- MySQLManagementClient.privateLinkResources
	*	- MySQLManagementClient.serverKeys
	*	- TemplateSpecsClient.templateSpecs
	*	- TemplateSpecsClient.templateSpecVersions
	*	- ManagementLinkClient.operations
	*	- ManagementLinkClient.resourceLinks
	*	- MicrosoftDatadogClient.marketplaceAgreements
	*	- MicrosoftDatadogClient.creationSupported
	*	- MicrosoftDatadogClient.monitors
	*	- MicrosoftDatadogClient.operations
	*	- MicrosoftDatadogClient.tagRules
	*	- MicrosoftDatadogClient.singleSignOnConfigurations
	*	- MicrosoftDatadogClient.monitoredSubscriptions
	*	- IotHubClient.operations
	*	- IotHubClient.iotHubResource
	*	- IotHubClient.resourceProviderCommon
	*	- IotHubClient.certificates
	*	- IotHubClient.iotHub
	*	- IotHubClient.privateLinkResourcesOperations
	*	- IotHubClient.privateEndpointConnections
	*	- AzureStackHCIClient.arcSettings
	*	- AzureStackHCIClient.clusters
	*	- AzureStackHCIClient.extensions
	*	- AzureStackHCIClient.operations
	*	- MachineLearningWorkspacesManagementClient.operations
	*	- MachineLearningWorkspacesManagementClient.workspaces
	*	- OperationalInsightsManagementClient.queryPacks
	*	- OperationalInsightsManagementClient.queries
	*	- OperationalInsightsManagementClient.dataExports
	*	- OperationalInsightsManagementClient.dataSources
	*	- OperationalInsightsManagementClient.intelligencePacks
	*	- OperationalInsightsManagementClient.linkedServices
	*	- OperationalInsightsManagementClient.linkedStorageAccounts
	*	- OperationalInsightsManagementClient.managementGroups
	*	- OperationalInsightsManagementClient.operationStatuses
	*	- OperationalInsightsManagementClient.sharedKeysOperations
	*	- OperationalInsightsManagementClient.usages
	*	- OperationalInsightsManagementClient.storageInsightConfigs
	*	- OperationalInsightsManagementClient.savedSearches
	*	- OperationalInsightsManagementClient.availableServiceTiers
	*	- OperationalInsightsManagementClient.gateways
	*	- OperationalInsightsManagementClient.schemaOperations
	*	- OperationalInsightsManagementClient.workspacePurge
	*	- OperationalInsightsManagementClient.clusters
	*	- OperationalInsightsManagementClient.operations
	*	- OperationalInsightsManagementClient.workspaces
	*	- OperationalInsightsManagementClient.deletedWorkspaces
	*	- OperationalInsightsManagementClient.tables
	*	- ResourceGraphClient.acceptLanguage
	*	- ResourceGraphClient.longRunningOperationRetryTimeout
	*	- ResourceGraphClient.baseUri
	*	- ResourceGraphClient.requestContentType
	*	- ResourceGraphClient.credentials
	*	- ResourceGraphClient.operations
	*	- UsageManagementClient.acceptLanguage
	*	- UsageManagementClient.longRunningOperationRetryTimeout
	*	- UsageManagementClient.baseUri
	*	- UsageManagementClient.requestContentType
	*	- UsageManagementClient.credentials
	*	- UsageManagementClient.usageAggregates
	*	- UsageManagementClient.rateCard
	*	- ConfluentManagementClient.marketplaceAgreements
	*	- ConfluentManagementClient.organizationOperations
	*	- ConfluentManagementClient.organization
	*	- ConfluentManagementClient.validations
	*	- ConfluentManagementClient.access
	*	- ServicemapManagementClient.acceptLanguage
	*	- ServicemapManagementClient.longRunningOperationRetryTimeout
	*	- ServicemapManagementClient.baseUri
	*	- ServicemapManagementClient.requestContentType
	*	- ServicemapManagementClient.credentials
	*	- ServicemapManagementClient.machines
	*	- ServicemapManagementClient.processes
	*	- ServicemapManagementClient.ports
	*	- ServicemapManagementClient.clientGroups
	*	- ServicemapManagementClient.maps
	*	- ServicemapManagementClient.summaries
	*	- ServicemapManagementClient.machineGroups
	*	- ApiManagementClient.api
	*	- ApiManagementClient.apiRevision
	*	- ApiManagementClient.apiRelease
	*	- ApiManagementClient.apiOperation
	*	- ApiManagementClient.apiOperationPolicy
	*	- ApiManagementClient.tag
	*	- ApiManagementClient.graphQLApiResolver
	*	- ApiManagementClient.graphQLApiResolverPolicy
	*	- ApiManagementClient.apiProduct
	*	- ApiManagementClient.apiPolicy
	*	- ApiManagementClient.apiSchema
	*	- ApiManagementClient.apiDiagnostic
	*	- ApiManagementClient.apiIssue
	*	- ApiManagementClient.apiIssueComment
	*	- ApiManagementClient.apiIssueAttachment
	*	- ApiManagementClient.apiTagDescription
	*	- ApiManagementClient.operationOperations
	*	- ApiManagementClient.apiWiki
	*	- ApiManagementClient.apiWikis
	*	- ApiManagementClient.apiExport
	*	- ApiManagementClient.apiVersionSet
	*	- ApiManagementClient.authorizationServer
	*	- ApiManagementClient.authorizationProvider
	*	- ApiManagementClient.authorization
	*	- ApiManagementClient.authorizationLoginLinks
	*	- ApiManagementClient.authorizationAccessPolicy
	*	- ApiManagementClient.backend
	*	- ApiManagementClient.cache
	*	- ApiManagementClient.certificate
	*	- ApiManagementClient.contentType
	*	- ApiManagementClient.contentItem
	*	- ApiManagementClient.deletedServices
	*	- ApiManagementClient.apiManagementOperations
	*	- ApiManagementClient.apiManagementServiceSkus
	*	- ApiManagementClient.apiManagementService
	*	- ApiManagementClient.diagnostic
	*	- ApiManagementClient.emailTemplate
	*	- ApiManagementClient.gateway
	*	- ApiManagementClient.gatewayHostnameConfiguration
	*	- ApiManagementClient.gatewayApi
	*	- ApiManagementClient.gatewayCertificateAuthority
	*	- ApiManagementClient.group
	*	- ApiManagementClient.groupUser
	*	- ApiManagementClient.identityProvider
	*	- ApiManagementClient.issue
	*	- ApiManagementClient.logger
	*	- ApiManagementClient.namedValue
	*	- ApiManagementClient.networkStatus
	*	- ApiManagementClient.notification
	*	- ApiManagementClient.notificationRecipientUser
	*	- ApiManagementClient.notificationRecipientEmail
	*	- ApiManagementClient.openIdConnectProvider
	*	- ApiManagementClient.outboundNetworkDependenciesEndpoints
	*	- ApiManagementClient.policy
	*	- ApiManagementClient.policyDescription
	*	- ApiManagementClient.policyFragment
	*	- ApiManagementClient.portalConfig
	*	- ApiManagementClient.portalRevision
	*	- ApiManagementClient.portalSettings
	*	- ApiManagementClient.signInSettings
	*	- ApiManagementClient.signUpSettings
	*	- ApiManagementClient.delegationSettings
	*	- ApiManagementClient.privateEndpointConnectionOperations
	*	- ApiManagementClient.product
	*	- ApiManagementClient.productApi
	*	- ApiManagementClient.productGroup
	*	- ApiManagementClient.productSubscriptions
	*	- ApiManagementClient.productPolicy
	*	- ApiManagementClient.productWiki
	*	- ApiManagementClient.productWikis
	*	- ApiManagementClient.quotaByCounterKeys
	*	- ApiManagementClient.quotaByPeriodKeys
	*	- ApiManagementClient.region
	*	- ApiManagementClient.reports
	*	- ApiManagementClient.globalSchema
	*	- ApiManagementClient.tenantSettings
	*	- ApiManagementClient.apiManagementSkus
	*	- ApiManagementClient.subscription
	*	- ApiManagementClient.tagResource
	*	- ApiManagementClient.tenantAccess
	*	- ApiManagementClient.tenantAccessGit
	*	- ApiManagementClient.tenantConfiguration
	*	- ApiManagementClient.user
	*	- ApiManagementClient.userGroup
	*	- ApiManagementClient.userSubscription
	*	- ApiManagementClient.userIdentities
	*	- ApiManagementClient.userConfirmationPassword
	*	- ApiManagementClient.documentation
	*	- SqlVirtualMachineManagementClient.acceptLanguage
	*	- SqlVirtualMachineManagementClient.longRunningOperationRetryTimeout
	*	- SqlVirtualMachineManagementClient.baseUri
	*	- SqlVirtualMachineManagementClient.requestContentType
	*	- SqlVirtualMachineManagementClient.credentials
	*	- SqlVirtualMachineManagementClient.availabilityGroupListeners
	*	- SqlVirtualMachineManagementClient.operations
	*	- SqlVirtualMachineManagementClient.sqlVirtualMachineGroups
	*	- SqlVirtualMachineManagementClient.sqlVirtualMachines
	*	- RecoveryServicesClient.vaultCertificates
	*	- RecoveryServicesClient.registeredIdentities
	*	- RecoveryServicesClient.replicationUsages
	*	- RecoveryServicesClient.privateLinkResourcesOperations
	*	- RecoveryServicesClient.recoveryServices
	*	- RecoveryServicesClient.vaults
	*	- RecoveryServicesClient.operations
	*	- RecoveryServicesClient.vaultExtendedInfo
	*	- RecoveryServicesClient.usages
	*	- AzureDatabricksManagementClient.workspaces
	*	- AzureDatabricksManagementClient.operations
	*	- AzureDatabricksManagementClient.privateLinkResources
	*	- AzureDatabricksManagementClient.privateEndpointConnections
	*	- AzureDatabricksManagementClient.outboundNetworkDependenciesEndpoints
	*	- AzureDatabricksManagementClient.vNetPeering
	*	- AzureDatabricksManagementClient.accessConnectors
	*	- DataFactoryManagementClient.operations
	*	- DataFactoryManagementClient.factories
	*	- DataFactoryManagementClient.exposureControl
	*	- DataFactoryManagementClient.integrationRuntimes
	*	- DataFactoryManagementClient.integrationRuntimeObjectMetadata
	*	- DataFactoryManagementClient.integrationRuntimeNodes
	*	- DataFactoryManagementClient.linkedServices
	*	- DataFactoryManagementClient.datasets
	*	- DataFactoryManagementClient.pipelines
	*	- DataFactoryManagementClient.pipelineRuns
	*	- DataFactoryManagementClient.activityRuns
	*	- DataFactoryManagementClient.triggers
	*	- DataFactoryManagementClient.triggerRuns
	*	- DataFactoryManagementClient.dataFlows
	*	- DataFactoryManagementClient.dataFlowDebugSession
	*	- DataFactoryManagementClient.managedVirtualNetworks
	*	- DataFactoryManagementClient.managedPrivateEndpoints
	*	- DataFactoryManagementClient.credentialOperations
	*	- DataFactoryManagementClient.privateEndPointConnections
	*	- DataFactoryManagementClient.privateEndpointConnection
	*	- DataFactoryManagementClient.privateLinkResources
	*	- DataFactoryManagementClient.globalParameters
	*	- DataFactoryManagementClient.changeDataCapture
	*	- TimeSeriesInsightsClient.operations
	*	- TimeSeriesInsightsClient.environments
	*	- TimeSeriesInsightsClient.eventSources
	*	- TimeSeriesInsightsClient.referenceDataSets
	*	- TimeSeriesInsightsClient.accessPolicies
	*	- AzureDigitalTwinsManagementClient.digitalTwins
	*	- AzureDigitalTwinsManagementClient.digitalTwinsEndpoint
	*	- AzureDigitalTwinsManagementClient.operations
	*	- AzureDigitalTwinsManagementClient.privateLinkResources
	*	- AzureDigitalTwinsManagementClient.privateEndpointConnections
	*	- AzureDigitalTwinsManagementClient.timeSeriesDatabaseConnections
	*	- WebPubSubManagementClient.operations
	*	- WebPubSubManagementClient.webPubSub
	*	- WebPubSubManagementClient.usages
	*	- WebPubSubManagementClient.webPubSubCustomCertificates
	*	- WebPubSubManagementClient.webPubSubCustomDomains
	*	- WebPubSubManagementClient.webPubSubHubs
	*	- WebPubSubManagementClient.webPubSubPrivateEndpointConnections
	*	- WebPubSubManagementClient.webPubSubPrivateLinkResources
	*	- WebPubSubManagementClient.webPubSubSharedPrivateLinkResources
	*	- NotificationHubsManagementClient.operations
	*	- NotificationHubsManagementClient.namespaces
	*	- NotificationHubsManagementClient.notificationHubs
	*	- ConnectedKubernetesClient.connectedClusterOperations
	*	- ConnectedKubernetesClient.operations
	*	- AdvisorManagementClient.recommendationMetadata
	*	- AdvisorManagementClient.configurations
	*	- AdvisorManagementClient.recommendations
	*	- AdvisorManagementClient.operations
	*	- AdvisorManagementClient.suppressions
	*	- HealthbotClient.bots
	*	- HealthbotClient.operations
	*	- HealthcareApisManagementClient.services
	*	- HealthcareApisManagementClient.privateEndpointConnections
	*	- HealthcareApisManagementClient.privateLinkResources
	*	- HealthcareApisManagementClient.workspaces
	*	- HealthcareApisManagementClient.dicomServices
	*	- HealthcareApisManagementClient.iotConnectors
	*	- HealthcareApisManagementClient.fhirDestinations
	*	- HealthcareApisManagementClient.iotConnectorFhirDestination
	*	- HealthcareApisManagementClient.fhirServices
	*	- HealthcareApisManagementClient.workspacePrivateEndpointConnections
	*	- HealthcareApisManagementClient.workspacePrivateLinkResources
	*	- HealthcareApisManagementClient.operations
	*	- HealthcareApisManagementClient.operationResults
	*	- CustomerInsightsManagementClient.operations
	*	- CustomerInsightsManagementClient.hubs
	*	- CustomerInsightsManagementClient.profiles
	*	- CustomerInsightsManagementClient.interactions
	*	- CustomerInsightsManagementClient.relationships
	*	- CustomerInsightsManagementClient.relationshipLinks
	*	- CustomerInsightsManagementClient.authorizationPolicies
	*	- CustomerInsightsManagementClient.connectors
	*	- CustomerInsightsManagementClient.connectorMappings
	*	- CustomerInsightsManagementClient.kpi
	*	- CustomerInsightsManagementClient.widgetTypes
	*	- CustomerInsightsManagementClient.views
	*	- CustomerInsightsManagementClient.links
	*	- CustomerInsightsManagementClient.roles
	*	- CustomerInsightsManagementClient.roleAssignments
	*	- CustomerInsightsManagementClient.images
	*	- CustomerInsightsManagementClient.predictions
	*	- IotDpsClient.operations
	*	- IotDpsClient.dpsCertificate
	*	- IotDpsClient.iotDpsResource
	*	- DevSpacesManagementClient.containerHostMappings
	*	- DevSpacesManagementClient.operations
	*	- DevSpacesManagementClient.controllers
	*	- MySQLManagementFlexibleServerClient.servers
	*	- MySQLManagementFlexibleServerClient.replicas
	*	- MySQLManagementFlexibleServerClient.backups
	*	- MySQLManagementFlexibleServerClient.firewallRules
	*	- MySQLManagementFlexibleServerClient.databases
	*	- MySQLManagementFlexibleServerClient.configurations
	*	- MySQLManagementFlexibleServerClient.locationBasedCapabilities
	*	- MySQLManagementFlexibleServerClient.checkVirtualNetworkSubnetUsage
	*	- MySQLManagementFlexibleServerClient.checkNameAvailability
	*	- MySQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
	*	- MySQLManagementFlexibleServerClient.operations
	*	- ContainerAppsAPIClient.containerAppsAuthConfigs
	*	- ContainerAppsAPIClient.availableWorkloadProfiles
	*	- ContainerAppsAPIClient.billingMeters
	*	- ContainerAppsAPIClient.connectedEnvironments
	*	- ContainerAppsAPIClient.connectedEnvironmentsCertificates
	*	- ContainerAppsAPIClient.connectedEnvironmentsDaprComponents
	*	- ContainerAppsAPIClient.connectedEnvironmentsStorages
	*	- ContainerAppsAPIClient.containerApps
	*	- ContainerAppsAPIClient.containerAppsRevisions
	*	- ContainerAppsAPIClient.containerAppsRevisionReplicas
	*	- ContainerAppsAPIClient.containerAppsDiagnostics
	*	- ContainerAppsAPIClient.managedEnvironmentDiagnostics
	*	- ContainerAppsAPIClient.managedEnvironmentsDiagnostics
	*	- ContainerAppsAPIClient.operations
	*	- ContainerAppsAPIClient.jobs
	*	- ContainerAppsAPIClient.jobsExecutions
	*	- ContainerAppsAPIClient.managedEnvironments
	*	- ContainerAppsAPIClient.certificates
	*	- ContainerAppsAPIClient.managedCertificates
	*	- ContainerAppsAPIClient.namespaces
	*	- ContainerAppsAPIClient.daprComponents
	*	- ContainerAppsAPIClient.managedEnvironmentsStorages
	*	- ContainerAppsAPIClient.containerAppsSourceControls
	*	- ChangesClient.changes
	*	- ServiceLinkerManagementClient.linker
	*	- ServiceLinkerManagementClient.operations
	*	- ConfidentialLedgerClient.operations
	*	- ConfidentialLedgerClient.ledger
	*	- EducationManagementClient.operations
	*	- EducationManagementClient.grants
	*	- EducationManagementClient.labs
	*	- EducationManagementClient.joinRequests
	*	- EducationManagementClient.students
	*	- EducationManagementClient.studentLabs
	*	- ExternalIdentitiesConfigurationClient.b2CTenants
	*	- ExternalIdentitiesConfigurationClient.operations
	*	- ExternalIdentitiesConfigurationClient.guestUsages
	*	- DashboardManagementClient.operations
	*	- DashboardManagementClient.grafana
	*	- DashboardManagementClient.privateEndpointConnections
	*	- DashboardManagementClient.privateLinkResources
	*	- DashboardManagementClient.managedPrivateEndpoints
	*	- KexaAzure.vm
	*	- KexaAzure.mlWorkspaces
	*	- KexaAzure.mlJobs
	*	- KexaAzure.mlComputes
	*	- KexaAzure.mlSchedules
	*	- KexaAzure.storage
	*	- KexaAzure.blob
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////
//// RETRIEVING ALL IMPORTS & CLIENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////


import {ComputeManagementClient, VirtualMachine} from "@azure/arm-compute";
import { ServiceClient } from "@azure/core-client";
import * as AzureImports from "./imports/azurePackage.import";

let allClients: AzureClients = {};

for (const key of Object.keys(AzureImports)) {
    const currentItem = (AzureImports as { [key: string]: unknown })[key];
    const clientsFromModule = extractClients(currentItem);
    allClients = { ...allClients, ...clientsFromModule };
}


interface AzureClients {
  [key: string]: any;
}

function extractClients(module: any): AzureClients {
  const clients: AzureClients = {};
  Object.keys(module).forEach((key) => {
      if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
        clients[key] = module[key];
      }
  });
  return clients;
}

import { 
    NetworkSecurityGroup
} from "@azure/arm-network";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import { MonitorClient } from "@azure/arm-monitor";
import {StorageAccount, StorageManagementClient} from "@azure/arm-storage";
import { BlobServiceClient } from "@azure/storage-blob";

const clientConstructors: Record<string, any> = {
    ResourceManagementClient,
};
Object.assign(clientConstructors, allClients);


import * as ckiNetworkSecurityClass from "../../class/azure/ckiNetworkSecurityGroup.class";
import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";
import axios from "axios";

import {getContext, getNewLogger} from "../logger.service";
import { Logger } from "azure";
const logger = getNewLogger("AzureLogger");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<Object[]|null>{

    let context = getContext();
    let resources = new Array<Object>();
    for(let config of azureConfig??[]){
        logger.debug("config: ");
        logger.debug(JSON.stringify(config));
        let prefix = config.prefix??(azureConfig.indexOf(config).toString());
        try {
            logger.debug("prefix: " + prefix);
            let subscriptionId = await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix);
            let azureClientId = await getConfigOrEnvVar(config, "AZURECLIENTID", prefix);
            if(azureClientId) setEnvVar("AZURE_CLIENT_ID", azureClientId);
            else logger.warn(prefix + "AZURECLIENTID not found");
            let azureClientSecret = await getConfigOrEnvVar(config, "AZURECLIENTSECRET", prefix);
            if(azureClientSecret) setEnvVar("AZURE_CLIENT_SECRET", azureClientSecret);
            else logger.warn(prefix + "AZURECLIENTSECRET not found");
            let azureTenantId = await getConfigOrEnvVar(config, "AZURETENANTID", prefix);
            if(azureTenantId) setEnvVar("AZURE_TENANT_ID", azureTenantId);
            else logger.warn(prefix + "AZURETENANTID not found");
            let UAI = {}
            let useAzureIdentity = await getConfigOrEnvVar(config, "USERAZUREIDENTITYID", prefix);
            if(useAzureIdentity) UAI = {managedIdentityClientId: useAzureIdentity};
            const credential = new DefaultAzureCredential(UAI);

            if(!subscriptionId) {
                throw new Error("- Please pass "+ prefix + "SUBSCRIPTIONID in your config file");
            } else {
                context?.log("- loading client microsoft azure done-");
                logger.info("- loading client microsoft azure done-");
                interface AzureRet {
                    [key: string]: any;
                }
                const azureRet: AzureRet = {};
                for (const clientService in allClients) {
                    const constructor = clientConstructors[clientService];
                    const clientName = constructor.name;
					let requireClient = false;
					if (Array.isArray(config.ObjectNameNeed)) {
						requireClient = config.ObjectNameNeed.some((item: string) => item.startsWith(constructor.name));
					} else {
						requireClient = false;
					}
					if (requireClient) {
						try {
							azureRet[clientName] = await callGenericClient(createGenericClient(constructor, credential, subscriptionId), config);
						} catch (e) {
							logger.debug("Error constructing client", e);
						}
					}
                }
                const flatRessources: { [key: string]: any } = {};
                Object.keys(azureRet).forEach(parentKey => {
                    azureRet[parentKey].forEach((childObj: any) => {
						Object.keys(childObj).forEach(childKey => {
							const newKey = parentKey + '.' + childKey;
							flatRessources[newKey as string] = childObj[childKey];
							});
                	});
                });
				const d = collectKexaRestructuredData(credential, subscriptionId, config);
                resources.push(flatRessources);
            }
        } catch(e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix))??null);
            logger.error(e);
        }	
    }
	return resources??null;
}


/* *************************************** */
/* 		AUTOMATED RESOURCES GATHERING      */
/* *************************************** */

function createGenericClient<T>(Client: new (credential: any, subscriptionId: any) => T, credential: any, subscriptionId: any): T {
    return new Client(credential, subscriptionId);
}

async function callGenericClient(client: any, config: any) {
    let results = [];
    logger.info("starting " + client.constructor.name + " Listing");
    results.push(await listAllResources(client, config));
    return results;
}

async function listAllResources(client: any, currentConfig: any) {
    logger.trace("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);

    const resultList: Record<string, any> = {};


    const promises = properties.map(async (element) => {
		const toCheck = client.constructor.name + '.' + element;
		if(!currentConfig.ObjectNameNeed?.includes(toCheck))
			return null;
        type StatusKey = keyof typeof client;
        let key: StatusKey = element;
        const methods = ["listAll", "list"];
        if (element.startsWith("_"))
            return;
        if (client[key]) {
            await Promise.all(
                methods.map(async (method) => {
                    const resource = client[key];
                    if (typeof resource === 'object' && typeof resource[method as keyof typeof resource] === 'function') {
                        const gotMethod = resource[method as keyof typeof resource] as (...args: any[]) => any;
                        const numberOfArgs = gotMethod.length;
                        if (numberOfArgs > 2) {
                            logger.debug(`Function ${key as string}.${method} requires ${numberOfArgs} arguments.`);
                            return;
                        }
                        const keyStr = key as string;
                        const toExec = "resourcesClient." + (key as string) + "." + method + "()";
                        logger.trace("To exec: " + toExec);
                        let resultObject: Record<string, any> = {};
                        try {
                            resultObject = await resource[method]();
                            resultList[keyStr] = resultObject.value ? resultObject.value : [];
                        } catch (e) {
                            logger.debug("Error on function :", e);
                        }
                    } else {
                        logger.debug(`Invalid property ${key as string} or function call ${method}.`);
                        return;
                    }
                })
            );
        }
    });
    await Promise.all(promises);
    return resultList;
}

  
/* ************************************ */
/*  	CUSTOM GATHER RESOURCES         */
/* ************************************ */

import {stringKeys} from "../../models/azure/resource.models";

interface FunctionMap {
    [key: string]: (name: string, credential: any, subscriptionId: any) => void;
}

const customGatherFunctions: FunctionMap = {

    'KexaAzure.vm': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");

		try {
			const computeClient = new ComputeManagementClient(credential, subscriptionId);
			const monitorClient = new MonitorClient(credential, subscriptionId);
			return virtualMachinesListing(computeClient, monitorClient);
		} catch (e) {
			logger.warn("Error creating Azure client: ", e);
			return ;
		}
    },

    'KexaAzure.mlWorkspaces': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");

		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			return workspacesListing(mlClient)
		} catch (e) {
			logger.warn("Error creating Azure client: " + name, e);
			return null;
		}
    },

	'KexaAzure.mlJobs': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");

		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			return workspacesListing(mlClient)
            .then(workspaces => {
                return jobsListing(mlClient, workspaces);
            })
            .catch(e => {
                logger.warn("Error creating Azure client: ", e);
                return null;
            });
		} catch (e) {
			logger.warn("Error creating Azure client: " + name, e);
			return null;
		}
    },

	'KexaAzure.mlComputes': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");

		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			return workspacesListing(mlClient)
            .then(workspaces => {
                return computeOperationsListing(mlClient, workspaces);
            })
            .catch(e => {
                logger.warn("Error creating Azure client: ", e);
                return null;
            });
		} catch (e) {
			logger.warn("Error creating Azure client: " + name, e);
			return ;
		}
    },

	'KexaAzure.mlSchedules': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");

		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			return workspacesListing(mlClient)
            .then(workspaces => {
                return schedulesListing(mlClient, workspaces);
            })
            .catch(e => {
                logger.warn("Error creating Azure client: ", e);
                return null;
            });
		} catch (e) {
			logger.warn("Error creating Azure client: " + name, e);
			return ;
		}
    },

	'KexaAzure.storage': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");
    },

	'KexaAzure.blob': (name: string, credential: any, subscriptionId: any) => {
        console.log("Starting " + name + " listing...");
		//listAllBlob();
    },
};


async function collectKexaRestructuredData(credential: any, subscriptionId: any, currentConfig: any) {
	stringKeys.forEach((element: any) => {
		if(!currentConfig.ObjectNameNeed?.includes(element))
			return null;
		customGatherFunctions[element](element, credential, subscriptionId);
	})
	return stringKeys;
}

export async function virtualMachinesListing(client:ComputeManagementClient, monitor:MonitorClient): Promise<Array<VirtualMachine>|null> {
    try {
        const resultList = new Array<VirtualMachine>;
        for await (let item of client.virtualMachines.listAll()){
            let vm:any = item;
            let rg = item.id?.split("/")[4] ?? "";
            vm.resourceGroupName = rg;
            const promises = [
                getMetrics(monitor, item.id??""),
                getVMDetails(item.hardwareProfile?.vmSize??""),
            ];
            const [metrics, vmDetails] = await Promise.all(promises);
            vm.instanceView = metrics;
            vm.details = vmDetails;
            vm.instanceView.availableMemoryBytes = convertMinMaxMeanMedianToPercentage(vm.instanceView.availableMemoryBytes, convertGbToBytes(vm.details?.MemoryGb??0));
            resultList.push(vm);
        }
        return resultList;
    }catch (err) {
        logger.debug("error in virtualMachinesListing:"+err);
        return null;
    } 
}

function convertGbToBytes(gb: number): number {
    return gb * 1024 * 1024 * 1024;
}

const VMSizeMemory: {[x:string]: any} = {}
async function getVMDetails(VMSize:string): Promise<any> {
    if(VMSizeMemory[VMSize]) return VMSizeMemory[VMSize];
    try {
        let capabilities = (await axios.post("https://api.thecloudprices.com/api/props/sku", {"name": VMSize})).data.message.CommonCapabilities;
        capabilities.MemoryGb = parseFloat(capabilities.MemoryGb.$numberDecimal);
        return capabilities;
    } catch (err) {
        logger.debug("error in getVMDetails:"+err);
        return null;
    }
}

async function getMetrics(client: MonitorClient, vmId:string): Promise<any> {
    try {
        const vmMetrics = await client.metrics.list(vmId, {
            //get all list of metrics available : az vm monitor metrics list-definitions --name MyVmName --resource-group MyRg --query "@[*].name.value" (select max 20)
            metricnames: "Percentage CPU,Network In,Network Out,Disk Read Operations/Sec,Disk Write Operations/Sec,OS Disk IOPS Consumed Percentage,Data Disk Latency,Available Memory Bytes",
            aggregation: "Average",
            timespan: "P14D",
        });
        let dataMetricsReformat:any = {};
        for(const metric of vmMetrics.value??[]){
            let data = metric.timeseries?.[0].data;
            if(data?.length){
                let name = (metric.name?.value??metric.name?.localizedValue)??"";
                if(name == "") continue;
                dataMetricsReformat[name.charAt(0).toLowerCase() + name.slice(1).replace(/ /g, "")] = getMinMaxMeanMedian(data.map((item:any)=>item.average).filter((item:any)=>item!=null));
            }
        }
        return dataMetricsReformat;
    } catch (err) {
        logger.debug("error in getCPUAndRAMUsage:"+err);
        return null;
    }
}

function getMinMaxMeanMedian(array: Array<number>): any {
    let min = array[0];
    let max = array[0];
    let sum = 0;
    for(const num of array){
        if(num < min) min = num;
        if(num > max) max = num;
        sum += num;
    }
    return {
        "min": min,
        "max": max,
        "mean": sum/array.length,
        "median": array[Math.floor(array.length/2)],
    }
}

// verify
async function listAllBlob(client:StorageManagementClient, credentials: any): Promise<Array<StorageAccount>|null> {
    logger.info("starting listAllBlob");
    try {
        const resultList = new Array<ResourceGroup>;
        console.log("storage :", test);
        for await (let item of client.storageAccounts.list()){
            resultList.push(item);
            const blobServiceClient = new BlobServiceClient(
                `https://${item.name}.blob.core.windows.net`,
                credentials
            );
            for await (const container of blobServiceClient.listContainers()) {
                console.log(`Container: ${container.name}`);
                for await (const blob of blobServiceClient.getContainerClient(container.name).listBlobsFlat()) {
                    console.log(` - Blob: ${blob.name}`);
                    // Process each blob as needed
                }
            }
        }
        return resultList;
    } catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return null;
    }
}

import { AzureMachineLearningWorkspaces, Workspace } from "@azure/arm-machinelearning";
import { convertMinMaxMeanMedianToPercentage } from "../../helpers/statsNumbers";
import { Credentials } from "aws-sdk";

async function workspacesListing(mlClient: AzureMachineLearningWorkspaces): Promise<any> {
	let workspacesResult;
	try {
		for await (let item of mlClient.workspaces.listBySubscription()) {
			workspacesResult = [...workspacesResult??[], item];
		}
	} catch(e) {
		logger.debug("Error when listing ml workspace in Azure");
		return null;
	}
	return workspacesResult;
}

async function jobsListing(client: AzureMachineLearningWorkspaces, workspaces: Array<Workspace>): Promise<any> {
	for (let i = 0; i < workspaces.length; i++) {
		try {
			let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
			let workspaceName = workspaces[i]?.name ?? "";
			const resArray = new Array();
			for await (let item of client.jobs.list(resourceGroupName, workspaceName)) {
				let result:any = item;
				result.workspace = workspaceName;
				result.resourceGroupName = resourceGroupName;
				resArray.push(result);
			}
			return resArray;
		} catch(e){
			logger.debug("error in jobsListing:"+e);
			return [];
		}
	}
}

async function computeOperationsListing(client: AzureMachineLearningWorkspaces, workspaces: Array<Workspace>): Promise<any> {
	for (let i = 0; i < workspaces.length; i++) {
		try{
			let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
			let workspaceName = workspaces[i]?.name ?? "";
			const resArray = new Array();
			for await (let item of client.computeOperations.list(resourceGroupName, workspaceName)) {
				let result:any = item;
				result.workspace = workspaceName;
				result.resourceGroupName = resourceGroupName;
				resArray.push(item);
			}
			return resArray;
		}catch(e){
			logger.debug("error in computeOperationsListing:"+e);
			return [];
		}
	}
}

async function schedulesListing(client: AzureMachineLearningWorkspaces, workspaces: Array<Workspace>): Promise<any> {
	for (let i = 0; i < workspaces.length; i++) {
		try {
			let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
			let workspaceName = workspaces[i]?.name ?? "";
			const resArray = new Array();
			for await (let item of client.schedules.list(resourceGroupName, workspaceName)) {
				let result:any = item;
				result.workspace = workspaceName;
				result.resourceGroupName = resourceGroupName;
				resArray.push(item);
			}
			return resArray;
		} catch(e){
			logger.debug("error in schedulesListing:"+e);
			return [];
		}
	}
}