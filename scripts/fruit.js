// const FRUIT_BG = 'url(../assets/apple.png)'

function fruitManagerBuilder(boardWidth, boardHeight) {
  let fruitTile = null

  const drop = (tiles, snake) => {
    const availableTiles = tiles.filter(tile => 
      !snake.segments.find(segment => segment.x === tile.x && segment.y === tile.y)
    )
    const chosenIndex = Math.floor(Math.random() * availableTiles.length)
    fruitTile = availableTiles[chosenIndex]

    document.querySelector(`#tile-${fruitTile.x}-${fruitTile.y}`).classList.add('tile-fruit')
  }

  const eat = (snake) => {
    const snakeHead = snake.head()
    const fruitReachable = snakeHead.x === fruitTile.x && snakeHead.y === fruitTile.y
    if (fruitReachable) {
      document.querySelector(`#tile-${fruitTile.x}-${fruitTile.y}`).classList.remove('tile-fruit')
    }
    return fruitReachable
  }

  return {
    drop,
    eat,
  }
}

export { fruitManagerBuilder }