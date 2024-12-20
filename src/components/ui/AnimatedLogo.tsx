import React from 'react';
import DriftingCar from './animations/DriftingCar';
import CircuitLines from './animations/CircuitLines';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="transform-gpu transition-transform duration-500 hover:scale-110">
        <DriftingCar className="relative z-10" />
        <CircuitLines />
      </div>
    </div>
  );
};

export default AnimatedLogo;