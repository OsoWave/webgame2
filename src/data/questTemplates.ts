import { Stats } from '../types/game';
import { items } from './items';

interface MonsterTemplate {
  name: string;
  type: string;
  baseStats: Stats;
  levelMultiplier: number;
  goldDrop: {
    min: number;
    max: number;
  };
  possibleDrops?: string[];
  dropChance: number;
}

export const monsterTemplates: MonsterTemplate[] = [
  {
    name: "Goblin",
    type: "Humanoid",
    baseStats: {
      strength: 8,
      intelligence: 6,
      dexterity: 12,
      constitution: 8
    },
    levelMultiplier: 1.2,
    goldDrop: {
      min: 10,
      max: 30
    },
    possibleDrops: ['health-potion', 'mana-potion'],
    dropChance: 0.3
  },
  {
    name: "Skeleton",
    type: "Undead",
    baseStats: {
      strength: 10,
      intelligence: 4,
      dexterity: 8,
      constitution: 6
    },
    levelMultiplier: 1.3,
    goldDrop: {
      min: 15,
      max: 40
    },
    possibleDrops: ['strength-scroll', 'intelligence-scroll'],
    dropChance: 0.2
  },
  {
    name: "Dark Mage",
    type: "Humanoid",
    baseStats: {
      strength: 4,
      intelligence: 14,
      dexterity: 8,
      constitution: 6
    },
    levelMultiplier: 1.4,
    goldDrop: {
      min: 30,
      max: 60
    },
    possibleDrops: ['mystic-orb'],
    dropChance: 0.1
  },
  {
    name: "Dragon Whelp",
    type: "Dragon",
    baseStats: {
      strength: 12,
      intelligence: 10,
      dexterity: 10,
      constitution: 12
    },
    levelMultiplier: 1.5,
    goldDrop: {
      min: 50,
      max: 100
    },
    possibleDrops: ['dragon-scale'],
    dropChance: 0.05
  }
];

interface QuestTemplate {
  name: string;
  description: string;
  minLevel: number;
  steps: number;
  monsterTypes: string[];
  experienceMultiplier: number;
}

export const questTemplates: QuestTemplate[] = [
  {
    name: "Goblin Infestation",
    description: "Clear out a goblin nest that's been terrorizing local farmers",
    minLevel: 1,
    steps: 3,
    monsterTypes: ["Humanoid"],
    experienceMultiplier: 1.2
  },
  {
    name: "Dark Catacombs",
    description: "Explore ancient catacombs filled with undead creatures",
    minLevel: 3,
    steps: 4,
    monsterTypes: ["Undead", "Humanoid"],
    experienceMultiplier: 1.5
  },
  {
    name: "Dragon's Challenge",
    description: "Face increasingly powerful dragon offspring",
    minLevel: 5,
    steps: 3,
    monsterTypes: ["Dragon"],
    experienceMultiplier: 2.0
  }
];