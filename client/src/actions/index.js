import * as types from './types'

export const layoutCellWriteMultiple = (cells = []) => ({
  type: types.LAYOUT_CELL_WRITE_MULTIPLE,
  payload: {
    cells
  }
})

export const layoutCellToggle = (y, x, override) => ({
  type: types.LAYOUT_CELL_TOGGLE,
  payload: {
    y, x, override
  }
})

export const layoutCellWallToggle = (y, x) => ({
  type: types.LAYOUT_CELL_WALL_TOGGLE,
  payload: {
    y, x,
  }
})

export const layoutCellFloorToggle = (y, x) => ({
  type: types.LAYOUT_CELL_FLOOR_TOGGLE,
  payload: {
    y, x,
  }
})

export const layoutCellSludgeToggle = (y, x, weight = 10) => ({
  type: types.LAYOUT_CELL_SLUDGE_TOGGLE,
  payload: {
    y, x, weight,
  }
})

export const layoutCellDragStart = (y, x) => ({
  type: types.LAYOUT_CELL_DRAG_START,
  payload: {
    y, x,
  }
})

export const layoutCellDragEnter = (y, x) => ({
  type: types.LAYOUT_CELL_DRAG_ENTER,
  payload: {
    y, x,
  }
})

export const layoutCellDragDrop = (y, x) => ({
  type: types.LAYOUT_CELL_DRAG_DROP,
  payload: {
    y, x,
  }
})

export const uiPainterBrushWall = () => ({
  type: types.UI_PAINTER_BRUSH_WALL
})

export const uiPainterBrushSludge = (weight = 10) => ({
  type: types.UI_PAINTER_BRUSH_SLUDGE,
  payload: {
    weight
  }
})

export const uiPainterStrengthSet = (strength = 10) => ({
  type: types.UI_PAINTER_STRENGTH_SET,
  payload: {
    strength
  }
})