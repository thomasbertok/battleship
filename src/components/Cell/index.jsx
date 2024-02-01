import React, { useState } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import styles from "./Cell.module.css";
import PropTypes from "prop-types";

const Cell = ({ row, col, onClick }) => {
  const [board, showShips] = useAppStore(useShallow((state) => [state.board, state.showShips]));
  // set clicked state for the cell
  const [clickedState, setClickedState] = useState(false);

  // choose class by cell state
  const cellStateClass = (x, y) => {
    switch (board[x][y]) {
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
      case 5: // player input
        return styles.state5;
      default:
        return styles.state0;
    }
  };

  // click cell
  const handleClick = () => {
    if (board[row][col] === 1 || board[row][col] === 3) {
      console.log("You already clicked this cell");
      setClickedState(true);
    } else if (!clickedState) {
      // set clicked state to true
      setClickedState(true);
      // call parent's onClick with the proper value for the cell
      onClick(row, col, board[row][col] + 1);
    }
  };

  return (
    <div
      className={`cell ${styles.cell} ${cellStateClass(row, col)} ${clickedState ? styles.clicked : ""}`}
      onClick={handleClick}>
      {String.fromCharCode(col + 65)}
      {row + 1}
    </div>
  );
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
