# Installation Guide

This guide provides detailed instructions for installing Kexa using different methods.

## Installation Methods

### 1. Local Installation

#### Using Bun

```bash
# Install globally
bun install -g @innovtech/kexa

# Install in project
bun add @innovtech/kexa
```

### 2. Docker Installation

#### Pull Image

```bash
# Pull latest version
docker pull innovtech/kexa:latest

# Pull specific version
docker pull innovtech/kexa:1.0.0
```

#### Run Container

```bash
# Basic run
docker run -v $(pwd)/config:/app/config innovtech/kexa

# With environment variables
docker run -v $(pwd)/config:/app/config \
  -e A_AZURECLIENTID="your-client-id" \
  -e A_AZURETENANTID="your-tenant-id" \
  -e A_AZURECLIENTSECRET="your-secret" \
  innovtech/kexa
```

### 3. Kubernetes Installation

#### Using Helm

```bash
# Add Helm repository
helm repo add innovtech https://innovtech.github.io/helm-charts

# Install Kexa
helm install kexa innovtech/kexa
```

#### Using kubectl

```bash
# Apply Kubernetes manifests
kubectl apply -f https://raw.githubusercontent.com/kexa-io/Kexa/main/k8s/manifests/kexa.yaml
```

## Configuration

### 1. Basic Configuration

Create a `config.json` file:

```json
{
  "providers": {
    "azure": {
      "enabled": true,
      "subscription_id": "your-subscription-id"
    },
    "aws": {
      "enabled": true,
      "region": "us-east-1"
    }
  },
  "notifications": {
    "email": {
      "enabled": true,
      "smtp": {
        "host": "smtp.example.com",
        "port": 587
      }
    }
  }
}
```

### 2. Environment Variables

```bash
# Azure credentials
export A_AZURECLIENTID="your-client-id"
export A_AZURETENANTID="your-tenant-id"
export A_AZURECLIENTSECRET="your-secret"

# AWS credentials
export A_AWS_ACCESS_KEY_ID="your-access-key"
export A_AWS_SECRET_ACCESS_KEY="your-secret-key"
export A_AWS_REGION="your-region"
```

### 3. Docker Configuration

Create a `docker-compose.yml`:

```yaml
version: '3'
services:
  kexa:
    image: innovtech/kexa:latest
    volumes:
      - ./config:/app/config
      - ./rules:/app/rules
    environment:
      - A_AZURECLIENTID=your-client-id
      - A_AZURETENANTID=your-tenant-id
      - A_AZURECLIENTSECRET=your-secret
```

## Verification

### 1. Check Installation

```bash
# Check version
kexa --version

# Check help
kexa --help
```

### 2. Test Connection

```bash
# Test Azure connection
kexa test azure

# Test AWS connection
kexa test aws
```

### 3. Run Sample Scan

```bash
# Run basic scan
kexa scan

# Run with verbose output
kexa scan --verbose
```

## Post-Installation

### 1. Update Configuration

1. Review default settings
2. Adjust scan parameters
3. Configure notifications
4. Set up rules

### 2. Set Up Notifications

1. Configure email settings
2. Set up Teams webhook
3. Configure webhook endpoints
4. Test notifications

### 3. Create Rules

1. Review default rules
2. Create custom rules
3. Test rule execution
4. Monitor results

## Troubleshooting

### Common Issues

1. **Installation Failures**
   - Check prerequisites
   - Verify permissions
   - Review error logs

2. **Configuration Issues**
   - Validate JSON syntax
   - Check file permissions
   - Verify credentials

3. **Connection Problems**
   - Check network access
   - Verify credentials
   - Test endpoints

### Debug Mode

```bash
# Enable debug mode
DEBUG_MODE=true kexa scan

# Show verbose output
kexa scan --verbose --debug
```

## Next Steps

After successful installation:

1. Review [Quick Start Guide](quick-start.md)
2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
