class Game {
  #food;
  #snake;
  #scores;

  constructor(food, snake) {
    this.#food = new Food(food.colId, food.rowId);
    this.#snake = new Snake(snake.position, snake.direction, snake.type);
    this.#scores = 0;
  }

  get status() {
    const snake = this.#snake;
    const food = this.#food;
    const scores = this.#scores;

    return {
      snake: snake, food: food,
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

  getCellToRemove() {
    let [colId, rowId] = this.#snake.previousTail;
    const cell = getCell(colId, rowId);
    const species = this.#snake.species;
    return { cell, species };
  }

  turnGhostLeft() {
    this.#snake.turnLeft();
  }
}
