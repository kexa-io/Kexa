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
- Notification preferences
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
  "global": {
    "timeout": 300,
    "retry": 3,
    "notifications": {
      "email": true,
      "teams": true,
      "webhook": false
    }
  }
}
```

See [Global Configuration](./global-configuration.md) for detailed information.

## Environment Variables

Kexa uses environment variables for:

- Sensitive information (API keys, credentials)
- Provider authentication
- Notification settings
- Directory paths
- Custom configurations
- Debug settings

Common environment variables:

```bash
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

# Notification Settings
A_NOTIFICATION_EMAIL=""
A_NOTIFICATION_TEAMS_WEBHOOK=""
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

Example rule:

```yaml
name: "Check VM Size"
description: "Verify VM size is within allowed range"
provider: "azure"
resource: "virtualMachines"
condition:
  - field: "size"
    operator: "in"
    value: ["Standard_B2s", "Standard_B2ms"]
severity: "warning"
notification:
  channels: ["email", "teams"]
  message: "VM size is not optimal"
```

See [Rules Configuration](./rules-configuration.md) for detailed information.

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
- Custom rule engines

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
