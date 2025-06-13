# GitHub Actions Integration

This guide explains how to use Kexa with GitHub Actions for automated compliance checks and infrastructure monitoring.

## Overview

Kexa provides a GitHub Action version that allows you to run infrastructure compliance and security checks directly in your CI/CD pipeline. This GitHub Action version provides the same functionality as the classic Kexa, with the added benefit of performing "pre-production" checks before any merge.

The GitHub Action will cancel the workflow if Kexa finds an issue that raises an alert with a level superior to warning (error or fatal).

## Getting Started

You have two options to use Kexa with GitHub Actions:

### Option 1: Ready-to-Run Repository (Recommended for beginners)

1. **Fork or download the ready-to-run repository** and make it private
   - Repository: [Ready to Run Kexa Action](https://github.com/kexa-io/git-action-ready-to-run)
   - ⚠️ **Warning**: Make sure to use a private repository to avoid exposing resource IDs

2. **Set up credentials** in GitHub Secrets (Settings → Secrets and variables → Actions)

3. **Run the scans** manually or on schedule

### Option 2: Direct GitHub Action Usage

Add the GitHub Action directly to your existing repository:

```yaml
name: Kexa Scan

on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:      # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Run Kexa Action
        uses: 4urcloud/Kexa_githubAction@1.8.2
        with:
          ENV_VARS: |
            AZ1_AZURECLIENTID=${{ secrets.AZPROJ1_AZURECLIENTID }}
            AZ1_AZURECLIENTSECRET=${{ secrets.AZPROJ1_AZURECLIENTSECRET }}
            AZ1_AZURETENANTID=${{ secrets.AZPROJ1_AZURETENANTID }}
            AZ1_SUBSCRIPTIONID=${{ secrets.AZPROJ1_SUBSCRIPTIONID }}
```

## Setting Up Provider Credentials

For each provider you want to scan, add the required credentials to your GitHub repository secrets.
To know more about each addons required credentials, refer to [Providers Documentations](../providers/README.md)

## Running Scans

### Manual Trigger

1. Go to "Actions" in your repository
2. Select the workflow for the provider you want to scan
3. Click "Run workflow"
4. Click "Run workflow" again in the popup

### Scheduled Trigger

The ready-to-run repository includes a global workflow (`kexa.yml`) that triggers all providers daily at 12:00 PM by default.

To modify the schedule, edit `.github/workflows/kexa.yml` and change the cron expression:

```yaml
on:
  schedule:
    - cron: '0 12 * * *'  # Daily at 12:00 PM
```

Use tools like [crontab.guru](https://crontab.guru/) to help create your cron expressions.

## Configuration

### Rule Configuration

Each provider has a configuration file in `/config/env/` (e.g., `azure.json`, `aws.json`).

Example configuration structure:
```json
{
  "azure": [
    {
      "name": "Project A",
      "prefix": "AZ1_",
      "description": "First subscription description",
      "rules": [
        "yourRuleName"
      ]
    }
  ]
}
```

### Rule Files

Rules are defined in YAML files located in the `/rules/` folder.
To know more about rule files, refer to [Rules Configurations](../configuration/rules-configuration.md)

## Expected Results

To know more about how to be notified from alerts with Kexa, refer to the [Notifications Documentations](../notifications/README.md)

## Benefits

- **Security**: Continuous compliance monitoring
- **Cost Savings**: Identify orphaned and unused resources
- **Compliance**: Automated checks against best practices
- **Alerting**: Multi-channel notifications (logs, Teams, email, SMS, webhooks)
- **Pre-production Checks**: Prevent non-compliant deployments

## Key Features

- **Easy-to-run & deploy**: No infrastructure costs
- **Multiple notification channels**: All notifications addons from Kexa
- **Export capabilities**: Save results to databases or other services
- **Scheduling**: Run on-demand or on schedule
- **Pre-production validation**: Stop deployments that don't meet compliance

## Best Practices

1. **Use private repositories** to protect resource information
2. **Secure credentials** using GitHub Secrets

## Support and Documentation

For more information:
- [Kexa Core Project](https://github.com/kexa-io/Kexa) ⭐
- [Ready-to-Run Repository](https://github.com/kexa-io/git-action-ready-to-run)
- [Kexa Git Action](https://github.com/kexa-io/git-action)
- [Website](https://www.kexa.io/)