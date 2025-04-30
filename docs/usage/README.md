# Usage

This section covers how to use Kexa effectively in your environment. Learn about running scans, viewing results, configuring notifications, and following best practices.

## Table of Contents

1. [Running Scans](./running-scans.md)
2. [Viewing Results](./viewing-results.md)
3. [Notifications](./notifications.md)
4. [Data Export](./data-export.md)

## Running Scans

Kexa can be run in several ways, depending on your deployment preferences:

### 1. Local Script

```bash
# Using Bun
bun run Kexa/index.ts

# Using PNPM
pnpm run start
```

### 2. Docker Container

```bash
docker run -v $(pwd)/config:/app/config innovtech/kexa
```

### 3. Kubernetes Job

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: kexa-scan
spec:
  template:
    spec:
      containers:
      - name: kexa
        image: innovtech/kexa
        volumeMounts:
        - name: config
          mountPath: /app/config
      volumes:
      - name: config
        configMap:
          name: kexa-config
```

### 4. Azure Function

```bash
# Deploy using Azure CLI
az functionapp deployment source config-zip -g <resource-group> -n <app-name> --src <zip-file-path>
```

### 5. GitHub Actions

```yaml
name: Kexa Scan
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: 4urcloud/Kexa_githubAction@main
        with:
          config-path: './config'
```

See [Running Scans](./running-scans.md) for detailed information.

## Viewing Results

Kexa provides multiple ways to view scan results:

### 1. Console Output

```bash
# Verbose output
bun run Kexa/index.ts --verbose

# JSON output
bun run Kexa/index.ts --format json
```

### 2. Notification Channels

- Email notifications
- SMS alerts
- Microsoft Teams messages
- Webhook notifications
- Saved reports
- Custom notification channels

### 3. Saved Reports

- JSON format
- CSV export
- HTML reports
- Custom formats

Example report structure:

```json
{
  "scan_id": "2024-03-20-001",
  "timestamp": "2024-03-20T10:00:00Z",
  "results": [
    {
      "rule": "Check VM Size",
      "status": "warning",
      "resource": "vm-001",
      "details": "VM size is not optimal"
    }
  ]
}
```

See [Viewing Results](./viewing-results.md) for detailed information.

## Notifications

Configure notifications to stay informed about your infrastructure:

### 1. Email Notifications

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "recipients": ["admin@example.com"],
      "template": "default"
    }
  }
}
```

### 2. Teams Integration

```json
{
  "notifications": {
    "teams": {
      "enabled": true,
      "webhook_url": "https://webhook.office.com/...",
      "channel": "alerts"
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

See [Notifications](./notifications.md) for detailed information.

## Data Export

Kexa supports various data export options:

### 1. JSON Export

```bash
bun run Kexa/index.ts --export json --output results.json
```

### 2. CSV Export

```bash
bun run Kexa/index.ts --export csv --output results.csv
```

### 3. Custom Export

```bash
bun run Kexa/index.ts --export custom --template custom-template.yaml
```

See [Data Export](./data-export.md) for detailed information.

## Best Practices

### 1. Scan Scheduling

- Run regular scans (daily/weekly)
- Schedule during off-peak hours
- Use appropriate intervals for different environments

### 2. Rule Management

- Review and update rules regularly
- Test new rules in development first
- Document custom rules
- Use rule versioning

### 3. Notification Configuration

- Set up multiple notification channels
- Configure appropriate severity levels
- Use notification templates
- Monitor notification delivery

### 4. Security

- Use secure credential storage
- Implement proper access controls
- Regular credential rotation
- Audit log monitoring

### 5. Performance

- Optimize scan intervals
- Use appropriate resource limits
- Monitor scan duration
- Configure timeouts properly

### 6. Maintenance

- Keep Kexa updated
- Review and clean up old reports
- Monitor disk usage
- Regular configuration review

## Troubleshooting

Common usage issues and solutions:

1. **Scan Failures**:
   - Check provider credentials
   - Verify network connectivity
   - Review resource permissions
   - Check timeout settings

2. **Notification Issues**:
   - Verify notification settings
   - Check channel configurations
   - Test notification delivery
   - Review message templates

3. **Performance Problems**:
   - Optimize scan intervals
   - Review resource usage
   - Check network latency
   - Adjust timeout settings

See the [Troubleshooting Guide](../troubleshooting.md) for more information.
