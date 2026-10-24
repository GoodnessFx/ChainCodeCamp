#!/bin/bash
set -e

echo "=== ChainCodeCamp Environment Check ==="
echo ""

# Check Node.js
NODE_VERSION=$(node -v)
echo "Node.js: $NODE_VERSION"
if [[ "$NODE_VERSION" < "20.0.0" ]]; then
    echo "  FAIL: Node.js 20+ required"
    FAIL=true
else
    echo "  PASS"
fi

# Check npm
NPM_VERSION=$(npm -v)
echo "npm: $NPM_VERSION"
if [[ "$NPM_VERSION" < "10.0.0" ]]; then
    echo "  FAIL: npm 10+ required"
    FAIL=true
else
    echo "  PASS"
fi

# Check Foundry
if command -v forge >/dev/null 2>&1; then
    forge --version
    echo "  PASS"
else
    echo "  FAIL: forge not found"
    FAIL=true
fi

# Check Foundry (forge install)
forge status >/dev/null 2>&1 && echo "  PASS: forge installed" || echo "  FAIL: forge not installed"
FAIL=true

# Check Python
if command -v python3 >/dev/null 2>&1; then
    python3 --version
    echo "  PASS"
else
    echo "  FAIL: python3 not found"
    FAIL=true
fi

# Check pip
if command -v pip >/dev/null 2>&1; then
    pip --version
    echo "  PASS"
else
    echo "  FAIL: pip not found"
    FAIL=true
fi

# Check Slither
if command -v slither >/dev/null 2>&1; then
    slither --version
    echo "  PASS"
else
    echo "  FAIL: slither not found"
    FAIL=true
fi

# Check xterm.js availability (client-side marker)
echo ""
echo "=== Environment Summary ==="
echo "Node: $NODE_VERSION"
echo "Node modules installed: $(ls node_modules/ 2>/dev/null | wc -l | tr -d ' ' ) packages"
echo "Docker: $(docker --version 2>/dev/null || echo 'not installed')"

exit $FAIL