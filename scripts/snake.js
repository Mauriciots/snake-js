function segmentBuilder(x, y) {
  // Returns an object that represents the position of the snake's segments
  return { x, y }
}

function snakeBuilder(...snakeSegments) {
  const segments = snakeSegments

  const head = () => segments[0]

  const body = () => segments.slice(1, segments.length)

  const tail = () => segments[segments.length - 1]

  // Returns an object that represents the snake body with all its segments
  return {
    segments,
    head,
    body,
    tail,
  }
}

function snakeHistoryBuilder(boardWidth, boardHeight, initialSnake) {
  // snakeHistory stores each version of snake in time
  // every clock tick the last snake version is copied and changed
  // keeping the previous one in the array
  const history = [initialSnake]

  const getCurrentSnake = () => history[history.length - 1]

  const getPrevSnake = () => history.length > 1 ? history[history.length - 2] : null

  const move = (direction) => {
    switch (direction) {
      case 'RIGHT':
        moveSnake(1, 0)
        break
      case 'LEFT':
        moveSnake(-1, 0)
        break
      case 'DOWN':
        moveSnake(0, 1)
        break
      case 'UP':
        moveSnake(0, -1)
        break
      default:
        throw new Error('Invalid direction')
    }
    return !detectCollision(direction)
  }

  const moveSnake = (xStep, yStep) => {
    const currentSnake = getCurrentSnake()
    const newHead = segmentBuilder(currentSnake.head().x + xStep, currentSnake.head().y + yStep)
    const newBody = moveBodyTowardsHead(currentSnake.body(), currentSnake.head())
    history.push(snakeBuilder(newHead, ...newBody))
  }

  const moveBodyTowardsHead = (bodySegments, head) => {
    let prevSegment = {...head}
    return bodySegments.map(segment => {
      const newSegment = { ...prevSegment }
      prevSegment = segment
      return newSegment
    })
  }

  const detectCollision = (direction) => {
    // detect tail collision
    const head = getCurrentSnake().head()
    if (getCurrentSnake().body().find(segment => segment.x === head.x && segment.y === head.y)) {
      return true
    }

    // detect wall collision
    switch (direction) {
      case 'RIGHT':
        return getCurrentSnake().head().x === boardWidth
      case 'LEFT':
        return getCurrentSnake().head().x === -1
      case 'DOWN':
        return getCurrentSnake().head().y === boardHeight
      case 'UP':
        return getCurrentSnake().head().y === -1
      default:
        throw new Error('Invalid direction')
    }
  }

  const grow = () => {
    const prevSnakeTail = getPrevSnake().tail()
    const newSegment = {...prevSnakeTail}
    const newSnake = snakeBuilder(...getCurrentSnake().segments, newSegment)
    history.push(newSnake)
  }

  return {
    getCurrentSnake,
    getPrevSnake,
    move,
    grow,
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
