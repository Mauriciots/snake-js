function board() {
  // Board size is 20 tiles (width) per 16 tiles (height)
  const WIDTH = 28
  const HEIGHT = 16

  const boardInnerEl = document.querySelector('#game-board')
  const tileSize = boardInnerEl.scrollHeight / HEIGHT
  
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      const isEven = (j + i) % 2 === 0
      const newTileEl = document.createElement('div')
      newTileEl.classList.add('tile', isEven ? 'tile-even' : 'tile-odd')
      newTileEl.style.height = `${tileSize}px`
      newTileEl.style.width = `${tileSize}px`
      newTileEl.id = `tile-${i}-${j}`
      boardInnerEl.appendChild(newTileEl)
      boardInnerEl.style.width = `${tileSize * WIDTH}px`
    }
  }
}

(function() {

  const rootEl = document.querySelector('#game-root')
  rootEl.style.width = `${window.innerWidth}px`
  rootEl.style.height = `${window.innerHeight}px`

  board()
})();
