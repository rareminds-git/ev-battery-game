import { motion } from 'framer-motion';
import React from 'react';
import { DiagnosticQuestion, ResolutionOption } from '../../../types/game';
import QuestionCard from './QuestionCard';
import ResolutionPhase from './ResolutionPhase';

interface DiagnosticPhaseProps {
  questions: DiagnosticQuestion[];
  answeredQuestions: string[];
  onSelectQuestion: (question: DiagnosticQuestion) => void;
  resolutionQuestion: {
    text: string;
    options: ResolutionOption[];
  };
  selectedResolution?: string[];
  onSelectResolution: (optionId: string) => void;
  showResolution: boolean;
}

const DiagnosticPhase: React.FC<DiagnosticPhaseProps> = ({
  questions,
  answeredQuestions,
  onSelectQuestion,
  resolutionQuestion,
  selectedResolution,
  onSelectResolution,
  showResolution
}) => {
  return (
    <div className="space-y-6">
      {/* Diagnostic Questions */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
      >
        <h3 className="text-lg font-medium text-white mb-4">
          Diagnostic Questions
        </h3>
        <div className="grid gap-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              isAnswered={answeredQuestions.includes(question.text)}
              onSelect={() => onSelectQuestion(question)}
            />
          ))}
        </div>
      </motion.div>

      {/* Resolution Question */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ResolutionPhase
          question={resolutionQuestion.text}
          options={resolutionQuestion.options}
          selectedOption={selectedResolution}
          onSelectOption={onSelectResolution}
          enabled={showResolution}
        />
      </motion.div>
    </div>
  );
};

export default DiagnosticPhase;