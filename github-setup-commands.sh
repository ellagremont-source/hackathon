#!/bin/bash
# GitHub setup commands - run after Git installation completes

echo "🔧 Setting up Git configuration..."
git config --global user.name "Ella Gremont"
git config --global user.email "your-email@example.com"  # Replace with your email

echo "📝 Initializing repository..."
git init

echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/ellagremont-source/hackathon.git

echo "📦 Adding files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit: Working debugged game version

✅ Features included:
- Fixed loading screen flow (no longer redirects to title)
- Enhanced play button debugging
- Jelly-like tile effects with translucent numbers
- Comprehensive board generation (simplified)
- Character PNG display working
- Gameboard.png background integration
- Space Grotesk Bold font throughout
- Interactive START/FINISH tile popups
- All visual enhancements intact"

echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully saved to GitHub!"
echo "🔗 Repository: https://github.com/ellagremont-source/hackathon"



