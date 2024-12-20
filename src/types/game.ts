export interface DifficultyBadge {
  text: string;
  colors: string;
}

export interface DiagnosticQuestion {
  text: string;
  answer: 'Yes' | 'No';
  isRelevant: boolean;
  explanation?: string;
  hint?: string;
}

export interface ResolutionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface DiagnosticScenario {
  id: number;
  title: string;
  description: string;
  questions: DiagnosticQuestion[];
  resolutionQuestion: {
    text: string;
    options: ResolutionOption[];
  };
}