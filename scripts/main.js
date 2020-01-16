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

const eraseTail = function(snake) {
  const [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.type);
};

const drawSnake = function(snake) {
  snake.positions.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.type);
  });
};

const updateSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const updateFood = function(food) {
  drawFood(food);
  eraseFood(food);
};

const moveAndDrawSnake = function(game, gameInterval) {
  if (game.hasGameEnded(NUM_OF_COLS, NUM_OF_ROWS)) {
    alert('game ended');
    clearInterval(gameInterval);
  }
  game.moveSnake();
  const { food, snake, ghostSnake } = game.status;
  updateSnake(snake);
  updateSnake(ghostSnake);
  updateFood(food);
};

const attachEventListeners = game => {
  document.body.onkeydown = () => game.turnSnake('snake');
};

const eraseFood = function(food) {
  const [colId, rowId] = food.previousFood;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const drawFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.add('food');
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
  const food = { colId: 44, rowId: 30, previousFood: [0, 0] };
  const snake = getSnakeData();
  const ghostSnake = getGhostSnakeData();
  const scores = 0;
  const game = new Game(food, snake, ghostSnake, scores);
  return game;
};

const setup = function(game) {
  attachEventListeners(game);
  createGrids();
  const gameStatus = game.status;
  drawFood(gameStatus.food);
};

const main = function() {
  const game = createGame();
  setup(game);

  const gameInterval = setInterval(() => {
    moveAndDrawSnake(game, gameInterval);
    randomlyTurnSnake(game);
  }, 200);
};
