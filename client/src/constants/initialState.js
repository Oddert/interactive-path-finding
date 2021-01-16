import cellTypes from "./cellTypes"

const w = 20//50
const h = 20//30

const cell = {
  mode: cellTypes.FLOOR,
  weight: 1,
  visited: false,
}

const defaultLayout = () => {
  const board = []

  for (let y = 0; y < h; y++) {
    const row = []
    for (let x = 0; x < w; x++) {
      const col = { ...cell }
      row.push(col)
    }
    board.push(row)
  }

  const r = n => Math.floor(Math.random() * n)
  board[r(h)][r(w)].mode = 'start_point'
  board[r(h)][r(w)].mode = 'mid_point'
  board[r(h)][r(w)].mode = 'end_point'
  return board
}

const initialState = {
  board: {
    layout: defaultLayout(),
    dragging: {
      accept_moves: [undefined, cellTypes.FLOOR],
      x: null,
      y: null,
      mode: null,
      origin: {
        x: null,
        y: null,
        mode: null,
      }
    },
  },
  animate: {
    current: []
  },
  ui: {
    cursor_mode: 0,
    painter: {
      brush: cellTypes.WALL,
      strength: 10,
    }
  },
}

export default initialState


// cursor_mode
// 0: Paint - Draw walls