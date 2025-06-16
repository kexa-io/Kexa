# Configuration

This section covers all aspects of configuring Kexa for your environment. Kexa's configuration is flexible and can be adapted to various deployment scenarios.

## Table of Contents

1. [Global Configuration](./global-configuration.md)
2. [Environment Variables](./environment-variables.md)
3. [Rules Configuration](./rules-configuration.md)
4. [Multiple Environments](./multiple-environments.md)
5. [Advanced Configuration](./advanced-configuration.md)

## Global Configuration

The main configuration file is located at `./config/default.json`. This file defines:

- Provider configurations
- Rule sets
- Global settings
- Timeout and retry settings
- Data export settings

Example configuration:

```json
{
  "azure": [
    {
      "name": "Project A",
      "prefix": "A_",
      "description": "Project A is a quick-launch test",
      "rules": [
        "Economy",
        "OperationalExcellence",
        "Security",
        "rules-testing",
        "Performance"
      ]
    }
  ],
  "general":  { // set this if you want Kexa as continuous run
    "timeout": 1, // timeout after 1 minute, you can use 0.5 for 30s timeout for example
    "maxRetry": 2, // Kexa will retry 2 times after timeout, choose 0 for no retry.
    "checkInterval": 120, // interval between Kexa checks in seconds
    "alertInterval": 3600 // alerts interval to avoid too much duplicate
  }
}
```

See [Global Configuration](./global-configuration.md) for detailed information.

## Environment Variables

Kexa uses environment variables for:

- Sensitive information (API keys, credentials)
- Provider authentication
- Directory paths
- Custom configurations
- Notifications sensitive informations
- Debug settings

Common environment variables:

```bash
# Don't forget that 'A_' is the prefix for the Azure environment variables.

# Azure Configuration
A_AZURECLIENTID=""
A_AZURETENANTID=""
A_AZURECLIENTSECRET=""
A_SUBSCRIPTIONID=""

# AWS Configuration
A_AWS_SECRET_NAME=""
A_AWS_REGION=""
A_AWS_ACCESS_KEY_ID=""
A_AWS_SECRET_ACCESS_KEY=""
```

See [Environment Variables](./environment-variables.md) for a complete list and usage examples.

## Rules Configuration

Rules are defined in YAML files and specify:

- What to check
- How to check it
- What actions to take
- Notification settings
- Severity levels
- Custom conditions

**Example rule file:**

```yaml
- version: 1.0.0
  date: 07-18-2023
  alert:
    fatal:
      # settings for fatal level alert
    error:
      # settings for error level alert
    warning:
      # settings for warning level alert
    info:
      # settings for info level alert
    global:
      # global alert settings
    - name: "azure-is-disk-orphan"
      description : "this rules is to check if disk is orphan"
      applied: true
      level: 1
      cloudProvider: azure
      objectName : ComputeManagementClient.disks
      conditions:
        - property : diskState
          condition : DIFFERENT
          value : Unattached
```

To know more about rules and notifications configuration refer first to [Rules Configuration](./rules-configuration.md) and then [Notifications Addons](../notifications/README.md) to use correclty the addon you need. 

## Multiple Environments

Kexa supports managing multiple environments through:

- Environment-specific configurations
- Provider prefixes
- Custom rule sets per environment
- Environment-specific notifications

Example multi-environment configuration:

```json
{
  "azure": [
    {
      "name": "Production",
      "prefix": "PROD_",
      "rules": ["Security", "Performance"]
    },
    {
      "name": "Development",
      "prefix": "DEV_",
      "rules": ["Security", "Cost"]
    }
  ]
}
```

See [Multiple Environments](./multiple-environments.md) for detailed information.

## Advanced Configuration

For advanced users, Kexa supports:

- Multiple configuration files
- Environment-specific settings
- Custom addon configurations
- Variabilization
- Custom scripts
- Advanced notification routing
- Data export customization

See [Advanced Configuration](./advanced-configuration.md) for detailed information.

## Best Practices

1. **Security**:
   - Use environment variables for sensitive data
   - Implement proper access controls
   - Regular credential rotation

2. **Organization**:
   - Use meaningful prefixes
   - Document custom configurations
   - Version control your rules

3. **Performance**:
   - Optimize rule sets
   - Configure appropriate timeouts
   - Use efficient notification channels

4. **Maintenance**:
   - Regular configuration reviews
   - Update rules as needed
   - Monitor notification effectiveness

## Example Configurations

For real-world examples and sample configurations, visit our [Kexa Samples Repository](https://github.com/kexa-io/kexa-samples). This repository contains:

- Sample configuration files
- Docker Compose examples
- Deployment templates
- Best practice implementations

These examples can serve as a starting point for your own Kexa configurations.

## Troubleshooting

Common configuration issues and solutions:

1. **Authentication Issues**:
   - Verify environment variables
   - Check credential permissions
   - Validate provider settings

2. **Rule Execution Problems**:
   - Review rule syntax
   - Check resource availability
   - Verify condition logic

3. **Notification Failures**:
   - Validate notification settings
   - Check channel configurations
   - Verify message templates

See the [Troubleshooting Guide](../troubleshooting.md) for more information.
