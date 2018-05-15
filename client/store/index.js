import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import habits from './habits'
import categories from './categories'
import personality from './personality'
import recipes from './recipes'
// import newHabit from './newHabit'


const reducer = combineReducers({ user, habits, categories, personality, recipes })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)
window.store = store

export default store
export * from './user'
export * from './habits'
export * from './categories'
export * from './personality'
export * from './recipes'
// export * from './newHabit'

