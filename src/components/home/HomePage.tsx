import { BookOpen, FastForward, Play, Settings, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkGameProgress,
  deleteLeaderboardRecord,
  deleteLevelRecords,
} from "../../composables/gameProgress";
import { useGameProgress } from "../../context/GameProgressContext";
import { auth } from "../../firebaseConfig";
import { ConfirmationModal } from "../game/feedback";
import AnimatedLogo from "../ui/AnimatedLogo";
import CircuitLines from "../ui/animations/CircuitLines";
import GlowingTitle from "../ui/GlowingTitle";
import MenuItem from "./MenuItem";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [hasProgress, setHasProgress] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { resetCompleteLevel } = useGameProgress();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUserId(auth.currentUser.uid);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (userId != null) {
      const fetchProgress = async () => {
        try {
          const progressExists = await checkGameProgress(userId);
          setHasProgress(progressExists);
        } catch (error) {
          console.error("Error checking game progress:", error);
        }
      };
      fetchProgress();
    }
  }, [userId]);

  useEffect(() => {
    setMenuItems([
      {
        icon: Play,
        title: "Start Game",
        onClick: () => {
          if (hasProgress) {
            setShowConfirmation(true);
          } else {
            navigate("/levels");
          }
        },
      },
      hasProgress
        ? {
            icon: FastForward,
            title: "Continue",
            onClick: () => navigate("/levels"),
          }
        : null,
      {
        icon: Trophy,
        title: "View Scores",
        onClick: () => navigate("/scores"),
      },
      {
        icon: BookOpen,
        title: "Instructions",
        onClick: () => navigate("/instructions"),
      },
      {
        icon: Settings,
        title: "Settings",
        onClick: () => navigate("/settings"),
      },
    ]);
  }, [hasProgress, userId]);

  const handleConfirmResolution = () => {
    deleteLeaderboardRecord(userId || "")
      .then(() => {
        deleteLevelRecords(userId || "")
          .then(() => {
            resetCompleteLevel();
            navigate("/levels");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex-1 p-8 relative overflow-hidden flex items-center">
      <CircuitLines />
      <div className="max-w-md mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <AnimatedLogo className="w-16 h-16" />
          <GlowingTitle className="text-3xl">
            EV Battery Fault Diagnosis
          </GlowingTitle>
        </div>
        <div className="space-y-4">
          {menuItems
            .filter((item: any) => item !== null)
            .map((item: any, index: number) => (
              <MenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                onClick={item.onClick}
              />
            ))}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmResolution}
        onCancel={() => {
          setShowConfirmation(false);
        }}
        text={"This will delete all your progress."}
      />
    </div>
  );
};

export default HomePage;
