<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/postgres.png" alt="Logo" width="200">
    </a>

# PostgreSQL

  <p align="center">
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Requirements

You must create the database yourself. All tables and constraints will be created automatically if required.

### Default.json

For each of your database, keys mandatory:

- `urlName`: uri connection to access (with database in the uri)

Example for a [PostgreSQL configuration](../../config/demo/postgres.default.json)

### Environment

`urlName` can be use to refer to a specific value in your environnement with his name as value.

### Schema of the database

![Image of database's schema](../../images/schema-UML-SQL.png).
