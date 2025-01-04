import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fetchGameProgress,
  saveGameProgress,
} from "../../composables/gameProgress";
import { useGameProgress } from "../../context/GameProgressContext";
import {
  gameLevelId,
  gamePoints,
  gameScenarios,
  getScenarioById,
} from "../../data/recoilState";
import { auth } from "../../firebaseConfig";
import { DiagnosticQuestion, DiagnosticScenario } from "../../types/game";
import TypewriterText from "../ui/TypewriterText";
import GameIllustration from "./GameIllustration";
import GameNavbar from "./GameNavbar";
import { DiagnosticPhase } from "./diagnostic";
import { ConfirmationModal, ErrorAnimation, SuccessModal } from "./feedback";
import TimeOutModal from "./feedback/TimeOutModal";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { completeLevel } = useGameProgress();
  const getScenario = useRecoilValue(getScenarioById);
  const [scenarios, setScenarios] = useRecoilState<DiagnosticScenario[] | null>(
    gameScenarios
  );
  const [_gameLevelId, setGameLevelId] = useRecoilState(gameLevelId);
  const [scenario, setScenario] = useState<DiagnosticScenario | null>();
  const [relevantQuestions, setRelevantQuestions] = useState<any>();
  const [irrelevantQuestions, setIrrelevantQuestions] = useState<any>();
  const [accuracy, setAccuracy] = useState<any>();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingOption, setPendingOption] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [_gamePoints, _setGamePoints] = useRecoilState(gamePoints);
  const [timeOut, setTimeOut] = useState(false);

  const [gameState, setGameState] = useState({
    answeredQuestions: [] as string[],
    showResolution: true,
    selectedResolution: [] as string[],
    completed: false,
    timeLeft: 300,
    score: 0,
  });

  useEffect(() => {
    console.log(levelId);
    if (levelId) {
      setGameLevelId(levelId);
    }
  }, [levelId]);

  useEffect(() => {
    try {
      if (levelId) setScenario(getScenario);
      console.log(levelId);
      console.log(scenario);
      if (scenario == null || scenario == undefined) return;
      const relevantQuestions_ = scenario.questions.filter((q) => q.isRelevant);
      setRelevantQuestions(relevantQuestions_);
      const irrelevantQuestions_ = scenario.questions.filter(
        (q) => q.isRelevant == false
      );
      setIrrelevantQuestions(irrelevantQuestions_);
    } catch (error) {
      console.error("Error fetching scenario:", error);
      navigate("/levels");
    }
  }, [_gameLevelId, navigate, scenarios]);

  const handleSelectQuestion = useCallback(
    (question: DiagnosticQuestion) => {
      if (!gameState.answeredQuestions.includes(question.text)) {
        setGameState((prev) => ({
          ...prev,
          answeredQuestions: [...prev.answeredQuestions, question.text],
        }));
      }
    },
    [gameState.answeredQuestions]
  );

  const handleResolutionAttempt = useCallback((optionId: string) => {
    setPendingOption(optionId);
    setShowConfirmation(true);
  }, []);

  const handleConfirmResolution = useCallback(() => {
    if (!pendingOption || !scenario) return;

    const option = scenario.resolutionQuestion.options.find(
      (opt) => opt.id === pendingOption
    );

    setShowConfirmation(false);
    setGameState((prev) => ({
      ...prev,
      selectedResolution: [
        ...(gameState.selectedResolution || []),
        pendingOption,
      ],
      // completed: false,
    }));

    if (option?.isCorrect) {
      setGameState((prev) => ({
        ...prev,
        completed: true,
      }));
      completeLevel(scenario.id);
      setShowSuccess(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  }, [pendingOption, scenario, completeLevel]);

  const handleNextLevel = useCallback(() => {
    setShowSuccess(false);
    setTimeOut(false);
    const nextLevel = Number(levelId) + 1;

    setGameState({
      answeredQuestions: [],
      showResolution: true,
      selectedResolution: [],
      completed: false,
      timeLeft: 300,
      score: 0,
    });

    if (scenarios?.some((s) => s.id === nextLevel)) {
      navigate(`/game/${nextLevel}`, { replace: true });
    } else {
      navigate("/levels", { replace: true });
    }
  }, [levelId, navigate]);

  const user = auth.currentUser;

  // useEffect(() => {
  //   const fetchScenario = async () => {
  //     try {
  //       const scenario_: any = await fetchLevelById(levelId);
  //       setScenario(scenario_);
  //       const relevantQuestions_ = scenario_.questions.filter(
  //         (q) => q.isRelevant
  //       );
  //       setRelevantQuestions(relevantQuestions_);
  //       const irrelevantQuestions_ = scenario_.questions.filter(
  //         (q) => q.isRelevant == false
  //       );
  //       setIrrelevantQuestions(irrelevantQuestions_);
  //     } catch (error) {
  //       console.error("Error fetching scenario:", error);
  //       navigate("/levels");
  //     }
  //   };

  //   fetchScenario();
  // }, [levelId, navigate]);

  useEffect(() => {
    if (relevantQuestions && gameState.answeredQuestions.length > 0) {
      const relevantAnswers = gameState.answeredQuestions.filter((q) =>
        relevantQuestions.some((rq) => rq.text === q)
      ).length;
      const irrelevantAnswers = gameState.answeredQuestions.filter((q) =>
        irrelevantQuestions.some((rq) => rq.text === q)
      ).length;
      setAccuracy(
        scenario?.questions.length &&
          (relevantAnswers / scenario?.questions.length) * 100
      );
    } else {
      setAccuracy(0);
    }
  }, [gameState.answeredQuestions, relevantQuestions, irrelevantQuestions]);

  useEffect(() => {
    if (user != null && levelId) {
      fetchGameProgress(user.uid, levelId)
        .then((progress) => {
          if (progress) {
            // Handle the fetched progress
            console.log("Player's progress:", progress);
            setGameState({
              answeredQuestions: progress.answeredQuestions,
              showResolution: progress.showResolution,
              selectedResolution: progress.selectedResolution,
              completed: progress.completed,
              timeLeft: progress.timeLeft,
              score: progress.score,
            });
          } else {
            // Handle case where no progress exists
            console.log("No progress found.");
            saveGameProgress(user.uid, gameState, levelId);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No user logged in.");
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    if (user && levelId && scenario)
      saveGameProgress(user.uid, gameState, levelId);
  }, [gameState]);

  useEffect(() => {
    if (gameState.timeLeft <= 0) {
      if (!gameState.completed) {
        if (scenario) completeLevel(scenario.id);
        setTimeOut(true);
      }
      setGameState((prev) => ({
        ...prev,
        completed: true,
        timeLeft: 0,
      }));

      return;
    }

    const timerId = setInterval(() => {
      if (gameState.completed) return () => clearInterval(timerId);
      setGameState((prev) => ({
        ...prev,
        timeLeft: gameState.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, [gameState.timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {scenario != null && (
        <>
          <GameNavbar
            currentLevel={scenario.id}
            questionsAnswered={gameState.answeredQuestions.length}
            totalQuestions={scenario.questions.length}
            accuracy={accuracy}
            currentHint={
              scenario.questions.find(
                (q) => !gameState.answeredQuestions.includes(q.text)
              )?.hint
            }
            timeLeft={gameState.timeLeft}
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
                showResolution={gameState.completed}
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
            text="Are you sure you want to select this answer?"
            option={
              scenario.resolutionQuestion.options.find(
                (opt) => opt.id === pendingOption
              )?.text || ""
            }
          />
          <SuccessModal
            isOpen={showSuccess}
            onNext={handleNextLevel}
            currentLevel={scenario.id}
          />
          <TimeOutModal
            isOpen={timeOut}
            onNext={handleNextLevel}
            currentLevel={scenario.id}
          />
          <AnimatePresence>{showError && <ErrorAnimation />}</AnimatePresence>
        </>
      )}
    </div>
  );
};

export default GamePage;
