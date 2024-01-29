import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Cell from "../Cell";
import style from "./Board.module.css";

const Board = ({ battleField }) => {
  const [board, initBoard, setBoard, setBoardCell, shipsRemaining, setShipsRemaining, playerWins, setPlayerWins] =
    useAppStore(
      useShallow((state) => [
        state.board,
        state.initBoard,
        state.setBoard,
        state.setBoardCell,
        state.shipsRemaining,
        state.setShipsRemaining,
        state.playerWins,
        state.setPlayerWins,
      ])
    );

  const { cols, rows, field } = battleField;

  /**
   * on load
   * init board
   */
  useEffect(() => {
    // init board
    initBoard(field);
  }, []);

  /**
   * letters on the top of the table
   */
  const renderLegendTop = () => {
    const legendTop = [];
    for (let i = 0; i < cols; i++) {
      legendTop.push(<div key={i}>{String.fromCharCode(i + 65)}</div>);
    }
    return legendTop;
  };

  /**
   * numbers on the left side of the table
   */
  const renderLegendLeft = () => {
    const legendLeft = [];
    for (let i = 0; i < rows; i++) {
      legendLeft.push(<div key={i}>{i + 1}</div>);
    }
    return legendLeft;
  };

  /**
   * render all the width x height cells
   */
  const renderCells = () => {
    const cells = [];
    let index = 0;
    for (let column = 0; column < cols; column++) {
      for (let row = 0; row < rows; row++) {
        cells.push(<Cell key={index++} col={column} row={row} onClick={handleCellClick} />);
      }
    }
    return cells;
  };

  /**
   * handle board cell click event
   *
   */
  const handleCellClick = (col, row, val) => {
    // update board state
    setBoardCell(col, row, val);
    // update battlefield state
    battleField.updateFieldCell(col, row, val);
    // update shipsRemaining
    setShipsRemaining(battleField.getShipsRemaining());
    // check if all ships are sunk
    if (battleField.isFleetSunk()) {
      setPlayerWins(true);
    }
  };

  return (
    <>
      {board[9] !== undefined && (
        <div className={style.boardWrapper}>
          <div className={style.top}>{renderLegendTop()}</div>
          <div className={style.board}>{renderCells()}</div>
          <div className={style.leftSide}>{renderLegendLeft()}</div>
        </div>
      )}
    </>
  );
};

export default Board;
