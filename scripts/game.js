class Game {
  #food;
  #snake;
  #ghostSnake;
  #scores;
  constructor(food, snake, ghostSnake, scores) {
    this.#food = new Food(food.colId, food.rowId);
    this.#snake = new Snake(snake.position, snake.direction, snake.type);
    this.#ghostSnake = new Snake(ghostSnake.position, ghostSnake.direction, ghostSnake.type);
    this.#scores = scores;
  }

  get status() {
    const snakeStatus = this.#snake.status;
    const ghostSnakeStatus = this.#ghostSnake.status;
    const foodStatus = this.#food.status;
    const scores = this.#scores;

    return {
      snake: snakeStatus,
      food: foodStatus,
      scores: scores,
      ghostSnake: ghostSnakeStatus
    };
  }

  isFoodEaten() {
    const checkColId = this.#snake.head[0] == this.#food.position[0];
    const checkRowId = this.#snake.head[1] == this.#food.position[1];
    return checkColId && checkRowId;
  }

  isGameEnded(noOfCols, noOfRows) {
    const verticalLine = [0, noOfCols];
    const horizontalLine = [0, noOfRows];
    return (
      this.#snake.hasTouchedItself() || this.#snake.hasTouchedWall(verticalLine, horizontalLine)
    );
  }

  moveSnake() {
    this.#snake.move();
    this.#ghostSnake.move();
  }

  getTailAndSpecies() {
    return this.#snake.tailAndSpecies();
  }

  getGhostTailAndSpecies() {
    return this.#ghostSnake.tailAndSpeciesOfGhost();
  }

  turnGhostSnake() {
    this.#ghostSnake.turnLeft();
  }

  handleKeyPress() {
    this.#snake.turnLeft();
  }

  update() {
    this.#snake.increaseLength(this.#food.position);
    this.#scores = this.#scores + 1;
    updateScores(this.#scores);
    this.#food.update();
  }
}
