import { useEffect } from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Cell from "../Cell";
import style from "./Board.module.css";

const Board = ({ battleField }) => {
  const [board, initBoard, setBoardCell, setShipsRemaining, setPlayerWins] = useAppStore(
    useShallow((state) => [
      state.board,
      state.initBoard,
      state.setBoardCell,
      state.setShipsRemaining,
      state.setPlayerWins,
    ])
  );

  const { cols, rows, ocean } = battleField;

  /**
   * on load
   * init board
   */
  useEffect(() => {
    // init state with battelfield board
    initBoard(ocean);
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
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < cols; column++) {
        cells.push(<Cell key={index++} row={row} col={column} onClick={handleCellClick} />);
      }
    }
    return cells;
  };

  /**
   * handle board cell click event
   *
   */
  const handleCellClick = (row, col, val) => {
    // update board state
    setBoardCell(row, col, val);
    // update battlefield state
    battleField.updateFieldCell(row, col, val);
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
        <div className={`${style.boardWrapper}`}>
          <div className={style.top}>{renderLegendTop()}</div>
          <div className={style.board}>{renderCells()}</div>
          <div className={style.leftSide}>{renderLegendLeft()}</div>
        </div>
      )}
    </>
  );
};

export default Board;
