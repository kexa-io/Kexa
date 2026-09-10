<div align="center">
    <a href="https://www.kexa.io/addOn/gcp">
        <img src="../../images/gcp-logo.png" alt="Logo" width="200"/>
    </a>
</div>

# GCP addOn

<div>
  <p align="center">
    Optimize the security of your assets on Google Cloud with our industry-leading data scan addon, offering advanced protection, complete visibility and foolproof compliance to ensure your data remains secure in the cloud.
    <br />
    <a href="https://github.com/kexa-io/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/kexa-io/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your environments, the following key is mandatory:

- `rules`: This refers to the set of rules files you want to apply to this environment.

The following key is optional but strongly recommended:

- `prefix`: the particle placed in front of the environment variables listed [here](#environment). If omitted, Kexa falls back to the zero-based index of the environment entry (`0`, `1`, ...) as the prefix.

The following keys are recommended to ensure better readability when re-reading the configuration:

- `name`: The name refers to the environment concerned by one or more keywords.
- `description`: the description helps to clarify the name and avoid any possible confusion about the environment concerned

You can also specify the regions you want to scan, this can be used to avoid scanning all regions and reduce execution time.
Without specifying this, all regions will be scan.

- `regions`: The list of the regions name you want to scan, refer to [GCP regions name](https://cloud.google.com/compute/docs/regions-zones).

Example of [configuration for 2 GCP environments](../../config/demo/gcp.default.json).

### Environment

There are several ways to identify yourself in an Google Cloud environment. Obviously, you can only scan the environment for which you are at least a `reader` role:

```bash
<prefix>GOOGLE_PROJECT_ID=XXXXXXXXXX    # Google Project ID, must be prefixed
GOOGLE_APPLICATION_CREDENTIALS=XXXXXXXX # Content of credentials.json — bare fallback shared across
                                         # every GCP environment whose own <prefix>GOOGLE_APPLICATION_CREDENTIALS is unset
```

## Additional documentation

[GCP NodeJs References](https://cloud.google.com/nodejs/docs/reference)
