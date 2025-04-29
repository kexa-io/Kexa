/*
    * Provider : aws
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png
    * Documentation : https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
	*	- AccessAnalyzerClient.AccessPreview
	*	- AccessAnalyzerClient.AnalyzedResource
	*	- AccessAnalyzerClient.Analyzer
	*	- AccessAnalyzerClient.ArchiveRule
	*	- AccessAnalyzerClient.Finding
	*	- AccessAnalyzerClient.FindingRecommendation
	*	- AccessAnalyzerClient.FindingV2
	*	- AccessAnalyzerClient.FindingsStatistics
	*	- AccessAnalyzerClient.GeneratedPolicy
	*	- AccessAnalyzerClient.AccessPreviewFindings
	*	- AccessAnalyzerClient.AccessPreviews
	*	- AccessAnalyzerClient.AnalyzedResources
	*	- AccessAnalyzerClient.Analyzers
	*	- AccessAnalyzerClient.ArchiveRules
	*	- AccessAnalyzerClient.Findings
	*	- AccessAnalyzerClient.FindingsV2
	*	- AccessAnalyzerClient.PolicyGenerations
	*	- AccessAnalyzerClient.TagsForResource
	*	- AccountClient.AlternateContact
	*	- AccountClient.ContactInformation
	*	- AccountClient.PrimaryEmail
	*	- AccountClient.RegionOptStatus
	*	- AccountClient.Regions
	*	- ACMClient.Certificate
	*	- ACMClient.AccountConfiguration
	*	- ACMClient.Certificate
	*	- ACMClient.Certificates
	*	- ACMClient.TagsForCertificate
	*	- ACMPCAClient.CertificateAuthorityAuditReport
	*	- ACMPCAClient.CertificateAuthority
	*	- ACMPCAClient.CertificateAuthorityCertificate
	*	- ACMPCAClient.CertificateAuthorityCsr
	*	- ACMPCAClient.Certificate
	*	- ACMPCAClient.Policy
	*	- ACMPCAClient.CertificateAuthorities
	*	- ACMPCAClient.Permissions
	*	- ACMPCAClient.Tags
	*	- AlexaForBusinessClient.AddressBook
	*	- AlexaForBusinessClient.ConferencePreference
	*	- AlexaForBusinessClient.ConferenceProvider
	*	- AlexaForBusinessClient.Contact
	*	- AlexaForBusinessClient.Device
	*	- AlexaForBusinessClient.Gateway
	*	- AlexaForBusinessClient.GatewayGroup
	*	- AlexaForBusinessClient.InvitationConfiguration
	*	- AlexaForBusinessClient.NetworkProfile
	*	- AlexaForBusinessClient.Profile
	*	- AlexaForBusinessClient.Room
	*	- AlexaForBusinessClient.RoomSkillParameter
	*	- AlexaForBusinessClient.SkillGroup
	*	- AlexaForBusinessClient.BusinessReportSchedules
	*	- AlexaForBusinessClient.ConferenceProviders
	*	- AlexaForBusinessClient.DeviceEvents
	*	- AlexaForBusinessClient.GatewayGroups
	*	- AlexaForBusinessClient.Gateways
	*	- AlexaForBusinessClient.Skills
	*	- AlexaForBusinessClient.SkillsStoreCategories
	*	- AlexaForBusinessClient.SkillsStoreSkillsByCategory
	*	- AlexaForBusinessClient.SmartHomeAppliances
	*	- AlexaForBusinessClient.Tags
	*	- AmpClient.AlertManagerDefinition
	*	- AmpClient.LoggingConfiguration
	*	- AmpClient.RuleGroupsNamespace
	*	- AmpClient.Scraper
	*	- AmpClient.Workspace
	*	- AmpClient.DefaultScraperConfiguration
	*	- AmpClient.RuleGroupsNamespaces
	*	- AmpClient.Scrapers
	*	- AmpClient.TagsForResource
	*	- AmpClient.Workspaces
	*	- AmplifyClient.App
	*	- AmplifyClient.ArtifactUrl
	*	- AmplifyClient.BackendEnvironment
	*	- AmplifyClient.Branch
	*	- AmplifyClient.DomainAssociation
	*	- AmplifyClient.Job
	*	- AmplifyClient.Webhook
	*	- AmplifyClient.Apps
	*	- AmplifyClient.Artifacts
	*	- AmplifyClient.BackendEnvironments
	*	- AmplifyClient.Branches
	*	- AmplifyClient.DomainAssociations
	*	- AmplifyClient.Jobs
	*	- AmplifyClient.TagsForResource
	*	- AmplifyClient.Webhooks
	*	- AmplifyBackendClient.BackendAPI
	*	- AmplifyBackendClient.BackendAPIModels
	*	- AmplifyBackendClient.BackendAuth
	*	- AmplifyBackendClient.Backend
	*	- AmplifyBackendClient.BackendJob
	*	- AmplifyBackendClient.BackendStorage
	*	- AmplifyBackendClient.Token
	*	- AmplifyBackendClient.BackendJobs
	*	- AmplifyBackendClient.S3Buckets
	*	- AmplifyUIBuilderClient.CodegenJob
	*	- AmplifyUIBuilderClient.Component
	*	- AmplifyUIBuilderClient.Form
	*	- AmplifyUIBuilderClient.Metadata
	*	- AmplifyUIBuilderClient.Theme
	*	- AmplifyUIBuilderClient.CodegenJobs
	*	- AmplifyUIBuilderClient.Components
	*	- AmplifyUIBuilderClient.Forms
	*	- AmplifyUIBuilderClient.TagsForResource
	*	- AmplifyUIBuilderClient.Themes
	*	- APIGatewayClient.Account
	*	- APIGatewayClient.ApiKey
	*	- APIGatewayClient.ApiKeys
	*	- APIGatewayClient.Authorizer
	*	- APIGatewayClient.Authorizers
	*	- APIGatewayClient.BasePathMapping
	*	- APIGatewayClient.BasePathMappings
	*	- APIGatewayClient.ClientCertificate
	*	- APIGatewayClient.ClientCertificates
	*	- APIGatewayClient.Deployment
	*	- APIGatewayClient.Deployments
	*	- APIGatewayClient.DocumentationPart
	*	- APIGatewayClient.DocumentationParts
	*	- APIGatewayClient.DocumentationVersion
	*	- APIGatewayClient.DocumentationVersions
	*	- APIGatewayClient.DomainNameAccessAssociations
	*	- APIGatewayClient.DomainName
	*	- APIGatewayClient.DomainNames
	*	- APIGatewayClient.Export
	*	- APIGatewayClient.GatewayResponse
	*	- APIGatewayClient.GatewayResponses
	*	- APIGatewayClient.Integration
	*	- APIGatewayClient.IntegrationResponse
	*	- APIGatewayClient.Method
	*	- APIGatewayClient.MethodResponse
	*	- APIGatewayClient.Model
	*	- APIGatewayClient.ModelTemplate
	*	- APIGatewayClient.Models
	*	- APIGatewayClient.RequestValidator
	*	- APIGatewayClient.RequestValidators
	*	- APIGatewayClient.Resource
	*	- APIGatewayClient.Resources
	*	- APIGatewayClient.RestApi
	*	- APIGatewayClient.RestApis
	*	- APIGatewayClient.Sdk
	*	- APIGatewayClient.SdkType
	*	- APIGatewayClient.SdkTypes
	*	- APIGatewayClient.Stage
	*	- APIGatewayClient.Stages
	*	- APIGatewayClient.Tags
	*	- APIGatewayClient.Usage
	*	- APIGatewayClient.UsagePlan
	*	- APIGatewayClient.UsagePlanKey
	*	- APIGatewayClient.UsagePlanKeys
	*	- APIGatewayClient.UsagePlans
	*	- APIGatewayClient.VpcLink
	*	- APIGatewayClient.VpcLinks
	*	- ApiGatewayManagementApiClient.Connection
	*	- AppConfigClient.AccountSettings
	*	- AppConfigClient.Application
	*	- AppConfigClient.Configuration
	*	- AppConfigClient.ConfigurationProfile
	*	- AppConfigClient.Deployment
	*	- AppConfigClient.DeploymentStrategy
	*	- AppConfigClient.Environment
	*	- AppConfigClient.ExtensionAssociation
	*	- AppConfigClient.Extension
	*	- AppConfigClient.HostedConfigurationVersion
	*	- AppConfigClient.Applications
	*	- AppConfigClient.ConfigurationProfiles
	*	- AppConfigClient.DeploymentStrategies
	*	- AppConfigClient.Deployments
	*	- AppConfigClient.Environments
	*	- AppConfigClient.ExtensionAssociations
	*	- AppConfigClient.Extensions
	*	- AppConfigClient.HostedConfigurationVersions
	*	- AppConfigClient.TagsForResource
	*	- AppflowClient.Connector
	*	- AppflowClient.ConnectorEntity
	*	- AppflowClient.ConnectorProfiles
	*	- AppflowClient.Connectors
	*	- AppflowClient.Flow
	*	- AppflowClient.FlowExecutionRecords
	*	- AppflowClient.ConnectorEntities
	*	- AppflowClient.Connectors
	*	- AppflowClient.Flows
	*	- AppflowClient.TagsForResource
	*	- AppIntegrationsClient.Application
	*	- AppIntegrationsClient.DataIntegration
	*	- AppIntegrationsClient.EventIntegration
	*	- AppIntegrationsClient.ApplicationAssociations
	*	- AppIntegrationsClient.Applications
	*	- AppIntegrationsClient.DataIntegrationAssociations
	*	- AppIntegrationsClient.DataIntegrations
	*	- AppIntegrationsClient.EventIntegrationAssociations
	*	- AppIntegrationsClient.EventIntegrations
	*	- AppIntegrationsClient.TagsForResource
	*	- ApplicationAutoScalingClient.ScalableTargets
	*	- ApplicationAutoScalingClient.ScalingActivities
	*	- ApplicationAutoScalingClient.ScalingPolicies
	*	- ApplicationAutoScalingClient.ScheduledActions
	*	- ApplicationAutoScalingClient.PredictiveScalingForecast
	*	- ApplicationAutoScalingClient.TagsForResource
	*	- ApplicationCostProfilerClient.ReportDefinition
	*	- ApplicationCostProfilerClient.ReportDefinitions
	*	- ApplicationInsightsClient.Application
	*	- ApplicationInsightsClient.Component
	*	- ApplicationInsightsClient.ComponentConfiguration
	*	- ApplicationInsightsClient.ComponentConfigurationRecommendation
	*	- ApplicationInsightsClient.LogPattern
	*	- ApplicationInsightsClient.Observation
	*	- ApplicationInsightsClient.Problem
	*	- ApplicationInsightsClient.ProblemObservations
	*	- ApplicationInsightsClient.Workload
	*	- ApplicationInsightsClient.Applications
	*	- ApplicationInsightsClient.Components
	*	- ApplicationInsightsClient.ConfigurationHistory
	*	- ApplicationInsightsClient.LogPatternSets
	*	- ApplicationInsightsClient.LogPatterns
	*	- ApplicationInsightsClient.Problems
	*	- ApplicationInsightsClient.TagsForResource
	*	- ApplicationInsightsClient.Workloads
	*	- AppMeshClient.GatewayRoute
	*	- AppMeshClient.Mesh
	*	- AppMeshClient.Route
	*	- AppMeshClient.VirtualGateway
	*	- AppMeshClient.VirtualNode
	*	- AppMeshClient.VirtualRouter
	*	- AppMeshClient.VirtualService
	*	- AppMeshClient.GatewayRoutes
	*	- AppMeshClient.Meshes
	*	- AppMeshClient.Routes
	*	- AppMeshClient.TagsForResource
	*	- AppMeshClient.VirtualGateways
	*	- AppMeshClient.VirtualNodes
	*	- AppMeshClient.VirtualRouters
	*	- AppMeshClient.VirtualServices
	*	- AppRunnerClient.AutoScalingConfiguration
	*	- AppRunnerClient.CustomDomains
	*	- AppRunnerClient.ObservabilityConfiguration
	*	- AppRunnerClient.Service
	*	- AppRunnerClient.VpcConnector
	*	- AppRunnerClient.VpcIngressConnection
	*	- AppRunnerClient.AutoScalingConfigurations
	*	- AppRunnerClient.Connections
	*	- AppRunnerClient.ObservabilityConfigurations
	*	- AppRunnerClient.Operations
	*	- AppRunnerClient.Services
	*	- AppRunnerClient.ServicesForAutoScalingConfiguration
	*	- AppRunnerClient.TagsForResource
	*	- AppRunnerClient.VpcConnectors
	*	- AppRunnerClient.VpcIngressConnections
	*	- AppStreamClient.AppBlockBuilderAppBlockAssociations
	*	- AppStreamClient.AppBlockBuilders
	*	- AppStreamClient.AppBlocks
	*	- AppStreamClient.ApplicationFleetAssociations
	*	- AppStreamClient.Applications
	*	- AppStreamClient.DirectoryConfigs
	*	- AppStreamClient.Entitlements
	*	- AppStreamClient.Fleets
	*	- AppStreamClient.ImageBuilders
	*	- AppStreamClient.ImagePermissions
	*	- AppStreamClient.Images
	*	- AppStreamClient.Sessions
	*	- AppStreamClient.Stacks
	*	- AppStreamClient.ThemeForStack
	*	- AppStreamClient.UsageReportSubscriptions
	*	- AppStreamClient.UserStackAssociations
	*	- AppStreamClient.Users
	*	- AppStreamClient.AssociatedFleets
	*	- AppStreamClient.AssociatedStacks
	*	- AppStreamClient.EntitledApplications
	*	- AppStreamClient.TagsForResource
	*	- AppSyncClient.ApiAssociation
	*	- AppSyncClient.ApiCache
	*	- AppSyncClient.Api
	*	- AppSyncClient.ChannelNamespace
	*	- AppSyncClient.DataSource
	*	- AppSyncClient.DataSourceIntrospection
	*	- AppSyncClient.DomainName
	*	- AppSyncClient.Function
	*	- AppSyncClient.GraphqlApi
	*	- AppSyncClient.GraphqlApiEnvironmentVariables
	*	- AppSyncClient.IntrospectionSchema
	*	- AppSyncClient.Resolver
	*	- AppSyncClient.SchemaCreationStatus
	*	- AppSyncClient.SourceApiAssociation
	*	- AppSyncClient.Type
	*	- AppSyncClient.ApiKeys
	*	- AppSyncClient.Apis
	*	- AppSyncClient.ChannelNamespaces
	*	- AppSyncClient.DataSources
	*	- AppSyncClient.DomainNames
	*	- AppSyncClient.Functions
	*	- AppSyncClient.GraphqlApis
	*	- AppSyncClient.ResolversByFunction
	*	- AppSyncClient.Resolvers
	*	- AppSyncClient.SourceApiAssociations
	*	- AppSyncClient.TagsForResource
	*	- AppSyncClient.TypesByAssociation
	*	- AppSyncClient.Types
	*	- AthenaClient.CalculationExecutionCode
	*	- AthenaClient.CalculationExecution
	*	- AthenaClient.CalculationExecutionStatus
	*	- AthenaClient.CapacityAssignmentConfiguration
	*	- AthenaClient.CapacityReservation
	*	- AthenaClient.DataCatalog
	*	- AthenaClient.Database
	*	- AthenaClient.NamedQuery
	*	- AthenaClient.NotebookMetadata
	*	- AthenaClient.PreparedStatement
	*	- AthenaClient.QueryExecution
	*	- AthenaClient.QueryResults
	*	- AthenaClient.QueryRuntimeStatistics
	*	- AthenaClient.Session
	*	- AthenaClient.SessionStatus
	*	- AthenaClient.TableMetadata
	*	- AthenaClient.WorkGroup
	*	- AthenaClient.ApplicationDPUSizes
	*	- AthenaClient.CalculationExecutions
	*	- AthenaClient.CapacityReservations
	*	- AthenaClient.DataCatalogs
	*	- AthenaClient.Databases
	*	- AthenaClient.EngineVersions
	*	- AthenaClient.Executors
	*	- AthenaClient.NamedQueries
	*	- AthenaClient.NotebookMetadata
	*	- AthenaClient.NotebookSessions
	*	- AthenaClient.PreparedStatements
	*	- AthenaClient.QueryExecutions
	*	- AthenaClient.Sessions
	*	- AthenaClient.TableMetadata
	*	- AthenaClient.TagsForResource
	*	- AthenaClient.WorkGroups
	*	- AuditManagerClient.AccountStatus
	*	- AuditManagerClient.Assessment
	*	- AuditManagerClient.AssessmentFramework
	*	- AuditManagerClient.AssessmentReportUrl
	*	- AuditManagerClient.ChangeLogs
	*	- AuditManagerClient.Control
	*	- AuditManagerClient.Delegations
	*	- AuditManagerClient.EvidenceByEvidenceFolder
	*	- AuditManagerClient.Evidence
	*	- AuditManagerClient.EvidenceFileUploadUrl
	*	- AuditManagerClient.EvidenceFolder
	*	- AuditManagerClient.EvidenceFoldersByAssessment
	*	- AuditManagerClient.EvidenceFoldersByAssessmentControl
	*	- AuditManagerClient.InsightsByAssessment
	*	- AuditManagerClient.Insights
	*	- AuditManagerClient.OrganizationAdminAccount
	*	- AuditManagerClient.ServicesInScope
	*	- AuditManagerClient.Settings
	*	- AuditManagerClient.AssessmentControlInsightsByControlDomain
	*	- AuditManagerClient.AssessmentFrameworkShareRequests
	*	- AuditManagerClient.AssessmentFrameworks
	*	- AuditManagerClient.AssessmentReports
	*	- AuditManagerClient.Assessments
	*	- AuditManagerClient.ControlDomainInsightsByAssessment
	*	- AuditManagerClient.ControlDomainInsights
	*	- AuditManagerClient.ControlInsightsByControlDomain
	*	- AuditManagerClient.Controls
	*	- AuditManagerClient.KeywordsForDataSource
	*	- AuditManagerClient.Notifications
	*	- AuditManagerClient.TagsForResource
	*	- AutoScalingClient.AccountLimits
	*	- AutoScalingClient.AdjustmentTypes
	*	- AutoScalingClient.AutoScalingGroups
	*	- AutoScalingClient.AutoScalingInstances
	*	- AutoScalingClient.AutoScalingNotificationTypes
	*	- AutoScalingClient.InstanceRefreshes
	*	- AutoScalingClient.LaunchConfigurations
	*	- AutoScalingClient.LifecycleHookTypes
	*	- AutoScalingClient.LifecycleHooks
	*	- AutoScalingClient.LoadBalancerTargetGroups
	*	- AutoScalingClient.LoadBalancers
	*	- AutoScalingClient.MetricCollectionTypes
	*	- AutoScalingClient.NotificationConfigurations
	*	- AutoScalingClient.Policies
	*	- AutoScalingClient.ScalingActivities
	*	- AutoScalingClient.ScalingProcessTypes
	*	- AutoScalingClient.ScheduledActions
	*	- AutoScalingClient.Tags
	*	- AutoScalingClient.TerminationPolicyTypes
	*	- AutoScalingClient.TrafficSources
	*	- AutoScalingClient.WarmPool
	*	- AutoScalingClient.PredictiveScalingForecast
	*	- AutoScalingPlansClient.ScalingPlanResources
	*	- AutoScalingPlansClient.ScalingPlans
	*	- AutoScalingPlansClient.ScalingPlanResourceForecastData
	*	- BackupClient.BackupJob
	*	- BackupClient.BackupVault
	*	- BackupClient.CopyJob
	*	- BackupClient.Framework
	*	- BackupClient.GlobalSettings
	*	- BackupClient.ProtectedResource
	*	- BackupClient.RecoveryPoint
	*	- BackupClient.RegionSettings
	*	- BackupClient.ReportJob
	*	- BackupClient.ReportPlan
	*	- BackupClient.RestoreJob
	*	- BackupClient.BackupPlan
	*	- BackupClient.BackupPlanFromJSON
	*	- BackupClient.BackupPlanFromTemplate
	*	- BackupClient.BackupSelection
	*	- BackupClient.BackupVaultAccessPolicy
	*	- BackupClient.BackupVaultNotifications
	*	- BackupClient.LegalHold
	*	- BackupClient.RecoveryPointIndexDetails
	*	- BackupClient.RecoveryPointRestoreMetadata
	*	- BackupClient.RestoreJobMetadata
	*	- BackupClient.RestoreTestingInferredMetadata
	*	- BackupClient.RestoreTestingPlan
	*	- BackupClient.RestoreTestingSelection
	*	- BackupClient.SupportedResourceTypes
	*	- BackupClient.BackupJobSummaries
	*	- BackupClient.BackupJobs
	*	- BackupClient.BackupPlanTemplates
	*	- BackupClient.BackupPlanVersions
	*	- BackupClient.BackupPlans
	*	- BackupClient.BackupSelections
	*	- BackupClient.BackupVaults
	*	- BackupClient.CopyJobSummaries
	*	- BackupClient.CopyJobs
	*	- BackupClient.Frameworks
	*	- BackupClient.IndexedRecoveryPoints
	*	- BackupClient.LegalHolds
	*	- BackupClient.ProtectedResourcesByBackupVault
	*	- BackupClient.ProtectedResources
	*	- BackupClient.RecoveryPointsByBackupVault
	*	- BackupClient.RecoveryPointsByLegalHold
	*	- BackupClient.RecoveryPointsByResource
	*	- BackupClient.ReportJobs
	*	- BackupClient.ReportPlans
	*	- BackupClient.RestoreJobSummaries
	*	- BackupClient.RestoreJobsByProtectedResource
	*	- BackupClient.RestoreJobs
	*	- BackupClient.RestoreTestingPlans
	*	- BackupClient.RestoreTestingSelections
	*	- BackupClient.Tags
	*	- BackupGatewayClient.BandwidthRateLimitSchedule
	*	- BackupGatewayClient.Gateway
	*	- BackupGatewayClient.Hypervisor
	*	- BackupGatewayClient.HypervisorPropertyMappings
	*	- BackupGatewayClient.VirtualMachine
	*	- BackupGatewayClient.Gateways
	*	- BackupGatewayClient.Hypervisors
	*	- BackupGatewayClient.TagsForResource
	*	- BackupGatewayClient.VirtualMachines
	*	- BatchClient.ComputeEnvironments
	*	- BatchClient.ConsumableResource
	*	- BatchClient.JobDefinitions
	*	- BatchClient.JobQueues
	*	- BatchClient.Jobs
	*	- BatchClient.SchedulingPolicies
	*	- BatchClient.JobQueueSnapshot
	*	- BatchClient.ConsumableResources
	*	- BatchClient.JobsByConsumableResource
	*	- BatchClient.Jobs
	*	- BatchClient.SchedulingPolicies
	*	- BatchClient.TagsForResource
	*	- BillingconductorClient.BillingGroupCostReport
	*	- BillingconductorClient.AccountAssociations
	*	- BillingconductorClient.BillingGroupCostReports
	*	- BillingconductorClient.BillingGroups
	*	- BillingconductorClient.CustomLineItemVersions
	*	- BillingconductorClient.CustomLineItems
	*	- BillingconductorClient.PricingPlansAssociatedWithPricingRule
	*	- BillingconductorClient.PricingPlans
	*	- BillingconductorClient.PricingRulesAssociatedToPricingPlan
	*	- BillingconductorClient.PricingRules
	*	- BillingconductorClient.ResourcesAssociatedToCustomLineItem
	*	- BillingconductorClient.TagsForResource
	*	- BraketClient.Device
	*	- BraketClient.Job
	*	- BraketClient.QuantumTask
	*	- BraketClient.TagsForResource
	*	- BudgetsClient.BudgetAction
	*	- BudgetsClient.BudgetActionHistories
	*	- BudgetsClient.BudgetActionsForAccount
	*	- BudgetsClient.BudgetActionsForBudget
	*	- BudgetsClient.Budget
	*	- BudgetsClient.BudgetNotificationsForAccount
	*	- BudgetsClient.BudgetPerformanceHistory
	*	- BudgetsClient.Budgets
	*	- BudgetsClient.NotificationsForBudget
	*	- BudgetsClient.SubscribersForNotification
	*	- BudgetsClient.TagsForResource
	*	- ChimeClient.Account
	*	- ChimeClient.AccountSettings
	*	- ChimeClient.Bot
	*	- ChimeClient.EventsConfiguration
	*	- ChimeClient.GlobalSettings
	*	- ChimeClient.PhoneNumber
	*	- ChimeClient.PhoneNumberOrder
	*	- ChimeClient.PhoneNumberSettings
	*	- ChimeClient.RetentionSettings
	*	- ChimeClient.Room
	*	- ChimeClient.User
	*	- ChimeClient.UserSettings
	*	- ChimeClient.Accounts
	*	- ChimeClient.Bots
	*	- ChimeClient.PhoneNumberOrders
	*	- ChimeClient.PhoneNumbers
	*	- ChimeClient.RoomMemberships
	*	- ChimeClient.Rooms
	*	- ChimeClient.SupportedPhoneNumberCountries
	*	- ChimeClient.Users
	*	- ChimeSDKIdentityClient.AppInstanceAdmin
	*	- ChimeSDKIdentityClient.AppInstanceBot
	*	- ChimeSDKIdentityClient.AppInstance
	*	- ChimeSDKIdentityClient.AppInstanceUser
	*	- ChimeSDKIdentityClient.AppInstanceUserEndpoint
	*	- ChimeSDKIdentityClient.AppInstanceRetentionSettings
	*	- ChimeSDKIdentityClient.AppInstanceAdmins
	*	- ChimeSDKIdentityClient.AppInstanceBots
	*	- ChimeSDKIdentityClient.AppInstanceUserEndpoints
	*	- ChimeSDKIdentityClient.AppInstanceUsers
	*	- ChimeSDKIdentityClient.AppInstances
	*	- ChimeSDKIdentityClient.TagsForResource
	*	- ChimeSDKMediaPipelinesClient.MediaCapturePipeline
	*	- ChimeSDKMediaPipelinesClient.MediaInsightsPipelineConfiguration
	*	- ChimeSDKMediaPipelinesClient.MediaPipeline
	*	- ChimeSDKMediaPipelinesClient.MediaPipelineKinesisVideoStreamPool
	*	- ChimeSDKMediaPipelinesClient.SpeakerSearchTask
	*	- ChimeSDKMediaPipelinesClient.VoiceToneAnalysisTask
	*	- ChimeSDKMediaPipelinesClient.MediaCapturePipelines
	*	- ChimeSDKMediaPipelinesClient.MediaInsightsPipelineConfigurations
	*	- ChimeSDKMediaPipelinesClient.MediaPipelineKinesisVideoStreamPools
	*	- ChimeSDKMediaPipelinesClient.MediaPipelines
	*	- ChimeSDKMediaPipelinesClient.TagsForResource
	*	- ChimeSDKMeetingsClient.Attendee
	*	- ChimeSDKMeetingsClient.Meeting
	*	- ChimeSDKMeetingsClient.Attendees
	*	- ChimeSDKMeetingsClient.TagsForResource
	*	- ChimeSDKMessagingClient.ChannelBan
	*	- ChimeSDKMessagingClient.Channel
	*	- ChimeSDKMessagingClient.ChannelFlow
	*	- ChimeSDKMessagingClient.ChannelMembership
	*	- ChimeSDKMessagingClient.ChannelMembershipForAppInstanceUser
	*	- ChimeSDKMessagingClient.ChannelModeratedByAppInstanceUser
	*	- ChimeSDKMessagingClient.ChannelModerator
	*	- ChimeSDKMessagingClient.ChannelMembershipPreferences
	*	- ChimeSDKMessagingClient.ChannelMessage
	*	- ChimeSDKMessagingClient.ChannelMessageStatus
	*	- ChimeSDKMessagingClient.MessagingSessionEndpoint
	*	- ChimeSDKMessagingClient.MessagingStreamingConfigurations
	*	- ChimeSDKMessagingClient.ChannelBans
	*	- ChimeSDKMessagingClient.ChannelFlows
	*	- ChimeSDKMessagingClient.ChannelMemberships
	*	- ChimeSDKMessagingClient.ChannelMembershipsForAppInstanceUser
	*	- ChimeSDKMessagingClient.ChannelMessages
	*	- ChimeSDKMessagingClient.ChannelModerators
	*	- ChimeSDKMessagingClient.ChannelsAssociatedWithChannelFlow
	*	- ChimeSDKMessagingClient.Channels
	*	- ChimeSDKMessagingClient.ChannelsModeratedByAppInstanceUser
	*	- ChimeSDKMessagingClient.SubChannels
	*	- ChimeSDKMessagingClient.TagsForResource
	*	- CloudControlClient.Resource
	*	- CloudControlClient.ResourceRequestStatus
	*	- CloudControlClient.ResourceRequests
	*	- CloudControlClient.Resources
	*	- CloudDirectoryClient.AppliedSchemaVersion
	*	- CloudDirectoryClient.Directory
	*	- CloudDirectoryClient.Facet
	*	- CloudDirectoryClient.LinkAttributes
	*	- CloudDirectoryClient.ObjectAttributes
	*	- CloudDirectoryClient.ObjectInformation
	*	- CloudDirectoryClient.SchemaAsJson
	*	- CloudDirectoryClient.TypedLinkFacetInformation
	*	- CloudDirectoryClient.AppliedSchemaArns
	*	- CloudDirectoryClient.AttachedIndices
	*	- CloudDirectoryClient.DevelopmentSchemaArns
	*	- CloudDirectoryClient.Directories
	*	- CloudDirectoryClient.FacetAttributes
	*	- CloudDirectoryClient.FacetNames
	*	- CloudDirectoryClient.IncomingTypedLinks
	*	- CloudDirectoryClient.Index
	*	- CloudDirectoryClient.ManagedSchemaArns
	*	- CloudDirectoryClient.ObjectAttributes
	*	- CloudDirectoryClient.ObjectChildren
	*	- CloudDirectoryClient.ObjectParentPaths
	*	- CloudDirectoryClient.ObjectParents
	*	- CloudDirectoryClient.ObjectPolicies
	*	- CloudDirectoryClient.OutgoingTypedLinks
	*	- CloudDirectoryClient.PolicyAttachments
	*	- CloudDirectoryClient.PublishedSchemaArns
	*	- CloudDirectoryClient.TagsForResource
	*	- CloudDirectoryClient.TypedLinkFacetAttributes
	*	- CloudDirectoryClient.TypedLinkFacetNames
	*	- CloudFormationClient.AccountLimits
	*	- CloudFormationClient.ChangeSet
	*	- CloudFormationClient.ChangeSetHooks
	*	- CloudFormationClient.GeneratedTemplate
	*	- CloudFormationClient.OrganizationsAccess
	*	- CloudFormationClient.Publisher
	*	- CloudFormationClient.ResourceScan
	*	- CloudFormationClient.StackDriftDetectionStatus
	*	- CloudFormationClient.StackEvents
	*	- CloudFormationClient.StackInstance
	*	- CloudFormationClient.StackRefactor
	*	- CloudFormationClient.StackResource
	*	- CloudFormationClient.StackResourceDrifts
	*	- CloudFormationClient.StackResources
	*	- CloudFormationClient.StackSet
	*	- CloudFormationClient.StackSetOperation
	*	- CloudFormationClient.Stacks
	*	- CloudFormationClient.Type
	*	- CloudFormationClient.TypeRegistration
	*	- CloudFormationClient.GeneratedTemplate
	*	- CloudFormationClient.StackPolicy
	*	- CloudFormationClient.Template
	*	- CloudFormationClient.TemplateSummary
	*	- CloudFormationClient.ChangeSets
	*	- CloudFormationClient.Exports
	*	- CloudFormationClient.GeneratedTemplates
	*	- CloudFormationClient.HookResults
	*	- CloudFormationClient.Imports
	*	- CloudFormationClient.ResourceScanRelatedResources
	*	- CloudFormationClient.ResourceScanResources
	*	- CloudFormationClient.ResourceScans
	*	- CloudFormationClient.StackInstanceResourceDrifts
	*	- CloudFormationClient.StackInstances
	*	- CloudFormationClient.StackRefactorActions
	*	- CloudFormationClient.StackRefactors
	*	- CloudFormationClient.StackResources
	*	- CloudFormationClient.StackSetAutoDeploymentTargets
	*	- CloudFormationClient.StackSetOperationResults
	*	- CloudFormationClient.StackSetOperations
	*	- CloudFormationClient.StackSets
	*	- CloudFormationClient.Stacks
	*	- CloudFormationClient.TypeRegistrations
	*	- CloudFormationClient.TypeVersions
	*	- CloudFormationClient.Types
	*	- CloudFrontClient.Function
	*	- CloudFrontClient.KeyValueStore
	*	- CloudFrontClient.AnycastIpList
	*	- CloudFrontClient.CachePolicy
	*	- CloudFrontClient.CachePolicyConfig
	*	- CloudFrontClient.CloudFrontOriginAccessIdentity
	*	- CloudFrontClient.CloudFrontOriginAccessIdentityConfig
	*	- CloudFrontClient.ContinuousDeploymentPolicy
	*	- CloudFrontClient.ContinuousDeploymentPolicyConfig
	*	- CloudFrontClient.Distribution
	*	- CloudFrontClient.DistributionConfig
	*	- CloudFrontClient.FieldLevelEncryption
	*	- CloudFrontClient.FieldLevelEncryptionConfig
	*	- CloudFrontClient.FieldLevelEncryptionProfile
	*	- CloudFrontClient.FieldLevelEncryptionProfileConfig
	*	- CloudFrontClient.Function
	*	- CloudFrontClient.Invalidation
	*	- CloudFrontClient.KeyGroup
	*	- CloudFrontClient.KeyGroupConfig
	*	- CloudFrontClient.MonitoringSubscription
	*	- CloudFrontClient.OriginAccessControl
	*	- CloudFrontClient.OriginAccessControlConfig
	*	- CloudFrontClient.OriginRequestPolicy
	*	- CloudFrontClient.OriginRequestPolicyConfig
	*	- CloudFrontClient.PublicKey
	*	- CloudFrontClient.PublicKeyConfig
	*	- CloudFrontClient.RealtimeLogConfig
	*	- CloudFrontClient.ResponseHeadersPolicy
	*	- CloudFrontClient.ResponseHeadersPolicyConfig
	*	- CloudFrontClient.StreamingDistribution
	*	- CloudFrontClient.StreamingDistributionConfig
	*	- CloudFrontClient.VpcOrigin
	*	- CloudFrontClient.AnycastIpLists
	*	- CloudFrontClient.CachePolicies
	*	- CloudFrontClient.CloudFrontOriginAccessIdentities
	*	- CloudFrontClient.ConflictingAliases
	*	- CloudFrontClient.ContinuousDeploymentPolicies
	*	- CloudFrontClient.DistributionsByAnycastIpListId
	*	- CloudFrontClient.DistributionsByCachePolicyId
	*	- CloudFrontClient.DistributionsByKeyGroup
	*	- CloudFrontClient.DistributionsByOriginRequestPolicyId
	*	- CloudFrontClient.DistributionsByRealtimeLogConfig
	*	- CloudFrontClient.DistributionsByResponseHeadersPolicyId
	*	- CloudFrontClient.DistributionsByVpcOriginId
	*	- CloudFrontClient.DistributionsByWebACLId
	*	- CloudFrontClient.Distributions
	*	- CloudFrontClient.FieldLevelEncryptionConfigs
	*	- CloudFrontClient.FieldLevelEncryptionProfiles
	*	- CloudFrontClient.Functions
	*	- CloudFrontClient.Invalidations
	*	- CloudFrontClient.KeyGroups
	*	- CloudFrontClient.KeyValueStores
	*	- CloudFrontClient.OriginAccessControls
	*	- CloudFrontClient.OriginRequestPolicies
	*	- CloudFrontClient.PublicKeys
	*	- CloudFrontClient.RealtimeLogConfigs
	*	- CloudFrontClient.ResponseHeadersPolicies
	*	- CloudFrontClient.StreamingDistributions
	*	- CloudFrontClient.TagsForResource
	*	- CloudFrontClient.VpcOrigins
	*	- CloudHSMClient.Hapg
	*	- CloudHSMClient.Hsm
	*	- CloudHSMClient.LunaClient
	*	- CloudHSMClient.Config
	*	- CloudHSMClient.AvailableZones
	*	- CloudHSMClient.Hapgs
	*	- CloudHSMClient.Hsms
	*	- CloudHSMClient.LunaClients
	*	- CloudHSMClient.TagsForResource
	*	- CloudSearchClient.AnalysisSchemes
	*	- CloudSearchClient.AvailabilityOptions
	*	- CloudSearchClient.DomainEndpointOptions
	*	- CloudSearchClient.Domains
	*	- CloudSearchClient.Expressions
	*	- CloudSearchClient.IndexFields
	*	- CloudSearchClient.ScalingParameters
	*	- CloudSearchClient.ServiceAccessPolicies
	*	- CloudSearchClient.Suggesters
	*	- CloudSearchClient.DomainNames
	*	- CloudTrailClient.Query
	*	- CloudTrailClient.Trails
	*	- CloudTrailClient.Channel
	*	- CloudTrailClient.Dashboard
	*	- CloudTrailClient.EventDataStore
	*	- CloudTrailClient.EventSelectors
	*	- CloudTrailClient.Import
	*	- CloudTrailClient.InsightSelectors
	*	- CloudTrailClient.QueryResults
	*	- CloudTrailClient.ResourcePolicy
	*	- CloudTrailClient.Trail
	*	- CloudTrailClient.TrailStatus
	*	- CloudTrailClient.Channels
	*	- CloudTrailClient.Dashboards
	*	- CloudTrailClient.EventDataStores
	*	- CloudTrailClient.ImportFailures
	*	- CloudTrailClient.Imports
	*	- CloudTrailClient.InsightsMetricData
	*	- CloudTrailClient.PublicKeys
	*	- CloudTrailClient.Queries
	*	- CloudTrailClient.Tags
	*	- CloudTrailClient.Trails
	*	- CloudWatchClient.AlarmHistory
	*	- CloudWatchClient.Alarms
	*	- CloudWatchClient.AlarmsForMetric
	*	- CloudWatchClient.AnomalyDetectors
	*	- CloudWatchClient.InsightRules
	*	- CloudWatchClient.Dashboard
	*	- CloudWatchClient.InsightRuleReport
	*	- CloudWatchClient.MetricData
	*	- CloudWatchClient.MetricStatistics
	*	- CloudWatchClient.MetricStream
	*	- CloudWatchClient.MetricWidgetImage
	*	- CloudWatchClient.Dashboards
	*	- CloudWatchClient.ManagedInsightRules
	*	- CloudWatchClient.MetricStreams
	*	- CloudWatchClient.Metrics
	*	- CloudWatchClient.TagsForResource
	*	- CloudWatchEventsClient.ApiDestination
	*	- CloudWatchEventsClient.Archive
	*	- CloudWatchEventsClient.Connection
	*	- CloudWatchEventsClient.EventBus
	*	- CloudWatchEventsClient.EventSource
	*	- CloudWatchEventsClient.PartnerEventSource
	*	- CloudWatchEventsClient.Replay
	*	- CloudWatchEventsClient.Rule
	*	- CloudWatchEventsClient.ApiDestinations
	*	- CloudWatchEventsClient.Archives
	*	- CloudWatchEventsClient.Connections
	*	- CloudWatchEventsClient.EventBuses
	*	- CloudWatchEventsClient.EventSources
	*	- CloudWatchEventsClient.PartnerEventSourceAccounts
	*	- CloudWatchEventsClient.PartnerEventSources
	*	- CloudWatchEventsClient.Replays
	*	- CloudWatchEventsClient.RuleNamesByTarget
	*	- CloudWatchEventsClient.Rules
	*	- CloudWatchEventsClient.TagsForResource
	*	- CloudWatchEventsClient.TargetsByRule
	*	- CloudWatchLogsClient.AccountPolicies
	*	- CloudWatchLogsClient.ConfigurationTemplates
	*	- CloudWatchLogsClient.Deliveries
	*	- CloudWatchLogsClient.DeliveryDestinations
	*	- CloudWatchLogsClient.DeliverySources
	*	- CloudWatchLogsClient.Destinations
	*	- CloudWatchLogsClient.ExportTasks
	*	- CloudWatchLogsClient.FieldIndexes
	*	- CloudWatchLogsClient.IndexPolicies
	*	- CloudWatchLogsClient.LogGroups
	*	- CloudWatchLogsClient.LogStreams
	*	- CloudWatchLogsClient.MetricFilters
	*	- CloudWatchLogsClient.Queries
	*	- CloudWatchLogsClient.QueryDefinitions
	*	- CloudWatchLogsClient.ResourcePolicies
	*	- CloudWatchLogsClient.SubscriptionFilters
	*	- CloudWatchLogsClient.DataProtectionPolicy
	*	- CloudWatchLogsClient.Delivery
	*	- CloudWatchLogsClient.DeliveryDestination
	*	- CloudWatchLogsClient.DeliveryDestinationPolicy
	*	- CloudWatchLogsClient.DeliverySource
	*	- CloudWatchLogsClient.Integration
	*	- CloudWatchLogsClient.LogAnomalyDetector
	*	- CloudWatchLogsClient.LogEvents
	*	- CloudWatchLogsClient.LogGroupFields
	*	- CloudWatchLogsClient.LogRecord
	*	- CloudWatchLogsClient.QueryResults
	*	- CloudWatchLogsClient.Transformer
	*	- CloudWatchLogsClient.Anomalies
	*	- CloudWatchLogsClient.Integrations
	*	- CloudWatchLogsClient.LogAnomalyDetectors
	*	- CloudWatchLogsClient.LogGroupsForQuery
	*	- CloudWatchLogsClient.TagsForResource
	*	- CloudWatchLogsClient.TagsLogGroup
	*	- CodeartifactClient.Domain
	*	- CodeartifactClient.Package
	*	- CodeartifactClient.PackageGroup
	*	- CodeartifactClient.PackageVersion
	*	- CodeartifactClient.Repository
	*	- CodeartifactClient.AssociatedPackageGroup
	*	- CodeartifactClient.AuthorizationToken
	*	- CodeartifactClient.DomainPermissionsPolicy
	*	- CodeartifactClient.PackageVersionAsset
	*	- CodeartifactClient.PackageVersionReadme
	*	- CodeartifactClient.RepositoryEndpoint
	*	- CodeartifactClient.RepositoryPermissionsPolicy
	*	- CodeartifactClient.AllowedRepositoriesForGroup
	*	- CodeartifactClient.AssociatedPackages
	*	- CodeartifactClient.Domains
	*	- CodeartifactClient.PackageGroups
	*	- CodeartifactClient.PackageVersionAssets
	*	- CodeartifactClient.PackageVersionDependencies
	*	- CodeartifactClient.PackageVersions
	*	- CodeartifactClient.Packages
	*	- CodeartifactClient.Repositories
	*	- CodeartifactClient.RepositoriesInDomain
	*	- CodeartifactClient.SubPackageGroups
	*	- CodeartifactClient.TagsForResource
	*	- CodeBuildClient.CodeCoverages
	*	- CodeBuildClient.TestCases
	*	- CodeBuildClient.ReportGroupTrend
	*	- CodeBuildClient.ResourcePolicy
	*	- CodeBuildClient.BuildBatches
	*	- CodeBuildClient.BuildBatchesForProject
	*	- CodeBuildClient.Builds
	*	- CodeBuildClient.BuildsForProject
	*	- CodeBuildClient.CuratedEnvironmentImages
	*	- CodeBuildClient.Fleets
	*	- CodeBuildClient.Projects
	*	- CodeBuildClient.ReportGroups
	*	- CodeBuildClient.Reports
	*	- CodeBuildClient.ReportsForReportGroup
	*	- CodeBuildClient.SharedProjects
	*	- CodeBuildClient.SharedReportGroups
	*	- CodeBuildClient.SourceCredentials
	*	- CodeCommitClient.MergeConflicts
	*	- CodeCommitClient.PullRequestEvents
	*	- CodeCommitClient.ApprovalRuleTemplate
	*	- CodeCommitClient.Blob
	*	- CodeCommitClient.Branch
	*	- CodeCommitClient.Comment
	*	- CodeCommitClient.CommentReactions
	*	- CodeCommitClient.CommentsForComparedCommit
	*	- CodeCommitClient.CommentsForPullRequest
	*	- CodeCommitClient.Commit
	*	- CodeCommitClient.Differences
	*	- CodeCommitClient.File
	*	- CodeCommitClient.Folder
	*	- CodeCommitClient.MergeCommit
	*	- CodeCommitClient.MergeConflicts
	*	- CodeCommitClient.MergeOptions
	*	- CodeCommitClient.PullRequestApprovalStates
	*	- CodeCommitClient.PullRequest
	*	- CodeCommitClient.PullRequestOverrideState
	*	- CodeCommitClient.Repository
	*	- CodeCommitClient.RepositoryTriggers
	*	- CodeCommitClient.ApprovalRuleTemplates
	*	- CodeCommitClient.AssociatedApprovalRuleTemplatesForRepository
	*	- CodeCommitClient.Branches
	*	- CodeCommitClient.FileCommitHistory
	*	- CodeCommitClient.PullRequests
	*	- CodeCommitClient.Repositories
	*	- CodeCommitClient.RepositoriesForApprovalRuleTemplate
	*	- CodeCommitClient.TagsForResource
	*	- CodeDeployClient.Application
	*	- CodeDeployClient.ApplicationRevision
	*	- CodeDeployClient.Deployment
	*	- CodeDeployClient.DeploymentConfig
	*	- CodeDeployClient.DeploymentGroup
	*	- CodeDeployClient.DeploymentInstance
	*	- CodeDeployClient.DeploymentTarget
	*	- CodeDeployClient.OnPremisesInstance
	*	- CodeDeployClient.ApplicationRevisions
	*	- CodeDeployClient.Applications
	*	- CodeDeployClient.DeploymentConfigs
	*	- CodeDeployClient.DeploymentGroups
	*	- CodeDeployClient.DeploymentInstances
	*	- CodeDeployClient.DeploymentTargets
	*	- CodeDeployClient.Deployments
	*	- CodeDeployClient.GitHubAccountTokenNames
	*	- CodeDeployClient.OnPremisesInstances
	*	- CodeDeployClient.TagsForResource
	*	- CodeGuruProfilerClient.ProfilingGroup
	*	- CodeGuruProfilerClient.FindingsReportAccountSummary
	*	- CodeGuruProfilerClient.NotificationConfiguration
	*	- CodeGuruProfilerClient.Policy
	*	- CodeGuruProfilerClient.Profile
	*	- CodeGuruProfilerClient.Recommendations
	*	- CodeGuruProfilerClient.FindingsReports
	*	- CodeGuruProfilerClient.ProfileTimes
	*	- CodeGuruProfilerClient.ProfilingGroups
	*	- CodeGuruProfilerClient.TagsForResource
	*	- CodeGuruReviewerClient.CodeReview
	*	- CodeGuruReviewerClient.RecommendationFeedback
	*	- CodeGuruReviewerClient.RepositoryAssociation
	*	- CodeGuruReviewerClient.CodeReviews
	*	- CodeGuruReviewerClient.RecommendationFeedback
	*	- CodeGuruReviewerClient.Recommendations
	*	- CodeGuruReviewerClient.RepositoryAssociations
	*	- CodeGuruReviewerClient.TagsForResource
	*	- CodePipelineClient.ActionType
	*	- CodePipelineClient.JobDetails
	*	- CodePipelineClient.Pipeline
	*	- CodePipelineClient.PipelineExecution
	*	- CodePipelineClient.PipelineState
	*	- CodePipelineClient.ThirdPartyJobDetails
	*	- CodePipelineClient.ActionExecutions
	*	- CodePipelineClient.ActionTypes
	*	- CodePipelineClient.PipelineExecutions
	*	- CodePipelineClient.Pipelines
	*	- CodePipelineClient.RuleExecutions
	*	- CodePipelineClient.RuleTypes
	*	- CodePipelineClient.TagsForResource
	*	- CodePipelineClient.Webhooks
	*	- CodeStarClient.Project
	*	- CodeStarClient.UserProfile
	*	- CodeStarClient.Projects
	*	- CodeStarClient.Resources
	*	- CodeStarClient.TagsForProject
	*	- CodeStarClient.TeamMembers
	*	- CodeStarClient.UserProfiles
	*	- CodeStarConnectionsClient.Connection
	*	- CodeStarConnectionsClient.Host
	*	- CodeStarConnectionsClient.RepositoryLink
	*	- CodeStarConnectionsClient.RepositorySyncStatus
	*	- CodeStarConnectionsClient.ResourceSyncStatus
	*	- CodeStarConnectionsClient.SyncBlockerSummary
	*	- CodeStarConnectionsClient.SyncConfiguration
	*	- CodeStarConnectionsClient.Connections
	*	- CodeStarConnectionsClient.Hosts
	*	- CodeStarConnectionsClient.RepositoryLinks
	*	- CodeStarConnectionsClient.RepositorySyncDefinitions
	*	- CodeStarConnectionsClient.SyncConfigurations
	*	- CodeStarConnectionsClient.TagsForResource
	*	- CodestarNotificationsClient.NotificationRule
	*	- CodestarNotificationsClient.EventTypes
	*	- CodestarNotificationsClient.NotificationRules
	*	- CodestarNotificationsClient.TagsForResource
	*	- CodestarNotificationsClient.Targets
	*	- CognitoIdentityClient.Identity
	*	- CognitoIdentityClient.IdentityPool
	*	- CognitoIdentityClient.CredentialsForIdentity
	*	- CognitoIdentityClient.Id
	*	- CognitoIdentityClient.IdentityPoolRoles
	*	- CognitoIdentityClient.OpenIdToken
	*	- CognitoIdentityClient.OpenIdTokenForDeveloperIdentity
	*	- CognitoIdentityClient.PrincipalTagAttributeMap
	*	- CognitoIdentityClient.Identities
	*	- CognitoIdentityClient.IdentityPools
	*	- CognitoIdentityClient.TagsForResource
	*	- CognitoIdentityProviderClient.IdentityProvider
	*	- CognitoIdentityProviderClient.ManagedLoginBrandingByClient
	*	- CognitoIdentityProviderClient.ManagedLoginBranding
	*	- CognitoIdentityProviderClient.ResourceServer
	*	- CognitoIdentityProviderClient.RiskConfiguration
	*	- CognitoIdentityProviderClient.UserImportJob
	*	- CognitoIdentityProviderClient.UserPoolClient
	*	- CognitoIdentityProviderClient.UserPool
	*	- CognitoIdentityProviderClient.UserPoolDomain
	*	- CognitoIdentityProviderClient.CSVHeader
	*	- CognitoIdentityProviderClient.Device
	*	- CognitoIdentityProviderClient.Group
	*	- CognitoIdentityProviderClient.IdentityProviderByIdentifier
	*	- CognitoIdentityProviderClient.LogDeliveryConfiguration
	*	- CognitoIdentityProviderClient.SigningCertificate
	*	- CognitoIdentityProviderClient.UICustomization
	*	- CognitoIdentityProviderClient.UserAttributeVerificationCode
	*	- CognitoIdentityProviderClient.UserAuthFactors
	*	- CognitoIdentityProviderClient.User
	*	- CognitoIdentityProviderClient.UserPoolMfaConfig
	*	- CognitoIdentityProviderClient.Devices
	*	- CognitoIdentityProviderClient.Groups
	*	- CognitoIdentityProviderClient.IdentityProviders
	*	- CognitoIdentityProviderClient.ResourceServers
	*	- CognitoIdentityProviderClient.TagsForResource
	*	- CognitoIdentityProviderClient.UserImportJobs
	*	- CognitoIdentityProviderClient.UserPoolClients
	*	- CognitoIdentityProviderClient.UserPools
	*	- CognitoIdentityProviderClient.Users
	*	- CognitoIdentityProviderClient.UsersInGroup
	*	- CognitoIdentityProviderClient.WebAuthnCredentials
	*	- CognitoSyncClient.Dataset
	*	- CognitoSyncClient.IdentityPoolUsage
	*	- CognitoSyncClient.IdentityUsage
	*	- CognitoSyncClient.BulkPublishDetails
	*	- CognitoSyncClient.CognitoEvents
	*	- CognitoSyncClient.IdentityPoolConfiguration
	*	- CognitoSyncClient.Datasets
	*	- CognitoSyncClient.IdentityPoolUsage
	*	- CognitoSyncClient.Records
	*	- CommanderClient.IncidentRecord
	*	- CommanderClient.ReplicationSet
	*	- CommanderClient.ResourcePolicies
	*	- CommanderClient.ResponsePlan
	*	- CommanderClient.TimelineEvent
	*	- CommanderClient.IncidentRecords
	*	- CommanderClient.RelatedItems
	*	- CommanderClient.ReplicationSets
	*	- CommanderClient.ResponsePlans
	*	- CommanderClient.TagsForResource
	*	- CommanderClient.TimelineEvents
	*	- ComprehendClient.Dataset
	*	- ComprehendClient.DocumentClassificationJob
	*	- ComprehendClient.DocumentClassifier
	*	- ComprehendClient.DominantLanguageDetectionJob
	*	- ComprehendClient.Endpoint
	*	- ComprehendClient.EntitiesDetectionJob
	*	- ComprehendClient.EntityRecognizer
	*	- ComprehendClient.EventsDetectionJob
	*	- ComprehendClient.Flywheel
	*	- ComprehendClient.FlywheelIteration
	*	- ComprehendClient.KeyPhrasesDetectionJob
	*	- ComprehendClient.PiiEntitiesDetectionJob
	*	- ComprehendClient.ResourcePolicy
	*	- ComprehendClient.SentimentDetectionJob
	*	- ComprehendClient.TargetedSentimentDetectionJob
	*	- ComprehendClient.TopicsDetectionJob
	*	- ComprehendClient.Datasets
	*	- ComprehendClient.DocumentClassificationJobs
	*	- ComprehendClient.DocumentClassifierSummaries
	*	- ComprehendClient.DocumentClassifiers
	*	- ComprehendClient.DominantLanguageDetectionJobs
	*	- ComprehendClient.Endpoints
	*	- ComprehendClient.EntitiesDetectionJobs
	*	- ComprehendClient.EntityRecognizerSummaries
	*	- ComprehendClient.EntityRecognizers
	*	- ComprehendClient.EventsDetectionJobs
	*	- ComprehendClient.FlywheelIterationHistory
	*	- ComprehendClient.Flywheels
	*	- ComprehendClient.KeyPhrasesDetectionJobs
	*	- ComprehendClient.PiiEntitiesDetectionJobs
	*	- ComprehendClient.SentimentDetectionJobs
	*	- ComprehendClient.TagsForResource
	*	- ComprehendClient.TargetedSentimentDetectionJobs
	*	- ComprehendClient.TopicsDetectionJobs
	*	- ComprehendMedicalClient.EntitiesDetectionV2Job
	*	- ComprehendMedicalClient.ICD10CMInferenceJob
	*	- ComprehendMedicalClient.PHIDetectionJob
	*	- ComprehendMedicalClient.RxNormInferenceJob
	*	- ComprehendMedicalClient.SNOMEDCTInferenceJob
	*	- ComprehendMedicalClient.EntitiesDetectionV2Jobs
	*	- ComprehendMedicalClient.ICD10CMInferenceJobs
	*	- ComprehendMedicalClient.PHIDetectionJobs
	*	- ComprehendMedicalClient.RxNormInferenceJobs
	*	- ComprehendMedicalClient.SNOMEDCTInferenceJobs
	*	- ComputeOptimizerClient.RecommendationExportJobs
	*	- ComputeOptimizerClient.AutoScalingGroupRecommendations
	*	- ComputeOptimizerClient.EBSVolumeRecommendations
	*	- ComputeOptimizerClient.EC2InstanceRecommendations
	*	- ComputeOptimizerClient.EC2RecommendationProjectedMetrics
	*	- ComputeOptimizerClient.ECSServiceRecommendationProjectedMetrics
	*	- ComputeOptimizerClient.ECSServiceRecommendations
	*	- ComputeOptimizerClient.EffectiveRecommendationPreferences
	*	- ComputeOptimizerClient.EnrollmentStatus
	*	- ComputeOptimizerClient.EnrollmentStatusesForOrganization
	*	- ComputeOptimizerClient.IdleRecommendations
	*	- ComputeOptimizerClient.LambdaFunctionRecommendations
	*	- ComputeOptimizerClient.LicenseRecommendations
	*	- ComputeOptimizerClient.RDSDatabaseRecommendationProjectedMetrics
	*	- ComputeOptimizerClient.RDSDatabaseRecommendations
	*	- ComputeOptimizerClient.RecommendationPreferences
	*	- ComputeOptimizerClient.RecommendationSummaries
	*	- ConnectClient.AgentStatus
	*	- ConnectClient.AuthenticationProfile
	*	- ConnectClient.Contact
	*	- ConnectClient.ContactEvaluation
	*	- ConnectClient.ContactFlow
	*	- ConnectClient.ContactFlowModule
	*	- ConnectClient.EmailAddress
	*	- ConnectClient.EvaluationForm
	*	- ConnectClient.HoursOfOperation
	*	- ConnectClient.HoursOfOperationOverride
	*	- ConnectClient.InstanceAttribute
	*	- ConnectClient.Instance
	*	- ConnectClient.InstanceStorageConfig
	*	- ConnectClient.PhoneNumber
	*	- ConnectClient.PredefinedAttribute
	*	- ConnectClient.Prompt
	*	- ConnectClient.Queue
	*	- ConnectClient.QuickConnect
	*	- ConnectClient.RoutingProfile
	*	- ConnectClient.Rule
	*	- ConnectClient.SecurityProfile
	*	- ConnectClient.TrafficDistributionGroup
	*	- ConnectClient.User
	*	- ConnectClient.UserHierarchyGroup
	*	- ConnectClient.UserHierarchyStructure
	*	- ConnectClient.View
	*	- ConnectClient.Vocabulary
	*	- ConnectClient.AttachedFile
	*	- ConnectClient.ContactAttributes
	*	- ConnectClient.CurrentMetricData
	*	- ConnectClient.CurrentUserData
	*	- ConnectClient.EffectiveHoursOfOperations
	*	- ConnectClient.FederationToken
	*	- ConnectClient.FlowAssociation
	*	- ConnectClient.MetricData
	*	- ConnectClient.MetricDataV2
	*	- ConnectClient.PromptFile
	*	- ConnectClient.TaskTemplate
	*	- ConnectClient.TrafficDistribution
	*	- ConnectClient.AgentStatuses
	*	- ConnectClient.AnalyticsDataAssociations
	*	- ConnectClient.AnalyticsDataLakeDataSets
	*	- ConnectClient.ApprovedOrigins
	*	- ConnectClient.AssociatedContacts
	*	- ConnectClient.AuthenticationProfiles
	*	- ConnectClient.Bots
	*	- ConnectClient.ContactEvaluations
	*	- ConnectClient.ContactFlowModules
	*	- ConnectClient.ContactFlowVersions
	*	- ConnectClient.ContactFlows
	*	- ConnectClient.ContactReferences
	*	- ConnectClient.DefaultVocabularies
	*	- ConnectClient.EvaluationFormVersions
	*	- ConnectClient.EvaluationForms
	*	- ConnectClient.FlowAssociations
	*	- ConnectClient.HoursOfOperationOverrides
	*	- ConnectClient.HoursOfOperations
	*	- ConnectClient.InstanceAttributes
	*	- ConnectClient.InstanceStorageConfigs
	*	- ConnectClient.Instances
	*	- ConnectClient.IntegrationAssociations
	*	- ConnectClient.LambdaFunctions
	*	- ConnectClient.LexBots
	*	- ConnectClient.PhoneNumbers
	*	- ConnectClient.PhoneNumbersV2
	*	- ConnectClient.PredefinedAttributes
	*	- ConnectClient.Prompts
	*	- ConnectClient.QueueQuickConnects
	*	- ConnectClient.Queues
	*	- ConnectClient.QuickConnects
	*	- ConnectClient.RealtimeContactAnalysisSegmentsV2
	*	- ConnectClient.RoutingProfileQueues
	*	- ConnectClient.RoutingProfiles
	*	- ConnectClient.Rules
	*	- ConnectClient.SecurityKeys
	*	- ConnectClient.SecurityProfileApplications
	*	- ConnectClient.SecurityProfilePermissions
	*	- ConnectClient.SecurityProfiles
	*	- ConnectClient.TagsForResource
	*	- ConnectClient.TaskTemplates
	*	- ConnectClient.TrafficDistributionGroupUsers
	*	- ConnectClient.TrafficDistributionGroups
	*	- ConnectClient.UseCases
	*	- ConnectClient.UserHierarchyGroups
	*	- ConnectClient.UserProficiencies
	*	- ConnectClient.Users
	*	- ConnectClient.ViewVersions
	*	- ConnectClient.Views
	*	- ConnectCampaignsClient.Campaign
	*	- ConnectCampaignsClient.CampaignStateBatch
	*	- ConnectCampaignsClient.CampaignState
	*	- ConnectCampaignsClient.ConnectInstanceConfig
	*	- ConnectCampaignsClient.InstanceOnboardingJobStatus
	*	- ConnectCampaignsClient.Campaigns
	*	- ConnectCampaignsClient.TagsForResource
	*	- ConnectContactLensClient.RealtimeContactAnalysisSegments
	*	- ConnectParticipantClient.View
	*	- ConnectParticipantClient.Attachment
	*	- ConnectParticipantClient.AuthenticationUrl
	*	- ConnectParticipantClient.Transcript
	*	- CostExplorerClient.CostCategoryDefinition
	*	- CostExplorerClient.Anomalies
	*	- CostExplorerClient.AnomalyMonitors
	*	- CostExplorerClient.AnomalySubscriptions
	*	- CostExplorerClient.ApproximateUsageRecords
	*	- CostExplorerClient.CommitmentPurchaseAnalysis
	*	- CostExplorerClient.CostAndUsage
	*	- CostExplorerClient.CostAndUsageWithResources
	*	- CostExplorerClient.CostCategories
	*	- CostExplorerClient.CostForecast
	*	- CostExplorerClient.DimensionValues
	*	- CostExplorerClient.ReservationCoverage
	*	- CostExplorerClient.ReservationPurchaseRecommendation
	*	- CostExplorerClient.ReservationUtilization
	*	- CostExplorerClient.RightsizingRecommendation
	*	- CostExplorerClient.SavingsPlanPurchaseRecommendationDetails
	*	- CostExplorerClient.SavingsPlansCoverage
	*	- CostExplorerClient.SavingsPlansPurchaseRecommendation
	*	- CostExplorerClient.SavingsPlansUtilization
	*	- CostExplorerClient.SavingsPlansUtilizationDetails
	*	- CostExplorerClient.Tags
	*	- CostExplorerClient.UsageForecast
	*	- CostExplorerClient.CommitmentPurchaseAnalyses
	*	- CostExplorerClient.CostAllocationTagBackfillHistory
	*	- CostExplorerClient.CostAllocationTags
	*	- CostExplorerClient.CostCategoryDefinitions
	*	- CostExplorerClient.SavingsPlansPurchaseRecommendationGeneration
	*	- CostExplorerClient.TagsForResource
	*	- CustomerProfilesClient.AutoMergingPreview
	*	- CustomerProfilesClient.CalculatedAttributeDefinition
	*	- CustomerProfilesClient.CalculatedAttributeForProfile
	*	- CustomerProfilesClient.Domain
	*	- CustomerProfilesClient.EventStream
	*	- CustomerProfilesClient.EventTrigger
	*	- CustomerProfilesClient.IdentityResolutionJob
	*	- CustomerProfilesClient.Integration
	*	- CustomerProfilesClient.Matches
	*	- CustomerProfilesClient.ProfileObjectType
	*	- CustomerProfilesClient.ProfileObjectTypeTemplate
	*	- CustomerProfilesClient.SegmentDefinition
	*	- CustomerProfilesClient.SegmentEstimate
	*	- CustomerProfilesClient.SegmentMembership
	*	- CustomerProfilesClient.SegmentSnapshot
	*	- CustomerProfilesClient.SimilarProfiles
	*	- CustomerProfilesClient.Workflow
	*	- CustomerProfilesClient.WorkflowSteps
	*	- CustomerProfilesClient.AccountIntegrations
	*	- CustomerProfilesClient.CalculatedAttributeDefinitions
	*	- CustomerProfilesClient.CalculatedAttributesForProfile
	*	- CustomerProfilesClient.Domains
	*	- CustomerProfilesClient.EventStreams
	*	- CustomerProfilesClient.EventTriggers
	*	- CustomerProfilesClient.IdentityResolutionJobs
	*	- CustomerProfilesClient.Integrations
	*	- CustomerProfilesClient.ObjectTypeAttributes
	*	- CustomerProfilesClient.ProfileAttributeValues
	*	- CustomerProfilesClient.ProfileObjectTypeTemplates
	*	- CustomerProfilesClient.ProfileObjectTypes
	*	- CustomerProfilesClient.ProfileObjects
	*	- CustomerProfilesClient.RuleBasedMatches
	*	- CustomerProfilesClient.SegmentDefinitions
	*	- CustomerProfilesClient.TagsForResource
	*	- CustomerProfilesClient.Workflows
	*	- DataBrewClient.Dataset
	*	- DataBrewClient.Job
	*	- DataBrewClient.JobRun
	*	- DataBrewClient.Project
	*	- DataBrewClient.Recipe
	*	- DataBrewClient.Ruleset
	*	- DataBrewClient.Schedule
	*	- DataBrewClient.Datasets
	*	- DataBrewClient.JobRuns
	*	- DataBrewClient.Jobs
	*	- DataBrewClient.Projects
	*	- DataBrewClient.RecipeVersions
	*	- DataBrewClient.Recipes
	*	- DataBrewClient.Rulesets
	*	- DataBrewClient.Schedules
	*	- DataBrewClient.TagsForResource
	*	- DataExchangeClient.Asset
	*	- DataExchangeClient.DataGrant
	*	- DataExchangeClient.DataSet
	*	- DataExchangeClient.EventAction
	*	- DataExchangeClient.Job
	*	- DataExchangeClient.ReceivedDataGrant
	*	- DataExchangeClient.Revision
	*	- DataExchangeClient.DataGrants
	*	- DataExchangeClient.DataSetRevisions
	*	- DataExchangeClient.DataSets
	*	- DataExchangeClient.EventActions
	*	- DataExchangeClient.Jobs
	*	- DataExchangeClient.ReceivedDataGrants
	*	- DataExchangeClient.RevisionAssets
	*	- DataExchangeClient.TagsForResource
	*	- DataPipelineClient.Objects
	*	- DataPipelineClient.Pipelines
	*	- DataPipelineClient.PipelineDefinition
	*	- DataPipelineClient.Pipelines
	*	- DataSyncClient.Agent
	*	- DataSyncClient.DiscoveryJob
	*	- DataSyncClient.LocationAzureBlob
	*	- DataSyncClient.LocationEfs
	*	- DataSyncClient.LocationFsxLustre
	*	- DataSyncClient.LocationFsxOntap
	*	- DataSyncClient.LocationFsxOpenZfs
	*	- DataSyncClient.LocationFsxWindows
	*	- DataSyncClient.LocationHdfs
	*	- DataSyncClient.LocationNfs
	*	- DataSyncClient.LocationObjectStorage
	*	- DataSyncClient.LocationS3
	*	- DataSyncClient.LocationSmb
	*	- DataSyncClient.StorageSystem
	*	- DataSyncClient.StorageSystemResourceMetrics
	*	- DataSyncClient.StorageSystemResources
	*	- DataSyncClient.Task
	*	- DataSyncClient.TaskExecution
	*	- DataSyncClient.Agents
	*	- DataSyncClient.DiscoveryJobs
	*	- DataSyncClient.Locations
	*	- DataSyncClient.StorageSystems
	*	- DataSyncClient.TagsForResource
	*	- DataSyncClient.TaskExecutions
	*	- DataSyncClient.Tasks
	*	- DAXClient.Clusters
	*	- DAXClient.DefaultParameters
	*	- DAXClient.Events
	*	- DAXClient.ParameterGroups
	*	- DAXClient.Parameters
	*	- DAXClient.SubnetGroups
	*	- DAXClient.Tags
	*	- DetectiveClient.OrganizationConfiguration
	*	- DetectiveClient.Investigation
	*	- DetectiveClient.Members
	*	- DetectiveClient.DatasourcePackages
	*	- DetectiveClient.Graphs
	*	- DetectiveClient.Indicators
	*	- DetectiveClient.Investigations
	*	- DetectiveClient.Invitations
	*	- DetectiveClient.Members
	*	- DetectiveClient.OrganizationAdminAccounts
	*	- DetectiveClient.TagsForResource
	*	- DeviceFarmClient.AccountSettings
	*	- DeviceFarmClient.Device
	*	- DeviceFarmClient.DeviceInstance
	*	- DeviceFarmClient.DevicePool
	*	- DeviceFarmClient.DevicePoolCompatibility
	*	- DeviceFarmClient.InstanceProfile
	*	- DeviceFarmClient.Job
	*	- DeviceFarmClient.NetworkProfile
	*	- DeviceFarmClient.OfferingStatus
	*	- DeviceFarmClient.Project
	*	- DeviceFarmClient.RemoteAccessSession
	*	- DeviceFarmClient.Run
	*	- DeviceFarmClient.Suite
	*	- DeviceFarmClient.Test
	*	- DeviceFarmClient.TestGridProject
	*	- DeviceFarmClient.TestGridSession
	*	- DeviceFarmClient.Upload
	*	- DeviceFarmClient.VPCEConfiguration
	*	- DeviceFarmClient.Artifacts
	*	- DeviceFarmClient.DeviceInstances
	*	- DeviceFarmClient.DevicePools
	*	- DeviceFarmClient.Devices
	*	- DeviceFarmClient.InstanceProfiles
	*	- DeviceFarmClient.Jobs
	*	- DeviceFarmClient.NetworkProfiles
	*	- DeviceFarmClient.OfferingPromotions
	*	- DeviceFarmClient.OfferingTransactions
	*	- DeviceFarmClient.Offerings
	*	- DeviceFarmClient.Projects
	*	- DeviceFarmClient.RemoteAccessSessions
	*	- DeviceFarmClient.Runs
	*	- DeviceFarmClient.Samples
	*	- DeviceFarmClient.Suites
	*	- DeviceFarmClient.TagsForResource
	*	- DeviceFarmClient.TestGridProjects
	*	- DeviceFarmClient.TestGridSessionActions
	*	- DeviceFarmClient.TestGridSessionArtifacts
	*	- DeviceFarmClient.TestGridSessions
	*	- DeviceFarmClient.Tests
	*	- DeviceFarmClient.UniqueProblems
	*	- DeviceFarmClient.Uploads
	*	- DeviceFarmClient.VPCEConfigurations
	*	- DevOpsGuruClient.AccountHealth
	*	- DevOpsGuruClient.AccountOverview
	*	- DevOpsGuruClient.Anomaly
	*	- DevOpsGuruClient.EventSourcesConfig
	*	- DevOpsGuruClient.Feedback
	*	- DevOpsGuruClient.Insight
	*	- DevOpsGuruClient.OrganizationHealth
	*	- DevOpsGuruClient.OrganizationOverview
	*	- DevOpsGuruClient.OrganizationResourceCollectionHealth
	*	- DevOpsGuruClient.ResourceCollectionHealth
	*	- DevOpsGuruClient.ServiceIntegration
	*	- DevOpsGuruClient.CostEstimation
	*	- DevOpsGuruClient.ResourceCollection
	*	- DevOpsGuruClient.AnomaliesForInsight
	*	- DevOpsGuruClient.AnomalousLogGroups
	*	- DevOpsGuruClient.Events
	*	- DevOpsGuruClient.Insights
	*	- DevOpsGuruClient.MonitoredResources
	*	- DevOpsGuruClient.NotificationChannels
	*	- DevOpsGuruClient.OrganizationInsights
	*	- DevOpsGuruClient.Recommendations
	*	- DirectConnectClient.ConnectionLoa
	*	- DirectConnectClient.Connections
	*	- DirectConnectClient.ConnectionsOnInterconnect
	*	- DirectConnectClient.CustomerMetadata
	*	- DirectConnectClient.DirectConnectGatewayAssociationProposals
	*	- DirectConnectClient.DirectConnectGatewayAssociations
	*	- DirectConnectClient.DirectConnectGatewayAttachments
	*	- DirectConnectClient.DirectConnectGateways
	*	- DirectConnectClient.HostedConnections
	*	- DirectConnectClient.InterconnectLoa
	*	- DirectConnectClient.Interconnects
	*	- DirectConnectClient.Lags
	*	- DirectConnectClient.Loa
	*	- DirectConnectClient.Locations
	*	- DirectConnectClient.RouterConfiguration
	*	- DirectConnectClient.Tags
	*	- DirectConnectClient.VirtualGateways
	*	- DirectConnectClient.VirtualInterfaces
	*	- DirectConnectClient.VirtualInterfaceTestHistory
	*	- DLMClient.LifecyclePolicies
	*	- DLMClient.LifecyclePolicy
	*	- DLMClient.TagsForResource
	*	- DocDBClient.Certificates
	*	- DocDBClient.DBClusterParameterGroups
	*	- DocDBClient.DBClusterParameters
	*	- DocDBClient.DBClusterSnapshotAttributes
	*	- DocDBClient.DBClusterSnapshots
	*	- DocDBClient.DBClusters
	*	- DocDBClient.DBEngineVersions
	*	- DocDBClient.DBInstances
	*	- DocDBClient.DBSubnetGroups
	*	- DocDBClient.EngineDefaultClusterParameters
	*	- DocDBClient.EventCategories
	*	- DocDBClient.EventSubscriptions
	*	- DocDBClient.Events
	*	- DocDBClient.GlobalClusters
	*	- DocDBClient.OrderableDBInstanceOptions
	*	- DocDBClient.PendingMaintenanceActions
	*	- DocDBClient.TagsForResource
	*	- DrsClient.JobLogItems
	*	- DrsClient.Jobs
	*	- DrsClient.LaunchConfigurationTemplates
	*	- DrsClient.RecoveryInstances
	*	- DrsClient.RecoverySnapshots
	*	- DrsClient.ReplicationConfigurationTemplates
	*	- DrsClient.SourceNetworks
	*	- DrsClient.SourceServers
	*	- DrsClient.FailbackReplicationConfiguration
	*	- DrsClient.LaunchConfiguration
	*	- DrsClient.ReplicationConfiguration
	*	- DrsClient.ExtensibleSourceServers
	*	- DrsClient.LaunchActions
	*	- DrsClient.StagingAccounts
	*	- DrsClient.TagsForResource
	*	- DynamoDBClient.Backup
	*	- DynamoDBClient.ContinuousBackups
	*	- DynamoDBClient.ContributorInsights
	*	- DynamoDBClient.Endpoints
	*	- DynamoDBClient.Export
	*	- DynamoDBClient.GlobalTable
	*	- DynamoDBClient.GlobalTableSettings
	*	- DynamoDBClient.Import
	*	- DynamoDBClient.KinesisStreamingDestination
	*	- DynamoDBClient.Limits
	*	- DynamoDBClient.Table
	*	- DynamoDBClient.TableReplicaAutoScaling
	*	- DynamoDBClient.TimeToLive
	*	- DynamoDBClient.Item
	*	- DynamoDBClient.ResourcePolicy
	*	- DynamoDBClient.Backups
	*	- DynamoDBClient.ContributorInsights
	*	- DynamoDBClient.Exports
	*	- DynamoDBClient.GlobalTables
	*	- DynamoDBClient.Imports
	*	- DynamoDBClient.Tables
	*	- DynamoDBClient.TagsOfResource
	*	- DynamoDBStreamsClient.Stream
	*	- DynamoDBStreamsClient.Records
	*	- DynamoDBStreamsClient.ShardIterator
	*	- DynamoDBStreamsClient.Streams
	*	- EBSClient.SnapshotBlock
	*	- EBSClient.ChangedBlocks
	*	- EBSClient.SnapshotBlocks
	*	- EC2Client.AccountAttributes
	*	- EC2Client.AddressTransfers
	*	- EC2Client.AddressesAttribute
	*	- EC2Client.Addresses
	*	- EC2Client.AggregateIdFormat
	*	- EC2Client.AvailabilityZones
	*	- EC2Client.AwsNetworkPerformanceMetricSubscriptions
	*	- EC2Client.BundleTasks
	*	- EC2Client.ByoipCidrs
	*	- EC2Client.CapacityBlockExtensionHistory
	*	- EC2Client.CapacityBlockExtensionOfferings
	*	- EC2Client.CapacityBlockOfferings
	*	- EC2Client.CapacityReservationBillingRequests
	*	- EC2Client.CapacityReservationFleets
	*	- EC2Client.CapacityReservations
	*	- EC2Client.CarrierGateways
	*	- EC2Client.ClassicLinkInstances
	*	- EC2Client.ClientVpnAuthorizationRules
	*	- EC2Client.ClientVpnConnections
	*	- EC2Client.ClientVpnEndpoints
	*	- EC2Client.ClientVpnRoutes
	*	- EC2Client.ClientVpnTargetNetworks
	*	- EC2Client.CoipPools
	*	- EC2Client.ConversionTasks
	*	- EC2Client.CustomerGateways
	*	- EC2Client.DeclarativePoliciesReports
	*	- EC2Client.DhcpOptions
	*	- EC2Client.EgressOnlyInternetGateways
	*	- EC2Client.ElasticGpus
	*	- EC2Client.ExportImageTasks
	*	- EC2Client.ExportTasks
	*	- EC2Client.FastLaunchImages
	*	- EC2Client.FastSnapshotRestores
	*	- EC2Client.FleetHistory
	*	- EC2Client.FleetInstances
	*	- EC2Client.Fleets
	*	- EC2Client.FlowLogs
	*	- EC2Client.FpgaImageAttribute
	*	- EC2Client.FpgaImages
	*	- EC2Client.HostReservationOfferings
	*	- EC2Client.HostReservations
	*	- EC2Client.Hosts
	*	- EC2Client.IamInstanceProfileAssociations
	*	- EC2Client.IdFormat
	*	- EC2Client.IdentityIdFormat
	*	- EC2Client.ImageAttribute
	*	- EC2Client.Images
	*	- EC2Client.ImportImageTasks
	*	- EC2Client.ImportSnapshotTasks
	*	- EC2Client.InstanceAttribute
	*	- EC2Client.InstanceConnectEndpoints
	*	- EC2Client.InstanceCreditSpecifications
	*	- EC2Client.InstanceEventNotificationAttributes
	*	- EC2Client.InstanceEventWindows
	*	- EC2Client.InstanceImageMetadata
	*	- EC2Client.InstanceStatus
	*	- EC2Client.InstanceTopology
	*	- EC2Client.InstanceTypeOfferings
	*	- EC2Client.InstanceTypes
	*	- EC2Client.Instances
	*	- EC2Client.InternetGateways
	*	- EC2Client.IpamByoasn
	*	- EC2Client.IpamExternalResourceVerificationTokens
	*	- EC2Client.IpamPools
	*	- EC2Client.IpamResourceDiscoveries
	*	- EC2Client.IpamResourceDiscoveryAssociations
	*	- EC2Client.IpamScopes
	*	- EC2Client.Ipams
	*	- EC2Client.Ipv6Pools
	*	- EC2Client.KeyPairs
	*	- EC2Client.LaunchTemplateVersions
	*	- EC2Client.LaunchTemplates
	*	- EC2Client.LocalGatewayRouteTableVirtualInterfaceGroupAssociations
	*	- EC2Client.LocalGatewayRouteTableVpcAssociations
	*	- EC2Client.LocalGatewayRouteTables
	*	- EC2Client.LocalGatewayVirtualInterfaceGroups
	*	- EC2Client.LocalGatewayVirtualInterfaces
	*	- EC2Client.LocalGateways
	*	- EC2Client.LockedSnapshots
	*	- EC2Client.MacHosts
	*	- EC2Client.ManagedPrefixLists
	*	- EC2Client.MovingAddresses
	*	- EC2Client.NatGateways
	*	- EC2Client.NetworkAcls
	*	- EC2Client.NetworkInsightsAccessScopeAnalyses
	*	- EC2Client.NetworkInsightsAccessScopes
	*	- EC2Client.NetworkInsightsAnalyses
	*	- EC2Client.NetworkInsightsPaths
	*	- EC2Client.NetworkInterfaceAttribute
	*	- EC2Client.NetworkInterfacePermissions
	*	- EC2Client.NetworkInterfaces
	*	- EC2Client.PlacementGroups
	*	- EC2Client.PrefixLists
	*	- EC2Client.PrincipalIdFormat
	*	- EC2Client.PublicIpv4Pools
	*	- EC2Client.Regions
	*	- EC2Client.ReplaceRootVolumeTasks
	*	- EC2Client.ReservedInstances
	*	- EC2Client.ReservedInstancesListings
	*	- EC2Client.ReservedInstancesModifications
	*	- EC2Client.ReservedInstancesOfferings
	*	- EC2Client.RouteServerEndpoints
	*	- EC2Client.RouteServerPeers
	*	- EC2Client.RouteServers
	*	- EC2Client.RouteTables
	*	- EC2Client.ScheduledInstanceAvailability
	*	- EC2Client.ScheduledInstances
	*	- EC2Client.SecurityGroupReferences
	*	- EC2Client.SecurityGroupRules
	*	- EC2Client.SecurityGroupVpcAssociations
	*	- EC2Client.SecurityGroups
	*	- EC2Client.SnapshotAttribute
	*	- EC2Client.SnapshotTierStatus
	*	- EC2Client.Snapshots
	*	- EC2Client.SpotDatafeedSubscription
	*	- EC2Client.SpotFleetInstances
	*	- EC2Client.SpotFleetRequestHistory
	*	- EC2Client.SpotFleetRequests
	*	- EC2Client.SpotInstanceRequests
	*	- EC2Client.SpotPriceHistory
	*	- EC2Client.StaleSecurityGroups
	*	- EC2Client.StoreImageTasks
	*	- EC2Client.Subnets
	*	- EC2Client.Tags
	*	- EC2Client.TrafficMirrorFilterRules
	*	- EC2Client.TrafficMirrorFilters
	*	- EC2Client.TrafficMirrorSessions
	*	- EC2Client.TrafficMirrorTargets
	*	- EC2Client.TransitGatewayAttachments
	*	- EC2Client.TransitGatewayConnectPeers
	*	- EC2Client.TransitGatewayConnects
	*	- EC2Client.TransitGatewayMulticastDomains
	*	- EC2Client.TransitGatewayPeeringAttachments
	*	- EC2Client.TransitGatewayPolicyTables
	*	- EC2Client.TransitGatewayRouteTableAnnouncements
	*	- EC2Client.TransitGatewayRouteTables
	*	- EC2Client.TransitGatewayVpcAttachments
	*	- EC2Client.TransitGateways
	*	- EC2Client.TrunkInterfaceAssociations
	*	- EC2Client.VerifiedAccessEndpoints
	*	- EC2Client.VerifiedAccessGroups
	*	- EC2Client.VerifiedAccessInstanceLoggingConfigurations
	*	- EC2Client.VerifiedAccessInstances
	*	- EC2Client.VerifiedAccessTrustProviders
	*	- EC2Client.VolumeAttribute
	*	- EC2Client.VolumeStatus
	*	- EC2Client.Volumes
	*	- EC2Client.VolumesModifications
	*	- EC2Client.VpcAttribute
	*	- EC2Client.VpcBlockPublicAccessExclusions
	*	- EC2Client.VpcBlockPublicAccessOptions
	*	- EC2Client.VpcClassicLink
	*	- EC2Client.VpcClassicLinkDnsSupport
	*	- EC2Client.VpcEndpointAssociations
	*	- EC2Client.VpcEndpointConnectionNotifications
	*	- EC2Client.VpcEndpointConnections
	*	- EC2Client.VpcEndpointServiceConfigurations
	*	- EC2Client.VpcEndpointServicePermissions
	*	- EC2Client.VpcEndpointServices
	*	- EC2Client.VpcEndpoints
	*	- EC2Client.VpcPeeringConnections
	*	- EC2Client.Vpcs
	*	- EC2Client.VpnConnections
	*	- EC2Client.VpnGateways
	*	- EC2Client.AllowedImagesSettings
	*	- EC2Client.AssociatedEnclaveCertificateIamRoles
	*	- EC2Client.AssociatedIpv6PoolCidrs
	*	- EC2Client.AwsNetworkPerformanceData
	*	- EC2Client.CapacityReservationUsage
	*	- EC2Client.CoipPoolUsage
	*	- EC2Client.ConsoleOutput
	*	- EC2Client.ConsoleScreenshot
	*	- EC2Client.DeclarativePoliciesReportSummary
	*	- EC2Client.DefaultCreditSpecification
	*	- EC2Client.EbsDefaultKmsKeyId
	*	- EC2Client.EbsEncryptionByDefault
	*	- EC2Client.FlowLogsIntegrationTemplate
	*	- EC2Client.GroupsForCapacityReservation
	*	- EC2Client.HostReservationPurchasePreview
	*	- EC2Client.ImageBlockPublicAccessState
	*	- EC2Client.InstanceMetadataDefaults
	*	- EC2Client.InstanceTpmEkPub
	*	- EC2Client.InstanceTypesFromInstanceRequirements
	*	- EC2Client.InstanceUefiData
	*	- EC2Client.IpamAddressHistory
	*	- EC2Client.IpamDiscoveredAccounts
	*	- EC2Client.IpamDiscoveredPublicAddresses
	*	- EC2Client.IpamDiscoveredResourceCidrs
	*	- EC2Client.IpamPoolAllocations
	*	- EC2Client.IpamPoolCidrs
	*	- EC2Client.IpamResourceCidrs
	*	- EC2Client.LaunchTemplateData
	*	- EC2Client.ManagedPrefixListAssociations
	*	- EC2Client.ManagedPrefixListEntries
	*	- EC2Client.NetworkInsightsAccessScopeAnalysisFindings
	*	- EC2Client.NetworkInsightsAccessScopeContent
	*	- EC2Client.PasswordData
	*	- EC2Client.ReservedInstancesExchangeQuote
	*	- EC2Client.RouteServerAssociations
	*	- EC2Client.RouteServerPropagations
	*	- EC2Client.RouteServerRoutingDatabase
	*	- EC2Client.SecurityGroupsForVpc
	*	- EC2Client.SerialConsoleAccessStatus
	*	- EC2Client.SnapshotBlockPublicAccessState
	*	- EC2Client.SpotPlacementScores
	*	- EC2Client.SubnetCidrReservations
	*	- EC2Client.TransitGatewayAttachmentPropagations
	*	- EC2Client.TransitGatewayMulticastDomainAssociations
	*	- EC2Client.TransitGatewayPolicyTableAssociations
	*	- EC2Client.TransitGatewayPolicyTableEntries
	*	- EC2Client.TransitGatewayPrefixListReferences
	*	- EC2Client.TransitGatewayRouteTableAssociations
	*	- EC2Client.TransitGatewayRouteTablePropagations
	*	- EC2Client.VerifiedAccessEndpointPolicy
	*	- EC2Client.VerifiedAccessEndpointTargets
	*	- EC2Client.VerifiedAccessGroupPolicy
	*	- EC2Client.VpnConnectionDeviceSampleConfiguration
	*	- EC2Client.VpnConnectionDeviceTypes
	*	- EC2Client.VpnTunnelReplacementStatus
	*	- EC2Client.ImagesInRecycleBin
	*	- EC2Client.SnapshotsInRecycleBin
	*	- ECRClient.ImageReplicationStatus
	*	- ECRClient.ImageScanFindings
	*	- ECRClient.Images
	*	- ECRClient.PullThroughCacheRules
	*	- ECRClient.Registry
	*	- ECRClient.Repositories
	*	- ECRClient.RepositoryCreationTemplates
	*	- ECRClient.AccountSetting
	*	- ECRClient.AuthorizationToken
	*	- ECRClient.DownloadUrlForLayer
	*	- ECRClient.LifecyclePolicy
	*	- ECRClient.LifecyclePolicyPreview
	*	- ECRClient.RegistryPolicy
	*	- ECRClient.RegistryScanningConfiguration
	*	- ECRClient.RepositoryPolicy
	*	- ECRClient.Images
	*	- ECRClient.TagsForResource
	*	- ECRPUBLICClient.ImageTags
	*	- ECRPUBLICClient.Images
	*	- ECRPUBLICClient.Registries
	*	- ECRPUBLICClient.Repositories
	*	- ECRPUBLICClient.AuthorizationToken
	*	- ECRPUBLICClient.RegistryCatalogData
	*	- ECRPUBLICClient.RepositoryCatalogData
	*	- ECRPUBLICClient.RepositoryPolicy
	*	- ECRPUBLICClient.TagsForResource
	*	- ECSClient.CapacityProviders
	*	- ECSClient.Clusters
	*	- ECSClient.ContainerInstances
	*	- ECSClient.ServiceDeployments
	*	- ECSClient.ServiceRevisions
	*	- ECSClient.Services
	*	- ECSClient.TaskDefinition
	*	- ECSClient.TaskSets
	*	- ECSClient.Tasks
	*	- ECSClient.TaskProtection
	*	- ECSClient.AccountSettings
	*	- ECSClient.Attributes
	*	- ECSClient.Clusters
	*	- ECSClient.ContainerInstances
	*	- ECSClient.ServiceDeployments
	*	- ECSClient.ServicesByNamespace
	*	- ECSClient.Services
	*	- ECSClient.TagsForResource
	*	- ECSClient.TaskDefinitionFamilies
	*	- ECSClient.TaskDefinitions
	*	- ECSClient.Tasks
	*	- EFSClient.AccessPoints
	*	- EFSClient.AccountPreferences
	*	- EFSClient.BackupPolicy
	*	- EFSClient.FileSystemPolicy
	*	- EFSClient.FileSystems
	*	- EFSClient.LifecycleConfiguration
	*	- EFSClient.MountTargetSecurityGroups
	*	- EFSClient.MountTargets
	*	- EFSClient.ReplicationConfigurations
	*	- EFSClient.Tags
	*	- EFSClient.TagsForResource
	*	- EKSClient.AccessEntry
	*	- EKSClient.Addon
	*	- EKSClient.AddonConfiguration
	*	- EKSClient.AddonVersions
	*	- EKSClient.Cluster
	*	- EKSClient.ClusterVersions
	*	- EKSClient.EksAnywhereSubscription
	*	- EKSClient.FargateProfile
	*	- EKSClient.IdentityProviderConfig
	*	- EKSClient.Insight
	*	- EKSClient.Nodegroup
	*	- EKSClient.PodIdentityAssociation
	*	- EKSClient.Update
	*	- EKSClient.AccessEntries
	*	- EKSClient.AccessPolicies
	*	- EKSClient.Addons
	*	- EKSClient.AssociatedAccessPolicies
	*	- EKSClient.Clusters
	*	- EKSClient.EksAnywhereSubscriptions
	*	- EKSClient.FargateProfiles
	*	- EKSClient.IdentityProviderConfigs
	*	- EKSClient.Insights
	*	- EKSClient.Nodegroups
	*	- EKSClient.PodIdentityAssociations
	*	- EKSClient.TagsForResource
	*	- EKSClient.Updates
	*	- ElastiCacheClient.CacheClusters
	*	- ElastiCacheClient.CacheEngineVersions
	*	- ElastiCacheClient.CacheParameterGroups
	*	- ElastiCacheClient.CacheParameters
	*	- ElastiCacheClient.CacheSecurityGroups
	*	- ElastiCacheClient.CacheSubnetGroups
	*	- ElastiCacheClient.EngineDefaultParameters
	*	- ElastiCacheClient.Events
	*	- ElastiCacheClient.GlobalReplicationGroups
	*	- ElastiCacheClient.ReplicationGroups
	*	- ElastiCacheClient.ReservedCacheNodes
	*	- ElastiCacheClient.ReservedCacheNodesOfferings
	*	- ElastiCacheClient.ServerlessCacheSnapshots
	*	- ElastiCacheClient.ServerlessCaches
	*	- ElastiCacheClient.ServiceUpdates
	*	- ElastiCacheClient.Snapshots
	*	- ElastiCacheClient.UpdateActions
	*	- ElastiCacheClient.UserGroups
	*	- ElastiCacheClient.Users
	*	- ElastiCacheClient.AllowedNodeTypeModifications
	*	- ElastiCacheClient.TagsForResource
	*	- ElasticBeanstalkClient.AccountAttributes
	*	- ElasticBeanstalkClient.ApplicationVersions
	*	- ElasticBeanstalkClient.Applications
	*	- ElasticBeanstalkClient.ConfigurationOptions
	*	- ElasticBeanstalkClient.ConfigurationSettings
	*	- ElasticBeanstalkClient.EnvironmentHealth
	*	- ElasticBeanstalkClient.EnvironmentManagedActionHistory
	*	- ElasticBeanstalkClient.EnvironmentManagedActions
	*	- ElasticBeanstalkClient.EnvironmentResources
	*	- ElasticBeanstalkClient.Environments
	*	- ElasticBeanstalkClient.Events
	*	- ElasticBeanstalkClient.InstancesHealth
	*	- ElasticBeanstalkClient.PlatformVersion
	*	- ElasticBeanstalkClient.AvailableSolutionStacks
	*	- ElasticBeanstalkClient.PlatformBranches
	*	- ElasticBeanstalkClient.PlatformVersions
	*	- ElasticBeanstalkClient.TagsForResource
	*	- ElasticInferenceClient.AcceleratorOfferings
	*	- ElasticInferenceClient.AcceleratorTypes
	*	- ElasticInferenceClient.Accelerators
	*	- ElasticInferenceClient.TagsForResource
	*	- ElasticLoadBalancingClient.AccountLimits
	*	- ElasticLoadBalancingClient.InstanceHealth
	*	- ElasticLoadBalancingClient.LoadBalancerAttributes
	*	- ElasticLoadBalancingClient.LoadBalancerPolicies
	*	- ElasticLoadBalancingClient.LoadBalancerPolicyTypes
	*	- ElasticLoadBalancingClient.LoadBalancers
	*	- ElasticLoadBalancingClient.Tags
	*	- ElasticTranscoderClient.JobsByPipeline
	*	- ElasticTranscoderClient.JobsByStatus
	*	- ElasticTranscoderClient.Pipelines
	*	- ElasticTranscoderClient.Presets
	*	- EMRClient.Cluster
	*	- EMRClient.JobFlows
	*	- EMRClient.NotebookExecution
	*	- EMRClient.ReleaseLabel
	*	- EMRClient.SecurityConfiguration
	*	- EMRClient.Step
	*	- EMRClient.Studio
	*	- EMRClient.AutoTerminationPolicy
	*	- EMRClient.BlockPublicAccessConfiguration
	*	- EMRClient.ClusterSessionCredentials
	*	- EMRClient.ManagedScalingPolicy
	*	- EMRClient.StudioSessionMapping
	*	- EMRClient.BootstrapActions
	*	- EMRClient.Clusters
	*	- EMRClient.InstanceFleets
	*	- EMRClient.InstanceGroups
	*	- EMRClient.Instances
	*	- EMRClient.NotebookExecutions
	*	- EMRClient.ReleaseLabels
	*	- EMRClient.SecurityConfigurations
	*	- EMRClient.Steps
	*	- EMRClient.StudioSessionMappings
	*	- EMRClient.Studios
	*	- EMRClient.SupportedInstanceTypes
	*	- EMRContainersClient.JobRun
	*	- EMRContainersClient.JobTemplate
	*	- EMRContainersClient.ManagedEndpoint
	*	- EMRContainersClient.SecurityConfiguration
	*	- EMRContainersClient.VirtualCluster
	*	- EMRContainersClient.ManagedEndpointSessionCredentials
	*	- EMRContainersClient.JobRuns
	*	- EMRContainersClient.JobTemplates
	*	- EMRContainersClient.ManagedEndpoints
	*	- EMRContainersClient.SecurityConfigurations
	*	- EMRContainersClient.TagsForResource
	*	- EMRContainersClient.VirtualClusters
	*	- EMRServerlessClient.Application
	*	- EMRServerlessClient.DashboardForJobRun
	*	- EMRServerlessClient.JobRun
	*	- EMRServerlessClient.Applications
	*	- EMRServerlessClient.JobRunAttempts
	*	- EMRServerlessClient.JobRuns
	*	- EMRServerlessClient.TagsForResource
	*	- EventBridgeClient.ApiDestination
	*	- EventBridgeClient.Archive
	*	- EventBridgeClient.Connection
	*	- EventBridgeClient.Endpoint
	*	- EventBridgeClient.EventBus
	*	- EventBridgeClient.EventSource
	*	- EventBridgeClient.PartnerEventSource
	*	- EventBridgeClient.Replay
	*	- EventBridgeClient.Rule
	*	- EventBridgeClient.ApiDestinations
	*	- EventBridgeClient.Archives
	*	- EventBridgeClient.Connections
	*	- EventBridgeClient.Endpoints
	*	- EventBridgeClient.EventBuses
	*	- EventBridgeClient.EventSources
	*	- EventBridgeClient.PartnerEventSourceAccounts
	*	- EventBridgeClient.PartnerEventSources
	*	- EventBridgeClient.Replays
	*	- EventBridgeClient.RuleNamesByTarget
	*	- EventBridgeClient.Rules
	*	- EventBridgeClient.TagsForResource
	*	- EventBridgeClient.TargetsByRule
	*	- EvidentlyClient.Experiment
	*	- EvidentlyClient.ExperimentResults
	*	- EvidentlyClient.Feature
	*	- EvidentlyClient.Launch
	*	- EvidentlyClient.Project
	*	- EvidentlyClient.Segment
	*	- EvidentlyClient.Experiments
	*	- EvidentlyClient.Features
	*	- EvidentlyClient.Launches
	*	- EvidentlyClient.Projects
	*	- EvidentlyClient.SegmentReferences
	*	- EvidentlyClient.Segments
	*	- EvidentlyClient.TagsForResource
	*	- FinspaceClient.Environment
	*	- FinspaceClient.KxChangeset
	*	- FinspaceClient.KxCluster
	*	- FinspaceClient.KxConnectionString
	*	- FinspaceClient.KxDatabase
	*	- FinspaceClient.KxDataview
	*	- FinspaceClient.KxEnvironment
	*	- FinspaceClient.KxScalingGroup
	*	- FinspaceClient.KxUser
	*	- FinspaceClient.KxVolume
	*	- FinspaceClient.Environments
	*	- FinspaceClient.KxChangesets
	*	- FinspaceClient.KxClusterNodes
	*	- FinspaceClient.KxClusters
	*	- FinspaceClient.KxDatabases
	*	- FinspaceClient.KxDataviews
	*	- FinspaceClient.KxEnvironments
	*	- FinspaceClient.KxScalingGroups
	*	- FinspaceClient.KxUsers
	*	- FinspaceClient.KxVolumes
	*	- FinspaceClient.TagsForResource
	*	- FirehoseClient.DeliveryStream
	*	- FirehoseClient.DeliveryStreams
	*	- FirehoseClient.TagsForDeliveryStream
	*	- FisClient.Action
	*	- FisClient.Experiment
	*	- FisClient.ExperimentTargetAccountConfiguration
	*	- FisClient.ExperimentTemplate
	*	- FisClient.SafetyLever
	*	- FisClient.TargetAccountConfiguration
	*	- FisClient.TargetResourceType
	*	- FisClient.Actions
	*	- FisClient.ExperimentResolvedTargets
	*	- FisClient.ExperimentTargetAccountConfigurations
	*	- FisClient.ExperimentTemplates
	*	- FisClient.Experiments
	*	- FisClient.TagsForResource
	*	- FisClient.TargetAccountConfigurations
	*	- FisClient.TargetResourceTypes
	*	- FMSClient.AdminAccount
	*	- FMSClient.AdminScope
	*	- FMSClient.AppsList
	*	- FMSClient.ComplianceDetail
	*	- FMSClient.NotificationChannel
	*	- FMSClient.Policy
	*	- FMSClient.ProtectionStatus
	*	- FMSClient.ProtocolsList
	*	- FMSClient.ResourceSet
	*	- FMSClient.ThirdPartyFirewallAssociationStatus
	*	- FMSClient.ViolationDetails
	*	- FMSClient.AdminAccountsForOrganization
	*	- FMSClient.AdminsManagingAccount
	*	- FMSClient.AppsLists
	*	- FMSClient.ComplianceStatus
	*	- FMSClient.DiscoveredResources
	*	- FMSClient.MemberAccounts
	*	- FMSClient.Policies
	*	- FMSClient.ProtocolsLists
	*	- FMSClient.ResourceSetResources
	*	- FMSClient.ResourceSets
	*	- FMSClient.TagsForResource
	*	- FMSClient.ThirdPartyFirewallFirewallPolicies
	*	- ForecastClient.AutoPredictor
	*	- ForecastClient.Dataset
	*	- ForecastClient.DatasetGroup
	*	- ForecastClient.DatasetImportJob
	*	- ForecastClient.Explainability
	*	- ForecastClient.ExplainabilityExport
	*	- ForecastClient.Forecast
	*	- ForecastClient.ForecastExportJob
	*	- ForecastClient.Monitor
	*	- ForecastClient.PredictorBacktestExportJob
	*	- ForecastClient.Predictor
	*	- ForecastClient.WhatIfAnalysis
	*	- ForecastClient.WhatIfForecast
	*	- ForecastClient.WhatIfForecastExport
	*	- ForecastClient.AccuracyMetrics
	*	- ForecastClient.DatasetGroups
	*	- ForecastClient.DatasetImportJobs
	*	- ForecastClient.Datasets
	*	- ForecastClient.Explainabilities
	*	- ForecastClient.ExplainabilityExports
	*	- ForecastClient.ForecastExportJobs
	*	- ForecastClient.Forecasts
	*	- ForecastClient.MonitorEvaluations
	*	- ForecastClient.Monitors
	*	- ForecastClient.PredictorBacktestExportJobs
	*	- ForecastClient.Predictors
	*	- ForecastClient.TagsForResource
	*	- ForecastClient.WhatIfAnalyses
	*	- ForecastClient.WhatIfForecastExports
	*	- ForecastClient.WhatIfForecasts
	*	- FraudDetectorClient.Detector
	*	- FraudDetectorClient.ModelVersions
	*	- FraudDetectorClient.BatchImportJobs
	*	- FraudDetectorClient.BatchPredictionJobs
	*	- FraudDetectorClient.DeleteEventsByEventTypeStatus
	*	- FraudDetectorClient.DetectorVersion
	*	- FraudDetectorClient.Detectors
	*	- FraudDetectorClient.EntityTypes
	*	- FraudDetectorClient.Event
	*	- FraudDetectorClient.EventPrediction
	*	- FraudDetectorClient.EventPredictionMetadata
	*	- FraudDetectorClient.EventTypes
	*	- FraudDetectorClient.ExternalModels
	*	- FraudDetectorClient.KMSEncryptionKey
	*	- FraudDetectorClient.Labels
	*	- FraudDetectorClient.ListElements
	*	- FraudDetectorClient.ListsMetadata
	*	- FraudDetectorClient.ModelVersion
	*	- FraudDetectorClient.Models
	*	- FraudDetectorClient.Outcomes
	*	- FraudDetectorClient.Rules
	*	- FraudDetectorClient.Variables
	*	- FraudDetectorClient.EventPredictions
	*	- FraudDetectorClient.TagsForResource
	*	- FSxClient.Backups
	*	- FSxClient.DataRepositoryAssociations
	*	- FSxClient.DataRepositoryTasks
	*	- FSxClient.FileCaches
	*	- FSxClient.FileSystemAliases
	*	- FSxClient.FileSystems
	*	- FSxClient.SharedVpcConfiguration
	*	- FSxClient.Snapshots
	*	- FSxClient.StorageVirtualMachines
	*	- FSxClient.Volumes
	*	- FSxClient.TagsForResource
	*	- GameLiftClient.Alias
	*	- GameLiftClient.Build
	*	- GameLiftClient.Compute
	*	- GameLiftClient.ContainerFleet
	*	- GameLiftClient.ContainerGroupDefinition
	*	- GameLiftClient.EC2InstanceLimits
	*	- GameLiftClient.FleetAttributes
	*	- GameLiftClient.FleetCapacity
	*	- GameLiftClient.FleetDeployment
	*	- GameLiftClient.FleetEvents
	*	- GameLiftClient.FleetLocationAttributes
	*	- GameLiftClient.FleetLocationCapacity
	*	- GameLiftClient.FleetLocationUtilization
	*	- GameLiftClient.FleetPortSettings
	*	- GameLiftClient.FleetUtilization
	*	- GameLiftClient.GameServer
	*	- GameLiftClient.GameServerGroup
	*	- GameLiftClient.GameServerInstances
	*	- GameLiftClient.GameSessionDetails
	*	- GameLiftClient.GameSessionPlacement
	*	- GameLiftClient.GameSessionQueues
	*	- GameLiftClient.GameSessions
	*	- GameLiftClient.Instances
	*	- GameLiftClient.Matchmaking
	*	- GameLiftClient.MatchmakingConfigurations
	*	- GameLiftClient.MatchmakingRuleSets
	*	- GameLiftClient.PlayerSessions
	*	- GameLiftClient.RuntimeConfiguration
	*	- GameLiftClient.ScalingPolicies
	*	- GameLiftClient.Script
	*	- GameLiftClient.VpcPeeringAuthorizations
	*	- GameLiftClient.VpcPeeringConnections
	*	- GameLiftClient.ComputeAccess
	*	- GameLiftClient.ComputeAuthToken
	*	- GameLiftClient.GameSessionLogUrl
	*	- GameLiftClient.InstanceAccess
	*	- GameLiftClient.Aliases
	*	- GameLiftClient.Builds
	*	- GameLiftClient.Compute
	*	- GameLiftClient.ContainerFleets
	*	- GameLiftClient.ContainerGroupDefinitionVersions
	*	- GameLiftClient.ContainerGroupDefinitions
	*	- GameLiftClient.FleetDeployments
	*	- GameLiftClient.Fleets
	*	- GameLiftClient.GameServerGroups
	*	- GameLiftClient.GameServers
	*	- GameLiftClient.Locations
	*	- GameLiftClient.Scripts
	*	- GameLiftClient.TagsForResource
	*	- GameSparksClient.Extension
	*	- GameSparksClient.ExtensionVersion
	*	- GameSparksClient.Game
	*	- GameSparksClient.GameConfiguration
	*	- GameSparksClient.GeneratedCodeJob
	*	- GameSparksClient.PlayerConnectionStatus
	*	- GameSparksClient.Snapshot
	*	- GameSparksClient.Stage
	*	- GameSparksClient.StageDeployment
	*	- GameSparksClient.ExtensionVersions
	*	- GameSparksClient.Extensions
	*	- GameSparksClient.Games
	*	- GameSparksClient.GeneratedCodeJobs
	*	- GameSparksClient.Snapshots
	*	- GameSparksClient.StageDeployments
	*	- GameSparksClient.Stages
	*	- GameSparksClient.TagsForResource
	*	- GlacierClient.Job
	*	- GlacierClient.Vault
	*	- GlacierClient.DataRetrievalPolicy
	*	- GlacierClient.JobOutput
	*	- GlacierClient.VaultAccessPolicy
	*	- GlacierClient.VaultLock
	*	- GlacierClient.VaultNotifications
	*	- GlacierClient.Jobs
	*	- GlacierClient.MultipartUploads
	*	- GlacierClient.Parts
	*	- GlacierClient.ProvisionedCapacity
	*	- GlacierClient.TagsForVault
	*	- GlacierClient.Vaults
	*	- GlobalAcceleratorClient.AcceleratorAttributes
	*	- GlobalAcceleratorClient.Accelerator
	*	- GlobalAcceleratorClient.CrossAccountAttachment
	*	- GlobalAcceleratorClient.CustomRoutingAcceleratorAttributes
	*	- GlobalAcceleratorClient.CustomRoutingAccelerator
	*	- GlobalAcceleratorClient.CustomRoutingEndpointGroup
	*	- GlobalAcceleratorClient.CustomRoutingListener
	*	- GlobalAcceleratorClient.EndpointGroup
	*	- GlobalAcceleratorClient.Listener
	*	- GlobalAcceleratorClient.Accelerators
	*	- GlobalAcceleratorClient.ByoipCidrs
	*	- GlobalAcceleratorClient.CrossAccountAttachments
	*	- GlobalAcceleratorClient.CrossAccountResourceAccounts
	*	- GlobalAcceleratorClient.CrossAccountResources
	*	- GlobalAcceleratorClient.CustomRoutingAccelerators
	*	- GlobalAcceleratorClient.CustomRoutingEndpointGroups
	*	- GlobalAcceleratorClient.CustomRoutingListeners
	*	- GlobalAcceleratorClient.CustomRoutingPortMappingsByDestination
	*	- GlobalAcceleratorClient.CustomRoutingPortMappings
	*	- GlobalAcceleratorClient.EndpointGroups
	*	- GlobalAcceleratorClient.Listeners
	*	- GlobalAcceleratorClient.TagsForResource
	*	- GlueClient.ConnectionType
	*	- GlueClient.Entity
	*	- GlueClient.InboundIntegrations
	*	- GlueClient.Integrations
	*	- GlueClient.Blueprint
	*	- GlueClient.BlueprintRun
	*	- GlueClient.BlueprintRuns
	*	- GlueClient.Catalog
	*	- GlueClient.CatalogImportStatus
	*	- GlueClient.Catalogs
	*	- GlueClient.Classifier
	*	- GlueClient.Classifiers
	*	- GlueClient.ColumnStatisticsForPartition
	*	- GlueClient.ColumnStatisticsForTable
	*	- GlueClient.ColumnStatisticsTaskRun
	*	- GlueClient.ColumnStatisticsTaskRuns
	*	- GlueClient.ColumnStatisticsTaskSettings
	*	- GlueClient.Connection
	*	- GlueClient.Connections
	*	- GlueClient.Crawler
	*	- GlueClient.CrawlerMetrics
	*	- GlueClient.Crawlers
	*	- GlueClient.CustomEntityType
	*	- GlueClient.DataCatalogEncryptionSettings
	*	- GlueClient.DataQualityModel
	*	- GlueClient.DataQualityModelResult
	*	- GlueClient.DataQualityResult
	*	- GlueClient.DataQualityRuleRecommendationRun
	*	- GlueClient.DataQualityRuleset
	*	- GlueClient.DataQualityRulesetEvaluationRun
	*	- GlueClient.Database
	*	- GlueClient.Databases
	*	- GlueClient.DataflowGraph
	*	- GlueClient.DevEndpoint
	*	- GlueClient.DevEndpoints
	*	- GlueClient.EntityRecords
	*	- GlueClient.IntegrationResourceProperty
	*	- GlueClient.IntegrationTableProperties
	*	- GlueClient.JobBookmark
	*	- GlueClient.Job
	*	- GlueClient.JobRun
	*	- GlueClient.JobRuns
	*	- GlueClient.Jobs
	*	- GlueClient.MLTaskRun
	*	- GlueClient.MLTaskRuns
	*	- GlueClient.MLTransform
	*	- GlueClient.MLTransforms
	*	- GlueClient.Mapping
	*	- GlueClient.Partition
	*	- GlueClient.PartitionIndexes
	*	- GlueClient.Partitions
	*	- GlueClient.Plan
	*	- GlueClient.Registry
	*	- GlueClient.ResourcePolicies
	*	- GlueClient.ResourcePolicy
	*	- GlueClient.SchemaByDefinition
	*	- GlueClient.Schema
	*	- GlueClient.SchemaVersion
	*	- GlueClient.SchemaVersionsDiff
	*	- GlueClient.SecurityConfiguration
	*	- GlueClient.SecurityConfigurations
	*	- GlueClient.Session
	*	- GlueClient.Statement
	*	- GlueClient.Table
	*	- GlueClient.TableOptimizer
	*	- GlueClient.TableVersion
	*	- GlueClient.TableVersions
	*	- GlueClient.Tables
	*	- GlueClient.Tags
	*	- GlueClient.Trigger
	*	- GlueClient.Triggers
	*	- GlueClient.UnfilteredPartitionMetadata
	*	- GlueClient.UnfilteredPartitionsMetadata
	*	- GlueClient.UnfilteredTableMetadata
	*	- GlueClient.UsageProfile
	*	- GlueClient.UserDefinedFunction
	*	- GlueClient.UserDefinedFunctions
	*	- GlueClient.Workflow
	*	- GlueClient.WorkflowRun
	*	- GlueClient.WorkflowRunProperties
	*	- GlueClient.WorkflowRuns
	*	- GlueClient.Blueprints
	*	- GlueClient.ColumnStatisticsTaskRuns
	*	- GlueClient.ConnectionTypes
	*	- GlueClient.Crawlers
	*	- GlueClient.Crawls
	*	- GlueClient.CustomEntityTypes
	*	- GlueClient.DataQualityResults
	*	- GlueClient.DataQualityRuleRecommendationRuns
	*	- GlueClient.DataQualityRulesetEvaluationRuns
	*	- GlueClient.DataQualityRulesets
	*	- GlueClient.DataQualityStatisticAnnotations
	*	- GlueClient.DataQualityStatistics
	*	- GlueClient.DevEndpoints
	*	- GlueClient.Entities
	*	- GlueClient.Jobs
	*	- GlueClient.MLTransforms
	*	- GlueClient.Registries
	*	- GlueClient.SchemaVersions
	*	- GlueClient.Schemas
	*	- GlueClient.Sessions
	*	- GlueClient.Statements
	*	- GlueClient.TableOptimizerRuns
	*	- GlueClient.Triggers
	*	- GlueClient.UsageProfiles
	*	- GlueClient.Workflows
	*	- GrafanaClient.WorkspaceAuthentication
	*	- GrafanaClient.Workspace
	*	- GrafanaClient.WorkspaceConfiguration
	*	- GrafanaClient.Permissions
	*	- GrafanaClient.TagsForResource
	*	- GrafanaClient.Versions
	*	- GrafanaClient.WorkspaceServiceAccountTokens
	*	- GrafanaClient.WorkspaceServiceAccounts
	*	- GrafanaClient.Workspaces
	*	- GreengrassClient.AssociatedRole
	*	- GreengrassClient.BulkDeploymentStatus
	*	- GreengrassClient.ConnectivityInfo
	*	- GreengrassClient.ConnectorDefinition
	*	- GreengrassClient.ConnectorDefinitionVersion
	*	- GreengrassClient.CoreDefinition
	*	- GreengrassClient.CoreDefinitionVersion
	*	- GreengrassClient.DeploymentStatus
	*	- GreengrassClient.DeviceDefinition
	*	- GreengrassClient.DeviceDefinitionVersion
	*	- GreengrassClient.FunctionDefinition
	*	- GreengrassClient.FunctionDefinitionVersion
	*	- GreengrassClient.GroupCertificateAuthority
	*	- GreengrassClient.GroupCertificateConfiguration
	*	- GreengrassClient.Group
	*	- GreengrassClient.GroupVersion
	*	- GreengrassClient.LoggerDefinition
	*	- GreengrassClient.LoggerDefinitionVersion
	*	- GreengrassClient.ResourceDefinition
	*	- GreengrassClient.ResourceDefinitionVersion
	*	- GreengrassClient.ServiceRoleForAccount
	*	- GreengrassClient.SubscriptionDefinition
	*	- GreengrassClient.SubscriptionDefinitionVersion
	*	- GreengrassClient.ThingRuntimeConfiguration
	*	- GreengrassClient.BulkDeploymentDetailedReports
	*	- GreengrassClient.BulkDeployments
	*	- GreengrassClient.ConnectorDefinitionVersions
	*	- GreengrassClient.ConnectorDefinitions
	*	- GreengrassClient.CoreDefinitionVersions
	*	- GreengrassClient.CoreDefinitions
	*	- GreengrassClient.Deployments
	*	- GreengrassClient.DeviceDefinitionVersions
	*	- GreengrassClient.DeviceDefinitions
	*	- GreengrassClient.FunctionDefinitionVersions
	*	- GreengrassClient.FunctionDefinitions
	*	- GreengrassClient.GroupCertificateAuthorities
	*	- GreengrassClient.GroupVersions
	*	- GreengrassClient.Groups
	*	- GreengrassClient.LoggerDefinitionVersions
	*	- GreengrassClient.LoggerDefinitions
	*	- GreengrassClient.ResourceDefinitionVersions
	*	- GreengrassClient.ResourceDefinitions
	*	- GreengrassClient.SubscriptionDefinitionVersions
	*	- GreengrassClient.SubscriptionDefinitions
	*	- GreengrassClient.TagsForResource
	*	- GroundStationClient.Contact
	*	- GroundStationClient.Ephemeris
	*	- GroundStationClient.AgentConfiguration
	*	- GroundStationClient.Config
	*	- GroundStationClient.DataflowEndpointGroup
	*	- GroundStationClient.MinuteUsage
	*	- GroundStationClient.MissionProfile
	*	- GroundStationClient.Satellite
	*	- GroundStationClient.Configs
	*	- GroundStationClient.Contacts
	*	- GroundStationClient.DataflowEndpointGroups
	*	- GroundStationClient.Ephemerides
	*	- GroundStationClient.GroundStations
	*	- GroundStationClient.MissionProfiles
	*	- GroundStationClient.Satellites
	*	- GroundStationClient.TagsForResource
	*	- GuardDutyClient.MalwareScans
	*	- GuardDutyClient.OrganizationConfiguration
	*	- GuardDutyClient.PublishingDestination
	*	- GuardDutyClient.AdministratorAccount
	*	- GuardDutyClient.CoverageStatistics
	*	- GuardDutyClient.Detector
	*	- GuardDutyClient.Filter
	*	- GuardDutyClient.Findings
	*	- GuardDutyClient.FindingsStatistics
	*	- GuardDutyClient.IPSet
	*	- GuardDutyClient.InvitationsCount
	*	- GuardDutyClient.MalwareProtectionPlan
	*	- GuardDutyClient.MalwareScanSettings
	*	- GuardDutyClient.MasterAccount
	*	- GuardDutyClient.MemberDetectors
	*	- GuardDutyClient.Members
	*	- GuardDutyClient.OrganizationStatistics
	*	- GuardDutyClient.RemainingFreeTrialDays
	*	- GuardDutyClient.ThreatIntelSet
	*	- GuardDutyClient.UsageStatistics
	*	- GuardDutyClient.Coverage
	*	- GuardDutyClient.Detectors
	*	- GuardDutyClient.Filters
	*	- GuardDutyClient.Findings
	*	- GuardDutyClient.IPSets
	*	- GuardDutyClient.Invitations
	*	- GuardDutyClient.MalwareProtectionPlans
	*	- GuardDutyClient.Members
	*	- GuardDutyClient.OrganizationAdminAccounts
	*	- GuardDutyClient.PublishingDestinations
	*	- GuardDutyClient.TagsForResource
	*	- GuardDutyClient.ThreatIntelSets
	*	- HealthClient.AffectedAccountsForOrganization
	*	- HealthClient.AffectedEntities
	*	- HealthClient.AffectedEntitiesForOrganization
	*	- HealthClient.EntityAggregates
	*	- HealthClient.EntityAggregatesForOrganization
	*	- HealthClient.EventAggregates
	*	- HealthClient.EventDetails
	*	- HealthClient.EventDetailsForOrganization
	*	- HealthClient.EventTypes
	*	- HealthClient.Events
	*	- HealthClient.EventsForOrganization
	*	- HealthClient.HealthServiceStatusForOrganization
	*	- HealthLakeClient.FHIRDatastore
	*	- HealthLakeClient.FHIRExportJob
	*	- HealthLakeClient.FHIRImportJob
	*	- HealthLakeClient.FHIRDatastores
	*	- HealthLakeClient.FHIRExportJobs
	*	- HealthLakeClient.FHIRImportJobs
	*	- HealthLakeClient.TagsForResource
	*	- HoneycodeClient.TableDataImportJob
	*	- HoneycodeClient.ScreenData
	*	- HoneycodeClient.TableColumns
	*	- HoneycodeClient.TableRows
	*	- HoneycodeClient.Tables
	*	- HoneycodeClient.TagsForResource
	*	- IAMClient.AccessKeyLastUsed
	*	- IAMClient.AccountAuthorizationDetails
	*	- IAMClient.AccountPasswordPolicy
	*	- IAMClient.AccountSummary
	*	- IAMClient.ContextKeysForCustomPolicy
	*	- IAMClient.ContextKeysForPrincipalPolicy
	*	- IAMClient.CredentialReport
	*	- IAMClient.Group
	*	- IAMClient.GroupPolicy
	*	- IAMClient.InstanceProfile
	*	- IAMClient.LoginProfile
	*	- IAMClient.MFADevice
	*	- IAMClient.OpenIDConnectProvider
	*	- IAMClient.OrganizationsAccessReport
	*	- IAMClient.Policy
	*	- IAMClient.PolicyVersion
	*	- IAMClient.Role
	*	- IAMClient.RolePolicy
	*	- IAMClient.SAMLProvider
	*	- IAMClient.SSHPublicKey
	*	- IAMClient.ServerCertificate
	*	- IAMClient.ServiceLastAccessedDetails
	*	- IAMClient.ServiceLastAccessedDetailsWithEntities
	*	- IAMClient.ServiceLinkedRoleDeletionStatus
	*	- IAMClient.User
	*	- IAMClient.UserPolicy
	*	- IAMClient.AccessKeys
	*	- IAMClient.AccountAliases
	*	- IAMClient.AttachedGroupPolicies
	*	- IAMClient.AttachedRolePolicies
	*	- IAMClient.AttachedUserPolicies
	*	- IAMClient.EntitiesForPolicy
	*	- IAMClient.GroupPolicies
	*	- IAMClient.Groups
	*	- IAMClient.GroupsForUser
	*	- IAMClient.InstanceProfileTags
	*	- IAMClient.InstanceProfiles
	*	- IAMClient.InstanceProfilesForRole
	*	- IAMClient.MFADeviceTags
	*	- IAMClient.MFADevices
	*	- IAMClient.OpenIDConnectProviderTags
	*	- IAMClient.OpenIDConnectProviders
	*	- IAMClient.OrganizationsFeatures
	*	- IAMClient.Policies
	*	- IAMClient.PoliciesGrantingServiceAccess
	*	- IAMClient.PolicyTags
	*	- IAMClient.PolicyVersions
	*	- IAMClient.RolePolicies
	*	- IAMClient.RoleTags
	*	- IAMClient.Roles
	*	- IAMClient.SAMLProviderTags
	*	- IAMClient.SAMLProviders
	*	- IAMClient.SSHPublicKeys
	*	- IAMClient.ServerCertificateTags
	*	- IAMClient.ServerCertificates
	*	- IAMClient.ServiceSpecificCredentials
	*	- IAMClient.SigningCertificates
	*	- IAMClient.UserPolicies
	*	- IAMClient.UserTags
	*	- IAMClient.Users
	*	- IAMClient.VirtualMFADevices
	*	- IdentitystoreClient.Group
	*	- IdentitystoreClient.GroupMembership
	*	- IdentitystoreClient.User
	*	- IdentitystoreClient.GroupId
	*	- IdentitystoreClient.GroupMembershipId
	*	- IdentitystoreClient.UserId
	*	- IdentitystoreClient.GroupMemberships
	*	- IdentitystoreClient.GroupMembershipsForMember
	*	- IdentitystoreClient.Groups
	*	- IdentitystoreClient.Users
	*	- ImagebuilderClient.Component
	*	- ImagebuilderClient.ComponentPolicy
	*	- ImagebuilderClient.ContainerRecipe
	*	- ImagebuilderClient.ContainerRecipePolicy
	*	- ImagebuilderClient.DistributionConfiguration
	*	- ImagebuilderClient.Image
	*	- ImagebuilderClient.ImagePipeline
	*	- ImagebuilderClient.ImagePolicy
	*	- ImagebuilderClient.ImageRecipe
	*	- ImagebuilderClient.ImageRecipePolicy
	*	- ImagebuilderClient.InfrastructureConfiguration
	*	- ImagebuilderClient.LifecycleExecution
	*	- ImagebuilderClient.LifecyclePolicy
	*	- ImagebuilderClient.MarketplaceResource
	*	- ImagebuilderClient.Workflow
	*	- ImagebuilderClient.WorkflowExecution
	*	- ImagebuilderClient.WorkflowStepExecution
	*	- ImagebuilderClient.ComponentBuildVersions
	*	- ImagebuilderClient.Components
	*	- ImagebuilderClient.ContainerRecipes
	*	- ImagebuilderClient.DistributionConfigurations
	*	- ImagebuilderClient.ImageBuildVersions
	*	- ImagebuilderClient.ImagePackages
	*	- ImagebuilderClient.ImagePipelineImages
	*	- ImagebuilderClient.ImagePipelines
	*	- ImagebuilderClient.ImageRecipes
	*	- ImagebuilderClient.ImageScanFindingAggregations
	*	- ImagebuilderClient.ImageScanFindings
	*	- ImagebuilderClient.Images
	*	- ImagebuilderClient.InfrastructureConfigurations
	*	- ImagebuilderClient.LifecycleExecutionResources
	*	- ImagebuilderClient.LifecycleExecutions
	*	- ImagebuilderClient.LifecyclePolicies
	*	- ImagebuilderClient.TagsForResource
	*	- ImagebuilderClient.WaitingWorkflowSteps
	*	- ImagebuilderClient.WorkflowBuildVersions
	*	- ImagebuilderClient.WorkflowExecutions
	*	- ImagebuilderClient.WorkflowStepExecutions
	*	- ImagebuilderClient.Workflows
	*	- InspectorClient.AssessmentRuns
	*	- InspectorClient.AssessmentTargets
	*	- InspectorClient.AssessmentTemplates
	*	- InspectorClient.CrossAccountAccessRole
	*	- InspectorClient.Exclusions
	*	- InspectorClient.Findings
	*	- InspectorClient.ResourceGroups
	*	- InspectorClient.RulesPackages
	*	- InspectorClient.AssessmentReport
	*	- InspectorClient.ExclusionsPreview
	*	- InspectorClient.TelemetryMetadata
	*	- InspectorClient.AssessmentRunAgents
	*	- InspectorClient.AssessmentRuns
	*	- InspectorClient.AssessmentTargets
	*	- InspectorClient.AssessmentTemplates
	*	- InspectorClient.EventSubscriptions
	*	- InspectorClient.Exclusions
	*	- InspectorClient.Findings
	*	- InspectorClient.RulesPackages
	*	- InspectorClient.TagsForResource
	*	- IoTClient.AccountAuditConfiguration
	*	- IoTClient.AuditFinding
	*	- IoTClient.AuditMitigationActionsTask
	*	- IoTClient.AuditSuppression
	*	- IoTClient.AuditTask
	*	- IoTClient.Authorizer
	*	- IoTClient.BillingGroup
	*	- IoTClient.CACertificate
	*	- IoTClient.Certificate
	*	- IoTClient.CertificateProvider
	*	- IoTClient.CustomMetric
	*	- IoTClient.DefaultAuthorizer
	*	- IoTClient.DetectMitigationActionsTask
	*	- IoTClient.Dimension
	*	- IoTClient.DomainConfiguration
	*	- IoTClient.Endpoint
	*	- IoTClient.EventConfigurations
	*	- IoTClient.FleetMetric
	*	- IoTClient.Index
	*	- IoTClient.Job
	*	- IoTClient.JobExecution
	*	- IoTClient.JobTemplate
	*	- IoTClient.ManagedJobTemplate
	*	- IoTClient.MitigationAction
	*	- IoTClient.ProvisioningTemplate
	*	- IoTClient.ProvisioningTemplateVersion
	*	- IoTClient.RoleAlias
	*	- IoTClient.ScheduledAudit
	*	- IoTClient.SecurityProfile
	*	- IoTClient.Stream
	*	- IoTClient.Thing
	*	- IoTClient.ThingGroup
	*	- IoTClient.ThingRegistrationTask
	*	- IoTClient.ThingType
	*	- IoTClient.BehaviorModelTrainingSummaries
	*	- IoTClient.BucketsAggregation
	*	- IoTClient.Cardinality
	*	- IoTClient.
	*	- IoTClient.
	*	- IoTClient.EffectivePolicies
	*	- IoTClient.IndexingConfiguration
	*	- IoTClient.JobDocument
	*	- IoTClient.LoggingOptions
	*	- IoTClient.OTAUpdate
	*	- IoTClient.Package
	*	- IoTClient.PackageConfiguration
	*	- IoTClient.PackageVersion
	*	- IoTClient.Percentiles
	*	- IoTClient.Policy
	*	- IoTClient.PolicyVersion
	*	- IoTClient.RegistrationCode
	*	- IoTClient.Statistics
	*	- IoTClient.ThingConnectivityData
	*	- IoTClient.TopicRule
	*	- IoTClient.TopicRuleDestination
	*	- IoTClient.V2LoggingOptions
	*	- IoTClient.ActiveViolations
	*	- IoTClient.AttachedPolicies
	*	- IoTClient.AuditFindings
	*	- IoTClient.AuditMitigationActionsExecutions
	*	- IoTClient.AuditMitigationActionsTasks
	*	- IoTClient.AuditSuppressions
	*	- IoTClient.AuditTasks
	*	- IoTClient.Authorizers
	*	- IoTClient.BillingGroups
	*	- IoTClient.CACertificates
	*	- IoTClient.CertificateProviders
	*	- IoTClient.CertificatesByCA
	*	- IoTClient.Certificates
	*	- IoTClient.
	*	- IoTClient.
	*	- IoTClient.CustomMetrics
	*	- IoTClient.DetectMitigationActionsExecutions
	*	- IoTClient.DetectMitigationActionsTasks
	*	- IoTClient.Dimensions
	*	- IoTClient.DomainConfigurations
	*	- IoTClient.FleetMetrics
	*	- IoTClient.Indices
	*	- IoTClient.JobExecutionsForJob
	*	- IoTClient.JobExecutionsForThing
	*	- IoTClient.JobTemplates
	*	- IoTClient.Jobs
	*	- IoTClient.ManagedJobTemplates
	*	- IoTClient.MetricValues
	*	- IoTClient.MitigationActions
	*	- IoTClient.OTAUpdates
	*	- IoTClient.OutgoingCertificates
	*	- IoTClient.PackageVersions
	*	- IoTClient.Packages
	*	- IoTClient.Policies
	*	- IoTClient.PolicyPrincipals
	*	- IoTClient.PolicyVersions
	*	- IoTClient.PrincipalPolicies
	*	- IoTClient.PrincipalThings
	*	- IoTClient.PrincipalThingsV2
	*	- IoTClient.ProvisioningTemplateVersions
	*	- IoTClient.ProvisioningTemplates
	*	- IoTClient.RelatedResourcesForAuditFinding
	*	- IoTClient.RoleAliases
	*	- IoTClient.SbomValidationResults
	*	- IoTClient.ScheduledAudits
	*	- IoTClient.SecurityProfiles
	*	- IoTClient.SecurityProfilesForTarget
	*	- IoTClient.Streams
	*	- IoTClient.TagsForResource
	*	- IoTClient.TargetsForPolicy
	*	- IoTClient.TargetsForSecurityProfile
	*	- IoTClient.ThingGroups
	*	- IoTClient.ThingGroupsForThing
	*	- IoTClient.ThingPrincipals
	*	- IoTClient.ThingPrincipalsV2
	*	- IoTClient.ThingRegistrationTaskReports
	*	- IoTClient.ThingRegistrationTasks
	*	- IoTClient.ThingTypes
	*	- IoTClient.Things
	*	- IoTClient.ThingsInBillingGroup
	*	- IoTClient.ThingsInThingGroup
	*	- IoTClient.TopicRuleDestinations
	*	- IoTClient.TopicRules
	*	- IoTClient.V2LoggingLevels
	*	- IoTClient.ViolationEvents
	*	- IoTAnalyticsClient.Channel
	*	- IoTAnalyticsClient.Dataset
	*	- IoTAnalyticsClient.Datastore
	*	- IoTAnalyticsClient.LoggingOptions
	*	- IoTAnalyticsClient.Pipeline
	*	- IoTAnalyticsClient.DatasetContent
	*	- IoTAnalyticsClient.Channels
	*	- IoTAnalyticsClient.DatasetContents
	*	- IoTAnalyticsClient.Datasets
	*	- IoTAnalyticsClient.Datastores
	*	- IoTAnalyticsClient.Pipelines
	*	- IoTAnalyticsClient.TagsForResource
	*	- IoTDataPlaneClient.RetainedMessage
	*	- IoTDataPlaneClient.ThingShadow
	*	- IoTDataPlaneClient.NamedShadowsForThing
	*	- IoTDataPlaneClient.RetainedMessages
	*	- IotDeviceAdvisorClient.Endpoint
	*	- IotDeviceAdvisorClient.SuiteDefinition
	*	- IotDeviceAdvisorClient.SuiteRun
	*	- IotDeviceAdvisorClient.SuiteRunReport
	*	- IotDeviceAdvisorClient.SuiteDefinitions
	*	- IotDeviceAdvisorClient.SuiteRuns
	*	- IotDeviceAdvisorClient.TagsForResource
	*	- IoTEventsClient.AlarmModel
	*	- IoTEventsClient.DetectorModelAnalysis
	*	- IoTEventsClient.DetectorModel
	*	- IoTEventsClient.Input
	*	- IoTEventsClient.LoggingOptions
	*	- IoTEventsClient.DetectorModelAnalysisResults
	*	- IoTEventsClient.AlarmModelVersions
	*	- IoTEventsClient.AlarmModels
	*	- IoTEventsClient.DetectorModelVersions
	*	- IoTEventsClient.DetectorModels
	*	- IoTEventsClient.InputRoutings
	*	- IoTEventsClient.Inputs
	*	- IoTEventsClient.TagsForResource
	*	- IoTFleetHubClient.Application
	*	- IoTFleetHubClient.Applications
	*	- IoTFleetHubClient.TagsForResource
	*	- IoTJobsDataPlaneClient.JobExecution
	*	- IoTJobsDataPlaneClient.PendingJobExecutions
	*	- IoTSecureTunnelingClient.Tunnel
	*	- IoTSecureTunnelingClient.TagsForResource
	*	- IoTSecureTunnelingClient.Tunnels
	*	- IoTSiteWiseClient.AccessPolicy
	*	- IoTSiteWiseClient.Action
	*	- IoTSiteWiseClient.Asset
	*	- IoTSiteWiseClient.AssetCompositeModel
	*	- IoTSiteWiseClient.AssetModel
	*	- IoTSiteWiseClient.AssetModelCompositeModel
	*	- IoTSiteWiseClient.AssetProperty
	*	- IoTSiteWiseClient.BulkImportJob
	*	- IoTSiteWiseClient.Dashboard
	*	- IoTSiteWiseClient.Dataset
	*	- IoTSiteWiseClient.DefaultEncryptionConfiguration
	*	- IoTSiteWiseClient.GatewayCapabilityConfiguration
	*	- IoTSiteWiseClient.Gateway
	*	- IoTSiteWiseClient.LoggingOptions
	*	- IoTSiteWiseClient.Portal
	*	- IoTSiteWiseClient.Project
	*	- IoTSiteWiseClient.StorageConfiguration
	*	- IoTSiteWiseClient.TimeSeries
	*	- IoTSiteWiseClient.AssetPropertyAggregates
	*	- IoTSiteWiseClient.AssetPropertyValue
	*	- IoTSiteWiseClient.AssetPropertyValueHistory
	*	- IoTSiteWiseClient.InterpolatedAssetPropertyValues
	*	- IoTSiteWiseClient.AccessPolicies
	*	- IoTSiteWiseClient.Actions
	*	- IoTSiteWiseClient.AssetModelCompositeModels
	*	- IoTSiteWiseClient.AssetModelProperties
	*	- IoTSiteWiseClient.AssetModels
	*	- IoTSiteWiseClient.AssetProperties
	*	- IoTSiteWiseClient.AssetRelationships
	*	- IoTSiteWiseClient.Assets
	*	- IoTSiteWiseClient.AssociatedAssets
	*	- IoTSiteWiseClient.BulkImportJobs
	*	- IoTSiteWiseClient.CompositionRelationships
	*	- IoTSiteWiseClient.Dashboards
	*	- IoTSiteWiseClient.Datasets
	*	- IoTSiteWiseClient.Gateways
	*	- IoTSiteWiseClient.Portals
	*	- IoTSiteWiseClient.ProjectAssets
	*	- IoTSiteWiseClient.Projects
	*	- IoTSiteWiseClient.TagsForResource
	*	- IoTSiteWiseClient.TimeSeries
	*	- IoTThingsGraphClient.Namespace
	*	- IoTThingsGraphClient.Entities
	*	- IoTThingsGraphClient.FlowTemplate
	*	- IoTThingsGraphClient.FlowTemplateRevisions
	*	- IoTThingsGraphClient.NamespaceDeletionStatus
	*	- IoTThingsGraphClient.SystemInstance
	*	- IoTThingsGraphClient.SystemTemplate
	*	- IoTThingsGraphClient.SystemTemplateRevisions
	*	- IoTThingsGraphClient.UploadStatus
	*	- IoTThingsGraphClient.FlowExecutionMessages
	*	- IoTThingsGraphClient.TagsForResource
	*	- IoTTwinMakerClient.ComponentType
	*	- IoTTwinMakerClient.Entity
	*	- IoTTwinMakerClient.MetadataTransferJob
	*	- IoTTwinMakerClient.PricingPlan
	*	- IoTTwinMakerClient.PropertyValue
	*	- IoTTwinMakerClient.PropertyValueHistory
	*	- IoTTwinMakerClient.Scene
	*	- IoTTwinMakerClient.SyncJob
	*	- IoTTwinMakerClient.Workspace
	*	- IoTTwinMakerClient.ComponentTypes
	*	- IoTTwinMakerClient.Components
	*	- IoTTwinMakerClient.Entities
	*	- IoTTwinMakerClient.MetadataTransferJobs
	*	- IoTTwinMakerClient.Properties
	*	- IoTTwinMakerClient.Scenes
	*	- IoTTwinMakerClient.SyncJobs
	*	- IoTTwinMakerClient.SyncResources
	*	- IoTTwinMakerClient.TagsForResource
	*	- IoTTwinMakerClient.Workspaces
	*	- IoTWirelessClient.Destination
	*	- IoTWirelessClient.DeviceProfile
	*	- IoTWirelessClient.EventConfigurationByResourceTypes
	*	- IoTWirelessClient.FuotaTask
	*	- IoTWirelessClient.LogLevelsByResourceTypes
	*	- IoTWirelessClient.MetricConfiguration
	*	- IoTWirelessClient.Metrics
	*	- IoTWirelessClient.MulticastGroup
	*	- IoTWirelessClient.MulticastGroupSession
	*	- IoTWirelessClient.NetworkAnalyzerConfiguration
	*	- IoTWirelessClient.PartnerAccount
	*	- IoTWirelessClient.Position
	*	- IoTWirelessClient.PositionConfiguration
	*	- IoTWirelessClient.PositionEstimate
	*	- IoTWirelessClient.ResourceEventConfiguration
	*	- IoTWirelessClient.ResourceLogLevel
	*	- IoTWirelessClient.ResourcePosition
	*	- IoTWirelessClient.ServiceEndpoint
	*	- IoTWirelessClient.ServiceProfile
	*	- IoTWirelessClient.WirelessDevice
	*	- IoTWirelessClient.WirelessDeviceImportTask
	*	- IoTWirelessClient.WirelessDeviceStatistics
	*	- IoTWirelessClient.WirelessGatewayCertificate
	*	- IoTWirelessClient.WirelessGateway
	*	- IoTWirelessClient.WirelessGatewayFirmwareInformation
	*	- IoTWirelessClient.WirelessGatewayStatistics
	*	- IoTWirelessClient.WirelessGatewayTask
	*	- IoTWirelessClient.WirelessGatewayTaskDefinition
	*	- IoTWirelessClient.Destinations
	*	- IoTWirelessClient.DeviceProfiles
	*	- IoTWirelessClient.DevicesForWirelessDeviceImportTask
	*	- IoTWirelessClient.EventConfigurations
	*	- IoTWirelessClient.FuotaTasks
	*	- IoTWirelessClient.MulticastGroupsByFuotaTask
	*	- IoTWirelessClient.MulticastGroups
	*	- IoTWirelessClient.NetworkAnalyzerConfigurations
	*	- IoTWirelessClient.PartnerAccounts
	*	- IoTWirelessClient.PositionConfigurations
	*	- IoTWirelessClient.QueuedMessages
	*	- IoTWirelessClient.ServiceProfiles
	*	- IoTWirelessClient.TagsForResource
	*	- IoTWirelessClient.WirelessDeviceImportTasks
	*	- IoTWirelessClient.WirelessDevices
	*	- IoTWirelessClient.WirelessGatewayTaskDefinitions
	*	- IoTWirelessClient.WirelessGateways
	*	- IvsClient.Channel
	*	- IvsClient.PlaybackKeyPair
	*	- IvsClient.PlaybackRestrictionPolicy
	*	- IvsClient.RecordingConfiguration
	*	- IvsClient.Stream
	*	- IvsClient.StreamKey
	*	- IvsClient.StreamSession
	*	- IvsClient.Channels
	*	- IvsClient.PlaybackKeyPairs
	*	- IvsClient.PlaybackRestrictionPolicies
	*	- IvsClient.RecordingConfigurations
	*	- IvsClient.StreamKeys
	*	- IvsClient.StreamSessions
	*	- IvsClient.Streams
	*	- IvsClient.TagsForResource
	*	- IvschatClient.LoggingConfiguration
	*	- IvschatClient.Room
	*	- IvschatClient.LoggingConfigurations
	*	- IvschatClient.Rooms
	*	- IvschatClient.TagsForResource
	*	- KafkaClient.Cluster
	*	- KafkaClient.ClusterOperation
	*	- KafkaClient.ClusterOperationV2
	*	- KafkaClient.ClusterV2
	*	- KafkaClient.Configuration
	*	- KafkaClient.ConfigurationRevision
	*	- KafkaClient.Replicator
	*	- KafkaClient.VpcConnection
	*	- KafkaClient.BootstrapBrokers
	*	- KafkaClient.ClusterPolicy
	*	- KafkaClient.CompatibleKafkaVersions
	*	- KafkaClient.ClientVpcConnections
	*	- KafkaClient.ClusterOperations
	*	- KafkaClient.ClusterOperationsV2
	*	- KafkaClient.Clusters
	*	- KafkaClient.ClustersV2
	*	- KafkaClient.ConfigurationRevisions
	*	- KafkaClient.Configurations
	*	- KafkaClient.KafkaVersions
	*	- KafkaClient.Nodes
	*	- KafkaClient.Replicators
	*	- KafkaClient.ScramSecrets
	*	- KafkaClient.TagsForResource
	*	- KafkaClient.VpcConnections
	*	- KafkaConnectClient.Connector
	*	- KafkaConnectClient.ConnectorOperation
	*	- KafkaConnectClient.CustomPlugin
	*	- KafkaConnectClient.WorkerConfiguration
	*	- KafkaConnectClient.ConnectorOperations
	*	- KafkaConnectClient.Connectors
	*	- KafkaConnectClient.CustomPlugins
	*	- KafkaConnectClient.TagsForResource
	*	- KafkaConnectClient.WorkerConfigurations
	*	- KendraClient.AccessControlConfiguration
	*	- KendraClient.DataSource
	*	- KendraClient.Experience
	*	- KendraClient.Faq
	*	- KendraClient.FeaturedResultsSet
	*	- KendraClient.Index
	*	- KendraClient.PrincipalMapping
	*	- KendraClient.QuerySuggestionsBlockList
	*	- KendraClient.QuerySuggestionsConfig
	*	- KendraClient.Thesaurus
	*	- KendraClient.QuerySuggestions
	*	- KendraClient.Snapshots
	*	- KendraClient.AccessControlConfigurations
	*	- KendraClient.DataSourceSyncJobs
	*	- KendraClient.DataSources
	*	- KendraClient.EntityPersonas
	*	- KendraClient.ExperienceEntities
	*	- KendraClient.Experiences
	*	- KendraClient.Faqs
	*	- KendraClient.FeaturedResultsSets
	*	- KendraClient.GroupsOlderThanOrderingId
	*	- KendraClient.Indices
	*	- KendraClient.QuerySuggestionsBlockLists
	*	- KendraClient.TagsForResource
	*	- KendraClient.Thesauri
	*	- KeyspacesClient.Keyspace
	*	- KeyspacesClient.TableAutoScalingSettings
	*	- KeyspacesClient.Table
	*	- KeyspacesClient.Type
	*	- KeyspacesClient.Keyspaces
	*	- KeyspacesClient.Tables
	*	- KeyspacesClient.TagsForResource
	*	- KeyspacesClient.Types
	*	- KinesisClient.Limits
	*	- KinesisClient.Stream
	*	- KinesisClient.StreamConsumer
	*	- KinesisClient.StreamSummary
	*	- KinesisClient.Records
	*	- KinesisClient.ResourcePolicy
	*	- KinesisClient.ShardIterator
	*	- KinesisClient.Shards
	*	- KinesisClient.StreamConsumers
	*	- KinesisClient.Streams
	*	- KinesisClient.TagsForStream
	*	- KinesisAnalyticsClient.Application
	*	- KinesisAnalyticsClient.Applications
	*	- KinesisAnalyticsClient.TagsForResource
	*	- KinesisVideoClient.EdgeConfiguration
	*	- KinesisVideoClient.ImageGenerationConfiguration
	*	- KinesisVideoClient.MappedResourceConfiguration
	*	- KinesisVideoClient.MediaStorageConfiguration
	*	- KinesisVideoClient.NotificationConfiguration
	*	- KinesisVideoClient.SignalingChannel
	*	- KinesisVideoClient.Stream
	*	- KinesisVideoClient.DataEndpoint
	*	- KinesisVideoClient.SignalingChannelEndpoint
	*	- KinesisVideoClient.EdgeAgentConfigurations
	*	- KinesisVideoClient.SignalingChannels
	*	- KinesisVideoClient.Streams
	*	- KinesisVideoClient.TagsForResource
	*	- KinesisVideoClient.TagsForStream
	*	- KinesisVideoArchivedMediaClient.Clip
	*	- KinesisVideoArchivedMediaClient.DASHStreamingSessionURL
	*	- KinesisVideoArchivedMediaClient.HLSStreamingSessionURL
	*	- KinesisVideoArchivedMediaClient.Images
	*	- KinesisVideoArchivedMediaClient.MediaForFragmentList
	*	- KinesisVideoArchivedMediaClient.Fragments
	*	- KinesisVideoMediaClient.Media
	*	- KinesisVideoSignalingClient.IceServerConfig
	*	- KMSClient.CustomKeyStores
	*	- KMSClient.Key
	*	- KMSClient.KeyPolicy
	*	- KMSClient.KeyRotationStatus
	*	- KMSClient.ParametersForImport
	*	- KMSClient.PublicKey
	*	- KMSClient.Aliases
	*	- KMSClient.Grants
	*	- KMSClient.KeyPolicies
	*	- KMSClient.KeyRotations
	*	- KMSClient.Keys
	*	- KMSClient.ResourceTags
	*	- KMSClient.RetirableGrants
	*	- LakeFormationClient.LakeFormationIdentityCenterConfiguration
	*	- LakeFormationClient.Resource
	*	- LakeFormationClient.Transaction
	*	- LakeFormationClient.DataCellsFilter
	*	- LakeFormationClient.DataLakePrincipal
	*	- LakeFormationClient.DataLakeSettings
	*	- LakeFormationClient.EffectivePermissionsForPath
	*	- LakeFormationClient.LFTag
	*	- LakeFormationClient.LFTagExpression
	*	- LakeFormationClient.QueryState
	*	- LakeFormationClient.QueryStatistics
	*	- LakeFormationClient.ResourceLFTags
	*	- LakeFormationClient.TableObjects
	*	- LakeFormationClient.TemporaryGluePartitionCredentials
	*	- LakeFormationClient.TemporaryGlueTableCredentials
	*	- LakeFormationClient.WorkUnitResults
	*	- LakeFormationClient.WorkUnits
	*	- LakeFormationClient.DataCellsFilter
	*	- LakeFormationClient.LFTagExpressions
	*	- LakeFormationClient.LFTags
	*	- LakeFormationClient.LakeFormationOptIns
	*	- LakeFormationClient.Permissions
	*	- LakeFormationClient.Resources
	*	- LakeFormationClient.TableStorageOptimizers
	*	- LakeFormationClient.Transactions
	*	- LambdaClient.AccountSettings
	*	- LambdaClient.Alias
	*	- LambdaClient.CodeSigningConfig
	*	- LambdaClient.EventSourceMapping
	*	- LambdaClient.FunctionCodeSigningConfig
	*	- LambdaClient.Function
	*	- LambdaClient.FunctionConcurrency
	*	- LambdaClient.FunctionConfiguration
	*	- LambdaClient.FunctionEventInvokeConfig
	*	- LambdaClient.FunctionRecursionConfig
	*	- LambdaClient.FunctionUrlConfig
	*	- LambdaClient.LayerVersionByArn
	*	- LambdaClient.LayerVersion
	*	- LambdaClient.LayerVersionPolicy
	*	- LambdaClient.Policy
	*	- LambdaClient.ProvisionedConcurrencyConfig
	*	- LambdaClient.RuntimeManagementConfig
	*	- LambdaClient.Aliases
	*	- LambdaClient.CodeSigningConfigs
	*	- LambdaClient.EventSourceMappings
	*	- LambdaClient.FunctionEventInvokeConfigs
	*	- LambdaClient.FunctionUrlConfigs
	*	- LambdaClient.FunctionsByCodeSigningConfig
	*	- LambdaClient.Functions
	*	- LambdaClient.LayerVersions
	*	- LambdaClient.Layers
	*	- LambdaClient.ProvisionedConcurrencyConfigs
	*	- LambdaClient.Tags
	*	- LambdaClient.VersionsByFunction
	*	- LicenseManagerClient.AccessToken
	*	- LicenseManagerClient.Grant
	*	- LicenseManagerClient.License
	*	- LicenseManagerClient.LicenseConfiguration
	*	- LicenseManagerClient.LicenseConversionTask
	*	- LicenseManagerClient.LicenseManagerReportGenerator
	*	- LicenseManagerClient.LicenseUsage
	*	- LicenseManagerClient.ServiceSettings
	*	- LicenseManagerClient.AssociationsForLicenseConfiguration
	*	- LicenseManagerClient.DistributedGrants
	*	- LicenseManagerClient.FailuresForLicenseConfigurationOperations
	*	- LicenseManagerClient.LicenseConfigurations
	*	- LicenseManagerClient.LicenseConversionTasks
	*	- LicenseManagerClient.LicenseManagerReportGenerators
	*	- LicenseManagerClient.LicenseSpecificationsForResource
	*	- LicenseManagerClient.LicenseVersions
	*	- LicenseManagerClient.Licenses
	*	- LicenseManagerClient.ReceivedGrants
	*	- LicenseManagerClient.ReceivedGrantsForOrganization
	*	- LicenseManagerClient.ReceivedLicenses
	*	- LicenseManagerClient.ReceivedLicensesForOrganization
	*	- LicenseManagerClient.ResourceInventory
	*	- LicenseManagerClient.TagsForResource
	*	- LicenseManagerClient.Tokens
	*	- LicenseManagerClient.UsageForLicenseConfiguration
	*	- LightsailClient.ActiveNames
	*	- LightsailClient.Alarms
	*	- LightsailClient.AutoSnapshots
	*	- LightsailClient.Blueprints
	*	- LightsailClient.BucketAccessKeys
	*	- LightsailClient.BucketBundles
	*	- LightsailClient.BucketMetricData
	*	- LightsailClient.Buckets
	*	- LightsailClient.Bundles
	*	- LightsailClient.Certificates
	*	- LightsailClient.CloudFormationStackRecords
	*	- LightsailClient.ContactMethods
	*	- LightsailClient.ContainerAPIMetadata
	*	- LightsailClient.ContainerImages
	*	- LightsailClient.ContainerLog
	*	- LightsailClient.ContainerServiceDeployments
	*	- LightsailClient.ContainerServiceMetricData
	*	- LightsailClient.ContainerServicePowers
	*	- LightsailClient.ContainerServices
	*	- LightsailClient.CostEstimate
	*	- LightsailClient.Disk
	*	- LightsailClient.DiskSnapshot
	*	- LightsailClient.DiskSnapshots
	*	- LightsailClient.Disks
	*	- LightsailClient.DistributionBundles
	*	- LightsailClient.DistributionLatestCacheReset
	*	- LightsailClient.DistributionMetricData
	*	- LightsailClient.Distributions
	*	- LightsailClient.Domain
	*	- LightsailClient.Domains
	*	- LightsailClient.ExportSnapshotRecords
	*	- LightsailClient.InstanceAccessDetails
	*	- LightsailClient.Instance
	*	- LightsailClient.InstanceMetricData
	*	- LightsailClient.InstancePortStates
	*	- LightsailClient.InstanceSnapshot
	*	- LightsailClient.InstanceSnapshots
	*	- LightsailClient.InstanceState
	*	- LightsailClient.Instances
	*	- LightsailClient.KeyPair
	*	- LightsailClient.KeyPairs
	*	- LightsailClient.LoadBalancer
	*	- LightsailClient.LoadBalancerMetricData
	*	- LightsailClient.LoadBalancerTlsCertificates
	*	- LightsailClient.LoadBalancerTlsPolicies
	*	- LightsailClient.LoadBalancers
	*	- LightsailClient.Operation
	*	- LightsailClient.Operations
	*	- LightsailClient.OperationsForResource
	*	- LightsailClient.Regions
	*	- LightsailClient.RelationalDatabaseBlueprints
	*	- LightsailClient.RelationalDatabaseBundles
	*	- LightsailClient.RelationalDatabase
	*	- LightsailClient.RelationalDatabaseEvents
	*	- LightsailClient.RelationalDatabaseLogEvents
	*	- LightsailClient.RelationalDatabaseLogStreams
	*	- LightsailClient.RelationalDatabaseMasterUserPassword
	*	- LightsailClient.RelationalDatabaseMetricData
	*	- LightsailClient.RelationalDatabaseParameters
	*	- LightsailClient.RelationalDatabaseSnapshot
	*	- LightsailClient.RelationalDatabaseSnapshots
	*	- LightsailClient.RelationalDatabases
	*	- LightsailClient.SetupHistory
	*	- LightsailClient.StaticIp
	*	- LightsailClient.StaticIps
	*	- LocationClient.GeofenceCollection
	*	- LocationClient.Key
	*	- LocationClient.Map
	*	- LocationClient.PlaceIndex
	*	- LocationClient.RouteCalculator
	*	- LocationClient.Tracker
	*	- LocationClient.DevicePosition
	*	- LocationClient.DevicePositionHistory
	*	- LocationClient.Geofence
	*	- LocationClient.MapGlyphs
	*	- LocationClient.MapSprites
	*	- LocationClient.MapStyleDescriptor
	*	- LocationClient.MapTile
	*	- LocationClient.Place
	*	- LocationClient.DevicePositions
	*	- LocationClient.GeofenceCollections
	*	- LocationClient.Geofences
	*	- LocationClient.Keys
	*	- LocationClient.Maps
	*	- LocationClient.PlaceIndexes
	*	- LocationClient.RouteCalculators
	*	- LocationClient.TagsForResource
	*	- LocationClient.TrackerConsumers
	*	- LocationClient.Trackers
	*	- LookoutEquipmentClient.DataIngestionJob
	*	- LookoutEquipmentClient.Dataset
	*	- LookoutEquipmentClient.InferenceScheduler
	*	- LookoutEquipmentClient.Label
	*	- LookoutEquipmentClient.LabelGroup
	*	- LookoutEquipmentClient.Model
	*	- LookoutEquipmentClient.ModelVersion
	*	- LookoutEquipmentClient.ResourcePolicy
	*	- LookoutEquipmentClient.RetrainingScheduler
	*	- LookoutEquipmentClient.DataIngestionJobs
	*	- LookoutEquipmentClient.Datasets
	*	- LookoutEquipmentClient.InferenceEvents
	*	- LookoutEquipmentClient.InferenceExecutions
	*	- LookoutEquipmentClient.InferenceSchedulers
	*	- LookoutEquipmentClient.LabelGroups
	*	- LookoutEquipmentClient.Labels
	*	- LookoutEquipmentClient.ModelVersions
	*	- LookoutEquipmentClient.Models
	*	- LookoutEquipmentClient.RetrainingSchedulers
	*	- LookoutEquipmentClient.SensorStatistics
	*	- LookoutEquipmentClient.TagsForResource
	*	- LookoutMetricsClient.Alert
	*	- LookoutMetricsClient.AnomalyDetectionExecutions
	*	- LookoutMetricsClient.AnomalyDetector
	*	- LookoutMetricsClient.MetricSet
	*	- LookoutMetricsClient.AnomalyGroup
	*	- LookoutMetricsClient.DataQualityMetrics
	*	- LookoutMetricsClient.Feedback
	*	- LookoutMetricsClient.SampleData
	*	- LookoutMetricsClient.Alerts
	*	- LookoutMetricsClient.AnomalyDetectors
	*	- LookoutMetricsClient.AnomalyGroupRelatedMetrics
	*	- LookoutMetricsClient.AnomalyGroupSummaries
	*	- LookoutMetricsClient.AnomalyGroupTimeSeries
	*	- LookoutMetricsClient.MetricSets
	*	- LookoutMetricsClient.TagsForResource
	*	- LookoutVisionClient.Dataset
	*	- LookoutVisionClient.Model
	*	- LookoutVisionClient.ModelPackagingJob
	*	- LookoutVisionClient.Project
	*	- LookoutVisionClient.DatasetEntries
	*	- LookoutVisionClient.ModelPackagingJobs
	*	- LookoutVisionClient.Models
	*	- LookoutVisionClient.Projects
	*	- LookoutVisionClient.TagsForResource
	*	- MachineLearningClient.BatchPredictions
	*	- MachineLearningClient.DataSources
	*	- MachineLearningClient.Evaluations
	*	- MachineLearningClient.MLModels
	*	- MachineLearningClient.Tags
	*	- MachineLearningClient.BatchPrediction
	*	- MachineLearningClient.DataSource
	*	- MachineLearningClient.Evaluation
	*	- MachineLearningClient.MLModel
	*	- MacieClient.MemberAccounts
	*	- MacieClient.S3Resources
	*	- ManagedBlockchainClient.Accessor
	*	- ManagedBlockchainClient.Member
	*	- ManagedBlockchainClient.Network
	*	- ManagedBlockchainClient.Node
	*	- ManagedBlockchainClient.Proposal
	*	- ManagedBlockchainClient.Accessors
	*	- ManagedBlockchainClient.Invitations
	*	- ManagedBlockchainClient.Members
	*	- ManagedBlockchainClient.Networks
	*	- ManagedBlockchainClient.Nodes
	*	- ManagedBlockchainClient.ProposalVotes
	*	- ManagedBlockchainClient.Proposals
	*	- ManagedBlockchainClient.TagsForResource
	*	- MediaConnectClient.Bridge
	*	- MediaConnectClient.Flow
	*	- MediaConnectClient.FlowSourceMetadata
	*	- MediaConnectClient.FlowSourceThumbnail
	*	- MediaConnectClient.Gateway
	*	- MediaConnectClient.GatewayInstance
	*	- MediaConnectClient.Offering
	*	- MediaConnectClient.Reservation
	*	- MediaConnectClient.Bridges
	*	- MediaConnectClient.Entitlements
	*	- MediaConnectClient.Flows
	*	- MediaConnectClient.GatewayInstances
	*	- MediaConnectClient.Gateways
	*	- MediaConnectClient.Offerings
	*	- MediaConnectClient.Reservations
	*	- MediaConnectClient.TagsForResource
	*	- MediaConvertClient.Endpoints
	*	- MediaConvertClient.Job
	*	- MediaConvertClient.JobTemplate
	*	- MediaConvertClient.Policy
	*	- MediaConvertClient.Preset
	*	- MediaConvertClient.Queue
	*	- MediaConvertClient.JobTemplates
	*	- MediaConvertClient.Jobs
	*	- MediaConvertClient.Presets
	*	- MediaConvertClient.Queues
	*	- MediaConvertClient.TagsForResource
	*	- MediaConvertClient.Versions
	*	- MediaLiveClient.AccountConfiguration
	*	- MediaLiveClient.Channel
	*	- MediaLiveClient.ChannelPlacementGroup
	*	- MediaLiveClient.Cluster
	*	- MediaLiveClient.Input
	*	- MediaLiveClient.InputDevice
	*	- MediaLiveClient.InputDeviceThumbnail
	*	- MediaLiveClient.InputSecurityGroup
	*	- MediaLiveClient.Multiplex
	*	- MediaLiveClient.MultiplexProgram
	*	- MediaLiveClient.Network
	*	- MediaLiveClient.Node
	*	- MediaLiveClient.Offering
	*	- MediaLiveClient.Reservation
	*	- MediaLiveClient.Schedule
	*	- MediaLiveClient.Thumbnails
	*	- MediaLiveClient.CloudWatchAlarmTemplate
	*	- MediaLiveClient.CloudWatchAlarmTemplateGroup
	*	- MediaLiveClient.EventBridgeRuleTemplate
	*	- MediaLiveClient.EventBridgeRuleTemplateGroup
	*	- MediaLiveClient.SignalMap
	*	- MediaLiveClient.ChannelPlacementGroups
	*	- MediaLiveClient.Channels
	*	- MediaLiveClient.CloudWatchAlarmTemplateGroups
	*	- MediaLiveClient.CloudWatchAlarmTemplates
	*	- MediaLiveClient.Clusters
	*	- MediaLiveClient.EventBridgeRuleTemplateGroups
	*	- MediaLiveClient.EventBridgeRuleTemplates
	*	- MediaLiveClient.InputDeviceTransfers
	*	- MediaLiveClient.InputDevices
	*	- MediaLiveClient.InputSecurityGroups
	*	- MediaLiveClient.Inputs
	*	- MediaLiveClient.MultiplexPrograms
	*	- MediaLiveClient.Multiplexes
	*	- MediaLiveClient.Networks
	*	- MediaLiveClient.Nodes
	*	- MediaLiveClient.Offerings
	*	- MediaLiveClient.Reservations
	*	- MediaLiveClient.SignalMaps
	*	- MediaLiveClient.TagsForResource
	*	- MediaLiveClient.Versions
	*	- MediaPackageClient.Channel
	*	- MediaPackageClient.HarvestJob
	*	- MediaPackageClient.OriginEndpoint
	*	- MediaPackageClient.Channels
	*	- MediaPackageClient.HarvestJobs
	*	- MediaPackageClient.OriginEndpoints
	*	- MediaPackageClient.TagsForResource
	*	- MediaPackageVodClient.Asset
	*	- MediaPackageVodClient.PackagingConfiguration
	*	- MediaPackageVodClient.PackagingGroup
	*	- MediaPackageVodClient.Assets
	*	- MediaPackageVodClient.PackagingConfigurations
	*	- MediaPackageVodClient.PackagingGroups
	*	- MediaPackageVodClient.TagsForResource
	*	- MediaStoreClient.Container
	*	- MediaStoreClient.ContainerPolicy
	*	- MediaStoreClient.CorsPolicy
	*	- MediaStoreClient.LifecyclePolicy
	*	- MediaStoreClient.MetricPolicy
	*	- MediaStoreClient.Containers
	*	- MediaStoreClient.TagsForResource
	*	- MediaTailorClient.Channel
	*	- MediaTailorClient.LiveSource
	*	- MediaTailorClient.Program
	*	- MediaTailorClient.SourceLocation
	*	- MediaTailorClient.VodSource
	*	- MediaTailorClient.ChannelPolicy
	*	- MediaTailorClient.ChannelSchedule
	*	- MediaTailorClient.PlaybackConfiguration
	*	- MediaTailorClient.PrefetchSchedule
	*	- MediaTailorClient.Alerts
	*	- MediaTailorClient.Channels
	*	- MediaTailorClient.LiveSources
	*	- MediaTailorClient.PlaybackConfigurations
	*	- MediaTailorClient.PrefetchSchedules
	*	- MediaTailorClient.SourceLocations
	*	- MediaTailorClient.TagsForResource
	*	- MediaTailorClient.VodSources
	*	- MemoryDBClient.ACLs
	*	- MemoryDBClient.Clusters
	*	- MemoryDBClient.EngineVersions
	*	- MemoryDBClient.Events
	*	- MemoryDBClient.MultiRegionClusters
	*	- MemoryDBClient.ParameterGroups
	*	- MemoryDBClient.Parameters
	*	- MemoryDBClient.ReservedNodes
	*	- MemoryDBClient.ReservedNodesOfferings
	*	- MemoryDBClient.ServiceUpdates
	*	- MemoryDBClient.Snapshots
	*	- MemoryDBClient.SubnetGroups
	*	- MemoryDBClient.Users
	*	- MemoryDBClient.AllowedMultiRegionClusterUpdates
	*	- MemoryDBClient.AllowedNodeTypeUpdates
	*	- MemoryDBClient.Tags
	*	- MgnClient.JobLogItems
	*	- MgnClient.Jobs
	*	- MgnClient.LaunchConfigurationTemplates
	*	- MgnClient.ReplicationConfigurationTemplates
	*	- MgnClient.SourceServers
	*	- MgnClient.VcenterClients
	*	- MgnClient.LaunchConfiguration
	*	- MgnClient.ReplicationConfiguration
	*	- MgnClient.Applications
	*	- MgnClient.Connectors
	*	- MgnClient.ExportErrors
	*	- MgnClient.Exports
	*	- MgnClient.ImportErrors
	*	- MgnClient.Imports
	*	- MgnClient.ManagedAccounts
	*	- MgnClient.SourceServerActions
	*	- MgnClient.TagsForResource
	*	- MgnClient.TemplateActions
	*	- MgnClient.Waves
	*	- MigrationHubClient.ApplicationState
	*	- MigrationHubClient.MigrationTask
	*	- MigrationHubClient.ApplicationStates
	*	- MigrationHubClient.CreatedArtifacts
	*	- MigrationHubClient.DiscoveredResources
	*	- MigrationHubClient.MigrationTaskUpdates
	*	- MigrationHubClient.MigrationTasks
	*	- MigrationHubClient.ProgressUpdateStreams
	*	- MigrationHubClient.SourceResources
	*	- MigrationHubConfigClient.HomeRegionControls
	*	- MigrationHubConfigClient.HomeRegion
	*	- MigrationHubRefactorSpacesClient.Application
	*	- MigrationHubRefactorSpacesClient.Environment
	*	- MigrationHubRefactorSpacesClient.ResourcePolicy
	*	- MigrationHubRefactorSpacesClient.Route
	*	- MigrationHubRefactorSpacesClient.Service
	*	- MigrationHubRefactorSpacesClient.Applications
	*	- MigrationHubRefactorSpacesClient.EnvironmentVpcs
	*	- MigrationHubRefactorSpacesClient.Environments
	*	- MigrationHubRefactorSpacesClient.Routes
	*	- MigrationHubRefactorSpacesClient.Services
	*	- MigrationHubRefactorSpacesClient.TagsForResource
	*	- MigrationHubStrategyClient.ApplicationComponentDetails
	*	- MigrationHubStrategyClient.ApplicationComponentStrategies
	*	- MigrationHubStrategyClient.Assessment
	*	- MigrationHubStrategyClient.ImportFileTask
	*	- MigrationHubStrategyClient.LatestAssessmentId
	*	- MigrationHubStrategyClient.PortfolioPreferences
	*	- MigrationHubStrategyClient.PortfolioSummary
	*	- MigrationHubStrategyClient.RecommendationReportDetails
	*	- MigrationHubStrategyClient.ServerDetails
	*	- MigrationHubStrategyClient.ServerStrategies
	*	- MigrationHubStrategyClient.AnalyzableServers
	*	- MigrationHubStrategyClient.ApplicationComponents
	*	- MigrationHubStrategyClient.Collectors
	*	- MigrationHubStrategyClient.ImportFileTask
	*	- MigrationHubStrategyClient.Servers
	*	- MobileClient.Bundle
	*	- MobileClient.Project
	*	- MobileClient.Bundles
	*	- MobileClient.Projects
	*	- MqClient.Broker
	*	- MqClient.BrokerEngineTypes
	*	- MqClient.BrokerInstanceOptions
	*	- MqClient.Configuration
	*	- MqClient.ConfigurationRevision
	*	- MqClient.User
	*	- MqClient.Brokers
	*	- MqClient.ConfigurationRevisions
	*	- MqClient.Configurations
	*	- MqClient.Tags
	*	- MqClient.Users
	*	- MTurkClient.AccountBalance
	*	- MTurkClient.Assignment
	*	- MTurkClient.FileUploadURL
	*	- MTurkClient.HIT
	*	- MTurkClient.QualificationScore
	*	- MTurkClient.QualificationType
	*	- MTurkClient.AssignmentsForHIT
	*	- MTurkClient.BonusPayments
	*	- MTurkClient.HITs
	*	- MTurkClient.HITsForQualificationType
	*	- MTurkClient.QualificationRequests
	*	- MTurkClient.QualificationTypes
	*	- MTurkClient.ReviewPolicyResultsForHIT
	*	- MTurkClient.ReviewableHITs
	*	- MTurkClient.WorkerBlocks
	*	- MTurkClient.WorkersWithQualificationType
	*	- MWAAClient.Environment
	*	- MWAAClient.Environments
	*	- MWAAClient.TagsForResource
	*	- NeptuneClient.DBClusterEndpoints
	*	- NeptuneClient.DBClusterParameterGroups
	*	- NeptuneClient.DBClusterParameters
	*	- NeptuneClient.DBClusterSnapshotAttributes
	*	- NeptuneClient.DBClusterSnapshots
	*	- NeptuneClient.DBClusters
	*	- NeptuneClient.DBEngineVersions
	*	- NeptuneClient.DBInstances
	*	- NeptuneClient.DBParameterGroups
	*	- NeptuneClient.DBParameters
	*	- NeptuneClient.DBSubnetGroups
	*	- NeptuneClient.EngineDefaultClusterParameters
	*	- NeptuneClient.EngineDefaultParameters
	*	- NeptuneClient.EventCategories
	*	- NeptuneClient.EventSubscriptions
	*	- NeptuneClient.Events
	*	- NeptuneClient.GlobalClusters
	*	- NeptuneClient.OrderableDBInstanceOptions
	*	- NeptuneClient.PendingMaintenanceActions
	*	- NeptuneClient.ValidDBInstanceModifications
	*	- NeptuneClient.TagsForResource
	*	- NetworkFirewallClient.Firewall
	*	- NetworkFirewallClient.FirewallPolicy
	*	- NetworkFirewallClient.FlowOperation
	*	- NetworkFirewallClient.LoggingConfiguration
	*	- NetworkFirewallClient.ResourcePolicy
	*	- NetworkFirewallClient.RuleGroup
	*	- NetworkFirewallClient.RuleGroupMetadata
	*	- NetworkFirewallClient.TLSInspectionConfiguration
	*	- NetworkFirewallClient.AnalysisReportResults
	*	- NetworkFirewallClient.AnalysisReports
	*	- NetworkFirewallClient.FirewallPolicies
	*	- NetworkFirewallClient.Firewalls
	*	- NetworkFirewallClient.FlowOperationResults
	*	- NetworkFirewallClient.FlowOperations
	*	- NetworkFirewallClient.RuleGroups
	*	- NetworkFirewallClient.TLSInspectionConfigurations
	*	- NetworkFirewallClient.TagsForResource
	*	- NetworkManagerClient.GlobalNetworks
	*	- NetworkManagerClient.ConnectAttachment
	*	- NetworkManagerClient.ConnectPeerAssociations
	*	- NetworkManagerClient.ConnectPeer
	*	- NetworkManagerClient.Connections
	*	- NetworkManagerClient.CoreNetworkChangeEvents
	*	- NetworkManagerClient.CoreNetworkChangeSet
	*	- NetworkManagerClient.CoreNetwork
	*	- NetworkManagerClient.CoreNetworkPolicy
	*	- NetworkManagerClient.CustomerGatewayAssociations
	*	- NetworkManagerClient.Devices
	*	- NetworkManagerClient.DirectConnectGatewayAttachment
	*	- NetworkManagerClient.LinkAssociations
	*	- NetworkManagerClient.Links
	*	- NetworkManagerClient.NetworkResourceCounts
	*	- NetworkManagerClient.NetworkResourceRelationships
	*	- NetworkManagerClient.NetworkResources
	*	- NetworkManagerClient.NetworkRoutes
	*	- NetworkManagerClient.NetworkTelemetry
	*	- NetworkManagerClient.ResourcePolicy
	*	- NetworkManagerClient.RouteAnalysis
	*	- NetworkManagerClient.SiteToSiteVpnAttachment
	*	- NetworkManagerClient.Sites
	*	- NetworkManagerClient.TransitGatewayConnectPeerAssociations
	*	- NetworkManagerClient.TransitGatewayPeering
	*	- NetworkManagerClient.TransitGatewayRegistrations
	*	- NetworkManagerClient.TransitGatewayRouteTableAttachment
	*	- NetworkManagerClient.VpcAttachment
	*	- NetworkManagerClient.Attachments
	*	- NetworkManagerClient.ConnectPeers
	*	- NetworkManagerClient.CoreNetworkPolicyVersions
	*	- NetworkManagerClient.CoreNetworks
	*	- NetworkManagerClient.OrganizationServiceAccessStatus
	*	- NetworkManagerClient.Peerings
	*	- NetworkManagerClient.TagsForResource
	*	- NimbleClient.Eula
	*	- NimbleClient.LaunchProfile
	*	- NimbleClient.LaunchProfileDetails
	*	- NimbleClient.LaunchProfileInitialization
	*	- NimbleClient.LaunchProfileMember
	*	- NimbleClient.StreamingImage
	*	- NimbleClient.StreamingSessionBackup
	*	- NimbleClient.StreamingSession
	*	- NimbleClient.StreamingSessionStream
	*	- NimbleClient.Studio
	*	- NimbleClient.StudioComponent
	*	- NimbleClient.StudioMember
	*	- NimbleClient.EulaAcceptances
	*	- NimbleClient.Eulas
	*	- NimbleClient.LaunchProfileMembers
	*	- NimbleClient.LaunchProfiles
	*	- NimbleClient.StreamingImages
	*	- NimbleClient.StreamingSessionBackups
	*	- NimbleClient.StreamingSessions
	*	- NimbleClient.StudioComponents
	*	- NimbleClient.StudioMembers
	*	- NimbleClient.Studios
	*	- NimbleClient.TagsForResource
	*	- OpenSearchClient.DomainAutoTunes
	*	- OpenSearchClient.DomainChangeProgress
	*	- OpenSearchClient.Domain
	*	- OpenSearchClient.DomainConfig
	*	- OpenSearchClient.DomainHealth
	*	- OpenSearchClient.DomainNodes
	*	- OpenSearchClient.Domains
	*	- OpenSearchClient.DryRunProgress
	*	- OpenSearchClient.InboundConnections
	*	- OpenSearchClient.InstanceTypeLimits
	*	- OpenSearchClient.OutboundConnections
	*	- OpenSearchClient.Packages
	*	- OpenSearchClient.ReservedInstanceOfferings
	*	- OpenSearchClient.ReservedInstances
	*	- OpenSearchClient.VpcEndpoints
	*	- OpenSearchClient.Application
	*	- OpenSearchClient.CompatibleVersions
	*	- OpenSearchClient.DataSource
	*	- OpenSearchClient.DirectQueryDataSource
	*	- OpenSearchClient.DomainMaintenanceStatus
	*	- OpenSearchClient.PackageVersionHistory
	*	- OpenSearchClient.UpgradeHistory
	*	- OpenSearchClient.UpgradeStatus
	*	- OpenSearchClient.Applications
	*	- OpenSearchClient.DataSources
	*	- OpenSearchClient.DirectQueryDataSources
	*	- OpenSearchClient.DomainMaintenances
	*	- OpenSearchClient.DomainNames
	*	- OpenSearchClient.DomainsForPackage
	*	- OpenSearchClient.InstanceTypeDetails
	*	- OpenSearchClient.PackagesForDomain
	*	- OpenSearchClient.ScheduledActions
	*	- OpenSearchClient.Tags
	*	- OpenSearchClient.Versions
	*	- OpenSearchClient.VpcEndpointAccess
	*	- OpenSearchClient.VpcEndpoints
	*	- OpenSearchClient.VpcEndpointsForDomain
	*	- OpsWorksClient.AgentVersions
	*	- OpsWorksClient.Apps
	*	- OpsWorksClient.
	*	- OpsWorksClient.Deployments
	*	- OpsWorksClient.EcsClusters
	*	- OpsWorksClient.ElasticIps
	*	- OpsWorksClient.ElasticLoadBalancers
	*	- OpsWorksClient.Instances
	*	- OpsWorksClient.Layers
	*	- OpsWorksClient.LoadBasedAutoScaling
	*	- OpsWorksClient.MyUserProfile
	*	- OpsWorksClient.OperatingSystems
	*	- OpsWorksClient.Permissions
	*	- OpsWorksClient.RaidArrays
	*	- OpsWorksClient.RdsDbInstances
	*	- OpsWorksClient.ServiceErrors
	*	- OpsWorksClient.StackProvisioningParameters
	*	- OpsWorksClient.StackSummary
	*	- OpsWorksClient.Stacks
	*	- OpsWorksClient.TimeBasedAutoScaling
	*	- OpsWorksClient.UserProfiles
	*	- OpsWorksClient.Volumes
	*	- OpsWorksClient.HostnameSuggestion
	*	- OpsWorksClient.Tags
	*	- OpsWorksCMClient.AccountAttributes
	*	- OpsWorksCMClient.Backups
	*	- OpsWorksCMClient.Events
	*	- OpsWorksCMClient.NodeAssociationStatus
	*	- OpsWorksCMClient.Servers
	*	- OpsWorksCMClient.TagsForResource
	*	- OrganizationsClient.Account
	*	- OrganizationsClient.CreateAccountStatus
	*	- OrganizationsClient.EffectivePolicy
	*	- OrganizationsClient.Handshake
	*	- OrganizationsClient.Organization
	*	- OrganizationsClient.OrganizationalUnit
	*	- OrganizationsClient.Policy
	*	- OrganizationsClient.ResourcePolicy
	*	- OrganizationsClient.AWSServiceAccessForOrganization
	*	- OrganizationsClient.Accounts
	*	- OrganizationsClient.AccountsForParent
	*	- OrganizationsClient.Children
	*	- OrganizationsClient.CreateAccountStatus
	*	- OrganizationsClient.DelegatedAdministrators
	*	- OrganizationsClient.DelegatedServicesForAccount
	*	- OrganizationsClient.HandshakesForAccount
	*	- OrganizationsClient.HandshakesForOrganization
	*	- OrganizationsClient.OrganizationalUnitsForParent
	*	- OrganizationsClient.Parents
	*	- OrganizationsClient.Policies
	*	- OrganizationsClient.PoliciesForTarget
	*	- OrganizationsClient.Roots
	*	- OrganizationsClient.TagsForResource
	*	- OrganizationsClient.TargetsForPolicy
	*	- OutpostsClient.CapacityTask
	*	- OutpostsClient.CatalogItem
	*	- OutpostsClient.Connection
	*	- OutpostsClient.Order
	*	- OutpostsClient.Outpost
	*	- OutpostsClient.OutpostInstanceTypes
	*	- OutpostsClient.OutpostSupportedInstanceTypes
	*	- OutpostsClient.SiteAddress
	*	- OutpostsClient.Site
	*	- OutpostsClient.AssetInstances
	*	- OutpostsClient.Assets
	*	- OutpostsClient.BlockingInstancesForCapacityTask
	*	- OutpostsClient.CapacityTasks
	*	- OutpostsClient.CatalogItems
	*	- OutpostsClient.Orders
	*	- OutpostsClient.Outposts
	*	- OutpostsClient.Sites
	*	- OutpostsClient.TagsForResource
	*	- PanoramaClient.ApplicationInstance
	*	- PanoramaClient.ApplicationInstanceDetails
	*	- PanoramaClient.Device
	*	- PanoramaClient.DeviceJob
	*	- PanoramaClient.Node
	*	- PanoramaClient.NodeFromTemplateJob
	*	- PanoramaClient.Package
	*	- PanoramaClient.PackageImportJob
	*	- PanoramaClient.PackageVersion
	*	- PanoramaClient.ApplicationInstanceDependencies
	*	- PanoramaClient.ApplicationInstanceNodeInstances
	*	- PanoramaClient.ApplicationInstances
	*	- PanoramaClient.Devices
	*	- PanoramaClient.DevicesJobs
	*	- PanoramaClient.NodeFromTemplateJobs
	*	- PanoramaClient.Nodes
	*	- PanoramaClient.PackageImportJobs
	*	- PanoramaClient.Packages
	*	- PanoramaClient.TagsForResource
	*	- PersonalizeClient.Algorithm
	*	- PersonalizeClient.BatchInferenceJob
	*	- PersonalizeClient.BatchSegmentJob
	*	- PersonalizeClient.Campaign
	*	- PersonalizeClient.DataDeletionJob
	*	- PersonalizeClient.Dataset
	*	- PersonalizeClient.DatasetExportJob
	*	- PersonalizeClient.DatasetGroup
	*	- PersonalizeClient.DatasetImportJob
	*	- PersonalizeClient.EventTracker
	*	- PersonalizeClient.FeatureTransformation
	*	- PersonalizeClient.Filter
	*	- PersonalizeClient.MetricAttribution
	*	- PersonalizeClient.Recipe
	*	- PersonalizeClient.Recommender
	*	- PersonalizeClient.Schema
	*	- PersonalizeClient.Solution
	*	- PersonalizeClient.SolutionVersion
	*	- PersonalizeClient.SolutionMetrics
	*	- PersonalizeClient.BatchInferenceJobs
	*	- PersonalizeClient.BatchSegmentJobs
	*	- PersonalizeClient.Campaigns
	*	- PersonalizeClient.DataDeletionJobs
	*	- PersonalizeClient.DatasetExportJobs
	*	- PersonalizeClient.DatasetGroups
	*	- PersonalizeClient.DatasetImportJobs
	*	- PersonalizeClient.Datasets
	*	- PersonalizeClient.EventTrackers
	*	- PersonalizeClient.Filters
	*	- PersonalizeClient.MetricAttributionMetrics
	*	- PersonalizeClient.MetricAttributions
	*	- PersonalizeClient.Recipes
	*	- PersonalizeClient.Recommenders
	*	- PersonalizeClient.Schemas
	*	- PersonalizeClient.SolutionVersions
	*	- PersonalizeClient.Solutions
	*	- PersonalizeClient.TagsForResource
	*	- PersonalizeRuntimeClient.ActionRecommendations
	*	- PersonalizeRuntimeClient.PersonalizedRanking
	*	- PersonalizeRuntimeClient.Recommendations
	*	- PIClient.DimensionKeys
	*	- PIClient.DimensionKeyDetails
	*	- PIClient.PerformanceAnalysisReport
	*	- PIClient.ResourceMetadata
	*	- PIClient.ResourceMetrics
	*	- PIClient.AvailableResourceDimensions
	*	- PIClient.AvailableResourceMetrics
	*	- PIClient.PerformanceAnalysisReports
	*	- PIClient.TagsForResource
	*	- PinpointClient.AdmChannel
	*	- PinpointClient.ApnsChannel
	*	- PinpointClient.ApnsSandboxChannel
	*	- PinpointClient.ApnsVoipChannel
	*	- PinpointClient.ApnsVoipSandboxChannel
	*	- PinpointClient.App
	*	- PinpointClient.ApplicationDateRangeKpi
	*	- PinpointClient.ApplicationSettings
	*	- PinpointClient.Apps
	*	- PinpointClient.BaiduChannel
	*	- PinpointClient.CampaignActivities
	*	- PinpointClient.Campaign
	*	- PinpointClient.CampaignDateRangeKpi
	*	- PinpointClient.CampaignVersion
	*	- PinpointClient.CampaignVersions
	*	- PinpointClient.Campaigns
	*	- PinpointClient.Channels
	*	- PinpointClient.EmailChannel
	*	- PinpointClient.EmailTemplate
	*	- PinpointClient.Endpoint
	*	- PinpointClient.EventStream
	*	- PinpointClient.ExportJob
	*	- PinpointClient.ExportJobs
	*	- PinpointClient.GcmChannel
	*	- PinpointClient.ImportJob
	*	- PinpointClient.ImportJobs
	*	- PinpointClient.InAppMessages
	*	- PinpointClient.InAppTemplate
	*	- PinpointClient.Journey
	*	- PinpointClient.JourneyDateRangeKpi
	*	- PinpointClient.JourneyExecutionActivityMetrics
	*	- PinpointClient.JourneyExecutionMetrics
	*	- PinpointClient.JourneyRunExecutionActivityMetrics
	*	- PinpointClient.JourneyRunExecutionMetrics
	*	- PinpointClient.JourneyRuns
	*	- PinpointClient.PushTemplate
	*	- PinpointClient.RecommenderConfiguration
	*	- PinpointClient.RecommenderConfigurations
	*	- PinpointClient.Segment
	*	- PinpointClient.SegmentExportJobs
	*	- PinpointClient.SegmentImportJobs
	*	- PinpointClient.SegmentVersion
	*	- PinpointClient.SegmentVersions
	*	- PinpointClient.Segments
	*	- PinpointClient.SmsChannel
	*	- PinpointClient.SmsTemplate
	*	- PinpointClient.UserEndpoints
	*	- PinpointClient.VoiceChannel
	*	- PinpointClient.VoiceTemplate
	*	- PinpointClient.Journeys
	*	- PinpointClient.TagsForResource
	*	- PinpointClient.TemplateVersions
	*	- PinpointClient.Templates
	*	- PinpointEmailClient.Account
	*	- PinpointEmailClient.BlacklistReports
	*	- PinpointEmailClient.ConfigurationSet
	*	- PinpointEmailClient.ConfigurationSetEventDestinations
	*	- PinpointEmailClient.DedicatedIp
	*	- PinpointEmailClient.DedicatedIps
	*	- PinpointEmailClient.DeliverabilityDashboardOptions
	*	- PinpointEmailClient.DeliverabilityTestReport
	*	- PinpointEmailClient.DomainDeliverabilityCampaign
	*	- PinpointEmailClient.DomainStatisticsReport
	*	- PinpointEmailClient.EmailIdentity
	*	- PinpointEmailClient.ConfigurationSets
	*	- PinpointEmailClient.DedicatedIpPools
	*	- PinpointEmailClient.DeliverabilityTestReports
	*	- PinpointEmailClient.DomainDeliverabilityCampaigns
	*	- PinpointEmailClient.EmailIdentities
	*	- PinpointEmailClient.TagsForResource
	*	- PinpointSMSVoiceClient.ConfigurationSetEventDestinations
	*	- PinpointSMSVoiceClient.ConfigurationSets
	*	- PollyClient.Voices
	*	- PollyClient.Lexicon
	*	- PollyClient.SpeechSynthesisTask
	*	- PollyClient.Lexicons
	*	- PollyClient.SpeechSynthesisTasks
	*	- PricingClient.Services
	*	- PricingClient.AttributeValues
	*	- PricingClient.PriceListFileUrl
	*	- PricingClient.Products
	*	- PricingClient.PriceLists
	*	- ProtonClient.AccountSettings
	*	- ProtonClient.Component
	*	- ProtonClient.Deployment
	*	- ProtonClient.EnvironmentAccountConnection
	*	- ProtonClient.Environment
	*	- ProtonClient.EnvironmentTemplate
	*	- ProtonClient.EnvironmentTemplateVersion
	*	- ProtonClient.Repository
	*	- ProtonClient.RepositorySyncStatus
	*	- ProtonClient.ResourcesSummary
	*	- ProtonClient.Service
	*	- ProtonClient.ServiceInstance
	*	- ProtonClient.ServiceInstanceSyncStatus
	*	- ProtonClient.ServiceSyncBlockerSummary
	*	- ProtonClient.ServiceSyncConfig
	*	- ProtonClient.ServiceTemplate
	*	- ProtonClient.ServiceTemplateVersion
	*	- ProtonClient.TemplateSyncConfig
	*	- ProtonClient.TemplateSyncStatus
	*	- ProtonClient.ComponentOutputs
	*	- ProtonClient.ComponentProvisionedResources
	*	- ProtonClient.Components
	*	- ProtonClient.Deployments
	*	- ProtonClient.EnvironmentAccountConnections
	*	- ProtonClient.EnvironmentOutputs
	*	- ProtonClient.EnvironmentProvisionedResources
	*	- ProtonClient.EnvironmentTemplateVersions
	*	- ProtonClient.EnvironmentTemplates
	*	- ProtonClient.Environments
	*	- ProtonClient.Repositories
	*	- ProtonClient.RepositorySyncDefinitions
	*	- ProtonClient.ServiceInstanceOutputs
	*	- ProtonClient.ServiceInstanceProvisionedResources
	*	- ProtonClient.ServiceInstances
	*	- ProtonClient.ServicePipelineOutputs
	*	- ProtonClient.ServicePipelineProvisionedResources
	*	- ProtonClient.ServiceTemplateVersions
	*	- ProtonClient.ServiceTemplates
	*	- ProtonClient.Services
	*	- ProtonClient.TagsForResource
	*	- QLDBClient.JournalKinesisStream
	*	- QLDBClient.JournalS3Export
	*	- QLDBClient.Ledger
	*	- QLDBClient.Block
	*	- QLDBClient.Digest
	*	- QLDBClient.Revision
	*	- QLDBClient.JournalKinesisStreamsForLedger
	*	- QLDBClient.JournalS3Exports
	*	- QLDBClient.JournalS3ExportsForLedger
	*	- QLDBClient.Ledgers
	*	- QLDBClient.TagsForResource
	*	- QuickSightClient.AccountCustomization
	*	- QuickSightClient.AccountSettings
	*	- QuickSightClient.AccountSubscription
	*	- QuickSightClient.Analysis
	*	- QuickSightClient.AnalysisDefinition
	*	- QuickSightClient.AnalysisPermissions
	*	- QuickSightClient.AssetBundleExportJob
	*	- QuickSightClient.AssetBundleImportJob
	*	- QuickSightClient.BrandAssignment
	*	- QuickSightClient.Brand
	*	- QuickSightClient.BrandPublishedVersion
	*	- QuickSightClient.CustomPermissions
	*	- QuickSightClient.Dashboard
	*	- QuickSightClient.DashboardDefinition
	*	- QuickSightClient.DashboardPermissions
	*	- QuickSightClient.DashboardSnapshotJob
	*	- QuickSightClient.DashboardSnapshotJobResult
	*	- QuickSightClient.DashboardsQAConfiguration
	*	- QuickSightClient.DataSet
	*	- QuickSightClient.DataSetPermissions
	*	- QuickSightClient.DataSetRefreshProperties
	*	- QuickSightClient.DataSource
	*	- QuickSightClient.DataSourcePermissions
	*	- QuickSightClient.DefaultQBusinessApplication
	*	- QuickSightClient.Folder
	*	- QuickSightClient.FolderPermissions
	*	- QuickSightClient.FolderResolvedPermissions
	*	- QuickSightClient.Group
	*	- QuickSightClient.GroupMembership
	*	- QuickSightClient.IAMPolicyAssignment
	*	- QuickSightClient.Ingestion
	*	- QuickSightClient.IpRestriction
	*	- QuickSightClient.KeyRegistration
	*	- QuickSightClient.Namespace
	*	- QuickSightClient.QPersonalizationConfiguration
	*	- QuickSightClient.QuickSightQSearchConfiguration
	*	- QuickSightClient.RefreshSchedule
	*	- QuickSightClient.RoleCustomPermission
	*	- QuickSightClient.TemplateAlias
	*	- QuickSightClient.Template
	*	- QuickSightClient.TemplateDefinition
	*	- QuickSightClient.TemplatePermissions
	*	- QuickSightClient.ThemeAlias
	*	- QuickSightClient.Theme
	*	- QuickSightClient.ThemePermissions
	*	- QuickSightClient.Topic
	*	- QuickSightClient.TopicPermissions
	*	- QuickSightClient.TopicRefresh
	*	- QuickSightClient.TopicRefreshSchedule
	*	- QuickSightClient.User
	*	- QuickSightClient.VPCConnection
	*	- QuickSightClient.DashboardEmbedUrl
	*	- QuickSightClient.SessionEmbedUrl
	*	- QuickSightClient.Analyses
	*	- QuickSightClient.AssetBundleExportJobs
	*	- QuickSightClient.AssetBundleImportJobs
	*	- QuickSightClient.Brands
	*	- QuickSightClient.CustomPermissions
	*	- QuickSightClient.DashboardVersions
	*	- QuickSightClient.Dashboards
	*	- QuickSightClient.DataSets
	*	- QuickSightClient.DataSources
	*	- QuickSightClient.FolderMembers
	*	- QuickSightClient.Folders
	*	- QuickSightClient.FoldersForResource
	*	- QuickSightClient.GroupMemberships
	*	- QuickSightClient.Groups
	*	- QuickSightClient.IAMPolicyAssignments
	*	- QuickSightClient.IAMPolicyAssignmentsForUser
	*	- QuickSightClient.IdentityPropagationConfigs
	*	- QuickSightClient.Ingestions
	*	- QuickSightClient.Namespaces
	*	- QuickSightClient.RefreshSchedules
	*	- QuickSightClient.RoleMemberships
	*	- QuickSightClient.TagsForResource
	*	- QuickSightClient.TemplateAliases
	*	- QuickSightClient.TemplateVersions
	*	- QuickSightClient.Templates
	*	- QuickSightClient.ThemeAliases
	*	- QuickSightClient.ThemeVersions
	*	- QuickSightClient.Themes
	*	- QuickSightClient.TopicRefreshSchedules
	*	- QuickSightClient.TopicReviewedAnswers
	*	- QuickSightClient.Topics
	*	- QuickSightClient.UserGroups
	*	- QuickSightClient.Users
	*	- QuickSightClient.VPCConnections
	*	- RAMClient.Permission
	*	- RAMClient.ResourcePolicies
	*	- RAMClient.ResourceShareAssociations
	*	- RAMClient.ResourceShareInvitations
	*	- RAMClient.ResourceShares
	*	- RAMClient.PendingInvitationResources
	*	- RAMClient.PermissionAssociations
	*	- RAMClient.PermissionVersions
	*	- RAMClient.Permissions
	*	- RAMClient.Principals
	*	- RAMClient.ReplacePermissionAssociationsWork
	*	- RAMClient.ResourceSharePermissions
	*	- RAMClient.ResourceTypes
	*	- RAMClient.Resources
	*	- RbinClient.Rule
	*	- RbinClient.Rules
	*	- RbinClient.TagsForResource
	*	- RDSClient.AccountAttributes
	*	- RDSClient.BlueGreenDeployments
	*	- RDSClient.Certificates
	*	- RDSClient.DBClusterAutomatedBackups
	*	- RDSClient.DBClusterBacktracks
	*	- RDSClient.DBClusterEndpoints
	*	- RDSClient.DBClusterParameterGroups
	*	- RDSClient.DBClusterParameters
	*	- RDSClient.DBClusterSnapshotAttributes
	*	- RDSClient.DBClusterSnapshots
	*	- RDSClient.DBClusters
	*	- RDSClient.DBEngineVersions
	*	- RDSClient.DBInstanceAutomatedBackups
	*	- RDSClient.DBInstances
	*	- RDSClient.DBLogFiles
	*	- RDSClient.DBParameterGroups
	*	- RDSClient.DBParameters
	*	- RDSClient.DBProxies
	*	- RDSClient.DBProxyEndpoints
	*	- RDSClient.DBProxyTargetGroups
	*	- RDSClient.DBProxyTargets
	*	- RDSClient.DBRecommendations
	*	- RDSClient.DBSecurityGroups
	*	- RDSClient.DBShardGroups
	*	- RDSClient.DBSnapshotAttributes
	*	- RDSClient.DBSnapshotTenantDatabases
	*	- RDSClient.DBSnapshots
	*	- RDSClient.DBSubnetGroups
	*	- RDSClient.EngineDefaultClusterParameters
	*	- RDSClient.EngineDefaultParameters
	*	- RDSClient.EventCategories
	*	- RDSClient.EventSubscriptions
	*	- RDSClient.Events
	*	- RDSClient.ExportTasks
	*	- RDSClient.GlobalClusters
	*	- RDSClient.Integrations
	*	- RDSClient.OptionGroupOptions
	*	- RDSClient.OptionGroups
	*	- RDSClient.OrderableDBInstanceOptions
	*	- RDSClient.PendingMaintenanceActions
	*	- RDSClient.ReservedDBInstances
	*	- RDSClient.ReservedDBInstancesOfferings
	*	- RDSClient.SourceRegions
	*	- RDSClient.TenantDatabases
	*	- RDSClient.ValidDBInstanceModifications
	*	- RDSClient.TagsForResource
	*	- RedshiftClient.AccountAttributes
	*	- RedshiftClient.AuthenticationProfiles
	*	- RedshiftClient.ClusterDbRevisions
	*	- RedshiftClient.ClusterParameterGroups
	*	- RedshiftClient.ClusterParameters
	*	- RedshiftClient.ClusterSecurityGroups
	*	- RedshiftClient.ClusterSnapshots
	*	- RedshiftClient.ClusterSubnetGroups
	*	- RedshiftClient.ClusterTracks
	*	- RedshiftClient.ClusterVersions
	*	- RedshiftClient.Clusters
	*	- RedshiftClient.CustomDomainAssociations
	*	- RedshiftClient.DataShares
	*	- RedshiftClient.DataSharesForConsumer
	*	- RedshiftClient.DataSharesForProducer
	*	- RedshiftClient.DefaultClusterParameters
	*	- RedshiftClient.EndpointAccess
	*	- RedshiftClient.EndpointAuthorization
	*	- RedshiftClient.EventCategories
	*	- RedshiftClient.EventSubscriptions
	*	- RedshiftClient.Events
	*	- RedshiftClient.HsmClientCertificates
	*	- RedshiftClient.HsmConfigurations
	*	- RedshiftClient.InboundIntegrations
	*	- RedshiftClient.Integrations
	*	- RedshiftClient.LoggingStatus
	*	- RedshiftClient.NodeConfigurationOptions
	*	- RedshiftClient.OrderableClusterOptions
	*	- RedshiftClient.Partners
	*	- RedshiftClient.RedshiftIdcApplications
	*	- RedshiftClient.ReservedNodeExchangeStatus
	*	- RedshiftClient.ReservedNodeOfferings
	*	- RedshiftClient.ReservedNodes
	*	- RedshiftClient.Resize
	*	- RedshiftClient.ScheduledActions
	*	- RedshiftClient.SnapshotCopyGrants
	*	- RedshiftClient.SnapshotSchedules
	*	- RedshiftClient.Storage
	*	- RedshiftClient.TableRestoreStatus
	*	- RedshiftClient.Tags
	*	- RedshiftClient.UsageLimits
	*	- RedshiftClient.ClusterCredentials
	*	- RedshiftClient.ClusterCredentialsWithIAM
	*	- RedshiftClient.ReservedNodeExchangeConfigurationOptions
	*	- RedshiftClient.ReservedNodeExchangeOfferings
	*	- RedshiftClient.ResourcePolicy
	*	- RedshiftClient.Recommendations
	*	- RedshiftServerlessClient.Credentials
	*	- RedshiftServerlessClient.EndpointAccess
	*	- RedshiftServerlessClient.Namespace
	*	- RedshiftServerlessClient.RecoveryPoint
	*	- RedshiftServerlessClient.ResourcePolicy
	*	- RedshiftServerlessClient.Snapshot
	*	- RedshiftServerlessClient.UsageLimit
	*	- RedshiftServerlessClient.Workgroup
	*	- RedshiftServerlessClient.EndpointAccess
	*	- RedshiftServerlessClient.Namespaces
	*	- RedshiftServerlessClient.RecoveryPoints
	*	- RedshiftServerlessClient.Snapshots
	*	- RedshiftServerlessClient.TagsForResource
	*	- RedshiftServerlessClient.UsageLimits
	*	- RedshiftServerlessClient.Workgroups
	*	- RekognitionClient.Collection
	*	- RekognitionClient.Dataset
	*	- RekognitionClient.ProjectVersions
	*	- RekognitionClient.Projects
	*	- RekognitionClient.StreamProcessor
	*	- RekognitionClient.CelebrityInfo
	*	- RekognitionClient.CelebrityRecognition
	*	- RekognitionClient.ContentModeration
	*	- RekognitionClient.FaceDetection
	*	- RekognitionClient.FaceLivenessSessionResults
	*	- RekognitionClient.FaceSearch
	*	- RekognitionClient.LabelDetection
	*	- RekognitionClient.MediaAnalysisJob
	*	- RekognitionClient.PersonTracking
	*	- RekognitionClient.SegmentDetection
	*	- RekognitionClient.TextDetection
	*	- RekognitionClient.Collections
	*	- RekognitionClient.DatasetEntries
	*	- RekognitionClient.DatasetLabels
	*	- RekognitionClient.Faces
	*	- RekognitionClient.MediaAnalysisJobs
	*	- RekognitionClient.ProjectPolicies
	*	- RekognitionClient.StreamProcessors
	*	- RekognitionClient.TagsForResource
	*	- RekognitionClient.Users
	*	- ResiliencehubClient.AppAssessment
	*	- ResiliencehubClient.App
	*	- ResiliencehubClient.AppVersionAppComponent
	*	- ResiliencehubClient.AppVersion
	*	- ResiliencehubClient.AppVersionResource
	*	- ResiliencehubClient.AppVersionResourcesResolutionStatus
	*	- ResiliencehubClient.AppVersionTemplate
	*	- ResiliencehubClient.DraftAppVersionResourcesImportStatus
	*	- ResiliencehubClient.MetricsExport
	*	- ResiliencehubClient.ResiliencyPolicy
	*	- ResiliencehubClient.ResourceGroupingRecommendationTask
	*	- ResiliencehubClient.AlarmRecommendations
	*	- ResiliencehubClient.AppAssessmentComplianceDrifts
	*	- ResiliencehubClient.AppAssessmentResourceDrifts
	*	- ResiliencehubClient.AppAssessments
	*	- ResiliencehubClient.AppComponentCompliances
	*	- ResiliencehubClient.AppComponentRecommendations
	*	- ResiliencehubClient.AppInputSources
	*	- ResiliencehubClient.AppVersionAppComponents
	*	- ResiliencehubClient.AppVersionResourceMappings
	*	- ResiliencehubClient.AppVersionResources
	*	- ResiliencehubClient.AppVersions
	*	- ResiliencehubClient.Apps
	*	- ResiliencehubClient.Metrics
	*	- ResiliencehubClient.RecommendationTemplates
	*	- ResiliencehubClient.ResiliencyPolicies
	*	- ResiliencehubClient.ResourceGroupingRecommendations
	*	- ResiliencehubClient.SopRecommendations
	*	- ResiliencehubClient.SuggestedResiliencyPolicies
	*	- ResiliencehubClient.TagsForResource
	*	- ResiliencehubClient.TestRecommendations
	*	- ResiliencehubClient.UnsupportedAppVersionResources
	*	- ResourceGroupsClient.AccountSettings
	*	- ResourceGroupsClient.Group
	*	- ResourceGroupsClient.GroupConfiguration
	*	- ResourceGroupsClient.GroupQuery
	*	- ResourceGroupsClient.TagSyncTask
	*	- ResourceGroupsClient.Tags
	*	- ResourceGroupsClient.GroupResources
	*	- ResourceGroupsClient.GroupingStatuses
	*	- ResourceGroupsClient.Groups
	*	- ResourceGroupsClient.TagSyncTasks
	*	- ResourceGroupsTaggingAPIClient.ReportCreation
	*	- ResourceGroupsTaggingAPIClient.ComplianceSummary
	*	- ResourceGroupsTaggingAPIClient.Resources
	*	- ResourceGroupsTaggingAPIClient.TagKeys
	*	- ResourceGroupsTaggingAPIClient.TagValues
	*	- RoboMakerClient.DeploymentJob
	*	- RoboMakerClient.Fleet
	*	- RoboMakerClient.RobotApplication
	*	- RoboMakerClient.Robot
	*	- RoboMakerClient.SimulationApplication
	*	- RoboMakerClient.SimulationJobBatch
	*	- RoboMakerClient.SimulationJob
	*	- RoboMakerClient.World
	*	- RoboMakerClient.WorldExportJob
	*	- RoboMakerClient.WorldGenerationJob
	*	- RoboMakerClient.WorldTemplate
	*	- RoboMakerClient.WorldTemplateBody
	*	- RoboMakerClient.DeploymentJobs
	*	- RoboMakerClient.Fleets
	*	- RoboMakerClient.RobotApplications
	*	- RoboMakerClient.Robots
	*	- RoboMakerClient.SimulationApplications
	*	- RoboMakerClient.SimulationJobBatches
	*	- RoboMakerClient.SimulationJobs
	*	- RoboMakerClient.TagsForResource
	*	- RoboMakerClient.WorldExportJobs
	*	- RoboMakerClient.WorldGenerationJobs
	*	- RoboMakerClient.WorldTemplates
	*	- RoboMakerClient.Worlds
	*	- RUMClient.AppMonitor
	*	- RUMClient.AppMonitorData
	*	- RUMClient.ResourcePolicy
	*	- RUMClient.AppMonitors
	*	- RUMClient.RumMetricsDestinations
	*	- RUMClient.TagsForResource
	*	- S3Client.BucketAccelerateConfiguration
	*	- S3Client.BucketAcl
	*	- S3Client.BucketAnalyticsConfiguration
	*	- S3Client.BucketCors
	*	- S3Client.BucketEncryption
	*	- S3Client.BucketIntelligentTieringConfiguration
	*	- S3Client.BucketInventoryConfiguration
	*	- S3Client.BucketLifecycleConfiguration
	*	- S3Client.BucketLocation
	*	- S3Client.BucketLogging
	*	- S3Client.BucketMetadataTableConfiguration
	*	- S3Client.BucketMetricsConfiguration
	*	- S3Client.BucketNotificationConfiguration
	*	- S3Client.BucketOwnershipControls
	*	- S3Client.BucketPolicy
	*	- S3Client.BucketPolicyStatus
	*	- S3Client.BucketReplication
	*	- S3Client.BucketRequestPayment
	*	- S3Client.BucketTagging
	*	- S3Client.BucketVersioning
	*	- S3Client.BucketWebsite
	*	- S3Client.ObjectAcl
	*	- S3Client.ObjectAttributes
	*	- S3Client.Object
	*	- S3Client.ObjectLegalHold
	*	- S3Client.ObjectLockConfiguration
	*	- S3Client.ObjectRetention
	*	- S3Client.ObjectTagging
	*	- S3Client.ObjectTorrent
	*	- S3Client.PublicAccessBlock
	*	- S3Client.BucketAnalyticsConfigurations
	*	- S3Client.BucketIntelligentTieringConfigurations
	*	- S3Client.BucketInventoryConfigurations
	*	- S3Client.BucketMetricsConfigurations
	*	- S3Client.Buckets
	*	- S3Client.DirectoryBuckets
	*	- S3Client.MultipartUploads
	*	- S3Client.ObjectVersions
	*	- S3Client.Objects
	*	- S3Client.ObjectsV2
	*	- S3Client.Parts
	*	- SageMakerClient.Action
	*	- SageMakerClient.Algorithm
	*	- SageMakerClient.App
	*	- SageMakerClient.AppImageConfig
	*	- SageMakerClient.Artifact
	*	- SageMakerClient.AutoMLJob
	*	- SageMakerClient.AutoMLJobV2
	*	- SageMakerClient.Cluster
	*	- SageMakerClient.ClusterNode
	*	- SageMakerClient.ClusterSchedulerConfig
	*	- SageMakerClient.CodeRepository
	*	- SageMakerClient.CompilationJob
	*	- SageMakerClient.ComputeQuota
	*	- SageMakerClient.Context
	*	- SageMakerClient.DataQualityJobDefinition
	*	- SageMakerClient.Device
	*	- SageMakerClient.DeviceFleet
	*	- SageMakerClient.Domain
	*	- SageMakerClient.EdgeDeploymentPlan
	*	- SageMakerClient.EdgePackagingJob
	*	- SageMakerClient.Endpoint
	*	- SageMakerClient.EndpointConfig
	*	- SageMakerClient.Experiment
	*	- SageMakerClient.FeatureGroup
	*	- SageMakerClient.FeatureMetadata
	*	- SageMakerClient.FlowDefinition
	*	- SageMakerClient.Hub
	*	- SageMakerClient.HubContent
	*	- SageMakerClient.HumanTaskUi
	*	- SageMakerClient.HyperParameterTuningJob
	*	- SageMakerClient.Image
	*	- SageMakerClient.ImageVersion
	*	- SageMakerClient.InferenceComponent
	*	- SageMakerClient.InferenceExperiment
	*	- SageMakerClient.InferenceRecommendationsJob
	*	- SageMakerClient.LabelingJob
	*	- SageMakerClient.LineageGroup
	*	- SageMakerClient.MlflowTrackingServer
	*	- SageMakerClient.ModelBiasJobDefinition
	*	- SageMakerClient.ModelCard
	*	- SageMakerClient.ModelCardExportJob
	*	- SageMakerClient.Model
	*	- SageMakerClient.ModelExplainabilityJobDefinition
	*	- SageMakerClient.ModelPackage
	*	- SageMakerClient.ModelPackageGroup
	*	- SageMakerClient.ModelQualityJobDefinition
	*	- SageMakerClient.MonitoringSchedule
	*	- SageMakerClient.NotebookInstance
	*	- SageMakerClient.NotebookInstanceLifecycleConfig
	*	- SageMakerClient.OptimizationJob
	*	- SageMakerClient.PartnerApp
	*	- SageMakerClient.Pipeline
	*	- SageMakerClient.PipelineDefinitionForExecution
	*	- SageMakerClient.PipelineExecution
	*	- SageMakerClient.ProcessingJob
	*	- SageMakerClient.Project
	*	- SageMakerClient.Space
	*	- SageMakerClient.StudioLifecycleConfig
	*	- SageMakerClient.SubscribedWorkteam
	*	- SageMakerClient.TrainingJob
	*	- SageMakerClient.TrainingPlan
	*	- SageMakerClient.TransformJob
	*	- SageMakerClient.Trial
	*	- SageMakerClient.TrialComponent
	*	- SageMakerClient.UserProfile
	*	- SageMakerClient.Workforce
	*	- SageMakerClient.Workteam
	*	- SageMakerClient.DeviceFleetReport
	*	- SageMakerClient.LineageGroupPolicy
	*	- SageMakerClient.ModelPackageGroupPolicy
	*	- SageMakerClient.SagemakerServicecatalogPortfolioStatus
	*	- SageMakerClient.ScalingConfigurationRecommendation
	*	- SageMakerClient.SearchSuggestions
	*	- SageMakerClient.Actions
	*	- SageMakerClient.Algorithms
	*	- SageMakerClient.Aliases
	*	- SageMakerClient.AppImageConfigs
	*	- SageMakerClient.Apps
	*	- SageMakerClient.Artifacts
	*	- SageMakerClient.Associations
	*	- SageMakerClient.AutoMLJobs
	*	- SageMakerClient.CandidatesForAutoMLJob
	*	- SageMakerClient.ClusterNodes
	*	- SageMakerClient.ClusterSchedulerConfigs
	*	- SageMakerClient.Clusters
	*	- SageMakerClient.CodeRepositories
	*	- SageMakerClient.CompilationJobs
	*	- SageMakerClient.ComputeQuotas
	*	- SageMakerClient.Contexts
	*	- SageMakerClient.DataQualityJobDefinitions
	*	- SageMakerClient.DeviceFleets
	*	- SageMakerClient.Devices
	*	- SageMakerClient.Domains
	*	- SageMakerClient.EdgeDeploymentPlans
	*	- SageMakerClient.EdgePackagingJobs
	*	- SageMakerClient.EndpointConfigs
	*	- SageMakerClient.Endpoints
	*	- SageMakerClient.Experiments
	*	- SageMakerClient.FeatureGroups
	*	- SageMakerClient.FlowDefinitions
	*	- SageMakerClient.HubContentVersions
	*	- SageMakerClient.HubContents
	*	- SageMakerClient.Hubs
	*	- SageMakerClient.HumanTaskUis
	*	- SageMakerClient.HyperParameterTuningJobs
	*	- SageMakerClient.ImageVersions
	*	- SageMakerClient.Images
	*	- SageMakerClient.InferenceComponents
	*	- SageMakerClient.InferenceExperiments
	*	- SageMakerClient.InferenceRecommendationsJobSteps
	*	- SageMakerClient.InferenceRecommendationsJobs
	*	- SageMakerClient.LabelingJobs
	*	- SageMakerClient.LabelingJobsForWorkteam
	*	- SageMakerClient.LineageGroups
	*	- SageMakerClient.MlflowTrackingServers
	*	- SageMakerClient.ModelBiasJobDefinitions
	*	- SageMakerClient.ModelCardExportJobs
	*	- SageMakerClient.ModelCardVersions
	*	- SageMakerClient.ModelCards
	*	- SageMakerClient.ModelExplainabilityJobDefinitions
	*	- SageMakerClient.ModelMetadata
	*	- SageMakerClient.ModelPackageGroups
	*	- SageMakerClient.ModelPackages
	*	- SageMakerClient.ModelQualityJobDefinitions
	*	- SageMakerClient.Models
	*	- SageMakerClient.MonitoringAlertHistory
	*	- SageMakerClient.MonitoringAlerts
	*	- SageMakerClient.MonitoringExecutions
	*	- SageMakerClient.MonitoringSchedules
	*	- SageMakerClient.NotebookInstanceLifecycleConfigs
	*	- SageMakerClient.NotebookInstances
	*	- SageMakerClient.OptimizationJobs
	*	- SageMakerClient.PartnerApps
	*	- SageMakerClient.PipelineExecutionSteps
	*	- SageMakerClient.PipelineExecutions
	*	- SageMakerClient.PipelineParametersForExecution
	*	- SageMakerClient.Pipelines
	*	- SageMakerClient.ProcessingJobs
	*	- SageMakerClient.Projects
	*	- SageMakerClient.ResourceCatalogs
	*	- SageMakerClient.Spaces
	*	- SageMakerClient.StageDevices
	*	- SageMakerClient.StudioLifecycleConfigs
	*	- SageMakerClient.SubscribedWorkteams
	*	- SageMakerClient.Tags
	*	- SageMakerClient.TrainingJobs
	*	- SageMakerClient.TrainingJobsForHyperParameterTuningJob
	*	- SageMakerClient.TrainingPlans
	*	- SageMakerClient.TransformJobs
	*	- SageMakerClient.TrialComponents
	*	- SageMakerClient.Trials
	*	- SageMakerClient.UserProfiles
	*	- SageMakerClient.Workforces
	*	- SageMakerClient.Workteams
	*	- SagemakerEdgeClient.Deployments
	*	- SagemakerEdgeClient.DeviceRegistration
	*	- SageMakerFeatureStoreRuntimeClient.Record
	*	- SavingsplansClient.SavingsPlanRates
	*	- SavingsplansClient.SavingsPlans
	*	- SavingsplansClient.SavingsPlansOfferingRates
	*	- SavingsplansClient.SavingsPlansOfferings
	*	- SavingsplansClient.TagsForResource
	*	- SchemasClient.CodeBinding
	*	- SchemasClient.Discoverer
	*	- SchemasClient.Registry
	*	- SchemasClient.Schema
	*	- SchemasClient.CodeBindingSource
	*	- SchemasClient.DiscoveredSchema
	*	- SchemasClient.ResourcePolicy
	*	- SchemasClient.Discoverers
	*	- SchemasClient.Registries
	*	- SchemasClient.SchemaVersions
	*	- SchemasClient.Schemas
	*	- SchemasClient.TagsForResource
	*	- SecretsManagerClient.Secret
	*	- SecretsManagerClient.RandomPassword
	*	- SecretsManagerClient.ResourcePolicy
	*	- SecretsManagerClient.SecretValue
	*	- SecretsManagerClient.SecretVersionIds
	*	- SecretsManagerClient.Secrets
	*	- SecurityHubClient.ActionTargets
	*	- SecurityHubClient.Hub
	*	- SecurityHubClient.OrganizationConfiguration
	*	- SecurityHubClient.Products
	*	- SecurityHubClient.Standards
	*	- SecurityHubClient.StandardsControls
	*	- SecurityHubClient.AdministratorAccount
	*	- SecurityHubClient.ConfigurationPolicyAssociation
	*	- SecurityHubClient.ConfigurationPolicy
	*	- SecurityHubClient.EnabledStandards
	*	- SecurityHubClient.FindingAggregator
	*	- SecurityHubClient.FindingHistory
	*	- SecurityHubClient.Findings
	*	- SecurityHubClient.InsightResults
	*	- SecurityHubClient.Insights
	*	- SecurityHubClient.InvitationsCount
	*	- SecurityHubClient.MasterAccount
	*	- SecurityHubClient.Members
	*	- SecurityHubClient.SecurityControlDefinition
	*	- SecurityHubClient.AutomationRules
	*	- SecurityHubClient.ConfigurationPolicies
	*	- SecurityHubClient.ConfigurationPolicyAssociations
	*	- SecurityHubClient.EnabledProductsForImport
	*	- SecurityHubClient.FindingAggregators
	*	- SecurityHubClient.Invitations
	*	- SecurityHubClient.Members
	*	- SecurityHubClient.OrganizationAdminAccounts
	*	- SecurityHubClient.SecurityControlDefinitions
	*	- SecurityHubClient.StandardsControlAssociations
	*	- SecurityHubClient.TagsForResource
	*	- ServerlessApplicationRepositoryClient.Application
	*	- ServerlessApplicationRepositoryClient.ApplicationPolicy
	*	- ServerlessApplicationRepositoryClient.CloudFormationTemplate
	*	- ServerlessApplicationRepositoryClient.ApplicationDependencies
	*	- ServerlessApplicationRepositoryClient.ApplicationVersions
	*	- ServerlessApplicationRepositoryClient.Applications
	*	- ServiceCatalogAppRegistryClient.Application
	*	- ServiceCatalogAppRegistryClient.AssociatedResource
	*	- ServiceCatalogAppRegistryClient.AttributeGroup
	*	- ServiceCatalogAppRegistryClient.Configuration
	*	- ServiceCatalogAppRegistryClient.Applications
	*	- ServiceCatalogAppRegistryClient.AssociatedAttributeGroups
	*	- ServiceCatalogAppRegistryClient.AssociatedResources
	*	- ServiceCatalogAppRegistryClient.AttributeGroups
	*	- ServiceCatalogAppRegistryClient.AttributeGroupsForApplication
	*	- ServiceCatalogAppRegistryClient.TagsForResource
	*	- ServiceDiscoveryClient.Instance
	*	- ServiceDiscoveryClient.InstancesHealthStatus
	*	- ServiceDiscoveryClient.Namespace
	*	- ServiceDiscoveryClient.Operation
	*	- ServiceDiscoveryClient.ServiceAttributes
	*	- ServiceDiscoveryClient.Service
	*	- ServiceDiscoveryClient.Instances
	*	- ServiceDiscoveryClient.Namespaces
	*	- ServiceDiscoveryClient.Operations
	*	- ServiceDiscoveryClient.Services
	*	- ServiceDiscoveryClient.TagsForResource
	*	- ServiceQuotasClient.AWSDefaultServiceQuota
	*	- ServiceQuotasClient.AssociationForServiceQuotaTemplate
	*	- ServiceQuotasClient.RequestedServiceQuotaChange
	*	- ServiceQuotasClient.ServiceQuota
	*	- ServiceQuotasClient.ServiceQuotaIncreaseRequestFromTemplate
	*	- ServiceQuotasClient.AWSDefaultServiceQuotas
	*	- ServiceQuotasClient.RequestedServiceQuotaChangeHistoryByQuota
	*	- ServiceQuotasClient.RequestedServiceQuotaChangeHistory
	*	- ServiceQuotasClient.ServiceQuotaIncreaseRequestsInTemplate
	*	- ServiceQuotasClient.ServiceQuotas
	*	- ServiceQuotasClient.Services
	*	- ServiceQuotasClient.TagsForResource
	*	- SESClient.ActiveReceiptRuleSet
	*	- SESClient.ConfigurationSet
	*	- SESClient.ReceiptRule
	*	- SESClient.ReceiptRuleSet
	*	- SESClient.AccountSendingEnabled
	*	- SESClient.CustomVerificationEmailTemplate
	*	- SESClient.IdentityDkimAttributes
	*	- SESClient.IdentityMailFromDomainAttributes
	*	- SESClient.IdentityNotificationAttributes
	*	- SESClient.IdentityPolicies
	*	- SESClient.IdentityVerificationAttributes
	*	- SESClient.SendQuota
	*	- SESClient.SendStatistics
	*	- SESClient.Template
	*	- SESClient.ConfigurationSets
	*	- SESClient.CustomVerificationEmailTemplates
	*	- SESClient.Identities
	*	- SESClient.IdentityPolicies
	*	- SESClient.ReceiptFilters
	*	- SESClient.ReceiptRuleSets
	*	- SESClient.Templates
	*	- SESClient.VerifiedEmailAddresses
	*	- SFNClient.Activity
	*	- SFNClient.Execution
	*	- SFNClient.MapRun
	*	- SFNClient.StateMachineAlias
	*	- SFNClient.StateMachine
	*	- SFNClient.StateMachineForExecution
	*	- SFNClient.ActivityTask
	*	- SFNClient.ExecutionHistory
	*	- SFNClient.Activities
	*	- SFNClient.Executions
	*	- SFNClient.MapRuns
	*	- SFNClient.StateMachineAliases
	*	- SFNClient.StateMachineVersions
	*	- SFNClient.StateMachines
	*	- SFNClient.TagsForResource
	*	- ShieldClient.Attack
	*	- ShieldClient.AttackStatistics
	*	- ShieldClient.DRTAccess
	*	- ShieldClient.EmergencyContactSettings
	*	- ShieldClient.Protection
	*	- ShieldClient.ProtectionGroup
	*	- ShieldClient.Subscription
	*	- ShieldClient.SubscriptionState
	*	- ShieldClient.Attacks
	*	- ShieldClient.ProtectionGroups
	*	- ShieldClient.Protections
	*	- ShieldClient.ResourcesInProtectionGroup
	*	- ShieldClient.TagsForResource
	*	- SignerClient.SigningJob
	*	- SignerClient.RevocationStatus
	*	- SignerClient.SigningPlatform
	*	- SignerClient.SigningProfile
	*	- SignerClient.ProfilePermissions
	*	- SignerClient.SigningJobs
	*	- SignerClient.SigningPlatforms
	*	- SignerClient.SigningProfiles
	*	- SignerClient.TagsForResource
	*	- SMSClient.App
	*	- SMSClient.AppLaunchConfiguration
	*	- SMSClient.AppReplicationConfiguration
	*	- SMSClient.AppValidationConfiguration
	*	- SMSClient.AppValidationOutput
	*	- SMSClient.Connectors
	*	- SMSClient.ReplicationJobs
	*	- SMSClient.ReplicationRuns
	*	- SMSClient.Servers
	*	- SMSClient.Apps
	*	- SnowballClient.Address
	*	- SnowballClient.Addresses
	*	- SnowballClient.Cluster
	*	- SnowballClient.Job
	*	- SnowballClient.ReturnShippingLabel
	*	- SnowballClient.JobManifest
	*	- SnowballClient.JobUnlockCode
	*	- SnowballClient.SnowballUsage
	*	- SnowballClient.SoftwareUpdates
	*	- SnowballClient.ClusterJobs
	*	- SnowballClient.Clusters
	*	- SnowballClient.CompatibleImages
	*	- SnowballClient.Jobs
	*	- SnowballClient.LongTermPricing
	*	- SnowballClient.PickupLocations
	*	- SnowballClient.ServiceVersions
	*	- SnowDeviceManagementClient.Device
	*	- SnowDeviceManagementClient.DeviceEc2Instances
	*	- SnowDeviceManagementClient.Execution
	*	- SnowDeviceManagementClient.Task
	*	- SnowDeviceManagementClient.DeviceResources
	*	- SnowDeviceManagementClient.Devices
	*	- SnowDeviceManagementClient.Executions
	*	- SnowDeviceManagementClient.TagsForResource
	*	- SnowDeviceManagementClient.Tasks
	*	- SNSClient.DataProtectionPolicy
	*	- SNSClient.EndpointAttributes
	*	- SNSClient.PlatformApplicationAttributes
	*	- SNSClient.SMSAttributes
	*	- SNSClient.SMSSandboxAccountStatus
	*	- SNSClient.SubscriptionAttributes
	*	- SNSClient.TopicAttributes
	*	- SNSClient.EndpointsByPlatformApplication
	*	- SNSClient.OriginationNumbers
	*	- SNSClient.PhoneNumbersOptedOut
	*	- SNSClient.PlatformApplications
	*	- SNSClient.SMSSandboxPhoneNumbers
	*	- SNSClient.SubscriptionsByTopic
	*	- SNSClient.Subscriptions
	*	- SNSClient.TagsForResource
	*	- SNSClient.Topics
	*	- SQSClient.QueueAttributes
	*	- SQSClient.QueueUrl
	*	- SQSClient.DeadLetterSourceQueues
	*	- SQSClient.MessageMoveTasks
	*	- SQSClient.QueueTags
	*	- SQSClient.Queues
	*	- SSMClient.Activations
	*	- SSMClient.Association
	*	- SSMClient.AssociationExecutionTargets
	*	- SSMClient.AssociationExecutions
	*	- SSMClient.AutomationExecutions
	*	- SSMClient.AutomationStepExecutions
	*	- SSMClient.AvailablePatches
	*	- SSMClient.Document
	*	- SSMClient.DocumentPermission
	*	- SSMClient.EffectiveInstanceAssociations
	*	- SSMClient.EffectivePatchesForPatchBaseline
	*	- SSMClient.InstanceAssociationsStatus
	*	- SSMClient.InstanceInformation
	*	- SSMClient.InstancePatchStates
	*	- SSMClient.InstancePatchStatesForPatchGroup
	*	- SSMClient.InstancePatches
	*	- SSMClient.InstanceProperties
	*	- SSMClient.InventoryDeletions
	*	- SSMClient.MaintenanceWindowExecutionTaskInvocations
	*	- SSMClient.MaintenanceWindowExecutionTasks
	*	- SSMClient.MaintenanceWindowExecutions
	*	- SSMClient.MaintenanceWindowSchedule
	*	- SSMClient.MaintenanceWindowTargets
	*	- SSMClient.MaintenanceWindowTasks
	*	- SSMClient.MaintenanceWindows
	*	- SSMClient.MaintenanceWindowsForTarget
	*	- SSMClient.OpsItems
	*	- SSMClient.Parameters
	*	- SSMClient.PatchBaselines
	*	- SSMClient.PatchGroupState
	*	- SSMClient.PatchGroups
	*	- SSMClient.PatchProperties
	*	- SSMClient.Sessions
	*	- SSMClient.AutomationExecution
	*	- SSMClient.CalendarState
	*	- SSMClient.
	*	- SSMClient.ConnectionStatus
	*	- SSMClient.DefaultPatchBaseline
	*	- SSMClient.DeployablePatchSnapshotForInstance
	*	- SSMClient.Document
	*	- SSMClient.ExecutionPreview
	*	- SSMClient.Inventory
	*	- SSMClient.InventorySchema
	*	- SSMClient.MaintenanceWindow
	*	- SSMClient.MaintenanceWindowExecution
	*	- SSMClient.MaintenanceWindowExecutionTask
	*	- SSMClient.MaintenanceWindowExecutionTaskInvocation
	*	- SSMClient.MaintenanceWindowTask
	*	- SSMClient.OpsItem
	*	- SSMClient.OpsMetadata
	*	- SSMClient.OpsSummary
	*	- SSMClient.Parameter
	*	- SSMClient.ParameterHistory
	*	- SSMClient.ParametersByPath
	*	- SSMClient.Parameters
	*	- SSMClient.PatchBaseline
	*	- SSMClient.PatchBaselineForPatchGroup
	*	- SSMClient.ResourcePolicies
	*	- SSMClient.ServiceSetting
	*	- SSMClient.AssociationVersions
	*	- SSMClient.Associations
	*	- SSMClient.
	*	- SSMClient.
	*	- SSMClient.ComplianceItems
	*	- SSMClient.ComplianceSummaries
	*	- SSMClient.DocumentMetadataHistory
	*	- SSMClient.DocumentVersions
	*	- SSMClient.Documents
	*	- SSMClient.InventoryEntries
	*	- SSMClient.Nodes
	*	- SSMClient.NodesSummary
	*	- SSMClient.OpsItemEvents
	*	- SSMClient.OpsItemRelatedItems
	*	- SSMClient.OpsMetadata
	*	- SSMClient.ResourceComplianceSummaries
	*	- SSMClient.ResourceDataSync
	*	- SSMClient.TagsForResource
	*	- SSMContactsClient.Engagement
	*	- SSMContactsClient.Page
	*	- SSMContactsClient.ContactChannel
	*	- SSMContactsClient.Contact
	*	- SSMContactsClient.ContactPolicy
	*	- SSMContactsClient.Rotation
	*	- SSMContactsClient.RotationOverride
	*	- SSMContactsClient.ContactChannels
	*	- SSMContactsClient.Contacts
	*	- SSMContactsClient.Engagements
	*	- SSMContactsClient.PageReceipts
	*	- SSMContactsClient.PageResolutions
	*	- SSMContactsClient.PagesByContact
	*	- SSMContactsClient.PagesByEngagement
	*	- SSMContactsClient.PreviewRotationShifts
	*	- SSMContactsClient.RotationOverrides
	*	- SSMContactsClient.RotationShifts
	*	- SSMContactsClient.Rotations
	*	- SSMContactsClient.TagsForResource
	*	- SSMIncidentsClient.IncidentRecord
	*	- SSMIncidentsClient.ReplicationSet
	*	- SSMIncidentsClient.ResourcePolicies
	*	- SSMIncidentsClient.ResponsePlan
	*	- SSMIncidentsClient.TimelineEvent
	*	- SSMIncidentsClient.IncidentFindings
	*	- SSMIncidentsClient.IncidentRecords
	*	- SSMIncidentsClient.RelatedItems
	*	- SSMIncidentsClient.ReplicationSets
	*	- SSMIncidentsClient.ResponsePlans
	*	- SSMIncidentsClient.TagsForResource
	*	- SSMIncidentsClient.TimelineEvents
	*	- SSOClient.RoleCredentials
	*	- SSOClient.AccountRoles
	*	- SSOClient.Accounts
	*	- SSOAdminClient.AccountAssignmentCreationStatus
	*	- SSOAdminClient.AccountAssignmentDeletionStatus
	*	- SSOAdminClient.ApplicationAssignment
	*	- SSOAdminClient.Application
	*	- SSOAdminClient.ApplicationProvider
	*	- SSOAdminClient.InstanceAccessControlAttributeConfiguration
	*	- SSOAdminClient.Instance
	*	- SSOAdminClient.PermissionSet
	*	- SSOAdminClient.PermissionSetProvisioningStatus
	*	- SSOAdminClient.TrustedTokenIssuer
	*	- SSOAdminClient.ApplicationAccessScope
	*	- SSOAdminClient.ApplicationAssignmentConfiguration
	*	- SSOAdminClient.ApplicationAuthenticationMethod
	*	- SSOAdminClient.ApplicationGrant
	*	- SSOAdminClient.InlinePolicyForPermissionSet
	*	- SSOAdminClient.PermissionsBoundaryForPermissionSet
	*	- SSOAdminClient.AccountAssignmentCreationStatus
	*	- SSOAdminClient.AccountAssignmentDeletionStatus
	*	- SSOAdminClient.AccountAssignments
	*	- SSOAdminClient.AccountAssignmentsForPrincipal
	*	- SSOAdminClient.AccountsForProvisionedPermissionSet
	*	- SSOAdminClient.ApplicationAccessScopes
	*	- SSOAdminClient.ApplicationAssignments
	*	- SSOAdminClient.ApplicationAssignmentsForPrincipal
	*	- SSOAdminClient.ApplicationAuthenticationMethods
	*	- SSOAdminClient.ApplicationGrants
	*	- SSOAdminClient.ApplicationProviders
	*	- SSOAdminClient.Applications
	*	- SSOAdminClient.CustomerManagedPolicyReferencesInPermissionSet
	*	- SSOAdminClient.Instances
	*	- SSOAdminClient.ManagedPoliciesInPermissionSet
	*	- SSOAdminClient.PermissionSetProvisioningStatus
	*	- SSOAdminClient.PermissionSets
	*	- SSOAdminClient.PermissionSetsProvisionedToAccount
	*	- SSOAdminClient.TagsForResource
	*	- SSOAdminClient.TrustedTokenIssuers
	*	- StorageGatewayClient.AvailabilityMonitorTest
	*	- StorageGatewayClient.BandwidthRateLimit
	*	- StorageGatewayClient.BandwidthRateLimitSchedule
	*	- StorageGatewayClient.Cache
	*	- StorageGatewayClient.CacheReport
	*	- StorageGatewayClient.CachediSCSIVolumes
	*	- StorageGatewayClient.ChapCredentials
	*	- StorageGatewayClient.FileSystemAssociations
	*	- StorageGatewayClient.GatewayInformation
	*	- StorageGatewayClient.MaintenanceStartTime
	*	- StorageGatewayClient.NFSFileShares
	*	- StorageGatewayClient.SMBFileShares
	*	- StorageGatewayClient.SMBSettings
	*	- StorageGatewayClient.SnapshotSchedule
	*	- StorageGatewayClient.StorediSCSIVolumes
	*	- StorageGatewayClient.TapeArchives
	*	- StorageGatewayClient.TapeRecoveryPoints
	*	- StorageGatewayClient.Tapes
	*	- StorageGatewayClient.UploadBuffer
	*	- StorageGatewayClient.VTLDevices
	*	- StorageGatewayClient.WorkingStorage
	*	- StorageGatewayClient.AutomaticTapeCreationPolicies
	*	- StorageGatewayClient.CacheReports
	*	- StorageGatewayClient.FileShares
	*	- StorageGatewayClient.FileSystemAssociations
	*	- StorageGatewayClient.Gateways
	*	- StorageGatewayClient.LocalDisks
	*	- StorageGatewayClient.TagsForResource
	*	- StorageGatewayClient.TapePools
	*	- StorageGatewayClient.Tapes
	*	- StorageGatewayClient.VolumeInitiators
	*	- StorageGatewayClient.VolumeRecoveryPoints
	*	- StorageGatewayClient.Volumes
	*	- STSClient.AccessKeyInfo
	*	- STSClient.CallerIdentity
	*	- STSClient.FederationToken
	*	- STSClient.SessionToken
	*	- SupportClient.Attachment
	*	- SupportClient.Cases
	*	- SupportClient.Communications
	*	- SupportClient.CreateCaseOptions
	*	- SupportClient.Services
	*	- SupportClient.SeverityLevels
	*	- SupportClient.SupportedLanguages
	*	- SupportClient.TrustedAdvisorCheckRefreshStatuses
	*	- SupportClient.TrustedAdvisorCheckResult
	*	- SupportClient.TrustedAdvisorCheckSummaries
	*	- SupportClient.TrustedAdvisorChecks
	*	- SWFClient.ActivityType
	*	- SWFClient.Domain
	*	- SWFClient.WorkflowExecution
	*	- SWFClient.WorkflowType
	*	- SWFClient.WorkflowExecutionHistory
	*	- SWFClient.ActivityTypes
	*	- SWFClient.ClosedWorkflowExecutions
	*	- SWFClient.Domains
	*	- SWFClient.OpenWorkflowExecutions
	*	- SWFClient.TagsForResource
	*	- SWFClient.WorkflowTypes
	*	- SyntheticsClient.Canaries
	*	- SyntheticsClient.CanariesLastRun
	*	- SyntheticsClient.RuntimeVersions
	*	- SyntheticsClient.Canary
	*	- SyntheticsClient.CanaryRuns
	*	- SyntheticsClient.Group
	*	- SyntheticsClient.AssociatedGroups
	*	- SyntheticsClient.GroupResources
	*	- SyntheticsClient.Groups
	*	- SyntheticsClient.TagsForResource
	*	- TextractClient.Adapter
	*	- TextractClient.AdapterVersion
	*	- TextractClient.DocumentAnalysis
	*	- TextractClient.DocumentTextDetection
	*	- TextractClient.ExpenseAnalysis
	*	- TextractClient.LendingAnalysis
	*	- TextractClient.LendingAnalysisSummary
	*	- TextractClient.AdapterVersions
	*	- TextractClient.Adapters
	*	- TextractClient.TagsForResource
	*	- TimestreamQueryClient.AccountSettings
	*	- TimestreamQueryClient.Endpoints
	*	- TimestreamQueryClient.ScheduledQuery
	*	- TimestreamQueryClient.ScheduledQueries
	*	- TimestreamQueryClient.TagsForResource
	*	- TimestreamWriteClient.BatchLoadTask
	*	- TimestreamWriteClient.Database
	*	- TimestreamWriteClient.Endpoints
	*	- TimestreamWriteClient.Table
	*	- TimestreamWriteClient.BatchLoadTasks
	*	- TimestreamWriteClient.Databases
	*	- TimestreamWriteClient.Tables
	*	- TimestreamWriteClient.TagsForResource
	*	- TranscribeClient.LanguageModel
	*	- TranscribeClient.CallAnalyticsCategory
	*	- TranscribeClient.CallAnalyticsJob
	*	- TranscribeClient.MedicalScribeJob
	*	- TranscribeClient.MedicalTranscriptionJob
	*	- TranscribeClient.MedicalVocabulary
	*	- TranscribeClient.TranscriptionJob
	*	- TranscribeClient.Vocabulary
	*	- TranscribeClient.VocabularyFilter
	*	- TranscribeClient.CallAnalyticsCategories
	*	- TranscribeClient.CallAnalyticsJobs
	*	- TranscribeClient.LanguageModels
	*	- TranscribeClient.MedicalScribeJobs
	*	- TranscribeClient.MedicalTranscriptionJobs
	*	- TranscribeClient.MedicalVocabularies
	*	- TranscribeClient.TagsForResource
	*	- TranscribeClient.TranscriptionJobs
	*	- TranscribeClient.Vocabularies
	*	- TranscribeClient.VocabularyFilters
	*	- TranscribeStreamingClient.MedicalScribeStream
	*	- TransferClient.Access
	*	- TransferClient.Agreement
	*	- TransferClient.Certificate
	*	- TransferClient.Connector
	*	- TransferClient.Execution
	*	- TransferClient.HostKey
	*	- TransferClient.Profile
	*	- TransferClient.SecurityPolicy
	*	- TransferClient.Server
	*	- TransferClient.User
	*	- TransferClient.WebApp
	*	- TransferClient.WebAppCustomization
	*	- TransferClient.Workflow
	*	- TransferClient.Accesses
	*	- TransferClient.Agreements
	*	- TransferClient.Certificates
	*	- TransferClient.Connectors
	*	- TransferClient.Executions
	*	- TransferClient.FileTransferResults
	*	- TransferClient.HostKeys
	*	- TransferClient.Profiles
	*	- TransferClient.SecurityPolicies
	*	- TransferClient.Servers
	*	- TransferClient.TagsForResource
	*	- TransferClient.Users
	*	- TransferClient.WebApps
	*	- TransferClient.Workflows
	*	- TranslateClient.TextTranslationJob
	*	- TranslateClient.ParallelData
	*	- TranslateClient.Terminology
	*	- TranslateClient.Languages
	*	- TranslateClient.ParallelData
	*	- TranslateClient.TagsForResource
	*	- TranslateClient.Terminologies
	*	- TranslateClient.TextTranslationJobs
	*	- VoiceIDClient.Domain
	*	- VoiceIDClient.Fraudster
	*	- VoiceIDClient.FraudsterRegistrationJob
	*	- VoiceIDClient.Speaker
	*	- VoiceIDClient.SpeakerEnrollmentJob
	*	- VoiceIDClient.Watchlist
	*	- VoiceIDClient.Domains
	*	- VoiceIDClient.FraudsterRegistrationJobs
	*	- VoiceIDClient.Fraudsters
	*	- VoiceIDClient.SpeakerEnrollmentJobs
	*	- VoiceIDClient.Speakers
	*	- VoiceIDClient.TagsForResource
	*	- VoiceIDClient.Watchlists
	*	- WAFClient.ByteMatchSet
	*	- WAFClient.ChangeToken
	*	- WAFClient.ChangeTokenStatus
	*	- WAFClient.GeoMatchSet
	*	- WAFClient.IPSet
	*	- WAFClient.LoggingConfiguration
	*	- WAFClient.PermissionPolicy
	*	- WAFClient.RateBasedRule
	*	- WAFClient.RateBasedRuleManagedKeys
	*	- WAFClient.RegexMatchSet
	*	- WAFClient.RegexPatternSet
	*	- WAFClient.Rule
	*	- WAFClient.RuleGroup
	*	- WAFClient.SampledRequests
	*	- WAFClient.SizeConstraintSet
	*	- WAFClient.SqlInjectionMatchSet
	*	- WAFClient.WebACL
	*	- WAFClient.XssMatchSet
	*	- WAFClient.ActivatedRulesInRuleGroup
	*	- WAFClient.ByteMatchSets
	*	- WAFClient.GeoMatchSets
	*	- WAFClient.IPSets
	*	- WAFClient.LoggingConfigurations
	*	- WAFClient.RateBasedRules
	*	- WAFClient.RegexMatchSets
	*	- WAFClient.RegexPatternSets
	*	- WAFClient.RuleGroups
	*	- WAFClient.Rules
	*	- WAFClient.SizeConstraintSets
	*	- WAFClient.SqlInjectionMatchSets
	*	- WAFClient.SubscribedRuleGroups
	*	- WAFClient.TagsForResource
	*	- WAFClient.WebACLs
	*	- WAFClient.XssMatchSets
	*	- WAFRegionalClient.ByteMatchSet
	*	- WAFRegionalClient.ChangeToken
	*	- WAFRegionalClient.ChangeTokenStatus
	*	- WAFRegionalClient.GeoMatchSet
	*	- WAFRegionalClient.IPSet
	*	- WAFRegionalClient.LoggingConfiguration
	*	- WAFRegionalClient.PermissionPolicy
	*	- WAFRegionalClient.RateBasedRule
	*	- WAFRegionalClient.RateBasedRuleManagedKeys
	*	- WAFRegionalClient.RegexMatchSet
	*	- WAFRegionalClient.RegexPatternSet
	*	- WAFRegionalClient.Rule
	*	- WAFRegionalClient.RuleGroup
	*	- WAFRegionalClient.SampledRequests
	*	- WAFRegionalClient.SizeConstraintSet
	*	- WAFRegionalClient.SqlInjectionMatchSet
	*	- WAFRegionalClient.WebACL
	*	- WAFRegionalClient.WebACLForResource
	*	- WAFRegionalClient.XssMatchSet
	*	- WAFRegionalClient.ActivatedRulesInRuleGroup
	*	- WAFRegionalClient.ByteMatchSets
	*	- WAFRegionalClient.GeoMatchSets
	*	- WAFRegionalClient.IPSets
	*	- WAFRegionalClient.LoggingConfigurations
	*	- WAFRegionalClient.RateBasedRules
	*	- WAFRegionalClient.RegexMatchSets
	*	- WAFRegionalClient.RegexPatternSets
	*	- WAFRegionalClient.ResourcesForWebACL
	*	- WAFRegionalClient.RuleGroups
	*	- WAFRegionalClient.Rules
	*	- WAFRegionalClient.SizeConstraintSets
	*	- WAFRegionalClient.SqlInjectionMatchSets
	*	- WAFRegionalClient.SubscribedRuleGroups
	*	- WAFRegionalClient.TagsForResource
	*	- WAFRegionalClient.WebACLs
	*	- WAFRegionalClient.XssMatchSets
	*	- WellArchitectedClient.Answer
	*	- WellArchitectedClient.ConsolidatedReport
	*	- WellArchitectedClient.GlobalSettings
	*	- WellArchitectedClient.Lens
	*	- WellArchitectedClient.LensReview
	*	- WellArchitectedClient.LensReviewReport
	*	- WellArchitectedClient.LensVersionDifference
	*	- WellArchitectedClient.Milestone
	*	- WellArchitectedClient.Profile
	*	- WellArchitectedClient.ProfileTemplate
	*	- WellArchitectedClient.ReviewTemplateAnswer
	*	- WellArchitectedClient.ReviewTemplate
	*	- WellArchitectedClient.ReviewTemplateLensReview
	*	- WellArchitectedClient.Workload
	*	- WellArchitectedClient.Answers
	*	- WellArchitectedClient.CheckDetails
	*	- WellArchitectedClient.CheckSummaries
	*	- WellArchitectedClient.LensReviewImprovements
	*	- WellArchitectedClient.LensReviews
	*	- WellArchitectedClient.LensShares
	*	- WellArchitectedClient.Lenses
	*	- WellArchitectedClient.Milestones
	*	- WellArchitectedClient.Notifications
	*	- WellArchitectedClient.ProfileNotifications
	*	- WellArchitectedClient.ProfileShares
	*	- WellArchitectedClient.Profiles
	*	- WellArchitectedClient.ReviewTemplateAnswers
	*	- WellArchitectedClient.ReviewTemplates
	*	- WellArchitectedClient.ShareInvitations
	*	- WellArchitectedClient.TagsForResource
	*	- WellArchitectedClient.TemplateShares
	*	- WellArchitectedClient.WorkloadShares
	*	- WellArchitectedClient.Workloads
	*	- WisdomClient.AssistantAssociation
	*	- WisdomClient.Assistant
	*	- WisdomClient.Content
	*	- WisdomClient.ContentSummary
	*	- WisdomClient.ImportJob
	*	- WisdomClient.KnowledgeBase
	*	- WisdomClient.QuickResponse
	*	- WisdomClient.Recommendations
	*	- WisdomClient.Session
	*	- WisdomClient.AssistantAssociations
	*	- WisdomClient.Assistants
	*	- WisdomClient.Contents
	*	- WisdomClient.ImportJobs
	*	- WisdomClient.KnowledgeBases
	*	- WisdomClient.QuickResponses
	*	- WisdomClient.TagsForResource
	*	- WorkDocsClient.Activities
	*	- WorkDocsClient.Comments
	*	- WorkDocsClient.DocumentVersions
	*	- WorkDocsClient.FolderContents
	*	- WorkDocsClient.Groups
	*	- WorkDocsClient.NotificationSubscriptions
	*	- WorkDocsClient.ResourcePermissions
	*	- WorkDocsClient.RootFolders
	*	- WorkDocsClient.Users
	*	- WorkDocsClient.CurrentUser
	*	- WorkDocsClient.Document
	*	- WorkDocsClient.DocumentPath
	*	- WorkDocsClient.DocumentVersion
	*	- WorkDocsClient.Folder
	*	- WorkDocsClient.FolderPath
	*	- WorkDocsClient.Resources
	*	- WorkLinkClient.AuditStreamConfiguration
	*	- WorkLinkClient.CompanyNetworkConfiguration
	*	- WorkLinkClient.Device
	*	- WorkLinkClient.DevicePolicyConfiguration
	*	- WorkLinkClient.Domain
	*	- WorkLinkClient.FleetMetadata
	*	- WorkLinkClient.IdentityProviderConfiguration
	*	- WorkLinkClient.WebsiteCertificateAuthority
	*	- WorkLinkClient.Devices
	*	- WorkLinkClient.Domains
	*	- WorkLinkClient.Fleets
	*	- WorkLinkClient.TagsForResource
	*	- WorkLinkClient.WebsiteAuthorizationProviders
	*	- WorkLinkClient.WebsiteCertificateAuthorities
	*	- WorkMailClient.EmailMonitoringConfiguration
	*	- WorkMailClient.Entity
	*	- WorkMailClient.Group
	*	- WorkMailClient.IdentityProviderConfiguration
	*	- WorkMailClient.InboundDmarcSettings
	*	- WorkMailClient.MailboxExportJob
	*	- WorkMailClient.Organization
	*	- WorkMailClient.Resource
	*	- WorkMailClient.User
	*	- WorkMailClient.AccessControlEffect
	*	- WorkMailClient.DefaultRetentionPolicy
	*	- WorkMailClient.ImpersonationRole
	*	- WorkMailClient.ImpersonationRoleEffect
	*	- WorkMailClient.MailDomain
	*	- WorkMailClient.MailboxDetails
	*	- WorkMailClient.MobileDeviceAccessEffect
	*	- WorkMailClient.MobileDeviceAccessOverride
	*	- WorkMailClient.PersonalAccessTokenMetadata
	*	- WorkMailClient.AccessControlRules
	*	- WorkMailClient.Aliases
	*	- WorkMailClient.AvailabilityConfigurations
	*	- WorkMailClient.GroupMembers
	*	- WorkMailClient.Groups
	*	- WorkMailClient.GroupsForEntity
	*	- WorkMailClient.ImpersonationRoles
	*	- WorkMailClient.MailDomains
	*	- WorkMailClient.MailboxExportJobs
	*	- WorkMailClient.MailboxPermissions
	*	- WorkMailClient.MobileDeviceAccessOverrides
	*	- WorkMailClient.MobileDeviceAccessRules
	*	- WorkMailClient.Organizations
	*	- WorkMailClient.PersonalAccessTokens
	*	- WorkMailClient.ResourceDelegates
	*	- WorkMailClient.Resources
	*	- WorkMailClient.TagsForResource
	*	- WorkMailClient.Users
	*	- WorkMailMessageFlowClient.RawMessageContent
	*	- WorkSpacesClient.Account
	*	- WorkSpacesClient.AccountModifications
	*	- WorkSpacesClient.ApplicationAssociations
	*	- WorkSpacesClient.Applications
	*	- WorkSpacesClient.BundleAssociations
	*	- WorkSpacesClient.ClientBranding
	*	- WorkSpacesClient.ClientProperties
	*	- WorkSpacesClient.ConnectClientAddIns
	*	- WorkSpacesClient.ConnectionAliasPermissions
	*	- WorkSpacesClient.ConnectionAliases
	*	- WorkSpacesClient.ImageAssociations
	*	- WorkSpacesClient.IpGroups
	*	- WorkSpacesClient.Tags
	*	- WorkSpacesClient.WorkspaceAssociations
	*	- WorkSpacesClient.WorkspaceBundles
	*	- WorkSpacesClient.WorkspaceDirectories
	*	- WorkSpacesClient.WorkspaceImagePermissions
	*	- WorkSpacesClient.WorkspaceImages
	*	- WorkSpacesClient.WorkspaceSnapshots
	*	- WorkSpacesClient.Workspaces
	*	- WorkSpacesClient.WorkspacesConnectionStatus
	*	- WorkSpacesClient.WorkspacesPoolSessions
	*	- WorkSpacesClient.WorkspacesPools
	*	- WorkSpacesClient.AccountLink
	*	- WorkSpacesClient.AccountLinks
	*	- WorkSpacesClient.AvailableManagementCidrRanges
	*	- WorkSpacesWebClient.BrowserSettings
	*	- WorkSpacesWebClient.DataProtectionSettings
	*	- WorkSpacesWebClient.IdentityProvider
	*	- WorkSpacesWebClient.IpAccessSettings
	*	- WorkSpacesWebClient.NetworkSettings
	*	- WorkSpacesWebClient.Portal
	*	- WorkSpacesWebClient.PortalServiceProviderMetadata
	*	- WorkSpacesWebClient.Session
	*	- WorkSpacesWebClient.TrustStoreCertificate
	*	- WorkSpacesWebClient.TrustStore
	*	- WorkSpacesWebClient.UserAccessLoggingSettings
	*	- WorkSpacesWebClient.UserSettings
	*	- WorkSpacesWebClient.BrowserSettings
	*	- WorkSpacesWebClient.DataProtectionSettings
	*	- WorkSpacesWebClient.IdentityProviders
	*	- WorkSpacesWebClient.IpAccessSettings
	*	- WorkSpacesWebClient.NetworkSettings
	*	- WorkSpacesWebClient.Portals
	*	- WorkSpacesWebClient.Sessions
	*	- WorkSpacesWebClient.TagsForResource
	*	- WorkSpacesWebClient.TrustStoreCertificates
	*	- WorkSpacesWebClient.TrustStores
	*	- WorkSpacesWebClient.UserAccessLoggingSettings
	*	- WorkSpacesWebClient.UserSettings
	*	- XRayClient.EncryptionConfig
	*	- XRayClient.Group
	*	- XRayClient.Groups
	*	- XRayClient.IndexingRules
	*	- XRayClient.Insight
	*	- XRayClient.InsightEvents
	*	- XRayClient.InsightImpactGraph
	*	- XRayClient.InsightSummaries
	*	- XRayClient.RetrievedTracesGraph
	*	- XRayClient.SamplingRules
	*	- XRayClient.SamplingStatisticSummaries
	*	- XRayClient.SamplingTargets
	*	- XRayClient.ServiceGraph
	*	- XRayClient.TimeSeriesServiceStatistics
	*	- XRayClient.TraceGraph
	*	- XRayClient.TraceSegmentDestination
	*	- XRayClient.TraceSummaries
	*	- XRayClient.ResourcePolicies
	*	- XRayClient.RetrievedTraces
	*	- XRayClient.TagsForResource
	*	- KexaAwsCustoms.tagsValueListing
	*	- KexaAwsCustoms.resourcesTags
*/

