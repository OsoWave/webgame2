import { Item } from '../types/game';

export const items: Item[] = [
  // Consumables
  {
    id: 'health-potion',
    name: 'Health Potion',
    description: 'Restores health points',
    rarity: 'Common',
    value: 50,
    type: 'consumable'
  },
  {
    id: 'mana-potion',
    name: 'Mana Potion',
    description: 'Restores mana points',
    rarity: 'Common',
    value: 50,
    type: 'consumable'
  },
  
  // Equipment - Weapons
  {
    id: 'iron-sword',
    name: 'Iron Sword',
    description: 'A basic sword',
    rarity: 'Common',
    value: 100,
    type: 'equipment',
    slot: 'weapon',
    stats: {
      strength: 5
    }
  },
  {
    id: 'magic-staff',
    name: 'Magic Staff',
    description: 'A staff imbued with magical power',
    rarity: 'Uncommon',
    value: 200,
    type: 'equipment',
    slot: 'weapon',
    stats: {
      intelligence: 8
    }
  },
  
  // Equipment - Armor
  {
    id: 'leather-helmet',
    name: 'Leather Helmet',
    description: 'Basic head protection',
    rarity: 'Common',
    value: 50,
    type: 'equipment',
    slot: 'helmet',
    stats: {
      constitution: 2
    }
  },
  {
    id: 'chainmail-chest',
    name: 'Chainmail Chest',
    description: 'Decent torso protection',
    rarity: 'Uncommon',
    value: 150,
    type: 'equipment',
    slot: 'chest',
    stats: {
      constitution: 5
    }
  },
  
  // Equipment - Accessories
  {
    id: 'strength-ring',
    name: 'Ring of Strength',
    description: 'Enhances physical power',
    rarity: 'Rare',
    value: 300,
    type: 'equipment',
    slot: 'ring1',
    stats: {
      strength: 3
    }
  },
  {
    id: 'wisdom-necklace',
    name: 'Necklace of Wisdom',
    description: 'Enhances magical abilities',
    rarity: 'Rare',
    value: 300,
    type: 'equipment',
    slot: 'necklace',
    stats: {
      intelligence: 3
    }
  }
];