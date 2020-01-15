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

const eraseTail = function (game) {
  const { cell, species } = game.getTailAndSpecies();
  cell.classList.remove(species);
};

const drawSnake = function (snake) {
  snake.positions.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.type);
  });
};

const moveAndDrawSnake = function (game) {
  game.moveSnake();
  eraseTail(game);
  const gameStatus = game.status;
  drawSnake(gameStatus.snake);
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.handleKeyPress();
};

const eraseFood = function (food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.remove('food')
}

const drawFood = function (food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.add('food');
};

const afterFoodIsEaten = function (game) {
  const gameStatus = game.status;
  eraseFood(gameStatus.food);
  game.updateFood();
  const newGameStatus = game.status;
  drawFood(newGameStatus.food);
  game.updateLengthOfSnake();
  game.updateScore();
}

const updateAfterFoodIsEaten = game => {
  const interval = setInterval(() => {
    if (game.isGameEnded(NUM_OF_COLS, NUM_OF_ROWS)) {
      alert('Game Over');
      clearInterval(interval);
    };
    if (game.isFoodEaten()) {
      afterFoodIsEaten(game);
    }
  }, 200)
}

const getSnakeData = function () {
  return {
    position: [
      [40, 30],
      [41, 30],
      [42, 30]
    ], direction: new Direction(EAST),
    type: 'snake'
  }
}

const createGame = function () {
  const food = { colId: 44, rowId: 30 };
  const snake = getSnakeData();
  const scores = 0;
  const game = new Game(food, snake, scores);
  return game;
};

const setup = function (game) {
  attachEventListeners(game);
  createGrids();
  updateAfterFoodIsEaten(game);
}

const moveSnakes = function (game) {
  setInterval(() => {
    moveAndDrawSnake(game);
  }, 200);
};

const main = function () {
  const game = createGame();
  setup(game);
  updateAfterFoodIsEaten(game);
  moveSnakes(game);
};