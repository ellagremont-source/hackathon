#!/bin/bash

# 🚀 DOUBLE-CLICK TO LAUNCH LATEST BOARDBREAKER
# This file can be double-clicked from Finder to launch the latest version

cd "$(dirname "$0")"

echo "🎮 LAUNCHING BOARDBREAKER LATEST VERSION"
echo "========================================"

# Close any old versions
pkill -f "Google Chrome.*boardbreaker" 2>/dev/null || true

# Clear Chrome cache for this file specifically
rm -rf ~/Library/Caches/Google/Chrome/Default/Cache/* 2>/dev/null || true

# Launch with timestamp to force fresh load
TIMESTAMP=$(date +%s)
GAME_FILE="$(pwd)/boardbreaker-game.html"

echo "🚀 Opening fresh version: file://$GAME_FILE?v=$TIMESTAMP"

open -a "Google Chrome" "file://$GAME_FILE?v=$TIMESTAMP"

echo "✅ Latest Boardbreaker launched with character theming!"
echo "🎨 If you don't see updates, press Cmd+Shift+R to hard refresh"

# Keep terminal open to see messages
echo ""
echo "Press any key to close..."
read -n 1 -s
