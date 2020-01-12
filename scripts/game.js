class Game {
  constructor(food, snake, ghostSnake) {
    this.food = food;
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.scores = 0;
  }

  get isFoodEaten() {
    const snake = JSON.stringify(this.snake.head);
    const food = JSON.stringify(this.food.position);
    return snake == food;
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
}
