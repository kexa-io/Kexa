# Viewing Results

This guide explains how to view and interpret Kexa scan results through various methods.

## Console Output

### Basic Output

```bash
# Default output
bun run Kexa/index.ts

# Verbose output
bun run Kexa/index.ts --verbose

# JSON output
bun run Kexa/index.ts --format json
```

### Output Format

#### Text Format

```text
[INFO] Starting scan...
[INFO] Scanning Azure resources...
[WARN] Found 3 issues:
  - VM 'vm-001': Size not optimal
  - Storage 'st-001': Public access enabled
  - Network 'net-001': Missing NSG
[INFO] Scan completed in 45s
```

#### JSON Format

```json
{
  "scan_id": "2024-03-20-001",
  "timestamp": "2024-03-20T10:00:00Z",
  "duration": 45,
  "results": [
    {
      "rule": "Check VM Size",
      "status": "warning",
      "resource": "vm-001",
      "details": "VM size is not optimal",
      "recommendation": "Consider downsizing to B2s"
    }
  ]
}
```

## Notification Channels

### 1. Email Notifications

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "recipients": ["admin@example.com"],
      "template": "default",
      "severity": ["warning", "critical"]
    }
  }
}
```

### 2. Microsoft Teams

```json
{
  "notifications": {
    "teams": {
      "enabled": true,
      "webhook_url": "https://webhook.office.com/...",
      "channel": "alerts",
      "severity": ["critical"]
    }
  }
}
```

### 3. Webhook Notifications

```json
{
  "notifications": {
    "webhook": {
      "enabled": true,
      "url": "https://api.example.com/webhook",
      "headers": {
        "Authorization": "Bearer token"
      }
    }
  }
}
```

## Saved Reports

### 1. JSON Reports

```bash
# Save as JSON
bun run Kexa/index.ts --export json --output results.json
```

Example JSON report:

```json
{
  "scan_id": "2024-03-20-001",
  "timestamp": "2024-03-20T10:00:00Z",
  "environment": "production",
  "results": [
    {
      "rule": "Check VM Size",
      "status": "warning",
      "resource": "vm-001",
      "details": "VM size is not optimal",
      "recommendation": "Consider downsizing to B2s",
      "severity": "warning",
      "category": "cost"
    }
  ],
  "summary": {
    "total_issues": 3,
    "critical": 1,
    "warning": 2,
    "info": 0
  }
}
```

### 2. CSV Reports

```bash
# Save as CSV
bun run Kexa/index.ts --export csv --output results.csv
```

Example CSV format:

```csv
scan_id,timestamp,rule,status,resource,details,severity,category
2024-03-20-001,2024-03-20T10:00:00Z,Check VM Size,warning,vm-001,VM size is not optimal,warning,cost
```

### 3. HTML Reports

```bash
# Generate HTML report
bun run Kexa/index.ts --export html --output report.html
```

## Interpreting Results

### Severity Levels

1. **Critical**
   - Security vulnerabilities
   - Compliance violations
   - Cost overruns
   - Service disruptions

2. **Warning**
   - Potential issues
   - Optimization opportunities
   - Best practice violations
   - Resource inefficiencies

3. **Info**
   - Informational messages
   - Status updates
   - Configuration details
   - Resource information

### Result Categories

1. **Security**
   - Access control issues
   - Network security
   - Data protection
   - Authentication problems

2. **Cost**
   - Resource optimization
   - Billing issues
   - Usage inefficiencies
   - Reserved instance opportunities

3. **Performance**
   - Resource utilization
   - Response times
   - Throughput issues
   - Capacity planning

4. **Compliance**
   - Policy violations
   - Regulatory requirements
   - Industry standards
   - Best practices

## Best Practices

### 1. Result Management

- Regular review of results
- Prioritize critical issues
- Track issue resolution
- Maintain result history

### 2. Notification Configuration

- Set appropriate severity levels
- Configure multiple channels
- Use notification templates
- Monitor delivery status

### 3. Report Management

- Regular report generation
- Archive old reports
- Monitor storage usage
- Implement retention policies

### 4. Analysis

- Review trends over time
- Identify patterns
- Track improvements
- Share insights with team

## Troubleshooting

### Common Issues

1. **Missing Results**
   - Check scan configuration
   - Verify permissions
   - Review scan logs
   - Check notification settings

2. **Incomplete Reports**
   - Verify export settings
   - Check file permissions
   - Monitor disk space
   - Review timeout settings

3. **Notification Problems**
   - Verify notification settings
   - Check service status
   - Review credentials
   - Test notification channels

### Debugging

Enable debug mode for detailed information:

```bash
# Local
DEBUG_MODE=true bun run Kexa/index.ts

# Docker
docker run -e DEBUG=true -v $(pwd)/config:/app/config innovtech/kexa
```

## Support

For issues and questions:

- Open an issue in the [Kexa GitHub repository](https://github.com/kexa-io/Kexa)
- Check the [documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- Join the [discussions](https://github.com/kexa-io/Kexa/discussions)
