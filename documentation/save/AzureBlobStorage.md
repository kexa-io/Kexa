<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/azureBlobStorage.png" alt="Logo" width="200">
    </a>

# <h3 align="center">Azure Blob Storage</h3>

  <p align="center">
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your blob storage, no key is mandatory in the original sense of the term except:

- "containerName": it's refer to the name of your container where you want to store the data

In addition at least one combination of the following keys is mandatory:

- "accountName" and "accountKey" : Both refer of some information, you can find in the portal in the section "Access keys"
- "urlName": url connection to access
- "accountName" with default credential in your environnement

The following keys are recommended to ensure better readability when re-reading the configuration:

- "name": The name refers to the environment concerned by one or more keywords.
- "description": the description helps to clarify the name and avoid any possible confusion about the environment concerned.

Example config for each identification you can use:
![example config for azure](../../config/demo/azureBlobStorage.default.json)

### Environment

urlName can be use to refer to a specific value in your environnement with his name as value.
