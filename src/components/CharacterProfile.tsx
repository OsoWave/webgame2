import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Shield, Swords, Trophy, XCircle } from 'lucide-react';
import { QuestPanel } from './QuestPanel';
import { Inventory } from './Inventory';
import { EquipmentPanel } from './EquipmentPanel';

export const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const character = useGameStore(state => state.getCharacterById(id || ''));

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Character Not Found</h2>
          <p className="text-gray-600 mb-4">The character you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
              <p className="text-gray-600">Level {character.level} {character.class}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <Trophy className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-600">{character.wins} Wins</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-600">{character.losses} Losses</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Strength</p>
              <p className="text-2xl font-bold text-gray-900">{character.stats.strength}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Intelligence</p>
              <p className="text-2xl font-bold text-gray-900">{character.stats.intelligence}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Dexterity</p>
              <p className="text-2xl font-bold text-gray-900">{character.stats.dexterity}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Constitution</p>
              <p className="text-2xl font-bold text-gray-900">{character.stats.constitution}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div>
            <EquipmentPanel characterId={character.id} />
            <Inventory characterId={character.id} />
          </div>
          <QuestPanel characterId={character.id} />
        </div>
      </div>
    </div>
  );
};