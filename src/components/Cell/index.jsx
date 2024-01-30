import { useState } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Cell.module.css";

const Cell = ({ col, row, onClick }) => {
  const [board, incrementHitCount, showShips] = useAppStore(
    useShallow((state) => [state.board, state.incrementHitCount, state.showShips])
  );
  // set clicked state for the cell
  const [clickedState, setClickedState] = useState(false);

  // get state of cell in board array
  const getCellValue = (row, col) => {
    // get cell value
    const cellValue = board[row][col];
    return cellValue;
  };

  // choose class by cell state
  const getCellStateClass = (x, y) => {
    switch (getCellValue(x, y)) {
      case 0: // water
        return styles.state0;
      case 1: // missed hit
        return styles.state1;
      case 2: // ship if showShip is true, else fog of war
        return showShips ? styles.state2 : styles.state0;
      case 3: // ship hit
        return styles.state3;
      case 4: // ship sunk
        return styles.state4;
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
      onClick(row, col, getCellValue(row, col) + 1);
    }
  };

  return (
    <div
      className={`${styles.cell} ${getCellStateClass(row, col)} ${clickedState ? styles.clicked : ""}`}
      onClick={handleClick}
      title={`${row}, ${col}`}>
      {row + 1},{col + 1}
    </div>
  );
};

export default Cell;
