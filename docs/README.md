# Kexa Documentation

Welcome to the Kexa documentation! This documentation will help you understand and use Kexa effectively for multi-cloud compliance management.

## Table of Contents

1. [Getting Started](./getting-started/README.md)
   - [Prerequisites](./getting-started/prerequisites.md)
   - [Installation](./getting-started/installation.md)
   - [Quick Start](./getting-started/quick-start.md)

2. [Configuration](./configuration/README.md)
   - [Global Configuration](./configuration/global-configuration.md)
   - [Environment Variables](./configuration/environment-variables.md)
   - [Rules Configuration](./configuration/rules-configuration.md)
   - [Multiple Environments](./configuration/multiple-environments.md)

3. [Usage](./usage/README.md)
   - [Running Scans](./usage/running-scans.md)
   - [Viewing Results](./usage/viewing-results.md)
   - [Notifications](./notifications/README.md)
   - [Data Export](./usage/data-export.md)

4. [Deployment](./deployment/README.md)
   - [Local](./deployment/local.md)
   - [Docker](./deployment/docker.md)
   - [Kubernetes](./deployment/kubernetes.md)
   - [Azure Function](./deployment/azure-function.md)
   - [GitHub Actions](./deployment/github-actions.md)

5. [Contributing](./contributing/README.md)
   - [Development](./contributing/development.md)
   - [Adding Addons](./contributing/adding-addons.md)
   - [Testing](./contributing/testing.md)
   - [Community Guidelines](./contributing/community-guidelines.md)

6. [Providers](./providers/README.md)
   - [AWS](./providers/aws.md)
   - [Azure](./providers/azure.md)
   - [GCP](./providers/gcp.md)
   - [GitHub](./providers/github.md)
   - [Google Drive](./providers/google-drive.md)
   - [Google Workspace](./providers/google-workspace.md)
   - [HTTP/HTTPS](./providers/http.md)
   - [Kubernetes](./providers/kubernetes.md)
   - [Microsoft/Office 365](./providers/o365.md)

## About Kexa

Kexa is an open-source cloud infrastructure compliance and security monitoring tool that helps you maintain the quality and security of your cloud environments. It provides automated scanning, rule-based verification, and real-time alerts for infrastructure issues.

### Key Features

- 🔍 **Multi-Cloud Scanning**: Automated infrastructure scanning across Azure, AWS, GCP, and more
- ⚡ **Real-time Monitoring**: Continuous compliance monitoring with instant alerts
- 🔔 **Multi-channel Notifications**:
  - Email notifications
  - SMS alerts
  - Microsoft Teams integration
  - Webhook support
  - Custom notification channels
- 🔒 **Security & Compliance**:
  - Automated security breach detection
  - Compliance rule verification
  - Custom rule creation
- 💰 **Cost Optimization**:
  - Resource usage monitoring
  - Cost-saving recommendations
  - Unused resource detection
- 🛠️ **Extensible Platform**:
  - Custom addon support
  - Community-driven rules
  - Plugin system
- 🔄 **Flexible Deployment**:
  - Local script execution
  - Docker container
  - Kubernetes deployment
  - Azure Functions
  - GitHub Actions
- 📊 **Comprehensive Reporting**:
  - Detailed scan results
  - Export capabilities
  - Custom report generation

### Quick Start

```bash
# Windows
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/kexa-io/Kexa/dev/initKexa.ps1" -OutFile "./initKexa.ps1"; & "./initKexa.ps1" -d -c

# Linux
curl -sSL https://raw.githubusercontent.com/kexa-io/Kexa/main/initKexa.sh -o initKexa.sh && chmod +x initKexa.sh && ./initKexa.sh -d -c
```

## Support & Community

- 🔍 Automated infrastructure scanning
- ⚡ Real-time compliance monitoring
- 🔔 Multi-channel notifications (Email, SMS, Teams, Webhook)
- 🔒 Security breach detection
- 💰 Cost optimization
- 🛠️ Extensible addon system
- 🔄 Continuous monitoring
- 📊 Detailed reporting

## Contact

- Website: [https://www.kexa.io](https://www.kexa.io)
- GitHub: [https://github.com/kexa-io/Kexa](https://github.com/kexa-io/Kexa)
- Email: <support@kexa.io>
