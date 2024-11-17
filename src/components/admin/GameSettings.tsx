import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Save } from 'lucide-react';
import { InitializeDatabase } from './InitializeDatabase';

export const GameSettings = () => {
  const [settings, setSettings] = useState({
    experienceMultiplier: 1,
    levelUpExperienceBase: 1000,
    levelUpExperienceMultiplier: 1.5,
    pvpCooldownMinutes: 30,
    maxQuestsPerDay: 10,
    maxLevel: 50
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, 'settings', 'game'));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'game'), settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Game Settings</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <InitializeDatabase />

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Multiplier
            </label>
            <input
              type="number"
              step="0.1"
              value={settings.experienceMultiplier}
              onChange={(e) => handleChange('experienceMultiplier', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Level-Up Experience
            </label>
            <input
              type="number"
              value={settings.levelUpExperienceBase}
              onChange={(e) => handleChange('levelUpExperienceBase', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level-Up Experience Multiplier
            </label>
            <input
              type="number"
              step="0.1"
              value={settings.levelUpExperienceMultiplier}
              onChange={(e) => handleChange('levelUpExperienceMultiplier', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PvP Cooldown (minutes)
            </label>
            <input
              type="number"
              value={settings.pvpCooldownMinutes}
              onChange={(e) => handleChange('pvpCooldownMinutes', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Quests Per Day
            </label>
            <input
              type="number"
              value={settings.maxQuestsPerDay}
              onChange={(e) => handleChange('maxQuestsPerDay', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Level
            </label>
            <input
              type="number"
              value={settings.maxLevel}
              onChange={(e) => handleChange('maxLevel', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};