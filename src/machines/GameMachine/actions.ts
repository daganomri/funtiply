import {
  randomNumberInRange,
  generateWrongRandomNumber,
  shuffleArray,
} from "../../utils/math";
import { assign } from "xstate";
import type { Difficulty, GameContext, GameEvent, Mode } from "./types";

const difficultyToMaxNumber: Record<Difficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 20,
};

export const initializeGameContext = (
  mode: Mode,
  difficulty: Difficulty
): GameContext => {
  return {
    numbers: [],
    answers: [],
    correctAnswer: null,
    selectedAnswer: null,
    totalQuestions: mode === "practice" ? 0 : 20,
    correctQuestions: 0,
    answeredQuestions: 0,
    difficulty,
    mode,
  };
};

export const generateQuestion = (
  difficulty: Difficulty
): Pick<
  GameContext,
  "numbers" | "answers" | "correctAnswer" | "selectedAnswer"
> => {
  const numbers = [
    randomNumberInRange(1, difficultyToMaxNumber[difficulty]),
    randomNumberInRange(1, difficultyToMaxNumber[difficulty]),
  ];
  const correctAnswer = numbers[0] * numbers[1];

  let answers = [correctAnswer];
  while (answers.length < 4) {
    const wrongAnswer =
      generateWrongRandomNumber(numbers[0]) *
      generateWrongRandomNumber(numbers[1]);
    if (!answers.includes(wrongAnswer)) {
      answers.push(wrongAnswer);
    }
  }

  answers = shuffleArray(answers);
  return {
    numbers,
    correctAnswer,
    answers,
    selectedAnswer: null,
  };
};

export const generateQuestionAction = assign<GameContext, GameEvent>(
  (context) => ({
    ...context,
    ...generateQuestion(context.difficulty),
  })
);

export const selectAnswerAction = assign<
  GameContext,
  Extract<GameEvent, { type: "ANSWER" }>
>({
  selectedAnswer: (context, event) => event.answer,
});

export const updateCountersAction = assign<
  GameContext,
  Extract<GameEvent, { type: "ANSWER" }>
>({
  totalQuestions: ({ mode, totalQuestions }) =>
    mode === "test" ? totalQuestions : totalQuestions + 1,
  correctQuestions: ({ correctQuestions, selectedAnswer, correctAnswer }) =>
    selectedAnswer === correctAnswer ? correctQuestions + 1 : correctQuestions,
  answeredQuestions: ({ answeredQuestions }) => answeredQuestions + 1,
});

export const resetAction = assign<
  GameContext,
  Extract<GameEvent, { type: "RESET" }>
>(({ mode, difficulty }) => initializeGameContext(mode, difficulty));
