function boardManagerBuilder(boardWidth, boardHeight) {
  const tiles = []
  const boardInnerEl = document.querySelector('#game-board')
  const tileSize = boardInnerEl.scrollHeight / boardHeight

  const createTileElement = (isEven, id) => {
    const tileEl = document.createElement('div')
    tileEl.classList.add('tile', isEven ? 'tile-even' : 'tile-odd')
    tileEl.style.height = `${tileSize}px`
    tileEl.style.width = `${tileSize}px`
    tileEl.id = id
    return tileEl
  }

  // Start up board
  for (let x = 0; x < boardWidth; x++) {
    for (let y = 0; y < boardHeight; y++) {
      tiles.push({ x, y })
    }
  }

  tiles.forEach(({x, y}) => {
    const isEven = (x + y) % 2 === 0
    boardInnerEl.appendChild(createTileElement(isEven, `tile-${x}-${y}`))
  })

  boardInnerEl.style.width = `${tileSize * boardWidth}px`

  return {
    tiles,
  }
}

export { boardManagerBuilder }