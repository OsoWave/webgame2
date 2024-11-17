import React, { useState } from 'react';
import { initializeDatabase } from '../../utils/initializeDatabase';
import { Database, RefreshCw } from 'lucide-react';

export const InitializeDatabase = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInitialize = async () => {
    if (!window.confirm('Are you sure you want to initialize the database? This will reset all game data.')) {
      return;
    }

    setIsInitializing(true);
    setStatus('idle');

    try {
      await initializeDatabase();
      setStatus('success');
    } catch (error) {
      console.error('Error initializing database:', error);
      setStatus('error');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Initialize Database</h3>
          <p className="text-sm text-gray-500">
            Set up initial game data including classes, quests, and settings
          </p>
        </div>
        <Database className="w-8 h-8 text-gray-400" />
      </div>

      <div className="mt-4">
        <button
          onClick={handleInitialize}
          disabled={isInitializing}
          className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {isInitializing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Initializing...
            </>
          ) : (
            'Initialize Database'
          )}
        </button>
      </div>

      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">
          Database initialized successfully!
        </p>
      )}

      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">
          Error initializing database. Check the console for details.
        </p>
      )}
    </div>
  );
};