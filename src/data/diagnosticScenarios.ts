import { DiagnosticScenario } from '../types/game';

export const scenarios: DiagnosticScenario[] = [
  {
    id: 1,
    title: "Rapid Discharge During Operation",
    description: "The EV battery discharges quickly after a full charge.",
    clues: [
      "SOC drops faster than normal",
      "Cell voltages are uneven"
    ],
    questions: [
      {
        text: "Is the SOC (State of Charge) dropping quickly?",
        answer: "Yes",
        isRelevant: true,
        hint: "Check the rate of battery discharge compared to normal operation"
      },
      {
        text: "Are individual cell voltages within the normal range?",
        answer: "No",
        isRelevant: true,
        hint: "Compare voltage readings across different cells"
      },
      {
        text: "Is the battery temperature normal?",
        answer: "Yes",
        isRelevant: true,
        hint: "Monitor temperature sensors for any abnormal readings"
      },
      {
        text: "Are external loads connected to the battery?",
        answer: "No",
        isRelevant: true,
        hint: "Check for any unauthorized or parasitic loads"
      },
      {
        text: "Is there any visible damage to the battery?",
        answer: "No",
        isRelevant: true,
        hint: "Inspect the battery pack for physical damage"
      },
      {
        text: "Has the battery recently undergone cell balancing?",
        answer: "No",
        isRelevant: true,
        hint: "Review maintenance history for recent balancing procedures"
      },
      {
        text: "Is the cooling system operational?",
        answer: "Yes",
        isRelevant: false,
        explanation: "Not related to discharge rates",
        hint: "This is not relevant to the current issue"
      },
      {
        text: "Is the charger functioning properly?",
        answer: "Yes",
        isRelevant: false,
        explanation: "Not a charging issue",
        hint: "This is not relevant to the current issue"
      }
    ],
    resolutionQuestion: {
      text: "What should you do to resolve the issue?",
      options: [
        { id: "a", text: "Replace the charger", isCorrect: false },
        { id: "b", text: "Perform cell balancing", isCorrect: true },
        { id: "c", text: "Inspect the cooling system", isCorrect: false },
        { id: "d", text: "Replace the temperature sensors", isCorrect: false }
      ]
    }
  },
  {
    id: 2,
    title: "Overheating After Prolonged Use",
    description: "The EV battery shows signs of overheating during extended driving periods.",
    clues: [
      "Cooling system issues detected",
      "High ambient temperatures"
    ],
    questions: [
      {
        text: "Are the cooling systems functioning normally?",
        answer: "No",
        isRelevant: true,
        hint: "Check the cooling system's operational status"
      },
      {
        text: "Are temperature sensors reporting consistent readings?",
        answer: "Yes",
        isRelevant: true,
        hint: "Verify temperature sensor data consistency"
      },
      {
        text: "Is the battery being used under high load conditions?",
        answer: "Yes",
        isRelevant: true,
        hint: "Assess the current load on the battery system"
      },
      {
        text: "Is the ambient temperature unusually high?",
        answer: "Yes",
        isRelevant: true,
        hint: "Monitor environmental temperature conditions"
      },
      {
        text: "Are there any blockages in the cooling system?",
        answer: "Yes",
        isRelevant: true,
        hint: "Inspect cooling system for potential obstructions"
      },
      {
        text: "Are all battery cells operating within normal voltage levels?",
        answer: "Yes",
        isRelevant: true,
        hint: "Check individual cell voltage readings"
      },
      {
        text: "Are external loads connected to the battery?",
        answer: "No",
        isRelevant: false,
        explanation: "Not related to overheating issue",
        hint: "This is not relevant to the current temperature problem"
      },
      {
        text: "Is the BMS communicating with the charger?",
        answer: "Yes",
        isRelevant: false,
        explanation: "Not a charging-related issue",
        hint: "This is not relevant to the overheating problem"
      }
    ],
    resolutionQuestion: {
      text: "What is the likely root cause of the overheating?",
      options: [
        { id: "a", text: "Faulty cooling system", isCorrect: true },
        { id: "b", text: "Damaged connectors", isCorrect: false },
        { id: "c", text: "Uneven cell voltages", isCorrect: false },
        { id: "d", text: "Incorrect charging protocol", isCorrect: false }
      ]
    }
  },
  {
    id: 3,
    title: "Uneven Charging Across Cells",
    description: "Battery cells are charging unevenly, leading to performance issues and potential safety concerns.",
    clues: [
      "One cell group has significantly lower voltage",
      "Inconsistent charging patterns"
    ],
    questions: [
      {
        text: "Are all battery cells charging evenly?",
        answer: "No",
        isRelevant: true,
        hint: "Monitor individual cell charging patterns"
      },
      {
        text: "Is the BMS detecting any faulty cells?",
        answer: "Yes",
        isRelevant: true,
        hint: "Check BMS diagnostics for cell status"
      },
      {
        text: "Are temperature sensors reporting normal values?",
        answer: "Yes",
        isRelevant: true,
        hint: "Verify temperature distribution across cells"
      },
      {
        text: "Is there physical damage to the battery cells?",
        answer: "No",
        isRelevant: true,
        hint: "Inspect cells for visible damage"
      },
      {
        text: "Is the charger providing consistent voltage output?",
        answer: "Yes",
        isRelevant: true,
        hint: "Measure charger output stability"
      },
      {
        text: "Has the battery been exposed to extreme temperatures recently?",
        answer: "No",
        isRelevant: true,
        hint: "Review recent temperature exposure history"
      },
      {
        text: "Are external loads connected to the battery?",
        answer: "No",
        isRelevant: false,
        explanation: "Not related to charging patterns",
        hint: "This is not relevant to the charging issue"
      },
      {
        text: "Is the SOC dropping rapidly?",
        answer: "No",
        isRelevant: false,
        explanation: "Not related to uneven charging",
        hint: "This is not relevant to the charging imbalance"
      }
    ],
    resolutionQuestion: {
      text: "What is the most likely root cause of uneven cell charging?",
      options: [
        { id: "a", text: "Faulty cooling system", isCorrect: false },
        { id: "b", text: "Faulty battery management system (BMS)", isCorrect: false },
        { id: "c", text: "Parasitic loads on the battery", isCorrect: false },
        { id: "d", text: "Uneven cell balancing", isCorrect: true }
      ]
    }
  }
];