import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  uiPainterBrushWall,
  uiPainterBrushSludge,
  uiPainterStrengthSet,
  layoutCellWriteMultiple,
} from '../../actions/'

import cellTypes from '../../constants/cellTypes'


const p = cellTypes.PATH

const INTER = 50

const current = [
  [{x:1,y:1,attrs:{mode:p},}],
  [{x:2,y:1,attrs:{mode:p},}],
  [{x:3,y:1,attrs:{mode:p},},{x:3,y:2,attrs:{mode:p},}],
  [{x:4,y:1,attrs:{mode:p},},{x:4,y:2,attrs:{mode:p},}],
  [{x:5,y:1,attrs:{mode:p},}],
  [{x:6,y:1,attrs:{mode:p},}],
  [{x:7,y:1,attrs:{mode:p},}],
  [{x:8,y:1,attrs:{mode:p},}],
  [{x:9,y:1,attrs:{mode:p},}],
  [{x:10,y:1,attrs:{mode:p},}],
  [{x:11,y:1,attrs:{mode:p},}],
  [{x:12,y:1,attrs:{mode:p},}],
  [{x:13,y:1,attrs:{mode:p},}],
  [{x:14,y:1,attrs:{mode:p},}],
  [{x:15,y:1,attrs:{mode:p},}],
  [{x:16,y:1,attrs:{mode:p},}],
  [{x:17,y:1,attrs:{mode:p},}],
  [{x:18,y:1,attrs:{mode:p},}],
  [{x:19,y:1,attrs:{mode:p},}],
  [{x:17,y:0,attrs:{mode:p},}, {x:18,y:0,attrs:{mode:p},}, {x:19,y:0,attrs:{mode:p},},{x:17,y:2,attrs:{mode:p},},{x:18,y:2,attrs:{mode:p},},{x:19,y:2,attrs:{mode:p},}],
  [{x:16,y:0,attrs:{mode:p},}, {x:16,y:1,attrs:{mode:p},}, {x:16,y:2,attrs:{mode:p},}, {x:17,y:3,attrs:{mode:p},}, {x:18,y:3,attrs:{mode:p},}, {x:19,y:3,attrs:{mode:p},}],
  [{x:15,y:0,attrs:{mode:p},}, {x:15,y:1,attrs:{mode:p},}, {x:15,y:2,attrs:{mode:p},}, {x:16,y:3,attrs:{mode:p},}, {x:17,y:4,attrs:{mode:p},}, {x:18,y:4,attrs:{mode:p},}, {x:19,y:4,attrs:{mode:p},}],
  [{x:14,y:0,attrs:{mode:p},}, {x:14,y:1,attrs:{mode:p},}, {x:14,y:2,attrs:{mode:p},}, {x:14,y:3,attrs:{mode:p},}, {x:15,y:3,attrs:{mode:p},}, {x:15,y:4,attrs:{mode:p},}, {x:16,y:4,attrs:{mode:p},}, {x:16,y:5,attrs:{mode:p},}, {x:17,y:5,attrs:{mode:p},}, {x:18,y:5,attrs:{mode:p},}, {x:19,y:5,attrs:{mode:p},}, ],
  [{x:13,y:0,attrs:{mode:p},}, {x:13,y:1,attrs:{mode:p},}, {x:13,y:2,attrs:{mode:p},}, {x:13,y:3,attrs:{mode:p},}, {x:14,y:4,attrs:{mode:p},}, {x:15,y:5,attrs:{mode:p},}, {x:16,y:6,attrs:{mode:p},}, {x:17,y:6,attrs:{mode:p},}, {x:18,y:6,attrs:{mode:p},}, {x:19,y:6,attrs:{mode:p},}, ],
  [{x:12,y:0,attrs:{mode:p},}, {x:12,y:1,attrs:{mode:p},}, {x:12,y:2,attrs:{mode:p},}, {x:12,y:3,attrs:{mode:p},}, {x:13,y:4,attrs:{mode:p},}, {x:13,y:5,attrs:{mode:p},}, {x:14,y:5,attrs:{mode:p},}, {x:14,y:6,attrs:{mode:p},}, {x:15,y:6,attrs:{mode:p},}, {x:16,y:7,attrs:{mode:p},}, {x:17,y:7,attrs:{mode:p},}, {x:18,y:7,attrs:{mode:p},}, {x:19,y:7,attrs:{mode:p},}, ],
  [{x:11,y:0,attrs:{mode:p},}, {x:11,y:1,attrs:{mode:p},}, {x:11,y:2,attrs:{mode:p},}, {x:11,y:3,attrs:{mode:p},}, {x:12,y:4,attrs:{mode:p},}, {x:12,y:5,attrs:{mode:p},}, {x:13,y:6,attrs:{mode:p},}, {x:14,y:7,attrs:{mode:p},}, {x:15,y:7,attrs:{mode:p},}, {x:16,y:8,attrs:{mode:p},}, {x:17,y:8,attrs:{mode:p},}, {x:18,y:8,attrs:{mode:p},}, {x:19,y:8,attrs:{mode:p},}, ],
  [{x:10,y:0,attrs:{mode:p},}, {x:10,y:1,attrs:{mode:p},}, {x:10,y:2,attrs:{mode:p},}, {x:10,y:3,attrs:{mode:p},}, {x:11,y:4,attrs:{mode:p},}, {x:11,y:5,attrs:{mode:p},}, {x:12,y:6,attrs:{mode:p},}, {x:12,y:7,attrs:{mode:p},}, {x:13,y:7,attrs:{mode:p},}, {x:14,y:8,attrs:{mode:p},},  {x:15,y:8,attrs:{mode:p},}, {x:16,y:9,attrs:{mode:p},}, {x:17,y:9,attrs:{mode:p},}, {x:18,y:9,attrs:{mode:p},}, {x:19,y:9,attrs:{mode:p},}, ],
  [{x:9,y:0,attrs:{mode:p},}, {x:9,y:1,attrs:{mode:p},}, {x:9,y:2,attrs:{mode:p},}, {x:9,y:3,attrs:{mode:p},}, {x:9,y:4,attrs:{mode:p},}, {x:10,y:4,attrs:{mode:p},}, {x:10,y:5,attrs:{mode:p},}, {x:10,y:6,attrs:{mode:p},}, {x:11,y:6,attrs:{mode:p},}, {x:11,y:7,attrs:{mode:p},}, {x:12,y:8,attrs:{mode:p},},  {x:13,y:8,attrs:{mode:p},}, {x:13,y:9,attrs:{mode:p},}, {x:14,y:9,attrs:{mode:p},}, {x:15,y:9,attrs:{mode:p},}, {x:15,y:10,attrs:{mode:p},}, {x:16,y:10,attrs:{mode:p},}, {x:17,y:10,attrs:{mode:p},}, {x:18,y:10,attrs:{mode:p},}, {x:19,y:10,attrs:{mode:p},}, ],
  [{x:8,y:0,attrs:{mode:p},}, {x:8,y:1,attrs:{mode:p},}, {x:8,y:2,attrs:{mode:p},}, {x:8,y:3,attrs:{mode:p},}, {x:8,y:4,attrs:{mode:p},}, {x:9,y:5,attrs:{mode:p},}, {x:9,y:6,attrs:{mode:p},}, {x:10,y:7,attrs:{mode:p},}, {x:11,y:8,attrs:{mode:p},}, {x:12,y:9,attrs:{mode:p},}, {x:13,y:10,attrs:{mode:p},},  {x:14,y:10,attrs:{mode:p},}, {x:15,y:11,attrs:{mode:p},}, {x:16,y:11,attrs:{mode:p},}, {x:17,y:11,attrs:{mode:p},}, {x:18,y:11,attrs:{mode:p},}, {x:19,y:11,attrs:{mode:p},},],
  [{x:7,y:0,attrs:{mode:p},}, {x:7,y:1,attrs:{mode:p},}, {x:7,y:2,attrs:{mode:p},}, {x:7,y:3,attrs:{mode:p},}, {x:7,y:4,attrs:{mode:p},}, {x:8,y:5,attrs:{mode:p},}, {x:8,y:6,attrs:{mode:p},}, {x:9,y:7,attrs:{mode:p},}, {x:9,y:8,attrs:{mode:p},}, {x:10,y:8,attrs:{mode:p},}, {x:10,y:9,attrs:{mode:p},},  {x:11,y:9,attrs:{mode:p},}, {x:11,y:10,attrs:{mode:p},}, {x:12,y:10,attrs:{mode:p},}, {x:13,y:11,attrs:{mode:p},}, {x:14,y:11,attrs:{mode:p},}, {x:15,y:12,attrs:{mode:p},}, {x:16,y:12,attrs:{mode:p},}, {x:17,y:12,attrs:{mode:p},}, {x:18,y:12,attrs:{mode:p},}, {x:19,y:12,attrs:{mode:p},}, ],
  [{x:6,y:0,attrs:{mode:p},}, {x:6,y:1,attrs:{mode:p},}, {x:6,y:2,attrs:{mode:p},}, {x:6,y:3,attrs:{mode:p},}, {x:6,y:4,attrs:{mode:p},}, {x:7,y:5,attrs:{mode:p},}, {x:7,y:6,attrs:{mode:p},}, {x:8,y:7,attrs:{mode:p},}, {x:8,y:8,attrs:{mode:p},}, {x:9,y:9,attrs:{mode:p},}, {x:10,y:10,attrs:{mode:p},},  {x:11,y:11,attrs:{mode:p},}, {x:12,y:11,attrs:{mode:p},}, {x:13,y:12,attrs:{mode:p},}, {x:14,y:12,attrs:{mode:p},}, {x:15,y:13,attrs:{mode:p},}, {x:16,y:13,attrs:{mode:p},}, {x:17,y:13,attrs:{mode:p},}, {x:18,y:13,attrs:{mode:p},}, {x:19,y:13,attrs:{mode:p},}, ],
  [{x:5,y:0,attrs:{mode:p},}, {x:5,y:1,attrs:{mode:p},}, {x:5,y:2,attrs:{mode:p},}, {x:5,y:3,attrs:{mode:p},}, {x:5,y:4,attrs:{mode:p},}, {x:6,y:5,attrs:{mode:p},}, {x:6,y:6,attrs:{mode:p},}, {x:6,y:7,attrs:{mode:p},}, {x:7,y:7,attrs:{mode:p},}, {x:7,y:8,attrs:{mode:p},}, {x:8,y:9,attrs:{mode:p},},  {x:8,y:10,attrs:{mode:p},}, {x:9,y:10,attrs:{mode:p},}, {x:9,y:11,attrs:{mode:p},}, {x:10,y:11,attrs:{mode:p},}, {x:11,y:12,attrs:{mode:p},}, {x:12,y:12,attrs:{mode:p},}, {x:12,y:13,attrs:{mode:p},}, {x:13,y:13,attrs:{mode:p},}, {x:14,y:13,attrs:{mode:p},}, {x:15,y:14,attrs:{mode:p},}, {x:16,y:14,attrs:{mode:p},}, {x:17,y:14,attrs:{mode:p},}, {x:18,y:14,attrs:{mode:p},}, {x:19,y:14,attrs:{mode:p},}, ],
  [{x:4,y:0,attrs:{mode:p},}, {x:4,y:1,attrs:{mode:p},}, {x:4,y:2,attrs:{mode:p},}, {x:4,y:3,attrs:{mode:p},}, {x:4,y:4,attrs:{mode:p},}, {x:5,y:5,attrs:{mode:p},}, {x:5,y:6,attrs:{mode:p},}, {x:5,y:7,attrs:{mode:p},}, {x:6,y:8,attrs:{mode:p},}, {x:6,y:9,attrs:{mode:p},}, {x:7,y:9,attrs:{mode:p},},  {x:7,y:10,attrs:{mode:p},}, {x:8,y:11,attrs:{mode:p},}, {x:9,y:12,attrs:{mode:p},}, {x:10,y:12,attrs:{mode:p},}, {x:10,y:13,attrs:{mode:p},}, {x:11,y:12,attrs:{mode:p},}, {x:11,y:13,attrs:{mode:p},}, {x:12,y:14,attrs:{mode:p},}, {x:13,y:14,attrs:{mode:p},}, {x:14,y:14,attrs:{mode:p},}, {x:15,y:15,attrs:{mode:p},}, {x:16,y:15,attrs:{mode:p},}, {x:17,y:15,attrs:{mode:p},}, {x:18,y:15,attrs:{mode:p},}, {x:19,y:15,attrs:{mode:p},}, ],
  [{x:3,y:0,attrs:{mode:p},}, {x:3,y:1,attrs:{mode:p},}, {x:3,y:2,attrs:{mode:p},}, {x:3,y:3,attrs:{mode:p},}, {x:3,y:4,attrs:{mode:p},}, {x:4,y:5,attrs:{mode:p},}, {x:4,y:6,attrs:{mode:p},}, {x:4,y:7,attrs:{mode:p},}, {x:5,y:8,attrs:{mode:p},}, {x:5,y:9,attrs:{mode:p},}, {x:6,y:10,attrs:{mode:p},},  {x:7,y:11,attrs:{mode:p},}, {x:8,y:12,attrs:{mode:p},}, {x:9,y:13,attrs:{mode:p},}, {x:10,y:14,attrs:{mode:p},}, {x:11,y:14,attrs:{mode:p},}, {x:12,y:15,attrs:{mode:p},}, {x:13,y:15,attrs:{mode:p},}, {x:14,y:15,attrs:{mode:p},}, {x:15,y:16,attrs:{mode:p},}, {x:16,y:16,attrs:{mode:p},}, {x:17,y:16,attrs:{mode:p},}, {x:18,y:16,attrs:{mode:p},}, {x:19,y:16,attrs:{mode:p},}, ],
  [{x:2,y:0,attrs:{mode:p},}, {x:2,y:1,attrs:{mode:p},}, {x:2,y:2,attrs:{mode:p},}, {x:2,y:3,attrs:{mode:p},}, {x:2,y:4,attrs:{mode:p},}, {x:2,y:5,attrs:{mode:p},}, {x:3,y:5,attrs:{mode:p},}, {x:3,y:6,attrs:{mode:p},}, {x:3,y:7,attrs:{mode:p},}, {x:4,y:8,attrs:{mode:p},}, {x:4,y:9,attrs:{mode:p},}, {x:5,y:10,attrs:{mode:p},},  {x:5,y:11,attrs:{mode:p},}, {x:6,y:11,attrs:{mode:p},}, {x:6,y:12,attrs:{mode:p},}, {x:7,y:12,attrs:{mode:p},}, {x:7,y:13,attrs:{mode:p},}, {x:8,y:13,attrs:{mode:p},}, {x:8,y:14,attrs:{mode:p},}, {x:9,y:14,attrs:{mode:p},}, {x:10,y:15,attrs:{mode:p},}, {x:11,y:15,attrs:{mode:p},}, {x:12,y:16,attrs:{mode:p},}, {x:13,y:16,attrs:{mode:p},}, {x:14,y:16,attrs:{mode:p},}, {x:14,y:17,attrs:{mode:p},}, {x:15,y:17,attrs:{mode:p},}, {x:16,y:17,attrs:{mode:p},}, {x:17,y:17,attrs:{mode:p},}, {x:18,y:17,attrs:{mode:p},}, {x:19,y:17,attrs:{mode:p},}, ],
  [{x:1,y:0,attrs:{mode:p},}, {x:1,y:1,attrs:{mode:p},}, {x:1,y:2,attrs:{mode:p},}, {x:1,y:3,attrs:{mode:p},}, {x:1,y:4,attrs:{mode:p},}, {x:1,y:5,attrs:{mode:p},}, {x:2,y:6,attrs:{mode:p},}, {x:2,y:7,attrs:{mode:p},}, {x:2,y:8,attrs:{mode:p},}, {x:3,y:8,attrs:{mode:p},}, {x:3,y:9,attrs:{mode:p},}, {x:3,y:10,attrs:{mode:p},}, {x:5,y:10,attrs:{mode:p},},  {x:4,y:10,attrs:{mode:p},}, {x:4,y:11,attrs:{mode:p},}, {x:5,y:12,attrs:{mode:p},}, {x:6,y:13,attrs:{mode:p},}, {x:7,y:14,attrs:{mode:p},}, {x:8,y:15,attrs:{mode:p},}, {x:9,y:15,attrs:{mode:p},}, {x:9,y:16,attrs:{mode:p},}, {x:10,y:16,attrs:{mode:p},}, {x:11,y:16,attrs:{mode:p},}, {x:11,y:17,attrs:{mode:p},}, {x:12,y:17,attrs:{mode:p},}, {x:13,y:17,attrs:{mode:p},}, {x:14,y:18,attrs:{mode:p},}, {x:15,y:18,attrs:{mode:p},}, {x:16,y:18,attrs:{mode:p},}, {x:17,y:18,attrs:{mode:p},}, {x:18,y:18,attrs:{mode:p},}, {x:19,y:18,attrs:{mode:p},}, ],
  [{x:0,y:0,attrs:{mode:p},}, {x:0,y:1,attrs:{mode:p},}, {x:0,y:2,attrs:{mode:p},}, {x:0,y:3,attrs:{mode:p},}, {x:0,y:4,attrs:{mode:p},}, {x:0,y:5,attrs:{mode:p},}, {x:1,y:6,attrs:{mode:p},}, {x:1,y:7,attrs:{mode:p},}, {x:1,y:8,attrs:{mode:p},}, {x:2,y:9,attrs:{mode:p},}, {x:2,y:10,attrs:{mode:p},}, {x:3,y:11,attrs:{mode:p},}, {x:4,y:12,attrs:{mode:p},},  {x:4,y:13,attrs:{mode:p},}, {x:5,y:13,attrs:{mode:p},}, {x:5,y:14,attrs:{mode:p},}, {x:6,y:14,attrs:{mode:p},}, {x:6,y:15,attrs:{mode:p},}, {x:7,y:15,attrs:{mode:p},}, {x:8,y:16,attrs:{mode:p},}, {x:9,y:17,attrs:{mode:p},}, {x:10,y:17,attrs:{mode:p},}, {x:11,y:18,attrs:{mode:p},}, {x:12,y:18,attrs:{mode:p},}, {x:13,y:18,attrs:{mode:p},}, {x:14,y:19,attrs:{mode:p},}, {x:15,y:19,attrs:{mode:p},}, {x:16,y:19,attrs:{mode:p},}, {x:17,y:19,attrs:{mode:p},}, {x:18,y:19,attrs:{mode:p},}, {x:19,y:19,attrs:{mode:p},}, ],
  [{x:0,y:6,attrs:{mode:p},}, {x:0,y:7,attrs:{mode:p},}, {x:0,y:8,attrs:{mode:p},}, {x:1,y:9,attrs:{mode:p},}, {x:1,y:10,attrs:{mode:p},}, {x:2,y:11,attrs:{mode:p},}, {x:2,y:12,attrs:{mode:p},}, {x:3,y:12,attrs:{mode:p},}, {x:3,y:13,attrs:{mode:p},}, {x:4,y:14,attrs:{mode:p},}, {x:5,y:15,attrs:{mode:p},}, {x:6,y:16,attrs:{mode:p},}, {x:7,y:16,attrs:{mode:p},}, {x:7,y:17,attrs:{mode:p},}, {x:8,y:17,attrs:{mode:p},}, {x:9,y:18,attrs:{mode:p},}, {x:10,y:18,attrs:{mode:p},}, {x:11,y:19,attrs:{mode:p},}, {x:12,y:19,attrs:{mode:p},}, {x:13,y:19,attrs:{mode:p},}, ],
  [{x:0,y:9,attrs:{mode:p},}, {x:0,y:10,attrs:{mode:p},}, {x:1,y:11,attrs:{mode:p},}, {x:1,y:12,attrs:{mode:p},}, {x:2,y:13,attrs:{mode:p},}, {x:3,y:14,attrs:{mode:p},}, {x:3,y:15,attrs:{mode:p},}, {x:4,y:15,attrs:{mode:p},}, {x:4,y:16,attrs:{mode:p},}, {x:5,y:16,attrs:{mode:p},}, {x:6,y:17,attrs:{mode:p},}, {x:7,y:18,attrs:{mode:p},}, {x:8,y:18,attrs:{mode:p},}, {x:9,y:19,attrs:{mode:p},}, {x:10,y:19,attrs:{mode:p},}, ],
  [{x:0,y:11,attrs:{mode:p},}, {x:0,y:12,attrs:{mode:p},}, {x:1,y:13,attrs:{mode:p},}, {x:1,y:14,attrs:{mode:p},}, {x:2,y:14,attrs:{mode:p},}, {x:2,y:15,attrs:{mode:p},}, {x:3,y:16,attrs:{mode:p},}, {x:4,y:17,attrs:{mode:p},}, {x:5,y:17,attrs:{mode:p},}, {x:5,y:18,attrs:{mode:p},}, {x:6,y:18,attrs:{mode:p},}, {x:7,y:19,attrs:{mode:p},}, {x:8,y:19,attrs:{mode:p},}, ],
  [{x:0,y:13,attrs:{mode:p},}, {x:0,y:14,attrs:{mode:p},}, {x:1,y:15,attrs:{mode:p},}, {x:2,y:16,attrs:{mode:p},}, {x:3,y:17,attrs:{mode:p},}, {x:4,y:18,attrs:{mode:p},}, {x:5,y:19,attrs:{mode:p},}, {x:6,y:19,attrs:{mode:p},}, ],
  [{x:0,y:15,attrs:{mode:p},}, {x:1,y:16,attrs:{mode:p},}, {x:2,y:17,attrs:{mode:p},}, {x:3,y:18,attrs:{mode:p},}, {x:4,y:19,attrs:{mode:p},}, ],
  [{x:0,y:16,attrs:{mode:p},}, {x:1,y:17,attrs:{mode:p},}, {x:2,y:18,attrs:{mode:p},}, {x:3,y:19,attrs:{mode:p},}, ],
  [{x:0,y:17,attrs:{mode:p},}, {x:1,y:18,attrs:{mode:p},}, {x:2,y:19,attrs:{mode:p},}, ],
  [{x:0,y:18,attrs:{mode:p},}, {x:1,y:19,attrs:{mode:p},}, ],
  [{x:0,y:19,attrs:{mode:p},}, ],
]




