import React from 'react'

import {Container, Header, Icon, Card, Image, Divider} from 'semantic-ui-react'

import manScrolling from '../images/man-scrolling.jpg'
import manCalculating from '../images/man-calculating.jpg'
import manSad from '../images/man-sad.jpg'

const ImageCard = ({src, ...props}) => (
  <Card {...props} style={{maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto'}}>
    <Image src={src}/>
    <Card.Content>
      <Card.Header>
        {props.children}
      </Card.Header>
    </Card.Content>
  </Card>
)

const AboutPage = ({setLoading,...props}) => {
  return (
    <Container textAlign='center'>
      <Header icon as='h1'>
        <Icon name='facebook official'/>
        <Header.Content>
          FbHack
          <Header.Subheader>
            Backup and analyze your facebook conversations without ease
          </Header.Subheader>
        </Header.Content>
      </Header>

      <br/>

      <Card.Group stackable itemsPerRow={3}>
        <ImageCard centered src={manScrolling}>
          Are you frustrated with scrolling in your facebook chat
          just to remember a moment?
        </ImageCard>
        <ImageCard centered src={manCalculating}>
          Are you tired of doing simpe calculations
          with your facebook conversations?
        </ImageCard>
        <ImageCard centered src={manSad}>
          Are you just sad?
          <br/>
          <br/>
          For whatever reason...
        </ImageCard>
      </Card.Group>

      <br/>

      <Divider horizontal>FbHack has you covered</Divider>

      <br/>

      Log in and start enjoying
    </Container>
  )
}

export default AboutPage