import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { DescribeRegionsCommand } from "@aws-sdk/client-ec2";
import { AwsConfig } from "../../models/aws/config.models";

import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { EC2Client } from "@aws-sdk/client-ec2";
import { ResourceGroupsTaggingAPIClient, GetTagKeysCommand, GetResourcesCommand, GetComplianceSummaryCommand } from "@aws-sdk/client-resource-groups-tagging-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////

import { getContext, getNewLogger } from "../logger.service";
const logger = getNewLogger("AWSLogger");

let currentConfig: AwsConfig;


import * as AwsImports from "./imports/awsPackage.import";

interface AwsClient {
	[key: string]: any;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////


/* ****************************************** */
/*  	     Main listing function            */
/* ****************************************** */

export async function collectData(awsConfig: AwsConfig[]): Promise<Object[]|null> {
    let context = getContext();
    let resources = new Array<Object>();
    for (let oneConfig of awsConfig ?? []) {
        currentConfig = oneConfig;
        let prefix = oneConfig["prefix"]??( awsConfig.indexOf(oneConfig).toString())
        try {
            let awsKeyId = await getConfigOrEnvVar(oneConfig, "AWS_ACCESS_KEY_ID", prefix);
            let awsSecretKey = await getConfigOrEnvVar(oneConfig, "AWS_SECRET_ACCESS_KEY", prefix);
			let awsSessionToken = await getConfigOrEnvVar(oneConfig, "AWS_SESSION_TOKEN", prefix);
			if (awsSessionToken)
				setEnvVar("AWS_SESSION_TOKEN", awsSessionToken);
            if (awsKeyId)
                setEnvVar("AWS_ACCESS_KEY_ID", awsKeyId);
            else
                logger.warn(prefix + "AWS_ACCESS_KEY_ID not found");
            if (awsSecretKey)
                setEnvVar("AWS_SECRET_ACCESS_KEY", awsSecretKey);
            else
                logger.warn(prefix + "AWS_SECRET_ACCESS_KEY not found");

			const credentials = {
				accessKeyId: awsKeyId,
				secretAccessKey: awsSecretKey
			};
			let credentialProvider;
			if (process.env.INTERFACE_CONFIGURATION_ENABLED == "true") {
				credentialProvider = {
					accessKeyId: awsKeyId,
					secretAccessKey: awsSecretKey,
				}
			}
			else {
            	credentialProvider = fromNodeProviderChain();
			}
			const client = new EC2Client({
				region: "us-east-1",
				credentials: credentialProvider
			});

            const command = new DescribeRegionsCommand({AllRegions: false});
            const response = await client.send(command);
            let gatherAll = false;
            let userRegions = new Array<string>();
            let skip = false;
            if ('regions' in oneConfig) {
                userRegions = oneConfig.regions as Array<string>;
                if (userRegions.length > 0) {
                    userRegions.forEach((userRegion: any) => {
                        let check = false;
                        response.Regions?.forEach((regionObj: any) => {
                            if (userRegion == regionObj.RegionName)
                                check = true;
                        })
                        if (!check) {
                            logger.error("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " Skipped - Regions '" + userRegion + "' is not a valid AWS region.");
                            skip = true;
                        }
                    })
                }
                else
                    gatherAll = true;
            }
            else {
                gatherAll = true;
                context?.log("AWS - No Regions found, gathering all regions...");
                logger.info("AWS - No Regions found, gathering all regions...");
            }
            if (skip)
                continue;
            else if (!gatherAll){
                context?.log("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
                logger.info("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
            }
            if (response.Regions) {
				
				const collectedResults: any[] = [];

                const promises = response.Regions.map(async(region) => {
                    try {
                        if (!gatherAll) {
                            if (!(userRegions.includes(region.RegionName as string)))
                                return;
                        }
						context?.log("Retrieving AWS Region : " + region.RegionName);
						let newResources = await collectAuto(credentialProvider, region.RegionName as string);
						const newCustomResources = await collectCustom(credentialProvider, region.RegionName as string);
						newCustomResources.forEach((customRes: any) => {
							newResources = {...newResources, ...customRes};
						})
						collectedResults.push(newResources);
                    } catch (e) {
                        logger.error("error in collectAWSData with AWS_ACCESS_KEY_ID: " + (oneConfig["AWS_ACCESS_KEY_ID"] ?? null));
                        logger.error(e);
                    }
                });
				await Promise.all(promises);
     
                context?.log("- Listing AWS resources done -");
                logger.info("- Listing AWS resources done -");
				
				const concatedResults = concatAllObjects(collectedResults);
                resources.push(concatedResults);
            }
        } catch (e) {
            context?.log("error in AWS connect with AWS_ACCESS_KEY_ID: " + (oneConfig["AWS_ACCESS_KEY_ID"] ?? null));
            logger.error("error in AWS connect with AWS_ACCESS_KEY_ID: " + (oneConfig["AWS_ACCESS_KEY_ID"] ?? null));
            logger.error(e);
        }
    }
    return resources ?? null;
}


/* ****************************************** */
/*  	Retrieving clients & objects names    */
/* ****************************************** */

let iamClientGlobalForRegion: any;

let awsGatherDependencies = [

	/* every object define a error to match with dependencies */
	/* for each object, there is a client and a matching error code, */
	/* as well as objects that will be retrieve to match missing dependencies */
	{
		/* aws sdk client name from awsPackage.import.ts */
		client: "clientiam",

		/* the list of objects to retrieve and send as dependencies */
		objects: [
			{ 
				/* Name of object to be gathered */
				name: "Users",

				/* Name of the object result property to be gathered */
				subGatherName: "Users",
				
				/* Name of the field to be sent and where to sent it (toFill) */
				toSend: "UserName",
				toFill: "UserName",
				
				/* Keep this empty it will be fill at runtime */
				results: []
			}, 
			{ 
				name: "Groups",
				subGatherName: "Groups",
				toSend: "GroupName",
				toFill: "GroupName",
				results: []
			},
			{ 
				name: "AccessKeys",
				subGatherName: "AccessKeyMetadata",
				toSend: "AccessKeyId",
				toFill: "AccessKeyId",
				results: []
			},
			{ 
				name: "Policies",
				subGatherName: "Policies",
				toSend: "PolicyName",
				toFill: "PolicyName",
				results: []
			},
			{ 
				name: "Roles",
				subGatherName: "Roles",
				toSend: "RoleName",
				toFill: "RoleName",
				results: []
			}
		],
		
		/* the error code to match */
		matchingError: "IAMServiceException",

		/* leave this empty, this will be filled at runtime */
		functions: {}
	},
	{
		client: "clients3",
		objects: [
			{ 
				name: "Buckets",
				subGatherName: "Buckets",
				toSend: "Name", // TO SEND IS THE OBJECTS, ADD BOLLEAN VALUE
				toFill: "Bucket",
				results: []
			}
		],
		matchingError: "Error",
		functions: {}
	},
	{
		client: "clientsecretsmanager",
		objects: [
			{ 
				name: "Secrets",
				subGatherName: "SecretList",
				toSend: "Name",
				toFill: "SecretId",
				results: []
			},
		],
		matchingError: "SecretsManagerServiceException",
		functions: {}
	}
]

function retrieveAwsClients(): Array<any> {
    let allObjects = [];

    for (const key of Object.keys(AwsImports)) {
        const currentItem = (AwsImports as { [key: string]: unknown })[key];
		const match = awsGatherDependencies.find(dep => dep.client === key);
		if (match) {
			match.functions = extractObjectsOrFunctions(currentItem, true);
		}
		const clientsFromModule = extractObjectsOrFunctions(currentItem, true);
		allObjects.push(clientsFromModule);
    }
	return (allObjects);
}

interface ClientResultsInterface {
	clientName: string;
	clientFunc: new (args: any) => any;
	objectName: string;
	objectFunc: new (args: any) => any;
};

import {extractObjectBetween} from "../updateCapability.service";
import {ListReservationsCommandInput } from "@aws-sdk/client-mediaconnect";

function extractObjectsOrFunctions(module: any, isObject: Boolean): ClientResultsInterface[] {
    const clients: AwsClient = {};
	let clientsMatch: { name: string; func: new () => any }[] = [];
	let clientsResults: ClientResultsInterface[] = [];

    /* Start and End string to match for extract client listing functions */
    /* Edit those as needed, addind as much startStrings as you want */
	/* This can be use if the aws SDK functions name standards changes */

    const startStrings =  ["Get", "List", "Describe"];
    const endString = "Command";
    let clientName;

	Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined && module[key].name.endsWith("Client"))) {
			clientName = module[key].name;
            if (clientName != "Client") {
				clientsMatch.push({ name: clientName, func: module[key] });
                if (clientsMatch.length > 1)
                    logger.warn("WARNING: Multiple client found for AWS objects, gather could be wrong.");
                else if (clientsMatch.length < 1)
					logger.warn("WARNING: No client found for AWS objects, gather could be wrong.");
            }
		}
	});


