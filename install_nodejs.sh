#!/bin/bash
# Install Node.js without admin access

echo "🚀 Node.js Installation (No Admin Required)"
echo "==========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is already installed
if command -v node >/dev/null 2>&1; then
    print_success "Node.js is already installed!"
    node --version
    npm --version 2>/dev/null || echo "npm not found"
    exit 0
fi

print_status "Node.js not found. Installing locally..."

# Create local directory
NODE_DIR="$HOME/.local/nodejs"
mkdir -p "$NODE_DIR"
cd "$NODE_DIR"

print_status "Downloading Node.js..."

# Detect architecture
ARCH=""
if [[ $(uname -m) == "arm64" ]]; then
    ARCH="arm64"
elif [[ $(uname -m) == "x86_64" ]]; then
    ARCH="x64"
else
    print_error "Unsupported architecture: $(uname -m)"
    exit 1
fi

# Download Node.js (latest LTS)
NODE_VERSION="v20.11.0"
NODE_FILE="node-${NODE_VERSION}-darwin-${ARCH}"
NODE_URL="https://nodejs.org/dist/${NODE_VERSION}/${NODE_FILE}.tar.gz"

print_status "Downloading ${NODE_FILE}..."
curl -L "$NODE_URL" -o "${NODE_FILE}.tar.gz"

if [[ $? -ne 0 ]]; then
    print_error "Failed to download Node.js"
    exit 1
fi

print_status "Extracting Node.js..."
tar -xzf "${NODE_FILE}.tar.gz"

if [[ $? -ne 0 ]]; then
    print_error "Failed to extract Node.js"
    exit 1
fi

# Move to final location
rm -rf node-current 2>/dev/null
mv "$NODE_FILE" node-current

print_status "Setting up PATH..."

# Add to shell profile
SHELL_RC=""
if [[ $SHELL == *"zsh"* ]]; then
    SHELL_RC="$HOME/.zshrc"
elif [[ $SHELL == *"bash"* ]]; then
    SHELL_RC="$HOME/.bashrc"
else
    SHELL_RC="$HOME/.profile"
fi

# Create PATH export
NODE_PATH="$NODE_DIR/node-current/bin"
export PATH="$NODE_PATH:$PATH"

# Add to shell configuration
if ! grep -q "nodejs" "$SHELL_RC" 2>/dev/null; then
    echo "" >> "$SHELL_RC"
    echo "# Node.js local installation" >> "$SHELL_RC"
    echo "export PATH=\"$NODE_PATH:\$PATH\"" >> "$SHELL_RC"
    print_success "Added Node.js to $SHELL_RC"
fi

# Clean up
rm "${NODE_FILE}.tar.gz"

# Test installation
print_status "Testing Node.js installation..."
if "$NODE_PATH/node" --version >/dev/null 2>&1; then
    NODE_VER=$("$NODE_PATH/node" --version)
    NPM_VER=$("$NODE_PATH/npm" --version)
    
    print_success "Node.js installed successfully!"
    print_success "Node.js version: $NODE_VER"
    print_success "npm version: $NPM_VER"
    
    echo ""
    echo "🎉 Installation Complete!"
    echo "========================"
    echo ""
    echo "To use Node.js in current session:"
    echo "  export PATH=\"$NODE_PATH:\$PATH\""
    echo ""
    echo "To use Node.js in new terminals:"
    echo "  source $SHELL_RC"
    echo "  # OR restart your terminal"
    echo ""
    echo "Test with:"
    echo "  node --version"
    echo "  npm --version"
    echo ""
    echo "Then run your hackathon project:"
    echo "  node setup.js"
    echo "  npm start"
    echo ""
    
else
    print_error "Node.js installation failed"
    exit 1
fi



