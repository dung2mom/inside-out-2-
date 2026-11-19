import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const { isSigningIn, authError, signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-[#0e1915] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-amber-400 selection:text-slate-950">
      <AuthCard
        onGoogleLogin={signInWithGoogle}
        isLoading={isSigningIn}
        errorMessage={authError}
      />

      <footer className="mt-8 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 Yeon Jeong Kim. All rights reserved.</p>
        <p>Inside Out 2 © Disney/Pixar. Film dialogue and characters are used for educational purposes only.</p>
      </footer>
    </div>
  );
};
