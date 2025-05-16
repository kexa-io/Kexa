# Getting Started with Kexa

Welcome to Kexa! This guide will help you get up and running with Kexa quickly and efficiently.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- [Bun](https://bun.sh/) - The runtime environment for Kexa
- [Git](https://git-scm.com/) - For version control
- [Docker](https://www.docker.com/) (optional) - For containerized deployment
- [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.4) (optional) - For using the configuration script on Linux

## Installation Methods

Kexa can be installed in several ways. Choose the method that best suits your needs:

### 1. Manual Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kexa-io/Kexa.git
   cd Kexa
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

### 2. Docker Installation

1. Create a config directory:

   ```bash
   mkdir config
   ```

2. Create a `default.json` file in the config directory with your provider configuration (see [Configuration](../configuration/README.md))

3. Run Kexa using Docker:

   ```bash
   docker run -v $(pwd)/config:/app/config innovtech/kexa
   ```

## Quick Start

After installation, follow these steps to run your first scan:

1. Configure your environment variables:
   - Set up provider credentials
   - Configure notification settings
   - See [Environment Variables](../configuration/environment-variables.md) for details

2. Set up your rules:
   - Choose from pre-built rule sets
   - Create custom rules
   - See [Rules Configuration](../configuration/rules-configuration.md) for details

3. Run your first scan:

   ```bash
   # Using Bun
   bun run Kexa/index.ts

   # Using Docker
   docker run -v $(pwd)/config:/app/config innovtech/kexa
   ```

## Configuration

The basic configuration is done through the `default.json` file in your config directory. Here's a minimal example:

```json
{
  "azure": [
    {
      "name": "Project A",
      "prefix": "A_",
      "description": "Project A is a quick-launch test",
      "rules": [
        "Economy",
        "OperationalExcellence",
        "Security",
        "rules-testing",
        "Performance"
      ]
    }
  ]
}
```

## Next Steps

- Learn about [Configuration](../configuration/README.md)
- Explore [Usage](../usage/README.md)
- Check out [Deployment](../deployment/README.md) options
- Join our [Community](../contributing/community-guidelines.md)

## Troubleshooting

If you encounter any issues during installation or setup:

1. Check the [FAQ](../faq.md)
2. Review the [Troubleshooting Guide](../troubleshooting.md)
3. Open an [Issue](https://github.com/kexa-io/Kexa/issues) on GitHub
4. Join our [Discussions](https://github.com/kexa-io/Kexa/discussions) for community support
