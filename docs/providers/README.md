# Supported Providers

Kexa supports integration with various cloud providers and services. This section details the configuration and usage for each supported provider.

## Cloud Providers

- [AWS](./AWS.md) - Amazon Web Services
- [Azure](./Azure.md) - Microsoft Azure
- [GCP](./GCP.md) - Google Cloud Platform

## Version Control

- [GitHub](./Github.md) - GitHub repositories and organizations

## Storage Services

- [Google Drive](./GoogleDrive.md) - Google Drive storage
- [Google Workspace](./GoogleWorkspace.md) - Google Workspace services

## APIs and Endpoints

- [HTTP/HTTPS](./HTTP.md) - Generic HTTP/HTTPS endpoints

## Container Platforms

- [Kubernetes](./Kubernetes.md) - Kubernetes clusters

## Office Services

- [Microsoft/Office 365](./O365.md) - Microsoft Office 365 services

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
