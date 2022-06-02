import { toGuard } from "xstate/lib/utils";
import type { GameContext, GameEvent } from "./types";

export const isTestFinishedGuard = toGuard<GameContext, GameEvent>(
  ({ mode, answeredQuestions, totalQuestions }) =>
    mode === "test" && answeredQuestions === totalQuestions
);
