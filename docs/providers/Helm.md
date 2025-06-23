<div align="center">
    <a href="https://www.kexa.io/addOn/helm">
        <img src="../../images/helm-logo.svg" alt="Logo" width="300"/>
    </a>
</div>

# Helm addOn

<div>
  <p align="center">
    Take the security of your Helm environments to the next level with our data scan addon, monitoring of your charts.
    <br />
    <a href="https://github.com/kexa-io/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/kexa-io/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Default.json

For each of your EndPoint, the following keys are mandatory:

- `rules`: this refers to the set of rules files you want to apply to this environment.
- `prefix`: the prefix is the particle to be placed in front of the environment variables to be quoted [here](#environment).

The following keys are recommended to ensure better readability when re-reading the configuration:

- `name`: the name refers to the environment concerned by one or more keywords.
- `description`: the description helps to clarify the name and avoid any possible confusion about the environment concerned.

Example of [configuration for 2 Helm environments](../../config/demo/helm.default.json).

### Environment

You need to get and give the path to the access config to your Helm:

```bash
KUBECONFIG=/Path/to/your/.kube/config
```

The config file looks something like this:

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: 
    server: 
  name: 
contexts:
- context:
    cluster: 
    user: 
  name: 
current-context: 
kind: Config
preferences: {}
users:
- name: 
  user:
    client-certificate-data: 
    client-key-data: 
    token: 
```

To provide access to your config file for Kexa Docker version, you can use a volume mount. Putting this file directly in the same folder as your `default.json` is the simplest solution. The path to this file would then be `:"./config/[Name of your config file]"`.

## Additional documentation

[Helm Commands](https://helm.sh/docs/helm/helm_get/)
