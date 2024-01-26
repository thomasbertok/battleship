import React from "react";
import styles from "./Dashboard.module.css";

import Board from "../Board";
import CoordsInput from "../CoordsInput";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>BattleShip</header>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.stats}>
            <h3>Player Stats</h3>
            <div>Move count: 0</div>
            <div>Hits: 0</div>
          </div>
          <div className={styles.field}>
            <Board />
          </div>
          <div className={styles.stats}>
            <CoordsInput />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
