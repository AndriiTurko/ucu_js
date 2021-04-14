// falling - new figure is put on the playground
// static - figure stopped moving. This happens when there are obstacles for any cells bellow
function Figure(obstacles, state = STATES.FALLING) {
  // Public properties
  this.cells = [];
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.id = helperMethods.idGenerator.next().value;
  this.state = state;
  this.obstacles = obstacles;

  // Private methods
  const validFor = (direction) =>
    this.cells.every(cell => cell.validFor(direction));

  // initialise figure cells
  const addCell = (x, y) =>
    this.cells.push(new Cell(x, y, this.color, this.id, this.obstacles, this.state));

  const generateCoordinates = () =>
    INITIAL_POSITIONS[Math.floor(Math.random() * INITIAL_POSITIONS.length)];

  generateCoordinates().forEach(([y, x]) =>
    addCell(x, y));

  // Public methods
  this.moveDown = () => {
    if (validFor(DOWN)) {
      this.cells.forEach(cell => cell.deRender());
      this.cells.forEach(cell => cell.moveDown());
    } else {
      this.state = STATES.STATIC
    }
  };

  this.moveRight = () => { // TODO: move right and move left are almost identical
    if (!validFor(RIGHT)) return;

    this.cells.forEach(cell => cell.deRender());
    this.cells.forEach(cell => cell.moveRight());
  };

  this.moveLeft = () => {
    if (!validFor(LEFT)) return;

    this.cells.forEach(cell => cell.deRender());
    this.cells.forEach(cell => cell.moveLeft());
  };

  this.rotate = () => {
    // TODO: this is complicated. But really can be solved with basic math.
    //       make sure you are rotating around the center element
    //       all figures will be either 3 cells wide or 3 cells height
  }
}
