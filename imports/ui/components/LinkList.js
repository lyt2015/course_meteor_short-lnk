import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import { Links } from '../../api/links'
import LinkListItem from './LinkListItem'

export default class LinkList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [],
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('pubLinks')
      const links = Links.find({ visible: Session.get('showVisible') }).fetch()
      this.setState({ links })
    })
  }

  componentWillUnmount() {
    this.linksTracker.stop()
  }

  renderLinksListItems() {
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinkListItem {...link} key={link._id} shortUrl={shortUrl} />
    })
  }

  render() {
    return (
      <div>
        <p>Links List</p>
        <div>{this.renderLinksListItems()}</div>
      </div>
    )
  }
}
