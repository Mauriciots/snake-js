import { boardManagerBuilder } from './scripts/board.js'
import { segmentBuilder, snakeBuilder, snakeHistoryBuilder, drawSnake } from './scripts/snake.js'
import { fruitManagerBuilder } from './scripts/fruit.js'

// Board size is 28 tiles (width) per 16 tiles (height)
const WIDTH = 28
const HEIGHT = 16

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
  
  const boardManager = boardManagerBuilder(WIDTH, HEIGHT)

  drawSnake(snakeHistory)

  const fruitManager = fruitManagerBuilder(WIDTH, HEIGHT)
  fruitManager.drop(boardManager.tiles, snakeHistory.getCurrentSnake())

  window.addEventListener('keydown', e => {
    const isLeftOrRightDirection = ['LEFT', 'RIGHT'].includes(direction)
    const isUpOrDownDirection = ['UP', 'DOWN'].includes(direction)
    switch (e.key) {
      case 'ArrowUp':
        if (isLeftOrRightDirection) {
          direction = 'UP';
        }
        break
      case 'ArrowDown':
        if (isLeftOrRightDirection) {
          direction = 'DOWN';
        }
        break
      case 'ArrowRight':
        if (isUpOrDownDirection) {
          direction = 'RIGHT';
        }
        break
      case 'ArrowLeft':
        if (isUpOrDownDirection) {
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
    if (fruitManager.eat(snakeHistory.getCurrentSnake())) {
      snakeHistory.grow()
      fruitManager.drop(boardManager.tiles, snakeHistory.getCurrentSnake())
    }
    drawSnake(snakeHistory)
    // fruitManager.drop(snakeHistory.getCurrentSnake())
  }, 300)
})();
