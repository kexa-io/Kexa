<div align="center">
    <a href="https://www.kexa.io/">
        <img src="../../images/MongoDB-Logo.png" alt="Logo" width="200"/>
    </a>
</div>

# MongoDB

<div>
  <p align="center">
    MongoDB addon for Kexa save and export operations
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Required Fields

- **type**: `"mongodb"`
- **urlName**: MongoDB connection string (with database included)
- **collectionName**: Collection name for data storage

### Connection String Format

```
mongodb://username:password@host:port/database_name
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### Example Configuration

```json
{
  "save": [
    {
      "type": "mongodb",
      "urlName": "MONGODB_CONNECTION",
      "collectionName": "kexa_scan_results",
      "name": "Production MongoDB",
      "description": "Main database for scan results",
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

Example [configuration for MongoDB](../../config/demo/mongoDB.default.json).

## Environment Variables

Set your MongoDB connection string:

```bash
export MONGODB_CONNECTION="mongodb+srv://username:password@cluster.mongodb.net/kexa_database"
```

## Collection Structure

### Save Results
Documents include timestamp, origin, provider, rules results, and summary information.

### Export Data  
Documents include timestamp, origin, provider, resource type, and raw resource data.

## Features

- **Automatic Collection Creation**: Collections are created if they don't exist
- **Flexible Schema**: JSON documents support varying data structures
- **Indexing**: Consider adding indexes on timestamp, origin, and provider fields for performance
- **Atlas Support**: Compatible with MongoDB Atlas cloud service

## Troubleshooting

- **Connection Issues**: Verify connection string and network access
- **Authentication**: Ensure correct username/password and database permissions
- **Collection Permissions**: User needs read/write access to target collection