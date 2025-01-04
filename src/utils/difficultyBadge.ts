import { DifficultyBadge } from '../types/game';

export const getDifficultyBadge = (levelId: number): DifficultyBadge => {
  switch (levelId) {
    case 1:
      return {
        text: "Basic",
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400"
      };
    case 2:
      return {
        text: "Intermediate",
        colors: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
      };
    case 3:
      return {
        text: "Advanced",
        colors: "bg-red-500/10 border-red-500/20 text-red-400"
      };
    default:
      return {
        text: "Basic",
        colors: "bg-blue-500/10 border-blue-500/20 text-blue-400"
      };
  }
};