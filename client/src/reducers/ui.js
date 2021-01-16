import initialState from '../constants/initialState'

import cellTypes from '../constants/cellTypes'

import {
  UI_PAINTER_BRUSH_WALL,
  UI_PAINTER_BRUSH_SLUDGE,
  UI_PAINTER_STRENGTH_SET,
} from '../actions/types'


export default function ui (state = initialState.ui, action) {
  const { type, payload } = action
  switch (type) {
    case UI_PAINTER_BRUSH_WALL: return painterBrushWall (state, payload)
    case UI_PAINTER_BRUSH_SLUDGE: return painterBrushSludge (state, payload)
    case UI_PAINTER_STRENGTH_SET: return painterStrengthSet (state, payload)
    default: return state
  }
}

function painterBrushWall (state) {
  return {
    ...state,
    painter: {
      ...state.painter,
      brush: cellTypes.WALL
    }
  }
}

function painterBrushSludge (state, payload) {
  const { weight } = payload
  return {
    ...state,
    painter: {
      ...state.painter,
      brush: cellTypes.SLUDGE,
      weight,
    }
  }
}

function painterStrengthSet (state, payload) {
  const { strength } = payload
  return {
    ...state,
    painter: {
      ...state.painter,
      strength
    }
  }
}