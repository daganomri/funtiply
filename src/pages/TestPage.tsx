import styles from "../App.module.css";
import { TestMachine } from "../machines";
import { useMachine } from "@xstate/react";
import classnames from "classnames";
import useDocumentTitle from "../useDocumentTitle";
import resetImage from "../reset.png";

const TestPage = () => {
  useDocumentTitle("כיף-כפל - מבחן");
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

  if (state.matches("result")) {
    return (
      <main className={styles.main} style={{ justifyContent: "center" }}>
        <h1 className={styles.title}>אימון</h1>
        <div className={styles.description} style={{ margin: 0 }}>
          {correctQuestions === totalQuestions ? (
            <h2>כל הכבוד! הצלחתם לענות על כל השאלות!</h2>
          ) : (
            <h2>
              הצלחתם לענות על {correctQuestions} מתוך {totalQuestions} שאלות
            </h2>
          )}
        </div>
        <div style={{ fontSize: "1.2rem" }}>רוצים לנסות שוב?</div>
        <button className={styles.card} onClick={() => send({ type: "RESET" })}>
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
        <img
          onClick={() => send({ type: "RESET" })}
          src={resetImage}
          height='20'
          width='20'
          style={{
            display: "inline",
            position: "absolute",
            top: 5,
            left: 5,
            cursor: "pointer",
          }}
        />
        {firstNumber} * {secondNumber} = {selectedAnswer ? correctAnswer : "??"}
      </output>

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: "1fr 1fr",
          display: "grid",
          width: "75vw",
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
