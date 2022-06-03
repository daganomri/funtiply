export type Mode = "practice" | "test";
export type Difficulty = "easy" | "medium" | "hard";

export interface GameContext {
  mode: Mode;
  numbers: number[];
  answers: number[];
  correctAnswer: null | number;
  selectedAnswer: null | number;
  correctQuestions: number;
  answeredQuestions: number;
  totalQuestions: number;
  difficulty: Difficulty;
}

export type GameEvent = { type: "ANSWER"; answer: number } | { type: "RESET" };
