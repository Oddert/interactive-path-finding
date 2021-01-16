import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import initialState from './initialState'
import rootReducer from '../reducers/'

const middleware = [thunk]

// This pattern features in all my redux projects since the Directions App
// It used to not feature the first (supposedly redundant) ternarry but would still not work on devices without RDT
const enhancer = !!window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose (
    applyMiddleware(...middleware)
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  : compose (applyMiddleware(...middleware))

const store = createStore (
  rootReducer,
  initialState,
  enhancer
)

export default store