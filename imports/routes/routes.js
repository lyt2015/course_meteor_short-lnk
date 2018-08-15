import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Signup from '../ui/components/Signup'
import Link from '../ui/components/Link'
import NotFound from '../ui/components/NotFound'
import Login from '../ui/components/Login'

const history = createHistory()

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    console.log('Login user stays on links page.')
    history.replace('/links')
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    console.log('Logout user stays on login page.')
    history.replace('/')
  }
}

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname
  console.log('Current Page:', pathname)

  const inUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const inAuthenticatedPage = authenticatedPages.includes(pathname)
  if (isAuthenticated && inUnauthenticatedPage) {
    history.replace('/links')
  }
  if (!isAuthenticated && inAuthenticatedPage) {
    history.replace('/')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={props => <Login {...props} onEnter={onEnterPublicPage} />} />
      <Route path="/signup" render={props => <Signup {...props} onEnter={onEnterPublicPage} />} />
      <Route path="/links" render={props => <Link {...props} onEnter={onEnterPrivatePage} />} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
