import React from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { Sword, Wand, Footprints, Trophy } from 'lucide-react';
import { CharacterClass } from '../types/game';

const classIcons = {
  Warrior: Sword,
  Mage: Wand,
  Rogue: Footprints
};

export const CharacterList: React.FC = () => {
  const characters = useGameStore(state => state.characters);
  const levelUp = useGameStore(state => state.levelUp);

  if (characters.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        No characters created yet. Create your first character to begin your journey!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {characters.map(character => {
        const Icon = classIcons[character.class as CharacterClass];
        return (
          <div key={character.id} className="game-card p-6 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-900/50 rounded-lg group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <Link 
                  to={`/character/${character.id}`}
                  className="text-xl font-bold text-indigo-100 hover:text-indigo-400 transition-colors"
                >
                  {character.name}
                </Link>
                <p className="text-gray-400">Level {character.level} {character.class}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-gray-700/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Experience</span>
                  <span className="text-sm font-medium text-indigo-300">{character.experience} XP</span>
                </div>
                <div className="mt-1 progress-bar">
                  <div 
                    className="progress-value"
                    style={{ width: `${(character.experience % 1000) / 10}%` }}
                  />
                </div>
              </div>

              <div className="stat-card text-center">
                <Trophy className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-300">{character.wins} Wins</p>
              </div>

              <div className="stat-card text-center">
                <p className="text-sm font-medium text-gray-300">{character.losses} Losses</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="stat-card">
                <p className="text-sm font-medium text-gray-400">Strength</p>
                <p className="text-lg font-bold text-indigo-300">{character.stats.strength}</p>
              </div>
              <div className="stat-card">
                <p className="text-sm font-medium text-gray-400">Intelligence</p>
                <p className="text-lg font-bold text-indigo-300">{character.stats.intelligence}</p>
              </div>
              <div className="stat-card">
                <p className="text-sm font-medium text-gray-400">Dexterity</p>
                <p className="text-lg font-bold text-indigo-300">{character.stats.dexterity}</p>
              </div>
              <div className="stat-card">
                <p className="text-sm font-medium text-gray-400">Constitution</p>
                <p className="text-lg font-bold text-indigo-300">{character.stats.constitution}</p>
              </div>
            </div>

            <button
              onClick={() => levelUp(character.id)}
              className="mt-4 w-full game-button"
            >
              Level Up
            </button>
          </div>
        );
      })}
    </div>
  );
};