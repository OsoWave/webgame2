import { create } from 'zustand';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  query, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Character, CharacterClass, Stats, DuelResult, Monster, Quest, Item, EquipmentSlot } from '../types/game';
import { classTemplates } from '../data/classTemplates';
import { monsterTemplates, questTemplates } from '../data/questTemplates';
import { items } from '../data/items';

interface GameState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  createCharacter: (name: string, characterClass: CharacterClass, userId: string) => Promise<void>;
  levelUp: (characterId: string) => Promise<void>;
  initiateDuel: (challengerId: string, defenderId: string) => Promise<DuelResult | null>;
  getCharacterById: (id: string) => Character | undefined;
  addExperience: (characterId: string, amount: number) => Promise<void>;
  startQuest: (characterId: string) => Promise<Quest | null>;
  fightMonster: (characterId: string) => Promise<DuelResult | null>;
  getAvailableQuests: (characterId: string) => Quest[];
  loadUserCharacters: (userId: string) => Promise<void>;
  addItemToInventory: (characterId: string, item: Item) => Promise<void>;
  addGold: (characterId: string, amount: number) => Promise<void>;
  equipItem: (characterId: string, item: Item) => Promise<void>;
  unequipItem: (characterId: string, slot: EquipmentSlot) => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  characters: [],
  loading: false,
  error: null,

  createCharacter: async (name: string, characterClass: CharacterClass, userId: string) => {
    try {
      set({ loading: true, error: null });
      const classTemplate = classTemplates.find(c => c.name === characterClass);
      if (!classTemplate) throw new Error('Invalid character class');

      const character: Character = {
        id: crypto.randomUUID(),
        userId,
        name,
        class: characterClass,
        level: 1,
        stats: classTemplate.baseStats,
        experience: 0,
        wins: 0,
        losses: 0,
        completedQuests: [],
        gold: 0,
        inventory: [],
        inventorySize: 20,
        equipment: {}
      };

      await setDoc(doc(db, 'characters', character.id), character);
      set(state => ({
        characters: [...state.characters, character],
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  levelUp: async (characterId: string) => {
    const character = get().getCharacterById(characterId);
    if (!character) return;

    try {
      const updatedStats: Stats = {
        strength: character.stats.strength + 2,
        intelligence: character.stats.intelligence + 2,
        dexterity: character.stats.dexterity + 2,
        constitution: character.stats.constitution + 2
      };

      await updateDoc(doc(db, 'characters', characterId), {
        level: character.level + 1,
        stats: updatedStats
      });

      set(state => ({
        characters: state.characters.map(c =>
          c.id === characterId
            ? { ...c, level: c.level + 1, stats: updatedStats }
            : c
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  getCharacterById: (id: string) => {
    return get().characters.find(c => c.id === id);
  },

  loadUserCharacters: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const q = query(collection(db, 'characters'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const characters = querySnapshot.docs.map(doc => doc.data() as Character);
      set({ characters, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  equipItem: async (characterId: string, item: Item) => {
    const character = get().getCharacterById(characterId);
    if (!character || !item.slot) return;

    try {
      // Remove item from inventory
      const updatedInventory = character.inventory
        .map(invItem => {
          if (invItem.item.id === item.id) {
            return { ...invItem, quantity: invItem.quantity - 1 };
          }
          return invItem;
        })
        .filter(invItem => invItem.quantity > 0);

      // If there's an item already equipped in that slot, add it back to inventory
      const currentlyEquipped = character.equipment[item.slot];
      if (currentlyEquipped) {
        const existingItem = updatedInventory.find(i => i.item.id === currentlyEquipped.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedInventory.push({ item: currentlyEquipped, quantity: 1 });
        }
      }

      // Update equipment
      const updatedEquipment = {
        ...character.equipment,
        [item.slot]: item
      };

      await updateDoc(doc(db, 'characters', characterId), {
        inventory: updatedInventory,
        equipment: updatedEquipment
      });

      set(state => ({
        characters: state.characters.map(c =>
          c.id === characterId
            ? { ...c, inventory: updatedInventory, equipment: updatedEquipment }
            : c
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  unequipItem: async (characterId: string, slot: EquipmentSlot) => {
    const character = get().getCharacterById(characterId);
    if (!character) return;

    try {
      const item = character.equipment[slot];
      if (!item) return;

      // Add item back to inventory
      const updatedInventory = [...character.inventory];
      const existingItem = updatedInventory.find(i => i.item.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedInventory.push({ item, quantity: 1 });
      }

      // Remove item from equipment
      const updatedEquipment = {
        ...character.equipment,
        [slot]: undefined
      };

      await updateDoc(doc(db, 'characters', characterId), {
        inventory: updatedInventory,
        equipment: updatedEquipment
      });

      set(state => ({
        characters: state.characters.map(c =>
          c.id === characterId
            ? { ...c, inventory: updatedInventory, equipment: updatedEquipment }
            : c
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  // Implement other methods...
  initiateDuel: async () => null,
  addExperience: async () => {},
  startQuest: async () => null,
  fightMonster: async () => null,
  getAvailableQuests: () => [],
  addItemToInventory: async () => {},
  addGold: async () => {}
}));