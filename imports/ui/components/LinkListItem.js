import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import Clipboard from 'clipboard'
import moment from 'moment'

export default class LinkListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      justCopied: false,
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)
    this.clipboard
      .on('success', () => {
        this.setState({ justCopied: true })
        setTimeout(() => this.setState({ justCopied: false }), 1000)
      })
      .on('error', () => {
        alert('Unable to copy. Please manually  copy the link.')
      })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
    const lastVisitMessage =
      typeof this.props.lastVisitedAt === 'number'
        ? `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        : ''
    return (
      <p>
        {this.props.visitedCount} {visitMessage} {lastVisitMessage}
      </p>
    )
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>Visible: {this.props.visible ? 'true' : 'false'}</p>
        {this.renderStats()}
        <a className="button button--link button--pill" target="_blank" href={this.props.shortUrl}>
          Visit
        </a>
        <button
          className="button button--pill"
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          className="button button--pill"
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
          }}
        >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinkListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
}