    Object.keys(module).forEach((key) => {
        if ((module[key] instanceof Function && module[key].prototype !== undefined 
            && module[key].name.endsWith(endString) && startStrings.some(startString => module[key].name.startsWith(startString)))) {
				if (isObject) {
					const objectName = extractObjectBetween(module[key].name, startStrings, endString);

                    if (clientsMatch.length < 1)
                        clients[key] = objectName;
                    else {
						clientsResults.push({ clientName: clientsMatch[clientsMatch.length - 1].name, 
							clientFunc: clientsMatch[clientsMatch.length - 1].func,
							 objectName: objectName as string, objectFunc: module[key] /*,  input  ,  output */ });
                        clients[key] = clientsMatch[clientsMatch.length - 1].name + "." + objectName + "." + module[key].name;
					}
                }
                else
                    clients[key] = module[key];
        }
    });
    return clientsResults;
}

/* ****************************************** */
/*  	Collecting & structuring objects      */
/* ****************************************** */

function addRegion(resources:any, region:string) {
    for (let resource of resources) {
        resource.region = region;
    }
    return resources;
}

function concatAllObjects(collectedResults: any) {
	let finalResults: any = {};

	collectedResults.forEach((element: any) => {
    	for (const key of Object.keys(element)) {
			if (finalResults[key]) {
				element[key].forEach((subElement: any) => {
					finalResults[key].push(subElement);
				});
			}
			else {
				finalResults[key] = element[key];
			}
		}
	});
	return (finalResults);
}

