import React, { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLogin: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ isLogin, ...props }) => (
  <button
    {...props}
    className="w-full py-3 px-4 border border-transparent rounded-md
      text-sm font-medium text-white
      bg-gradient-to-r from-blue-600 to-blue-700
      hover:from-blue-500 hover:to-emerald-500
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      transform hover:-translate-y-0.5 transition-all duration-300
      shadow-lg hover:shadow-xl"
  >
    {isLogin ? 'Sign In' : 'Sign Up'}
  </button>
);

export default AuthButton;