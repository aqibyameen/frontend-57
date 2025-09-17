# How to Add Design Assets to Your T-Shirt Designer

## 📁 Folder Structure

Create these folders in your `public` directory:

```
public/
├── assets/
│   ├── emojis/          # Emoji SVG files
│   ├── anime/           # Anime PNG/SVG files
│   ├── gaming/          # Gaming PNG/SVG files
│   ├── vectors/         # Vector shapes and graphics
│   └── text/            # Stylized text designs
```

## 🎨 Asset Categories & Examples

### 1. Emojis (SVG format recommended)
```
public/assets/emojis/
├── grinning-face.svg
├── cool-face.svg
├── fire.svg
├── hundred.svg
├── lightning.svg
├── skull.svg
├── game-controller.svg
└── rocket.svg
```

### 2. Anime (PNG with transparent backgrounds)
```
public/assets/anime/
├── kawaii-cat.png
├── ninja.png
├── anime-girl.png
├── dragon-ball.png
├── naruto-symbol.svg
├── jolly-roger.svg
├── attack-titan.png
└── pokeball.svg
```

### 3. Gaming (Mix of PNG/SVG)
```
public/assets/gaming/
├── ps-controller.svg
├── xbox-controller.svg
├── retro-gamepad.svg
├── pacman.svg
├── space-invader.svg
├── tetris-block.svg
├── mario-mushroom.png
└── creeper.png
```

### 4. Vectors (SVG format)
```
public/assets/vectors/
├── heart.svg
├── star.svg
├── arrow-up.svg
├── circle.svg
├── triangle.svg
├── lightning-bolt.svg
├── crown.svg
└── wings.svg
```

### 5. Text Designs (SVG format)
```
public/assets/text/
├── awesome.svg
├── gamer.svg
├── legend.svg
├── boss.svg
├── ninja.svg
└── hero.svg
```

## 🔧 How to Add Your Own Assets

### Method 1: Manual Upload
1. Create the folder structure above in your `public` directory
2. Add your image files to the appropriate folders
3. The assets will automatically appear in the designer

### Method 2: Using Free Resources

#### Emoji Assets:
- **Twemoji**: https://twemoji.twitter.com/ (Free SVG emojis)
- **OpenMoji**: https://openmoji.org/ (Open source emojis)
- **Noto Emoji**: https://fonts.google.com/noto/specimen/Noto+Emoji

#### Anime/Gaming Assets:
- **Flaticon**: https://www.flaticon.com/ (Free with attribution)
- **Icons8**: https://icons8.com/ (Free tier available)
- **Freepik**: https://www.freepik.com/ (Free with attribution)

#### Vector Graphics:
- **Heroicons**: https://heroicons.com/ (Free SVG icons)
- **Feather Icons**: https://feathericons.com/ (Free SVG icons)
- **Lucide**: https://lucide.dev/ (Free SVG icons)

### Method 3: Create Custom Assets

#### For SVG Text:
```svg
<!-- Example: awesome.svg -->
<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
  <text x="100" y="35" text-anchor="middle" 
        font-family="Arial Black" font-size="24" 
        fill="#ff6b35" stroke="#000" stroke-width="1">
    AWESOME
  </text>
</svg>
```

#### For Simple Shapes:
```svg
<!-- Example: heart.svg -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,90 C20,60 10,40 10,25 C10,15 20,5 30,5 C40,5 50,15 50,25 C50,15 60,5 70,5 C80,5 90,15 90,25 C90,40 80,60 50,90 Z" 
        fill="#ff4757"/>
</svg>
```

## 📝 Adding New Assets to the Code

To add more assets, edit `frontend-57/lib/design-assets.ts`:

```typescript
// Add to the appropriate array
export const emojiAssets: DesignAsset[] = [
  // ... existing assets
  { 
    id: 'emoji-9', 
    name: '🎯 Target', 
    category: 'emoji', 
    type: 'svg', 
    url: '/assets/emojis/target.svg', 
    tags: ['target', 'goal', 'aim'] 
  },
]
```

## 🎯 Best Practices

### File Formats:
- **SVG**: Best for logos, text, simple graphics (scalable)
- **PNG**: Best for detailed images with transparency
- **JPG**: Avoid (no transparency support)

### File Sizes:
- Keep files under 500KB for fast loading
- Optimize PNG files using tools like TinyPNG
- Minimize SVG files using SVGO

### Naming Convention:
- Use lowercase with hyphens: `mario-mushroom.png`
- Be descriptive: `retro-gaming-controller.svg`
- Avoid spaces and special characters

### Image Dimensions:
- **Recommended**: 512x512px for PNG files
- **Minimum**: 256x256px
- **Maximum**: 1024x1024px
- SVG files are resolution-independent

## 🚀 Quick Start Commands

```bash
# Create asset directories
mkdir -p public/assets/{emojis,anime,gaming,vectors,text}

# Download sample emoji (example)
curl -o public/assets/emojis/fire.svg "https://twemoji.maxcdn.com/v/latest/svg/1f525.svg"
```

## 🔄 Dynamic Asset Loading

The system automatically loads all assets defined in `design-assets.ts`. To add assets dynamically:

1. Upload files to the appropriate `public/assets/` folder
2. Add entries to the asset arrays in `design-assets.ts`
3. The assets will appear in the designer interface

## 📱 Testing Your Assets

1. Start your development server: `npm run dev`
2. Navigate to `/custom-tshirt`
3. Click on different category tabs to see your assets
4. Test adding assets to the t-shirt design
5. Verify drag, resize, and rotate functionality

Your custom t-shirt designer now supports a comprehensive asset management system with categories for emojis, anime, gaming, vectors, and text designs!