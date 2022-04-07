import { boardManagerBuilder } from './scripts/board.js'
import { segmentBuilder, snakeBuilder, snakeHistoryBuilder, drawSnake } from './scripts/snake.js'
import { fruitManagerBuilder } from './scripts/fruit.js'

// Board size
const WIDTH = 16
const HEIGHT = 16

function drawScore(score) {
  console.log('score', score)
}

(function() {
  let points = 0
  const initialSnake = snakeBuilder(
    segmentBuilder(8, 8),
    segmentBuilder(7, 8),
    segmentBuilder(6, 8),
  )
  const snakeHistory = snakeHistoryBuilder(WIDTH, HEIGHT, initialSnake)
  let direction = 'RIGHT'
  
  const boardManager = boardManagerBuilder(WIDTH, HEIGHT)

  drawSnake(snakeHistory)

  const fruitManager = fruitManagerBuilder(WIDTH, HEIGHT)
  fruitManager.drop(boardManager.tiles, snakeHistory.getCurrentSnake())

  let pressedKey = null

  window.addEventListener('keydown', e => pressedKey = e.key)

  const changeDirection = () => {
    const isLeftOrRightDirection = ['LEFT', 'RIGHT'].includes(direction)
    const isUpOrDownDirection = ['UP', 'DOWN'].includes(direction)
    switch (pressedKey) {
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
  }

  const intervalId = setInterval(() => {
    changeDirection()
    if (!snakeHistory.move(direction)) {
      clearInterval(intervalId)
      return
    }
    if (fruitManager.eat(snakeHistory.getCurrentSnake())) {
      snakeHistory.grow()
      points += 10
      drawScore(points)
      fruitManager.drop(boardManager.tiles, snakeHistory.getCurrentSnake())
    }
    drawSnake(snakeHistory)
  }, 300)
})();
