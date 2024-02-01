import React from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Stats.module.css";

const Stats = () => {
  const [hitCount, successfulHits, shipsRemaining, playerInput, showShips, toggleShowShips] = useAppStore(
    useShallow((state) => [
      state.hitCount,
      state.successfulHits,
      state.shipsRemaining,
      state.playerInput,
      state.showShips,
      state.toggleShowShips,
    ])
  );

  return (
    <div className={styles.stats}>
      <h3>Player Stats</h3>
      <div>
        <label htmlFor="show-ships" className={styles.label}>
          <input type="checkbox" name="show-ships" id="show-ships" checked={showShips} onChange={toggleShowShips} />
          <span>Show ships</span>
        </label>
      </div>
      <div>Hit count: {hitCount}</div>
      <div>Successful Hits: {successfulHits}</div>
      <div>Ships remaining: {shipsRemaining}</div>
      <div>Input: {playerInput}</div>
    </div>
  );
};

export default Stats;
