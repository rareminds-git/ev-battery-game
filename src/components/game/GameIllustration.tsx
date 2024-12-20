import React from 'react';
import { Battery, BatteryCharging, BatteryFull, BatteryLow } from 'lucide-react';
import CircuitLines from '../ui/animations/CircuitLines';

interface GameIllustrationProps {
  levelId: number;
  questionIndex: number;
}

const GameIllustration: React.FC<GameIllustrationProps> = ({ levelId, questionIndex }) => {
  const getIllustration = () => {
    const icons = [Battery, BatteryLow, BatteryCharging, BatteryFull];
    const Icon = icons[questionIndex % icons.length];
    
    return (
      <div className="relative transform hover:scale-105 transition-all duration-500">
        <Icon className="w-full h-full text-blue-400" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20
          rounded-full blur-xl animate-pulse" />
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700
      flex items-center justify-center relative overflow-hidden">
      <CircuitLines />
      <div className="relative z-10 w-64 h-64">
        {getIllustration()}
      </div>
    </div>
  );
};

export default GameIllustration;