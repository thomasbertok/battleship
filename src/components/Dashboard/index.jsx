import React from "react";
import Board from "../Board";
import Stats from "../Stats";
import CoordsInput from "../CoordsInput";
import Winner from "../Winner";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import BattleField from "../../utils/BattleField";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [initBoard] = useAppStore(useShallow((state) => [state.initBoard]));
  // create battlefield
  const battleField = new BattleField(10, 10);
  // init state board with battlefield data
  initBoard(battleField);

  return (
    <div className={styles.dashboard}>
      <Winner />
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
