<div align="center">
  <a href="https://www.kexa.io/addOn/mongodb">
    <img src="../../images/MongoDB-Logo.png" alt="Logo" width="200"/>
  </a>
</div>

# MongoDB addOn

<div>
  <p align="center">
    Explore your MongoDB databases with our scan addon. Get a detailed view of your collections, indexes, users and more, for optimized data management and analysis.
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

Example of [configuration for 2 MongoDB environments](../../config/demo/mongodb.default.json).

### Environment

MongoDB requires a connection URI to connect to its services. This URI contains all the necessary information for authentication and connection to your cluster.

MONGODB_URI: The full connection string for your MongoDB deployment.

#### Example connection string for a local cluster

```bash
MONGODB_URI="mongodb://user:password@localhost:27017/myDatabase?authSource=admin"
```

#### Example for MongoDB Atlas

```bash
MONGODB_URI="mongodb+srv://user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
```

Make sure the user specified in the URI has sufficient rights to read the necessary system information (such as listDatabases, usersInfo, rolesInfo, serverStatus, etc.).

## Additional Documentation

[Node.js Driver for MongoDB](https://www.npmjs.com/package/mongodb)
