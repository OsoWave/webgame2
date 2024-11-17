import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Coins, Package } from 'lucide-react';
import { InventoryItem } from '../types/game';

interface InventoryProps {
  characterId: string;
}

export const Inventory: React.FC<InventoryProps> = ({ characterId }) => {
  const character = useGameStore(state => state.getCharacterById(characterId));

  if (!character) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600';
      case 'Uncommon': return 'text-green-600';
      case 'Rare': return 'text-blue-600';
      case 'Epic': return 'text-purple-600';
      case 'Legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Inventory</h3>
      
      <div className="flex items-center space-x-2 mb-6 p-3 bg-yellow-50 rounded-lg">
        <Coins className="w-5 h-5 text-yellow-600" />
        <span className="text-lg font-medium text-yellow-700">{character.gold} Gold</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Items ({character.inventory.length}/{character.inventorySize})</span>
        </div>

        {character.inventory.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Your inventory is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {character.inventory.map((inventoryItem: InventoryItem) => (
              <div
                key={inventoryItem.item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className={`font-medium ${getRarityColor(inventoryItem.item.rarity)}`}>
                    {inventoryItem.item.name}
                    {inventoryItem.quantity > 1 && ` (${inventoryItem.quantity})`}
                  </h4>
                  <p className="text-sm text-gray-500">{inventoryItem.item.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {inventoryItem.item.value} gold
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};