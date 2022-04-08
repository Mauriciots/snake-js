import { boardManagerBuilder } from './scripts/board.js'
import { segmentBuilder, snakeBuilder, snakeHistoryBuilder, drawSnake } from './scripts/snake.js'
import { fruitManagerBuilder } from './scripts/fruit.js'

// Board size
const WIDTH = 16
const HEIGHT = 16
const BEST_SCORE_STORAGE_KEY = 'snakejs-best-score'

function renderStartScreen() {
  const rootEl = document.querySelector('#start-screen-snake')
  for (let i = 0; i < WIDTH; i++) {
    const tileEl = document.createElement('div')
    tileEl.style.background = 'transparent'
    tileEl.style.width = '31.25px'
    tileEl.style.height = '31.25px'
    tileEl.id = `snake-tile-${i}`
    rootEl.appendChild(tileEl)
  }

  let snakeTilesPos = [-5, -4, -3, -2, -1]
  
  setInterval(() => {
    snakeTilesPos = snakeTilesPos.map(t => t + 1)
    const toDraw = snakeTilesPos.filter(t => t >= 0 && t < 16)
    if (toDraw.length) {
      for (let i = 0; i < WIDTH; i++) {
        const tileEl = document.querySelector(`#snake-tile-${i}`)
        console.log(i, toDraw)
        if (toDraw.find(t => t === i)) {
          tileEl.style.background = 'black'
        } else {
          tileEl.style.background = 'transparent'
        }
      }
    } else {
      const rootEl = document.querySelector('#start-screen-snake')
      const random = Math.floor(Math.random() * 3)
      snakeTilesPos = [-5, -4, -3, -2, -1]
      rootEl.style.alignItems = ['flex-start', 'flex-end', 'center'][random]
      console.log('reset snake animation')
    }
  }, 150)
}

renderStartScreen()

function drawScore(score) {
  const bestIconEl = document.querySelector('#best-icon')
  const scoreEl = document.querySelector('#game-play-score')
  const bestScoreEl = document.querySelector('#game-play-best')

  scoreEl.innerHTML = score

  const bestScore = parseInt(localStorage.getItem(BEST_SCORE_STORAGE_KEY)) || 0
  let newBest = score && score > bestScore ? score : bestScore
  if (newBest) {
    bestScoreEl.innerHTML = newBest
  }
  bestIconEl.style.display = newBest ? 'inline' : 'none'
}

function displayGameover(score) {
  document.querySelector('#game-play').classList.toggle('hidden-screen')
  document.querySelector('#game-over').classList.toggle('hidden-screen')
  document.querySelector('#game-over-score').innerHTML = `Score: ${score}`

  const bestScore = parseInt(localStorage.getItem(BEST_SCORE_STORAGE_KEY)) || 0

  const scoreImgEl = document.querySelector('#game-over-score-img')
  const newBestEl = document.querySelector('#new-best-score')

  if (score > bestScore) {
    scoreImgEl.setAttribute('src', 'assets/medal.png')
    newBestEl.style.display = 'block'
    // save new record
    localStorage.setItem(BEST_SCORE_STORAGE_KEY, score)
  } else {
    newBestEl.style.display = 'none'
    scoreImgEl.setAttribute('src', 'assets/apple.png')
  }
}

function game() {
  let points = 0
  const initialSnake = snakeBuilder(
    segmentBuilder(8, 8),
    segmentBuilder(7, 8),
    segmentBuilder(6, 8),
  )
  const snakeHistory = snakeHistoryBuilder(WIDTH, HEIGHT, initialSnake)
  let direction = 'RIGHT'
  
  const boardManager = boardManagerBuilder(WIDTH, HEIGHT)

  drawScore(0)
  drawSnake(snakeHistory, direction)

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
      setTimeout(() => displayGameover(points), 400)
      return
    }
    if (fruitManager.eat(snakeHistory.getCurrentSnake())) {
      snakeHistory.grow()
      points += 1
      drawScore(points)
      fruitManager.drop(boardManager.tiles, snakeHistory.getCurrentSnake())
    }
    drawSnake(snakeHistory, direction)
  }, 150)
}

(function() {
  document.querySelector('#start-btn').addEventListener('click', () => {
    document.querySelector('#start-screen').classList.toggle('hidden-screen')
    document.querySelector('#game-play').classList.toggle('hidden-screen')
    game()
  })

  document.querySelector('#back-btn').addEventListener('click', () => {
    document.querySelector('#game-over').classList.toggle('hidden-screen')
    document.querySelector('#start-screen').classList.toggle('hidden-screen')
  })
})();
