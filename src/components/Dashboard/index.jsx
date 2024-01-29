import Board from "../Board";
import Stats from "../Stats";
import CoordsInput from "../CoordsInput";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Dashboard.module.css";
import BattleField from "../../utils/BattleField";

const Dashboard = () => {
  const battleField = new BattleField(10, 10);

  const [playerWins] = useAppStore(useShallow((state) => [state.playerWins]));

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
