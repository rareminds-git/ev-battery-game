import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: LucideIcon;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, icon: Icon }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400
            transition-colors duration-300" />
        )}
        <span className="text-slate-300 group-hover:text-white
          transition-colors duration-300">
          {label}
        </span>
      </div>
      
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300
          ${checked ? 'bg-blue-500' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full 
          bg-white transition-transform duration-300
          ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </label>
  );
};

export default Toggle;