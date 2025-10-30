#!/usr/bin/env bash

set -euo pipefail

REPO_URL="https://github.com/kexa-io/kexa"
BIN_DIR="${HOME}/.local/bin"

echo "=================================="
echo "   Kexa Installer"
echo "=================================="
echo ""

detect_os() {
    OS="$(uname -s)"
    ARCH="$(uname -m)"

    case "${OS}" in
        Linux*)     OS_TYPE="linux";;
        Darwin*)    OS_TYPE="macos";;
        *)          echo "Unsupported OS: ${OS}"; exit 1;;
    esac

    case "${ARCH}" in
        x86_64|amd64)   ARCH_TYPE="x64";;
        arm64|aarch64)  ARCH_TYPE="arm64";;
        *)              echo "Unsupported architecture: ${ARCH}"; exit 1;;
    esac

    echo "Detected OS: ${OS_TYPE}"
    echo "Detected Architecture: ${ARCH_TYPE}"
    echo ""
}

detect_os

BINARY_NAME="kexa-${OS_TYPE}-${ARCH_TYPE}"
DOWNLOAD_URL="${REPO_URL}/releases/latest/download/${BINARY_NAME}"

echo "Downloading Kexa..."
echo "URL: ${DOWNLOAD_URL}"
echo ""

mkdir -p "${BIN_DIR}"

if command -v curl &> /dev/null; then
    curl -fsSL "${DOWNLOAD_URL}" -o "${BIN_DIR}/kexa"
elif command -v wget &> /dev/null; then
    wget -q "${DOWNLOAD_URL}" -O "${BIN_DIR}/kexa"
else
    echo "Error: curl or wget is required"
    exit 1
fi

chmod +x "${BIN_DIR}/kexa"

echo "=================================="
echo "Installation complete!"
echo "=================================="
echo ""
echo "Kexa installed to: ${BIN_DIR}/kexa"
echo ""
echo "Make sure ${BIN_DIR} is in your PATH"
echo "Add this to your shell profile:"
echo "  export PATH=\"\${HOME}/.local/bin:\${PATH}\""
echo ""
echo "Run 'kexa' to get started"
echo ""
