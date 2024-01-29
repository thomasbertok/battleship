import React, { useState } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Cell.module.css";

const Cell = ({ col, row, onClick }) => {
  const [board, setBoardCell, incrementHitCount] = useAppStore(
    useShallow((state) => [state.board, state.setBoardCell, state.incrementHitCount])
  );
  // set clicked state for the cell
  const [clickedState, setClickedState] = useState(false);

  // get state of cell in board array
  const getCellValue = (x, y) => {
    return board[x][y];
  };

  // choose class by cell state
  const getCellStateClass = (x, y) => {
    switch (getCellValue(x, y)) {
      case 0:
        return styles.state0;
      case 1:
        return styles.state1;
      case 2:
        return styles.state2;
      case 3:
        return styles.state3;
      default:
        return styles.state0;
    }
  };

  // click cell
  const handleClick = () => {
    if (clickedState) {
      // already clicked it
      console.log("You already clicked this cell");
      return;
    } else {
      // set clicked state to true
      setClickedState(true);
      // increment hit count
      incrementHitCount();
      // set board cell state in store
      // setBoardCell(col, row, getCellValue(col, row) + 1);
      // call onClick
      onClick(col, row, getCellValue(col, row) + 1);
    }
  };

  return (
    <div
      className={`${styles.cell} ${getCellStateClass(col, row)} ${clickedState ? styles.clicked : ""}`}
      onClick={handleClick}
      title={`${col}, ${row}`}>
      {col + 1},{row + 1}
    </div>
  );
};

export default Cell;
