# 🎮 **THE PERFECT BOARDBREAKER GAME PROMPT**

**You are an expert game developer tasked with creating "Boardbreaker" - a sophisticated board game with complex mechanics. Build this as a complete, bug-free, extensible web-based game.**

## 🎯 **CORE GAME CONCEPT**

**Boardbreaker** is a strategic board game where players navigate a 7×7 snaking board (49 squares) from start to finish while avoiding persona-specific death conditions. The game features:

- **Dynamic board generation** based on 8 persona combinations
- **Complex square behaviors** with animations and mini-games  
- **Persistent debuff/buff system**
- **Real-time scoring** and leaderboard tracking
- **Extensible architecture** for future features

## 🏗️ **TECHNICAL ARCHITECTURE REQUIREMENTS**

### **1. MODULAR GAME ENGINE**
Create a clean, object-oriented architecture with these core modules:

```javascript
GameEngine {
  - BoardGenerator
  - PersonaSystem  
  - SquareSystem
  - AnimationEngine
  - ScoreSystem
  - SaveSystem
}
```

### **2. STATE MANAGEMENT**
Implement robust state management:
- Game state (current position, turn count, active debuffs)
- Board state (square types, ladder/chute positions)  
- Player state (persona traits, death counters, score)
- UI state (animations, menus, overlays)

### **3. ERROR HANDLING & VALIDATION**
- Input validation for all user actions
- Board generation sanity checks
- Graceful fallbacks for edge cases
- Console logging for debugging

## 🎲 **GAME MECHANICS TO IMPLEMENT**

### **Phase 1: Core Foundation**
1. **Board System**
   - 7×7 snaking grid (1→49)
   - Dynamic square type assignment
   - Ladder/chute placement with visual overlays
   - Board generation validation

2. **Persona System** 
   - 8 persona combinations (Tactician/Daredevil + Lucky/Persistent + Sprinter/Jumper)
   - Trait-based board biasing
   - Death condition tracking
   - Persona-specific square effects

3. **Movement System**
   - Dice rolling with animation
   - Player piece movement
   - Square resolution logic
   - Turn management

### **Phase 2: Advanced Mechanics**
4. **Square Types Implementation**
   - **Safe Squares:** Rest, View Ahead, Freebie
   - **Animation Squares:** Pick Card, Spin Token, Mystery Bag
   - **Movement Modifiers:** Forward/backward, leap, fall
   - **Targeted Movement:** Nearest trap/bonus/penalty
   - **Battle Squares:** Tap Race, Quick Aim, Memory Match, Dodge Drop
   - **Random Events:** Storm Shift, Trade Places, Double Roll

5. **Debuff/Buff System**
   - Lingering penalties (Slow Roll, Slippery Grip, etc.)
   - Automatic remover placement
   - Stacking rules and priority

### **Phase 3: Polish & Features**  
6. **Animation Engine**
   - Smooth piece movement
   - Square activation effects
   - Mini-game animations
   - UI transitions

7. **Scoring & Persistence**
   - Time-based scoring
   - Strength score algorithm
   - Local storage leaderboard
   - Personal best tracking

## 🎨 **UI/UX REQUIREMENTS**

### **Visual Design**
- **Modern, clean interface** with intuitive controls
- **Responsive design** for desktop and mobile
- **Clear visual hierarchy** with proper spacing
- **Accessibility considerations** (contrast, font sizes)

### **Game Flow**
1. **Opening Screen:** Logo animation, leaderboard
2. **Customization:** Skin selection, persona trait picker
3. **Game Board:** Interactive 7×7 grid with clear numbering
4. **Mini-games:** Full-screen overlays with instructions
5. **End Game:** Performance recap, leaderboard update

### **Visual Elements**
- **Board squares:** Color-coded with clear icons
- **Ladders:** Sparkled rails (vertical/diagonal)
- **Chutes:** Translucent curves with raindrop animation
- **Player piece:** Customizable skin with smooth animations
- **Dice:** 3D rolling animation
- **Debuff indicators:** Clear visual feedback

## 🛠️ **IMPLEMENTATION STRATEGY**

### **Start with This Architecture:**

```javascript
// Core game engine
class BoardbreakerGame {
  constructor() {
    this.board = new Board();
    this.player = new Player();
    this.gameState = new GameState();
    this.ui = new UIManager();
    this.animator = new AnimationEngine();
  }
}

// Board generation with persona biasing
class BoardGenerator {
  generateBoard(persona) {
    // Implement 8 persona-specific board families
    // Apply placement rules and sanity checks
    // Return validated board configuration
  }
}

// Extensible square system
class SquareSystem {
  registerSquareType(type, behavior) {
    // Allow easy addition of new square types
  }
  
  resolveSquare(squareType, player, gameState) {
    // Handle all square interactions
  }
}
```

### **Development Phases:**

**Phase 1 (Foundation):** Basic board, movement, personas
**Phase 2 (Mechanics):** All square types, debuffs, mini-games  
**Phase 3 (Polish):** Animations, scoring, persistence

## 🚀 **TECHNICAL SPECIFICATIONS**

### **Performance Requirements**
- **Smooth 60fps** animations
- **Instant** dice rolls and square resolution
- **Sub-100ms** board generation
- **Responsive** UI interactions

### **Code Quality Standards**
- **Clean, readable code** with proper commenting
- **Modular design** for easy extension
- **Consistent naming** conventions
- **Error handling** for all edge cases

### **Browser Compatibility**
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile responsive** design
- **Touch and click** interaction support

## 🎯 **SUCCESS CRITERIA**

### **Minimum Viable Product:**
✅ Complete 7×7 board with snaking path
✅ All 8 persona combinations working
✅ Basic square types implemented
✅ Dice rolling and movement
✅ Win/loss condition detection
✅ Score calculation and display

### **Full Feature Set:**
✅ All square types with animations
✅ Complete mini-game suite
✅ Debuff/buff system
✅ Leaderboard persistence
✅ Smooth animations throughout
✅ Mobile-responsive design

## 🏆 **EXTENSIBILITY GOALS**

Design the architecture to easily support:
- **New persona traits** and combinations
- **Additional square types** and behaviors
- **More mini-games** and challenges
- **Multiplayer functionality** (future)
- **Different board sizes** (future)
- **Custom game modes** (future)

## 📝 **CODING APPROACH**

1. **Start with the game engine structure**
2. **Implement board generation first** (most complex)
3. **Add basic movement and dice rolling**  
4. **Gradually add square types** (safe → animation → complex)
5. **Integrate persona system** throughout
6. **Add animations and polish** last
7. **Test extensively** with all persona combinations

## 🎨 **FINAL DELIVERABLE**

Create a **complete, playable game** that:
- **Works flawlessly** with all features implemented
- **Looks professional** with smooth animations
- **Handles edge cases** gracefully
- **Can be extended** easily for future features
- **Runs in any modern browser** without issues

**Build this as a single HTML file** (like the hackathon-app.html structure) with embedded CSS and JavaScript for easy deployment and sharing.

---

**🚀 START CODING! Create the ultimate Boardbreaker experience that players will love and developers can easily extend!**



