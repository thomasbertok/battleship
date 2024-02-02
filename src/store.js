import { create } from "zustand";

// battlefiled states
export const useAppStore = create((set) => ({
  // 2 dimensional array of state codes
  board: [],

  // array of ship opbjects from battlefield
  fleet: [],

  // how many hits player has made
  hitCount: 0,

  // how many successful hits player has made
  successfulHits: 0,

  // how many ships player has left to destroooy
  shipsRemaining: 0,

  // coordinates input
  playerInput: "",

  // winner, winner
  playerWins: false,

  // show ships
  showShips: false,

  // methods
  // update player input
  setPlayerInput: (input) => set({ playerInput: input }),
  // update hit count
  setHitCount: (hitCount) => set({ hitCount: hitCount }),
  // incerement hit count
  incrementHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),
  // update ships remaining
  setShipsRemaining: (shipsRemaining) => set({ shipsRemaining: shipsRemaining }),
  // update player wins
  setPlayerWins: (playerWins) => set({ playerWins: playerWins }),

  // init board
  initBoard: (battlefield) =>
    set({
      fleet: battlefield.fleet,
      board: battlefield.ocean,
      hitCount: 0,
      successfulHits: 0,
      totalShips: battlefield.fleet.length,
      shipsRemaining: battlefield.fleet.length,
      playerInput: "",
    }),

  // update board cell
  setBoardCell: (x, y, value) => {
    set((state) => ({
      // update board cells in (x,y) to value
      board: state.board.map((row, i) => (i === x ? row.map((cell, j) => (j === y ? value : cell)) : row)),

      // increment hit count
      hitCount: state.hitCount + 1,

      // increment successful hit count if value is 3
      successfulHits: value === 3 ? state.successfulHits + 1 : state.successfulHits,

      // update fleet
      fleet: state.fleet.map((ship) => {
        // if we hit a ship
        if (ship.isShip(x, y)) {
          ship.setHit(x, y);
          console.log("-- OH SHIP! --");

          // if the ship is sunk by this hit
          if (ship.isSunk()) {
            ship.setSunk();
            console.log("-- SHIP SUNK! --");
          }
        } else {
          // if we missed
          console.log("-- MISS! --");
        }
        return ship;
      }),

      // count ships not sunk
      shipsRemaining: state.fleet.reduce((acc, ship) => acc + (ship.isSunk() ? 0 : 1), 0),

      // player wins if all ships sunk
      playerWins: state.totalShips === state.fleet.reduce((acc, ship) => acc + (ship.isSunk() ? 1 : 0), 0),
    }));
  },

  // toggle show ships
  toggleShowShips: () => set((state) => ({ showShips: !state.showShips })),
}));
