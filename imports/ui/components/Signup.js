import React from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }

    this.props.onEnter()
  }

  handleSubmit(e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long.' })
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        return this.setState({ error: err.reason })
        // return console.error('Signup Error:', err)
      }

      this.setState({ error: '' })
      console.log('Sign up successfully.')
    })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Lnk</h1>

          {this.state.error && <p>{this.state.error}</p>}

          <form noValidate onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
            {/* <label htmlFor="email">Email: </label> */}
            <input
              type="email"
              ref="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="username email"
            />
            {/* <br /> */}
            {/* <label htmlFor="password">Password: </label> */}
            <input
              type="password"
              ref="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            {/* <br /> */}
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Have an account?</Link>
        </div>
      </div>
    )
  }
}
