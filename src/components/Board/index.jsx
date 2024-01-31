import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Cell from "../Cell";
import style from "./Board.module.css";

const Board = ({ battleField }) => {
  const [board, setBoardCell, setShipsRemaining, setPlayerWins, incrementHitCount] = useAppStore(
    useShallow((state) => [
      state.board,
      state.setBoardCell,
      state.setShipsRemaining,
      state.setPlayerWins,
      state.incrementHitCount,
    ])
  );

  const { rows, cols } = battleField;

  /**
   * letters on the top of the table
   */
  const renderLegendHorizontal = () => {
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

  const applyHit = (row, col, val) => {
    // update board cell
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

  /**
   * handle board cell click event
   *
   */
  const handleCellClick = (row, col, val) => {
    applyHit(row, col, val);
  };

  return (
    <>
      {board[9] !== undefined && (
        <div className={`${style.boardWrapper}`}>
          <div className={style.top}>{renderLegendHorizontal(cols)}</div>
          <div className={style.board}>{renderCells()}</div>
          <div className={style.leftSide}>{renderLegendVertical(rows)}</div>
        </div>
      )}
    </>
  );
};

export default Board;
