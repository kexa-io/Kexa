# Global Configuration

The main configuration file is located at `./config/default.json`. This file defines all aspects of your Kexa setup.

## Basic Configuration

Here's a basic example of a configuration file:

```json
{
  "azure": [
    {
      "name": "MyAzureSubscription",
      "description": "Production subscription",
      "rules": [
        "security-rules",
        "cost-rules"
      ]
    }
  ],
  "aws": [
    {
      "name": "MyAWSAccount",
      "description": "Development account",
      "rules": [
        "security-rules"
      ],
      "regions": [
        "us-east-1",
        "us-west-2"
      ]
    }
  ]
}
```

## Configuration Options

### Provider Configuration

Each provider section can contain multiple projects/environments. For each project, you can specify:

- `name`: A unique identifier for the project
- `description`: A description of the project
- `rules`: List of rule files to apply
- `regions`: (Optional) Specific regions to scan (available for GCP & AWS)
- `prefix`: (Optional) Prefix for environment variables

### Multiple Environments

You can define multiple projects for each provider:

```json
{
  "azure": [
    {
      "name": "Project A",
      "prefix": "PROJECTA_",
      "description": "First subscription",
      "rules": ["security-rules"]
    },
    {
      "name": "Project B",
      "prefix": "PROJECTB_",
      "description": "Second subscription",
      "rules": ["security-rules", "cost-rules"]
    }
  ]
}
```

### Advanced Settings

You can add a `general` section for advanced settings, for example here we are adding
the continuous run mode for Kexa.

```json
{
  "general": {
    "timeout": 1,         // timeout in minutes
    "maxRetry": 2,        // number of retries
    "checkInterval": 120, // interval between checks in seconds
    "alertInterval": 3600 // interval between alerts in seconds
  }
}
```

All four fields are optional. `checkInterval` is what actually switches Kexa from a
single run to continuous mode: if it is omitted (or `0`), Kexa performs exactly one
scan and exits; any value greater than `0` enables the loop. Defaults when a field is
omitted: `timeout` = 15 minutes, `maxRetry` = 3, `checkInterval` = 0 (single run,
disabled), `alertInterval` = 0 (disabled).

You can also add save and/or export modules in this configuration file, save will save all scans results
and ressources, while export is made to only export your cloud ressources states.

```json
    "save": [
        {
            "type": "postgre",
            "name": "DB2",
            "description": "Database to save the data in subscription EFQD",
            "urlName": "uri to connect to the database or the name of the var environment where the uri is stored: the format of the uri is : postgres://user:password@host:port/database"
        }
    ],
    "export": [
        {
            "type": "postgre",
            "name": "DB2",
            "description": "Database to save the data in subscription EFQD",
            "urlName": "uri to connect to the database or the name of the var environment where the uri is stored: the format of the uri is : postgres://user:password@host:port/database"
        }
    ]
```

To know more about save & export fields, refer to [Saving Data Documentation](../save/README.md):

To know more about save & export possibility, refer to associated documentations:
- [MySQL](../save/MySQL.md)
- [Postgres](../save/Postgres.md)
- [AzureBlobStorage](../save/AzureBlobStorage.md)
- [MongoDB](../save/MongoDB.md)
- [Kexa Premium](../save/Kexa.md)

## Custom Configuration Files

You can use multiple configuration files by:

1. Creating a `/config/env/` directory
2. Adding your configuration files with custom names
3. Setting the environment variable:

   ```bash
   NODE_CONFIG_TS_ENV=customName
   ```

To know more about this check [Multiple Environments Documentation](../configuration/multiple-environments.md)