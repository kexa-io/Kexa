# Quick Start Guide

Get Kexa up and running quickly.

## Prerequisites

Complete [Prerequisites](prerequisites.md) first - you need cloud provider credentials ready.

## Quickest Start with Samples

The fastest way to get started with Kexa is using our pre-configured samples from the [kexa-samples repository](https://github.com/kexa-io/kexa-samples/).

**Steps:**

1. **Clone the samples repository**:

   ```bash
   git clone https://github.com/kexa-io/kexa-samples.git
   cd kexa-samples
   ```

2. **Navigate to a sample directory**:

   ```bash
   # For HTTP-based deployment samples
   cd samples/http/

   # Or for Kubernetes deployment samples
   cd samples/kubernetes/
   ```

3. **Review and adjust configuration files** (optional):

   Edit the configuration files according to your environment and needs.

4. **Start Kexa with Docker Compose**:

   ```bash
   docker-compose up
   ```

The samples include pre-configured setups that serve as reference implementations for your own Kexa deployments. This is the quickest way to see Kexa in action!

## Installation

For installation instructions, see the [main README](../../README.md#running-locally) which covers:
- Pre-built binary installation (recommended)
- Building from source

## Running Your First Scan

1. **Set Environment Variables**:

   ```bash
   # For Azure
   export A_AZURECLIENTID="your-client-id"
   export A_AZURETENANTID="your-tenant-id"
   export A_AZURECLIENTSECRET="your-client-secret"
   export A_SUBSCRIPTIONID="your-subscription-id"
   ```

2. **Create Minimal Config**: See [Configuration](../configuration/global-configuration.md)

3. **Run Your First Scan**:

   ```bash
   kexa  # if using binary
   # or
   bun run Kexa/main.ts  # if running from source
   ```

## JSON Export

**Export resources to JSON**:

   ```bash
   # Using binary
   kexa -o
   kexa --output

   # Or from source
   bun run Kexa/main.ts -o
   ```

This exports all gathered resources to `./output/resources/{timestamp}-resources.json`

**Export alerts to JSON**:

   ```bash
   # Using binary
   kexa -a
   kexa --alerts

   # Or from source
   bun run Kexa/main.ts -a
   ```

This exports all resources that raised an alert to `./output/alerts/{timestamp}-alerts.json` grouped by rule.

**Export both resources and alerts**:

   ```bash
   # Using binary
   kexa -o -a

   # Or from source
   bun run Kexa/main.ts -o -a
   ```

**Custom output directory**:

   ```bash
   # Using binary
   OUTPUT=/custom/path kexa -o -a

   # Or from source
   OUTPUT=/custom/path bun run Kexa/main.ts -o -a
   ```

Use the `OUTPUT` environment variable to change the output directory (default: `./output`).

### CLI Options

- `-o, --output` - Export resources to JSON
- `-a, --alerts` - Export alerts to JSON
- `--help` - Display help with examples

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

## What Happens Next?

After your scan completes [Viewing Results](./viewing-results.md)
