import initialState from "../constants/initialState";

import cellTypes from "../constants/cellTypes";

import {
  LAYOUT_CELL_TOGGLE,
  LAYOUT_CELL_WALL_TOGGLE,
  LAYOUT_CELL_FLOOR_TOGGLE,
  LAYOUT_CELL_SLUDGE_TOGGLE,
  LAYOUT_CELL_DRAG_START,
  LAYOUT_CELL_DRAG_ENTER,
  LAYOUT_CELL_DRAG_DROP,
  LAYOUT_CELL_WRITE_MULTIPLE,
} from '../actions/types'


export default function board (state = initialState.board, action) {
  const { type, payload } = action
  switch (type) {
    case LAYOUT_CELL_WRITE_MULTIPLE: return cellWriteMultiple (state, payload)
    case LAYOUT_CELL_TOGGLE: return cellToggle (state, payload)
    case LAYOUT_CELL_WALL_TOGGLE: return cellWallToggle (state, payload)
    case LAYOUT_CELL_FLOOR_TOGGLE: return cellFloorToggle (state, payload)
    case LAYOUT_CELL_SLUDGE_TOGGLE: return cellSludgeToggle (state, payload)
    case LAYOUT_CELL_DRAG_START: return cellDragStart (state, payload)
    case LAYOUT_CELL_DRAG_ENTER: return cellDragEnter (state, payload)
    case LAYOUT_CELL_DRAG_DROP: return cellDragDrop (state, payload)
    default: return state
  }
}

function cellWriteMultiple (state, payload) {
  const layout = []

  state.layout.forEach((row, y) => {
    if (!layout[y]) layout[y] = []
    row.forEach((col, x) => {
      layout[y][x] = { ...col }
    })
  })

  payload.cells.forEach(cell => {
    const { x, y, attrs } = cell
    console.log(cell)
    layout[y][x] = { ...state.layout[y][x], ...attrs }
  })

  return {
    ...state,
    layout
  }
}

function cellToggle (state, payload) {
  const { y, x, override } = payload
  // console.log({ y, x, override })
  const layout = [ ...state.layout ]
  const active = override !== undefined ? override : !layout[y][x].active
  layout[y][x] = { ...layout[y][x], active }
  return {
    ...state,
    layout
  }
}

function cellWallToggle (state, payload) {
  const { y, x } = payload
  const layout = [ ...state.layout ]
  layout[y][x].mode = cellTypes.WALL
  return {
    ...state,
    layout
  }
}

function cellFloorToggle (state, payload) {
  const { y, x } = payload
  const layout = [ ...state.layout ]
  layout[y][x].mode = cellTypes.FLOOR
  return {
    ...state,
    layout
  }
}

function cellSludgeToggle (state, payload) {
  const { y, x, weight } = payload
  const layout = [ ...state.layout ]
  layout[y][x].mode = cellTypes.SLUDGE
  layout[y][x].weight = weight
  return {
    ...state,
    layout
  }
}

function cellDragStart (state, payload) {
  const { x, y, } = payload
  const { mode } = state.layout[y][x]
  return {
    ...state,
    dragging: {
      ...state.dragging,
      x,
      y,
      mode,
      origin: {
        ...state.dragging.origin,
        x,
        y,
        mode,
      }
    }
  }
}

function cellDragEnter (state, payload) {
  const { x, y, } = payload
  const layout = [ ...state.layout ]
  if (!state.dragging.accept_moves.includes(layout[y][x].mode)) return state
  layout[y][x].mode = state.dragging.mode
  layout[state.dragging.y][state.dragging.x].mode = cellTypes.FLOOR
  return {
    ...state,
    layout,
    dragging: {
      ...state.dragging,
      x,
      y,
    }
  }
}

function cellDragDrop (state, payload) {
  return state
}