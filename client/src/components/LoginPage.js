import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios'
import {Container, Divider, Card, Icon, Form, Button} from 'semantic-ui-react'

const LoginPage = ({setLoading, setModal, setUser, ...props}) => {
  const submit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    setLoading(true)
    axios.post('/api/login', {
      username,
      password
    })
    .then(res => {
      setLoading(false)
      if (res.data.success) {
        setUser(
          res.data.fbid,
          res.data.vanity,
          res.data.name,
          res.data.short_name,
          res.data.profile_pic_src,
          res.data.cover_photo_src
        )
      } else {
        setModal(true, 'Login failed', 'warning', 'Check your username and password, maybe you confused your username with your email.')
      }
    })
    .catch(err => {
      console.log('Something went bad', err)
    })
  }
  return (
    <Container textAlign='center'>
      <Form style={{display: 'inline-block'}} onSubmit={submit}>
        <Card>
          <Card.Content>
            <Card.Header>
              <Icon size='huge' name='facebook official'/>
              <Divider horizontal>Log In</Divider>
            </Card.Header>
            <Form.Field>
              <label>Username</label>
              <input name='username' placeholder='Enter your facebook username'/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name='password' type='password' placeholder='Enter your facebook password'/>
            </Form.Field>
          </Card.Content>
          <Card.Content extra>
            <Button secondary type='submit'>Send</Button>
          </Card.Content>
        </Card>
      </Form>
    </Container>
  )
}

import setLoading from '../action-creators/setLoading'
import setModal from '../action-creators/setModal'
import setUser from '../action-creators/setUser'

export default connect(
  null,
  dispatch =>
    bindActionCreators({
      setLoading,
      setModal,
      setUser
    }, dispatch)
)(LoginPage)
