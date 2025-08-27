<div align="center">
  <a href="https://www.kexa.io/addOn/mysql">
    <img src="../../images/mysql-Logo.png" alt="Logo" width="200"/>
  </a>
</div>

# MySQL addOn

<div>
  <p align="center">
    Explore your MySQL databases with our scan addon. Get a detailed view of your tables, indexes, users and more, for optimized data management and analysis.
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

Example of [configuration for 2 MySQL environments](../../config/demo/mysql.default.json).

### Environment

MySQL requires all the necessary information to connect to its services. This information is usually provided through environment variables.

```bash
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_PORT=3306
```

Make sure the user specified has sufficient rights to read the necessary system information (such as SHOW DATABASES, SHOW TABLES, etc.).

## Additional Documentation

[Node.js Driver for MySQL](https://www.npmjs.com/package/mysql2-promise)
