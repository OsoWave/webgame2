import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { classTemplates } from '../data/classTemplates';
import { CharacterClass } from '../types/game';

export const CharacterCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass | ''>('');
  const createCharacter = useGameStore(state => state.createCharacter);
  const user = useAuthStore(state => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedClass && user) {
      await createCharacter(name, selectedClass, user.id);
      setName('');
      setSelectedClass('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Character</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Character Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Your Class
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classTemplates.map((classTemplate) => {
              const Icon = classTemplate.icon;
              return (
                <button
                  key={classTemplate.name}
                  type="button"
                  onClick={() => setSelectedClass(classTemplate.name as CharacterClass)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedClass === classTemplate.name
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-800">{classTemplate.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {classTemplate.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    <div>STR: {classTemplate.baseStats.strength}</div>
                    <div>INT: {classTemplate.baseStats.intelligence}</div>
                    <div>DEX: {classTemplate.baseStats.dexterity}</div>
                    <div>CON: {classTemplate.baseStats.constitution}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name || !selectedClass}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Create Character
        </button>
      </form>
    </div>
  );
};