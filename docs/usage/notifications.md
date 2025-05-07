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

### Basic Configuration

```json
{
  "notifications": {
    "enabled": true,
    "channels": ["email", "teams", "webhook"],
    "severity": ["critical", "warning"],
    "schedule": "immediate"
  }
}
```

## Notification Channels

### 1. Email Notifications

#### Email Configuration

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "smtp": {
        "host": "smtp.example.com",
        "port": 587,
        "secure": true,
        "auth": {
          "user": "notifications@example.com",
          "pass": "your-password"
        }
      },
      "from": "Kexa Alerts <alerts@example.com>",
      "recipients": ["admin@example.com", "team@example.com"],
      "template": "default",
      "severity": ["critical", "warning"]
    }
  }
}
```

#### Templates

```json
{
  "templates": {
    "default": {
      "subject": "Kexa Alert: {{severity}} - {{rule}}",
      "body": "Issue detected in {{resource}}\nSeverity: {{severity}}\nDetails: {{details}}\nRecommendation: {{recommendation}}"
    }
  }
}
```

### 2. Microsoft Teams

#### Microsoft Teams Configuration

```json
{
  "notifications": {
    "teams": {
      "enabled": true,
      "webhook_url": "https://webhook.office.com/...",
      "channel": "alerts",
      "severity": ["critical"],
      "template": "default"
    }
  }
}
```

#### Message Format

```json
{
  "type": "message",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            "text": "Kexa Alert",
            "weight": "bolder",
            "size": "large"
          },
          {
            "type": "TextBlock",
            "text": "{{details}}",
            "wrap": true
          }
        ]
      }
    }
  ]
}
```

### 3. Webhook Notifications

#### Webhook Configuration

```json
{
  "notifications": {
    "webhook": {
      "enabled": true,
      "url": "https://api.example.com/webhook",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer token",
        "Content-Type": "application/json"
      },
      "template": "default"
    }
  }
}
```

#### Payload Format

```json
{
  "scan_id": "{{scan_id}}",
  "timestamp": "{{timestamp}}",
  "severity": "{{severity}}",
  "rule": "{{rule}}",
  "resource": "{{resource}}",
  "details": "{{details}}",
  "recommendation": "{{recommendation}}"
}
```

### 4. SMS Notifications

#### SMS Configuration

```json
{
  "notifications": {
    "sms": {
      "enabled": true,
      "provider": "twilio",
      "account_sid": "your-account-sid",
      "auth_token": "your-auth-token",
      "from": "+1234567890",
      "recipients": ["+0987654321"],
      "severity": ["critical"]
    }
  }
}
```

## Notification Rules

### 1. Severity Levels

```json
{
  "severity_rules": {
    "critical": {
      "channels": ["email", "teams", "sms"],
      "schedule": "immediate",
      "retry": {
        "attempts": 3,
        "interval": "5m"
      }
    },
    "warning": {
      "channels": ["email", "teams"],
      "schedule": "daily",
      "retry": {
        "attempts": 2,
        "interval": "15m"
      }
    }
  }
}
```

### 2. Scheduling

```json
{
  "notification_schedule": {
    "immediate": {
      "delay": "0s",
      "channels": ["sms", "teams"]
    },
    "daily": {
      "delay": "24h",
      "channels": ["email"],
      "time": "09:00"
    },
    "weekly": {
      "delay": "168h",
      "channels": ["email"],
      "day": "monday",
      "time": "10:00"
    }
  }
}
```

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
