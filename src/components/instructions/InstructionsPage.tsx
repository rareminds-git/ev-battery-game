import { Award, Battery, Brain, Home, Shield, Target, Zap } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTitle from '../ui/AnimatedTitle';
import CircuitLines from '../ui/animations/CircuitLines';

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900 p-8 relative overflow-hidden">
      <CircuitLines />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Home Button */}
        <div className="absolute left-0 top-0">
          <button
            onClick={() => navigate('/')}
            className="group p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 
              border border-slate-700/50 hover:border-blue-500/50 
              transform hover:-translate-y-1 hover:translate-x-1
              transition-all duration-300"
          >
            <Home className="w-5 h-5 text-slate-400 group-hover:text-blue-400
              transition-colors duration-300" />
          </button>
        </div>

        <div className="space-y-12 pt-16">
          {/* Title */}
          <div className="text-center space-y-4">
            <AnimatedTitle 
              text="HOW TO PLAY" 
              className="text-center"
            />
            <p className="text-slate-300 text-lg">
              Master the art of EV battery diagnostics through interactive scenarios
            </p>
          </div>

          {/* Instructions Sections */}
          <div className="grid gap-8">
            <InstructionCard
              icon={Target}
              title="Objective"
              description="Diagnose and resolve EV battery issues by analyzing symptoms, asking relevant questions, and selecting the correct resolution."
            />

            <InstructionCard
              icon={Brain}
              title="Diagnostic Process"
              description="Each level presents a unique battery issue. Examine the symptoms, gather clues, and systematically investigate the problem through targeted questions."
            />

            <InstructionCard
              icon={Battery}
              title="Question Selection"
              description="Choose questions carefully - some are relevant to the diagnosis while others may be misleading. Your accuracy affects your final score."
            />

            <InstructionCard
              icon={Shield}
              title="Resolution"
              description="After gathering sufficient information, select the most appropriate solution from the available options to resolve the battery issue."
            />

            <InstructionCard
              icon={Award}
              title="Progress"
              description="Complete levels to unlock new, more challenging scenarios. Each successful diagnosis improves your expertise and unlocks advanced cases."
            />

            <InstructionCard
              icon={Zap}
              title="Tips"
              description="Pay attention to clues, use hints when stuck, and learn from incorrect diagnoses to improve your troubleshooting skills."
            />
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/levels')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600
                hover:from-blue-500 hover:to-emerald-500 text-white rounded-lg
                font-medium transform hover:scale-105 transition-all duration-300"
            >
              Start Diagnosing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstructionCard: React.FC<{
  icon: React.FC<any>;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6
    border border-slate-700/50 hover:border-blue-500/50
    transform hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-blue-500/20">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  </div>
);

export default InstructionsPage;