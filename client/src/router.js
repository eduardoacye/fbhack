import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'
import Main from './components/Main'
import NotFoundPage from './components/NotFoundPage'
import AboutPage from './components/AboutPage'
import LoginPage from './components/LoginPage'
import LogoutPage from './components/LogoutPage'
import UserPage from './components/UserPage'
import UserInfo from './components/UserInfo'

const makeRouter = store => {
  let history = syncHistoryWithStore(browserHistory, store)
  return (
    <Router history={history}>
      <Route path='/' component={Main}>
        <IndexRedirect to='/about'/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/notfound' component={NotFoundPage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/logout' component={LogoutPage}/>
        <Route path='/:user_id' component={UserPage}>
          <IndexRedirect to='/:user_id/home'/>
          <Route path='/:user_id/home' component={UserInfo}/>
        </Route>
      </Route>
    </Router>
  )
}


export default makeRouter
