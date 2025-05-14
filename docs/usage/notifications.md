# Notifications

This guide covers how to configure and use Kexa's notification system to stay informed about your infrastructure.

## Overview

Kexa supports multiple notification channels to alert you about:

- Security issues
- Cost optimizations
- Compliance violations
- Performance problems
- Resource changes

## Configuration

Check the documentation for each notification type:

- [Teams](../notifications/teams.md)
- [Jira](../notifications/jira.md)

## Best Practices

### 1. Channel Selection

- Use SMS for critical alerts
- Email for daily summaries
- Teams for team collaboration
- Webhooks for integration

### 2. Severity Management

- Define clear severity levels
- Map severity to channels
- Set appropriate thresholds
- Review and adjust regularly

### 3. Template Management

- Create clear templates
- Include relevant information
- Use consistent formatting
- Maintain template versions

### 4. Security

- Secure notification credentials
- Use encrypted channels
- Implement rate limiting
- Monitor notification usage

## Troubleshooting

### Common Issues

1. **Delivery Failures**
   - Check credentials
   - Verify network access
   - Review rate limits
   - Check spam filters

2. **Format Issues**
   - Validate templates
   - Check payload format
   - Review channel requirements
   - Test notifications

3. **Configuration Problems**
   - Verify settings
   - Check permissions
   - Review logs
   - Test configurations

### Debugging

Enable notification debugging:

```bash
# Local
DEBUG_MODE=true bun run Kexa/index.ts

# Docker
docker run -e DEBUG_MODE=true -v $(pwd)/config:/app/config innovtech/kexa
```

## Support

For issues and questions:

- Open an issue in the [Kexa GitHub repository](https://github.com/kexa-io/Kexa)
- Check the [documentation](https://github.com/kexa-io/Kexa/tree/main/docs)
- Join the [discussions](https://github.com/kexa-io/Kexa/discussions)
