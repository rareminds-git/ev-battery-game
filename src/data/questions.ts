import { LevelQuestions } from '../types/game';

export const questions: Record<number, LevelQuestions> = {
  1: [
    {
      text: "Is the SOC (State of Charge) dropping quickly?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      hint: "Check the rate of battery discharge compared to normal operation."
    },
    {
      text: "Are individual cell voltages within the normal range?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      hint: "Compare voltage readings across different cells."
    },
    {
      text: "Is the battery temperature normal?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      hint: "Monitor temperature sensors for any abnormal readings."
    },
    {
      text: "Are external loads connected to the battery?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      hint: "Check for any unauthorized or parasitic loads."
    },
    {
      text: "Is there any visible damage to the battery?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      hint: "Inspect the battery pack for physical damage."
    },
    {
      text: "Has the battery recently undergone cell balancing?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      hint: "Review maintenance history for recent balancing procedures."
    }
  ]
};