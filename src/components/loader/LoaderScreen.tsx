import React, { useEffect, useState } from 'react';
import GlowingTitle from '../ui/GlowingTitle';
import BatteryLoader from './BatteryLoader';
import CircuitLines from '../ui/animations/CircuitLines';

interface LoaderScreenProps {
  onComplete: () => void;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        onComplete();
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 
      flex flex-col items-center justify-center relative overflow-hidden">
      <CircuitLines />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-48 h-48 mb-12">
          <BatteryLoader progress={progress} />
        </div>
        
        <GlowingTitle className="mb-16">
          EV Battery Fault Diagnosis System
        </GlowingTitle>
        
        <div className="text-blue-400 font-medium">
          System Loading... {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;