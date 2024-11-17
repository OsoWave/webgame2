import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Scroll, Swords } from 'lucide-react';
import { DuelResult } from '../types/game';

interface QuestPanelProps {
  characterId: string;
}

export const QuestPanel: React.FC<QuestPanelProps> = ({ characterId }) => {
  const [battleResult, setBattleResult] = useState<DuelResult | null>(null);
  const character = useGameStore(state => state.getCharacterById(characterId));
  const startQuest = useGameStore(state => state.startQuest);
  const fightMonster = useGameStore(state => state.fightMonster);
  const availableQuests = useGameStore(state => state.getAvailableQuests(characterId));

  if (!character) return null;

  const handleStartQuest = () => {
    startQuest(characterId);
  };

  const handleFightMonster = () => {
    const result = fightMonster(characterId);
    if (result) {
      setBattleResult(result);
      setTimeout(() => setBattleResult(null), 5000);
    }
  };

  if (!character.activeQuest) {
    if (availableQuests.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-xl p-6 mt-6">
          <div className="text-center text-gray-600">
            <Scroll className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No quests available at your level.</p>
            <p className="text-sm mt-2">Level up to unlock more quests!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Quests</h3>
        <div className="space-y-4">
          {availableQuests.map(quest => (
            <div key={quest.id} className="border rounded-lg p-4">
              <h4 className="font-bold text-gray-800">{quest.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{quest.description}</p>
              <p className="text-sm text-gray-500">Required Level: {quest.minLevel}</p>
              <p className="text-sm text-gray-500">Steps: {quest.steps.length}</p>
              <p className="text-sm text-indigo-600">Reward: {quest.experienceReward} XP</p>
            </div>
          ))}
          <button
            onClick={handleStartQuest}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Start Random Quest
          </button>
        </div>
      </div>
    );
  }

  const currentStep = character.activeQuest.steps.find(step => !step.completed);
  const completedSteps = character.activeQuest.steps.filter(step => step.completed).length;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Active Quest</h3>
      <div className="mb-4">
        <h4 className="font-bold text-gray-800">{character.activeQuest.name}</h4>
        <p className="text-gray-600 text-sm">{character.activeQuest.description}</p>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${(completedSteps / character.activeQuest.steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Progress: {completedSteps}/{character.activeQuest.steps.length} steps completed
        </p>
      </div>

      {currentStep && (
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-gray-800">Current Enemy</h5>
            <span className="text-sm text-gray-600">Level {currentStep.monster.level}</span>
          </div>
          <p className="text-gray-700 mb-2">{currentStep.monster.name}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-600">STR: {currentStep.monster.stats.strength}</p>
              <p className="text-gray-600">INT: {currentStep.monster.stats.intelligence}</p>
            </div>
            <div>
              <p className="text-gray-600">DEX: {currentStep.monster.stats.dexterity}</p>
              <p className="text-gray-600">CON: {currentStep.monster.stats.constitution}</p>
            </div>
          </div>
        </div>
      )}

      {battleResult && (
        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          {battleResult.log.map((log, index) => (
            <p key={index} className="text-gray-700">{log}</p>
          ))}
        </div>
      )}

      {currentStep && (
        <button
          onClick={handleFightMonster}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Swords className="w-5 h-5 mr-2" />
          Fight Monster
        </button>
      )}
    </div>
  );
};