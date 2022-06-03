import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import { Difficulty } from "../machines/GameMachine/types";
import useDocumentTitle from "../useDocumentTitle";
import classNames from "classnames";
import { useSessionStorage } from "../utils/useSessionStorage";

const HomePage = () => {
  useDocumentTitle("כיף-כפל");
  const [difficulty, setDifficulty] = useSessionStorage<Difficulty>(
    "funtiply-difficulty",
    "easy"
  );
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>ברוכים הבאים לכיף-כפל!</h1>

      <p className={styles.description}>בחרו סוג משחק:</p>

      <div className={styles.grid}>
        <Link to='/practice' className={styles.card}>
          <h2>אימון</h2>
        </Link>
        <Link to='/test' className={styles.card}>
          <h2>מבחן</h2>
        </Link>
      </div>
      <p className={styles.description}>בחרו רמת קושי:</p>

      <div className={styles.grid}>
        <button
          onClick={() => setDifficulty("easy")}
          className={classNames(styles.card, {
            [styles.selected]: difficulty === "easy",
          })}>
          <h2>קל</h2>
        </button>
        <button
          onClick={() => setDifficulty("medium")}
          className={classNames(styles.card, {
            [styles.selected]: difficulty === "medium",
          })}>
          <h2>בינוני</h2>
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={classNames(styles.card, {
            [styles.selected]: difficulty === "hard",
          })}>
          <h2>קשה</h2>
        </button>
      </div>
    </main>
  );
};

export default HomePage;
