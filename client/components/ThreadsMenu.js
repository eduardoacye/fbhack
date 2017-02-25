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

class ThreadsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      firstPage: 0,
      lastPage: 10
    };
    this.handlePageDecrement = this.handlePageDecrement.bind(this);
    this.handlePageIncrement = this.handlePageIncrement.bind(this);
  }

  handlePageDecrement() {
    this.setState({ page: this.state.page - 1 });
  }

  handlePageIncrement() {
    this.setState({ page: this.state.page + 1 });
  }
  
  render() {
    const {user, ...rest} = this.props;
    const page = this.state.page;
    const chatIcon = (<FontIcon className="material-icons">chat_bubble</FontIcon>);
    const profilePic = (<Avatar src={ user.profilepic } size={100} />);
    const pageInteraction =
      (
        <div style={{ display: 'table', margin: '0 auto' }}>
          <IconButton
              disabled={ page == this.state.firstPage }
              onClick={ this.handlePageDecrement }
          >
            <FontIcon className="material-icons">
              keyboard_arrow_left
            </FontIcon>
          </IconButton>
          <div style={ { display: 'inline-block', height: '100%' } }>{ page }</div>
          <IconButton
              disabled={ page == this.state.lastPage }
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
          <List>
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
            <ListItem
                primaryText="Some chat" secondaryText="Last message"
                leftAvatar={<Avatar src="https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F" />}
                rightIcon={ chatIcon }
            />
          </List>
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

export default ThreadsMenu;
