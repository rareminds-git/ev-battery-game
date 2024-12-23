import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';
import { ResolutionOption } from '../../../types/game';

interface ResolutionPhaseProps {
  question: string;
  options: ResolutionOption[];
  selectedOption?: string[];
  onSelectOption: (optionId: string) => void;
  enabled: boolean;
}

const ResolutionPhase: React.FC<ResolutionPhaseProps> = ({
  question,
  options,
  selectedOption,
  onSelectOption,
  enabled
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-medium text-white mb-6">
        Resolution
      </h3>
      
      <p className="text-lg text-slate-300 mb-6">{question}</p>
      
      <div className="grid gap-4">
        {options.map((option) => {
          const isSelected = selectedOption?.includes(option.id);
          const showResult = selectedOption?.includes(option.id);
          
          return (
            <motion.button
              key={option.id}
              onClick={() => !showResult && onSelectOption(option.id)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                showResult
                  ? option.isCorrect
                    ? 'bg-emerald-900/20 border-emerald-500/30'
                    : isSelected
                      ? 'bg-red-900/20 border-red-500/30'
                      : 'bg-slate-800/50 border-slate-700/50'
                  : 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-200">{option.text}</span>
                {showResult && (option.isCorrect || isSelected) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {option.isCorrect
                      ? <CheckCircle className="w-5 h-5 text-emerald-400" />
                      : <XCircle className="w-5 h-5 text-red-400" />
                    }
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ResolutionPhase;