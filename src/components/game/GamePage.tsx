import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scenarios } from '../../data/diagnosticScenarios';
import { DiagnosticQuestion } from '../../types/game';
import { useGameProgress } from '../../context/GameProgressContext';
import GameNavbar from './GameNavbar';
import GameIllustration from './GameIllustration';
import { DiagnosticPhase } from './diagnostic';
import TypewriterText from '../ui/TypewriterText';
import { ConfirmationModal, SuccessModal, ErrorAnimation } from './feedback';
import { AnimatePresence } from 'framer-motion';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { completeLevel } = useGameProgress();
  const scenario = scenarios.find(s => s.id === Number(levelId));
  
  const [gameState, setGameState] = useState({
    answeredQuestions: [] as string[],
    showResolution: true,
    selectedResolution: undefined as string | undefined,
    completed: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingOption, setPendingOption] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const handleSelectQuestion = useCallback((question: DiagnosticQuestion) => {
    if (!gameState.answeredQuestions.includes(question.text)) {
      setGameState(prev => ({
        ...prev,
        answeredQuestions: [...prev.answeredQuestions, question.text]
      }));
    }
  }, [gameState.answeredQuestions]);

  const handleResolutionAttempt = useCallback((optionId: string) => {
    setPendingOption(optionId);
    setShowConfirmation(true);
  }, []);

  const handleConfirmResolution = useCallback(() => {
    if (!pendingOption || !scenario) return;

    const option = scenario.resolutionQuestion.options.find(
      opt => opt.id === pendingOption
    );

    setShowConfirmation(false);
    setGameState(prev => ({
      ...prev,
      selectedResolution: pendingOption,
      completed: true
    }));

    if (option?.isCorrect) {
      completeLevel(scenario.id);
      setShowSuccess(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  }, [pendingOption, scenario, completeLevel]);

  const handleNextLevel = useCallback(() => {
    setShowSuccess(false);
    const nextLevel = Number(levelId) + 1;
    
    setGameState({
      answeredQuestions: [],
      showResolution: true,
      selectedResolution: undefined,
      completed: false
    });

    if (scenarios.some(s => s.id === nextLevel)) {
      navigate(`/game/${nextLevel}`, { replace: true });
    } else {
      navigate('/levels', { replace: true });
    }
  }, [levelId, navigate]);

  if (!scenario) {
    navigate('/levels');
    return null;
  }

  const relevantQuestions = scenario.questions.filter(q => q.isRelevant);
  const accuracy = gameState.answeredQuestions.length > 0
    ? (gameState.answeredQuestions.filter(q => 
        relevantQuestions.some(rq => rq.text === q)
      ).length / relevantQuestions.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <GameNavbar 
        currentLevel={scenario.id}
        questionsAnswered={gameState.answeredQuestions.length}
        totalQuestions={relevantQuestions.length}
        accuracy={accuracy}
        currentHint={scenario.questions.find(q => 
          !gameState.answeredQuestions.includes(q.text)
        )?.hint}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              {scenario.title}
            </h1>
            <TypewriterText 
              text={scenario.description} 
              className="text-lg text-slate-300"
            />
          </div>

          <GameIllustration 
            levelId={scenario.id}
            questionIndex={gameState.answeredQuestions.length}
          />
          
          <DiagnosticPhase
            questions={scenario.questions}
            answeredQuestions={gameState.answeredQuestions}
            onSelectQuestion={handleSelectQuestion}
            resolutionQuestion={scenario.resolutionQuestion}
            selectedResolution={gameState.selectedResolution}
            onSelectResolution={handleResolutionAttempt}
            showResolution={gameState.showResolution}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmResolution}
        onCancel={() => {
          setShowConfirmation(false);
          setPendingOption(null);
        }}
        option={scenario.resolutionQuestion.options.find(
          opt => opt.id === pendingOption
        )?.text || ''}
      />

      <SuccessModal
        isOpen={showSuccess}
        onNext={handleNextLevel}
        currentLevel={scenario.id}
      />

      <AnimatePresence>
        {showError && <ErrorAnimation />}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;