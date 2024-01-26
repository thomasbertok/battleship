import styles from "./Dashboard.module.css";
import Board from "../Board";
import Stats from "../Stats";
import CoordsInput from "../CoordsInput";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>BattleShip</header>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.aside}>
            <Stats />
          </div>
          <div className={styles.field}>
            <Board />
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
