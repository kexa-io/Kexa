<!-- PROJECT LOGO -->
<br />
<div align="center" id="top">

  <a href="https://www.kexa.io/">
    <img src="../images/kexa-no-background-color.png" alt="Logo" width="100" height="100">
  </a>

# Kexa

  <p align="center">
    <strong>Cloud Infrastructure Compliance & Security Monitoring Tool</strong>
    <br />
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">
      <img src="https://img.shields.io/github/issues/4urcloud/Kexa" alt="Issues">
    </a>
    <a href="https://github.com/4urcloud/Kexa/pulls">
      <img src="https://img.shields.io/github/issues-pr/4urcloud/Kexa" alt="Pull Requests">
    </a>
    <a href="https://github.com/4urcloud/Kexa/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/4urcloud/Kexa" alt="License">
    </a>
    <a href="https://github.com/4urcloud/Kexa/stargazers">
      <img src="https://img.shields.io/github/stars/4urcloud/Kexa" alt="Stars">
    </a>
    <br />
    <br />
    <a href="https://github.com/4urcloud/Kexa"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/discussions">Request Feature</a>
    ·
    <a href="https://github.com/4urcloud/Kexa">Star Project</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About Kexa</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#supported-providers">Supported Providers</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#quick-start">Quick Start</a></li>
      </ul>
    </li>
    <li>
      <a href="#configuration">Configuration</a>
      <ul>
        <li><a href="#global-configuration">Global Configuration</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#rules-configuration">Rules Configuration</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#running-scans">Running Scans</a></li>
        <li><a href="#viewing-results">Viewing Results</a></li>
        <li><a href="#notifications">Notifications</a></li>
      </ul>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
      <ul>
        <li><a href="#local">Local</a></li>
        <li><a href="#docker">Docker</a></li>
        <li><a href="#kubernetes">Kubernetes</a></li>
        <li><a href="#azure-function">Azure Function</a></li>
      </ul>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
      <ul>
        <li><a href="#development">Development</a></li>
        <li><a href="#adding-addons">Adding Addons</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## About Kexa

Kexa is an open-source cloud infrastructure compliance and security monitoring tool that helps you maintain the quality and security of your cloud environments. It provides automated scanning, rule-based verification, and real-time alerts for infrastructure issues.

### Features

- 🔍 Automated infrastructure scanning
- ⚡ Real-time compliance monitoring
- 🔔 Multi-channel notifications (Email, SMS, Teams, Webhook)
- 🔒 Security breach detection
- 💰 Cost optimization
- 🛠️ Extensible addon system
- 🔄 Continuous monitoring
- 📊 Detailed reporting

### Supported Providers

- AWS
- Azure
- Google Cloud Platform (GCP)
- GitHub
- Google Drive
- Google Workspace
- HTTP/HTTPS endpoints
- Kubernetes
- Microsoft/Office 365

## Getting Started

### Prerequisites

Kexa is built with [Bun](https://bun.sh/), so you need to install it first:

```bash
# Windows
winget install pnpm

# MacOS - Homebrew
brew install pnpm
```

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/4urcloud/Kexa.git
    cd Kexa
    ```

2. Install dependencies:

    ```bash
    pnpm i --frozen-lockfile
    ```

### Quick Start

1. Configure your environment variables (see [Environment Variables](#environment-variables))
2. Set up your rules (see [Rules Configuration](#rules-configuration))
3. Run your first scan:

    ```bash
    pnpm run start
    ```

## Configuration

### Global Configuration

The main configuration file is located at `./config/default.json`. Here's a basic example:

```json
{
  "azure": [
    {
      "name": "MyAzureSubscription",
      "description": "Production subscription",
      "rules": [
        "security-rules",
        "cost-rules"
      ]
    }
  ],
  "aws": [
    {
      "name": "MyAWSAccount",
      "description": "Development account",
      "rules": [
        "security-rules"
      ],
      "regions": [
        "us-east-1",
        "us-west-2"
      ]
    }
  ]
}
```

### Environment Variables

Kexa uses environment variables for sensitive information and configuration. Here are the main categories:

#### Directory & Notifications

```bash
# Rules directory
RULESDIRECTORY=./rules

# Output directory
OUTPUT=./output

# Email configuration
EMAILPORT=587
EMAILHOST=smtp.sendgrid.net
EMAILUSER=apikey
EMAILPWD=your_api_key
EMAILFROM='"Kexa" <noreply@example.com>'

# SMS configuration (Twilio)
SMSFROM='+1234567890'
SMSACCOUNTSID=your_account_sid
SMSAUTHTOKEN=your_auth_token
```

#### Provider Authentication

Each provider requires specific environment variables for authentication. See the [provider documentation](./provider/) for details.

### Rules Configuration

Rules are defined in YAML files in your rules directory. Here's a basic example:

```yaml
- name: "azure-disk-orphan"
  description: "Check for orphaned disks"
  applied: true
  level: 1  # warn
  cloudProvider: azure
  objectName: disk
  conditions:
    - property: diskState
      condition: DIFFERENT
      value: Unattached
```

## Usage

### Running Scans

You can run Kexa in several ways:

1. Local script:

    ```bash
    pnpm run start
    ```

2. Docker:

    ```bash
    docker run -d innovtech/kexa
    ```

3. Kubernetes:

    ```yaml
    apiVersion: batch/v1
    kind: CronJob
    metadata:
      name: kexacronjob
      namespace: kexa
    spec:
      schedule: "0 0 * * *"
      jobTemplate:
        spec:
          template:
            spec:
              containers:
              - name: kexa
                image: innovtech/kexa:latest
    ```

### Viewing Results

Kexa provides several ways to view scan results:

1. Console output
2. Email notifications
3. SMS alerts
4. Teams messages
5. Webhook notifications
6. Saved reports in various formats

### Notifications

Configure notifications in your rules file:

```yaml
alert:
  info:
    enabled: true
    type:
      - email
      - teams
    to:
      - admin@example.com
      - https://webhook.example.com
```

## Deployment

### Local

```bash
pnpm run start
```

### Docker

```bash
# Build
docker build -t kexa .

# Run
docker run -d kexa
```

### Kubernetes

See the [Kubernetes deployment guide](./deployment/kubernetes.md) for detailed instructions.

### Azure Function

See the [Azure Function deployment guide](./deployment/azure-function.md) for detailed instructions.

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

### Adding Addons

See the [Addon Development Guide](./docs/addon-development.md) for details on creating new addons.

### Testing

```bash
pnpm run test
```

## Roadmap

See our [Roadmap](./ROADMAP.md) for planned features and improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

- Website: [https://www.kexa.io](https://www.kexa.io)
- GitHub: [https://github.com/4urcloud/Kexa](https://github.com/4urcloud/Kexa)
- Email: <support@kexa.io>

<p align="right">(<a href="#top">back to top</a>)</p>
