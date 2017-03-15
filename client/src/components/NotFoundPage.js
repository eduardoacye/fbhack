import React from 'react'

import {Container, Header, Icon} from 'semantic-ui-react'

const NotFoundPage = props => (
  <Container textAlign='center'>
    <Header icon as='h1'>
      <Icon name='warning sign'/>
      <Header.Content>
        Page not found
        <Header.Subheader>
          Sorry for the inconvenience
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>
)

export default NotFoundPage
