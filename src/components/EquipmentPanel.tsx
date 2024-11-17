import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Shield, AlertCircle } from 'lucide-react';
import { EquipmentSlot, Item, Stats } from '../types/game';

interface EquipmentPanelProps {
  characterId: string;
}

const SLOT_NAMES: Record<EquipmentSlot, string> = {
  helmet: 'Helmet',
  chest: 'Chest',
  legs: 'Legs',
  boots: 'Boots',
  gloves: 'Gloves',
  weapon: 'Weapon',
  necklace: 'Necklace',
  ring1: 'Ring 1',
  ring2: 'Ring 2'
};

const SLOT_ORDER: EquipmentSlot[] = [
  'helmet',
  'necklace',
  'chest',
  'gloves',
  'weapon',
  'ring1',
  'legs',
  'ring2',
  'boots'
];

export const EquipmentPanel: React.FC<EquipmentPanelProps> = ({ characterId }) => {
  const character = useGameStore(state => state.getCharacterById(characterId));
  const equipItem = useGameStore(state => state.equipItem);
  const unequipItem = useGameStore(state => state.unequipItem);

  if (!character) return null;

  const calculateBonusStats = (): Partial<Stats> => {
    const bonusStats: Partial<Stats> = {};
    Object.values(character.equipment).forEach(item => {
      if (item?.stats) {
        Object.entries(item.stats).forEach(([stat, value]) => {
          bonusStats[stat as keyof Stats] = (bonusStats[stat as keyof Stats] || 0) + value;
        });
      }
    });
    return bonusStats;
  };

  const bonusStats = calculateBonusStats();

  const handleEquip = (item: Item) => {
    equipItem(characterId, item);
  };

  const handleUnequip = (slot: EquipmentSlot) => {
    unequipItem(characterId, slot);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-gray-200 bg-gray-50';
      case 'Uncommon': return 'border-green-200 bg-green-50';
      case 'Rare': return 'border-blue-200 bg-blue-50';
      case 'Epic': return 'border-purple-200 bg-purple-50';
      case 'Legendary': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getEquippableItems = (slot: EquipmentSlot) => {
    return character.inventory.filter(
      inventoryItem => 
        inventoryItem.item.type === 'equipment' && 
        inventoryItem.item.slot === slot
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Equipment</h3>
        <Shield className="w-6 h-6 text-indigo-600" />
      </div>

      {Object.keys(bonusStats).length > 0 && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-800 mb-2">Equipment Bonuses</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(bonusStats).map(([stat, value]) => (
              <div key={stat} className="text-sm text-indigo-600">
                {stat.charAt(0).toUpperCase() + stat.slice(1)}: +{value}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {SLOT_ORDER.map((slot) => {
          const equippedItem = character.equipment[slot];
          const equippableItems = getEquippableItems(slot);

          return (
            <div key={slot} className="relative group">
              <div
                className={`
                  aspect-square rounded-lg border-2 p-2 flex flex-col items-center justify-center
                  ${equippedItem 
                    ? getRarityColor(equippedItem.rarity)
                    : 'border-dashed border-gray-300 bg-gray-50'
                  }
                `}
              >
                <span className="text-xs text-gray-500 mb-1">{SLOT_NAMES[slot]}</span>
                {equippedItem ? (
                  <>
                    <div className="text-center">
                      <div className="font-medium text-sm">{equippedItem.name}</div>
                      {equippedItem.stats && (
                        <div className="text-xs text-gray-500">
                          {Object.entries(equippedItem.stats)
                            .map(([stat, value]) => `${stat.charAt(0).toUpperCase()}: +${value}`)
                            .join(', ')}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleUnequip(slot)}
                      className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-sm"
                    >
                      Unequip
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    {equippableItems.length > 0 ? (
                      <>
                        <select
                          onChange={(e) => {
                            const item = equippableItems.find(i => i.item.id === e.target.value)?.item;
                            if (item) handleEquip(item);
                          }}
                          className="w-full px-2 py-1 text-sm border rounded"
                          defaultValue=""
                        >
                          <option value="">Select item</option>
                          {equippableItems.map(({ item }) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">Empty</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start space-x-2 text-sm text-gray-500">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>
          Equipment provides bonus stats that enhance your character's performance in combat.
          Hover over equipped items to unequip them, or click empty slots to equip available items.
        </p>
      </div>
    </div>
  );
};