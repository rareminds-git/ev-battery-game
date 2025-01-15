import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { levels } from '../../../data/levels';
import { Home } from "lucide-react";
import { useRecoilState } from "recoil";
import { fetchTopLevel } from "../../../composables/fetchLevel";
import { useGameProgress } from "../../../context/GameProgressContext";
import { gameScenarios } from "../../../data/recoilState";
import { auth } from "../../../firebaseConfig";
import AnimatedTitle from "../../ui/AnimatedTitle";
import CircuitLines from "../../ui/animations/CircuitLines";
import LevelCard from "./LevelCard";

const LevelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useRecoilState<any>(gameScenarios);
  const [topLevel, setTopLevel] = useState(0);
  const { completeLevel } = useGameProgress();
  useEffect(() => {
    if (auth.currentUser) {
      fetchTopLevel(auth.currentUser?.uid)
        .then((topLevel_) => {
          // console.log(topLevel);
          setTopLevel(topLevel_);
        })
        .catch((error) => console.error(error));
    }
  }, [auth.currentUser]);

  useEffect(() => {
    for (let i = 1; i <= topLevel; i++) completeLevel(i);
  }, [topLevel]);

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900 p-8 relative overflow-hidden">
      <CircuitLines />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Home Button */}
        <div className="absolute left-0 top-0">
          <button
            onClick={() => navigate("/")}
            className="group p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 
              border border-slate-700/50 hover:border-blue-500/50 
              transform hover:-translate-y-1 hover:translate-x-1
              transition-all duration-300"
          >
            <Home
              className="w-5 h-5 text-slate-400 group-hover:text-blue-400
              transition-colors duration-300"
            />
          </button>
        </div>

        <div className="space-y-12 pt-16">
          <div className="text-center pt-4 pb-10 scale-75 sm:scale-100">
            <AnimatedTitle text="DIAGNOSTIC LEVELS" className="text-center" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels?.map((level: any) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelsPage;
