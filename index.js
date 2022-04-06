import { segmentBuilder, snakeBuilder, snakeHistoryBuilder, drawSnake } from './scripts/snake.js'

// Board size is 20 tiles (width) per 16 tiles (height)
const WIDTH = 28
const HEIGHT = 16

function drawBoard() {

  const boardInnerEl = document.querySelector('#game-board')
  const tileSize = boardInnerEl.scrollHeight / HEIGHT
  
  const createTileElement = (isEven, id) => {
    const tileEl = document.createElement('div')
    tileEl.classList.add('tile', isEven ? 'tile-even' : 'tile-odd')
    tileEl.style.height = `${tileSize}px`
    tileEl.style.width = `${tileSize}px`
    tileEl.id = id
    return tileEl
  }

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      const isEven = (j + i) % 2 === 0
      boardInnerEl.appendChild(createTileElement(isEven, `tile-${i}-${j}`))
    }
  }
  
  boardInnerEl.style.width = `${tileSize * WIDTH}px`
}

function setRootElementSize() {
  const rootEl = document.querySelector('#game-root')
  rootEl.style.width = `${window.innerWidth}px`
  rootEl.style.height = `${window.innerHeight}px`
}

(function() {
  const initialSnake = snakeBuilder(
    segmentBuilder(14, 8),
    segmentBuilder(13, 8),
    segmentBuilder(12, 8),
  )
  const snakeHistory = snakeHistoryBuilder(initialSnake)
  let direction = 'RIGHT'

  setRootElementSize()
  drawBoard()
  drawSnake(snakeHistory)

  window.addEventListener('keydown', e => {
    const LEFT_RIGHT = ['LEFT', 'RIGHT'].includes(direction)
    const UP_DOWN = ['UP', 'DOWN'].includes(direction)
    switch (e.key) {
      case 'ArrowUp':
        if (LEFT_RIGHT) {
          direction = 'UP';
        }
        break
      case 'ArrowDown':
        if (LEFT_RIGHT) {
          direction = 'DOWN';
        }
        break
      case 'ArrowRight':
        if (UP_DOWN) {
          direction = 'RIGHT';
        }
        break
      case 'ArrowLeft':
        if (UP_DOWN) {
          direction = 'LEFT';
        }
        break
      default:
        // please ignore other keys
        break
    }
  })

  // setTimeout(() => {
  //   snakeHistory.move('DOWN')
  //   drawSnake(snakeHistory)
  // }, 300)

  const intervalId = setInterval(() => {
    if (!snakeHistory.move(direction)) {
      clearInterval(intervalId)
      return
    }
    drawSnake(snakeHistory)
  }, 300)
})();
