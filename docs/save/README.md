# Save and Export addons


<div align="center">
    <a href="https://www.kexa.io/">
        <img src="../../images/kexa-no-background-color.png" alt="Logo" width="100" height="100"/>
    </a>
</div>

<div>
  <p align="center">
    Configure Kexa to save scan results and export data gathering to various storage backends
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Overview

Kexa supports save / exporting of your data.
Saving your data will save all scan results, ressources and rules (all Kexa entities)
While exporting will just save you cloud ressources current states.

## Currently supported addons

### Database Storage
- **[MongoDB](./MongoDB.md)** - NoSQL document database
- **[MySQL](./MySQL.md)** - Relational database with automatic schema creation
- **[PostgreSQL](./Postgres.md)** - Advanced relational database with JSONB support

### Cloud Storage  
- **[Azure Blob Storage](./AzureBlobStorage.md)** - Microsoft Azure object storage

### Premium Platform
- **[Kexa Premium](./Kexa.md)** - Official Kexa web interface & API


## Configuration Structure

### Save Configuration

Add a "save" attribute to your `default.json` to store all Kexa entities:

```json
{
  "save": [
    {
      "type": "postgres",
      "urlName": "POSTGRES_CONNECTION_STRING",
      "name": "Production Results",
      "description": "PostgreSQL for scan results",
      "origin": "kexa-production",
      "tags": {
        "environment": "production"
      },
      "onlyErrors": false,
      "logs": true
    }
  ]
}
```

### Export Configuration

Add an "export" attribute to your `default.json` to store raw data gathering:

```json
{
  "export": [
    {
      "type": "postgres",
      "urlName": "POSTGRES_EXPORT_CONNECTION",
      "name": "Data Export",
      "description": "Raw infrastructure data",
      "origin": "kexa-datacenter",
      "tags": {
        "purpose": "analytics"
      }
    }
  ]
}
```

## Common Configuration Fields

### SaveConfig Interface

Based on the Kexa models, each save/export configuration supports:

- **type**: Addon name (required)
- **urlName**: Environment variable name or direct URL
- **name**: Descriptive name (optional)
- **description**: Purpose description (optional) 
- **origin**: Kexa run location identifier (optional)
- **tags**: Additional metadata dictionary (optional)

### Save-Specific Fields

- **onlyErrors**: Boolean to save only error results
- **logs**: Boolean to save execution logs in database

## Environment Variables

Most addons support referencing environment variables for connection details:

```json
{
  "urlName": "DATABASE_CONNECTION_STRING"
}
```

This will use the value from the `DATABASE_CONNECTION_STRING` environment variable.

## Next Steps

1. Choose your storage backend from the available options above
2. Follow the specific configuration guide for your chosen addon
3. Set up required environment variables
4. Test with a simple scan to verify connectivity

For detailed addon-specific configuration, click on the documentation links above.