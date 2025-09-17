// Design asset categories and management
export interface DesignAsset {
  id: string
  name: string
  category: 'emoji' | 'anime' | 'gaming' | 'vector' | 'text' | 'shapes'
  type: 'svg' | 'png' | 'jpg'
  url: string
  tags: string[]
  premium?: boolean
}

// Emoji collection (using Unicode emojis converted to images)
export const emojiAssets: DesignAsset[] = [
  { id: 'emoji-1', name: '😀 Grinning Face', category: 'emoji', type: 'svg', url: '/assets/emojis/grinning-face.svg', tags: ['happy', 'smile'] },
  { id: 'emoji-2', name: '😎 Cool Face', category: 'emoji', type: 'svg', url: '/assets/emojis/cool-face.svg', tags: ['cool', 'sunglasses'] },
  { id: 'emoji-3', name: '🔥 Fire', category: 'emoji', type: 'svg', url: '/assets/emojis/fire.svg', tags: ['fire', 'hot'] },
  { id: 'emoji-4', name: '💯 Hundred Points', category: 'emoji', type: 'svg', url: '/assets/emojis/hundred.svg', tags: ['perfect', '100'] },
  { id: 'emoji-5', name: '⚡ Lightning', category: 'emoji', type: 'svg', url: '/assets/emojis/lightning.svg', tags: ['fast', 'power'] },
  { id: 'emoji-6', name: '💀 Skull', category: 'emoji', type: 'svg', url: '/assets/emojis/skull.svg', tags: ['skull', 'death'] },
  { id: 'emoji-7', name: '🎮 Game Controller', category: 'emoji', type: 'svg', url: '/assets/emojis/game-controller.svg', tags: ['gaming', 'controller'] },
  { id: 'emoji-8', name: '🚀 Rocket', category: 'emoji', type: 'svg', url: '/assets/emojis/rocket.svg', tags: ['space', 'fast'] },
]

// Anime collection
export const animeAssets: DesignAsset[] = [
  { id: 'anime-1', name: 'Kawaii Cat', category: 'anime', type: 'png', url: '/assets/anime/kawaii-cat.png', tags: ['cat', 'cute', 'kawaii'] },
  { id: 'anime-2', name: 'Ninja Character', category: 'anime', type: 'png', url: '/assets/anime/ninja.png', tags: ['ninja', 'warrior'] },
  { id: 'anime-3', name: 'Anime Girl', category: 'anime', type: 'png', url: '/assets/anime/anime-girl.png', tags: ['girl', 'character'] },
  { id: 'anime-4', name: 'Dragon Ball', category: 'anime', type: 'png', url: '/assets/anime/dragon-ball.png', tags: ['dragon', 'ball'] },
  { id: 'anime-5', name: 'Naruto Symbol', category: 'anime', type: 'svg', url: '/assets/anime/naruto-symbol.svg', tags: ['naruto', 'symbol'] },
  { id: 'anime-6', name: 'One Piece Jolly Roger', category: 'anime', type: 'svg', url: '/assets/anime/jolly-roger.svg', tags: ['onepiece', 'pirate'] },
  { id: 'anime-7', name: 'Attack Titan', category: 'anime', type: 'png', url: '/assets/anime/attack-titan.png', tags: ['titan', 'attack'] },
  { id: 'anime-8', name: 'Pokeball', category: 'anime', type: 'svg', url: '/assets/anime/pokeball.svg', tags: ['pokemon', 'ball'] },
]

