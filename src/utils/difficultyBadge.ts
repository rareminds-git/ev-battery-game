import { DifficultyBadge } from "../types/game";

export const getDifficultyBadge = (difficulty: string): DifficultyBadge => {
  switch (difficulty) {
    case "Basic":
      return {
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      };
    case "Intermediate":
      return {
        colors: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      };
    case "Advanced":
      return {
        colors: "bg-red-500/0 border-red-500/10 text-red-400",
      };

    case "Critical Thinking":
      return {
        colors: "bg-red-500/10 border-red-500/80 text-red-400",
      };

    default:
      return {
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      };
  }
};
