import { create } from "zustand";

export const useAppStore = create((set) => ({
  // battlefiled state
  // 2 dimensional array of state codes
  // 0 = empty
  // 1 = ship
  // 2 = hit
  // 3 = miss
  board: [],

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

  // incerement hit count
  incrementHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),

  // update successful hits
  setSuccessfulHits: (successfulHits) => set({ successfulHits: successfulHits }),

  // update ships remaining
  setShipsRemaining: (shipsRemaining) => set({ shipsRemaining: shipsRemaining }),

  // init board
  initBoard: (board) =>
    set({
      board: board,
      hitCount: 0,
      successfulHits: 0,
      shipsRemaining: 3,
      playerInput: "",
    }),

  // set board
  setBoard: (newBoard) => set({ board: newBoard }),

  // update board cell
  setBoardCell: (x, y, value) => {
    set((state) => ({
      board: state.board.map((row, i) => (i === x ? row.map((cell, j) => (j === y ? value : cell)) : row)),
    }));
  },

  allShipsDestroyed: () => {
    return shipsRemaining === 0;
  },
}));
