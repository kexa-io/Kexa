# Multiple Environments Configuration

This guide explains how to configure and manage Kexa across different environments (development, staging, production).

## Environment Structure

### 1. Directory Structure

```bash
config/
├── environments/
│   ├── development/
│   │   ├── config.json
│   │   └── rules/
│   ├── staging/
│   │   ├── config.json
│   │   └── rules/
│   └── production/
│       ├── config.json
│       └── rules/
└── shared/
    ├── common-rules/
    └── templates/
```

### 2. Environment Configuration

#### Development Environment

```json
{
  "environment": "development",
  "providers": {
    "azure": {
      "subscription_id": "dev-subscription-id",
      "resource_groups": ["dev-rg-*"]
    }
  },
  "scan": {
    "timeout": 1800,
    "concurrent_scans": 3
  },
  "notifications": {
    "email": {
      "recipients": ["dev-team@example.com"]
    }
  }
}
```

#### Staging Environment

```json
{
  "environment": "staging",
  "providers": {
    "azure": {
      "subscription_id": "staging-subscription-id",
      "resource_groups": ["staging-rg-*"]
    }
  },
  "scan": {
    "timeout": 3600,
    "concurrent_scans": 5
  },
  "notifications": {
    "email": {
      "recipients": ["qa-team@example.com"]
    }
  }
}
```

#### Production Environment

```json
{
  "environment": "production",
  "providers": {
    "azure": {
      "subscription_id": "prod-subscription-id",
      "resource_groups": ["prod-rg-*"]
    }
  },
  "scan": {
    "timeout": 7200,
    "concurrent_scans": 10
  },
  "notifications": {
    "email": {
      "recipients": ["ops-team@example.com"]
    }
  }
}
```

## Environment Management

### 1. Environment Variables

```bash
# Development
export KEXA_ENV=development
export KEXA_CONFIG_PATH=./config/environments/development

# Staging
export KEXA_ENV=staging
export KEXA_CONFIG_PATH=./config/environments/staging

# Production
export KEXA_ENV=production
export KEXA_CONFIG_PATH=./config/environments/production
```

### 2. Running Scans

```bash
# Development scan
kexa scan --env development

# Staging scan
kexa scan --env staging

# Production scan
kexa scan --env production
```

### 3. Environment-Specific Rules

```json
{
  "rules": {
    "development": {
      "severity": ["warning", "info"],
      "categories": ["security", "cost"]
    },
    "staging": {
      "severity": ["critical", "warning"],
      "categories": ["security", "cost", "compliance"]
    },
    "production": {
      "severity": ["critical"],
      "categories": ["security", "compliance"]
    }
  }
}
```

## Shared Resources

### 1. Common Rules

```json
{
  "rules": {
    "shared": {
      "security": {
        "enabled": true,
        "severity": "critical"
      },
      "cost": {
        "enabled": true,
        "severity": "warning"
      }
    }
  }
}
```

### 2. Templates

```json
{
  "templates": {
    "shared": {
      "email": {
        "subject": "Kexa Alert: {{environment}} - {{severity}}",
        "body": "Environment: {{environment}}\nSeverity: {{severity}}\nDetails: {{details}}"
      }
    }
  }
}
```

## Environment-Specific Features

### 1. Development Features

```json
{
  "development": {
    "debug": true,
    "verbose": true,
    "dry_run": true,
    "test_mode": true
  }
}
```

### 2. Staging Features

```json
{
  "staging": {
    "debug": false,
    "verbose": true,
    "dry_run": false,
    "test_mode": false
  }
}
```

### 3. Production Features

```json
{
  "production": {
    "debug": false,
    "verbose": false,
    "dry_run": false,
    "test_mode": false
  }
}
```

## Best Practices

### 1. Configuration Management

- Use version control for configurations
- Implement configuration validation
- Use environment-specific secrets
- Maintain configuration documentation

### 2. Security

- Separate credentials per environment
- Use appropriate access levels
- Implement audit logging
- Regular security reviews

### 3. Monitoring

- Environment-specific alerts
- Performance monitoring
- Resource usage tracking
- Error rate monitoring

## Troubleshooting

### 1. Common Issues

1. **Configuration Conflicts**
   - Check environment variables
   - Verify file paths
   - Review configuration hierarchy

2. **Permission Issues**
   - Verify environment access
   - Check credential validity
   - Review role assignments

3. **Resource Access**
   - Validate resource groups
   - Check network access
   - Verify service endpoints

### 2. Debugging

```bash
# Enable environment debugging
DEBUG_MODE=true kexa scan --env development

# Show configuration
kexa config show --env staging

# Validate configuration
kexa config validate --env production
```

## Next Steps

1. Review [Advanced Configuration](advanced-configuration.md)
2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
