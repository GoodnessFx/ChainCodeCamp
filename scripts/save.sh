#!/usr/bin/env bash
# ChainCodeCamp save script.
# Usage (from repo root):
#   "C:\Program Files\Git\bin\bash.exe" scripts/save.sh "message"
#   ./scripts/save.sh "message"        (Git Bash / WSL / Mac / Linux)
# Only run this when the app builds: cd app && npm run build

set -euo pipefail

cd "$(dirname "$0")/.."

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "Usage: scripts/save.sh \"commit message\"" >&2
  exit 1
fi

git add -A
git commit -m "$MSG"
git push origin main
git rev-parse --short HEAD
