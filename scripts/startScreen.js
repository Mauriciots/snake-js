function animation(boardWidth) {
  const rootEl = document.querySelector('#start-screen-snake')
  for (let i = 0; i < boardWidth; i++) {
    const tileEl = document.createElement('div')
    tileEl.style.background = 'transparent'
    tileEl.style.width = '31.25px'
    tileEl.style.height = '31.25px'
    tileEl.id = `snake-tile-${i}`
    rootEl.appendChild(tileEl)
  }

  let snakeTilesPos = [-5, -4, -3, -2, -1]
  let snakeAlign = 'center'

  const run = () => {
    snakeTilesPos = snakeTilesPos.map(t => t + 1)
    const toDraw = snakeTilesPos.filter(t => t >= 0 && t < 16)
    if (toDraw.length) {
      let count = 1
      for (let i = 0; i < boardWidth; i++) {
        const tileEl = document.querySelector(`#snake-tile-${i}`)
        const foundIndex = toDraw.findIndex(t => t === i)
        if (foundIndex >= 0) {
          tileEl.style.background = count === toDraw.length && snakeTilesPos[snakeTilesPos.length - 1] < 16 ? 'center / cover url(assets/snake-head-right.jpg)' : 'center / cover url(assets/snake-body.jpg)'
          count += 1
        } else {
          tileEl.style.background = 'transparent'
        }
      }
      rootEl.style.alignItems = snakeAlign
    } else {
      const random = Math.floor(Math.random() * 3)
      snakeTilesPos = [-5, -4, -3, -2, -1]
      snakeAlign = ['flex-start', 'flex-end', 'center'][random]
      console.log('reset snake animation')
    }
  }
  return {
    run,
  }
}

export { animation }