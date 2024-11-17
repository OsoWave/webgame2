import { ClassTemplate } from '../types/game';
import { Sword, Wand, Footprints } from 'lucide-react';

export const classTemplates: ClassTemplate[] = [
  {
    name: 'Warrior',
    description: 'A mighty melee fighter skilled in combat and defense',
    icon: Sword,
    baseStats: {
      strength: 15,
      intelligence: 8,
      dexterity: 12,
      constitution: 14
    }
  },
  {
    name: 'Mage',
    description: 'A powerful spellcaster wielding arcane magic',
    icon: Wand,
    baseStats: {
      strength: 6,
      intelligence: 16,
      dexterity: 10,
      constitution: 8
    }
  },
  {
    name: 'Rogue',
    description: 'A nimble adventurer specializing in stealth and precision',
    icon: Footprints,
    baseStats: {
      strength: 10,
      intelligence: 12,
      dexterity: 16,
      constitution: 10
    }
  }
];