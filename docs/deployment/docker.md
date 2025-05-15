# Docker Deployment

This guide explains how to deploy and run Kexa using Docker containers.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for multi-container setups)
- Access to cloud provider accounts (AWS, Azure, GCP)

## Quick Start

### Using Docker Hub Image

```bash
# Pull the latest image
docker pull innovtech/kexa:latest

# Run the container
docker run -d \
  --name kexa \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  innovtech/kexa:latest
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  kexa:
    image: innovtech/kexa:latest
    container_name: kexa
    volumes:
      - ./rules:/app/rules
      - ./output:/app/output
      - ./.env:/app/.env
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Building from Source

### 1. Clone the Repository

```bash
git clone https://github.com/kexa-io/Kexa.git
cd Kexa
```

### 2. Build the Image

```bash
docker build -t kexa .
```

### 3. Run the Container

```bash
docker run -d \
  --name kexa \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  kexa
```

## Configuration

### Environment Variables

Create a `.env` file with your configuration:

```bash
# Rules directory
RULESDIRECTORY=/app/rules

# Output directory
OUTPUT=/app/output

# Provider authentication variables
# (Add your provider-specific variables)
```

### Volume Mounts

- `/app/rules`: Rules directory
- `/app/output`: Output directory
- `/.env`: Environment variables

## Running Modes

### Development Mode

```bash
docker run -d \
  --name kexa-dev \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  -e NODE_ENV=development \
  innovtech/kexa:latest
```

### Production Mode

```bash
docker run -d \
  --name kexa-prod \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  -e NODE_ENV=production \
  innovtech/kexa:latest
```

## Monitoring

### Logs

```bash
# View container logs
docker logs kexa

# Follow logs in real-time
docker logs -f kexa
```

### Container Status

```bash
# Check container status
docker ps -a | grep kexa

# View container details
docker inspect kexa
```

## Maintenance

### Updates

```bash
# Pull latest image
docker pull innovtech/kexa:latest

# Stop and remove old container
docker stop kexa
docker rm kexa

# Run new container
docker run -d \
  --name kexa \
  -v $(pwd)/rules:/app/rules \
  -v $(pwd)/output:/app/output \
  -v $(pwd)/.env:/app/.env \
  innovtech/kexa:latest
```

### Backup

```bash
# Backup rules
docker cp kexa:/app/rules ./rules-backup

# Backup output
docker cp kexa:/app/output ./output-backup
```

## Security Considerations

1. **Container Security**
   - Run container as non-root user
   - Use read-only volumes where possible
   - Implement resource limits

2. **Network Security**
   - Use Docker network isolation
   - Implement proper firewall rules
   - Monitor container network access

3. **Secret Management**
   - Use Docker secrets for sensitive data
   - Implement proper credential rotation
   - Secure environment variables

## Troubleshooting

### Common Issues

1. **Container Won't Start**
   - Check container logs
   - Verify volume permissions
   - Ensure environment variables are set

2. **Permission Issues**
   - Check volume ownership
   - Verify file permissions
   - Ensure proper user mapping

3. **Network Issues**
   - Check network connectivity
   - Verify DNS settings
   - Ensure proper port mapping

## Next Steps

- [Kubernetes Deployment](./kubernetes.md)
- [Azure Functions Deployment](./azure-function.md)
- [Local Deployment](./local.md)
