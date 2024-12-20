import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';
import { FormData } from '../../types/auth';
import AnimatedLogo from '../ui/AnimatedLogo';
import CircuitLines from '../ui/animations/CircuitLines';
import AuthHeader from './AuthHeader';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: '1',
      username: formData.username,
      email: formData.email,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 
      flex items-center justify-center p-4 relative overflow-hidden">
      <CircuitLines />
      <div className="bg-white/10 rounded-lg shadow-2xl p-8 
        w-full max-w-md relative z-10">
        <AuthHeader isLogin={isLogin} />
        <AuthForm
          isLogin={isLogin}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        <div className="mt-6 text-center">
          <AuthToggle isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
        </div>
      </div>
    </div>
  );
};

export default Auth;