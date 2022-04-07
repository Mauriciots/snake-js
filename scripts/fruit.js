const FRUIT_COLOR = '#FF0000'

function fruitManagerBuilder(boardWidth, boardHeight) {
  let fruitTile = null

  const drop = (tiles, snake) => {
    const availableTiles = tiles.filter(tile => 
      !snake.segments.find(segment => segment.x === tile.x && segment.y === tile.y)
    )
    const chosenIndex = Math.floor(Math.random() * availableTiles.length)
    fruitTile = availableTiles[chosenIndex]

    document.querySelector(`#tile-${fruitTile.x}-${fruitTile.y}`).style.background = FRUIT_COLOR
  }

  const eat = (snake) => {
    const snakeHead = snake.head()
    return snakeHead.x === fruitTile.x && snakeHead.y === fruitTile.y
  }

  return {
    drop,
    eat,
  }
}

export { fruitManagerBuilder }