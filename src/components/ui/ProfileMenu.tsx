import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut } from 'lucide-react';

const ProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
          bg-slate-800/50 hover:bg-slate-700/50 
          border border-slate-700/50 hover:border-blue-500/50
          transition-all duration-300 group min-w-[120px]"
      >
        <User className="w-5 h-5 text-slate-400 group-hover:text-blue-400
          transition-colors duration-300" />
        <span className="text-slate-300 group-hover:text-white
          transition-colors duration-300">
          {user.username}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2
          bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700
          shadow-xl overflow-hidden z-50 min-w-[120px] w-full">
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-2 px-4 py-3
              text-red-400 hover:text-red-300 hover:bg-red-500/10
              transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;