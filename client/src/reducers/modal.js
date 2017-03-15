import {Map} from 'immutable'

const modal = (state=Map({}), action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return Map({
        open: action.open,
        title: action.title,
        icon: action.icon,
        message: action.message
      })
    default:
      return state
  }
}

export default modal
