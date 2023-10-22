<div align="center">
    <a href="https://www.kexa.io/addOn/aws">
        <img src="../images/aws-logo.png" alt="Logo" width="200">
    </a>

# <h3 align="center">AWS addOn</h3>

  <p align="center">
    Optimize your Amazon Web Services experience with our new data scan add-on, simplifying the management and analysis of your critical information, for more informed decisions than ever.
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your environments, the following keys are mandatory:<br/>
    - "rules": This refers to the set of rules files you want to apply to this environment.<br/>
    - "prefix": the prefix is the particle to be placed in front of the environment variables to be quoted [here](#environment).<br/><br/>

The following keys are recommended to ensure better readability when re-reading the configuration:<br/>
    - "name": The name refers to the environment concerned by one or more keywords.<br/>
    - "description": the description helps to clarify the name and avoid any possible confusion about the environment concerned.<br/><br/>

You can also specify the regions you want to scan, this can be used to avoid scanning all regions and reduce execution time.<br/>
Without specifying this, all regions will be scan.<br/>
    - "regions": The list of the regions name you want to scan, refer to AWS regions name<br/><br/>

Here is the AWS regions official documentation :<br/>
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html
<br/>

Example config for 2 environments:
![example config for aws](../config/demo/aws.default.json)

### Environment

There are several ways to identify yourself in an AWS environment. Obviously, you can only scan the environment for which you are at least a "reader":
```
0-AWS_SECRET_NAME=XXXXXXXXX  
0-AWS_REGION=us-east-1  
0-AWS_ACCESS_KEY_ID=XXXXXXXXX  
0-AWS_SECRET_ACCESS_KEY=XXXXXXXXX
```

## Additional documentation

[AWS NodeJs SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)