export default function Control () {
  const dispatch = useDispatch()
  const { brush, strength } = useSelector(s => s.ui.painter)

  // const [seq, setSeq] = React.useState(0)
  
  const [start, setStart] = React.useState(Date.now())
  const [end, setEnd] = React.useState(Date.now())

  const handleChange = e => {
    switch (e.target.value) {
      case cellTypes.WALL: return dispatch(uiPainterBrushWall())
      case cellTypes.SLUDGE: return dispatch(uiPainterBrushSludge())
      default: return console.warn(`[Control/index]: {handleChange}: No such key for value: ${e.target.value}`)
    }
  }

  const handleStrengthChange = e => {
    const { value } = e.target
    let setStrength = value
    if (value > 10) setStrength = 10
    if (value < 1) setStrength = 1
    dispatch(uiPainterStrengthSet(setStrength))
  }

  const handlePlay = e => {
    e.preventDefault()

    // ===== sequential =====
    // Sequentially iterates each row in currents
    setStart(Date.now())
    
    let s = 0
    
    function sequential () {
      setTimeout(() => {
        dispatch(layoutCellWriteMultiple(current[s]))
        s++
        if (s === current.length) setEnd(Date.now())
        if (s < current.length) sequential()
      }, INTER)
    }
    
    sequential()
    // ===== / sequential =====


    // ===== batched =====
    // Batches items and sequences them using transition delay
    // const batchSize = current.length
    // const jump = batchSize * INTER
    
    // function batched () {
    //   setTimeout(() => {

    //     const seen = {}

    //     const disp = current
    //       .slice(s*batchSize, (s+1)*batchSize)
    //       .reduce((acc, each, idx) => {
    //         const row = each.map(cell => {
    //           if (seen[`${cell.y}_${cell.x}`]) return undefined
    //           seen[`${cell.y}_${cell.x}`] = true
    //           return { 
    //             ...cell, 
    //             attrs: { 
    //               ...cell.attrs, 
    //               styles: { 
    //                 transitionDelay: `${INTER * idx}ms` 
    //               } 
    //             } 
    //           }
    //         })
    //         return [...acc, ...row]
    //       }, [])
    //       .filter(e => e !== undefined)

    //     dispatch(layoutCellWriteMultiple(disp))
    //     s++
    //     if (s === current.length) setEnd(Date.now())
    //     if (s < current.length) batched()
    //   }, jump)
    // }
    // batched()
    // ===== / batched =====

    // current.forEach(each => {
    //   dispatch(layoutCellWriteMultiple(each))
    //   setSeq(seq === current.length-1 ? 0 : seq + 1)
    // })
  }

  return (
    <div className='Control'>
      <form onSubmit={e => e.preventDefault()}>
        <label>Brush Mode ({ brush }): </label>
        {/* <select
          onChange={handleChange}
          value={brush}
        >
          <option value={cellTypes.SLUDGE}>Sludge</option>
          <option value={cellTypes.WALL}>Wall</option>
        </select> */}
        {
          Object.values(cellTypes).map(type =>
            <label key={type}>
              <input 
                type='radio' 
                value={type}
                onChange={handleChange}
                checked={type === brush}
              />
              {
                type.substring(0,1).toUpperCase() + type.substring(1)
              }
            </label>
          )
        }
      </form>
        {
          brush === cellTypes.SLUDGE
          ? <form onSubmit={e => e.preventDefault()}>
              <label 
                htmlFor='Control-strength'
              >
                {' '}| Sludge Density:
              </label>
              <input 
                id='Control-strength'
                type='range'
                min='1'
                max='10'
                step='1'
                value={strength}
                onChange={handleStrengthChange}
              />
              <input 
                type='number'
                value={strength}
                onChange={handleStrengthChange}
              />
            </form>
          : ''
        }
      <span>
        array length: {current.length} ¦{' '}
      </span>
      <span>
        interval: {INTER} ¦{' '}
      </span>
      <span>
        expected time: {INTER * current.length} ¦{' '}
      </span>
      <span>
        actual: {end-start} ¦{' '}
      </span>
      <button
        onClick={handlePlay}
      >
        Play
      </button>
    </div>
  )
}