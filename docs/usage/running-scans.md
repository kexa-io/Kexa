# Running Scans

This guide covers the different ways to run Kexa scans and their configurations.

## Local Script

### Prerequisites

- Node.js or Bun installed
- Required credentials configured
- Configuration files set up

### Command Line Usage

```bash
# Using Bun
bun run Kexa/index.ts
```

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--config` | Path to config file | `./config/default.json` |
| `--verbose` | Enable verbose output | `false` |
| `--format` | Output format (json/text) | `text` |
| `--timeout` | Scan timeout in minutes | `30` |

### Example with Options

```bash
bun run Kexa/index.ts --config ./custom-config.json --verbose --format json --timeout 60
```

## Docker Container

### Basic Usage

```bash
docker run -v $(pwd)/config:/app/config innovtech/kexa
```

### Environment Variables

```bash
docker run -v $(pwd)/config:/app/config \
  -e A_AZURECLIENTID="your-client-id" \
  -e A_AZURETENANTID="your-tenant-id" \
  -e A_AZURECLIENTSECRET="your-secret" \
  innovtech/kexa
```

### Custom Configuration

```bash
docker run -v $(pwd)/config:/app/config \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  innovtech/kexa
```

## Kubernetes Job

### Basic Job

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

### Scheduled Job (CronJob)

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: kexa-scan
spec:
  schedule: "0 0 * * *"
  jobTemplate:
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

## Azure Function

### Deployment

```bash
# Deploy using Azure CLI
az functionapp deployment source config-zip -g <resource-group> -n <app-name> --src <zip-file-path>
```

### Configuration

```json
{
  "bindings": [
    {
      "name": "timer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 0 * * *"
    }
  ]
}
```

## GitHub Actions

### Basic Workflow

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
      - uses: kexa-io/Kexa_githubAction@main
        with:
          config-path: './config'
```

### Advanced Workflow

```yaml
name: Kexa Scan
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: kexa-io/Kexa_githubAction@main
        with:
          config-path: './config'
          version: 'latest'
          notifications: |
            {
              "email": {
                "enabled": true,
                "recipients": ["team@example.com"]
              }
            }
```

## Best Practices

### 1. Scheduling

- Run regular scans (daily/weekly)
- Schedule during off-peak hours
- Use appropriate intervals for different environments

### 2. Resource Management

- Monitor scan duration
- Configure appropriate timeouts
- Use resource limits in containers
- Optimize scan intervals

### 3. Error Handling

- Implement retry mechanisms
- Log scan failures
- Set up alerts for failed scans
- Monitor scan completion

### 4. Security

- Use secure credential storage
- Implement proper access controls
- Regular credential rotation
- Audit log monitoring

## Troubleshooting

### Common Issues

1. **Authentication Failures**
   - Verify credentials
   - Check permissions
   - Ensure correct configuration

2. **Timeout Issues**
   - Adjust timeout settings
   - Optimize scan configuration
   - Check resource availability

3. **Resource Issues**
   - Monitor resource usage
   - Adjust resource limits
   - Optimize scan intervals

### Debugging

Enable debug mode:

```bash
# Local
DEBUG_MODE=true bun run Kexa/index.ts

# Docker
docker run -e DEBUG=true -v $(pwd)/config:/app/config innovtech/kexa

# Kubernetes
env:
  - name: DEBUG
    value: "true"
```

## Support

For issues and questions:

- Open an issue in the [Kexa GitHub repository](https://github.com/kexa-io/Kexa)
- Check the [documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- Join the [discussions](https://github.com/kexa-io/Kexa/discussions)
