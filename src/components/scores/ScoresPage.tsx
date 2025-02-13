import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Award, Home, Star, Target, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserStats } from "../../composables/gameProgress";
import { auth, db } from "../../firebaseConfig";
import { PlayerScore } from "../../types/game";
import CircuitLines from "../ui/animations/CircuitLines";

const ScoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const listenToLeaderboard = () => {
    try {
      const leaderboardRef = collection(db, "leaderboard");
      const leaderboardQuery = query(
        leaderboardRef,
        orderBy("totalScore", "desc"),
        limit(10)
      );

      // Real-time listener
      const unsubscribe = onSnapshot(leaderboardQuery, (snapshot) => {
        const scores = snapshot.docs.map((doc) => ({
          username: doc.data().username,
          totalScore: doc.data().totalScore,
          accuracy: doc.data().accuracy,
          completedLevels: doc.data().completedLevels,
        }));

        setPlayerScores(scores); // Update the scores in your app state
      });

      return unsubscribe; // Return the unsubscribe function to stop listening
    } catch (error) {
      console.error("Error setting up leaderboard listener:", error);
    }
  };

  useEffect(() => {
    // Start listening to the leaderboard
    const unsubscribe = listenToLeaderboard();

    // Cleanup listener when component unmounts
    if (unsubscribe) {
      return () => unsubscribe();
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (auth.currentUser) setUserId(auth.currentUser.uid);
  }, [auth]);

  useEffect(() => {
    const fetchScores = async () => {
      if (!auth.currentUser) return;

      try {
        if (!userId) return;
        const data = await fetchUserStats(userId);

        let totalScore = data?.totalScore;
        let totalAccuracy = data?.totalAccuracy;
        let completedLevels = data?.completedLevels;
        if (
          completedLevels != undefined &&
          totalAccuracy != undefined &&
          totalScore != undefined
        )
          setUserStats({
            totalScore,
            averageAccuracy:
              completedLevels > 0 ? totalAccuracy / completedLevels : 0,
            completedLevels,
          });

        // const scores = await fetchLeaderboard();
        // if (scores) setPlayerScores(scores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [userId]);

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900 p-8 relative overflow-hidden">
      <CircuitLines />

      <div className="max-w-4xl mx-auto relative z-10">
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
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r 
              from-blue-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent 
              animate-pulse relative z-10 tracking-tight"
            >
              Performance Scores
            </h1>
            <div className="mt-2 text-slate-400 text-sm md:text-base">
              Track your progress and compete globally
            </div>
          </div>

          {/* Player Stats */}
          {userStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={Trophy}
                title="Total Score"
                value={userStats.totalScore.toFixed(2)}
                color="text-yellow-400"
              />
              <StatCard
                icon={Target}
                title="Average Accuracy"
                value={`${userStats.averageAccuracy.toFixed(1)}%`}
                color="text-emerald-400"
              />
              <StatCard
                icon={Award}
                title="Completed Levels"
                value={userStats.completedLevels}
                color="text-blue-400"
              />
            </div>
          )}

          {/* Leaderboard */}
          <div
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6
            border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Global Leaderboard
              </h2>
            </div>

            <div className="space-y-4">
              {playerScores.map((score, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4
                    bg-slate-700/30 rounded-lg border border-slate-600/30"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-bold ${
                        index === 0
                          ? "text-yellow-400"
                          : index === 1
                          ? "text-slate-300"
                          : index === 2
                          ? "text-amber-600"
                          : "text-slate-400"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-white font-medium">{score.username}</p>
                      <p className="text-sm text-slate-400">
                        Accuracy: {score.accuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">
                      {score.totalScore.toFixed(2)} (
                      {(score.totalScore / score.completedLevels).toFixed(2)}{" "}
                      Avg)
                    </p>
                    <p className="text-sm text-slate-400">
                      {score.completedLevels} levels
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.FC<any>;
  title: string;
  value: string | number;
  color: string;
}> = ({ icon: Icon, title, value, color }) => (
  <div
    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6
    border border-slate-700/50 hover:border-blue-500/50
    transform hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-slate-700/50">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default ScoresPage;
