import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CharacterCreation } from './components/CharacterCreation';
import { CharacterList } from './components/CharacterList';
import { CharacterProfile } from './components/CharacterProfile';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ResetPassword } from './components/ResetPassword';
import { VerifyEmail } from './components/VerifyEmail';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthGuard } from './components/AuthGuard';
import { LandingPage } from './components/LandingPage';
import { useAuthStore } from './store/authStore';
import { Gamepad2 } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <nav className="bg-gray-800/50 border-b border-gray-700 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Gamepad2 className="w-8 h-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-indigo-100">Fantasy Game</span>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  {user.username}
                  {!user.emailVerified && ' (Unverified)'}
                </span>
                {user.role === 'admin' && (
                  <a href="/admin" className="text-indigo-400 hover:text-indigo-300">
                    Admin
                  </a>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-400 hover:text-gray-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

function App() {
  const initialize = useAuthStore(state => state.initialize);
  const handleRedirectResult = useAuthStore(state => state.handleRedirectResult);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    initialize();
    handleRedirectResult();
  }, [initialize, handleRedirectResult]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Layout>
                <main>
                  <CharacterCreation />
                  <CharacterList />
                </main>
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/character/:id"
          element={
            <AuthGuard>
              <Layout>
                <CharacterProfile />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard requireAdmin>
              <Layout>
                <AdminDashboard />
              </Layout>
            </AuthGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;