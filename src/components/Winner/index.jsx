import React from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Winner.module.css";

const Winner = () => {
  const [hitCount, successfulHits, playerWins] = useAppStore(
    useShallow((state) => [state.hitCount, state.successfulHits, state.playerWins])
  );

  const handleClickRestart = () => {
    window.location.reload();
  };

  if (!playerWins) {
    return null;
  } else {
    return (
      <div className={styles.winner}>
        <div className={styles.winnerText}>YOU WIN!!!</div>
        <div>Total hit count: {hitCount}</div>
        <div>Successful Hits: {successfulHits}</div>
        <div>Success rate: {Math.round((successfulHits / hitCount) * 100)}%</div>
        <button className={styles.button} onClick={handleClickRestart}>
          Play Again!
        </button>
      </div>
    );
  }
};

export default Winner;
