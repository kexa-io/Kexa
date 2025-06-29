# Multiple Environments Configuration

This guide explains how to configure and manage Kexa across different environments (development, staging, production).

## Environment Structure

### 1. Directory Structure

```bash
config/
├── env/
│   ├── development.json
│   ├── staging.json
│   └── production.json
```

## Environment Management

### 1. Environment Variables

```bash
# Development
export NODE_CONFIG_TS_ENV=development

# Staging
export NODE_CONFIG_TS_ENV=staging

# Production
export NODE_CONFIG_TS_ENV=production
```

### 2. Running Scans

```bash
bun run Kexa/main.ts
```

### 3. Debugging
The level are from 0 to 9 ( verbose )

```bash
DEBUG_MODE=9
```

## Next Steps

2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
