import { combineReducers } from 'redux'

import board from './board'
import ui from './ui'
import animate from './animate'

const rootReducer = combineReducers ({
  board,
  ui,
  animate,
})

export default rootReducer