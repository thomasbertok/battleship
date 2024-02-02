const CELL_WATER = 0;
const CELL_SHIP = 2;
const CELL_HIT = 3;
const CELL_SUNK = 4;

/**
 * Ship class with coords
 * and sunk status
 */
class Ship {
  constructor(coords) {
    this.sunkenShip = false;
    this.coords = coords;
    console.log("--- New ship added:", coords);
  }

  // set value to hit if ship is hit
  setHit(row, col) {
    this.coords.forEach((coord) => {
      if (coord[0] === row && coord[1] === col) {
        coord[2] = CELL_HIT;
      }
    });
    this.sunkenShip = this.coords.every((coord) => coord[2] === CELL_HIT);
  }

  setSunk() {
    this.coords.forEach((coord) => {
      coord[2] = CELL_SUNK;
    });
    this.sunkenShip = true;
  }

  // check if coords are on ship
  isShip(row, col) {
    return this.coords.some((coord) => coord[0] === row && coord[1] === col);
  }

  // check if ship is sunk
  isSunk() {
    return this.sunkenShip;
  }
}

/**
 * Battlefield
 * creates a 2d array of width x height
 * with state codes 0 1 2 3
 *
 * fleet - array of ships objects
 *
 * createOcean        - creates 2d array
 * isValidPlacement   - checks if ship placement is valid
 * addShip            - adds randomly placed ship with given size
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
    this.createOcean();

    // add ships
    this.addShip(5);
    this.addShip(4);
    this.addShip(4);
    // this.addShip(3);

    console.log("> Battlefield ready <");
    // console.log(this.ocean);
  }

  // create 2d array filling it with 0s
  createOcean() {
    console.log("> Creating ocean...");
    this.ocean = Array.from({ length: this.cols }, () => Array(this.rows).fill(CELL_WATER));
  }

  // ship placement validity checker
  isValidPlacement(row, col, isVertical, len) {
    console.log(
      `--- Checking validity for: [${row + 1},${col + 1}], ${isVertical ? "vertical" : "horizontal"}, length: ${len}`
    );
    // sum of desired places should be 0
    if (isVertical) {
      let sum = 0;
      // vertical
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
    console.log(`> Adding ship (${len})...`);

    // initialize ship properties
    let col = -1;
    let row = -1;
    let tries = 0;
    let isValid = false;
    let isVertical = false;

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

      !isValid && console.log(`!!! Not OK: [${row + 1}, ${col + 1}]  ${tries}. try`);
      // console.log(`col: ${col}, row: ${row}, isVertical: ${isVertical}, len: ${len}`);
    } while (!isValid && tries < 100);

    // if we're good to add the new ship
    if (isValid) {
      console.log(`--- Coords OK: [${row + 1}, ${col + 1}]`);

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

      // create new ship object with coordinates
      const newShip = new Ship(shipCoords);

      // add ship object to fleet
      this.fleet.push(newShip);
    } else {
      console.log(`! Only invalid coords found. Tried ${tries} times.`);
    }
  }
}

export default BattleField;
