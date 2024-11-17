import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Mail } from 'lucide-react';

export const VerifyEmail = () => {
  const { user, resendVerificationEmail, error } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <Mail className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to {user.email}. Please check your inbox and click the verification link.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          onClick={resendVerificationEmail}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};