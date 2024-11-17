export type CharacterClass = 'Warrior' | 'Mage' | 'Rogue';

export interface ClassTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.FC;
  baseStats: Stats;
}

export interface Stats {
  strength: number;
  intelligence: number;
  dexterity: number;
  constitution: number;
}

export type EquipmentSlot = 'helmet' | 'chest' | 'legs' | 'boots' | 'gloves' | 'weapon' | 'necklace' | 'ring1' | 'ring2';

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  value: number;
  type: 'equipment' | 'consumable';
  slot?: EquipmentSlot;
  stats?: Partial<Stats>;
}

export interface InventoryItem {
  item: Item;
  quantity: number;
}

export interface Equipment {
  helmet?: Item;
  chest?: Item;
  legs?: Item;
  boots?: Item;
  gloves?: Item;
  weapon?: Item;
  necklace?: Item;
  ring1?: Item;
  ring2?: Item;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  class: CharacterClass;
  level: number;
  stats: Stats;
  experience: number;
  wins: number;
  losses: number;
  lastDuelTime?: number;
  activeQuest?: Quest;
  completedQuests: string[];
  gold: number;
  inventory: InventoryItem[];
  inventorySize: number;
  equipment: Equipment;
}

export interface DuelResult {
  winner: Character;
  loser: Character;
  experienceGained: number;
  log: string[];
}

export interface Monster {
  name: string;
  level: number;
  stats: Stats;
  type: string;
  goldDrop: {
    min: number;
    max: number;
  };
  possibleDrops?: Item[];
  dropChance?: number;
}

export interface QuestStep {
  monster: Monster;
  completed: boolean;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  minLevel: number;
  steps: QuestStep[];
  experienceReward: number;
  completed: boolean;
}

export interface LootResult {
  gold: number;
  items: Item[];
}