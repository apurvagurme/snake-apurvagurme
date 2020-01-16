const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;
const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) => document.getElementById(getCellId(colId, rowId));

const updateScores = scores => (document.getElementById('score').innerText = `SCORE IS: ${scores}`);

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(game) {
  const snake = game.getTailAndSpecies('snake');
  snake.cell.classList.remove(snake.species);
  const ghostSnake = game.getTailAndSpecies('ghostSnake');
  ghostSnake.cell.classList.remove(ghostSnake.species);
};

const drawSnake = function(snake) {
  snake.positions.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.type);
  });
};

const moveAndDrawSnake = function(game) {
  game.moveSnake();
  eraseTail(game);
  const gameStatus = game.status;
  drawSnake(gameStatus.snake);
  drawSnake(gameStatus.ghostSnake);
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.turnSnake('snake');
};

const eraseFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.remove('food');
};

const drawFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.add('food');
};

const afterFoodIsEaten = function(game) {
  const gameStatus = game.status;
  eraseFood(gameStatus.food);
  game.update();
  const newGameStatus = game.status;
  drawFood(newGameStatus.food);
};

const updateAfterFoodIsEaten = function(game, interval) {
  if (game.isGameEnded(NUM_OF_COLS, NUM_OF_ROWS)) {
    alert('Game Over');
    clearInterval(interval);
  }
  if (game.isFoodEaten()) {
    afterFoodIsEaten(game);
  }
};

const getSnakeData = function() {
  return {
    position: [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    direction: new Direction(EAST),
    type: 'snake'
  };
};

const getGhostSnakeData = function() {
  return {
    position: [
      [30, 30],
      [31, 30],
      [32, 30]
    ],
    direction: new Direction(SOUTH),
    type: 'ghost'
  };
};

const randomlyTurnSnake = game => {
  let x = Math.random() * 100;
  if (x > 50) {
    game.turnSnake('ghostSnake');
  }
};

const createGame = function() {
  const food = { colId: 44, rowId: 30 };
  const snake = getSnakeData();
  const ghostSnake = getGhostSnakeData();
  const scores = 0;
  const game = new Game(food, snake, ghostSnake, scores);
  return game;
};

const setup = function(game) {
  attachEventListeners(game);
  createGrids();
};

const main = function() {
  const game = createGame();
  setup(game);

  const gameInterval = setInterval(() => {
    updateAfterFoodIsEaten(game, gameInterval);
    moveAndDrawSnake(game);
    randomlyTurnSnake(game);
  }, 200);
};
