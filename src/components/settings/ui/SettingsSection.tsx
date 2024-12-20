import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  title, 
  icon: Icon, 
  children 
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6
      border border-slate-700/50 hover:border-blue-500/50
      transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default SettingsSection;