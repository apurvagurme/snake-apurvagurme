class Game {
  constructor(food, snake, ghostSnake) {
    this.food = food;
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.scores = 0;
  }

  isFoodEaten() {
    const snake = JSON.stringify(this.snake.head);
    const food = JSON.stringify(this.food.position);
    const ghostSnake = JSON.stringify(this.ghostSnake.head);
    console.log(ghostSnake, food);
    return snake == food || ghostSnake == food;
  }

  updateFood() {
    this.food.update();
  }

  updateLengthOfSnake() {
    this.snake.increaseLength(this.food.position);
  }

  updateScore() {
    this.scores = this.scores + 1;
    updateScores(this.scores);
  }

  isGameEnded(noOfCols, noOfRows) {
    return this.snake.hasTouchedItself() ||
      this.snake.hasTouchedWall(noOfCols, noOfRows);
  }
}
