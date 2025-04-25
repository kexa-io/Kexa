<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/MongoDB-Logo.png" alt="Logo" width="200">
    </a>

# MongoDB

  <p align="center">
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your database, keys mandatory:

- `urlName`: url connection to access (with database in the url)
- `collectionName`: name of the collection where to store the data. If it's not exist we create it.

Example [configuration for MongoDB](../../config/demo/mongoDB.default.json).

### Environment

`urlName` can be use to refer to a specific value in your environnement with his name as value.
