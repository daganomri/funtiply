import styles from "../App.module.css";
import { useMachine } from "@xstate/react";
import classnames from "classnames";
import useDocumentTitle from "../useDocumentTitle";
import resetImage from "../reset.png";
import createGameMachine from "../machines/GameMachine/GameMachine";
import { Difficulty } from "../machines/GameMachine/types";
import React from "react";
import { useSessionStorage } from "../utils/useSessionStorage";

const PracticePage = () => {
  useDocumentTitle("כיף-כפל - אימון");
  const [difficulty] = useSessionStorage<Difficulty>(
    "funtiply-difficulty",
    "easy"
  );
  const PracticeMachine = React.useMemo(
    () => createGameMachine("practice", difficulty),
    [difficulty]
  );

  const [state, send] = useMachine(PracticeMachine);
  const {
    numbers: [firstNumber, secondNumber],
    answers,
    correctAnswer,
    answeredQuestions,
    selectedAnswer,
    correctQuestions,
    totalQuestions,
  } = state.context;

  return (
    <main className={styles.main} style={{ justifyContent: "space-evenly" }}>
      <h1 className={styles.title}>אימון</h1>
      <output className={styles.output}>
        <p
          className={styles.description}
          style={{
            width: "fit-content",
            fontWeight: "bold",
            direction: "ltr",
            fontSize: "clamp(1rem, 2vw, 2rem)",
            margin: 0,
            marginTop: 0,
            position: "absolute",
            top: 2,
            right: 10,
          }}>
          <span style={{ color: "green", display: "contents" }}>
            {correctQuestions}
          </span>{" "}
          / {totalQuestions}
        </p>
        <img
          onClick={() => send({ type: "RESET" })}
          src={resetImage}
          height='22'
          width='22'
          style={{
            display: "inline",
            position: "absolute",
            top: 5,
            left: 5,
            cursor: "pointer",
          }}
        />
        {firstNumber} X {secondNumber} = {selectedAnswer ? correctAnswer : "??"}
      </output>

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: "1fr 1fr",
          display: "grid",
          width: "80vw",
        }}>
        {answers.map((answer) => {
          const isShowSelection = state.matches("showSelection");
          const isCorrect = answer === correctAnswer;
          const isSelected = answer === selectedAnswer;

          return (
            <button
              disabled={isShowSelection}
              key={`${answeredQuestions}_${answer}`}
              className={classnames(styles.card, {
                [styles.active]: isShowSelection && (isCorrect || isSelected),
                [styles.correct]: isShowSelection && isCorrect,
                [styles.incorrect]: isShowSelection && !isCorrect && isSelected,
              })}
              onClick={() => send({ type: "ANSWER", answer })}>
              <h2 style={{ fontSize: "2rem" }}>{answer}</h2>
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default PracticePage;
