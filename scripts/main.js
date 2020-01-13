const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;
const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const updateScores = (scores) => document.getElementById('score').innerText = `SCORE IS: ${scores}`

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
  cell.classList.add('food');
};

const afterFoodIsEaten = function (game) {
  eraseFood(game.food);
  game.updateFood();
  drawFood(game.food);
  game.updateLengthOfSnake();
  game.updateScore();
}

const updateAfterFoodIsEaten = game => {
  setInterval(() => {
    if (game.isGameEnded(NUM_OF_COLS, NUM_OF_ROWS)) {
      alert('Game Over');
    };
    if (game.isFoodEaten()) {
      afterFoodIsEaten(game);
    }
  }, 100)
}

const initSnake = function () {
  return new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );
}

const initGhostSnake = function () {
  return new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );
}

const initGame = function () {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(44, 30);
  const game = new Game(food, snake, ghostSnake);
  return game;
};

const setup = function (game) {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
  updateAfterFoodIsEaten(game);
}

const changeDirection = function (ghostSnake) {
  setInterval(() => {
    let x = Math.random() * 100;
    if (x > 50) {
      ghostSnake.turnLeft();
    }
  }, 500);
}

const moveSnakes = function (game) {
  setInterval(() => {
    moveAndDrawSnake(game.snake);
    moveAndDrawSnake(game.ghostSnake);
  }, 200);
}

const main = function () {
  const game = initGame();
  setup(game);
  changeDirection(game.ghostSnake);
  moveSnakes(game);
};
