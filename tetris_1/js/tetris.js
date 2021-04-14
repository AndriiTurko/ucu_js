function Tetris(state = GAME_STATES.PAUSED) {
  // Private properties
  const playground = PlaygroundFactory.getInstance();
   // TODO: will need to use this for gameover and pause events
  this.state = state;

  // public properties
  this.figures = []; // TODO: seems to not be accessible outside

  // Private methods
  const addFigure = () => {
    destroyLine();
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
        checkForPause();
      },
    }

    eventsMap[keyCode] && eventsMap[keyCode]();
  };

  const destroyLine = () => {
    // while (check){
    let check = true;
    for (let i = 0; i < PLAYGROUND_HEIGHT; i++){

      const temp_row = helperMethods.getRow(i);
      let cellNode = temp_row.firstElementChild;
      for (; cellNode !== temp_row.lastElementChild.nextElementSibling; cellNode = cellNode.nextElementSibling) {

        if (cellNode.className.length === 4 || cellNode.className.substr(5, 5) === DEFAULT_COLOR){
          check = false;
          break;
        }
      }

      if (check) {
        let temp_fig = []
        for (let f = 0; f < this.figures.length; f++){
          this.figures[f].cells.filter(el => el.y === i).forEach(cell => cell.deRender());
          this.figures[f].cells.filter(el => el.y === i).forEach(cell => cell.destroy());

          temp_fig.push(this.figures[f].id);
        }
        for (let f of temp_fig){
          this.figures.filter(el => el.id !== f);
        }
        console.log((this.figures));

        // console.log(this.figures.length)
        for (let f = 0; f < this.figures.length; f++){
          this.figures[f].cells.filter(c => c.y > i).forEach(cell => cell.deRender());
          this.figures[f].cells.filter(c => c.y > i).forEach(cell => cell.moveDown());
        }
      }

    }
  }

  const checkForPause = () => {
    if (this.state === GAME_STATES.PLAYING){
      console.log('event PAUSE');
      this.state = GAME_STATES.PAUSED;
    }
    else {
      console.log('Continue playing)');
      this.state = GAME_STATES.PLAYING
    }
  }

  const checkForGameOver = () => {
    if (this.figures.find(figure => figure.state === STATES.STATIC && figure.cells.find(cell => cell.y >= PLAYGROUND_HEIGHT-1))){
      console.log("GAME-OVER");
      this.state = GAME_STATES.GAMEOVER;
    }
  };

  // public methods
  this.play = () => {
    this.state = GAME_STATES.PLAYING; // TODO:

    playground.render();
    document.addEventListener('keydown', ({keyCode}) =>  events(keyCode));

    let gameInterval = setInterval(() => { // TODO: maybe it's better to have a separate method for this?
      if (this.state === GAME_STATES.PLAYING) {
        getCurrentFigure().moveDown();
        checkForGameOver();
      } else if (this.state === GAME_STATES.GAMEOVER) {
        console.log("kukhar molodets")
        document.removeEventListener('keydown', ({keyCode}) => events(keyCode));
        clearInterval(gameInterval);
      }

    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
