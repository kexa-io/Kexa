# Prerequisites

This guide outlines the requirements and prerequisites needed to use Kexa effectively.

## System Requirements

### Operating Systems

- Linux (Ubuntu 20.04+, CentOS 8+, RHEL 8+)
- macOS (10.15+)
- Windows 10/11 (with PowerShell for script execution)

### Hardware Requirements

- CPU: 2+ cores
- RAM: 4GB minimum (8GB recommended)
- Storage: 1GB free space
- Network: Stable internet connection

## Software Requirements

### Runtime Environment

- Node.js 18.x or later
- Docker 20.10+ (optional, for containerized deployment)
- Kubernetes 1.20+ (optional, for Kubernetes deployment)

### Package Manager

- Bun 1.2.0 or later (Kexa is built with Bun)

## Storage Requirements

### Local Storage

- 1GB minimum free space
- Write permissions for:
  - Configuration files (`./config/`)
  - Rules files (`./Kexa/rules/` or custom path)
  - Output files (`./output/` or custom path)
  - Log files

## Development Environment

To know more about deployments methods, refer to [Deployments Documentations](../deployment/README.md)

## System Check

```bash
# Check Node.js version
node --version

# Check Bun version
bun --version

# Check Git version
git --version

# Check Docker version (if using containers)
docker --version
```

## Next Steps

After verifying all prerequisites:

1. Proceed to [Installation Guide](installation.md)
2. Review [Quick Start Guide](quick-start.md)
3. Configure with [Configuration Guide](../configuration/README.md)