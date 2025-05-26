# Adding Addons to Kexa

This guide explains how to create new addons for Kexa to extend its functionality for data gathering, saving results, and exporting data.

## What are Addons?

Addons are modular components that extend Kexa's capabilities by:

- Adding support for new cloud providers and services
- Implementing new data gathering sources
- Creating custom save destinations for scan results
- Adding new export formats and destinations
- Providing custom display formats for results

## Types of Addons

### 1. Gathering Addons
Collect data from various sources (cloud providers, APIs, services).

### 2. Display Addons
Format and display scan results with custom properties.

### 3. Save Addons
Store scan results in various destinations (databases, cloud storage).

### 4. Export Addons
Export gathered data to different formats and locations.

## Creating a New Addon

### 1. Gathering Addon Structure

Create a file named `[addonName]Gathering.service.ts` in `./Kexa/services/addOn/`:
Note that the header is mandatory to list the objects you want to retrieve.

```typescript
/*
    * Provider : [provider-name]
    * Creation date : YYYY-MM-DD
    * Note : Description of what this addon does
    * Resources :
    *    - resourceType1
    *    - resourceType2
    *    - resourceType3
*/

export async function collectData(config: any[]): Promise<any[]> {
    // Return format: array of objects where each object contains
    // categories as keys and arrays of resources as values
    return [
        {
            "categoryItem1": [
                {}, // resource object
                {}, // resource object
            ],
            "categoryItem2": [
                {}, // resource object
            ]
        }
    ];
}
```

**Header Requirements:**
- Provider name
- Creation date
- Description note
- List of resource types (categoryItems) supported

**Return Format:**
The function must return an array where:
- Each item represents a subscription/account/environment
- Each item is an object with categoryItems as keys
- Each categoryItem contains an array of collected resources

### 2. Display Addon Structure

Create a file named `[addonName]Display.service.ts` in `./Kexa/services/addOn/display/`:

```typescript
import { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean = false): string {
    // Use switch on rule.objectName for specific formatting per resource type
    // Provide default return to cover all cases
    
    if (isSms) {
        return `Id: ${objectContent?.id}`;
    } else {
        return `Id: <a href="${objectContent?.url}">${objectContent?.id}</a>`;
    }
}
```

### 3. Save Addon Structure

Create a file named `[addonName]Save.service.ts` in `./Kexa/services/addOn/save/`:

```typescript
import { SaveConfig } from "../../../models/export/config.models";
import { ResultScan } from "../../../models/resultScan.models";

export async function save(saveConfig: SaveConfig, results: ResultScan[]): Promise<void> {
    // Implementation for saving scan results
    // No return value required
}
```

### 4. Export Addon Structure

Create a file named `[addonName]Exportation.service.ts` in `./Kexa/services/addOn/exportation/`:

```typescript
import { SaveConfig } from "../../../models/export/config.models";
import { ProviderResource } from "../../../models/providerResource.models";

export async function exportation(exportConfig: SaveConfig, data: ProviderResource): Promise<void> {
    // Implementation for exporting gathered data
    // No return value required
}
```

## Configuration

### Environment Variables

Set up authentication for your addon using environment variables with prefixes:

```bash
# Without prefix (default environment)
PROVIDER_API_KEY=your_api_key

# With custom prefix
MYPROJECT_PROVIDER_API_KEY=your_api_key
```

### Default Configuration

In your `config/default.json`, add your addon:

```json
{
  "your-addon": [
    {
      "name": "Project Name",
      "prefix": "MYPROJECT_",
      "description": "Project description",
      "rules": [
        "Security",
        "Performance"
      ],
      "regions": [
        "us-east-1"
      ]
    }
  ]
}
```

## Using Templates

Fresh templates are available in `config/freshTemplatesAddOn/` for:
- XXXSave.service.ts
- XXXExportation.service.ts

Use these as starting points for your new addons.

## Password Manager Integration

Your addon can leverage Kexa's password manager support:

### Azure Key Vault
```bash
AZUREKEYVAULTNAME=MyKeyVault
AZURE_CLIENT_ID=XXXXXXXXXXXX
AZURE_TENANT_ID=XXXXXXXXXXXX
AZURE_CLIENT_SECRET=XXXXXXXX
```

### AWS Secrets Manager
```bash
AWS_SECRET_NAME=XXXXXXXXX
AWS_ACCESS_KEY_ID=XXXXXXXXX  
AWS_SECRET_ACCESS_KEY=XXXXXXXXX
```

### Hashicorp Vault
```bash
HCP_CLIENT_ID=XXXXXXXXX
HCP_CLIENT_SECRET=XXXXXXXXX  
HCP_API_URL=XXXXXXXXX
```

## Best Practices

1. **Error Handling**
   - Implement proper error handling in your data collection
   - Return empty arrays rather than throwing errors when no data is found

2. **Performance**
   - Use the `ObjectNameNeed` parameter to optimize data collection

3. **Documentation**
   - Provide usage examples

4. **Security**
   - Use environment variables for credentials

## Deployment Options

Your addon will work with all Kexa deployment methods:

- **Local execution** with Node.js/Bun
- **Docker containers**
- **Azure Functions**
- **GitHub Actions**
- **Kubernetes deployments**

## Community Contributions

To contribute your addon to the community:

1. Fork the Kexa repository
2. Create your addon following the guidelines above
3. Add comprehensive tests and documentation
4. Submit a pull request

Community addons are distributed as separate TypeScript files that users can download and place in their Kexa installation.

## Getting Help

For questions and support:

- **GitHub Issues**: [Report bugs or request features](https://github.com/kexa-io/Kexa/issues)

## Examples

Study existing addons in the codebase:
- AWS gathering implementation
- Azure resource collection
- Google Cloud Platform integration
- Kubernetes data collection

Each provides examples of proper header formatting, data structure, and error handling patterns.