let iamUsers: any;

async function collectAuto(credential: any, region: string) {
	logger.info("Retrieving AWS Region: " + region);

	let azureRet: any[] = [];
	let objectToGather = retrieveAwsClients();

	/* ------------------------- */
	/* HERE GET THE DEPENDENCIES */
	/* ------------------------- */
	/*if (awsGatherDependencies) {
		for  (const dependence of awsGatherDependencies) {
			if (Array.isArray(dependence.functions)) {
				for (let i = 0; i < dependence.functions.length; i++) {
					const func = dependence.functions[i];
					for (const element of dependence.objects) {
						if (element.name === func.objectName) {
							const input = {};
							const command = new func.objectFunc(input);
							const client = new func.clientFunc({ region: region, credentials: credential });

							try {
								let data: Record<string, any> = await client.send(command);
								element.results = data[element.subGatherName];
								logger.debug("Gathering dependencies for: " + func.clientName + "." + func.objectName + " Done");
							} catch (e) {
								logger.debug("Error when retrieving resources dependencies from: " + func.clientName + "." + func.objectName);
								logger.debug(e);
							}
						}
					}
				}
			}
		}
	}*/
	
	if (awsGatherDependencies) {
        const dependencyPromises = [];
        for (const dependence of awsGatherDependencies) {
            if (Array.isArray(dependence.functions)) {
                for (let i = 0; i < dependence.functions.length; i++) {
                    const func = dependence.functions[i];
                    for (const element of dependence.objects) {
                        if (element.name === func.objectName) {
                            const input = {};
                            const command = new func.objectFunc(input);
                            const client = new func.clientFunc({ region: region, credentials: credential });
                            const dependencyPromise = (async () => {
                                try {
                                    let data: Record<string, any> = await client.send(command);
                                    element.results = data[element.subGatherName];
                                    logger.debug("Gathering dependencies for: " + func.clientName + "." + func.objectName + " Done");
                                } catch (e) {
                                    logger.debug("Error when retrieving resources dependencies from: " + func.clientName + "." + func.objectName);
                                    logger.debug(e);
                                }
                            })();
                            dependencyPromises.push(dependencyPromise);
                        }
                    }
                }
            }
        }
        await Promise.all(dependencyPromises);
    }

	/* ------------------------- */
	/*   AFTER GET DEPENDENCIES  */
	/* ------------------------- */
	for (const client of objectToGather) {
		for (const object of client) {
			const gathered = await gatherAwsObject(credential, region, object);
			azureRet = { ...azureRet, ...gathered };
		}
	}

	return azureRet;
}


