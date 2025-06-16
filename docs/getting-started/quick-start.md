# Quick Start Guide

Get Kexa up and running quickly.

## Prerequisites

Complete [Prerequisites](prerequisites.md) first - you need cloud provider credentials ready.

## Manual Quick Start

**Fastest Start (2 minutes)**

1. **Clone and Install** (30 seconds):

   ```bash
   git clone https://github.com/kexa-io/Kexa.git
   cd Kexa
   bun install
   ```

2. **Set Environment Variable** (30 seconds):

   ```bash
   # For Azure
   export A_AZURECLIENTID="your-client-id"
   export A_AZURETENANTID="your-tenant-id"
   export A_AZURECLIENTSECRET="your-client-secret"
   export A_SUBSCRIPTIONID="your-subscription-id"
   ```

3. **Create Minimal Config**: [Configuration](../configuration/global-configuration.md)

4. **Run Your First Scan** (30 seconds):

   ```bash
   bun run Kexa/main.ts
   ```

## Docker One-Liner

For Azure (replace with your credentials):

```bash
mkdir config && echo '{"azure":[{"name":"Quick Start", "prefix": "A", "rules":["azureBenchmarkRules"]}]}' > config/default.json && \
docker run -v $(pwd)/config:/app/config \
-e A_AZURECLIENTID="your-client-id" \
-e A_AZURETENANTID="your-tenant-id" \
-e A_AZURECLIENTSECRET="your-client-secret" \
-e A_SUBSCRIPTIONID="your-subscription-id" \
innovtech/kexa
```

## Automated Setup Script (Deprecated)

⚠️ **Deprecation Notice**: The automated setup scripts are currently deprecated and will be reimplemented in a future version. For now, please use the manual installation method below for the most reliable setup.

The setup scripts were designed to automatically download, configure, and set up Kexa with minimal user input:

**Windows:**

```powershell
# Download setup script
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/kexa-io/Kexa/main/initKexa.ps1" -OutFile "./initKexa.ps1"

# Run setup (downloads Kexa and configures environment)
./initKexa.ps1 -d -c
```

**Linux/macOS:**

```bash
# Download setup script
curl -sSL https://raw.githubusercontent.com/kexa-io/Kexa/main/initKexa.sh -o initKexa.sh
chmod +x initKexa.sh

# Run setup (downloads Kexa and configures environment)
./initKexa.sh -d -c
```

**Script Parameters:**

- `-d`: Download/update Kexa from the repository
- `-c`: Configure environment and credentials interactively
- `-b [branch]`: Specify branch (default: main)
- `-p [path]`: Specify installation path

## What Happens Next?

After your scan completes [Viewing Results](./viewing-results.md)
