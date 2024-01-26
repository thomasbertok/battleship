import React from "react";
import Cell from "../Cell";
import style from "./Board.module.css";

const Board = () => {
  const width = 10;
  const height = 10;

  return (
    <div className={style.board}>
      {[...Array(height)].map((_, i) => [...Array(width)].map((_, j) => <Cell key={j} x={i + 1} y={j + 1} />))}
    </div>
  );
};

export default Board;
