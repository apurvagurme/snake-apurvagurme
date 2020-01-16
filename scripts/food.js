class Food {
  #colId;
  #rowId;
  #previousFood;
  constructor(colId, rowId, previousFood) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#previousFood = previousFood;
  }

  get status() {
    const colId = this.#colId;
    const rowId = this.#rowId;
    const previousFood = this.#previousFood;
    return { colId, rowId, previousFood };
  }

  get position() {
    return [this.#colId, this.#rowId];
  }

  update() {
    this.#previousFood = this.position;
    this.#colId = Math.floor(Math.random() * 100);
    this.#rowId = Math.floor(Math.random() * 60);
  }
}
