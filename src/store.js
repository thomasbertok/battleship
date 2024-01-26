import { create } from "zustand";

export const useAppStore = create((set) => ({
  // battlefiled state
  board: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  // how many hits player has made
  hitCount: 0,

  // how many successful hits player has made
  successfulHits: 0,

  // how many ships player has left to destroooy
  shipsRemaining: 3,

  // coordinates input
  playerInput: "",

  // setters

  // update player input
  setPlayerInput: (playerInput) => set({ playerInput: playerInput }),

  // update hit count
  setHitCount: (hitCount) => set({ hitCount: hitCount }),

  // update successful hits
  setSuccessfulHits: (successfulHits) => set({ successfulHits: successfulHits }),

  // update ships remaining
  setShipsRemaining: (shipsRemaining) => set({ shipsRemaining: shipsRemaining }),

  // reset board
  setBoard: (board) => set({ board: board }),

  // update board cell
  setBoardCell: (value, x, y) =>
    set({ board: board.map((row, i) => (i === y ? row.map((cell, j) => (j === x ? value : cell)) : row)) }),
}));
