import { Home, LogOut } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AnimatedTitle from '../ui/AnimatedTitle';
import CircuitLines from '../ui/animations/CircuitLines';
import GameplaySettings from './sections/GameplaySettings';
import SoundSettings from './sections/SoundSettings';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8 relative overflow-hidden">
      <CircuitLines />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Home Button */}
        <div className="absolute left-0 top-0">
          <button
            onClick={() => navigate('/')}
            className="group p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 
              border border-slate-700/50 hover:border-blue-500/50 
              transform hover:-translate-y-1 hover:translate-x-1
              transition-all duration-300"
          >
            <Home className="w-5 h-5 text-slate-400 group-hover:text-blue-400
              transition-colors duration-300" />
          </button>
        </div>

        <div className="space-y-12 pt-16">
          <AnimatedTitle text="SETTINGS" className="text-center" />
          
          <div className="space-y-8">
            <SoundSettings />
            {/* <LanguageSettings /> */}
            <GameplaySettings />
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4
                bg-red-500/10 hover:bg-red-500/20 
                border border-red-500/20 hover:border-red-500/30
                rounded-lg text-red-400 hover:text-red-300
                transform hover:-translate-y-1 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;