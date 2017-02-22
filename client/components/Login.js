import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { red500 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import fbhAttemptLogin from '../hack/fbhAttemptLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      retry: false,
      isConnecting: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin() {
    const { username, password } = this.state;
    this.setState({
      isConnecting: true
    }, () => {
      fbhAttemptLogin(username, password, result => {
        let { loggedIn, user } = result;
        if (loggedIn && user) {
          this.setState({ isConnecting: false },
                        () => this.props.update(true, user));
        } else {
          this.setState({ retry: true, isConnecting: false },
                        () => this.props.update(false, {}));
        }
      });
    });
  }

  render() {
    const palette = this.props.muiTheme.palette;
    const errorProp = this.state.retry ? { errorText: ' ' } : { };
    const errorMsg = (
      <p style={ { color: red500, fontSize: 12 } }>
        { this.state.retry ? "Check yo self before you wreck yo self fool" : "" }
      </p>
    );
    const header = this.state.isConnecting ?
                   (<CircularProgress
                        color={ palette.primary1Color }
                    />) :
                   (<Avatar
                        icon={ <FontIcon className="material-icons">person</FontIcon> }
                        color={ palette.primary1Color }
                        backgroundColor={ palette.accent2Color }
                    />);
    return (
      <Paper style={ {
          height: 350, width: 300,
          textAlign: 'center', display: 'block',
          margin: 'auto', padding: 20
        } }>
        <div style={ { height: 40 } }>
          { header }
        </div>
        <div style={ { width: '100%', height: '60%' } }>
          <TextField hintText="Username"
                     floatingLabelText="Username"
                     {...errorProp}
                     onChange={ this.handleUsernameChange } />
          <TextField hintText="Password"
                     floatingLabelText="Password"
                     {...errorProp}
                     type="password"
                     onChange={ this.handlePasswordChange } />
        </div>
        <div style={ { width: '100%', height: '25%' } }>
          <RaisedButton label="Log In" fullWidth={ true } primary={ true }
                        onClick={ this.handleLogin }/>
          { errorMsg }
        </div>
      </Paper>
    );
  }
}

export default muiThemeable()(Login);