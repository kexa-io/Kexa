import { Config } from "../settingFile/config.models";

interface SnowflakeConnectionParams {
  account: string;
  username: string;
  password?: string;
  authenticator?: 'SNOWFLAKE' | 'EXTERNALBROWSER' | 'OAUTH' | 'USERNAME_PASSWORD_MFA';
  database?: string;
  schema?: string;
  warehouse?: string;
  role?: string;
  accessUrl?: string;
  token?: string;
  privateKey?: string;
  privateKeyPath?: string;
  privateKeyPass?: string;
  timeout?: number;
  clientSessionKeepAlive?: boolean;
  clientSessionKeepAliveHeartbeatFrequency?: number;
}

interface QueryResult {
  rows: any[];
  columns: {
    name: string;
    type: string;
    nullable: boolean;
  }[];
  rowCount: number;
  statementId: string;
}

export interface SnowflakeConfig extends Config {
    ACCOUNT?: string;
    USER_NAME?: string;
    PASSWORD?: string;
    ROLE?: string;
    WAREHOUSE?: string;
    DATABASE?: string;
    SCHEMA?: string;
}

interface SnowflakeObject {
  name: string;
  owner: string;
  createdAt: Date;
  comment?: string;
}

interface Account {
  accountName: string;
  accountLocator: string;
  region: string;
  cloudProvider: 'AWS' | 'AZURE' | 'GCP';
  edition: 'STANDARD' | 'ENTERPRISE' | 'BUSINESS_CRITICAL' | 'VPS';
  organizationName?: string;
  url: string;
  isOrgAdmin: boolean;
}

interface CatalogIntegration extends SnowflakeObject {
  catalogSource: 'OBJECT_STORE';
  tableFormat: 'ICEBERG';
  enabled: boolean;
  catalogNamespace?: string;
  properties: Record<string, string>;
}

interface ComputePool extends SnowflakeObject {
  minNodes: number;
  maxNodes: number;
  instanceFamily: string;
  autoResume: boolean;
  autoSuspend: number;
  state: 'ACTIVE' | 'IDLE' | 'SUSPENDED' | 'RESIZING';
}

interface Database extends SnowflakeObject {
  retentionTime: number;
  isTransient: boolean;
  defaultDdlCollation?: string;
  maxDataExtensionTime?: number;
  externalVolume?: string;
  catalogSource?: string;
}

interface DatabaseRole extends SnowflakeObject {
  database: string;
  grantedToRoles: string[];
  grantedToUsers: string[];
}

interface DynamicTable extends SnowflakeObject {
  targetLag: string;
  warehouse: string;
  query: string;
  refreshMode: 'AUTO' | 'FULL' | 'INCREMENTAL';
  initialize: 'ON_CREATE' | 'ON_SCHEDULE';
  clusterBy?: string[];
}

interface EventTable extends SnowflakeObject {
  database: string;
  schema: string;
  dataRetentionTime: number;
  maxDataExtensionTime: number;
  changeTracking: boolean;
}

interface ExternalVolume extends SnowflakeObject {
  storageLocations: {
    name: string;
    storageProvider: 'S3' | 'GCS' | 'AZURE';
    storageBaseUrl: string;
    storageAwsRoleArn?: string;
    azureTenantId?: string;
    encryptionType?: 'NONE' | 'SSE_S3' | 'SSE_KMS';
    encryptionKmsKeyId?: string;
  }[];
  allowWrites: boolean;
}

interface Function extends SnowflakeObject {
  database: string;
  schema: string;
  language: 'SQL' | 'JAVASCRIPT' | 'PYTHON' | 'JAVA' | 'SCALA';
  returnType: string;
  parameters: {
    name: string;
    type: string;
    defaultValue?: any;
  }[];
  isSecure: boolean;
  isAggregate: boolean;
  apiIntegration?: string;
  packages?: string[];
  imports?: string[];
  handler?: string;
  externalAccessIntegrations?: string[];
  secrets?: Record<string, string>;
  runtimeVersion?: string;
}

interface ImageRepository extends SnowflakeObject {
  database: string;
  schema: string;
  repository: string;
  registry?: string;
}

interface ManagedAccount extends SnowflakeObject {
  type: 'READER';
  cloud: 'AWS' | 'AZURE' | 'GCP';
  region: string;
  locator: string;
  url: string;
  isReader: boolean;
}

