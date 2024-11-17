import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Quest, Monster } from '../../types/game';
import { PlusCircle, Edit2, Trash2, Plus, Minus } from 'lucide-react';

export const QuestManager = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    const querySnapshot = await getDocs(collection(db, 'quests'));
    const loadedQuests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Quest));
    setQuests(loadedQuests);
  };

  const handleSave = async (questData: Partial<Quest>) => {
    const questRef = doc(collection(db, 'quests'));
    const newQuest = {
      id: editingQuest?.id || questRef.id,
      ...questData,
    };

    await setDoc(doc(db, 'quests', newQuest.id), newQuest);
    await loadQuests();
    setIsModalOpen(false);
    setEditingQuest(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this quest?')) {
      await deleteDoc(doc(db, 'quests', id));
      await loadQuests();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Quest Management</h2>
        <button
          onClick={() => {
            setEditingQuest(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Quest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map(quest => (
          <div key={quest.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{quest.name}</h3>
                <p className="text-sm text-gray-500">Min Level: {quest.minLevel}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingQuest(quest);
                    setIsModalOpen(true);
                  }}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(quest.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{quest.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Quest Steps</h4>
                {quest.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                    <p className="font-medium text-gray-800">{step.monster.name}</p>
                    <p className="text-sm text-gray-600">Level {step.monster.level}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-600">Experience Reward</span>
                <span className="font-bold text-gray-900">{quest.experienceReward} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <QuestFormModal
          initialData={editingQuest}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingQuest(null);
          }}
        />
      )}
    </div>
  );
};

interface QuestFormModalProps {
  initialData: Quest | null;
  onSave: (data: Partial<Quest>) => void;
  onClose: () => void;
}

const QuestFormModal: React.FC<QuestFormModalProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Quest>>(
    initialData || {
      name: '',
      description: '',
      minLevel: 1,
      steps: [],
      experienceReward: 100
    }
  );

  const addStep = () => {
    const newMonster: Monster = {
      name: 'New Monster',
      level: 1,
      type: 'Normal',
      stats: {
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        constitution: 10
      }
    };

    setFormData({
      ...formData,
      steps: [...(formData.steps || []), { monster: newMonster, completed: false }]
    });
  };

  const removeStep = (index: number) => {
    const newSteps = [...(formData.steps || [])];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {initialData ? 'Edit Quest' : 'New Quest'}
        </h3>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Level</label>
                <input
                  type="number"
                  value={formData.minLevel}
                  onChange={(e) => setFormData({ ...formData, minLevel: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience Reward</label>
                <input
                  type="number"
                  value={formData.experienceReward}
                  onChange={(e) => setFormData({ ...formData, experienceReward: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Quest Steps</label>
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Step
                </button>
              </div>

              <div className="space-y-2">
                {formData.steps?.map((step, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded relative">
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Monster Name</label>
                        <input
                          type="text"
                          value={step.monster.name}
                          onChange={(e) => {
                            const newSteps = [...formData.steps!];
                            newSteps[index].monster.name = e.target.value;
                            setFormData({ ...formData, steps: newSteps });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Level</label>
                        <input
                          type="number"
                          value={step.monster.level}
                          onChange={(e) => {
                            const newSteps = [...formData.steps!];
                            newSteps[index].monster.level = parseInt(e.target.value);
                            setFormData({ ...formData, steps: newSteps });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Monster Type</label>
                        <input
                          type="text"
                          value={step.monster.type}
                          onChange={(e) => {
                            const newSteps = [...formData.steps!];
                            newSteps[index].monster.type = e.target.value;
                            setFormData({ ...formData, steps: newSteps });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};