import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProgressProvider } from './context/GameProgressContext';
import { SettingsProvider } from './context/SettingsContext';
import { LoaderScreen } from './components/loader';
import { Auth } from './components/auth';
import HomePage from './components/home/HomePage';
import LevelsPage from './components/game/levels/LevelsPage';
import GamePage from './components/game/GamePage';
import { InstructionsPage } from './components/instructions';
import SettingsPage from './components/settings/SettingsPage';
import ProfileMenu from './components/ui/ProfileMenu';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoaderScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <ProfileMenu />
        </div>
      )}
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="/game/:levelId" element={<GamePage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <GameProgressProvider>
          <Router>
            <AppContent />
          </Router>
        </GameProgressProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;