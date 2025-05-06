# Local Deployment

This guide explains how to deploy and run Kexa locally on your machine.

## Prerequisites

- BunJS
- Git
- Access to cloud provider accounts (AWS, Azure, GCP)

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kexa-io/Kexa.git
   cd Kexa
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Environment Setup**
   - - Create a `.env` file and add your necessary environment variables:

     ```bash
     # Rules directory
     RULESDIRECTORY=./rules
     
     # Output directory
     OUTPUT=./output
     
     # Provider authentication variables
     # (Add your provider-specific variables)
     ```

4. **Configure Rules**
   - Create or copy rules to your rules directory
   - Ensure rules are properly formatted in YAML
   - Test rules with `bun run validate-rules`

## Running Kexa

### Development Mode

```bash
bun run dev
```

### Production Mode

```bash
bun run build
bun run start
```

### Scheduled Runs

You can set up scheduled runs using cron jobs:

```bash
# Example cron job to run Kexa daily at midnight
0 0 * * * cd /path/to/Kexa && bun run start
```

## Monitoring

### Logs

- Check console output for real-time logs
- Logs are also saved to `./logs` directory
- Configure log level in `.env`:

  ```bash
  LOG_LEVEL=info  # debug, info, warn, error
  ```

### Output

- Scan results are saved to the configured output directory
- Reports are generated in various formats (JSON, HTML, PDF)
- Check `./output` directory for results

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify provider credentials
   - Check environment variables
   - Ensure proper permissions

2. **Rule Validation Errors**
   - Check rule syntax
   - Verify rule file format
   - Test rules individually

3. **Performance Issues**
   - Monitor system resources
   - Check network connectivity
   - Review scan configuration

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG_MODE=true
```

## Security Considerations

1. **Credentials**
   - Never commit `.env` files
   - Use secure credential storage
   - Rotate credentials regularly

2. **File Permissions**
   - Restrict access to sensitive files
   - Use appropriate file permissions
   - Secure output directory

3. **Network Security**
   - Use secure connections
   - Implement proper firewall rules
   - Monitor network access

## Maintenance

### Updates

```bash
# Pull latest changes
git pull origin main

# Update dependencies
bun install

# Rebuild if necessary
bun run build
```

### Backup

- Regularly backup configuration files
- Export important rules
- Archive scan results

## Next Steps

- [Docker Deployment](./docker.md)
- [Kubernetes Deployment](./kubernetes.md)
- [Azure Functions Deployment](./azure-function.md)
