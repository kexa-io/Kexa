# Prerequisites

This guide outlines the requirements and prerequisites needed to use Kexa effectively.

## System Requirements

### Operating Systems

- Linux (Ubuntu 20.04+, CentOS 8+, RHEL 8+)
- macOS (10.15+)
- Windows 10/11 (with WSL2)

### Hardware Requirements

- CPU: 2+ cores
- RAM: 4GB minimum (8GB recommended)
- Storage: 1GB free space
- Network: Stable internet connection

## Software Requirements

### Runtime Environment

- Node.js 18.x or later
- Bun 1.0.0 or later
- Docker 20.10+ (optional, for containerized deployment)
- Kubernetes 1.20+ (optional, for Kubernetes deployment)

### Package Managers

- Bun 1.2.0 or later

## Cloud Provider Access

### Azure

- Azure subscription
- Service Principal with appropriate permissions
- Required environment variables:

  ```bash
  A_AZURECLIENTID="your-client-id"
  A_AZURETENANTID="your-tenant-id"
  A_AZURECLIENTSECRET="your-client-secret"
  ```

### AWS

- AWS account
- IAM user with appropriate permissions
- Required environment variables:

  ```bash
  A_AWS_ACCESS_KEY_ID="your-access-key"
  A_AWS_SECRET_ACCESS_KEY="your-secret-key"
  A_AWS_REGION="your-region"
  ```

## Development Tools

### Required Tools

- Git 2.30+
- Code editor (VS Code recommended)
- Terminal/Command Prompt
- curl or wget

### Optional Tools

- Azure CLI
- AWS CLI
- kubectl (for Kubernetes)
- Docker Desktop

## Network Requirements

### Outbound Access

- HTTPS (443) to cloud provider APIs
- SMTP (587/465) for email notifications
- Webhook endpoints for integrations

### Firewall Rules

- Allow outbound traffic to:
  - Azure endpoints
  - AWS endpoints
  - Notification services
  - Webhook destinations

## Security Requirements

### Authentication

- Valid cloud provider credentials
- Secure credential storage
- Access to required services

### Permissions

- Read access to cloud resources
- Write access to storage (if needed)
- Access to notification services

## Storage Requirements

### Local Storage

- 1GB minimum free space
- Write permissions for:
  - Configuration files
  - Log files
  - Export files
  - Cache directory

### Cloud Storage (Optional)

- Azure Blob Storage account
- AWS S3 bucket
- Appropriate access permissions

## Notification Requirements

### Email

- SMTP server access
- Valid email credentials
- Spam filter configuration

### Microsoft Teams

- Microsoft Teams webhook URL
- Channel access
- Message posting permissions

### Webhook

- Valid webhook endpoints
- Authentication tokens
- Network access

## Development Environment

### Local Setup

1. Install Node.js/Bun
2. Install Git
3. Clone repository
4. Install dependencies

### Container Setup

1. Install Docker
2. Pull Kexa image
3. Configure volumes
4. Set environment variables

### Kubernetes Setup

1. Install kubectl
2. Configure cluster access
3. Deploy Kexa
4. Configure resources

## Verification Steps

### System Check

```bash
# Check Node.js version
node --version

# Check Bun version
bun --version

# Check Git version
git --version

# Check Docker version (if installed)
docker --version
```

### Cloud Access Check

```bash
# Azure check
az login

# AWS check
aws sts get-caller-identity
```

### Network Check

```bash
# Check cloud provider connectivity
curl https://management.azure.com
curl https://ec2.amazonaws.com

# Check notification services
telnet smtp.example.com 587
curl https://webhook.office.com
```

## Next Steps

After verifying all prerequisites:

1. Proceed to [Installation Guide](installation.md)
2. Review [Quick Start Guide](quick-start.md)
3. Check [Configuration Guide](../configuration/README.md)
4. Explore [Usage Guide](../usage/README.md)
