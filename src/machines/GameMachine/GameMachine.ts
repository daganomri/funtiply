import { createMachine } from "xstate";
import {
  generateQuestionAction,
  selectAnswerAction,
  updateCountersAction,
  initializeGameContext,
  resetAction,
} from "./actions";
import { isTestFinishedGuard } from "./guards";
import type { GameEvent, GameContext, Mode } from "./types";

const createGameMachine = (mode: Mode) => {
  return createMachine({
    id: "gameMachine",
    initial: "question",
    schema: {
      context: {} as GameContext,
      events: {} as GameEvent,
    },
    context: initializeGameContext(mode),
    states: {
      question: {
        entry: generateQuestionAction,
        on: {
          ANSWER: {
            target: "showSelection",
            actions: [selectAnswerAction, updateCountersAction],
          },
        },
      },
      showSelection: {
        after: {
          1000: [
            {
              cond: isTestFinishedGuard,
              target: "result",
            },
            { target: "question" },
          ],
        },
      },
      result: {},
    },
    on: {
      RESET: {
        target: "question",
        actions: resetAction,
      },
    },
  });
};

export default createGameMachine;
