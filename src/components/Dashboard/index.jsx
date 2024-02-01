import React from "react";
import Board from "../Board";
import Stats from "../Stats";
import CoordsInput from "../CoordsInput";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import BattleField from "../../utils/BattleField";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [playerWins, initBoard] = useAppStore(useShallow((state) => [state.playerWins, state.initBoard]));
  // create battlefield
  const battleField = new BattleField(10, 10);

  // init state board with battlefield data
  initBoard(battleField);

  const handleClickRestart = () => {
    window.location.reload();
  };

  return (
    <div className={styles.dashboard}>
      {playerWins && (
        <div className={styles.winner}>
          <span className={styles.winnerText}>YOU WIN!!!</span>
          <button className={styles.button} onClick={handleClickRestart}>
            Play Again!
          </button>
        </div>
      )}
      <header className={styles.header}>
        <h1>BattleShip</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.aside}>
            <Stats />
          </div>
          <div className={styles.field}>
            <Board battleField={battleField} />
          </div>
          <div className={styles.aside}>
            <CoordsInput />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
