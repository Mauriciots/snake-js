// Board size is 20 tiles (width) per 16 tiles (height)
const WIDTH = 28
const HEIGHT = 16

function segmentBuilder(x, y) {
  // Returns an object that represents the position of the snake's segments
  return { x, y }
}

function snakeBuilder(...snakeSegments) {
  const segments = snakeSegments

  const head = () => segments[segments.length - 1]

  const body = () => segments.slice(0, segments.length - 1).reverse()

  // Returns an object that represents the snake body with all its segments
  return {
    segments,
    head,
    body,
  }
}

function snakeHistoryBuilder(initialSnake) {
  // snakeHistory stores each version of snake in time
  // every time tick the last snake version is copied and changed
  // keeping the previous one in the array
  const history = [initialSnake]

  const getCurrentSnake = () => history[history.length - 1]

  const getPrevSnake = () => history.length > 1 ? history[history.length - 2] : null

  const move = (direction) => {
    if (detectCollision(direction)) {
      console.log(history)
      return false
    }

    switch (direction) {
      case 'RIGHT':
        return moveRight()
      case 'DOWN':
        return moveDown()
      default:
        throw new Error('Invalid direction')
    }
  }

  const moveRight = () => {
    const currentSnake = getCurrentSnake()
    const nextSnakeBody = currentSnake.segments.map(segment => segmentBuilder(segment.x + 1, segment.y))
    history.push(snakeBuilder(...nextSnakeBody))
    return true
  }

  const moveDownOld = () => {
    const currentSnake = getCurrentSnake()
    const currentHead = currentSnake.head()
    const newHead = segmentBuilder(currentHead.x, currentHead.y + 1)
    let prevSegment = newHead

    const newBody = currentSnake.body().map(segment => {
      const prevX = prevSegment.x
      prevSegment = segment
      if (segment.x !== newHead.x) {
        return segmentBuilder(prevX, segment.y)
      }
      return segmentBuilder(segment.x, segment.y + 1)
    })

    history.push(snakeBuilder(...newBody, newHead))
    return true
  }

  const moveBodyTowardsHead = (bodySegments, head) => {
    let prevSegment = {...head}
    const newBody = bodySegments.map(segment => {
      const newSegment = { ...prevSegment }
      prevSegment = segment
      return newSegment
    })
    newBody.reverse()
    return newBody
  }

  const moveDown = () => {
    const currentSnake = getCurrentSnake()
    const newHead = segmentBuilder(currentSnake.head().x, currentSnake.head().y + 1)
    const newBody = moveBodyTowardsHead(currentSnake.body(), currentSnake.head())
    history.push(snakeBuilder(...newBody, newHead))
    return true
  }

  const detectCollision = (direction) => {
    switch (direction) {
      case 'RIGHT':
        return getCurrentSnake().head().x === WIDTH - 1
      case 'DOWN':
        return getCurrentSnake().head().y === HEIGHT - 1
      default:
        throw new Error('Invalid direction')
    }
  }

  return {
    getCurrentSnake,
    getPrevSnake,
    move,
  }
}

function drawSnake(snakeHistory) {
  const changeTileColor = (snake, color) => {
    snake.segments.forEach(segment => {
      const tileEl = document.querySelector(`#tile-${segment.x}-${segment.y}`)
      tileEl.style.background = color
    })
  }
  // clear previous snake
  if (snakeHistory.getPrevSnake()) {
    changeTileColor(snakeHistory.getPrevSnake(), null)
  }
  // draw current snake
  changeTileColor(snakeHistory.getCurrentSnake(), '#005500')
}

export { segmentBuilder, snakeBuilder, snakeHistoryBuilder, drawSnake }
