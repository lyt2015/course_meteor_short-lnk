import React from 'react'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'

export default class LinkListFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showVisible: true,
    }
  }

  componentDidMount() {
    this.visibleTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible') })
    })
  }

  componentWillUnmount() {
    this.visibleTracker.stop()
  }

  handleCheckboxChange(e) {
    Session.set('showVisible', !e.target.checked)
  }

  render() {
    return (
      <div>
        <label>
          <input
            checked={!this.state.showVisible}
            type="checkbox"
            onChange={e => this.handleCheckboxChange(e)}
          />
          show hidden links
        </label>
      </div>
    )
  }
}
