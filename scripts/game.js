class Game {
  #food;
  #snake;
  #gostSnake;
  #scores;
  constructor(food, snake, ghostSnake, scores) {
    this.#food = new Food(food.colId, food.rowId);
    this.#snake = new Snake(snake.position, snake.direction, snake.type);
    this.#snake = new Snake(ghostSnake.position, ghostSnake.direction, ghostSnake.type);
    this.#scores = scores;
  }

  get status() {
    const snakeStatus = this.#snake.status;
    const foodStatus = this.#food.status;
    const scores = this.#scores;

    return {
      snake: snakeStatus,
      food: foodStatus,
      scores: scores
    };
  }

  isFoodEaten() {
    const checkColId = this.#snake.head[0] == this.#food.position[0];
    const checkRowId = this.#snake.head[1] == this.#food.position[1];
    return checkColId && checkRowId;
  }

  updateFood() {
    this.#food.update();
  }

  updateLengthOfSnake() {
    this.#snake.increaseLength(this.#food.position);
  }

  updateScore() {
    this.#scores = this.#scores + 1;
    updateScores(this.#scores);
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
  }

  getTailAndSpecies() {
    return this.#snake.tailAndSpecies();
  }

  turnGhostLeft() {
    this.#snake.turnLeft();
  }

  handleKeyPress() {
    this.#snake.turnLeft();
  }
}
