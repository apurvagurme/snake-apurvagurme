class Game {
  #food;
  #snake;
  #scores;

  constructor(food, snake, scores) {
    this.#food = new Food(food.colId, food.rowId);
    this.#snake = new Snake(snake.position, snake.direction, snake.type);
    this.#scores = scores;
  }

  get status() {
    const snakeStatus = this.#snake.status;
    const foodStatus = this.#food.status;
    const scores = this.#scores;

    return {
      snake: snakeStatus, food: foodStatus,
      scores: scores
    }
  }

  isFoodEaten() {
    const snake = JSON.stringify(this.#snake.head);
    const food = JSON.stringify(this.#food.position);
    return snake == food;
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
    return this.#snake.hasTouchedItself() || this.#snake.hasTouchedWall(noOfCols, noOfRows);
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
