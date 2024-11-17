import React, { useState } from 'react';
import { Users, BookOpen, Scroll, Settings } from 'lucide-react';
import { ClassManager } from './admin/ClassManager';
import { QuestManager } from './admin/QuestManager';
import { UserManager } from './admin/UserManager';
import { GameSettings } from './admin/GameSettings';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'quests' | 'users' | 'settings'>('classes');

  const tabs = [
    { id: 'classes', name: 'Classes', icon: BookOpen, component: ClassManager },
    { id: 'quests', name: 'Quests', icon: Scroll, component: QuestManager },
    { id: 'users', name: 'Users', icon: Users, component: UserManager },
    { id: 'settings', name: 'Settings', icon: Settings, component: GameSettings },
  ] as const;

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ClassManager;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Game Administration</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`
                    flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm
                    ${activeTab === id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  {name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};