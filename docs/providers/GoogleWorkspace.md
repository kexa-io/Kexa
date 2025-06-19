<div align="center">
    <a href="https://www.kexa.io/addOn/googleWorkspace">
        <img src="../../images/workspace-icon.png" alt="Logo" width="200"/>
    </a>
</div>

# Google Workspace addOn

<div>
  <p align="center">
    Increase the security and compliance of your Google workspace with our state-of-the-art data scan add-on, offering proactive protection, comprehensive monitoring and seamless data management for confident communications and collaboration.
    <br />
    <a href="https://github.com/kexa-io/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/kexa-io/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your environments, the following keys are mandatory:

- `rules`: This refers to the set of rules files you want to apply to this environment.
- `prefix`: the prefix is the particle to be placed in front of the environment variables to be quoted [here](#environment).

The following keys are recommended to ensure better readability when re-reading the configuration:

- `name`: The name refers to the environment concerned by one or more keywords.
- `description`: the description helps to clarify the name and avoid any possible confusion about the environment concerned.

Example of [configuration for 2 Google Workspace environments](../../config/demo/googleWorkspace.default.json)

### Environment

There are several ways to identify yourself in a Google Workspace environment. Obviously, you can only scan the environment for which you are at least a `reader` role:

```bash
WORKSPACECRED=''  # Content of credentials.json or path to credentials.json file
WORKSPACEADMIN='' # Google workspace admin email
```

## Additional documentation

- [Google Workspace Admin SDK NodeJS](https://developers.google.com/workspace/admin/directory/v1/quickstart/nodejs)
- [Google Workspace NodeJS samples](https://github.com/googleworkspace/node-samples)