function gatherDependenciesResources(credential: any, region:string, object: ClientResultsInterface) {

}

async function gatherAwsObject(credential: any, region:string, object: ClientResultsInterface) {
	let alreadyStructured = false;
	let customJsonObjectBef;
  	if(!currentConfig.ObjectNameNeed?.includes(object.clientName + "." + object.objectName)) return null;
	try {

		const client = new object.clientFunc({region: region, credentials: credential});

		const input = {};

		const command = new object.objectFunc(input);

		let data: Record<string, any> = {};

		const results2: any[] = [];

		const retrievingFullName = object.clientName + "." + object.objectName;
		try {
			 data = await client.send(command);
		} catch (e) {
			if (e instanceof Error) {
				const error = e;
				for (const dependence of awsGatherDependencies) {
					if (dependence.matchingError == error.constructor.name) {
						let promises = [];
						let validated = false;
						for (const obj of dependence.objects) {
							if (validated)
								break;
							if (Array.isArray(obj.results)) {
								const objPromises = obj.results.map(async (objToTest: any) => {
									try {
										const input = { [obj.toFill]: objToTest[obj.toSend] };
										const command = new object.objectFunc(input);
										const result = await client.send(command);
									
										if (result) { validated = true; }
										result[obj.toSend] = objToTest[obj.toSend];
										results2.push(result);
									} catch (e2) {
										// DISPLAY THIS ERR ONLY IF ALL OBJ SENT FAILED
										// ASYC PROBLEM HERE
										// ASYC PROBLEM HERE
										logger.warn("Cannot retrieve resource with unknown dependencies for " + retrievingFullName);
										logger.debug(e2);
									}
								});
								promises.push(...objPromises);
							}
						}
						if (validated == false) {
							logger.warn("Cannot retrieve resource with unknown dependencies for " + retrievingFullName);
						}
						if (promises.length > 0) {
							await Promise.all(promises);
						}
					}
				}
				customJsonObjectBef = {
					[object.clientName + "." + object.objectName]: results2
				  };
				alreadyStructured = true;
				data = results2;
			}
			 
		}

		let jsonData;

		if (alreadyStructured)
			return (customJsonObjectBef);

		Object.keys(data).forEach((key) => {
			if (Object.keys(data).length == 2 && key != "$metadata") {
				try {
					if (Array.isArray(data[key])) {
						jsonData = JSON.parse(jsonStringify(data[key]));
					}
					else {
						jsonData = JSON.parse(jsonStringify([data[key]]));
					}
				} catch (e) {
					jsonData = [];
				}
			}
			else if ((key != "$metadata") && (key != "NextToken")) {
				try {
					if (Array.isArray(data[key])) {
						jsonData = JSON.parse(jsonStringify(data[key]));
					}
				} catch (e) {
					jsonData = [];
				}
			}
		});
		if (jsonData == undefined) {
			return null;
		}
		jsonData = addRegion(jsonData, region);
		logger.debug(region + " - " + object.clientName + "." + object.objectName + " Listing  Done");
		const customJsonObject = {
			[object.clientName + "." + object.objectName]: jsonData
		  };
		return customJsonObject ?? [];
	} catch (err) {
		logger.debug("Error in " + object.clientName + "." + object.objectName + " listing:", err);
		return null;
	}
}

