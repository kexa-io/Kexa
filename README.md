# Kexa

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/9278/badge)](https://www.bestpractices.dev/projects/9278)

<div align="center">
  <a href="https://www.kexa.io/">
    <img src="images/kexa-no-background-color.png" alt="Logo" width="100" height="100">
  </a>
  <h3>Multi-Cloud Compliance Management Made Simple</h3>
</div>

## Overview

Kexa is an open-source compliance management tool that simplifies security and compliance across multiple cloud platforms including Azure, Google Cloud, AWS, and more. It provides:

- Real-time monitoring and instant alerts
- Simple, intuitive rule-based compliance checks
- Detailed compliance reports and analysis
- Seamless integration with existing tools
- Support for multiple deployment methods

## Quick Start

### Prerequisites

- BunJS installed
- Cloud provider credentials (Azure, AWS, GCP, etc.)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/4urcloud/Kexa.git
    cd Kexa
    ```

2. Install dependencies:

    ```bash
    bun i --frozen-lockfile
    ```

3. Configure Kexa by editing the `default.conf` file.

4. Run Kexa:

    ```bash
    bun run ./Kexa/index.ts
    ```

### Alternative Installation Methods

- **Docker**: Use our [Docker image](https://hub.docker.com/r/innovtech/kexa)
- **GitHub Action**: Use our [GitHub Action](https://github.com/4urcloud/Kexa_githubAction)
- **Kubernetes**: Deploy using our [Kubernetes manifests](documentation/Documentation-Kexa.md#kubernetes-1)
- **Azure Function**: Deploy as an [Azure Function](documentation/Documentation-Kexa.md#azure-function)

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

- Report bugs: [GitHub Issues](https://github.com/4urcloud/Kexa/issues)
- Request features: [GitHub Discussions](https://github.com/4urcloud/Kexa/discussions)
- Join our community: [Discord](https://discord.gg/kexa)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [kexa.io](https://www.kexa.io/)
- Email: [contact@kexa.io](mailto:contact@kexa.io)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/4urcloud/Kexa.svg?style=for-the-badge
[contributors-url]: https://github.com/4urcloud/Kexa/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/4urcloud/Kexa.svg?style=for-the-badge
[forks-url]: https://github.com/4urcloud/Kexa/network/members
[stars-shield]: https://img.shields.io/github/stars/4urcloud/Kexa.svg?style=for-the-badge
[stars-url]: https://github.com/4urcloud/Kexa/stargazers
[issues-shield]: https://img.shields.io/github/issues/4urcloud/Kexa.svg?style=for-the-badge
[issues-url]: https://github.com/4urcloud/Kexa/issues
[license-shield]: https://img.shields.io/github/license/4urcloud/Kexa.svg?style=for-the-badge
[license-url]: https://github.com/4urcloud/Kexa/blob/master/LICENSE.txt
