import React, { Component } from 'react';

import StyleConfig from './StyleConfig';
import ColorMenu from './ColorMenu';
import StateViewer from './StateViewer';

import AppBar from 'material-ui/AppBar';

import fixedHeaderStyle from '../utils/fixed-header-style';
import fixedContentStyle from '../utils/fixed-content-style';

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
          <div style={ { ...fixedHeaderStyle } }>
            <AppBar
                title="fbhack"
                iconElementRight={ colorMenu }
                iconElementLeft={ stateViewer }
            />
          </div>

          <div style={ { padding: 50, marginTop: 50, ...fixedContentStyle } }>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec faucibus mi, et lobortis sapien. Mauris eu nunc feugiat, finibus diam eget, euismod tortor. Integer convallis libero quis leo congue, sit amet semper sem luctus. Donec nec dolor odio. Sed sollicitudin gravida tortor, in dapibus arcu efficitur in. Nam ac ex gravida, interdum sem quis, porta turpis. Aenean consectetur eros sed metus bibendum convallis in quis nisl. Sed ac tellus sem. Cras faucibus risus nec dui ullamcorper rutrum. Proin ut elit id ex venenatis vestibulum. Nulla facilisi. Morbi ac ornare nulla. Suspendisse sollicitudin, urna ut porta faucibus, urna massa commodo nibh, id volutpat nisi mi eu leo. Vestibulum egestas quam purus, vitae luctus augue ultrices in. Sed sit amet nulla semper, venenatis ante nec, volutpat ante. Nunc pulvinar nec ligula sed vestibulum.</p>

            <p>Proin sit amet enim augue. Cras quis aliquam nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam in enim nec sapien ullamcorper pharetra. Nulla eget nibh velit. Aenean tempor malesuada sem luctus suscipit. Etiam eleifend justo nulla, sit amet elementum nisl elementum eu. Fusce lacus magna, tempor in sodales sit amet, rutrum non sapien. Etiam egestas iaculis augue, non pulvinar eros ultricies sit amet. Sed pharetra gravida tortor, a tristique eros maximus ut. Pellentesque vel est vitae ante efficitur suscipit sed non augue. Praesent congue at massa eget ultricies. Nulla non odio et nunc tempus molestie. Nam tellus augue, vestibulum vel quam in, facilisis feugiat sem.</p>

            <p>Aliquam semper elementum risus. Duis sed venenatis sapien, eu imperdiet nibh. Aliquam tempor id dui sit amet posuere. Sed viverra, tellus nec dapibus ornare, dolor nisl dapibus ligula, vel rhoncus leo enim sed est. Integer pellentesque nisl vel congue tincidunt. Etiam finibus mi quis ante tempus condimentum. Vestibulum aliquam dui ex.</p>

            <p>Morbi lorem est, rutrum vel pharetra et, tincidunt eu ex. Sed tincidunt, ipsum non placerat facilisis, tortor dolor volutpat tortor, at ornare nibh tellus vitae purus. Ut a turpis eget metus convallis posuere. Etiam rhoncus, lectus ac fermentum ultricies, lectus ligula pellentesque quam, quis iaculis tellus ligula sit amet quam. Nam pharetra, arcu sit amet hendrerit vestibulum, ipsum turpis interdum ipsum, quis volutpat augue lorem eget ante. Quisque venenatis bibendum metus, eget interdum orci varius eu. Quisque massa nibh, egestas non lobortis vitae, tristique tincidunt nibh. Phasellus a leo ex. Vivamus mollis lacinia mattis. Vivamus et commodo odio.</p>

            <p>Vestibulum nec massa sem. Nullam eu orci arcu. Suspendisse aliquam ut metus sagittis hendrerit. Donec fringilla finibus consequat. Ut rhoncus augue eu erat vulputate imperdiet. Morbi a vehicula mauris, nec faucibus neque. Duis vitae dapibus est, euismod pretium diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam erat mauris, ornare a nunc quis, malesuada molestie ex. Donec pretium ut magna nec venenatis. Nulla risus risus, fringilla vel tellus nec, elementum feugiat diam. Nunc id ultricies massa. Curabitur blandit lobortis lorem, sit amet aliquet erat venenatis non.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec faucibus mi, et lobortis sapien. Mauris eu nunc feugiat, finibus diam eget, euismod tortor. Integer convallis libero quis leo congue, sit amet semper sem luctus. Donec nec dolor odio. Sed sollicitudin gravida tortor, in dapibus arcu efficitur in. Nam ac ex gravida, interdum sem quis, porta turpis. Aenean consectetur eros sed metus bibendum convallis in quis nisl. Sed ac tellus sem. Cras faucibus risus nec dui ullamcorper rutrum. Proin ut elit id ex venenatis vestibulum. Nulla facilisi. Morbi ac ornare nulla. Suspendisse sollicitudin, urna ut porta faucibus, urna massa commodo nibh, id volutpat nisi mi eu leo. Vestibulum egestas quam purus, vitae luctus augue ultrices in. Sed sit amet nulla semper, venenatis ante nec, volutpat ante. Nunc pulvinar nec ligula sed vestibulum.</p>

            <p>Proin sit amet enim augue. Cras quis aliquam nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam in enim nec sapien ullamcorper pharetra. Nulla eget nibh velit. Aenean tempor malesuada sem luctus suscipit. Etiam eleifend justo nulla, sit amet elementum nisl elementum eu. Fusce lacus magna, tempor in sodales sit amet, rutrum non sapien. Etiam egestas iaculis augue, non pulvinar eros ultricies sit amet. Sed pharetra gravida tortor, a tristique eros maximus ut. Pellentesque vel est vitae ante efficitur suscipit sed non augue. Praesent congue at massa eget ultricies. Nulla non odio et nunc tempus molestie. Nam tellus augue, vestibulum vel quam in, facilisis feugiat sem.</p>

            <p>Aliquam semper elementum risus. Duis sed venenatis sapien, eu imperdiet nibh. Aliquam tempor id dui sit amet posuere. Sed viverra, tellus nec dapibus ornare, dolor nisl dapibus ligula, vel rhoncus leo enim sed est. Integer pellentesque nisl vel congue tincidunt. Etiam finibus mi quis ante tempus condimentum. Vestibulum aliquam dui ex.</p>

            <p>Morbi lorem est, rutrum vel pharetra et, tincidunt eu ex. Sed tincidunt, ipsum non placerat facilisis, tortor dolor volutpat tortor, at ornare nibh tellus vitae purus. Ut a turpis eget metus convallis posuere. Etiam rhoncus, lectus ac fermentum ultricies, lectus ligula pellentesque quam, quis iaculis tellus ligula sit amet quam. Nam pharetra, arcu sit amet hendrerit vestibulum, ipsum turpis interdum ipsum, quis volutpat augue lorem eget ante. Quisque venenatis bibendum metus, eget interdum orci varius eu. Quisque massa nibh, egestas non lobortis vitae, tristique tincidunt nibh. Phasellus a leo ex. Vivamus mollis lacinia mattis. Vivamus et commodo odio.</p>

            <p>Vestibulum nec massa sem. Nullam eu orci arcu. Suspendisse aliquam ut metus sagittis hendrerit. Donec fringilla finibus consequat. Ut rhoncus augue eu erat vulputate imperdiet. Morbi a vehicula mauris, nec faucibus neque. Duis vitae dapibus est, euismod pretium diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam erat mauris, ornare a nunc quis, malesuada molestie ex. Donec pretium ut magna nec venenatis. Nulla risus risus, fringilla vel tellus nec, elementum feugiat diam. Nunc id ultricies massa. Curabitur blandit lobortis lorem, sit amet aliquet erat venenatis non.</p>
          </div>
        </div>
      </StyleConfig>
    );
  }
}

export default Main;
