import { BookOpen, FastForward, LogOut, Play, Settings } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AnimatedLogo from '../ui/AnimatedLogo';
import CircuitLines from '../ui/animations/CircuitLines';
import GlowingTitle from '../ui/GlowingTitle';
import MenuItem from './MenuItem';

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Play, title: 'Start Game', onClick: () => navigate('/levels') },
    { icon: FastForward, title: 'Continue', onClick: () => navigate('/levels') },
    { icon: BookOpen, title: 'Instructions', onClick: () => navigate('/instructions') },
    { icon: Settings, title: 'Settings', onClick: () => navigate('/settings') },
    { icon: LogOut, title: 'Logout', onClick: logout },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8 relative overflow-hidden flex items-center">
      <CircuitLines />
      <div className="max-w-md mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <AnimatedLogo className="w-16 h-16" />
          <GlowingTitle className="text-3xl">
            EV Battery Fault Diagnosis
          </GlowingTitle>
        </div>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;