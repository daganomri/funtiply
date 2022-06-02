export type Mode = "practice" | "test";

export interface GameContext {
  mode: Mode;
  numbers: number[];
  answers: number[];
  correctAnswer: null | number;
  selectedAnswer: null | number;
  correctQuestions: number;
  answeredQuestions: number;
  totalQuestions: number;
}

export type GameEvent = { type: "ANSWER"; answer: number } | { type: "RESET" };
