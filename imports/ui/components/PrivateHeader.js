import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

const PrivateHeader = props => {
  const handleLogout = () => {
    Meteor.logout(err => {
      if (err) {
        return console.error('Logout Error:', err)
      }

      console.log('Logout successfullly.')
    })
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PrivateHeader
