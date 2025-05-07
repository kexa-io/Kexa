# Advanced Configuration

This guide covers advanced configuration options and features in Kexa.

## Advanced Scan Configuration

### 1. Custom Scan Patterns

```json
{
  "scan": {
    "patterns": {
      "include": [
        "resource-*",
        "prod-*",
        "critical-*"
      ],
      "exclude": [
        "test-*",
        "temp-*",
        "backup-*"
      ],
      "tags": {
        "required": ["environment", "owner"],
        "optional": ["cost-center", "project"]
      }
    }
  }
}
```

### 2. Resource Filtering

```json
{
  "scan": {
    "filters": {
      "resource_types": ["vm", "storage", "network"],
      "regions": ["eastus", "westus"],
      "subscriptions": ["sub-1", "sub-2"],
      "resource_groups": ["rg-1", "rg-2"]
    }
  }
}
```

### 3. Performance Tuning

```json
{
  "scan": {
    "performance": {
      "max_concurrent_scans": 10,
      "batch_size": 100,
      "timeout": 3600,
      "retry_attempts": 3,
      "retry_delay": 30,
      "throttle": {
        "requests_per_second": 10,
        "burst_size": 20
      }
    }
  }
}
```

## Advanced Rule Configuration

### 1. Custom Rule Definitions

```json
{
  "rules": {
    "custom": {
      "security": {
        "name": "custom-security-rule",
        "description": "Custom security check",
        "severity": "critical",
        "category": "security",
        "condition": {
          "resource_type": "vm",
          "property": "security_group",
          "operator": "not_contains",
          "value": "required-rule"
        },
        "action": {
          "type": "alert",
          "message": "Security group missing required rule"
        }
      }
    }
  }
}
```

### 2. Rule Dependencies

```json
{
  "rules": {
    "dependencies": {
      "rule1": {
        "depends_on": ["rule2", "rule3"],
        "execution_order": "sequential"
      },
      "rule2": {
        "depends_on": [],
        "execution_order": "parallel"
      }
    }
  }
}
```

### 3. Rule Templates

```json
{
  "rules": {
    "templates": {
      "security_check": {
        "base": {
          "severity": "critical",
          "category": "security",
          "action": {
            "type": "alert"
          }
        },
        "variants": {
          "vm_security": {
            "resource_type": "vm",
            "condition": {
              "property": "security_group"
            }
          },
          "storage_security": {
            "resource_type": "storage",
            "condition": {
              "property": "access_policy"
            }
          }
        }
      }
    }
  }
}
```

## Advanced Notification Configuration

### 1. Custom Notification Templates

```json
{
  "notifications": {
    "templates": {
      "custom": {
        "email": {
          "subject": "{{environment}} - {{severity}} Alert: {{rule_name}}",
          "body": "Resource: {{resource_name}}\nIssue: {{issue_description}}\nRecommendation: {{recommendation}}",
          "format": "html",
          "attachments": ["report.pdf", "details.json"]
        },
        "teams": {
          "card": {
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "TextBlock",
                "text": "{{rule_name}}",
                "weight": "bolder"
              }
            ]
          }
        }
      }
    }
  }
}
```

### 2. Notification Routing

```json
{
  "notifications": {
    "routing": {
      "rules": [
        {
          "condition": {
            "severity": "critical",
            "category": "security"
          },
          "channels": ["email", "teams", "sms"],
          "recipients": ["security-team@example.com"]
        },
        {
          "condition": {
            "severity": "warning",
            "category": "cost"
          },
          "channels": ["email"],
          "recipients": ["finance-team@example.com"]
        }
      ]
    }
  }
}
```

### 3. Notification Aggregation

```json
{
  "notifications": {
    "aggregation": {
      "enabled": true,
      "window": "1h",
      "max_alerts": 10,
      "group_by": ["severity", "category"],
      "format": "summary",
      "delivery": {
        "schedule": "0 * * * *",
        "channels": ["email", "teams"]
      }
    }
  }
}
```

## Advanced Export Configuration

### 1. Custom Export Formats

```json
{
  "export": {
    "formats": {
      "custom": {
        "template": "templates/custom-export.html",
        "variables": {
          "title": "Custom Report",
          "include_metadata": true,
          "include_summary": true
        },
        "filters": {
          "severity": ["critical", "warning"],
          "time_range": "7d"
        }
      }
    }
  }
}
```

### 2. Export Scheduling

```json
{
  "export": {
    "schedule": {
      "daily": {
        "time": "00:00",
        "format": "json",
        "destination": "s3://reports/daily"
      },
      "weekly": {
        "day": "monday",
        "time": "00:00",
        "format": "html",
        "destination": "s3://reports/weekly"
      }
    }
  }
}
```

### 3. Export Integration

```json
{
  "export": {
    "integrations": {
      "jira": {
        "enabled": true,
        "url": "https://jira.example.com",
        "project": "KEXA",
        "issue_type": "Bug",
        "mapping": {
          "severity": "priority",
          "category": "component"
        }
      },
      "slack": {
        "enabled": true,
        "webhook": "https://hooks.slack.com/...",
        "channel": "#alerts",
        "format": "compact"
      }
    }
  }
}
```

## Advanced Security Configuration

### 1. Authentication

```json
{
  "security": {
    "authentication": {
      "type": "oauth2",
      "provider": "azure",
      "scopes": ["read", "write"],
      "token_cache": {
        "enabled": true,
        "ttl": 3600
      }
    }
  }
}
```

### 2. Authorization

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
      },
      "policies": {
        "resource_access": {
          "allowed_types": ["vm", "storage"],
          "allowed_actions": ["read"]
        }
      }
    }
  }
}
```

### 3. Encryption

```json
{
  "security": {
    "encryption": {
      "at_rest": {
        "algorithm": "AES-256",
        "key_rotation": 30
      },
      "in_transit": {
        "tls_version": "1.2",
        "ciphers": ["TLS_AES_128_GCM_SHA256"]
      }
    }
  }
}
```

## Best Practices

### 1. Configuration Management

- Use version control
- Implement validation
- Document changes
- Regular reviews

### 2. Performance Optimization

- Monitor resource usage
- Adjust concurrency
- Optimize timeouts
- Cache results

### 3. Security

- Regular audits
- Access reviews
- Credential rotation
- Log monitoring

## Troubleshooting

### 1. Common Issues

1. **Configuration Errors**
   - Validate JSON syntax
   - Check file permissions
   - Verify paths

2. **Performance Issues**
   - Monitor resources
   - Check timeouts
   - Review logs

3. **Security Issues**
   - Verify credentials
   - Check permissions
   - Review access logs

### 2. Debugging

```bash
# Enable advanced debugging
DEBUG=advanced kexa scan

# Show configuration
kexa config show --verbose

# Validate configuration
kexa config validate --strict
```

## Next Steps

1. Review [Multiple Environments](multiple-environments.md)
2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
