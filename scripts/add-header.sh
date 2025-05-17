#!/bin/bash

# Adds a comment header to a .sh file
# Usage: ./scripts/add-header.sh my-script.sh "My Description"

FILE=$1
DESC=${2:-"No description provided."}

if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

HEADER="#!/bin/bash
# ===================================
# Script: $(basename "$FILE")
# Purpose: $DESC
# Usage:
#   chmod +x $(basename "$FILE")
#   ./$(basename "$FILE") [options]
# ==================================="

TMP_FILE=$(mktemp)
echo "$HEADER" > "$TMP_FILE"
cat "$FILE" >> "$TMP_FILE"
mv "$TMP_FILE" "$FILE"

echo "✅ Header added to $FILE"
