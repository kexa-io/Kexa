<div align="center">
    <a href="https://www.kexa.io/addOn/gcp">
        <img src="../images/gcp-logo.png" alt="Logo" width="200">
    </a>

# <h3 align="center">Google Cloud addOn</h3>

  <p align="center">
    Optimize your Google Cloud experience with our new data scan add-on, simplifying the management and analysis of your critical information, for more informed decisions than ever.
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your environments, the following keys are mandatory:
    - "rules": This refers to the set of rules files you want to apply to this environment.
    - "prefix": the prefix is the particle to be placed in front of the environment variables to be quoted [here](#environment).

The following keys are recommended to ensure better readability when re-reading the configuration:
    - "name": The name refers to the environment concerned by one or more keywords.
    - "description": the description helps to clarify the name and avoid any possible confusion about the environment concerned.

You can also specify the regions you want to scan, this can be used to avoid scanning all regions and reduce execution time.
Without specifying this, all regions will be scan.
- "regions": The list of the regions name you want to scan, refer to AWS regions name

Here is the GCP regions official documentation :
https://cloud.google.com/compute/docs/regions-zones?hl=en

Example config for 2 environments:
![example config for GCP](../config/demo/gcp.default.json)

### Environment

There are several ways to identify yourself in an Google Cloud environment. Obviously, you can only scan the environment for which you are at least a "reader":
```
GOOGLE_PROJECT_ID=XXXXXXXXXX  ( the google project id )
GOOGLE_APPLICATION_CREDENTIALS=XXXXXXXX  ( the credentials.json content )
```

## Additional documentation

[GCP NodeJs References](https://cloud.google.com/nodejs/docs/reference)