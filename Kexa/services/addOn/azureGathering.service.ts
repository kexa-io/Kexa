/*
    * Provider : azure
    * Thumbnail : https://cdn.icon-icons.com/icons2/2699/PNG/512/microsoft_azure_logo_icon_168977.png
    * Documentation : https://learn.microsoft.com/fr-fr/javascript/api/overview/azure/?view=azure-node-latest
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
	*	- AdvisorManagementClient.recommendationMetadata
	*	- AdvisorManagementClient.configurations
	*	- AdvisorManagementClient.recommendations
	*	- AdvisorManagementClient.operations
	*	- AdvisorManagementClient.suppressions
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
	*	- ContainerAppsAPIClient.jobs
	*	- ContainerAppsAPIClient.operations
	*	- ContainerAppsAPIClient.jobsExecutions
	*	- ContainerAppsAPIClient.managedEnvironments
	*	- ContainerAppsAPIClient.certificates
	*	- ContainerAppsAPIClient.managedCertificates
	*	- ContainerAppsAPIClient.namespaces
	*	- ContainerAppsAPIClient.daprComponents
	*	- ContainerAppsAPIClient.managedEnvironmentsStorages
	*	- ContainerAppsAPIClient.containerAppsSourceControls
	*	- ContainerAppsAPIClient.usages
	*	- ContainerAppsAPIClient.managedEnvironmentUsages
	*	- AppConfigurationManagementClient.configurationStores
	*	- AppConfigurationManagementClient.operations
	*	- AppConfigurationManagementClient.privateEndpointConnections
	*	- AppConfigurationManagementClient.privateLinkResources
	*	- AppConfigurationManagementClient.keyValues
	*	- AppConfigurationManagementClient.replicas
	*	- AppConfigurationManagementClient.snapshots
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
	*	- AppPlatformManagementClient.apms
	*	- AppPlatformManagementClient.configServers
	*	- AppPlatformManagementClient.configurationServices
	*	- AppPlatformManagementClient.serviceRegistries
	*	- AppPlatformManagementClient.applicationLiveViews
	*	- AppPlatformManagementClient.devToolPortals
	*	- AppPlatformManagementClient.containerRegistries
	*	- AppPlatformManagementClient.buildServiceOperations
	*	- AppPlatformManagementClient.buildpackBinding
	*	- AppPlatformManagementClient.buildServiceBuilder
	*	- AppPlatformManagementClient.buildServiceAgentPool
	*	- AppPlatformManagementClient.monitoringSettings
	*	- AppPlatformManagementClient.apps
	*	- AppPlatformManagementClient.bindings
	*	- AppPlatformManagementClient.storages
	*	- AppPlatformManagementClient.certificates
	*	- AppPlatformManagementClient.customDomains
	*	- AppPlatformManagementClient.deployments
	*	- AppPlatformManagementClient.operations
	*	- AppPlatformManagementClient.runtimeVersions
	*	- AppPlatformManagementClient.skus
	*	- AppPlatformManagementClient.gateways
	*	- AppPlatformManagementClient.gatewayRouteConfigs
	*	- AppPlatformManagementClient.gatewayCustomDomains
	*	- AppPlatformManagementClient.apiPortals
	*	- AppPlatformManagementClient.apiPortalCustomDomains
	*	- AppPlatformManagementClient.applicationAccelerators
	*	- AppPlatformManagementClient.customizedAccelerators
	*	- AppPlatformManagementClient.predefinedAccelerators
	*	- WebSiteManagementClient.appServiceCertificateOrders
	*	- WebSiteManagementClient.certificateOrdersDiagnostics
	*	- WebSiteManagementClient.certificateRegistrationProvider
	*	- WebSiteManagementClient.domainRegistrationProvider
	*	- WebSiteManagementClient.domains
	*	- WebSiteManagementClient.topLevelDomains
	*	- WebSiteManagementClient.appServiceEnvironments
	*	- WebSiteManagementClient.appServicePlans
	*	- WebSiteManagementClient.certificates
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
	*	- AttestationManagementClient.operations
	*	- AttestationManagementClient.attestationProviders
	*	- AttestationManagementClient.privateEndpointConnections
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
	*	- ExternalIdentitiesConfigurationClient.b2CTenants
	*	- ExternalIdentitiesConfigurationClient.operations
	*	- ExternalIdentitiesConfigurationClient.guestUsages
	*	- AzureStackManagementClient.acceptLanguage
	*	- AzureStackManagementClient.longRunningOperationRetryTimeout
	*	- AzureStackManagementClient.baseUri
	*	- AzureStackManagementClient.requestContentType
	*	- AzureStackManagementClient.credentials
	*	- AzureStackManagementClient.operations
	*	- AzureStackManagementClient.products
	*	- AzureStackManagementClient.registrations
	*	- AzureStackManagementClient.customerSubscriptions
	*	- AzureStackHCIClient.arcSettings
	*	- AzureStackHCIClient.clusters
	*	- AzureStackHCIClient.extensions
	*	- AzureStackHCIClient.operations
	*	- BatchManagementClient.batchAccountOperations
	*	- BatchManagementClient.applicationPackageOperations
	*	- BatchManagementClient.applicationOperations
	*	- BatchManagementClient.location
	*	- BatchManagementClient.operations
	*	- BatchManagementClient.certificateOperations
	*	- BatchManagementClient.privateLinkResourceOperations
	*	- BatchManagementClient.privateEndpointConnectionOperations
	*	- BatchManagementClient.poolOperations
	*	- BatchManagementClient.networkSecurityPerimeterOperations
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
	*	- BillingManagementClient.agreements
	*	- BillingManagementClient.associatedTenants
	*	- BillingManagementClient.availableBalances
	*	- BillingManagementClient.billingAccounts
	*	- BillingManagementClient.address
	*	- BillingManagementClient.billingPermissions
	*	- BillingManagementClient.billingProfiles
	*	- BillingManagementClient.billingPropertyOperations
	*	- BillingManagementClient.billingRequests
	*	- BillingManagementClient.billingRoleAssignments
	*	- BillingManagementClient.billingRoleDefinitionOperations
	*	- BillingManagementClient.savingsPlanOrders
	*	- BillingManagementClient.savingsPlans
	*	- BillingManagementClient.billingSubscriptions
	*	- BillingManagementClient.billingSubscriptionsAliases
	*	- BillingManagementClient.customers
	*	- BillingManagementClient.departments
	*	- BillingManagementClient.enrollmentAccounts
	*	- BillingManagementClient.invoices
	*	- BillingManagementClient.invoiceSections
	*	- BillingManagementClient.operations
	*	- BillingManagementClient.paymentMethods
	*	- BillingManagementClient.policies
	*	- BillingManagementClient.products
	*	- BillingManagementClient.reservations
	*	- BillingManagementClient.reservationOrders
	*	- BillingManagementClient.transactions
	*	- BillingManagementClient.transfers
	*	- BillingManagementClient.partnerTransfers
	*	- BillingManagementClient.recipientTransfers
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
	*	- AzureChangeAnalysisManagementClient.operations
	*	- AzureChangeAnalysisManagementClient.resourceChanges
	*	- AzureChangeAnalysisManagementClient.changes
	*	- ChangesClient.changes
	*	- CognitiveServicesManagementClient.accounts
	*	- CognitiveServicesManagementClient.deletedAccounts
	*	- CognitiveServicesManagementClient.resourceSkus
	*	- CognitiveServicesManagementClient.usages
	*	- CognitiveServicesManagementClient.operations
	*	- CognitiveServicesManagementClient.commitmentTiers
	*	- CognitiveServicesManagementClient.models
	*	- CognitiveServicesManagementClient.locationBasedModelCapacities
	*	- CognitiveServicesManagementClient.modelCapacities
	*	- CognitiveServicesManagementClient.privateEndpointConnections
	*	- CognitiveServicesManagementClient.privateLinkResources
	*	- CognitiveServicesManagementClient.deployments
	*	- CognitiveServicesManagementClient.commitmentPlans
	*	- CognitiveServicesManagementClient.encryptionScopes
	*	- CognitiveServicesManagementClient.raiPolicies
	*	- CognitiveServicesManagementClient.raiBlocklists
	*	- CognitiveServicesManagementClient.raiBlocklistItems
	*	- CognitiveServicesManagementClient.raiContentFilters
	*	- CognitiveServicesManagementClient.networkSecurityPerimeterConfigurations
	*	- CognitiveServicesManagementClient.defenderForAISettings
	*	- UsageManagementClient.acceptLanguage
	*	- UsageManagementClient.longRunningOperationRetryTimeout
	*	- UsageManagementClient.baseUri
	*	- UsageManagementClient.requestContentType
	*	- UsageManagementClient.credentials
	*	- UsageManagementClient.usageAggregates
	*	- UsageManagementClient.rateCard
	*	- AzureMLCommitmentPlansManagementClient.acceptLanguage
	*	- AzureMLCommitmentPlansManagementClient.longRunningOperationRetryTimeout
	*	- AzureMLCommitmentPlansManagementClient.baseUri
	*	- AzureMLCommitmentPlansManagementClient.requestContentType
	*	- AzureMLCommitmentPlansManagementClient.credentials
	*	- AzureMLCommitmentPlansManagementClient.skus
	*	- AzureMLCommitmentPlansManagementClient.commitmentAssociations
	*	- AzureMLCommitmentPlansManagementClient.commitmentPlans
	*	- AzureMLCommitmentPlansManagementClient.usageHistory
	*	- CommunicationServiceManagementClient.operations
	*	- CommunicationServiceManagementClient.communicationServices
	*	- CommunicationServiceManagementClient.domains
	*	- CommunicationServiceManagementClient.emailServices
	*	- CommunicationServiceManagementClient.senderUsernames
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
	*	- ComputeManagementClient.softDeletedResource
	*	- ComputeManagementClient.gallerySharingProfile
	*	- ComputeManagementClient.galleryInVMAccessControlProfiles
	*	- ComputeManagementClient.galleryInVMAccessControlProfileVersions
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
	*	- ConfidentialLedgerClient.operations
	*	- ConfidentialLedgerClient.ledger
	*	- ConfluentManagementClient.marketplaceAgreements
	*	- ConfluentManagementClient.organizationOperations
	*	- ConfluentManagementClient.organization
	*	- ConfluentManagementClient.validations
	*	- ConfluentManagementClient.access
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
	*	- ContainerInstanceManagementClient.containerGroups
	*	- ContainerInstanceManagementClient.operations
	*	- ContainerInstanceManagementClient.location
	*	- ContainerInstanceManagementClient.containers
	*	- ContainerInstanceManagementClient.subnetServiceAssociationLink
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
	*	- ContainerServiceClient.machines
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
	*	- DashboardManagementClient.operations
	*	- DashboardManagementClient.grafana
	*	- DashboardManagementClient.privateEndpointConnections
	*	- DashboardManagementClient.privateLinkResources
	*	- DashboardManagementClient.managedPrivateEndpoints
	*	- DataBoxManagementClient.operations
	*	- DataBoxManagementClient.jobs
	*	- DataBoxManagementClient.service
	*	- DataBoxEdgeManagementClient.acceptLanguage
	*	- DataBoxEdgeManagementClient.longRunningOperationRetryTimeout
	*	- DataBoxEdgeManagementClient.baseUri
	*	- DataBoxEdgeManagementClient.requestContentType
	*	- DataBoxEdgeManagementClient.credentials
	*	- DataBoxEdgeManagementClient.operations
	*	- DataBoxEdgeManagementClient.devices
	*	- DataBoxEdgeManagementClient.alerts
	*	- DataBoxEdgeManagementClient.bandwidthSchedules
	*	- DataBoxEdgeManagementClient.jobs
	*	- DataBoxEdgeManagementClient.operationsStatus
	*	- DataBoxEdgeManagementClient.orders
	*	- DataBoxEdgeManagementClient.roles
	*	- DataBoxEdgeManagementClient.shares
	*	- DataBoxEdgeManagementClient.storageAccountCredentials
	*	- DataBoxEdgeManagementClient.triggers
	*	- DataBoxEdgeManagementClient.users
	*	- AzureDatabricksManagementClient.workspaces
	*	- AzureDatabricksManagementClient.operations
	*	- AzureDatabricksManagementClient.privateLinkResources
	*	- AzureDatabricksManagementClient.privateEndpointConnections
	*	- AzureDatabricksManagementClient.outboundNetworkDependenciesEndpoints
	*	- AzureDatabricksManagementClient.vNetPeering
	*	- AzureDatabricksManagementClient.accessConnectors
	*	- DataCatalogRestClient.aDCOperations
	*	- DataCatalogRestClient.aDCCatalogs
	*	- MicrosoftDatadogClient.marketplaceAgreements
	*	- MicrosoftDatadogClient.creationSupported
	*	- MicrosoftDatadogClient.monitors
	*	- MicrosoftDatadogClient.operations
	*	- MicrosoftDatadogClient.tagRules
	*	- MicrosoftDatadogClient.singleSignOnConfigurations
	*	- MicrosoftDatadogClient.monitoredSubscriptions
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
	*	- DesktopVirtualizationAPIClient.appAttachPackageInfo
	*	- DesktopVirtualizationAPIClient.msixImages
	*	- DesktopVirtualizationAPIClient.appAttachPackageOperations
	*	- IotDpsClient.operations
	*	- IotDpsClient.dpsCertificate
	*	- IotDpsClient.iotDpsResource
	*	- DevSpacesManagementClient.containerHostMappings
	*	- DevSpacesManagementClient.operations
	*	- DevSpacesManagementClient.controllers
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
	*	- AzureDigitalTwinsManagementClient.digitalTwins
	*	- AzureDigitalTwinsManagementClient.digitalTwinsEndpoint
	*	- AzureDigitalTwinsManagementClient.operations
	*	- AzureDigitalTwinsManagementClient.privateLinkResources
	*	- AzureDigitalTwinsManagementClient.privateEndpointConnections
	*	- AzureDigitalTwinsManagementClient.timeSeriesDatabaseConnections
	*	- DnsManagementClient.recordSets
	*	- DnsManagementClient.zones
	*	- DnsManagementClient.dnsResourceReferenceOperations
	*	- DnsResolverManagementClient.dnsResolvers
	*	- DnsResolverManagementClient.inboundEndpoints
	*	- DnsResolverManagementClient.outboundEndpoints
	*	- DnsResolverManagementClient.dnsForwardingRulesets
	*	- DnsResolverManagementClient.forwardingRules
	*	- DnsResolverManagementClient.virtualNetworkLinks
	*	- EducationManagementClient.operations
	*	- EducationManagementClient.grants
	*	- EducationManagementClient.labs
	*	- EducationManagementClient.joinRequests
	*	- EducationManagementClient.students
	*	- EducationManagementClient.studentLabs
	*	- EventGridManagementClient.caCertificates
	*	- EventGridManagementClient.channels
	*	- EventGridManagementClient.clientGroups
	*	- EventGridManagementClient.clients
	*	- EventGridManagementClient.domains
	*	- EventGridManagementClient.domainTopics
	*	- EventGridManagementClient.topicEventSubscriptions
	*	- EventGridManagementClient.domainEventSubscriptions
	*	- EventGridManagementClient.namespaceTopicEventSubscriptions
	*	- EventGridManagementClient.eventSubscriptions
	*	- EventGridManagementClient.domainTopicEventSubscriptions
	*	- EventGridManagementClient.systemTopicEventSubscriptions
	*	- EventGridManagementClient.partnerTopicEventSubscriptions
	*	- EventGridManagementClient.namespaces
	*	- EventGridManagementClient.namespaceTopics
	*	- EventGridManagementClient.operations
	*	- EventGridManagementClient.topics
	*	- EventGridManagementClient.partnerConfigurations
	*	- EventGridManagementClient.partnerNamespaces
	*	- EventGridManagementClient.partnerRegistrations
	*	- EventGridManagementClient.partnerTopics
	*	- EventGridManagementClient.permissionBindings
	*	- EventGridManagementClient.privateEndpointConnections
	*	- EventGridManagementClient.privateLinkResources
	*	- EventGridManagementClient.systemTopics
	*	- EventGridManagementClient.extensionTopics
	*	- EventGridManagementClient.topicSpaces
	*	- EventGridManagementClient.topicTypes
	*	- EventGridManagementClient.verifiedPartners
	*	- EventHubManagementClient.clusters
	*	- EventHubManagementClient.namespaces
	*	- EventHubManagementClient.privateEndpointConnections
	*	- EventHubManagementClient.privateLinkResources
	*	- EventHubManagementClient.networkSecurityPerimeterConfigurationOperations
	*	- EventHubManagementClient.networkSecurityPerimeterConfigurations
	*	- EventHubManagementClient.configuration
	*	- EventHubManagementClient.disasterRecoveryConfigs
	*	- EventHubManagementClient.eventHubs
	*	- EventHubManagementClient.consumerGroups
	*	- EventHubManagementClient.operations
	*	- EventHubManagementClient.schemaRegistry
	*	- EventHubManagementClient.applicationGroupOperations
	*	- CustomLocationsManagementClient.customLocations
	*	- CustomLocationsManagementClient.resourceSyncRules
	*	- FeatureClient.features
	*	- FeatureClient.subscriptionFeatureRegistrations
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
	*	- HanaManagementClient.acceptLanguage
	*	- HanaManagementClient.longRunningOperationRetryTimeout
	*	- HanaManagementClient.baseUri
	*	- HanaManagementClient.requestContentType
	*	- HanaManagementClient.credentials
	*	- HanaManagementClient.operations
	*	- HanaManagementClient.hanaInstances
	*	- HanaManagementClient.sapMonitors
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
	*	- HybridComputeManagementClient.licenses
	*	- HybridComputeManagementClient.machines
	*	- HybridComputeManagementClient.licenseProfiles
	*	- HybridComputeManagementClient.machineExtensions
	*	- HybridComputeManagementClient.extensionMetadata
	*	- HybridComputeManagementClient.operations
	*	- HybridComputeManagementClient.networkProfileOperations
	*	- HybridComputeManagementClient.privateLinkScopes
	*	- HybridComputeManagementClient.privateLinkResources
	*	- HybridComputeManagementClient.privateEndpointConnections
	*	- HybridComputeManagementClient.networkSecurityPerimeterConfigurations
	*	- ConnectedKubernetesClient.connectedClusterOperations
	*	- ConnectedKubernetesClient.operations
	*	- ImageBuilderClient.virtualMachineImageTemplates
	*	- ImageBuilderClient.triggers
	*	- ImageBuilderClient.operations
	*	- IotCentralClient.apps
	*	- IotCentralClient.operations
	*	- IotHubClient.operations
	*	- IotHubClient.iotHubResource
	*	- IotHubClient.resourceProviderCommon
	*	- IotHubClient.certificates
	*	- IotHubClient.iotHub
	*	- IotHubClient.privateLinkResourcesOperations
	*	- IotHubClient.privateEndpointConnections
	*	- IoTSpacesClient.ioTSpaces
	*	- IoTSpacesClient.operations
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
	*	- SourceControlConfigurationClient.extensions
	*	- SourceControlConfigurationClient.operationStatus
	*	- SourceControlConfigurationClient.fluxConfigurations
	*	- SourceControlConfigurationClient.fluxConfigOperationStatus
	*	- SourceControlConfigurationClient.sourceControlConfigurations
	*	- SourceControlConfigurationClient.operations
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
	*	- ManagementLinkClient.operations
	*	- ManagementLinkClient.resourceLinks
	*	- LoadTestClient.operations
	*	- LoadTestClient.loadTests
	*	- ManagementLockClient.authorizationOperations
	*	- ManagementLockClient.managementLocks
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
	*	- AzureMachineLearningServicesManagementClient.operations
	*	- AzureMachineLearningServicesManagementClient.workspaces
	*	- AzureMachineLearningServicesManagementClient.usages
	*	- AzureMachineLearningServicesManagementClient.virtualMachineSizes
	*	- AzureMachineLearningServicesManagementClient.quotas
	*	- AzureMachineLearningServicesManagementClient.computeOperations
	*	- AzureMachineLearningServicesManagementClient.privateEndpointConnections
	*	- AzureMachineLearningServicesManagementClient.privateLinkResources
	*	- AzureMachineLearningServicesManagementClient.workspaceConnections
	*	- AzureMachineLearningServicesManagementClient.managedNetworkSettingsRule
	*	- AzureMachineLearningServicesManagementClient.managedNetworkProvisions
	*	- AzureMachineLearningServicesManagementClient.registryCodeContainers
	*	- AzureMachineLearningServicesManagementClient.registryCodeVersions
	*	- AzureMachineLearningServicesManagementClient.registryComponentContainers
	*	- AzureMachineLearningServicesManagementClient.registryComponentVersions
	*	- AzureMachineLearningServicesManagementClient.registryDataContainers
	*	- AzureMachineLearningServicesManagementClient.registryDataVersions
	*	- AzureMachineLearningServicesManagementClient.registryDataReferences
	*	- AzureMachineLearningServicesManagementClient.registryEnvironmentContainers
	*	- AzureMachineLearningServicesManagementClient.registryEnvironmentVersions
	*	- AzureMachineLearningServicesManagementClient.registryModelContainers
	*	- AzureMachineLearningServicesManagementClient.registryModelVersions
	*	- AzureMachineLearningServicesManagementClient.batchEndpoints
	*	- AzureMachineLearningServicesManagementClient.batchDeployments
	*	- AzureMachineLearningServicesManagementClient.codeContainers
	*	- AzureMachineLearningServicesManagementClient.codeVersions
	*	- AzureMachineLearningServicesManagementClient.componentContainers
	*	- AzureMachineLearningServicesManagementClient.componentVersions
	*	- AzureMachineLearningServicesManagementClient.dataContainers
	*	- AzureMachineLearningServicesManagementClient.dataVersions
	*	- AzureMachineLearningServicesManagementClient.datastores
	*	- AzureMachineLearningServicesManagementClient.environmentContainers
	*	- AzureMachineLearningServicesManagementClient.environmentVersions
	*	- AzureMachineLearningServicesManagementClient.featuresetContainers
	*	- AzureMachineLearningServicesManagementClient.features
	*	- AzureMachineLearningServicesManagementClient.featuresetVersions
	*	- AzureMachineLearningServicesManagementClient.featurestoreEntityContainers
	*	- AzureMachineLearningServicesManagementClient.featurestoreEntityVersions
	*	- AzureMachineLearningServicesManagementClient.jobs
	*	- AzureMachineLearningServicesManagementClient.marketplaceSubscriptions
	*	- AzureMachineLearningServicesManagementClient.modelContainers
	*	- AzureMachineLearningServicesManagementClient.modelVersions
	*	- AzureMachineLearningServicesManagementClient.onlineEndpoints
	*	- AzureMachineLearningServicesManagementClient.onlineDeployments
	*	- AzureMachineLearningServicesManagementClient.schedules
	*	- AzureMachineLearningServicesManagementClient.serverlessEndpoints
	*	- AzureMachineLearningServicesManagementClient.registries
	*	- AzureMachineLearningServicesManagementClient.workspaceFeatures
	*	- MachineLearningComputeManagementClient.acceptLanguage
	*	- MachineLearningComputeManagementClient.longRunningOperationRetryTimeout
	*	- MachineLearningComputeManagementClient.baseUri
	*	- MachineLearningComputeManagementClient.requestContentType
	*	- MachineLearningComputeManagementClient.credentials
	*	- MachineLearningComputeManagementClient.operationalizationClusters
	*	- MachineLearningComputeManagementClient.machineLearningCompute
	*	- MLTeamAccountManagementClient.acceptLanguage
	*	- MLTeamAccountManagementClient.longRunningOperationRetryTimeout
	*	- MLTeamAccountManagementClient.baseUri
	*	- MLTeamAccountManagementClient.requestContentType
	*	- MLTeamAccountManagementClient.credentials
	*	- MLTeamAccountManagementClient.operations
	*	- MLTeamAccountManagementClient.accounts
	*	- MLTeamAccountManagementClient.workspaces
	*	- MLTeamAccountManagementClient.projects
	*	- ApplicationClient.applications
	*	- ApplicationClient.applicationDefinitions
	*	- ApplicationClient.jitRequests
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
	*	- MixedRealityClient.operations
	*	- MixedRealityClient.spatialAnchorsAccounts
	*	- MixedRealityClient.remoteRenderingAccounts
	*	- MobileNetworkManagementClient.attachedDataNetworks
	*	- MobileNetworkManagementClient.dataNetworks
	*	- MobileNetworkManagementClient.diagnosticsPackages
	*	- MobileNetworkManagementClient.mobileNetworks
	*	- MobileNetworkManagementClient.operations
	*	- MobileNetworkManagementClient.packetCaptures
	*	- MobileNetworkManagementClient.packetCoreControlPlanes
	*	- MobileNetworkManagementClient.routingInfo
	*	- MobileNetworkManagementClient.packetCoreControlPlaneVersions
	*	- MobileNetworkManagementClient.packetCoreDataPlanes
	*	- MobileNetworkManagementClient.services
	*	- MobileNetworkManagementClient.sims
	*	- MobileNetworkManagementClient.simGroups
	*	- MobileNetworkManagementClient.simPolicies
	*	- MobileNetworkManagementClient.sites
	*	- MobileNetworkManagementClient.slices
	*	- MobileNetworkManagementClient.extendedUeInformation
	*	- MobileNetworkManagementClient.ueInformation
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
	*	- ManagedServiceIdentityClient.systemAssignedIdentities
	*	- ManagedServiceIdentityClient.operations
	*	- ManagedServiceIdentityClient.userAssignedIdentities
	*	- ManagedServiceIdentityClient.federatedIdentityCredentials
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
	*	- NetAppManagementClient.operations
	*	- NetAppManagementClient.netAppResource
	*	- NetAppManagementClient.netAppResourceQuotaLimits
	*	- NetAppManagementClient.netAppResourceRegionInfos
	*	- NetAppManagementClient.accounts
	*	- NetAppManagementClient.pools
	*	- NetAppManagementClient.volumes
	*	- NetAppManagementClient.snapshots
	*	- NetAppManagementClient.snapshotPolicies
	*	- NetAppManagementClient.backupPolicies
	*	- NetAppManagementClient.volumeQuotaRules
	*	- NetAppManagementClient.volumeGroups
	*	- NetAppManagementClient.subvolumes
	*	- NetAppManagementClient.backups
	*	- NetAppManagementClient.backupVaults
	*	- NetAppManagementClient.backupsUnderBackupVault
	*	- NetAppManagementClient.backupsUnderVolume
	*	- NetAppManagementClient.backupsUnderAccount
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
	*	- NetworkManagementClient.firewallPolicyDrafts
	*	- NetworkManagementClient.firewallPolicyDeployments
	*	- NetworkManagementClient.firewallPolicyRuleCollectionGroupDrafts
	*	- NetworkManagementClient.ipamPools
	*	- NetworkManagementClient.staticCidrs
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
	*	- NetworkManagementClient.networkManagerRoutingConfigurations
	*	- NetworkManagementClient.routingRuleCollections
	*	- NetworkManagementClient.routingRules
	*	- NetworkManagementClient.scopeConnections
	*	- NetworkManagementClient.securityAdminConfigurations
	*	- NetworkManagementClient.adminRuleCollections
	*	- NetworkManagementClient.adminRules
	*	- NetworkManagementClient.securityUserConfigurations
	*	- NetworkManagementClient.securityUserRuleCollections
	*	- NetworkManagementClient.securityUserRules
	*	- NetworkManagementClient.networkProfiles
	*	- NetworkManagementClient.networkSecurityGroups
	*	- NetworkManagementClient.securityRules
	*	- NetworkManagementClient.defaultSecurityRules
	*	- NetworkManagementClient.reachabilityAnalysisIntents
	*	- NetworkManagementClient.reachabilityAnalysisRuns
	*	- NetworkManagementClient.verifierWorkspaces
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
	*	- NetworkManagementClient.networkVirtualApplianceConnections
	*	- NetworkManagementClient.virtualHubBgpConnection
	*	- NetworkManagementClient.virtualHubBgpConnections
	*	- NetworkManagementClient.virtualHubIpConfiguration
	*	- NetworkManagementClient.hubRouteTables
	*	- NetworkManagementClient.routingIntentOperations
	*	- NetworkManagementClient.webApplicationFirewallPolicies
	*	- NotificationHubsManagementClient.operations
	*	- NotificationHubsManagementClient.namespaces
	*	- NotificationHubsManagementClient.notificationHubs
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
	*	- PolicyClient.dataPolicyManifests
	*	- PolicyClient.policyAssignments
	*	- PolicyClient.policyDefinitions
	*	- PolicyClient.policySetDefinitions
	*	- PolicyClient.policyExemptions
	*	- PolicyInsightsClient.policyTrackedResources
	*	- PolicyInsightsClient.remediations
	*	- PolicyInsightsClient.policyEvents
	*	- PolicyInsightsClient.policyStates
	*	- PolicyInsightsClient.policyMetadataOperations
	*	- PolicyInsightsClient.policyRestrictions
	*	- PolicyInsightsClient.componentPolicyStates
	*	- PolicyInsightsClient.operations
	*	- PolicyInsightsClient.attestations
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
	*	- PostgreSQLManagementFlexibleServerClient.administrators
	*	- PostgreSQLManagementFlexibleServerClient.backups
	*	- PostgreSQLManagementFlexibleServerClient.locationBasedCapabilities
	*	- PostgreSQLManagementFlexibleServerClient.serverCapabilities
	*	- PostgreSQLManagementFlexibleServerClient.checkNameAvailability
	*	- PostgreSQLManagementFlexibleServerClient.checkNameAvailabilityWithLocation
	*	- PostgreSQLManagementFlexibleServerClient.configurations
	*	- PostgreSQLManagementFlexibleServerClient.databases
	*	- PostgreSQLManagementFlexibleServerClient.firewallRules
	*	- PostgreSQLManagementFlexibleServerClient.servers
	*	- PostgreSQLManagementFlexibleServerClient.flexibleServer
	*	- PostgreSQLManagementFlexibleServerClient.ltrBackupOperations
	*	- PostgreSQLManagementFlexibleServerClient.migrations
	*	- PostgreSQLManagementFlexibleServerClient.operations
	*	- PostgreSQLManagementFlexibleServerClient.getPrivateDnsZoneSuffix
	*	- PostgreSQLManagementFlexibleServerClient.privateEndpointConnections
	*	- PostgreSQLManagementFlexibleServerClient.privateEndpointConnectionOperations
	*	- PostgreSQLManagementFlexibleServerClient.privateLinkResources
	*	- PostgreSQLManagementFlexibleServerClient.replicas
	*	- PostgreSQLManagementFlexibleServerClient.logFiles
	*	- PostgreSQLManagementFlexibleServerClient.serverThreatProtectionSettings
	*	- PostgreSQLManagementFlexibleServerClient.virtualEndpoints
	*	- PostgreSQLManagementFlexibleServerClient.virtualNetworkSubnetUsage
	*	- PowerBIEmbeddedManagementClient.workspaceCollections
	*	- PowerBIEmbeddedManagementClient.workspaces
	*	- PrivateDnsManagementClient.privateZones
	*	- PrivateDnsManagementClient.virtualNetworkLinks
	*	- PrivateDnsManagementClient.recordSets
	*	- PurviewManagementClient.accounts
	*	- PurviewManagementClient.defaultAccounts
	*	- PurviewManagementClient.operations
	*	- PurviewManagementClient.privateEndpointConnections
	*	- PurviewManagementClient.privateLinkResources
	*	- RecoveryServicesClient.vaultCertificates
	*	- RecoveryServicesClient.registeredIdentities
	*	- RecoveryServicesClient.replicationUsages
	*	- RecoveryServicesClient.privateLinkResourcesOperations
	*	- RecoveryServicesClient.recoveryServices
	*	- RecoveryServicesClient.vaults
	*	- RecoveryServicesClient.operations
	*	- RecoveryServicesClient.vaultExtendedInfo
	*	- RecoveryServicesClient.usages
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
	*	- RedisEnterpriseManagementClient.operations
	*	- RedisEnterpriseManagementClient.operationsStatus
	*	- RedisEnterpriseManagementClient.redisEnterprise
	*	- RedisEnterpriseManagementClient.databases
	*	- RedisEnterpriseManagementClient.privateEndpointConnections
	*	- RedisEnterpriseManagementClient.privateLinkResources
	*	- ResourceGraphClient.acceptLanguage
	*	- ResourceGraphClient.longRunningOperationRetryTimeout
	*	- ResourceGraphClient.baseUri
	*	- ResourceGraphClient.requestContentType
	*	- ResourceGraphClient.credentials
	*	- ResourceGraphClient.operations
	*	- ResourceManagementClient.operations
	*	- ResourceManagementClient.deployments
	*	- ResourceManagementClient.providers
	*	- ResourceManagementClient.providerResourceTypes
	*	- ResourceManagementClient.resources
	*	- ResourceManagementClient.resourceGroups
	*	- ResourceManagementClient.tagsOperations
	*	- ResourceManagementClient.deploymentOperations
	*	- SubscriptionClient.subscriptions
	*	- SubscriptionClient.tenants
	*	- SubscriptionClient.subscriptionOperations
	*	- SubscriptionClient.operations
	*	- SubscriptionClient.alias
	*	- SubscriptionClient.subscriptionPolicy
	*	- SubscriptionClient.billingAccount
	*	- SearchManagementClient.operations
	*	- SearchManagementClient.adminKeys
	*	- SearchManagementClient.queryKeys
	*	- SearchManagementClient.services
	*	- SearchManagementClient.privateLinkResources
	*	- SearchManagementClient.privateEndpointConnections
	*	- SearchManagementClient.sharedPrivateLinkResources
	*	- SearchManagementClient.usages
	*	- MicrosoftSerialConsoleClient.serialPorts
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
	*	- ServiceFabricManagementClient.clusters
	*	- ServiceFabricManagementClient.clusterVersions
	*	- ServiceFabricManagementClient.operations
	*	- ServiceFabricManagementClient.applicationTypes
	*	- ServiceFabricManagementClient.applicationTypeVersions
	*	- ServiceFabricManagementClient.applications
	*	- ServiceFabricManagementClient.services
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
	*	- ServiceLinkerManagementClient.linker
	*	- ServiceLinkerManagementClient.operations
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
	*	- SignalRManagementClient.operations
	*	- SignalRManagementClient.signalR
	*	- SignalRManagementClient.usages
	*	- SignalRManagementClient.signalRCustomCertificates
	*	- SignalRManagementClient.signalRCustomDomains
	*	- SignalRManagementClient.signalRPrivateEndpointConnections
	*	- SignalRManagementClient.signalRPrivateLinkResources
	*	- SignalRManagementClient.signalRSharedPrivateLinkResources
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
	*	- SqlVirtualMachineManagementClient.acceptLanguage
	*	- SqlVirtualMachineManagementClient.longRunningOperationRetryTimeout
	*	- SqlVirtualMachineManagementClient.baseUri
	*	- SqlVirtualMachineManagementClient.requestContentType
	*	- SqlVirtualMachineManagementClient.credentials
	*	- SqlVirtualMachineManagementClient.availabilityGroupListeners
	*	- SqlVirtualMachineManagementClient.operations
	*	- SqlVirtualMachineManagementClient.sqlVirtualMachineGroups
	*	- SqlVirtualMachineManagementClient.sqlVirtualMachines
	*	- StorageManagementClient.blobServices
	*	- StorageManagementClient.blobContainers
	*	- StorageManagementClient.fileServices
	*	- StorageManagementClient.fileShares
	*	- StorageManagementClient.queueServices
	*	- StorageManagementClient.queue
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
	*	- StorageManagementClient.tableServices
	*	- StorageManagementClient.tableOperations
	*	- StorageManagementClient.networkSecurityPerimeterConfigurations
	*	- StorageManagementClient.storageTaskAssignments
	*	- StorageManagementClient.storageTaskAssignmentsInstancesReport
	*	- StorageManagementClient.storageTaskAssignmentInstancesReport
	*	- StorageCacheManagementClient.amlFilesystems
	*	- StorageCacheManagementClient.importJobs
	*	- StorageCacheManagementClient.operations
	*	- StorageCacheManagementClient.skus
	*	- StorageCacheManagementClient.usageModels
	*	- StorageCacheManagementClient.ascOperations
	*	- StorageCacheManagementClient.ascUsages
	*	- StorageCacheManagementClient.caches
	*	- StorageCacheManagementClient.storageTargets
	*	- StorageCacheManagementClient.storageTargetOperations
	*	- StreamAnalyticsManagementClient.operations
	*	- StreamAnalyticsManagementClient.streamingJobs
	*	- StreamAnalyticsManagementClient.inputs
	*	- StreamAnalyticsManagementClient.outputs
	*	- StreamAnalyticsManagementClient.transformations
	*	- StreamAnalyticsManagementClient.functions
	*	- StreamAnalyticsManagementClient.subscriptions
	*	- StreamAnalyticsManagementClient.clusters
	*	- StreamAnalyticsManagementClient.privateEndpoints
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
	*	- TemplateSpecsClient.templateSpecs
	*	- TemplateSpecsClient.templateSpecVersions
	*	- TimeSeriesInsightsClient.operations
	*	- TimeSeriesInsightsClient.environments
	*	- TimeSeriesInsightsClient.eventSources
	*	- TimeSeriesInsightsClient.referenceDataSets
	*	- TimeSeriesInsightsClient.accessPolicies
	*	- TrafficManagerManagementClient.endpoints
	*	- TrafficManagerManagementClient.profiles
	*	- TrafficManagerManagementClient.geographicHierarchies
	*	- TrafficManagerManagementClient.heatMap
	*	- TrafficManagerManagementClient.trafficManagerUserMetricsKeys
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
	*	- VisualStudioResourceProviderClient.acceptLanguage
	*	- VisualStudioResourceProviderClient.longRunningOperationRetryTimeout
	*	- VisualStudioResourceProviderClient.baseUri
	*	- VisualStudioResourceProviderClient.requestContentType
	*	- VisualStudioResourceProviderClient.credentials
	*	- VisualStudioResourceProviderClient.operations
	*	- VisualStudioResourceProviderClient.accounts
	*	- VisualStudioResourceProviderClient.extensions
	*	- VisualStudioResourceProviderClient.projects
	*	- WebPubSubManagementClient.operations
	*	- WebPubSubManagementClient.webPubSub
	*	- WebPubSubManagementClient.usages
	*	- WebPubSubManagementClient.webPubSubCustomCertificates
	*	- WebPubSubManagementClient.webPubSubCustomDomains
	*	- WebPubSubManagementClient.webPubSubHubs
	*	- WebPubSubManagementClient.webPubSubPrivateEndpointConnections
	*	- WebPubSubManagementClient.webPubSubPrivateLinkResources
	*	- WebPubSubManagementClient.webPubSubReplicas
	*	- WebPubSubManagementClient.webPubSubReplicaSharedPrivateLinkResources
	*	- WebPubSubManagementClient.webPubSubSharedPrivateLinkResources
	*	- AzureMLWebServicesManagementClient.operations
	*	- AzureMLWebServicesManagementClient.webServices
	*	- MachineLearningWorkspacesManagementClient.operations
	*	- MachineLearningWorkspacesManagementClient.workspaces
	*	- KexaAzure.vm
	*	- KexaAzure.mlWorkspaces
	*	- KexaAzure.mlJobs
	*	- KexaAzure.mlComputes
	*	- KexaAzure.mlSchedules
	*	- KexaAzure.storage
	*	- KexaAzure.blob
	*	- KexaAzure.secrets
	*	- KexaAzure.KeyvaultKeys
	*	- KexaAzure.vaults
	*	- KexaAzure.blobServices
	*	- KexaAzure.appConfiguration
	*	- KexaAzure.monitor
	*	- KexaAzure.blobProperties
	*	- KexaAzure.defender
	*	- KexaAzure.security
	*	- KexaAzure.authorization
	*	- KexaAzure.sqlServers
	*	- KexaAzure.sqlDatabases
	*	- KexaAzure.postgresServers
	*	- KexaAzure.policies
	*	- KexaAzure.notifications
	*	- KexaAzure.users
	*	- KexaAzure.conditionnalAccess
	*	- KexaAzure.namedLocations
	*	- KexaAzure.groups
	*	- KexaAzure.servicePrincipals
	*	- KexaAzure.applications
	*	- KexaAzure.domains
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////
//// RETRIEVING ALL IMPORTS & CLIENTS
////////////////////////////////////////////////////////////////////////////////////////////////////////


import {ComputeManagementClient, VirtualMachine} from "@azure/arm-compute";
import { KeyVaultManagementClient  } from "@azure/arm-keyvault";
import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { PolicyClient } from "@azure/arm-policy";
import { PolicyInsightsClient } from "@azure/arm-policyinsights";	
import { SecurityInsights } from "@azure/arm-securityinsight";
import {SqlManagementClient } from "@azure/arm-sql";
import {NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import * as AzureImports from "./imports/azurePackage.import";
import { Client} from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";


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

import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import { MonitorClient } from "@azure/arm-monitor";
import {StorageAccount, StorageManagementClient, AccountSasParameters} from "@azure/arm-storage";
import { BlobClient, BlobServiceClient } from "@azure/storage-blob";
import { AppConfigurationClient } from "@azure/app-configuration";
import {PostgreSQLManagementClient} from "@azure/arm-postgresql";
import {AuthorizationManagementClient} from "@azure/arm-authorization";
import { SecurityCenter } from "@azure/arm-security";

const clientConstructors: Record<string, any> = {
    ResourceManagementClient,
};
Object.assign(clientConstructors, allClients);


import { DefaultAzureCredential } from "@azure/identity";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { AzureConfig } from "../../models/azure/config.models";
import axios from "axios";

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("AzureLogger");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function collectData(azureConfig:AzureConfig[]): Promise<Object[]|null>{

    let context = getContext();
    let resources = new Array<Object>();
    for(let config of azureConfig??[]){
        logger.debug("config: ");
        logger.debug(jsonStringify(config, 4));
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
                
				const [ autoFlatResources, dataComplementaryFlat ] = await Promise.all([
					collectAuto(credential, subscriptionId, config),
					collectKexaRestructuredData(credential, subscriptionId, config)
				]);
				let finalResources = {...autoFlatResources, ...dataComplementaryFlat};
				Object.keys(finalResources).forEach(key => {
					if (finalResources[key] === undefined) {
						finalResources[key] = [{}];
					}
				  });
                resources.push(finalResources);
            }
        } catch(e) {
            logger.error("error in collectAzureData with the subscription ID: " + (await getConfigOrEnvVar(config, "SUBSCRIPTIONID", prefix))??null);
            logger.error(e);
        }	
    }
	return resources??null;
}

async function collectAuto(credential: any, subscriptionId: any, config: AzureConfig){
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
	const autoFlatResources: { [key: string]: any } = {};
	Object.keys(azureRet).forEach(parentKey => {
		azureRet[parentKey].forEach((childObj: any) => {
			Object.keys(childObj).forEach(childKey => {
				const newKey = parentKey + '.' + childKey;
				autoFlatResources[newKey as string] = childObj[childKey];
			});
		});
	});
	return autoFlatResources;
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
    logger.debug("Automatic gathering...");
    const properties = Object.getOwnPropertyNames(client);
    const resultList: Record<string, any> = {};

    const promises = properties.map(async (element) => {
		const toCheck = client.constructor.name + '.' + element;
		if(!currentConfig.ObjectNameNeed?.includes(toCheck)) return Promise.resolve();
        type StatusKey = keyof typeof client;
        let key: StatusKey = element;
        if (element.startsWith("_")) return Promise.resolve();
		if (client[key]) {
			const methods = ["listAll", "list"];

            await Promise.all(
                methods.map(async (method) => {
                    const resource = client[key];
                    if (typeof resource === 'object' && typeof resource[method as keyof typeof resource] === 'function') {
                        const gotMethod = resource[method as keyof typeof resource] as (...args: any[]) => any[];
                        const numberOfArgs = gotMethod.length;
                        if (numberOfArgs > 2) {
                            logger.debug(`Function ${key as string}.${method} requires ${numberOfArgs} arguments.`);
                            return Promise.resolve();
                        }
                        const keyStr = key as string;
                        const toExec = "resourcesClient." + (key as string) + "." + method + "()";
                        logger.debug("To exec: " + toExec);
                        let resultObject: any[] = [];
                        try {
							const resourceMethodResult = await resource[method]();
    
							for await (let item of resourceMethodResult) {
								item = addingResourceGroups(item);
								resultObject.push(item);
							}
							if(!resultList[keyStr]){
								resultList[keyStr] = resultObject;
							}else{
								resultList[keyStr].push(...resultObject);
							}
                        } catch (e) {
                            logger.debug("Error on function :", e);
                        }
                    } else {
                        logger.debug(`Invalid property ${key as string} or function call ${method}.`);
                    }
					return Promise.resolve();
                })
            );

        }
		return Promise.resolve();
    });
    await Promise.all(promises);
    return resultList;
}

function addingResourceGroups(item: any): any {
	if(item.id){
		let rg = item.id?.split("/")[4] ?? "";
		item.resourceGroupName = rg;
	}
	return item;
}
/* ************************************ */
/*  	CUSTOM GATHER RESOURCES         */
/* ************************************ */

