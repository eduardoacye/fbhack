import React, { Component } from 'react';

import StyleConfig from './StyleConfig';
import ColorMenu from './ColorMenu';
import StateViewer from './StateViewer';

import AppBar from 'material-ui/AppBar';

const getSS = () =>
  JSON.parse(window.sessionStorage.getItem('fbhack-state'));
const saveSS = (state) =>
  window.sessionStorage.setItem('fbhack-state', JSON.stringify(state));

class Main extends Component {
  constructor(props) {
    super(props);
    const ss = getSS();
    if (ss) {
      this.state = {
        loggedIn: ss.loggedIn,
        currentUser: {
          fbid: ss.currentUser.fbid,
          username: ss.currentUser.username,
          fullname: ss.currentUser.fullname,
          shortname: ss.currentUser.shortname,
          picture: ss.currentUser.picture,
          session: ss.currentUser.session,
          fbdtsg: ss.currentUser.fbdtsg,
        },
        colorScheme: {
          primaryName: ss.colorScheme.primaryName,
          accentName: ss.colorScheme.accentName
        }
      };
    } else {
      this.state = {
        loggedIn: false,
        currentUser: {
          fbid: undefined,
          username: undefined,
          fullname: undefined,
          shortname: undefined,
          picture: undefined,
          session: undefined,
          fbdtsg: undefined
        },
        colorScheme: {
          primaryName: 'deepPurple',
          accentName: 'pink'
        }
      };
    }
    this.updateLoginInfo = this.updateLoginInfo.bind(this);
    this.resetLoginInfo = this.resetLoginInfo.bind(this);
    this.updateColorScheme = this.updateColorScheme.bind(this);
  }

  updateLoginInfo(isLogged, user) {
    this.setState({
      loggedIn: isLogged,
      currentUser: {
        fbid: user.fbid ? user.fbid : this.state.currentUser.fbid,
        username: user.username ? user.username : this.state.currentUser.username,
        fullname: user.fullname ? user.fullname : this.state.currentUser.fullname,
        shortname: user.shortname ? user.shortname : this.state.currentUser.shortname,
        picture: user.picture ? user.picture : this.state.currentUser.picture,
        session: user.session ? user.session : this.state.currentUser.session,
        fbdtsg: user.fbdtsg ? user.fbdtsg : this.state.currentUser.fbdtsg
      }
    }, () => saveSS(this.state));
  }

  resetLoginInfo() {
    this.setState({
      loggedIn: false,
      currentUser: {
        fbid: undefined,
        username: undefined,
        fullname: undefined,
        shortname: undefined,
        picture: undefined,
        session: undefined,
        fbdtsg: undefined
      }
    }, () => saveSS(this.state));
  }

  updateColorScheme(primaryName, accentName) {
    this.setState({
      colorScheme: {
        primaryName: primaryName,
        accentName: accentName
      }
    }, () => saveSS(this.state));
  }

  render() {
    const { primaryName, accentName } = this.state.colorScheme;
    const colorMenu = (<ColorMenu primaryName={ primaryName }
                                  accentName={ accentName }
                                  updateColorScheme={ this.updateColorScheme } />);
    const stateViewer = (<StateViewer
                             sections={ [
                               {
                                 header: "Login status",
                                 data: { loggedIn: this.state.loggedIn }
                               },
                               {
                                 header: "Active user",
                                 data: { currentUser: this.state.currentUser }
                               },
                               {
                                 header: "Color scheme",
                                 data: { colorScheme: this.state.colorScheme }
                               }
                             ] }
                         />);
    return (
      <StyleConfig primaryName={ primaryName } accentName={ accentName }>
        <div>
          <AppBar
              title="fbhack"
              iconElementRight={ colorMenu }
              iconElementLeft={ stateViewer }
          />
        </div>
      </StyleConfig>
    );
  }
}

export default Main;
