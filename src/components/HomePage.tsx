import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, FastForward, Download, BookOpen, Settings, LogOut } from 'lucide-react';

export const MenuItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}> = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
  >
    <div className="text-blue-600">{icon}</div>
    <span className="text-lg font-semibold text-gray-800">{title}</span>
  </button>
);

const HomePage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          EV Battery Fault Diagnosis System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MenuItem
            icon={<Play className="w-6 h-6" />}
            title="Start Game"
            onClick={() => console.log('Start Game')}
          />
          <MenuItem
            icon={<FastForward className="w-6 h-6" />}
            title="Continue"
            onClick={() => console.log('Continue')}
          />
          <MenuItem
            icon={<Download className="w-6 h-6" />}
            title="Load Game"
            onClick={() => console.log('Load Game')}
          />
          <MenuItem
            icon={<BookOpen className="w-6 h-6" />}
            title="Instructions"
            onClick={() => console.log('Instructions')}
          />
          <MenuItem
            icon={<Settings className="w-6 h-6" />}
            title="Settings"
            onClick={() => console.log('Settings')}
          />
          <MenuItem
            icon={<LogOut className="w-6 h-6" />}
            title="Logout"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};