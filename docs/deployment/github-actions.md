# GitHub Actions Integration

This guide explains how to use Kexa with GitHub Actions for automated compliance checks and infrastructure monitoring.

## Overview

Kexa can be integrated into your GitHub Actions workflow to automatically check your infrastructure for compliance issues, security vulnerabilities, and cost optimizations. The GitHub Action runs Kexa's checks on a schedule or in response to specific events.

## Quick Start

1. Create a new workflow file in your repository at `.github/workflows/kexa.yml`
2. Add the following configuration:

```yaml
name: Kexa Compliance Check

on:
  schedule:
    - cron: '0 0 * * *'  # Runs daily at midnight
  workflow_dispatch:      # Allows manual triggering

jobs:
  kexa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Kexa
        uses: 4urcloud/Kexa_githubAction@main
        with:
          config: |
            {
              "azure": [
                {
                  "name": "Project A",
                  "prefix": "A_",
                  "description": "Project A compliance check",
                  "rules": [
                    "Economy",
                    "OperationalExcellence",
                    "Security"
                  ]
                }
              ]
            }
        env:
          A_AZURECLIENTID: ${{ secrets.AZURE_CLIENT_ID }}
          A_AZURETENANTID: ${{ secrets.AZURE_TENANT_ID }}
          A_AZURECLIENTSECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          A_SUBSCRIPTIONID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

## Configuration

### Inputs

The GitHub Action accepts the following inputs:

| Input | Required | Description |
|-------|----------|-------------|
| `config` | Yes | JSON configuration for Kexa |
| `version` | No | Kexa version to use (default: latest) |
| `notifications` | No | Notification configuration |

### Environment Variables

Set up the following secrets in your GitHub repository:

#### Azure

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_SUBSCRIPTION_ID`

#### AWS

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

#### GCP

- `GOOGLE_APPLICATION_CREDENTIALS`

## Advanced Configuration

### Custom Schedule

Modify the `cron` expression to change when the action runs:

```yaml
on:
  schedule:
    - cron: '0 */6 * * *'  # Runs every 6 hours
```

### Multiple Providers

Configure multiple providers in your config:

```yaml
config: |
  {
    "azure": [...],
    "aws": [...],
    "gcp": [...]
  }
```

### Notifications

Configure notifications in your workflow:

```yaml
with:
  notifications: |
    {
      "email": {
        "to": "team@example.com",
        "from": "kexa@example.com"
      },
      "slack": {
        "webhook": "https://hooks.slack.com/services/..."
      }
    }
```

## Best Practices

1. **Security**
   - Use GitHub Secrets for sensitive credentials
   - Limit permissions to necessary scopes
   - Regularly rotate credentials

2. **Performance**
   - Schedule checks during off-peak hours
   - Use appropriate rulesets
   - Configure timeouts appropriately

3. **Maintenance**
   - Keep Kexa version updated
   - Review and update rules regularly
   - Monitor action execution times

## Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Verify credentials in GitHub Secrets
   - Check provider permissions
   - Ensure correct subscription/account access

2. **Timeout Issues**
   - Adjust workflow timeout settings
   - Optimize rules configuration
   - Consider splitting large checks

3. **Notification Problems**
   - Verify notification credentials
   - Check notification service status
   - Review notification configuration

### Debugging

Enable debug logging by adding:

```yaml
env:
  DEBUG_MODE: "true"
```

## Examples

### Basic Azure Check

```yaml
name: Kexa Azure Check

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  kexa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Kexa
        uses: 4urcloud/Kexa_githubAction@main
        with:
          config: |
            {
              "azure": [
                {
                  "name": "Production",
                  "prefix": "PROD_",
                  "rules": ["Security", "Economy"]
                }
              ]
            }
        env:
          A_AZURECLIENTID: ${{ secrets.AZURE_CLIENT_ID }}
          A_AZURETENANTID: ${{ secrets.AZURE_TENANT_ID }}
          A_AZURECLIENTSECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          A_SUBSCRIPTIONID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

### Multi-Provider Check

```yaml
name: Kexa Multi-Provider Check

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly check

jobs:
  kexa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Kexa
        uses: 4urcloud/Kexa_githubAction@main
        with:
          config: |
            {
              "azure": [...],
              "aws": [...],
              "gcp": [...]
            }
        env:
          # Azure
          A_AZURECLIENTID: ${{ secrets.AZURE_CLIENT_ID }}
          A_AZURETENANTID: ${{ secrets.AZURE_TENANT_ID }}
          A_AZURECLIENTSECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          A_SUBSCRIPTIONID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
          # AWS
          A_AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          A_AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          A_AWS_REGION: ${{ secrets.AWS_REGION }}
          # GCP
          A_GOOGLE_APPLICATION_CREDENTIALS: ${{ secrets.GCP_CREDENTIALS }}
```

## Support

For issues and questions:

- Open an issue in the [Kexa GitHub repository](https://github.com/kexa-io/Kexa)
- Check the [documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- Join the [discussions](https://github.com/kexa-io/Kexa/discussions)
