import React from 'react';
import { Router, Route } from 'react-router';
import Main from './components/Main';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={ Main } />
  </Router>
);

export default Routes;
