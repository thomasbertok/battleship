import React from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Cell from "../Cell";
import style from "./Board.module.css";
import PropTypes from "prop-types";

const Board = ({ battleField }) => {
  const [board, setBoardCell] = useAppStore(useShallow((state) => [state.board, state.setBoardCell]));
  const { rows, cols } = battleField || {};

  /**
   * letters on the top of the table
   */
  const renderLegendHorizontal = (cols) => {
    return Array.from({ length: cols }, (_, idx) => <div key={idx}>{String.fromCharCode(idx + 65)}</div>);
  };

  /**
   * numbers on the left side of the table
   */
  const renderLegendVertical = (rows) => {
    return Array.from({ length: rows }, (_, idx) => <div key={idx}>{idx + 1}</div>);
  };

  /**
   * render cells
   */
  const renderCells = () => {
    return Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => (
        <Cell key={row * cols + col} row={row} col={col} onClick={handleCellClick} />
      ))
    );
  };

  /**
   * handle board cell click event
   */
  const handleCellClick = (row, col, val) => {
    setBoardCell(row, col, val);
  };

  return (
    <div className={style.boardContainer}>
      {board[9] !== undefined && (
        <div className={`${style.boardWrapper}`}>
          <div className={style.top}>{renderLegendHorizontal(cols)}</div>
          <div className={style.board}>{renderCells()}</div>
          <div className={style.leftSide}>{renderLegendVertical(rows)}</div>
        </div>
      )}
      <div className={style.message}></div>
    </div>
  );
};

Board.propTypes = {
  battleField: PropTypes.shape({
    rows: PropTypes.number,
    cols: PropTypes.number,
    // define the expected shape of the battleField prop
  }),
};

export default Board;
