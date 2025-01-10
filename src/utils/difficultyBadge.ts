import { DifficultyBadge } from "../types/game";

export const getDifficultyBadge = (levelId: number): DifficultyBadge => {
  switch (levelId) {
    case 1:
    case 2:
    case 3:
      return {
        text: "Basic",
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      };
    case 4:
    case 5:
    case 6:
      return {
        text: "Intermediate",
        colors: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      };
    case 7:
    case 8:
    case 9:
    case 10:
      return {
        text: "Advanced",
        colors: "bg-red-500/10 border-red-500/10 text-red-400",
      };

    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return {
        text: "Critical Thinking",
        colors: "bg-red-500/10 border-red-500/80 text-red-400",
      };

    default:
      return {
        text: "Basic",
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      };
  }
};
