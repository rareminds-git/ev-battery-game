import React from 'react';
import { DiagnosticQuestion } from '../../../types/game';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSound } from '../../../hooks/useSound';

interface QuestionCardProps {
  question: DiagnosticQuestion;
  isAnswered: boolean;
  onSelect: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isAnswered,
  onSelect,
}) => {
  const { playClick } = useSound();

  const handleClick = () => {
    if (!isAnswered) {
      playClick();
      onSelect();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isAnswered}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
        isAnswered
          ? question.isRelevant
            ? 'bg-emerald-900/20 border border-emerald-500/30'
            : 'bg-red-900/20 border border-red-500/30'
          : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <AnimatePresence mode="wait">
            {isAnswered ? (
              <motion.div
                key="answered"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {question.isRelevant ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </motion.div>
            ) : (
              <HelpCircle className="w-5 h-5 text-slate-400" />
            )}
          </AnimatePresence>
        </div>
        <div>
          <p className="text-slate-200">{question.text}</p>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2"
            >
              <p className={`text-sm font-medium ${
                question.isRelevant ? 'text-emerald-400' : 'text-red-400'
              }`}>
                Answer: {question.answer}
              </p>
              {!question.isRelevant && question.explanation && (
                <p className="text-sm text-red-300/70 mt-1">
                  Note: {question.explanation}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default QuestionCard;