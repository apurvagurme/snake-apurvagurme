const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  increaseLength() {
    const [colId, rowId] = this.head;
    this.positions.push([colId + 1, rowId + 1]);
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  update() {
    this.colId = Math.floor(Math.random() * 100);
    this.rowId = Math.floor(Math.random() * 60);
  }
}

class Game {
  constructor(food, snake, ghostSnake) {
    this.food = food;
    this.snake = snake;
    this.ghostSnake = ghostSnake
  }

  get isFoodEaten() {
    const snake = JSON.stringify(this.snake.head);
    const food = JSON.stringify(this.food.position);
    console.log(snake, food);
    return snake == food;
  }

  updateFood() {
    this.food.update();
  }

  updateLengthOfSnake() {
    this.snake.increaseLength();
  }
}

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function (grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function () {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function (snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function (snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function (snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const eraseFood = function (food) {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food')
}

const drawFood = function (food) {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add(`food`);
};

const updateAfterFoodIsEaten = game => {
  setInterval(() => {
    if (game.isFoodEaten) {
      eraseFood(game.food);
      game.updateFood();
      drawFood(game.food);
      game.updateLengthOfSnake();
    }
  }, 100)
}

const main = function () {
  const snake = new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );

  const ghostSnake = new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );

  const food = new Food(5, 5);
  const game = new Game(food, snake, ghostSnake);
  attachEventListeners(snake);
  createGrids();
  drawSnake(snake);
  drawSnake(ghostSnake);
  drawFood(food);
  updateAfterFoodIsEaten(game);

  setInterval(() => {
    moveAndDrawSnake(snake);
    moveAndDrawSnake(ghostSnake);
  }, 200);

  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 50) {
      ghostSnake.turnLeft();
    }
  }, 500);
};
