# Environment Variables

Kexa uses environment variables for sensitive information and configuration. This document lists all available environment variables and their purposes.

## Directory & Notifications

### Rules Directory

```bash
# Default value
RULESDIRECTORY=./rules

# Remote rules (optional)
RULESDIRECTORY="https://api.github.com/repos/kexa-io/public-rules/zipball/main"
RULESAUTHORIZATION="Bearer github_pat_XXXXXXXXXXXXXXXXXXXXXXXX" # Optional
```

### Output Directory

```bash
# Default value
OUTPUT=./output

# Enable verbose output when DEBUG_MODE is set
DEBUG_MODE=1
```

### Email Configuration

```bash
EMAILPORT=587
EMAILHOST=smtp.sendgrid.net
EMAILUSER=apikey
EMAILPWD=your_api_key
EMAILFROM='"Kexa" <noreply@example.com>'
```

### SMS Configuration (Twilio)

```bash
SMSFROM='+1234567890'
SMSACCOUNTSID=your_account_sid
SMSAUTHTOKEN=your_auth_token
```

## Provider Authentication

### Azure

```bash
AZURE_CLIENT_ID=XXXXXXXXXXXX
AZURE_TENANT_ID=XXXXXXXXXXXX
AZURE_CLIENT_SECRET=XXXXXXXX
```

### AWS

```bash
AWS_SECRET_NAME=XXXXXXXXX
AWS_ACCESS_KEY_ID=XXXXXXXXX  
AWS_SECRET_ACCESS_KEY=XXXXXXXXX
```

### Google Cloud Platform (GCP)

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json # or content of the json crendentials
GOOGLE_PROJECT_ID=your-project-id
```

## Password Manager

You can optionally use a Password/Vault Manager. The following variables must be present in the runner environment:

### Azure Key Vault

```bash
AZURECLIENTID=XXXXXXXXXXXX
AZURETENANTID=XXXXXXXXXXXX
AZURECLIENTSECRET=XXXXXXXX
SUBSCRIPTIONID=XXXXXXX
AZUREKEYVAULTNAME=MyKeyVault # This one is optionnal, use it if you want to retrieve your secrets from azure keyvault
```

### AWS Secrets Manager

```bash
AWS_ACCESS_KEY_ID=XXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXX  
AWS_SESSION_TOKEN=XXXXXXXXX # This one is optionnal, use it if you're using temporary credentials (IAM role)
```

### Google Secret Manager

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json # or content of the json crendentials
GOOGLE_PROJECT_ID=your-project-id
```

## Additional Configuration

### Auto Update

```bash
AUTOUPDATE=true  # Enable automatic updates
```

### Custom Configuration

```bash
NODE_CONFIG_TS_ENV=customName  # Use custom configuration file
```

## Notes

- Variables in your password manager will be "simulated" as being present locally
- Values will only be known in the environment when used
- No prefix is needed for password manager variables
- These variables refer to the runner space, not specific environments
