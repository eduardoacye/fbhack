import React from 'react';
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router';
import Routes from './routes';
import './index.css';
import './fonts/roboto/roboto.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Routes history={ browserHistory } />,
  document.getElementById('root')
);