/* ****************************************** */
/*  	Collecting custom data objects        */
/* ****************************************** */
// custom gathering can be use to operate on data before making it availabe for Kexa
// or else restructure the data if needed, gather exception objects

import {stringKeys} from "../../models/aws/ressource.models";
import { GetResourceCommand } from "@aws-sdk/client-api-gateway";
import { jsonStringify } from "../../helpers/jsonStringify";

interface FunctionMap {
    [key: string]: (credential: any, region: string, object: any) => void;
}


async function collectCustom(credential: any, region: string) {

	let azureRet;
	azureRet = await Promise.all(stringKeys.map(async (element: any) => {
		if(!currentConfig.ObjectNameNeed?.includes(element)) return {};
		logger.info("Retrieving AWS Region (custom resources) : " + region);
		if (!customGatherFunctions[element]) {
			logger.error("This object gathering function has no match in 'customGatherFunctions' FunctionMap.\nYou must correct the object name, or if you're developping an addon, build the required gathering function");
			return ;
		}
		return { [element] : await customGatherFunctions[element](credential, region, element)};
	}));
	return (azureRet);
}

const customGatherFunctions: FunctionMap = {
    'KexaAwsCustoms.tagsValueListing': async (credential: any, region: string, object: any) => {
		try {
			const client = new ResourceGroupsTaggingAPIClient({region: region, credentials: credential});
			const input = {};
			const command = new GetTagKeysCommand(input);
			return await tagsValueListing(client, command, region);
		} catch (e) {
			logger.warn("Error creating Azure client: ", e);
			return ;
		}
    },
	'KexaAwsCustoms.resourcesTags': async (credential: any, region: string, object: any) => {
		try {
			const client = new ResourceGroupsTaggingAPIClient({region: region, credentials: credential});
			const input = {};
			const command = new GetResourcesCommand(input);
			return await complianceSummaryListing(client, command, region);
		} catch (e) {
			logger.warn("Error creating Azure client: ", e);
			return ;
		}
    }
};

async function tagsValueListing(client: ResourceGroupsTaggingAPIClient, command: GetTagKeysCommand, region: string): Promise<any> {
    try {
        const dataKeys = await client.send(command);
        const jsonDataKeys = JSON.parse(jsonStringify(dataKeys.TagKeys));
        let jsonData: any[] = [];
        for (const element of jsonDataKeys) {
            const newData = { 
                Value: element,
                Region: region,
            };
            jsonData.push(newData);
        }
        logger.debug(region + " - Tags Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in Tags Value Listing: ", err);
        return null;
    }
}

async function complianceSummaryListing(client: ResourceGroupsTaggingAPIClient, command: GetResourcesCommand, region: string): Promise<any> {
    try {
        const dataKeys = await client.send(command);
        const jsonData = JSON.parse(jsonStringify(dataKeys.ResourceTagMappingList));
      /*  for (const element of jsonDataKeys) {
            const newData = { 
                Value: element,
                Region: region,
            };
            jsonData.push(newData);
        }*/
        logger.debug(region + " - Tags Done");
        return jsonData ?? null;
    } catch (err) {
        logger.debug("Error in Tags Value Listing: ", err);
        return null;
    }
}