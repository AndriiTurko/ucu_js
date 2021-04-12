// Playground
const PLAYGROUND_HEIGHT = 15;
const PLAYGROUND_WIDTH = 7;
const PLAYGROUND_NODE_ID = 'playgound';

// colors
const COLORS = ['red', 'purple', 'green', 'yellow', 'blue'];
const DEFAULT_COLOR = 'white';

// figures and cells states
const STATES = {
  FALLING: 'FALLING',
  STATIC: 'STATIC'
};

// default positions for objects
// TODO: would be nice to be able to "generate" an object. There must be some generic rules?
const INITIAL_POSITIONS = [
  [[PLAYGROUND_HEIGHT + 1, 1], [PLAYGROUND_HEIGHT, 1], [PLAYGROUND_HEIGHT, 2], [PLAYGROUND_HEIGHT, 3]],
  [[PLAYGROUND_HEIGHT + 2, 2], [PLAYGROUND_HEIGHT + 1, 2], [PLAYGROUND_HEIGHT, 2]],
  [[PLAYGROUND_HEIGHT + 2, 3], [PLAYGROUND_HEIGHT + 1, 3], [PLAYGROUND_HEIGHT, 3]],
];

// key codes for keydown events
const DOWN = 40;
const RIGHT = 39;
const LEFT = 37;
const PAUSE = 32;

// Game constants
const INTERVAL = 1000;
const GAME_STATES = {
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING',
  GAMEOVER: 'GAMEOVER' // TODO
};
