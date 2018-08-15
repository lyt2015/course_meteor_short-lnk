import React from 'react'
import Modal from 'react-modal'
import { Meteor } from 'meteor/meteor'

Modal.setAppElement('#app')

export default class AddLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const url = this.state.url.trim()
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleCloseModal()
      } else {
        this.setState({ error: err.reason })
      }
    })
  }

  handleInputChange(e) {
    this.setState({ url: e.target.value })
  }

  handleCloseModal() {
    this.setState({
      url: '',
      isOpen: false,
      error: '',
    })
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({ isOpen: true })}>
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={() => this.handleCloseModal()}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <p>Shorten Link</p>

          {this.state.error && <p>{this.state.error}</p>}

          <form onSubmit={e => this.handleSubmit(e)} className="boxed-view__form">
            <input
              ref="url"
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={e => this.handleInputChange(e)}
            />
            <button className="button">Add</button>
            <button type="button" className="button button--secondary" onClick={() => this.handleCloseModal()}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}
