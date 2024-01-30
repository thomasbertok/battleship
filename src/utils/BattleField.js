const CELL_WATER = 0;
const CELL_MISSED = 1;
const CELL_SHIP = 2;
const CELL_HIT = 3;

/**
 * Ship class with coords
 * and sunk status
 */
class Ship {
  constructor(coords) {
    this.coords = coords;
    console.log("> New ship added:", coords);
  }

  // set value to hit if ship is hit
  setHit(row, col) {
    this.coords.forEach((coord) => {
      if (coord[0] === row && coord[1] === col) {
        coord[2] = CELL_HIT;
      }
    });
  }

  // check if coords are on ship
  isShip(row, col) {
    return this.coords.some((coord) => coord[0] === row && coord[1] === col);
  }

  // check if ship is sunk
  isSunk() {
    return this.coords.every((coord) => coord[2] === CELL_HIT);
  }
}

/**
 * Battlefield
 * creates a 2d array of width x height
 * with state codes 0 1 2 3
 *
 * fleet - array of ships objects
 *
 * createField        - creates 2d array
 * addShip            - adds ship
 * isValidPlacement   - checks if ship placement is valid
 * isFLeetSunk        - checks if all ships are sunk
 * getShipsRemaining  - returns number of ships not sunk
 * updateFieldCell    - updates field cell with new state
 *
 * @param {number} width
 * @param {number} height
 * @returns {BattleField}
 */

class BattleField {
  constructor(width, height) {
    // width and height
    this.rows = height;
    this.cols = width;

    // battlefield array with state codes 0 1 2 3
    this.ocean = [];
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
    console.log("> Creating battlefield...");
    this.ocean = Array.from({ length: this.cols }, () => Array(this.rows).fill(CELL_WATER));
  }

  // ship placement validity checker
  isValidPlacement(row, col, isVertical, len) {
    console.log(
      `>> Checking validity for: [${row + 1},${col + 1}], ${isVertical ? "vertical" : "horizontal"}, length: ${len}`
    );
    if (isVertical) {
      let sum = 0;
      // vertical
      // check if cells are empty
      for (let i = 0; i < len; i++) {
        //console.log("***", row + i + 1, col + 1, this.ocean[row + i][col], "***");
        sum += this.ocean[row + i][col];
      }

      return sum === 0;
    } else {
      // horizontal, we're in a single subarray
      // check if cells are empty
      return this.ocean[row].slice(col, col + len).reduce((a, b) => a + b, 0) === 0;
    }
  }

  // add a ship to the field/fleet
  addShip(len) {
    console.log("> Adding ship...");

    // initialize ship properties
    let col = -1;
    let row = -1;
    let isVertical = false;
    let tries = 0;

    let isValid = false;

    // try creating new choords for the ship
    // until a valid position is found
    // where there is no collision with another ship
    do {
      // decide orientation
      isVertical = Math.random() > 0.5;

      // create random starting coords
      // where the whole ship can be placed top-bottom, left-right
      if (isVertical) {
        row = Math.floor(Math.random() * (this.rows - len));
        col = Math.floor(Math.random() * this.cols);
      } else {
        row = Math.floor(Math.random() * this.rows);
        col = Math.floor(Math.random() * (this.cols - len));
      }

      isValid = this.isValidPlacement(row, col, isVertical, len);
      tries++;

      !isValid && console.log(`!! Invalid placement: [${row + 1}, ${col + 1}] after try nr.${tries}`);
      // console.log(`col: ${col}, row: ${row}, isVertical: ${isVertical}, len: ${len}`);
    } while (!isValid && tries < 100);

    // if we're good to add the new ship
    if (isValid) {
      console.log(`>> Coords OK: [${row + 1}, ${col + 1}]`);
      // init coordinates of the new ship
      let shipCoords = [];
      // add ship pieces to field
      // and gather ship coordinates
      for (let i = 0; i < len; i++) {
        if (isVertical) {
          this.ocean[row + i][col] = CELL_SHIP;
          shipCoords.push([row + i, col, CELL_SHIP]);
        } else {
          this.ocean[row][col + i] = CELL_SHIP;
          shipCoords.push([row, col + i, CELL_SHIP]);
        }
      }
      // create new ship object
      const newShip = new Ship(shipCoords);
      // add ship object to fleet
      this.fleet.push(newShip);
    } else {
      console.log(`! Only invalid coords found. Tried ${tries} times.`);
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
  updateFieldCell(row, col, value) {
    this.ocean[row][col] = value;

    if (value === CELL_HIT) {
      this.fleet.forEach((ship) => {
        if (ship.isShip(row, col)) {
          console.log("-- OH SHIP! --");
          ship.setHit(row, col);
          if (ship.isSunk()) {
            console.log("-- SHIP SUNK! --");
          }
        }
      });
    }
  }
}

export default BattleField;
