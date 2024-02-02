import React from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Stats.module.css";

const Stats = () => {
  const [hitCount, successfulHits, shipsRemaining, showShips, toggleShowShips] = useAppStore(
    useShallow((state) => [
      state.hitCount,
      state.successfulHits,
      state.shipsRemaining,
      state.showShips,
      state.toggleShowShips,
    ])
  );

  return (
    <div className={styles.stats}>
      <h3>Player Stats</h3>

      <div className={styles.statsList}>
        <div>
          <div>Hit count: </div>
          <div>{hitCount}</div>
        </div>
        <div>
          <div>Successful Hits:</div>
          <div>{successfulHits}</div>
        </div>
        <div>
          <div>Ships remaining:</div>
          <div>{shipsRemaining}</div>
        </div>
      </div>

      <label htmlFor="show-ships" className={styles.label}>
        <input type="checkbox" name="show-ships" id="show-ships" checked={showShips} onChange={toggleShowShips} />
        <span>Show ships</span>
      </label>
    </div>
  );
};

export default Stats;