// Gaming collection
export const gamingAssets: DesignAsset[] = [
  { id: 'gaming-1', name: 'PS Controller', category: 'gaming', type: 'svg', url: '/assets/gaming/ps-controller.svg', tags: ['playstation', 'controller'] },
  { id: 'gaming-2', name: 'Xbox Controller', category: 'gaming', type: 'svg', url: '/assets/gaming/xbox-controller.svg', tags: ['xbox', 'controller'] },
  { id: 'gaming-3', name: 'Retro Gamepad', category: 'gaming', type: 'svg', url: '/assets/gaming/retro-gamepad.svg', tags: ['retro', 'classic'] },
  { id: 'gaming-4', name: 'Pac-Man', category: 'gaming', type: 'svg', url: '/assets/gaming/pacman.svg', tags: ['pacman', 'retro'] },
  { id: 'gaming-5', name: 'Space Invader', category: 'gaming', type: 'svg', url: '/assets/gaming/space-invader.svg', tags: ['space', 'invader'] },
  { id: 'gaming-6', name: 'Tetris Block', category: 'gaming', type: 'svg', url: '/assets/gaming/tetris-block.svg', tags: ['tetris', 'block'] },
  { id: 'gaming-7', name: 'Mario Mushroom', category: 'gaming', type: 'png', url: '/assets/gaming/mario-mushroom.png', tags: ['mario', 'mushroom'] },
  { id: 'gaming-8', name: 'Minecraft Creeper', category: 'gaming', type: 'png', url: '/assets/gaming/creeper.png', tags: ['minecraft', 'creeper'] },
]

// Vector shapes and graphics
export const vectorAssets: DesignAsset[] = [
  { id: 'vector-1', name: 'Heart', category: 'vector', type: 'svg', url: '/assets/vectors/heart.svg', tags: ['love', 'heart'] },
  { id: 'vector-2', name: 'Star', category: 'vector', type: 'svg', url: '/assets/vectors/star.svg', tags: ['star', 'rating'] },
  { id: 'vector-3', name: 'Arrow Up', category: 'vector', type: 'svg', url: '/assets/vectors/arrow-up.svg', tags: ['arrow', 'direction'] },
  { id: 'vector-4', name: 'Circle', category: 'vector', type: 'svg', url: '/assets/vectors/circle.svg', tags: ['shape', 'circle'] },
  { id: 'vector-5', name: 'Triangle', category: 'vector', type: 'svg', url: '/assets/vectors/triangle.svg', tags: ['shape', 'triangle'] },
  { id: 'vector-6', name: 'Lightning Bolt', category: 'vector', type: 'svg', url: '/assets/vectors/lightning-bolt.svg', tags: ['lightning', 'power'] },
  { id: 'vector-7', name: 'Crown', category: 'vector', type: 'svg', url: '/assets/vectors/crown.svg', tags: ['crown', 'royal'] },
  { id: 'vector-8', name: 'Wings', category: 'vector', type: 'svg', url: '/assets/vectors/wings.svg', tags: ['wings', 'fly'] },
]

// Text styles and fonts
export const textAssets: DesignAsset[] = [
  { id: 'text-1', name: 'AWESOME', category: 'text', type: 'svg', url: '/assets/text/awesome.svg', tags: ['awesome', 'cool'] },
  { id: 'text-2', name: 'GAMER', category: 'text', type: 'svg', url: '/assets/text/gamer.svg', tags: ['gamer', 'gaming'] },
  { id: 'text-3', name: 'LEGEND', category: 'text', type: 'svg', url: '/assets/text/legend.svg', tags: ['legend', 'hero'] },
  { id: 'text-4', name: 'BOSS', category: 'text', type: 'svg', url: '/assets/text/boss.svg', tags: ['boss', 'leader'] },
  { id: 'text-5', name: 'NINJA', category: 'text', type: 'svg', url: '/assets/text/ninja.svg', tags: ['ninja', 'stealth'] },
  { id: 'text-6', name: 'HERO', category: 'text', type: 'svg', url: '/assets/text/hero.svg', tags: ['hero', 'super'] },
]

// Combine all assets
export const allDesignAssets: DesignAsset[] = [
  ...emojiAssets,
  ...animeAssets,
  ...gamingAssets,
  ...vectorAssets,
  ...textAssets,
]

// Helper functions
export const getAssetsByCategory = (category: DesignAsset['category']) => {
  return allDesignAssets.filter(asset => asset.category === category)
}

export const searchAssets = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return allDesignAssets.filter(asset => 
    asset.name.toLowerCase().includes(lowercaseQuery) ||
    asset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Asset upload configuration
export const SUPPORTED_FORMATS = {
  images: ['.png', '.jpg', '.jpeg', '.gif'],
  vectors: ['.svg'],
  all: ['.png', '.jpg', '.jpeg', '.gif', '.svg']
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_DIMENSION = 2048 // pixels