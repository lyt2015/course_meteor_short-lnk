import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import ReactDOM from 'react-dom'

import '../imports/startup/simple-schema-configuration'
import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  console.log('isAuthenticated:', isAuthenticated)

  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'))
})
