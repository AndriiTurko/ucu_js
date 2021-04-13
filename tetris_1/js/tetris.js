function Tetris(state = GAME_STATES.PAUSED) {
  // Private properties
  const playground = PlaygroundFactory.getInstance();
  let gameInterval = null; // TODO: will need to use this for gameover and pause events

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
        console.log('event PAUSE'); // TODO: KILL/REMOVE INTERVAL?
        this.state = GAME_STATES.PAUSED; // ?? TODO:
      },
    }

    eventsMap[keyCode] && eventsMap[keyCode]();
  };

  const destroyLine = () => {
    for (let i = 0; i < PLAYGROUND_HEIGHT; i++){

      const temp_row = helperMethods.getRow(i);
      // console.log('3');

      let check = true;
      let cellNode = temp_row.firstElementChild;
      for (; cellNode !== temp_row.lastElementChild.nextElementSibling; cellNode = cellNode.nextElementSibling) {
        // console.log('5');
        // console.log(cellNode.className.toString().substr(5, 5));
        if (cellNode.className.length === 4 || cellNode.className.substr(5, 5) === DEFAULT_COLOR){
          // console.log('lol');
          check = false;
          break;
        }
      }
      console.log('check ', check);

      if (check) {
        let cellNode = temp_row.firstElementChild;
        for (; cellNode !== temp_row.lastElementChild.nextElementSibling; cellNode = cellNode.nextElementSibling) {
          cellNode && cellNode.setAttribute('class', `cell ${DEFAULT_COLOR}`);
        }
        console.log(this.figures.length)
        for (let f = 0; f < this.figures.length-1; f++){
          for (let c = 0; c < this.figures[f].cells.length; c++){
            if (this.figures[f].cells[c].y > i){
              this.figures[f].cells[c].moveDown();
            }
          }

        }
      }

    }
  };

  const checkForGameOver = () => {
    // TODO
  };

  // public methods
  this.play = () => {
    this.state = GAME_STATES.PLAYING; // TODO:

    playground.render();
    document.addEventListener('keydown', ({keyCode}) =>  events(keyCode));

    gameInterval = setInterval(() => { // TODO: maybe it's better to have a separate method for this?
      getCurrentFigure().moveDown();
      checkForGameOver(); // TODO
    }, INTERVAL);
  };
}

const tetris = new Tetris();
tetris.play()
