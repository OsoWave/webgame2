import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Swords, Shield, Scroll, Users, Trophy } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-game-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Gamepad2 className="w-20 h-20 text-indigo-400 animate-pulse-slow" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Fantasy RPG Adventure
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Embark on an epic journey, battle fearsome monsters, and become a legendary hero in this immersive fantasy world.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300">
            <Swords className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Epic Combat</h3>
            <p className="text-gray-400">
              Engage in tactical battles with a variety of monsters and other players.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300">
            <Shield className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Character Classes</h3>
            <p className="text-gray-400">
              Choose from unique classes, each with their own abilities and playstyles.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300">
            <Scroll className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Dynamic Quests</h3>
            <p className="text-gray-400">
              Embark on challenging quests and uncover the secrets of the realm.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300">
            <Users className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Multiplayer</h3>
            <p className="text-gray-400">
              Team up with friends or challenge them in PvP combat.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300">
            <Trophy className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Achievements</h3>
            <p className="text-gray-400">
              Earn rewards and climb the ranks to become a legendary hero.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl hover:shadow-game transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="relative">
              <Gamepad2 className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">And More...</h3>
              <p className="text-gray-400">
                Regular updates with new content, events, and features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold">Fantasy RPG</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 Fantasy RPG. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};