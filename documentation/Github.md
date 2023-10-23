<div align="center">
    <a href="https://www.kexa.io/addOn/github">
        <img src="../images/github-logo.png" alt="Logo" width="200">
    </a>

# <h3 align="center">Github addOn</h3>

  <p align="center">
    Optimize your GitHub workflow easily with our brand new data collection addon, enabling you to analyze and make the most of your development data, for projects that perform better than ever.
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

Example config for 2 environments:
![example config for github](../config/demo/github.default.json)

### Environment

GitHub requires tokens to identify itself to its services. Please note that there are different types of token, depending on what you want to scan. You can create [personal tokens](https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) and [organization tokens](https://docs.github.com/en/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization). Choose the type of token that best corresponds to the elements that are important to you

```bash
GITHUBTOKEN=github_pat_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Additional documentation

[Octokit JS](https://github.com/octokit/octokit.js)
