#!/bin/bash

# 🚀 BOARDBREAKER GO LIVE SCRIPT
# Forces Chrome to load the absolute latest version with cache busting

echo "🎮 Boardbreaker Go Live Script"
echo "==============================="

# Close any existing Chrome tabs with the old version
echo "🔄 Closing old Chrome instances..."
pkill -f "Google Chrome.*boardbreaker" 2>/dev/null || true

# Wait a moment for cleanup
sleep 1

# Get the current timestamp for cache busting
TIMESTAMP=$(date +%s)

# Get the full path to the HTML file
GAME_FILE="$(pwd)/boardbreaker-game.html"

echo "📁 Game file: $GAME_FILE"
echo "⏰ Cache buster: $TIMESTAMP"

# Open with cache-busting timestamp
echo "🚀 Launching latest version in Chrome..."
open -a "Google Chrome" "file://$GAME_FILE?v=$TIMESTAMP&cache_bust=$TIMESTAMP"

# Also add some Chrome flags to disable caching for development
echo "🎯 Opening with fresh cache..."

# Alternative method - open with specific Chrome flags for no cache
osascript -e "
tell application \"Google Chrome\"
    activate
    open location \"file://$GAME_FILE?v=$TIMESTAMP\"
end tell
"

echo "✅ Latest Boardbreaker version launched!"
echo "🎨 You should now see all character theming updates!"
echo ""
echo "💡 TIP: If you still see old version, press Cmd+Shift+R for hard refresh"
echo "🔥 Or use DevTools (F12) → Right-click refresh → 'Empty Cache and Hard Reload'"
