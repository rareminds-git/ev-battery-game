import React from 'react';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => (
  <button
    onClick={onToggle}
    className="text-sm text-blue-400 hover:text-emerald-300 
      transition-colors duration-300"
  >
    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
  </button>
);

export default AuthToggle;