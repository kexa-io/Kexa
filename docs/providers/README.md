# Supported Providers

Kexa supports integration with various cloud providers and services. This section details the configuration and usage for each supported provider.

## Cloud Providers

- [AWS](./aws.md) - Amazon Web Services
- [Azure](./azure.md) - Microsoft Azure
- [GCP](./gcp.md) - Google Cloud Platform

## Version Control

- [GitHub](./github.md) - GitHub repositories and organizations

## Storage Services

- [Google Drive](./google-drive.md) - Google Drive storage
- [Google Workspace](./google-workspace.md) - Google Workspace services

## APIs and Endpoints

- [HTTP/HTTPS](./http.md) - Generic HTTP/HTTPS endpoints

## Container Platforms

- [Kubernetes](./kubernetes.md) - Kubernetes clusters

## Office Services

- [Microsoft/Office 365](./o365.md) - Microsoft Office 365 services

## Provider Configuration

Each provider requires specific configuration:

- Authentication credentials
- API endpoints
- Required permissions
- Rate limits
- Supported features

See the individual provider documentation for details.

## Adding New Providers

To add support for a new provider:

1. Create a new addon
2. Implement the required interfaces
3. Add provider-specific configuration
4. Write tests
5. Submit a pull request

See [Adding Addons](../contributing/adding-addons.md) for details.
