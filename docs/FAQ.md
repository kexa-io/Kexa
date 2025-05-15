# Frequently Asked Questions (FAQ)

## General Questions

### What is Kexa?

Kexa is a cloud resource scanning and monitoring tool that helps identify security issues, cost optimizations, and compliance violations across your cloud infrastructure.

### What cloud providers does Kexa support?

Kexa currently supports:

- Microsoft Azure
- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)

### Is Kexa open source?

Yes, Kexa is open source and available under the Apache-2.0 License. You can find the source code on our GitHub repository.

## Installation & Setup

### What are the system requirements?

- Operating System: Linux, macOS, or Windows
- Node.js 18 or later
- 4GB RAM minimum (8GB recommended)
- 1GB free disk space
- Network access to cloud provider APIs

### How do I install Kexa?

You can install Kexa using:

```bash
bun add -g kexa
```

### How do I set up cloud provider credentials?

For Azure:

```bash
export AZURE_TENANT_ID="your-tenant-id"
export AZURE_CLIENT_ID="your-client-id"
export AZURE_CLIENT_SECRET="your-client-secret"
```

For AWS:

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_REGION="your-region"
```

For GCP:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"
```

## Configuration

### How do I configure multiple environments?

Create separate configuration files for each environment:

```bash
config/
├── environments/
│   ├── development/
│   ├── staging/
│   └── production/
└── shared/
```

### How do I customize scan patterns?

Use the scan patterns configuration:

```json
{
  "scan": {
    "patterns": {
      "include": ["resource-*", "prod-*"],
      "exclude": ["test-*", "temp-*"],
      "tags": {
        "required": ["environment", "owner"]
      }
    }
  }
}
```

### How do I set up notifications?

Configure notification channels in your config.json:

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "smtp": {
        "host": "smtp.example.com",
        "port": 587
      },
      "recipients": ["team@example.com"]
    },
    "teams": {
      "enabled": true,
      "webhook": "https://webhook.example.com"
    }
  }
}
```

## Usage

### How do I run a scan?

```bash
# Basic scan
kexa scan

# Scan specific resources
kexa scan --resource-type vm,storage

# Scan with custom config
kexa scan --config custom-config.json
```

### How do I view scan results?

Results can be viewed in multiple formats:

```bash
# Text output
kexa scan --format text

# JSON output
kexa scan --format json

# CSV output
kexa scan --format csv
```

### How do I export results?

```bash
# Export to JSON
kexa export --format json --output results.json

# Export to CSV
kexa export --format csv --output results.csv

# Export to HTML
kexa export --format html --output report.html
```

## Performance & Optimization

### How can I improve scan performance?

- Adjust concurrent scans in configuration
- Use resource filtering
- Implement caching
- Optimize network settings

### What are the recommended timeout settings?

```json
{
  "scan": {
    "performance": {
      "timeout": 3600,
      "retry_attempts": 3,
      "retry_delay": 30
    }
  }
}
```

## Security

### How are credentials handled?

- Credentials are never stored in configuration files
- Environment variables are used for sensitive data
- OAuth2 is supported for Azure
- IAM roles are supported for AWS

### How do I set up role-based access?

```json
{
  "security": {
    "authorization": {
      "roles": {
        "admin": {
          "permissions": ["*"]
        },
        "viewer": {
          "permissions": ["read"]
        }
      }
    }
  }
}
```

## Troubleshooting

### Common Issues and Solutions

#### Authentication Problems

**Symptoms:**

- "Authentication failed" errors
- "Invalid credentials" messages

**Solutions:**

1. Verify environment variables
2. Check credential validity
3. Ensure proper permissions

#### Scan Issues

**Symptoms:**

- Timeout errors
- Incomplete scans
- Resource access errors

**Solutions:**

1. Check network connectivity
2. Verify resource permissions
3. Adjust timeout settings
4. Review scan patterns

#### Notification Problems

**Symptoms:**

- Failed notifications
- Missing alerts
- Format issues

**Solutions:**

1. Verify notification configuration
2. Check channel connectivity
3. Review template syntax
4. Test notification channels

### How do I enable debugging?

```bash
# Enable debug mode
DEBUG_MODE=true kexa scan

# Show configuration
kexa config show --verbose

# Validate configuration
kexa config validate --strict
```

## Best Practices

### Configuration Management

- Use version control for configurations
- Implement configuration validation
- Document changes
- Regular reviews

### Security

- Regular audits
- Access reviews
- Credential rotation
- Log monitoring

### Performance

- Monitor resource usage
- Adjust concurrency
- Optimize timeouts
- Cache results

## Support

### Where can I get help?

- GitHub Issues: [https://github.com/your-org/kexa/issues](https://github.com/your-org/kexa/issues)
- Documentation: [https://kexa.io/docs](https://kexa.io/docs)
- Community Discussions: [https://github.com/your-org/kexa/discussions](https://github.com/your-org/kexa/discussions)

### How do I report bugs?

1. Check existing issues
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Logs and screenshots

### How do I contribute?

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## Next Steps

1. Review [Getting Started Guide](../getting-started/README.md)
2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
