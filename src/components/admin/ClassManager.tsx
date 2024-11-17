import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ClassTemplate } from '../../types/game';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

export const ClassManager = () => {
  const [classes, setClasses] = useState<ClassTemplate[]>([]);
  const [editingClass, setEditingClass] = useState<ClassTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    const querySnapshot = await getDocs(collection(db, 'classes'));
    const loadedClasses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ClassTemplate));
    setClasses(loadedClasses);
  };

  const handleSave = async (classData: Partial<ClassTemplate>) => {
    const classRef = doc(collection(db, 'classes'));
    const newClass = {
      id: editingClass?.id || classRef.id,
      ...classData,
    };

    await setDoc(doc(db, 'classes', newClass.id), newClass);
    await loadClasses();
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      await deleteDoc(doc(db, 'classes', id));
      await loadClasses();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Character Classes</h2>
        <button
          onClick={() => {
            setEditingClass(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">{classItem.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingClass(classItem);
                    setIsModalOpen(true);
                  }}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(classItem.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{classItem.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-600">Strength</p>
                <p className="text-lg font-bold text-gray-800">{classItem.baseStats.strength}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-600">Intelligence</p>
                <p className="text-lg font-bold text-gray-800">{classItem.baseStats.intelligence}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-600">Dexterity</p>
                <p className="text-lg font-bold text-gray-800">{classItem.baseStats.dexterity}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium text-gray-600">Constitution</p>
                <p className="text-lg font-bold text-gray-800">{classItem.baseStats.constitution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ClassFormModal
          initialData={editingClass}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingClass(null);
          }}
        />
      )}
    </div>
  );
};

interface ClassFormModalProps {
  initialData: ClassTemplate | null;
  onSave: (data: Partial<ClassTemplate>) => void;
  onClose: () => void;
}

const ClassFormModal: React.FC<ClassFormModalProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<ClassTemplate>>(
    initialData || {
      name: '',
      description: '',
      baseStats: {
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        constitution: 10
      }
    }
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {initialData ? 'Edit Class' : 'New Class'}
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
                <label className="block text-sm font-medium text-gray-700">Strength</label>
                <input
                  type="number"
                  value={formData.baseStats?.strength}
                  onChange={(e) => setFormData({
                    ...formData,
                    baseStats: {
                      ...formData.baseStats!,
                      strength: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Intelligence</label>
                <input
                  type="number"
                  value={formData.baseStats?.intelligence}
                  onChange={(e) => setFormData({
                    ...formData,
                    baseStats: {
                      ...formData.baseStats!,
                      intelligence: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dexterity</label>
                <input
                  type="number"
                  value={formData.baseStats?.dexterity}
                  onChange={(e) => setFormData({
                    ...formData,
                    baseStats: {
                      ...formData.baseStats!,
                      dexterity: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Constitution</label>
                <input
                  type="number"
                  value={formData.baseStats?.constitution}
                  onChange={(e) => setFormData({
                    ...formData,
                    baseStats: {
                      ...formData.baseStats!,
                      constitution: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
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