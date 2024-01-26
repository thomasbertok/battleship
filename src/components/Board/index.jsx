import React from "react";
import Cell from "../Cell";
import style from "./Board.module.css";

const Board = () => {
  const width = 10;
  const height = 10;

  return (
    <div className={style.boardWrapper}>
      <div className={style.top}>
        {[...Array(height)].map((_, i) => {
          return <div key={i}>{String.fromCharCode(i + 65)}</div>;
        })}
      </div>
      <div className={style.board}>
        {[...Array(height)].map((_, i) => [...Array(width)].map((_, j) => <Cell key={j} x={i + 1} y={j + 1} />))}
      </div>
      <div className={style.leftSide}>
        {[...Array(height)].map((_, i) => {
          return <div key={i}>{i + 1}</div>;
        })}
      </div>
    </div>
  );
};

export default Board;
