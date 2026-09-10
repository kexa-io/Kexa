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
The level are from 0 to 9 ( verbose )
DEBUG_MODE=6
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

Each provider entry in your config file (`aws`, `azure`, `gcp`, ...) can set an optional
`prefix`. Env vars that are read through Kexa's own config resolver (`getConfigOrEnvVar`)
are looked up as `<prefix><VAR_NAME>` (no separator, e.g. prefix `PROJECTA_` + `SUBSCRIPTIONID`
= `PROJECTA_SUBSCRIPTIONID`). If `prefix` is omitted, Kexa falls back to the zero-based index
of that config entry (`0`, `1`, ...) as the prefix — so with a single, prefix-less entry your
variable would need to be named e.g. `0SUBSCRIPTIONID`. **Not every variable below goes through
this mechanism** — some are read directly by the underlying SDK's own credential chain and must
NOT be prefixed. This is called out explicitly per provider below. See
[providers documentation](../providers/README.md) for more detail.

### Azure

Kexa reads `<prefix>AZURECLIENTID`, `<prefix>AZURECLIENTSECRET`, `<prefix>AZURETENANTID`
and `<prefix>SUBSCRIPTIONID` (all no separator between prefix and name) through its own
resolver, then bridges the first three into the standard `AZURE_CLIENT_ID`/
`AZURE_CLIENT_SECRET`/`AZURE_TENANT_ID` env vars that the Azure SDK's
`DefaultAzureCredential` expects:

```bash
<prefix>AZURECLIENTID=XXXXXXXXXXXX
<prefix>AZURECLIENTSECRET=XXXXXXXX
<prefix>AZURETENANTID=XXXXXXXXXXXX
<prefix>SUBSCRIPTIONID=XXXXXXx
```

For a single-account setup you can instead set the bare, unprefixed
`AZURE_CLIENT_ID`/`AZURE_CLIENT_SECRET`/`AZURE_TENANT_ID` directly — Kexa never overwrites
these if its own prefixed lookup finds nothing, so `DefaultAzureCredential` will pick up
whatever is already in the environment. This bare form does not scale to multiple Azure
accounts (they would collide on the same variables), so prefer the prefixed form above for
multi-environment configs.

### AWS

`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN` go through Kexa's own
resolver and **must** be prefixed:

```bash
<prefix>AWS_ACCESS_KEY_ID=XXXXXXXXX
<prefix>AWS_SECRET_ACCESS_KEY=XXXXXXXXX
<prefix>AWS_SESSION_TOKEN=XXXXXXXXX # optional, only for temporary/IAM-role credentials
```

### Google Cloud Platform (GCP)

`GOOGLE_APPLICATION_CREDENTIALS` has an unprefixed fallback (a single bare value is shared
across every GCP config entry whose own prefixed lookup is empty) and can be used bare for a
single-account setup. `GOOGLE_PROJECT_ID` has no such fallback and **must** be prefixed:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json # or content of the json credentials
<prefix>GOOGLE_PROJECT_ID=your-project-id
```

## Password Manager

You can optionally use a Password/Vault Manager. The following variables must be present in
the runner environment. Unlike the provider-authentication variables above, password manager
variables are never prefixed.

### Azure Key Vault

```bash
AZURE_CLIENT_ID=XXXXXXXXXXXX
AZURE_TENANT_ID=XXXXXXXXXXXX
AZURE_CLIENT_SECRET=XXXXXXXX
AZUREKEYVAULTNAME=MyKeyVault
```
You can also use this combination with UAI (User Assigned Identities) recommended when using Kexa in an azure function:

```bash
AZUREKEYVAULTNAME=MyKeyVault
USERAZUREIDENTITYID=XXXXXXXX
```

### AWS Secrets Manager

```bash
AWS_SECRET_NAME=XXXXXXXXX # name/ARN of the secret bundle to fetch
AWS_ACCESS_KEY_ID=XXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXX
AWS_SESSION_TOKEN=XXXXXXXXX # This one is optionnal, use it if you're using temporary credentials (IAM role)
```

### HashiCorp Vault

```bash
HCP_CLIENT_ID=XXXXXXXXXXXX
HCP_CLIENT_SECRET=XXXXXXXX
HCP_API_URL=https://your-vault-instance.example.com
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
