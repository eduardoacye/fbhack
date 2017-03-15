import {createStore} from 'redux'
import mainReducer from './reducers/mainReducer'
import initialState from './data/initialState'

const store = createStore(mainReducer, initialState)

export default store
