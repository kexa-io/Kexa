<div align="center">
  <a href="https://www.kexa.io/addOn/postgresql">
    <img src="../../images/postgresql-logo.svg.png" alt="Logo" width="200"/>
  </a>
</div>

# PostgreSQL addOn

<div>
  <p align="center">
    Explore your PostgreSQL databases with our scan addon. Get a detailed view of your tables, indexes, users and more, for optimized data management and analysis.
    <br />
    <a href="https://github.com/kexa-io/Kexa/issues">Report a Bug</a>
    ·
    <a href="https://github.com/kexa-io/Kexa/issues">Request a Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your environments, the following keys are mandatory:

- `rules`: Refers to the set of rule files you want to apply to this environment.
- `prefix`: The prefix is the particle to place in front of the environment variables to be cited here.

The following keys are recommended to ensure better readability when re-reading the configuration:

- `name`: The name refers to the environment concerned by one or more keywords.
- `description`: The description helps clarify the name and avoid any possible confusion about the environment concerned.

Example of [configuration for 2 PostgreSQL environments](../../config/demo/postgresql.default.json).

### Environment

PostgreSQL requires all the necessary information to connect to its services. This information is usually provided through environment variables.

```bash
POSTGRES_HOST=localhost
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_PORT=5432
```

Make sure the user specified has sufficient rights to read the necessary system information (such as SHOW DATABASES, SHOW TABLES, etc.).

## Additional Documentation

[Node.js Driver for PostgreSQL](https://www.npmjs.com/package/pg)
