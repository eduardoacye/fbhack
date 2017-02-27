import React, { Component } from 'react';

import {Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardTitle,
        CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import { grey400 } from 'material-ui/styles/colors'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import muiThemeable from 'material-ui/styles/muiThemeable';

import MultiAvatar from './MultiAvatar';

import { threadlist } from '../hack/fbh';

const threadlistItems = (user, tlist) => {
  const iconButtonElement = (
    <IconButton touch={ true }
                tooltip="participants"
                tooltipPosition="bottom-left">
      <MoreVertIcon color={ grey400 } />
    </IconButton>
  );
  const chatIcon = (fbids) => (
    <IconMenu iconButtonElement={ iconButtonElement }>
      { fbids.map((id, i) => (
          <MenuItem key={ i }>{ tlist.participants[id]['fullname'] }</MenuItem>
        )) }
    </IconMenu>
  );
  const composePics = (fbids) => {
    if (fbids.length > 2) {
      return (
        <Avatar size={ 50 }>
          <MultiAvatar>
            { fbids.map((id, i) => <img key={ i } src={ tlist.participants[id] ? tlist.participants[id]['profilepic'] : '' } />) }
          </MultiAvatar>
        </Avatar>
      );
    } else {
      let id = (fbids.length == 2) ? fbids.filter(id => id != user.fbid)[0] : fbids[0];
      return (
        <Avatar
            size={ 50 }
            src={ tlist.participants[id] ? tlist.participants[id]['profilepic'] : '' }
        />
      );
    }
  };
  return tlist.threads.map((t, i) => (
    <ListItem
        key={ i }
        primaryText={ t.name ? t.name : t.participants.map(id => tlist.participants[id]['shortname']).join(', ') }
        secondaryText={
          ( <p><strong>{ t.previewSender ? tlist.participants[t.previewSender]['fullname'] : '' }</strong> -- { t.previewText }</p> ) }
        secondaryTextLines={ 2 }
        leftAvatar={ composePics(t.participants) }
        rightIcon={ chatIcon(t.participants) }
        onClick={ () => console.log(t) }
    />
  ));
}

class ThreadsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      firstPage: 0,
      lastPage: 10,
      isConnecting: true,
      tlist: {
        participants: {},
        threads: []
      }
    };
    this.handlePageDecrement = this.handlePageDecrement.bind(this);
    this.handlePageIncrement = this.handlePageIncrement.bind(this);
  }

  componentWillMount() {
    threadlist(0, result => {
      this.setState({
        isConnecting: false,
        tlist: {
          participants: result.participants,
          threads: result.threads
        }
      });
    });
  }

  handlePageDecrement() {
    let page = this.state.page - 1;
    this.setState({
      isConnecting: true,
      page: page
    }, () => {
      threadlist(page, result => {
        this.setState({
          isConnecting: false,
          tlist: {
            participants: result.participants,
            threads: result.threads
          }
        })
      });
    });
  }

  handlePageIncrement() {
    let page = this.state.page + 1;
    this.setState({
      isConnecting: true,
      page: page
    }, () => {
      threadlist(page, result => {
        this.setState({
          isConnecting: false,
          tlist: {
            participants: result.participants,
            threads: result.threads
          }
        })
      });
    });
  }
  
  render() {
    const {user, ...rest} = this.props;
    const page = this.state.page;
    const chatIcon = (<FontIcon className="material-icons">chat_bubble</FontIcon>);
    const profilePic = (<Avatar src={ user.profilepic } size={100} />);
    const palette = this.props.muiTheme.palette;
    const pageInteraction =
      (
        <div style={{ display: 'table', margin: '0 auto' }}>
          <IconButton
              disabled={ (page == this.state.firstPage) || this.state.isConnecting }
              onClick={ this.handlePageDecrement }
          >
            <FontIcon className="material-icons">
              keyboard_arrow_left
            </FontIcon>
          </IconButton>
          <div style={ { display: 'inline-block', height: '100%' } }>{ page }</div>
          <IconButton
              disabled={ (page == this.state.lastPage) || this.state.isConnecting }
              onClick={ this.handlePageIncrement }
          >
            <FontIcon className="material-icons">
              keyboard_arrow_right
            </FontIcon>
          </IconButton>
        </div>
      );
    return (
      <Card style={ { width: 828, margin: 'auto' } } >
        <CardHeader
            title={ user.fullname }
            subtitle={ user.username }
            avatar={ profilePic }
        />
        <CardMedia>
          <img src={ user.coverpic } />
        </CardMedia>
        <CardTitle title="Threads" />
        { pageInteraction }
        <div style={ { paddingLeft: 20, paddingRight: 20 } }>
          { this.state.isConnecting ?
            (<div style={ { width: '100%', textAlign: 'center', margin: 'auto' } }>
              <CircularProgress
                  color={ palette.primary1Color }
              />
            </div>) :
            (<List>
            { threadlistItems(user, this.state.tlist) }
            </List>)}
        </div>
        { pageInteraction }
        <Divider/>
        <CardTitle title="Some stats" />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

export default muiThemeable()(ThreadsMenu);
