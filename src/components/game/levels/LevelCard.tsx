import {
  Lock
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameProgress } from "../../../context/GameProgressContext";
import { LevelImgs } from "../../../data/levelIcons";
import { Level } from "../../../types/game";
import { getDifficultyBadge } from "../../../utils/difficultyBadge";

interface LevelCardProps {
  level: Level;
}

const LevelCard: React.FC<LevelCardProps> = ({ level }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const { progress } = useGameProgress();

  const isUnlocked =
    level.id === 1 || progress.completedLevels.includes(level.id - 1);
  const isCompleted = progress.completedLevels.includes(level.id);

  const getBatteryIcon = (id: number) => {
    const icons = LevelImgs;
    return icons[id - 1];
  };

  const Icon = getBatteryIcon(level.id);
  const difficulty = getDifficultyBadge(level.id);

  const handleStartLevel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUnlocked) {
      navigate(`/game/${level.id}`);
    }
  };

  return (
    <div
      className={`group h-[400px] perspective-1000 cursor-pointer 
        ${!isUnlocked && "opacity-75 cursor-not-allowed"}`}
      onMouseEnter={() => isUnlocked && setIsFlipped(true)}
      onMouseLeave={() => isUnlocked && setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 
          transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-visibility-hidden">
          <div
            className={`h-full rounded-lg p-6
            border group-hover:border-blue-500/50
            flex flex-col items-center justify-center gap-6
            transition-all duration-300
            ${
              isUnlocked
                ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
                : "bg-slate-900/50 border-slate-800/50"
            }`}
          >
            <div className="relative">
              {isUnlocked ? (
                <>
                  {/* <Icon className={`w-24 h-24 transition-colors duration-300
                    ${isCompleted 
                      ? 'text-emerald-400 group-hover:text-emerald-300' 
                      : 'text-blue-400 group-hover:text-blue-300'
                    }`} /> */}
                  <img src={Icon} className="h-[120px]"/>
                  <div
                    className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full
                    group-hover:bg-emerald-400/20 transition-colors duration-300"
                  />
                </>
              ) : (
                <Lock className="w-24 h-24 text-slate-600" />
              )}
            </div>

            <div className="text-center">
              <h3
                className={`text-3xl font-bold mb-3
                ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-400 to-blue-400"
                    : isUnlocked
                    ? "bg-gradient-to-r from-blue-400 to-emerald-400"
                    : "bg-gradient-to-r from-slate-400 to-slate-500"
                } bg-clip-text text-transparent`}
              >
                Level {level.id}
              </h3>
              <p
                className={`text-lg mb-2 text-center
                ${isUnlocked ? "text-blue-300" : "text-slate-500"}`}
              >
                {level.title}
              </p>
              <div
                className={`inline-flex px-3 py-1 rounded-full 
                border ${difficulty.colors}`}
              >
                <span className="text-sm font-medium">{difficulty.text}</span>
              </div>
            </div>

            {isUnlocked ? (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 
                text-slate-400 text-sm opacity-60"
              >
                {isCompleted
                  ? "Completed - Click to replay"
                  : "Hover to see details"}
              </div>
            ) : (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 
                text-slate-500 text-sm"
              >
                Complete Level {level.id - 1} to unlock
              </div>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-visibility-hidden rotate-y-180">
          <div
            className="h-full bg-slate-800/50 backdrop-blur-sm rounded-lg p-6
            border border-slate-700/50 group-hover:border-emerald-500/50
            flex flex-col items-center justify-center transition-all duration-300"
          >
            <div className="text-center flex-grow flex items-center justify-center">
              <p
                className="text-2xl font-medium bg-gradient-to-r from-blue-300 via-emerald-300 to-blue-300 
                bg-clip-text text-transparent animate-pulse"
              >
                {level.symptoms}
              </p>
            </div>

            <button
              onClick={handleStartLevel}
              className={`mt-4 w-full py-3 px-4 rounded-md transform 
                hover:-translate-y-1 transition-all duration-300 font-medium
                ${
                  isUnlocked
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
            >
              {isCompleted
                ? "View Level"
                : isUnlocked
                ? "Start Diagnosis"
                : "Locked"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
