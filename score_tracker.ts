export interface ScoreTracker {
  numberGotRight: number;
  total: number;

  gotItRight(): void;
  gotItWrong(): void;
}

