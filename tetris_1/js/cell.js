// x, y - direction
// color - the given color on create
// figureID - defines the relation on one figure
// state - will be used in the situation when destruction of cell(s) will free up space for figure movement
function Cell(x, y, color, figureId, obstacles, state = STATES.FALLING) {
  // Public properties
  this.x = x;
  this.y = y;
  this.color = color;
  this.state = state;
  this.figureId = figureId;
  this.obstacles = obstacles;

  // Private methods
  const hasObstaclesFor = (direction) => {
    const directions = {
      [DOWN]:  { x: this.x,     y: this.y - 1 },
      [RIGHT]: { x: this.x + 1, y: this.y },
      [LEFT]:  { x: this.x - 1, y: this.y },
    };
    const {x, y} = directions[direction];

    return this.obstacles.some(({cells}) =>
      cells.some(cell => cell.figureId !== this.figureId && cell.x === x && cell.y === y)
    );
  }

  const willReachBoarders = (direction) => {
    const directions = {
      [DOWN]:  this.y - 1 < 0,
      [RIGHT]: this.x + 1 > PLAYGROUND_WIDTH - 1, // TODO: looks strange, no? +1 -1 :)
      [LEFT]:  this.x - 1 < 0,
    };

    return directions[direction]
  }

  // Public methods
  this.validFor = (direction) =>
    !hasObstaclesFor(direction) && !willReachBoarders(direction);

  // TODO: deRender and render are identical. it's possible to refactor.
  //       also, this seems to be more of playground class responsibility?
  this.deRender = () =>
    helperMethods.styleCell(this.x, this.y, DEFAULT_COLOR);

  this.render = () =>
    helperMethods.styleCell(this.x, this.y, this.color);

  this.moveDown = () => { // TODO: moveDown, moveRight, moveLeft are almost identical. please refactor
    this.y--;
    this.render();
  };

  this.moveRight = () => {
    this.x++;
    this.render()
  };

  this.moveLeft = () => {
    this.x--;
    this.render()
  };

  this.destroy = () => {
    this.x += 1000;
    this.y -= 1000
    // TODO: make sure this object no longer exists in the memory.
    //       maybe it will be better to have this kind of function in Figure object
  }
}
