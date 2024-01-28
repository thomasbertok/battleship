const battleField = (width, height) => {
  let field = [];

  const setRandomPos = () => {
    const randX = Math.floor(Math.random() * width);
    const randY = Math.floor(Math.random() * height);
    return [randX, randY];
  };

  const addShip = (len) => {
    const [x, y] = setRandomPos();
    if (field[x][y] === 0) {
      field[x][y] = 2;
    }
    console.log(`Added ship to (${x}, ${y}) with length: ${len}`);
  };

  const createField = () => {
    field = [];
    for (let x = 0; x < width; x++) {
      field.push([]);
      for (let y = 0; y < height; y++) {
        field[x].push(0);
      }
    }
  };

  console.log("Creating battlefield...");
  createField();
  console.log("Adding ships...");
  addShip(5);
  addShip(4);
  addShip(4);
  console.log("Battlefield ready!");

  return field;
};

export default battleField;
