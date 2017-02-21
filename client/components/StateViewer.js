import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import BugReport from 'material-ui/svg-icons/action/bug-report';
import Close from 'material-ui/svg-icons/navigation/close';
import Swap from 'material-ui/svg-icons/action/compare-arrows';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ObjectView from './ObjectView';

class StateViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, right: true };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
  }

  handleToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleSwap() {
    this.setState({ right: !this.state.right });
  }

  render() {
    const buttonsize = 48;
    const iconsize = 24;
    const palette = this.props.muiTheme.palette;
    let content = (
      <div style={ { height: '100%' } }>
        <Paper zDepth={ 1 } rounded={ false }
               style={ { backgroundColor: palette.accent2Color,
                         position: 'fixed',
                         margin: 0, padding: 0, overflow: 'hidden',
                         top: 0, left: 0, zIndex: 9999,
                         width: '100%' } }>
          <IconButton onTouchTap={ this.handleToggle }
                      style={ { float: this.state.right ? 'right' : 'left' } }>
            <Close color={ palette.accent1Color } />
          </IconButton>
          <IconButton onTouchTap={ this.handleSwap }
                      style={ { float: this.state.right ? 'left' : 'right' } }>
            <Swap color={ palette.accent1Color } />
          </IconButton>
          <br/>
          <div style={ { padding: 10, textAlign: 'center' } }>
            <h1>
              <BugReport color={ palette.accent3Color } />
              <span style={ { color: palette.primary1Color } }>
                State viewer
              </span>
              <BugReport color={ palette.accent3Color } />
            </h1>
            <p>Check out information about the running program.</p>
          </div>
        </Paper>
        <div style={ { marginTop: 180, position: 'absolute', width: '100%',
                       top: 0, left: 0, bottom: 0, overflow: 'auto' } }>
          {
            this.props.sections.map((sec, i) => (
              <div key={ i }>
                <Subheader>{ sec.header }</Subheader>
                <ObjectView data={ sec.data } />
                <br/>
                <Divider/>
              </div>
            ))
          } <div style={ { height: 50 } }></div>
        </div>
      </div>
    );
    
    return (
      <div>
        <IconButton style={ { width: buttonsize, height: buttonsize, padding: 12 } }
                    iconStyle={ { width: iconsize, height: iconsize } }
                    onTouchTap={ this.handleToggle }>
          <BugReport/>
        </IconButton>
        <Drawer docked={ true } width={ 300 } open={ this.state.isOpen }
                onRequestChange={ isOpen => this.setState({ isOpen: isOpen }) }
                openSecondary={ this.state.right } zDepth={ 3 }>
          { content }
        </Drawer>

      </div>
    );
  }
}

export default muiThemeable()(StateViewer);
