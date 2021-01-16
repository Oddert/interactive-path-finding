import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
  // layoutCellToggle,
  layoutCellWallToggle,
  layoutCellFloorToggle,
  layoutCellDragStart,
  layoutCellDragEnter,
  layoutCellDragDrop,
  layoutCellSludgeToggle,
} from '../../actions/'

import cellTypes from '../../constants/cellTypes'

export default function Cell ({ y, x }) {
  const dispatch = useDispatch()
  const cell = useSelector(s => s.board.layout[y][x])
  const dragging = useSelector(s => s.board.dragging)
  const { brush, strength } = useSelector(s => s.ui.painter)
  const { active, mode } = cell

  const xy = `${y}-${x}`
  const draggableModes = ['start_point', 'mid_point', 'end_point']
  const draggable = draggableModes.includes(mode)
  // const [has, setHas] = React.useState(false)

  const generateEntity = () => {
    switch (mode) {
      case cellTypes.SLUDGE: return cell.weight
      case cellTypes.PATH: return cell?.styles?.transitionDelay
      // case 'start_point': return
      // case 'mid_point': return
      // case 'end_point': return
      default: return null
    }
  }

  // Old setup for useing 'active' as a boolean
  // Keep for testing purposes while trying to solve the event pooling issue
  // const [active, setActive] = React.useState(false)
  // const handleDispatch = (newActive) => {
  //   registerChange(y, x, newActive)
  //   // setActive(newActive)
  //   dispatch(layoutCellToggle(y, x, newActive))
  // }
  const handleDispatch = (newMode, ...opts) => {
    // console.log(newMode)
    switch (newMode) {
      case cellTypes.WALL: return dispatch(layoutCellWallToggle(y, x))
      case cellTypes.FLOOR: return dispatch(layoutCellFloorToggle(y, x))
      case cellTypes.SLUDGE: return dispatch(layoutCellSludgeToggle(y, x, ...opts))
      default: return
    }
  }
  
  const toggleWall = override => {
    const opts = []
    if (override === undefined) {

      // if the target is empty paint it. otherwise reset back to floor
      const type = mode === cellTypes.FLOOR ? brush : cellTypes.FLOOR
      
      if (type === cellTypes.SLUDGE) opts.push(strength)
      handleDispatch(type, ...opts)
    } else {
      if (override === cellTypes.SLUDGE) opts.push(strength)
      handleDispatch(override, ...opts)
    }
  }
  
  const handleMouseOver = e => {
    const ev = e || window.event
    if (ev.nativeEvent.which === 1) {
      // setHas(true)
      // console.log({brush})
      toggleWall(brush)
    }
    if (ev.nativeEvent.which === 3) {
      toggleWall(cellTypes.FLOOR)
    }
  }

  const handleClick = e => {
    if (!draggable) toggleWall()
  }

  const handleDragStart = e => {
    console.log(`drag-start ${xy}`)
    dispatch(layoutCellDragStart(y, x))
  }

  const handleDragLeave = e => {
    // console.log(`drag-leave ${xy}`)
  }

  const handleDragEnter = e => {
    console.log(`drag-enter ${xy}`)
    if (dragging.mode) dispatch(layoutCellDragEnter(y, x))
  }

  const handleDragOver = e => {
    e.preventDefault()
    // console.log(`drag-over ${xy}`)
  }

  const handleDrop = e => {
    console.log(`drop ${xy}`)
    dispatch(layoutCellDragDrop(y, x))
  }

  return (
    <div 
      className={`cell ${active ? 'active' : ''} ${mode.toLowerCase()}`}
      data-pos={xy}
      title={xy}
      onMouseEnter={handleMouseOver}
      onMouseDown={handleClick}
      onContextMenu={e => e.preventDefault()}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={cell?.styles}
    >
      {
        generateEntity()
      }
    </div>
  )
}