interface NetworkPolicy extends SnowflakeObject {
  allowedIpList?: string[];
  blockedIpList?: string[];
  allowedNetworkRuleList?: string[];
  blockedNetworkRuleList?: string[];
}

interface Notebook extends SnowflakeObject {
  database: string;
  schema: string;
  queryWarehouse?: string;
  defaultLanguage: 'PYTHON' | 'SQL';
  cells: {
    type: 'CODE' | 'MARKDOWN';
    content: string;
    language?: 'PYTHON' | 'SQL';
  }[];
}

interface NotificationIntegration extends SnowflakeObject {
  type: 'QUEUE' | 'EMAIL';
  enabled: boolean;
  direction: 'INBOUND' | 'OUTBOUND';
  cloudProvider?: 'AWS' | 'AZURE' | 'GCP';
  notificationProvider?: 'AWS_SQS' | 'AWS_SNS' | 'AZURE_EVENT_GRID' | 'GCP_PUBSUB';
  awsSqsArn?: string;
  awsSnsTopicArn?: string;
  azureStorageQueuePrimaryUri?: string;
  azureTenantId?: string;
  gcpPubsubTopicName?: string;
}

interface Pipe extends SnowflakeObject {
  database: string;
  schema: string;
  definition: string;
  autoIngest: boolean;
  errorIntegration?: string;
  awsSnsTopicArn?: string;
  integration?: string;
}

interface Procedure extends SnowflakeObject {
  database: string;
  schema: string;
  language: 'SQL' | 'JAVASCRIPT' | 'PYTHON' | 'JAVA' | 'SCALA';
  returnType?: string;
  parameters: {
    name: string;
    type: string;
    defaultValue?: any;
  }[];
  executeAs: 'OWNER' | 'CALLER';
  isSecure: boolean;
  packages?: string[];
  imports?: string[];
  handler?: string;
  externalAccessIntegrations?: string[];
  secrets?: Record<string, string>;
  runtimeVersion?: string;
}

interface Role extends SnowflakeObject {
  grantedToUsers: string[];
  grantedToRoles: string[];
  grantedRoles: string[];
}

interface Schema extends SnowflakeObject {
  database: string;
  retentionTime: number;
  isTransient: boolean;
  isManagedAccess: boolean;
  defaultDdlCollation?: string;
  maxDataExtensionTime?: number;
  externalVolume?: string;
  catalogSource?: string;
  replaceInvalidCharacters?: boolean;
  defaultStorageSerializationPolicy?: string;
  logLevel?: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL' | 'OFF';
  traceLevel?: 'ALWAYS' | 'ON_EVENT' | 'OFF';
  suspendTaskAfterNumFailures?: number;
  taskAutoRetryAttempts?: number;
  userTaskManagedInitialWarehouseSize?: string;
  userTaskTimeoutMs?: number;
  userTaskMinimumTriggerIntervalInSeconds?: number;
  quotedIdentifiersIgnoreCase?: boolean;
  enableConsoleOutput?: boolean;
}

interface Service extends SnowflakeObject {
  database: string;
  schema: string;
  computePool: string;
  specification: string;
  minInstances?: number;
  maxInstances?: number;
  autoResume: boolean;
  externalAccessIntegrations?: string[];
}

interface Stage extends SnowflakeObject {
  database?: string;
  schema?: string;
  stageType: 'INTERNAL' | 'EXTERNAL';
  url?: string;
  storageIntegration?: string;
  credentials?: Record<string, string>;
  encryption?: {
    type: 'NONE' | 'AES256' | 'AWS_CSE' | 'AWS_SSE_S3' | 'AWS_SSE_KMS';
    kmsKeyId?: string;
  };
  fileFormat?: {
    type: 'CSV' | 'JSON' | 'AVRO' | 'PARQUET' | 'XML';
    options?: Record<string, any>;
  };
  copyOptions?: Record<string, any>;
  directoryTable?: {
    enable: boolean;
    refreshOnCreate?: boolean;
  };
}

interface Stream extends SnowflakeObject {
  database: string;
  schema: string;
  tableOrView: string;
  streamType: 'STANDARD' | 'APPEND_ONLY' | 'INSERT_ONLY';
  stale: boolean;
  mode: 'DEFAULT' | 'APPEND_ONLY' | 'INSERT_ONLY';
  stalenessInSeconds?: number;
  beforeStatement?: {
    statementType: string;
    queryId: string;
    timestamp: Date;
  };
}

