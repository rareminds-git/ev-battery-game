import React from 'react';
import AnimatedLogo from '../ui/AnimatedLogo';

interface AuthHeaderProps {
  isLogin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => (
  <>
    <div className="flex justify-center mb-8">
      <AnimatedLogo className="w-24 h-24" />
    </div>
    <h2 className="text-3xl font-bold text-center mb-8 
      bg-gradient-to-r from-blue-400 via-emerald-300 to-blue-400 
      bg-clip-text text-transparent animate-pulse">
      {isLogin ? 'Welcome Back' : 'Create Account'}
    </h2>
  </>
);

export default AuthHeader;