import {stringKeys} from "../../models/azure/resource.models";

interface FunctionMap {
    [key: string]: (name: string, credential: any, subscriptionId: any) => void;
}

const customGatherFunctions: FunctionMap = {

    'KexaAzure.vm': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");
		try {
			const computeClient = new ComputeManagementClient(credential, subscriptionId);
			const monitorClient = new MonitorClient(credential, subscriptionId);
			return await virtualMachinesListing(computeClient, monitorClient);
		} catch (e) {
			logger.debug("Error creating Azure client: ", e);
			return [];
		}
    },

    'KexaAzure.mlWorkspaces': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");


		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			return await workspacesListing(mlClient)
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
    },

	'KexaAzure.mlJobs': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");


		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			let workspaces = await workspacesListing(mlClient);
            return await jobsListing(mlClient, workspaces);
		} catch (e) {
			logger.warn("Error creating Azure client: " + name, e);
			return [];
		}
    },

	'KexaAzure.mlComputes': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");


		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			let workspaces = await workspacesListing(mlClient);
            return await computeOperationsListing(mlClient, workspaces);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
    },

	'KexaAzure.mlSchedules': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");

		try {
			const mlClient = new AzureMachineLearningWorkspaces(credential, subscriptionId);
			let workspaces = await workspacesListing(mlClient);
            return await schedulesListing(mlClient, workspaces);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
    },

	'KexaAzure.storage': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");

		try {
			const storageClient = new StorageManagementClient(credential, subscriptionId);
			return await storageListing(storageClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
		return [];
    },

	'KexaAzure.blob': (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");
		//listAllBlob();
		return [];
    },

	
	'KexaAzure.secrets': async (name: string, credential: any, subscriptionId: any) => {
        logger.debug("Starting " + name + " listing...");
		try {
			const vaultClient = new KeyVaultManagementClient(credential, subscriptionId);
            return await keyvaultSecretsListing(vaultClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
    },

	'KexaAzure.KeyvaultKeys': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const vaultClient = new KeyVaultManagementClient(credential, subscriptionId);
            return await keyvaultKeysListing(vaultClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.vaults': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const vaultClient = new KeyVaultManagementClient(credential, subscriptionId);
            return await keyvaultListing(vaultClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.blobServices': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const storageClient = new StorageManagementClient(credential, subscriptionId);
            return await blobServicesListing(storageClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.appConfiguration': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const appClient = new ApplicationInsightsManagementClient(credential, subscriptionId);
			return await appConfigurationListing(appClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.monitor': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const monitorClient = new MonitorClient(credential, subscriptionId);
			const resourceClient = new ResourceManagementClient(credential, subscriptionId);
			return await monitorListing(monitorClient, resourceClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.blobProperties': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const blobClient = new BlobServiceClient(credential, subscriptionId);
			return await blobPropertiesListing(blobClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.security': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const securityClient = new SecurityCenter(credential, subscriptionId);
			return await securityListing(securityClient, subscriptionId);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.authorization': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authorizationClient = new AuthorizationManagementClient(credential, subscriptionId);
			return await authorizationListing(authorizationClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.sqlServers': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const monitorClient = new MonitorClient(credential, subscriptionId);
			const sqlClient = new SqlManagementClient(credential, subscriptionId);
			return await sqlServersListing(sqlClient, monitorClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.sqlDatabases': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const sqlClient = new SqlManagementClient(credential, subscriptionId);
			return await sqlDatabasesListing(sqlClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.postgresServers': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const postgresClient = new PostgreSQLManagementClient(credential, subscriptionId);
			return await postgresServersListing(postgresClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},
	
	'KexaAzure.policies': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			return await policiesListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.notifications': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const monitorClient = new NotificationHubsManagementClient(credential, subscriptionId);
			return await notificationsListing(monitorClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.users': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await testGraphListing(graphClient, subscriptionId);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.conditionnalAccess': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await conditionnalAccessListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.namedLocations': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await namedLocationsListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.groups': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await groupsListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.servicePrincipals': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await servicePrincipalsListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.applications': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await applicationsListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	},

	'KexaAzure.domains': async (name: string, credential: any, subscriptionId: any) => {
		logger.debug("Starting " + name + " listing...");
		try {
			const authProvider = new TokenCredentialAuthenticationProvider(credential, {
				scopes: [
					'https://graph.microsoft.com/.default'
				],
			  });
			const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
			
			return await domainsListing(graphClient);
		} catch (e) {
			logger.debug("Error creating Azure client: " + name, e);
			return [];
		}
	}
};


async function collectKexaRestructuredData(credential: any, subscriptionId: any, currentConfig: any): Promise<any> {
	let result = await Promise.all(stringKeys.map(async (element: any) => {
		if(!currentConfig.ObjectNameNeed?.includes(element)) return {};
		return { [element] : await customGatherFunctions[element](element, credential, subscriptionId)};
	}));
	return result.reduce((final, objet) => {
		return { ...final, ...objet };
	}, {});
}

export async function virtualMachinesListing(client:ComputeManagementClient, monitor:MonitorClient): Promise<Array<VirtualMachine>> {
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
        return resultList ?? [];
    }catch (err) {
        logger.debug("error in virtualMachinesListing:"+err);
        return [];
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
async function listAllBlob(client:StorageManagementClient, credentials: any): Promise<Array<StorageAccount>> {
    logger.info("starting listAllBlob");
    try {
        const resultList = new Array<ResourceGroup>;
        for await (let item of client.storageAccounts.list()){
            resultList.push(item);
            const blobServiceClient = new BlobServiceClient(
                `https://${item.name}.blob.core.windows.net`,
                credentials
            );
            for await (const container of blobServiceClient.listContainers()) {
                for await (const blob of blobServiceClient.getContainerClient(container.name).listBlobsFlat()) {
                    // Process each blob as needed
                }
            }
        }
        return resultList ?? [];
    } catch (err) {
        logger.debug("error in resourceGroupListing:"+err);
        return [];
    }
}


import {MachineLearningWorkspacesManagementClient } from "@azure/arm-workspaces";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";

import { convertMinMaxMeanMedianToPercentage } from "../../helpers/statsNumbers";
import { jsonStringify } from "../../helpers/jsonStringify";

async function workspacesListing(mlClient: MachineLearningWorkspacesManagementClient): Promise<any> {
	let workspacesResult: any[] = [];
	for await (let item of mlClient.workspaces.list()) {
		workspacesResult = [...workspacesResult??[], item];
	}
	return workspacesResult ?? [];
}

async function jobsListing(client: AzureMachineLearningServicesManagementClient, workspaces: Array<any>): Promise<any> {
	for (let i = 0; i < workspaces?.length; i++) {
		try {
			let resourceGroupName = workspaces[i]?.id?.split("/")[4] ?? "";
			let workspaceName = workspaces[i]?.name ?? "";
			const resArray = new Array();
			try {
				for await (let item of client.jobs.list(resourceGroupName, workspaceName)) {
					let result:any = item;
					result.workspace = workspaceName;
					result.resourceGroupName = resourceGroupName;
					resArray.push(result);
				}
				return resArray;	
			} catch(e) {
				logger.debug("error in jobsListing:"+e);
				return [];
			}
		} catch(e){
			logger.debug("error in jobsListing:"+e);
			return [];
		}
	}
}

async function computeOperationsListing(client: AzureMachineLearningServicesManagementClient, workspaces: Array<any>): Promise<any> {
	for (let i = 0; i < workspaces?.length; i++) {
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
			return resArray ?? [];
		}catch(e){
			logger.debug("error in computeOperationsListing:"+e);
			return [];
		}
	}
}

async function schedulesListing(client: AzureMachineLearningServicesManagementClient, workspaces: Array<any>): Promise<any> {
	for (let i = 0; i < workspaces?.length; i++) {
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
			return resArray ?? [];
		} catch(e){
			logger.debug("error in schedulesListing:"+e);
			return [];
		}
	}
}

async function keyvaultSecretsListing(client: KeyVaultManagementClient): Promise<any> {
	let secretsRes:any = [];
	for await (let item of client.vaults.list()) {
		item = addingResourceGroups(item);
		let result:any = item;
		try {
			for await (let secretItem of client.secrets.list(result.resourceGroupName, result.name)) {
				secretsRes.push(secretItem);
			}
		} catch (e) {
			logger.debug("Failed to retrieve vault keys informations", e);
		}
		
	}
	return secretsRes;
}

async function keyvaultKeysListing(client: KeyVaultManagementClient): Promise<any> {
	let keysRes:any = [];
	for await (let item of client.vaults.list()) {
		item = addingResourceGroups(item);
		let result:any = item;
		try {
			for await (let keyItem of client.keys.list(result.resourceGroupName, result.name)) {
				keysRes.push(keyItem);
			}
		} catch (e) {
			logger.debug("Failed to retrieve vault keys informations", e);
		}
	}
	return keysRes;
}

async function keyvaultListing(client: KeyVaultManagementClient): Promise<any> {
	let resultVault:any = [];
	for await (let item of client.vaults.list()) {
		item = addingResourceGroups(item);
		let result:any = item;
		try {
			const res = await client.vaults.get(result.resourceGroupName, result.name);
			let vault:any = res;
			vault.keys = [];
			try {
				for await (let keyItem of client.keys.list(result.resourceGroupName, result.name)) {
					vault.keys.push(keyItem);
				}
			} catch (e: any) {
				if (e?.statusCode === 403 || e?.code === 'Forbidden' || e?.code === 'AuthorizationFailed') {
					vault.keys = null;
				}
				logger.debug("Failed to retrieve vault keys", e);
			}
			vault.secrets = [];
			try {
				for await (let secretItem of client.secrets.list(result.resourceGroupName, result.name)) {
					vault.secrets.push(secretItem);
				}
			} catch (e: any) {
				if (e?.statusCode === 403 || e?.code === 'Forbidden' || e?.code === 'AuthorizationFailed') {
					vault.secrets = null;
				}
				logger.debug("Failed to retrieve vault secrets", e);
			}
			resultVault.push(vault);
		} catch (e) {
			logger.debug("Failed to retrieve vault informations", e);
		}
	}
	return resultVault;
}

async function blobServicesListing(client: StorageManagementClient): Promise<any> {
	let resultStorage:any = [];
	for await (let item of client.storageAccounts.list()) {
		item = addingResourceGroups(item);
		let result:any = item;
		try {
			for await (let blobService of client.blobServices.list(result.resourceGroupName, result.name)) {
				resultStorage.push(blobService);
			}
		} catch (e) {
			logger.debug("Failed to retrieve storage informations", e);
		}
	}
	return resultStorage;
}

async function appConfigurationListing(client: ApplicationInsightsManagementClient):	Promise<any> {
	let resultGraph:any = [];
	try {
		const components = await client.components.list();
		try {
			for (let item of components) {
				item = addingResourceGroups(item);
				let result:any = item;
				const final = await client.componentLinkedStorageAccounts.get(result.resourceGroupName, result.name);
		
				resultGraph.push(final);
			}
		} catch (e) {
			logger.debug("Error on app insights infos listing", e);
		}
	} catch (e) {
		logger.debug("Error on graph services listing:", e);
	}
}

async function monitorListing(client: MonitorClient, resClient: ResourceManagementClient): Promise<any> {
	let resultMonitor:any = [];
	const resources = await resClient.resources.list();
	for await (let item of resources) {
		try {
			item = addingResourceGroups(item);
			let oneResult = { resource: item, diagnosticSettings: [] as any, diagnosticSettingsCategory: [] as any};
			const resourceUri = item?.id as string;
			if (!resourceUri) continue;
			const diagnosticSettings = await client.diagnosticSettings.list(resourceUri);
			if (!diagnosticSettings?.value) continue;
			oneResult.diagnosticSettings = diagnosticSettings?.value as any[];
			try {
			const cat = await client.diagnosticSettingsCategory.list(resourceUri);
			oneResult.diagnosticSettingsCategory = cat.value;
			} catch (e) {
				logger.debug("Failed to retrieve monitor informations", e);
			}
			resultMonitor.push(oneResult);
		} catch (e) {
			logger.debug("Failed to retrieve monitor informations", e);
		}
	}
	return resultMonitor;
}

async function blobPropertiesListing(client: BlobServiceClient): Promise<any> {
	let resultMonitor:any = [];
	const properties = await client.getProperties();
	return resultMonitor;
}

async function storageListing(client: StorageManagementClient): Promise<any> {
	let resultStorage:any = [];
	for await (let item of client.storageAccounts.list()) {
		item = addingResourceGroups(item);
		let result:any = item;
		try {
			const properties = await client.storageAccounts.getProperties(result.resourceGroupName, result.name);
		} catch (e) {
			logger.debug("Failed to retrieve storage informations", e);
		}
		try {
			const accountSAS = await client.storageAccounts.listKeys(result.resourceGroupName, result.name);
		} catch (e) {
			logger.debug("Failed to retrieve storage informations", e);
		}
		try {
			const polciies = await client.managementPolicies.get(result.resourceGroupName, result.name, "default");
		} catch (e) {
			logger.debug("Failed to retrieve storage informations", e);
		}
		resultStorage.push(item);
	}
	return resultStorage;
}

async function securityListing(client: SecurityCenter, subscriptionId: any): Promise<any> {
	let resultSecurity:any = [];
	try {
		for await (let item of client.settings.list()) {
			item = addingResourceGroups(item);
			let result:any = item;
			resultSecurity.push(result);
		}
	
	} catch (e) {
		logger.debug("Failed to retrieve security informations", e);
	}
	return resultSecurity;
}

async function authorizationListing(client: AuthorizationManagementClient): Promise<any> {
	let resultsAuthorization:any = [];
	try {
		for await (let item of client.roleAssignments.listForSubscription()) {
			item = addingResourceGroups(item);
			let result:any = item;
			try {
				const definition = await client.roleDefinitions.get(result.scope, result.roleDefinitionId);
			} catch (e) {
				logger.debug("Failed to retrieve security informations", e);
			}
	
			resultsAuthorization.push(result);
		}
	
	} catch (e) {
		logger.debug("Failed to retrieve security informations", e);
	}
	return resultsAuthorization;
}

async function sqlServersListing(client: SqlManagementClient, monitorClient: MonitorClient): Promise<any> {
	let resultsSql:any = [];

	try {
		for await (let result of client.servers.list()) {
			result = addingResourceGroups(result);
			let server:any = result;
			try {
				server.firewallRules = [];
				for await (let firewallRule of client.firewallRules.listByServer(server.resourceGroupName, server.name)) {
					server.firewallRules.push(firewallRule);
				}
				server.blobAuditingPolicies = [];
				for await (let blobAuditingPolicy of client.serverBlobAuditingPolicies.listByServer(server.resourceGroupName, server.name)) {
					server.blobAuditingPolicies.push(blobAuditingPolicy);
				}
				server.managedInstances = [];
				for await (let managedInstance of client.managedInstances.list()) {
						server.managedInstances.push(managedInstance);
				}
				server.encryptionProtectors = [];
				for await (let encryptionProtector of client.encryptionProtectors.listByServer(server.resourceGroupName, server.name)) {
						server.encryptionProtectors.push(encryptionProtector);
				}
				server.serverDevOpsAuditSettings = [];
				try {
					for await (let serverDevOpsAuditSetting of client.serverDevOpsAuditSettings.listByServer(server.resourceGroupName, server.name)) {
						server.serverDevOpsAuditSettings.push(serverDevOpsAuditSetting);
					}
				} catch (e) {
					logger.debug("Failed to retrieve security informations", e);
				}


				server.serverKeys = [];
				for await (let serverKey of client.serverKeys.listByServer(server.resourceGroupName, server.name)) {
						server.serverKeys.push(serverKey);
				}

				// serverKeys

			} catch (e) {
				logger.debug("Failed to retrieve security informations", e);
			}
			resultsSql.push(server);
		}
	} catch (e) {
		logger.debug("Failed to retrieve security informations", e);
	}
	return resultsSql;
}

async function sqlDatabasesListing(client: SqlManagementClient): Promise<any> {
	let resultsDatabases:any = [];

	try {
		for await (let result of client.servers.list()) {
			result = addingResourceGroups(result);
			let server:any = result;
			try {
				let databasesServer = [];
				for await (let db of client.databases.listByServer(server.resourceGroupName, server.name)) {
					let database:any = db;
					database.resourceGroupName = server.resourceGroupName;
					database.transparentDataEncryptions = [];
					database.blobAuditingPolicies = [];
					database.backupShortTermRetentionPolicies = [];
					if (database.name) {
						for await (let tde of client.transparentDataEncryptions.listByDatabase(server.resourceGroupName, server.name, database.name)) {
							database.transparentDataEncryptions.push(tde);
						}
						for await (let blobAuditingPolicy of client.databaseBlobAuditingPolicies.listByDatabase(server.resourceGroupName, server.name, database.name)) {
							database.blobAuditingPolicies.push(blobAuditingPolicy);
						}
						for await (let backupShortTermRetentionPolicy of client.backupShortTermRetentionPolicies.listByDatabase(server.resourceGroupName, server.name, database.name)) {
							database.backupShortTermRetentionPolicies.push(backupShortTermRetentionPolicy);
						}
					}
					databasesServer.push(database);
				}
				resultsDatabases = [...resultsDatabases, ...databasesServer];
			} catch (e) {
				logger.debug("Failed to retrieve databases", e);
			}
		}
	} catch (e) {
		logger.debug("Failed to retrieve sql databases", e);
	}
	return resultsDatabases;
}

async function postgresServersListing(client: PostgreSQLManagementClient): Promise<any> {
	let resultsPostgres:any = [];

	try {
		for await (let result of client.servers.list()) {
			//result = addingResourceGroups(result);
			let server:any = result;
			
			try {
				/*server.firewallRules = [];
				for await (let firewallRule of client.firewallRules.listByServer(server.resourceGroupName, server.name)) {
					server.firewallRules.push(firewallRule);
				}*/
			} catch (e) {
				logger.debug("Failed to retrieve security informations", e);
			}
			resultsPostgres.push(server);
		}
	} catch (e) {
		logger.debug("Failed to retrieve security informations", e);
	}
	return resultsPostgres;
}

async function policiesListing(client: Client): Promise<any> {
	let resultsPolicies:any = [];

	resultsPolicies.id = "Global Policies";
	try {
		const res = await client.api('/policies/identitySecurityDefaultsEnforcementPolicy').get();
		resultsPolicies.identitySecurityDefaultsEnforcementPolicy = res;
	} catch (error) {
		logger.debug("error:",error);
	}
	try {
		const res = await client.api('/policies/authorizationPolicy').get();
		resultsPolicies.authorizationPolicy = res;
	} catch (error) {
		logger.debug("error:",error);
	}
	try {
		const res = await client.api('/policies/authenticationMethodsPolicy').get();
		resultsPolicies.authenticationMethodsPolicy = res;
	} catch (error) {
		logger.debug("error:",error);
	}
	
	try {
		const res = await client.api('/policies/adminConsentRequestPolicy').get();
		resultsPolicies.adminConsentRequestPolicy = res;
	} catch (error) {
		logger.debug("error:",error);
	}

	try {
		const res = await client.api('/beta/policies/externalIdentitiesPolicy').get();
		resultsPolicies.externalIdentitiesPolicy = res;
	} catch (error) {
		logger.debug("error:",error);
	}

	return [resultsPolicies];
}

async function notificationsListing(client: NotificationHubsManagementClient): Promise<any> {
	let resultsNotifications:any = [];

	try {
		for await (let namespace of client.namespaces.listAll()) {
			namespace = addingResourceGroups(namespace);
			let result:any = namespace;
			if (namespace.name) {
				for await (let hub of client.notificationHubs.list(result.resourceGroupName, namespace.name)) {
					if (hub.name) {
					
					}
				}
			}
		}
	} catch (e) {
		logger.debug("Failed to retrieve security informations", e);
	}
	return resultsNotifications;
}


async function conditionnalAccessListing(client: Client): Promise<any> {
	let resultsGraph:any = [];
	resultsGraph.id = "Conditional Access";
	try {
		const res = await client.api('/identity/conditionalAccess/policies').get();
		resultsGraph = res.value;
	} catch (error) {
		logger.debug("error:",error);
	}

	return resultsGraph;
}

async function namedLocationsListing(client: Client): Promise<any> {
	let resultsGraph:any = {};
	try {
		const res = await client.api('/identity/conditionalAccess/namedLocations').get();
		resultsGraph = res.value;
		resultsGraph.forEach(async (item:any) => {
			item.dataType = item['@odata.type'];
		});
	} catch (error) {
		logger.debug("error:",error);
	}
	return resultsGraph;
}

async function groupsListing(client: Client): Promise<any> {
	let groups:any = [];
	try {
		const res = await client.api('/groups').get();
		groups = res.value;
		groups.forEach(async (group:any) => {
			try {
				//const res2 = await client.api(`/groups/${group.id}/settings`).get();
			//	groups/{group-id}/permissionGrants
				const res2 = await client.api(`/groups/${group.id}/groupLifecyclePolicies`).get();

				group.settings = res2;
			} catch (error) {
				logger.debug("error:",error);
			}
		});
	} catch (error) {
		logger.debug("error:",error);
	}
7
	const directorySettingId = "directorySetting_1";
	
	try {
		const res = await client.api('/groupSettingTemplates').get();


	} catch (error) {
		logger.debug("error:",error);
	}

	return groups;
}

async function testGraphListing(client: Client, subscriptionId: any): Promise<any> {
	
	let usersReponse:any = [];
	try {
		usersReponse = await client.api("/users")
		.select("id,userPrincipalName,mail,userType,customSecurityAttributes,lastPasswordChangeDateTime,passwordPolicies,passwordProfile,signInActivity")
		.get();
	} catch (error) {
	  logger.error("Error retrieving users:", error);
	}

	const userPromise = usersReponse.value.map( async (userItem: any) => {
		let user:any = userItem;
		try {
			const res = await client.api(`/users/${user.id}/authentication/methods`).get();
			user.authMethods = res.value;
		} catch (error) {
			logger.debug("error:",error);
		}
		try {
			const res = await client.api(`/users/${user.id}/authentication/microsoftAuthenticatorMethods`).get();
			user.microsoftAuthenticatorMethods = res.value;
		} catch (error) {
			logger.debug("error:",error);
		}
		try {
			const res = await client.api(`/users/${user.id}/settings`).get();
			user.settings = res;
		} catch (error) {
			logger.debug("error:",error);
		}
		return user;
	});

	const processedUsers = await Promise.all(userPromise);

	return processedUsers;
  }

  async function servicePrincipalsListing(client: Client): Promise<any> {
	let resultsGraph:any = [];

	try {
		const tmp = await client.api('/servicePrincipals').get();
		resultsGraph = tmp.value;
	} catch (error) {
		logger.debug("error:",error);
	}
	return resultsGraph;
  }

  async function applicationsListing(client: Client): Promise<any> {
	let resultsGraph:any = [];

	try {
		const tmp = await client.api(`/applications`).get();
		resultsGraph = tmp.value;
	} catch (error) {
		logger.debug("error:",error);
	}
	return resultsGraph;
  }

  async function domainsListing(client: Client): Promise<any> {
	let resultsGraph:any = [];
	try {
		const tmp = await client.api('/domains').get();
		resultsGraph = tmp.value;
	} catch (error) {
		logger.debug("error:",error);
	}
	return resultsGraph;
}