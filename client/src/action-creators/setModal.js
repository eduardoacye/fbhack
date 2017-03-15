const setModal = (open, title, icon, message) => {
  return {
    type: 'SET_MODAL',
    open,
    title,
    icon,
    message
  }
}

export default setModal
