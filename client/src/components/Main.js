import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Menu, Loader, Segment, Modal, Header, Icon, Button} from 'semantic-ui-react'

const itemMaker = (push, pathname) => (key, path, label) => (
  <Menu.Item key={key} active={pathname === path} onClick={() => push(path)}>
    {label}
  </Menu.Item>
)

const Main = ({
  loading,
  modal, setModal,
  user,
  params: {user_id},
  location: {pathname},
  router: {push},
  ...props
}) => {

  const current_user_id = user.get('id')

  if (user_id && current_user_id !== user_id) push('/notfound')

  const item = itemMaker(push, pathname)

  const userItems = current_user_id ? [
    item('home', `/${current_user_id}/home`, user.get('shortName'))
  ] : []

  const accountItem = current_user_id ?
                     item('logout', '/logout', 'Log Out') :
                     item('login', '/login', 'Log In')

  return (
    <div>
      <Menu attached='top' size='large' inverted>
        <Menu.Item>
          <Loader active={loading} indeterminate/>
        </Menu.Item>
        <Menu.Item header onClick={() => push('/')}>
          FbHack
        </Menu.Item>
        {userItems}
        <Menu.Menu position='right'>
          {accountItem}
        </Menu.Menu>
      </Menu>
      <Segment attached>
        {props.children}
      </Segment>
      <Modal basic size='small' open={modal.get('open') || false}>
        <Header
          icon={modal.get('icon') || 'info circle'}
          content={modal.get('title') || 'Read me'}
        />
        <Modal.Content>
          <p>{modal.get('message')}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted onClick={() => setModal(false)}>
            <Icon name='hand rock'/> Fuck you
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

import setModal from '../action-creators/setModal'

export default connect(
  state => {
    return {
      loading: state.loading,
      modal: state.modal,
      user: state.user
    }
  },
  dispatch =>
    bindActionCreators({
      setModal
    }, dispatch)
)(Main)
