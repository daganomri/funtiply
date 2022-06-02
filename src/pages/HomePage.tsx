import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import useDocumentTitle from "../useDocumentTitle";

const HomePage = () => {
  useDocumentTitle("כיף-כפל");
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
    </main>
  );
};

export default HomePage;
