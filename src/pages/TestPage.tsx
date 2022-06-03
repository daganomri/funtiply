import styles from "../App.module.css";
import { useMachine } from "@xstate/react";
import classnames from "classnames";
import useDocumentTitle from "../useDocumentTitle";
import resetImage from "../reset.png";
import { Difficulty } from "../machines/GameMachine/types";
import createGameMachine from "../machines/GameMachine/GameMachine";
import React from "react";
import { useTimer } from "use-timer";
import { useSessionStorage } from "../utils/useSessionStorage";

const TestPage = () => {
  useDocumentTitle("כיף-כפל - מבחן");
  const { time, pause, reset, start } = useTimer({ autostart: true });
  const [difficulty] = useSessionStorage<Difficulty>(
    "funtiply-difficulty",
    "easy"
  );
  const TestMachine = React.useMemo(
    () => createGameMachine("test", difficulty),
    [difficulty]
  );

  const [state, send] = useMachine(TestMachine);
  const {
    numbers: [firstNumber, secondNumber],
    answers,
    correctAnswer,
    selectedAnswer,
    correctQuestions,
    answeredQuestions,
    totalQuestions,
  } = state.context;

  React.useEffect(() => {
    if (state.matches("result")) {
      pause();
      return () => start();
    }
  }, [state]);

  if (state.matches("result")) {
    return (
      <main className={styles.main} style={{ justifyContent: "center" }}>
        <h1 className={styles.title}>מבחן</h1>
        <div className={styles.description} style={{ margin: 0 }}>
          {correctQuestions === totalQuestions ? (
            <h2>כל הכבוד! הצלחתם לענות על כל השאלות!</h2>
          ) : (
            <h2>
              הצלחתם לענות על {correctQuestions} מתוך {totalQuestions} שאלות
            </h2>
          )}
          <p className={styles.decription}>לקח לכם {time} שניות!</p>
          <p className={styles.decription}>רוצים לנסות שוב?</p>
        </div>
        <button
          className={styles.card}
          onClick={() => {
            send({ type: "RESET" });
            reset();
          }}>
          נסו שוב
        </button>
      </main>
    );
  }

  return (
    <main className={styles.main} style={{ justifyContent: "space-evenly" }}>
      <h1 className={styles.title}>מבחן</h1>
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
        <div
          style={{
            position: "absolute",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 5,
            top: 5,
            left: 5,
          }}>
          <img
            onClick={() => {
              send({ type: "RESET" });
              reset();
            }}
            src={resetImage}
            height='22'
            width='22'
            style={{
              display: "inline",
              cursor: "pointer",
            }}
          />
          <p
            className={styles.description}
            style={{
              fontWeight: "bold",
              fontSize: "clamp(1rem, 2vw, 2rem)",
              margin: 0,
            }}>
            {time}
          </p>
        </div>
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

export default TestPage;
