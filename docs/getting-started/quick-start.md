# Quick Start Guide

This guide will help you get started with Kexa quickly. Follow these steps to run your first scan and view the results.

## Prerequisites

Before you begin, ensure you have:

1. Completed the [Prerequisites](prerequisites.md)
2. Finished the [Installation](installation.md)
3. Set up your cloud provider credentials

## Basic Usage

### 1. Run Your First Scan

```bash
# Basic scan
kexa scan

# Scan with verbose output
kexa scan --verbose

# Scan specific resources
kexa scan --resource-type vm,storage
```

### 2. View Results

```bash
# View in console
kexa scan --format text

# Export to JSON
kexa scan --format json --output results.json

# Export to CSV
kexa scan --format csv --output results.csv
```

### 3. Configure Notifications

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "recipients": ["admin@example.com"]
    },
    "teams": {
      "enabled": true,
      "webhook_url": "https://webhook.office.com/..."
    }
  }
}
```

## Common Scenarios

### 1. Security Scan

```bash
# Run security-focused scan
kexa scan --category security

# Export security findings
kexa scan --category security --format json --output security-report.json
```

### 2. Cost Optimization

```bash
# Run cost analysis
kexa scan --category cost

# Export cost recommendations
kexa scan --category cost --format csv --output cost-report.csv
```

### 3. Compliance Check

```bash
# Run compliance scan
kexa scan --category compliance

# Export compliance report
kexa scan --category compliance --format html --output compliance-report.html
```

## Basic Configuration

### 1. Scan Configuration

```json
{
  "scan": {
    "timeout": 3600,
    "concurrent_scans": 5,
    "resource_types": ["vm", "storage", "network"],
    "regions": ["eastus", "westus"]
  }
}
```

### 2. Rule Configuration

```json
{
  "rules": {
    "enabled": true,
    "severity": ["critical", "warning"],
    "categories": ["security", "cost", "compliance"]
  }
}
```

### 3. Output Configuration

```json
{
  "output": {
    "format": "json",
    "pretty": true,
    "include_metadata": true,
    "timestamp": true
  }
}
```

## Best Practices

### 1. Scan Scheduling

```bash
# Run daily scan
kexa scan --schedule "0 0 * * *"

# Run weekly scan
kexa scan --schedule "0 0 * * 0"
```

### 2. Resource Management

```bash
# Limit resource types
kexa scan --resource-type vm,storage

# Exclude specific resources
kexa scan --exclude "resource-1,resource-2"
```

### 3. Result Management

```bash
# Archive old results
kexa archive --older-than 30d

# Clean up temporary files
kexa cleanup
```

## Common Commands

### 1. Basic Commands

```bash
# Show help
kexa --help

# Show version
kexa --version

# List available rules
kexa rules list
```

### 2. Scan Commands

```bash
# Run scan
kexa scan

# Stop scan
kexa scan stop

# Show scan status
kexa scan status
```

### 3. Configuration Commands

```bash
# Show configuration
kexa config show

# Validate configuration
kexa config validate

# Update configuration
kexa config update
```

## Next Steps

After completing the quick start:

1. **Explore Advanced Features**
   - Custom rules
   - Advanced notifications
   - Integration options

2. **Review Documentation**
   - [Configuration Guide](../configuration/README.md)
   - [Usage Guide](../usage/README.md)
   - [API Reference](../api/README.md)

3. **Join Community**
   - [GitHub Discussions](https://github.com/kexa-io/Kexa/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/kexa)
   - [Slack Channel](https://kexa.slack.com)

4. **Get Support**
   - [Troubleshooting Guide](../usage/troubleshooting-guide.md)
   - [FAQ](../faq.md)
   - [Contact Support](https://kexa.io/support)
