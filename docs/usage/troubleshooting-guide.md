# Troubleshooting Guide

This guide provides solutions for common issues you might encounter while using Kexa.

## Common Issues

### 1. Authentication Problems

#### Azure Authentication Failures

**Symptoms:**

- "Failed to authenticate with Azure"
- "Invalid credentials"
- "Access denied"

**Solutions:**

1. Verify credentials:

   ```bash
   # Check environment variables
   echo $A_AZURECLIENTID
   echo $A_AZURETENANTID
   echo $A_AZURECLIENTSECRET
   ```

2. Validate permissions:
   - Ensure the service principal has necessary roles
   - Check subscription access
   - Verify tenant permissions

3. Check credential format:
   - Client ID should be a valid GUID
   - Tenant ID should be a valid GUID
   - Client Secret should be a valid string

#### AWS Authentication Failures

**Symptoms:**

- "Failed to authenticate with AWS"
- "Invalid credentials"
- "Access denied"

**Solutions:**

1. Verify credentials:

   ```bash
   # Check environment variables
   echo $A_AWS_ACCESS_KEY_ID
   echo $A_AWS_SECRET_ACCESS_KEY
   echo $A_AWS_REGION
   ```

2. Validate permissions:
   - Check IAM roles and policies
   - Verify account access
   - Review security groups

3. Check credential format:
   - Access Key ID should be 20 characters
   - Secret Access Key should be 40 characters
   - Region should be valid AWS region

### 2. Scan Issues

#### Timeout Errors

**Symptoms:**

- "Scan timed out"
- "Operation took too long"
- "Connection timeout"

**Solutions:**

1. Adjust timeout settings:

   ```bash
   # Increase timeout
   bun run Kexa/index.ts --timeout 120
   ```

2. Optimize scan configuration:
   - Reduce number of resources
   - Split into smaller scans
   - Use appropriate regions

3. Check network:
   - Verify connectivity
   - Check firewall rules
   - Test bandwidth

#### Resource Access Issues

**Symptoms:**

- "Failed to access resource"
- "Permission denied"
- "Resource not found"

**Solutions:**

1. Check permissions:
   - Review IAM roles
   - Verify resource policies
   - Check network access

2. Validate resource existence:
   - Confirm resource names
   - Check resource state
   - Verify region

3. Review configuration:
   - Check resource filters
   - Verify scan scope
   - Review access patterns

### 3. Notification Problems

#### Email Delivery Issues

**Symptoms:**

- "Failed to send email"
- "SMTP error"
- "Email not received"

**Solutions:**

1. Check SMTP configuration:

   ```json
   {
     "notifications": {
       "email": {
         "smtp": {
           "host": "smtp.example.com",
           "port": 587,
           "secure": true
         }
       }
     }
   }
   ```

2. Verify email settings:
   - Check sender address
   - Validate recipient list
   - Review spam filters

3. Test SMTP connection:

   ```bash
   # Test SMTP
   telnet smtp.example.com 587
   ```

#### Teams Integration Issues

**Symptoms:**

- "Failed to send Teams message"
- "Webhook error"
- "Message not delivered"

**Solutions:**

1. Verify webhook URL:
   - Check URL format
   - Validate webhook token
   - Test webhook endpoint

2. Check message format:

   ```json
   {
     "type": "message",
     "attachments": [
       {
         "contentType": "application/vnd.microsoft.card.adaptive",
         "content": {
           "type": "AdaptiveCard"
         }
       }
     ]
   }
   ```

3. Test webhook:

   ```bash
   # Test webhook
   curl -X POST -H "Content-Type: application/json" -d @test.json https://webhook.office.com/...
   ```

### 4. Export Problems

#### File Export Issues

**Symptoms:**

- "Failed to export file"
- "Permission denied"
- "Invalid format"

**Solutions:**

1. Check file permissions:

   ```bash
   # Check directory permissions
   ls -la /path/to/export/directory
   ```

2. Verify export format:
   - Check file extension
   - Validate JSON/CSV format
   - Review template syntax

3. Test export:

   ```bash
   # Test export with debug
   DEBUG=export bun run Kexa/index.ts --export json --output test.json
   ```

#### Database Export Issues

**Symptoms:**

- "Failed to connect to database"
- "Export failed"
- "Invalid connection string"

**Solutions:**

1. Verify connection:

   ```bash
   # Test database connection
   psql "postgresql://user:pass@localhost:5432/kexa"
   ```

2. Check permissions:
   - Review database user
   - Verify table access
   - Check schema permissions

3. Validate configuration:
   - Check connection string
   - Verify table structure
   - Review export format

## Debugging

### 1. Enable Debug Mode

```bash
# Local
DEBUG_MODE=true

# Docker
docker run -e DEBUG_MODE=true -v $(pwd)/config:/app/config innovtech/kexa

# Kubernetes
env:
  - name: DEBUG_MODE
    value: "true"
```

### 2. Log Levels

```bash
# Set log level
bun run Kexa/index.ts --log-level debug

# Available levels:
# - error
# - warn
# - info
# - debug
# - trace
```

### 3. Verbose Output

```bash
# Enable verbose output
bun run Kexa/index.ts --verbose

# Show all details
bun run Kexa/index.ts --verbose --debug
```

## Performance Optimization

### 1. Scan Optimization

- Use appropriate timeouts
- Configure resource limits
- Optimize scan intervals
- Use parallel scanning

### 2. Resource Management

- Monitor memory usage
- Check CPU utilization
- Review disk space
- Optimize network usage

### 3. Configuration Tuning

```json
{
  "performance": {
    "max_concurrent_scans": 5,
    "scan_timeout": 3600,
    "resource_batch_size": 100,
    "retry_attempts": 3
  }
}
```

## Support Resources

### 1. Documentation

- [Main Documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- [API Reference](https://github.com/kexa-io/Kexa/tree/main/docs/api)
- [Configuration Guide](https://github.com/kexa-io/Kexa/tree/main/docs/configuration)

### 2. Community Support

- [GitHub Issues](https://github.com/kexa-io/Kexa/issues)
- [Discussions](https://github.com/kexa-io/Kexa/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kexa)

### 3. Professional Support

- Contact support team
- Request feature
- Report bug
- Get help

## Best Practices

### 1. Regular Maintenance

- Update Kexa regularly
- Review configurations
- Monitor performance
- Check logs

### 2. Security

- Rotate credentials
- Review permissions
- Monitor access
- Audit logs

### 3. Monitoring

- Set up alerts
- Track metrics
- Monitor resources
- Review reports

## Getting Help

If you need additional help:

1. **Check Documentation**
   - Review relevant guides
   - Search for similar issues
   - Read best practices

2. **Community Support**
   - Post in discussions
   - Search existing issues
   - Ask in community

3. **Professional Support**
   - Contact support team
   - Request assistance
   - Get expert help
