function boardManagerBuilder(boardWidth, boardHeight) {
  const tiles = []

  const createTileElement = (isEven, id) => {
    const tileEl = document.createElement('div')
    tileEl.classList.add('tile', isEven ? 'tile-even' : 'tile-odd')
    tileEl.id = id
    return tileEl
  }

  // Start up board
  for (let x = 0; x < boardWidth; x++) {
    for (let y = 0; y < boardHeight; y++) {
      tiles.push({ x, y })
    }
  }

  const boardInnerEl = document.querySelector('#game-board')
  tiles.forEach(({x, y}) => {
    const isEven = (x + y) % 2 === 0
    boardInnerEl.appendChild(createTileElement(isEven, `tile-${x}-${y}`))
  })

  return {
    tiles,
  }
}

export { boardManagerBuilder }