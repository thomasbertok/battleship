import { useAppStore } from "../../store";
import styles from "./Stats.module.css";

const Stats = () => {
  const [hitCount, successfulHits, shipsRemaining, playerInput] = useAppStore((state) => [
    state.hitCount,
    state.successfulHits,
    state.shipsRemaining,
    state.playerInput,
  ]);

  return (
    <div className={styles.stats}>
      <h3>Player Stats</h3>
      <div>Hit count: {hitCount}</div>
      <div>Successful Hits: {successfulHits}</div>
      <div>Ships remaining: {shipsRemaining}</div>
      <div>Input: {playerInput}</div>
    </div>
  );
};

export default Stats;
