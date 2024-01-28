import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Cell from "../Cell";
import style from "./Board.module.css";
import battleField from "./utils/battlefield";

const Board = () => {
  const width = 10;
  const height = 10;

  const [board, initBoard, setBoard, setBoardCell] = useAppStore(
    useShallow((state) => [state.board, state.initBoard, state.setBoard, state.setBoardCell])
  );

  /**
   * on load
   * init board
   */
  useEffect(() => {
    // init board
    initBoard(battleField(width, height));
    // test
    //setBoardCell(0, 0, 1);
  }, []);

  /**
   * when board is updated...
   */
  useEffect(() => {
    console.log("board updated", board);
    // check ships situations
  }, [board]);

  /**
   * letters on the top of the table
   */
  const renderLegendTop = () => {
    const legendTop = [];
    for (let i = 0; i < width; i++) {
      legendTop.push(<div key={i}>{String.fromCharCode(i + 65)}</div>);
    }
    return legendTop;
  };

  /**
   * numbers on the left side of the table
   */
  const renderLegendLeft = () => {
    const legendLeft = [];
    for (let i = 0; i < height; i++) {
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
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        cells.push(<Cell key={index++} x={x} y={y} />);
      }
    }
    return cells;
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
