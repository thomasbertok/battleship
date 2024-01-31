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

  // won
  playerWins: false,

  // show ships
  showShips: true,

  // setters

  // update player input
  setPlayerInput: (input) => set({ playerInput: input }),

  // update hit count
  setHitCount: (hitCount) => set({ hitCount: hitCount }),

  // incerement hit count
  incrementHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),

  // update successful hits
  setSuccessfulHits: (successfulHits) => set({ successfulHits: successfulHits }),

  // update ships remaining
  setShipsRemaining: (shipsRemaining) => set({ shipsRemaining: shipsRemaining }),

  // update player wins
  setPlayerWins: (playerWins) => set({ playerWins: playerWins }),

  // init board
  initBoard: (board) =>
    set({
      board: board,
      hitCount: 0,
      successfulHits: 0,
      totalShips: 3,
      shipsRemaining: 3,
      playerInput: "",
    }),

  // set board
  setBoard: (newBoard) => set({ board: newBoard }),

  getBoardCell: (x, y) => {
    return get().board[x][y];
  },

  // update board cell
  setBoardCell: (x, y, value) => {
    set((state) => ({
      // update board cells in (x,y) to value
      board: state.board.map((row, i) => (i === x ? row.map((cell, j) => (j === y ? value : cell)) : row)),
      hitCount: state.hitCount + 1,
      // increment hit count if value is 3
      successfulHits: value === 3 ? state.successfulHits + 1 : state.successfulHits,
    }));
  },

  allShipsDestroyed: () => {
    return shipsRemaining === 0;
  },

  // toggle show ships
  toggleShowShips: () => set((state) => ({ showShips: !state.showShips })),
}));
