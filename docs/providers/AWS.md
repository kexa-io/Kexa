<div align="center">
    <a href="https://www.kexa.io/addOn/aws">
        <img src="../../images/aws-logo.png" alt="Logo" width="200"/>
    </a>
</div>

# AWS addOn

<div>
  <p align="center">
    Strengthen the security of your AWS resources with our state-of-the-art data scan addon, guaranteeing complete protection of your sensitive data, enhanced compliance and unrivalled peace of mind in the cloud.
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
- `description`: the description helps to clarify the name and avoid any possible confusion about the environment concerned.

You can also specify the regions you want to scan, this can be used to avoid scanning all regions and reduce execution time. Without specifying this, all regions will be scan.

- `regions`: The list of the regions name you want to scan, refer to AWS regions name. Here is the [AWS regions official documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)

Example of [configuration for 2 AWS environments](../../config/demo/aws.default.json).

### Environment

There are several ways to identify yourself in an AWS environment. Obviously, you can only scan the environment for which you are at least a `reader` (IAM role):

```bash
<prefix>AWS_ACCESS_KEY_ID=XXXXXXXXX
<prefix>AWS_SECRET_ACCESS_KEY=XXXXXXXXX
<prefix>AWS_SESSION_TOKEN=XXXXXX # This one is optionnal, use it if you're using temporary credentials (IAM role)
```

Where `<prefix>` is the value of this environment's `prefix` config key (or its zero-based
index if `prefix` is omitted).

## Additional documentation

[AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)
