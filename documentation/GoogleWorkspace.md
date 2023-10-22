<div align="center">
    <a href="https://www.kexa.io/addOn/googleWorkspace">
        <img src="../images/workspace-icon.png" alt="Logo" width="200">
    </a>

# <h3 align="center">Azure addOn</h3>

  <p align="center">
    Optimize your Google Workspace experience with our new data scan add-on, simplifying the management of your shares and global security issues.
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

Example config for 2 environments:<br/>
![example config for Google Workspace](../config/demo/googleWorkspace.default.json)

### Environment

There are several ways to identify yourself in an Azure environment. Obviously, you can only scan the environment for which you are at least a "reader":
```
0-WORKSPACECRED=''  (content of credentials.json)
```

## Additional documentation

[Azure NodeJs SDK](https://github.com/Azure/azure-sdk-for-js/tree/main)