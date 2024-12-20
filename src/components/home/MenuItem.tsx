import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon: Icon, 
  title, 
  onClick,
  disabled = false 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center space-x-4 p-6 
      rounded-lg backdrop-blur-sm group
      transform hover:-translate-y-1 hover:translate-x-2
      transition-all duration-300
      ${disabled 
        ? 'bg-slate-900/50 border-slate-800/50 cursor-not-allowed' 
        : 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-700/50'
      }`}
  >
    <div className={`transform group-hover:scale-110 transition-all duration-300
      ${disabled ? 'text-slate-600' : 'text-blue-400 group-hover:text-emerald-300'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <span className={`text-lg font-medium transition-colors duration-300
      ${disabled ? 'text-slate-600' : 'text-slate-200 group-hover:text-white'}`}>
      {title}
    </span>
  </button>
);

export default MenuItem;