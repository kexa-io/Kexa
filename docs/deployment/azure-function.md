# Azure Functions Deployment

This guide explains how to deploy and run Kexa as an Azure Function.

## Prerequisites

- Azure subscription
- Azure CLI installed
- Azure Functions Core Tools
- Access to cloud provider accounts (AWS, Azure, GCP)

## Quick Start

### 1. Create Function App

```bash
# Create resource group
az group create --name kexa-rg --location eastus

# Create storage account
az storage account create \
  --name kexastorage \
  --location eastus \
  --resource-group kexa-rg \
  --sku Standard_LRS

# Create function app
az functionapp create \
  --name kexa-function \
  --storage-account kexastorage \
  --consumption-plan-location eastus \
  --resource-group kexa-rg \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4
```

### 2. Configure Function App

```bash
# Configure app settings
az functionapp config appsettings set \
  --name kexa-function \
  --resource-group kexa-rg \
  --settings \
    RULESDIRECTORY=/home/site/wwwroot/rules \
    OUTPUT=/home/site/wwwroot/output \
    NODE_ENV=production
```

### 3. Deploy Function

```bash
# Deploy function code
func azure functionapp publish kexa-function
```

## Function Configuration

### 1. Function Definition

```json
{
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### 2. Function Code

```typescript
import { AzureFunction, Context } from "@azure/functions";
[...]

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    [...]
};

export default timerTrigger;
```

If you want to see the full code, you can find it [here](https://github.com/kexa-io/Kexa/blob/main/Kexa/index.ts).

Also, you will have to update the `host.json` file to be able to run properly. You can find the full code [here](https://github.com/kexa-io/Kexa/blob/main/host.json).

## Storage Configuration

### 1. Blob Storage

```bash
# Create containers
az storage container create \
  --name rules \
  --account-name kexastorage

az storage container create \
  --name output \
  --account-name kexastorage
```

### 2. Access Configuration

```bash
# Get storage account key
STORAGE_KEY=$(az storage account keys list \
  --account-name kexastorage \
  --resource-group kexa-rg \
  --query '[0].value' \
  --output tsv)

# Configure function app
az functionapp config appsettings set \
  --name kexa-function \
  --resource-group kexa-rg \
  --settings \
    AzureWebJobsStorage="DefaultEndpointsProtocol=https;AccountName=kexastorage;AccountKey=$STORAGE_KEY;EndpointSuffix=core.windows.net"
```

## Monitoring

### 1. Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app kexa-insights \
  --location eastus \
  --resource-group kexa-rg

# Configure function app
az functionapp config appsettings set \
  --name kexa-function \
  --resource-group kexa-rg \
  --settings \
    APPLICATIONINSIGHTS_CONNECTION_STRING="<connection-string>"
```

### 2. Logs

```bash
# View function logs
az functionapp log tail \
  --name kexa-function \
  --resource-group kexa-rg
```

## Security

### 1. Managed Identity

```bash
# Enable managed identity
az functionapp identity assign \
  --name kexa-function \
  --resource-group kexa-rg

# Get principal ID
PRINCIPAL_ID=$(az functionapp identity show \
  --name kexa-function \
  --resource-group kexa-rg \
  --query principalId \
  --output tsv)

# Assign roles
az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Storage Blob Data Contributor" \
  --scope "/subscriptions/<subscription-id>/resourceGroups/kexa-rg/providers/Microsoft.Storage/storageAccounts/kexastorage"
```

### 2. Network Security

```bash
# Configure private endpoints
az network private-endpoint create \
  --name kexa-endpoint \
  --resource-group kexa-rg \
  --vnet-name kexa-vnet \
  --subnet default \
  --private-connection-resource-id $(az functionapp show --name kexa-function --resource-group kexa-rg --query id -o tsv) \
  --group-id sites \
  --connection-name kexa-connection
```

## Maintenance

### 1. Updates

```bash
# Deploy updates
func azure functionapp publish kexa-function

# Update app settings
az functionapp config appsettings set \
  --name kexa-function \
  --resource-group kexa-rg \
  --settings \
    VERSION=2.0.0
```

### 2. Backup

```bash
# Backup function app
az functionapp backup create \
  --name kexa-function \
  --resource-group kexa-rg \
  --storage-account kexastorage \
  --container-name backups
```

## Troubleshooting

### Common Issues

1. **Function Won't Start**
   - Check function logs
   - Verify app settings
   - Check storage account access

2. **Timer Trigger Issues**
   - Verify CRON expression
   - Check function permissions
   - Verify time zone settings

3. **Storage Issues**
   - Check storage account access
   - Verify container permissions
   - Check connection strings

## Next Steps

- [Kubernetes Deployment](./kubernetes.md)
- [Docker Deployment](./docker.md)
- [Local Deployment](./local.md)