interface Table extends SnowflakeObject {
  database: string;
  schema: string;
  tableType: 'BASE TABLE' | 'TEMPORARY' | 'TRANSIENT' | 'EXTERNAL';
  isTransient: boolean;
  clusterBy?: string[];
  retentionTime: number;
  changeTracking: boolean;
  searchOptimization: boolean;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    defaultValue?: any;
    autoIncrement: boolean;
    comment?: string;
  }[];
  primaryKey?: string[];
  foreignKeys?: {
    name: string;
    columns: string[];
    referencedTable: string;
    referencedColumns: string[];
  }[];
  constraints?: {
    name: string;
    type: 'PRIMARY KEY' | 'FOREIGN KEY' | 'UNIQUE' | 'NOT NULL' | 'CHECK';
    columns: string[];
    expression?: string;
  }[];
  rowAccessPolicy?: string;
  aggregationPolicy?: string;
  projectionPolicy?: string;
  maskingPolicies?: Record<string, string>;
  tags?: Record<string, string>;
}

interface Task extends SnowflakeObject {
  database: string;
  schema: string;
  warehouse?: string;
  schedule?: string;
  condition?: string;
  definition: string;
  state: 'SUSPENDED' | 'STARTED';
  allowOverlappingExecution: boolean;
  errorIntegration?: string;
  sessionParameters?: Record<string, any>;
  userTaskTimeoutMs?: number;
  suspendTaskAfterNumFailures?: number;
  taskAutoRetryAttempts?: number;
  userTaskManagedInitialWarehouseSize?: string;
  predecessors?: string[];
  finalizerTask?: string;
}

type UserDefinedFunction = Function;

interface View extends SnowflakeObject {
  database: string;
  schema: string;
  definition: string;
  isSecure: boolean;
  isMaterialized: boolean;
  columns?: {
    name: string;
    type: string;
    comment?: string;
  }[];
  rowAccessPolicy?: string;
  aggregationPolicy?: string;
  projectionPolicy?: string;
  maskingPolicies?: Record<string, string>;
  tags?: Record<string, string>;
}

interface Warehouse extends SnowflakeObject {
  state: 'STARTED' | 'SUSPENDED' | 'RESIZING';
  type: 'STANDARD' | 'SNOWPARK-OPTIMIZED';
  size: 'X-SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'X-LARGE' | '2X-LARGE' | '3X-LARGE' | '4X-LARGE' | '5X-LARGE' | '6X-LARGE';
  minClusterCount: number;
  maxClusterCount: number;
  autoSuspend: number;
  autoResume: boolean;
  scalingPolicy: 'STANDARD' | 'ECONOMY';
  resourceMonitor?: string;
  initiallySuspended: boolean;
  enableQueryAcceleration: boolean;
  queryAccelerationMaxScaleFactor?: number;
  maxConcurrencyLevel?: number;
  statementQueuedTimeoutInSeconds?: number;
  statementTimeoutInSeconds?: number;
}

// Union type pour tous les objets Snowflake
type SnowflakeObjectType = 
  | Account
  | CatalogIntegration
  | ComputePool
  | Database
  | DatabaseRole
  | DynamicTable
  | EventTable
  | ExternalVolume
  | Function
  | ImageRepository
  | ManagedAccount
  | NetworkPolicy
  | Notebook
  | NotificationIntegration
  | Pipe
  | Procedure
  | Role
  | Schema
  | Service
  | Stage
  | Stream
  | Table
  | Task
  | UserDefinedFunction
  | View
  | Warehouse;

// Helper type pour identifier le type d'objet
type ObjectType = 
  | 'ACCOUNT'
  | 'CATALOG_INTEGRATION'
  | 'COMPUTE_POOL'
  | 'DATABASE'
  | 'DATABASE_ROLE'
  | 'DYNAMIC_TABLE'
  | 'EVENT_TABLE'
  | 'EXTERNAL_VOLUME'
  | 'FUNCTION'
  | 'IMAGE_REPOSITORY'
  | 'MANAGED_ACCOUNT'
  | 'NETWORK_POLICY'
  | 'NOTEBOOK'
  | 'NOTIFICATION_INTEGRATION'
  | 'PIPE'
  | 'PROCEDURE'
  | 'ROLE'
  | 'SCHEMA'
  | 'SERVICE'
  | 'STAGE'
  | 'STREAM'
  | 'TABLE'
  | 'TASK'
  | 'USER_DEFINED_FUNCTION'
  | 'VIEW'
  | 'WAREHOUSE';
