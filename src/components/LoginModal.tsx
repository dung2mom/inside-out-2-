import React, { useEffect } from 'react';
import { AuthCard } from './AuthCard';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, isSigningIn, authError, clearAuthError, signInWithGoogle } =
    useAuth();

  // Close popup automatically as soon as login succeeds
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      onClose();
    }
  }, [isOpen, isAuthenticated, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearAuthError();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, clearAuthError]);

  if (!isOpen) return null;

  const handleClose = () => {
    clearAuthError();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <AuthCard
          showCloseButton
          onClose={handleClose}
          onGoogleLogin={signInWithGoogle}
          isLoading={isSigningIn}
          errorMessage={authError}
        />
      </div>
    </div>
  );
};
