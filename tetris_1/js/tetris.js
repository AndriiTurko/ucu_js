function Tetris(state = GAME_STATES.PAUSED) {
  // Private properties
  const playground = PlaygroundFactory.getInstance();
  let gameInverval = null; // TODO: will need to use this for gameover and pause events

  // public properties
  this.figures = []; // TODO: seems to not be accesable outside

  // Private methods
  const addFigure = () => {
    const newFigure = new Figure(this.figures);
    this.figures.push(newFigure);
    return newFigure;
  };

  const getCurrentFigure = () =>
    this.figures.find(figure => figure.state === STATES.FALLING) || addFigure();

  const events = (keyCode) => { // TODO: this seems to have refactoring potential
    const eventsMap = {
      [DOWN]() {
        getCurrentFigure().moveDown();
      },
      [RIGHT]() {
        getCurrentFigure().moveRight();
      },
      [LEFT]() {
        getCurrentFigure().moveLeft();
      },
      [PAUSE]() {
        console.log('event PAUSE'); // TODO: KILL/REMOVE INTERVAL?
        this.state = GAME_STATES.PAUSED; // ?? TODO:
      },
    }

    eventsMap[keyCode] && eventsMap[keyCode]();
  };

  const destroyLine = () => {
    // TODO
  };

  const checkForGameOver = () => {
    // TODO
  };

  // public methods
  this.play = () => {
    this.state = GAME_STATES.PLAYING; // TODO:

    playground.render();
    document.addEventListener('keydown', ({keyCode}) =>  events(keyCode));

    gameInverval = setInterval(() => { // TODO: maybe it's better to have a separate method for this?
      getCurrentFigure().moveDown();
      destroyLine(); // TODO: not sure where this method shoud be. Maybe in moveDown?
      checkForGameOver(); // TODO
    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
