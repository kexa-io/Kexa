<div align="center">
    <a href="https://www.kexa.io/">
        <img src="../../images/kexa-no-background-color.png" alt="Logo" width="200">
    </a>

# Kexa SaaS

  <p align="center">
    Official Kexa SaaS platform for save and export operations
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

## Configuration

### Requirements

Create a token in the [Kexa SaaS portal](https://saas.kexa.io).

### Required Fields

- **type**: `"kexa"`
- **name**: Token name from the Kexa portal
- **token**: Authentication token value

### Example Configuration

```json
{
  "save": [
    {
      "type": "kexa",
      "name": "KEXA_TOKEN_NAME",
      "token": "KEXA_AUTH_TOKEN",
      "description": "Official Kexa SaaS service",
      "origin": "kexa-production",
      "tags": {
        "environment": "production"
      }
    }
  ]
}
```

Example of a [Kexa configuration](../../config/demo/kexa.default.json).

## Environment Variables

Set your Kexa SaaS credentials:

```bash
export KEXA_TOKEN_NAME="kexa-token-name"
export KEXA_AUTH_TOKEN="kexa-generated-token-here"
```

## Features

- **Managed Service**: No infrastructure setup required
- **Web Dashboard**: Visual interface for scan results
- **Data Analysis Tools**: Built-in reporting and analytics
- **API Access**: Programmatic access to stored data
- **Security**: Enterprise-grade security and compliance

## Data Usage

By saving or exporting your data to the Kexa SaaS service:

- Data is processed only by yourself through the platform
- Access to comprehensive viewing and analysis tools
- No third-party processing of your infrastructure data
- Standard data protection and privacy measures apply

## Troubleshooting

- **Authentication Failed**: Verify token name and token value
- **Token Expired**: Generate a new token in the Kexa portal
- **Network Issues**: Check connectivity to saas.kexa.io
- **Quota Exceeded**: Check your SaaS plan limits

## Disclaimer

Users are responsible for:
- Data classification and sensitivity review
- Compliance with organizational data policies  
- Proper token management and security
- Understanding of data residency requirements