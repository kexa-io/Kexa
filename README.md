# Kexa

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache License][license-shield]][license-url]
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9278/badge)](https://www.bestpractices.dev/projects/9278)

[![Rejoindre le Slack](https://img.shields.io/badge/Slack-Rejoindre%20la%20communauté-blue?style=for-the-badge&logo=slack)](https://join.slack.com/t/kexaio/shared_invite/zt-343gsrm6d-y9glG4khlH7kuecoerYCOQ)
[![Lisez sur Medium](https://img.shields.io/badge/Medium-Lisez%20nos%20articles-black?style=for-the-badge&logo=medium)](https://medium.com/@contact_52772)


<div align="center">
  <a href="https://www.kexa.io/">
    <img src="images/kexa-no-background-color.png" alt="Logo" width="100" height="100">
  </a>
  <h3>Multi-Cloud Compliance Management Made Simple</h3>
</div>

## Why Kexa ?

Ever needed to verify security and compliance across your multi-cloud infrastructure at low cost while keeping complete control over webhooks and alerting? Kexa.io makes it effortless.

- Run everywhere at low cost - Lightweight script deployment
- Easy addon development - Build custom integrations
- Share YAML rules - Community-driven compliance patterns in simple YAML format
- Core open source - Transparent, auditable foundation
- Keep full control and your data stays with you.


Kexa is an open-source compliance management tool that simplifies security and compliance across multiple cloud platforms including Azure, Google Cloud, AWS, and more. It provides:

Kexa works by scanning your cloud environments based on your configuration, applying customizable compliance rules, and notifying you of any violations. The process is simple:

1. **Scan**: Kexa scans your configured cloud environments using provider credentials
2. **Analyze**: It applies your defined compliance rules to the collected data
3. **Report**: Based on severity levels and notification settings, Kexa alerts you through your preferred communication channels

This straightforward scan-and-verify approach makes it easy to maintain compliance across your entire cloud infrastructure.

Here is an example of the Kexa engine:

![kexa-engine](./images/schema-engine.png)

## Use Cases

🔒 Multi-Cloud Storage Security
Continuously verify Block Public Access settings across AWS S3, GCP Cloud Storage, and Azure Blob Storage. Prevent data exposure by ensuring all storage buckets remain private across your entire infrastructure.

💾 Cost & Security Optimization
Automatically detect unattached disks across AWS EBS, GCP Persistent Disks, and Azure Managed Disks. Eliminate unnecessary costs while preventing potential security risks from orphaned storage resources.

🤖 Azure ML Operations Monitoring
Monitor Azure Machine Learning workspace health by checking for failed training jobs and pipeline executions. Ensure your ML operations run smoothly with proactive failure detection and alerting.


## Quick Start

## Running with Docker Compose
1. clone and run samples from our samples repo example with http check

   ```bash
   git clone https://github.com/kexa-io/kexa-samples
   cd kexa-samples
   ```

2. choose your example with http check

   ```bash
   cd samples/http
   docker-compose up
   ```

## Running localy

### Prerequisites

- BunJS installed
- Cloud provider credentials (Azure, AWS, GCP, etc.)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kexa-io/Kexa.git
   cd Kexa
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Run Kexa:

   ```bash
   export INTERFACE_CONFIGURATION_ENABLED=false
   bun run ./Kexa/main.ts
   ```

4. You can configure Kexa by editing the `default.conf` file inside the `config` folder and re-run the script.

This will check the website <kexa.io> by default.

see <url>https://github.com/kexa-io/kexa-samples</url> for samples.

## Installation Methods

- **Docker Compose**: Use our [Docker Compose file](https://github.com/kexa-io/kexa-samples)
- **Docker**: Use our [Docker image](./docs/deployment/docker.md)
- **GitHub Action**: Use our [GitHub Action](./docs/deployment/github-action.md)
- **Kubernetes**: Deploy using our [Kubernetes manifests](./docs/deployment/kubernetes.md)
- **Azure Function**: Deploy as an [Azure Function](./docs/deployment/azure-function.md)

## Features

- **Multi-Cloud Support**: Works with major cloud providers (Azure, AWS, GCP)
- **Platform Support**: Integrates with GitHub, Kubernetes
- **Workspace Support**: Compatible with Office 365 and Google Workspace
- **Custom Rules**: Create and modify compliance rules to match your needs
- **Real-time Monitoring**: Get instant alerts for compliance violations
- **Flexible Deployment**: Run as a script, container, or cloud function
- **Extensible**: Add custom rules and community addons
- **Multiple Notification Channels**: Support for logs, email, SMS, webhooks, and Teams

## Documentation

For detailed documentation, including:

- Complete setup guide
- Rule configuration
- Deployment options
- Best practices

Visit our [Documentation](./docs/README.md)

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## Support

- star The project: [GitHub Stars](https://github.com/kexa-io/Kexa/stargazers)
- fork The project: [GitHub Forks](https://github.com/kexa-io/Kexa/network/members)
- Report bugs: [GitHub Issues](https://github.com/kexa-io/Kexa/issues)
- Request features: [GitHub Discussions](https://github.com/kexa-io/Kexa/discussions)
- Join our community: [Slack](https://kexaio.slack.com/)

## License

This project is licensed under the Apache License - see the [LICENSE](./LICENSE.txt) file for details.

## Contact

- Website: [kexa.io](https://www.kexa.io/)
- Email: [contact@kexa.io](mailto:contact@kexa.io)

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/kexa-io/Kexa.svg?style=for-the-badge
[contributors-url]: https://github.com/kexa-io/Kexa/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kexa-io/Kexa.svg?style=for-the-badge
[forks-url]: https://github.com/kexa-io/Kexa/network/members
[stars-shield]: https://img.shields.io/github/stars/kexa-io/Kexa.svg?style=for-the-badge
[stars-url]: https://github.com/kexa-io/Kexa/stargazers
[issues-shield]: https://img.shields.io/github/issues/kexa-io/Kexa.svg?style=for-the-badge
[issues-url]: https://github.com/kexa-io/Kexa/issues
[license-shield]: https://img.shields.io/github/license/kexa-io/Kexa.svg?style=for-the-badge
[license-url]: https://github.com/kexa-io/Kexa/blob/master/LICENSE.txt
