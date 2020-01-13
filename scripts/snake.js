class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  increaseLength(food) {
    this.positions.unshift(food);
  }

  hasTouchedWall(noOfCols, noOfRows) {
    return this.head[0] >= noOfCols || this.head[0] < 0 &&
      this.head[1] >= noOfRows || this.head[1] <= 0;
  }

  hasTouchedItself() {
    const bodyParts = this.positions.slice(0, -1);
    let equalPositions = 0;
    bodyParts.forEach(part => {
      if (part[0] == this.head[0] && part[1] == this.head[1]) {
        equalPositions++;
      }
    });
    if (equalPositions > 0) {
      return true;
    }
  }
}
