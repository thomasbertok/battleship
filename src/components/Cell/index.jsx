import React, { useState } from "react";
import styles from "./Cell.module.css";

const Cell = ({ x, y }) => {
  // empty - water
  // ship - ship
  // hit - hit ship
  // miss - miss
  const state = "empty";

  const [clickedState, setClickedState] = useState(false);

  const handleClick = () => {
    setClickedState(!clickedState);
  };

  return (
    <div
      className={`${styles.cell} ${state} ${clickedState ? styles.clicked : ""}`}
      onClick={handleClick}
      title={`${x}, ${y}`}>
      {x},{y}
    </div>
  );
};

export default Cell;
