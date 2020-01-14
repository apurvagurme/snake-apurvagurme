class Food {
  #colId;
  #rowId;
  constructor(colId, rowId) {
    this.#colId = colId;
    this.#rowId = rowId;
  }

  get status() {
    const colId = this.#colId;
    const rowId = this.#rowId;
    return { colId, rowId }

  }

  get position() {
    return [this.#colId, this.#rowId];
  }

  update() {
    this.#colId = Math.floor(Math.random() * 100);
    this.#rowId = Math.floor(Math.random() * 60);
  }
}
