import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import loading from './loading'
import modal from './modal'
import user from './user'

const mainReducer = combineReducers({
  loading,
  modal,
  user,
  routing: routerReducer
})

export default mainReducer
