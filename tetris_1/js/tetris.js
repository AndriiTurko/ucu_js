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

    for (let i = 0; i < PLAYGROUND_HEIGHT; i++){
      let check = true;
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
      this.state = GAME_STATES.PAUSED;
      document.removeEventListener('keydown', listener);
      document.addEventListener('keydown', pause);
    }
    else {
      console.log('Continue playing)');
      this.state = GAME_STATES.PLAYING
      document.removeEventListener('keydown', pause);
      document.addEventListener('keydown', listener);

    }
  }

  const checkForGameOver = () => {
    if (this.figures.find(figure => figure.state === STATES.STATIC && figure.cells.find(cell => cell.y >= PLAYGROUND_HEIGHT-1))){
      console.log("GAME-OVER");
      this.state = GAME_STATES.GAMEOVER;
    }
  };

  const gameOver = (gameInterval) => {
    document.removeEventListener('keydown', listener);
    clearInterval(gameInterval);
  }

  const listener = ({keyCode}) => events(keyCode);
  const pause = ({keyCode}) => keyCode === PAUSE && events(keyCode);

  // public methods
  this.play = () => {
    this.state = GAME_STATES.PLAYING;

    playground.render();
    document.addEventListener('keydown', listener);

    let gameInterval = setInterval(() => {
      checkForGameOver();
      if (this.state === GAME_STATES.PLAYING) {
        getCurrentFigure().moveDown();
      } else if (this.state === GAME_STATES.GAMEOVER) {
        gameOver(gameInterval);
      }
    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
