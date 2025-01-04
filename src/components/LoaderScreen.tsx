import React, { useEffect, useState } from 'react';
import { Battery } from 'lucide-react';

export const LoaderScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center">
      <div className="animate-bounce mb-8">
        <Battery className="w-24 h-24 text-blue-400" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">
        EV Battery Fault Diagnosis System
      </h1>
      <div className="w-64 h-2 bg-blue-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};