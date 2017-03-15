const loading = (state=false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.active
    default:
      return state
  }
}

export default loading
