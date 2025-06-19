<div align="center">
    <a href="https://www.kexa.io/">
        <img src="../../images/postgres.png" alt="Logo" width="200"/>
    </a>
</div>

# PostgreSQL

<div>
  <p align="center">
    PostgreSQL addon for Kexa save and export operations
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Requirements

You must create the PostgreSQL database yourself. All tables and constraints will be created automatically if required.

### Required Fields

- **type**: `"postgres"`
- **urlName**: PostgreSQL connection URI (with database included)

### Connection String Format

```
postgresql://username:password@host:port/database_name
postgres://username:password@host:port/database_name?sslmode=require
```

### Example Configuration

```json
{
  "save": [
    {
      "type": "postgres",
      "urlName": "POSTGRES_CONNECTION",
      "name": "Production PostgreSQL", 
      "description": "Main PostgreSQL database for scan results",
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

Example for a [PostgreSQL configuration](../../config/demo/postgres.default.json)


## Environment Variables

Set your PostgreSQL connection string:

```bash
export POSTGRES_CONNECTION="postgresql://kexa_user:password@localhost:5432/kexa_database"
```

## Database Schema

Kexa automatically creates tables following this schema:

![Database Schema](../../images/schema-UML-SQL.png)

### Advanced PostgreSQL Features
- **JSONB Support**: Efficient JSON storage for flexible data
- **Advanced Indexing**: GIN indexes for JSON fields
- **Full-text Search**: Built-in text search capabilities
- **Partitioning**: Support for table partitioning on large datasets

## Features

- **Automatic Schema Creation**: Tables and constraints created automatically
- **JSON/JSONB Support**: Native JSON handling for flexible data storage
- **Advanced Data Types**: Support for arrays, intervals, and custom types
- **SSL Support**: Comprehensive SSL/TLS security options
- **Performance**: Excellent for complex queries and analytics

## Cloud Support

Compatible with:
- Amazon RDS PostgreSQL
- Azure Database for PostgreSQL  
- Google Cloud SQL for PostgreSQL
- Managed PostgreSQL services

## Troubleshooting

- **Connection Refused**: Check PostgreSQL server and pg_hba.conf configuration
- **Authentication Failed**: Verify username, password, and auth method
- **Database Not Found**: Ensure database exists (Kexa only creates tables)
- **Permission Denied**: Check user permissions on database and schema