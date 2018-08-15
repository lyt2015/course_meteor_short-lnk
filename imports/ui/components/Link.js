import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import LinkList from './LinkList'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinkListFilters from './LinkListFilters'

export default class Link extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
    }

    this.props.onEnter()
  }

  componentDidMount() {
    this.userTracker = Tracker.autorun(() => {
      const user = Meteor.user()
      if (user) {
        const address = Meteor.user().emails[0].address
        this.setState({ address })
      }
    })
  }

  componentWillUnmount() {
    this.userTracker.stop()
  }

  render() {
    return (
      <div>
        <PrivateHeader title={`Links created by ${this.state.address}`} />
        <div className="page-content">
          <LinkListFilters />
          <AddLink />
          <LinkList />
        </div>
      </div>
    )
  }
}
