export interface DifficultyBadge {
  text: string;
  colors: string;
}

export interface DiagnosticQuestion {
  text: string;
  answer: "Yes" | "No";
  isRelevant: boolean;
  explanation?: string;
  hint?: string;
}

export interface ResolutionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Level {
  id: number;
  title: string;
  symptoms: string;
}

export interface DiagnosticScenario {
  id: number;
  title: string;
  symptoms: string;
  clues: string[];
  description: string;
  questions: DiagnosticQuestion[];
  resolutionQuestion: {
    text: string;
    options: ResolutionOption[];
  };
}
