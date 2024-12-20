import React, { useState } from 'react';
import { Battery, Menu, ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CluesList from './clues/CluesList';

interface GameNavbarProps {
  currentLevel: number;
  questionsAnswered: number;
  totalQuestions: number;
  accuracy: number;
  currentHint?: string;
}

const GameNavbar: React.FC<GameNavbarProps> = ({
  currentLevel,
  questionsAnswered,
  totalQuestions,
  accuracy,
  currentHint
}) => {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);
  const points = Math.floor(accuracy * questionsAnswered);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Back Button and Stats Menu */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/levels')}
              className="group p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 
                border border-slate-700/50 hover:border-blue-500/50 
                transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-400
                transform group-hover:-translate-x-1 transition-all duration-300" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowStats(!showStats)}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50
                  border border-slate-700/50 hover:border-emerald-500/50
                  transition-all duration-300 group"
              >
                <Menu className="w-5 h-5 text-slate-400 group-hover:text-emerald-400
                  transform group-hover:rotate-180 transition-all duration-300" />
              </button>

              {/* Stats Submenu */}
              {showStats && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800/90 
                  backdrop-blur-sm rounded-lg border border-slate-700 shadow-xl p-4">
                  {/* Navigation Links */}
                  <div className="mb-4 pb-4 border-b border-slate-700/50">
                    <MenuButton icon={Home} text="Home" onClick={() => navigate('/')} />
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-3">
                    <StatItem 
                      label="Accuracy" 
                      value={`${accuracy.toFixed(1)}%`}
                      color="text-emerald-400"
                    />
                    <StatItem 
                      label="Progress" 
                      value={`${questionsAnswered}/${totalQuestions}`}
                      color="text-blue-400"
                    />
                    <StatItem 
                      label="Points" 
                      value={points.toString()}
                      color="text-yellow-400"
                    />
                    
                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500
                            transition-all duration-300"
                          style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center - Level Display */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg
              border border-slate-700/50">
              <Battery className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">Level {currentLevel}</span>
            </div>
          </div>

          {/* Right - Clues Button */}
          <div className="relative">
            <CluesList levelId={currentLevel} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuButton: React.FC<{
  icon: React.FC<any>;
  text: string;
  onClick: () => void;
}> = ({ icon: Icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
      hover:bg-slate-700/50 text-slate-400 hover:text-emerald-400
      transition-all duration-200 group"
  >
    <Icon className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" />
    <span className="font-medium">{text}</span>
  </button>
);

const StatItem: React.FC<{
  label: string;
  value: string;
  color: string;
}> = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className={`font-medium ${color}`}>{value}</span>
  </div>
);

export default GameNavbar;