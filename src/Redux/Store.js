import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Reducers from './Reducers'

const middleware = applyMiddleware(thunk) // logger

const store = createStore(
  Reducers,
  composeWithDevTools(middleware)
)

window.store = store

export default store