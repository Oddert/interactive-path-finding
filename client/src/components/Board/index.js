import React from 'react'
import { useSelector } from 'react-redux'

import Cell from '../Cell/'

export default function Board () {
  const { layout } = useSelector(s => s.board)
  // const [changes, setChanges] = React.useState({})//useSelector(s => s.board.layout))

  // Old setup for useing 'active' as a boolean
  // Keep for testing purposes while trying to solve the event pooling issue
  // registerChange was passed to cell
  // function registerChange (y, x, active) {
  //   const modifiedChanges = { ...changes }
  //   modifiedChanges[y + '-' + x] = active
  //   setChanges(modifiedChanges)
  // }

  function generateRows () {
    const rows = []
    for (const rowI in layout) {
      const row = layout[rowI]
      const cols = []
      for (const colI in row) {
        cols.push(
          <Cell 
            key={`${rowI}-${colI}`}
            y={rowI}
            x={colI}
          />
        )
      }
      rows.push(
        <div className='row' key={`row_${rowI}`}>
          { cols }
        </div>
      )
    }
    return rows
  }
  
  return (
    <div 
      className='board' 
    >
      { generateRows() }
    </div>
  )
}