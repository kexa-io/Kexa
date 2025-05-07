# Data Export

This guide covers how to export data from Kexa in various formats and integrate it with other tools.

## Overview

Kexa supports multiple export formats and methods to help you:

- Generate reports
- Integrate with other tools
- Archive scan results
- Analyze historical data

## Export Formats

### 1. JSON Export

#### Basic Export

```bash
# Export to JSON file
bun run Kexa/index.ts --export json --output results.json
```

#### Example JSON Structure

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

### 2. CSV Export

#### Basic CSVExport

```bash
# Export to CSV file
bun run Kexa/index.ts --export csv --output results.csv
```

#### Example CSV Structure

```csv
scan_id,timestamp,rule,status,resource,details,severity,category
2024-03-20-001,2024-03-20T10:00:00Z,Check VM Size,warning,vm-001,VM size is not optimal,warning,cost
```

### 3. HTML Export

#### Basic HTML Export

```bash
# Export to HTML file
bun run Kexa/index.ts --export html --output report.html
```

#### Custom Template

```bash
# Use custom template
bun run Kexa/index.ts --export html --template custom-template.html --output report.html
```

### 4. Custom Export

#### Using Templates

```bash
# Export using custom template
bun run Kexa/index.ts --export custom --template custom-template.yaml --output results.txt
```

#### Template Example

```yaml
template: |
  Scan Report
  ==========
  Date: {{timestamp}}
  Environment: {{environment}}
  
  Issues Found:
  {{#each results}}
  - {{rule}}: {{details}}
    Resource: {{resource}}
    Severity: {{severity}}
  {{/each}}
```

## Export Options

### 1. Time Range

```bash
# Export last 7 days
bun run Kexa/index.ts --export json --time-range 7d --output weekly-report.json

# Export specific date range
bun run Kexa/index.ts --export json --start-date 2024-03-01 --end-date 2024-03-20 --output monthly-report.json
```

### 2. Filtering

```bash
# Export by severity
bun run Kexa/index.ts --export json --severity critical --output critical-issues.json

# Export by category
bun run Kexa/index.ts --export json --category security --output security-report.json
```

### 3. Formatting

```bash
# Pretty print JSON
bun run Kexa/index.ts --export json --pretty --output results.json

# Include metadata
bun run Kexa/index.ts --export json --include-metadata --output results.json
```

## Integration Examples

### 1. Export to Database

```bash
# Export to PostgreSQL
bun run Kexa/index.ts --export postgres --connection "postgresql://user:pass@localhost:5432/kexa" --table scan_results
```

### 2. Export to Cloud Storage

```bash
# Export to Azure Blob Storage
bun run Kexa/index.ts --export azure-blob --container results --path reports/

# Export to AWS S3
bun run Kexa/index.ts --export s3 --bucket kexa-reports --path reports/
```

### 3. Export to Monitoring Tools

```bash
# Export to Prometheus
bun run Kexa/index.ts --export prometheus --endpoint http://prometheus:9090

# Export to Grafana
bun run Kexa/index.ts --export grafana --dashboard kexa-alerts
```

## Best Practices

### 1. Export Management

- Regular export scheduling
- Archive old exports
- Monitor storage usage
- Implement retention policies

### 2. Data Organization

- Use consistent naming
- Include timestamps
- Add environment tags
- Maintain export history

### 3. Security

- Secure export credentials
- Encrypt sensitive data
- Control access to exports
- Audit export activities

### 4. Performance

- Optimize export size
- Use appropriate formats
- Schedule during off-peak
- Monitor export duration

## Troubleshooting

### Common Issues

1. **Export Failures**
   - Check permissions
   - Verify disk space
   - Review file paths
   - Check format compatibility

2. **Format Issues**
   - Validate templates
   - Check data structure
   - Review format requirements
   - Test exports

3. **Integration Problems**
   - Verify credentials
   - Check connectivity
   - Review API limits
   - Test integrations

### Debugging

Enable export debugging:

```bash
# Local
DEBUG_MODE=export bun run Kexa/index.ts

# Docker
docker run -e DEBUG_MODE=export -v $(pwd)/config:/app/config innovtech/kexa
```

## Support

For issues and questions:

- Open an issue in the [Kexa GitHub repository](https://github.com/kexa-io/Kexa)
- Check the [documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- Join the [discussions](https://github.com/kexa-io/Kexa/discussions)
