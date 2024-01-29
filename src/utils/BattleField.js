class Ship {
  constructor(coords) {
    this.coords = coords;
    console.log("ship created", this.coords);
  }

  setHit(col, row) {
    this.coords.forEach((coord) => {
      if (coord[0] === col && coord[1] === row) {
        coord[2] = 3;
      }
    });
  }

  isShip(col, row) {
    return this.coords.some((coord) => coord[0] === col && coord[1] === row);
  }

  isSunk() {
    return this.coords.every((coord) => coord[2] === 3);
  }
}

/**
 * Battlefield
 * @param {number} width
 * @param {number} height
 * @returns {BattleField}
 */

class BattleField {
  constructor(width, height) {
    // width and height
    this.cols = width;
    this.rows = height;

    // battlefield array with state codes 0 1 2 3
    this.field = [];
    // array of ships (objects with coords and sunk status)
    this.fleet = [];

    // initialize field
    this.createField();

    // add ships
    this.addShip(5);
    this.addShip(4);
    this.addShip(4);
  }

  createField() {
    console.log(">>> Creating battlefield...");
    this.field = Array.from({ length: this.cols }, () => Array(this.rows).fill(0));
  }

  // add a ship to the field/fleet
  addShip(len) {
    // placement validity checker
    const isValidPlacement = (col, row, isVertical, len) => {
      if (isVertical) {
        let sum = 0;
        // vertical
        // check if cells are empty
        for (let i = 0; i < len; i++) {
          sum += this.field[row + i][col];
        }
        return sum === 0;
      } else {
        // horizontal, we're in a single subarray
        // check if cells are empty
        return this.field[row].slice(col, col + len).reduce((a, b) => a + b, 0) === 0;
      }
    };

    console.log(">>> Adding ship...");

    // initialize ship properties
    let col = -1;
    let row = -1;
    let isVertical = false;
    let tries = 0;

    // try creating new choords for the ship
    // until a valid position is found
    // where there is no collision with another ship ([x,y] != 0)
    do {
      // decide orientation
      isVertical = Math.random() > 0.5;

      // create random starting coords
      if (isVertical) {
        col = Math.floor(Math.random() * this.cols);
        row = Math.floor(Math.random() * (this.rows - len));
      } else {
        col = Math.floor(Math.random() * (this.cols - len));
        row = Math.floor(Math.random() * this.rows);
      }

      // console.log(`>>> roundtripts to find valid coord ${++tries}.`);
      // console.log(`col: ${col}, row: ${row}, isVertical: ${isVertical}, len: ${len}`);
    } while (!isValidPlacement(col, row, isVertical, len));

    // if we're good to add the new ship
    if (col !== -1 || row !== -1) {
      // init coordinates of the new ship
      let shipCoords = [];
      // add ship pieces to field
      // and gather ship coordinates
      for (let i = 0; i < len; i++) {
        if (isVertical) {
          this.field[col][row + i] = 2;
          shipCoords.push([col, row + i, 2]);
        } else {
          this.field[col + i][row] = 2;
          shipCoords.push([col + i, row, 2]);
        }
      }
      // create new ship object
      const newShip = new Ship(shipCoords);
      // add ship object to fleet
      this.fleet.push(newShip);
    }
  }

  // check if all ships are sunk
  isFleetSunk() {
    return this.fleet.every((ship) => ship.isSunk());
  }

  getSunkenShips() {
    return this.fleet.filter((ship) => ship.isSunk());
  }

  getShipsRemaining() {
    return this.fleet.length - this.fleet.filter((ship) => ship.isSunk()).length;
  }

  // update battlefield cell
  updateFieldCell(col, row, value) {
    this.field[col][row] = value;

    if (value === 3) {
      this.fleet.forEach((ship) => {
        if (ship.isShip(col, row)) {
          console.log("-- OH SHIP! --");
          ship.setHit(col, row);
          if (ship.isSunk()) {
            console.log("-- SHIP SUNK! --");
          }
        }
      });
    }
  }
}

export default BattleField;
