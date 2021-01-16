import React from 'react'
import { Provider } from 'react-redux'

import store from '../constants/store'

import Board from './Board'
import Control from './Control'

export default function App () {
  return (
    <Provider store={store}>
      <h1>Hello New World</h1>
      <Control />
      <Board />
    </Provider>
  )
}