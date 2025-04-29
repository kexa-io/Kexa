# Getting Started with Kexa

This section will guide you through the process of setting up and running Kexa.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- [Bun](https://bun.sh/) - The runtime environment for Kexa
- [Git](https://git-scm.com/) - For version control
- [Docker](https://www.docker.com/) (optional) - For containerized deployment

## Installation

Follow these steps to install Kexa:

1. Clone the repository:

   ```bash
   git clone https://github.com/4urcloud/Kexa.git
   cd Kexa
   ```

2. Install dependencies:

   ```bash
   pnpm i --frozen-lockfile
   ```

## Quick Start

To get started quickly:

1. Configure your environment variables (see [Environment Variables](../configuration/environment-variables.md))
2. Set up your rules (see [Rules Configuration](../configuration/rules-configuration.md))
3. Run your first scan:

   ```bash
   pnpm run start
   ```

## Next Steps

- Learn about [Configuration](../configuration/README.md)
- Explore [Usage](../usage/README.md)
- Check out [Deployment](../deployment/README.md) options
