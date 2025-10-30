# Installation Guide

For local installation instructions (binary or from source), please see the [main README](../../README.md#running-locally).

## Deployment Methods

For production deployments and other installation methods, refer to [Deployment Documentation](../deployment/README.md):

- Docker / Docker Compose
- Kubernetes
- GitHub Actions
- Azure Functions

### 1. Basic Configuration

To kno more about Kexa configuration, refer to [Configurations Documentations](../configuration/README.md)

### 2. Environment Variables

To know more about environment variables, refer to [Environment Variables](../configuration/environment-variables.md)


## Post-Installation

1. Review default settings
2. Add credentials
3. Configure rules & notifications
4. Adjust scan parameters

### Debug Mode
The level are from 0 to 9 ( verbose )

```bash
# Choose debug level
DEBUG_MODE=9 # info warn error fatal
```

## Next Steps

After successful installation:

1. Review [Quick Start Guide](quick-start.md)
2. Check [Configuration Guide](../configuration/README.md)
3. Explore [Usage Guide](../usage/README.md)
4. Read [Best Practices](../usage/README.md#best-practices)
